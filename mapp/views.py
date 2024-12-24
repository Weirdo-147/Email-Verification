from rest_framework.decorators import api_view, parser_classes, throttle_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializers import RegistrationSerializer
from .models import User
import logging
from django.http import HttpResponse,HttpResponseBadRequest
from django.core.signing import TimestampSigner,BadSignature,SignatureExpired
from django.shortcuts import redirect,render
from .utils import send_verification_email,send_password_reset_email
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.conf import settings
import six
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.throttling import AnonRateThrottle
from rest_framework_simplejwt.tokens import RefreshToken
import traceback
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
import json

logger = logging.getLogger(__name__)

User = get_user_model()
class EmailVerificationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            str(user.pk) + str(timestamp) + str(user.is_active)
        )
    
class CustomPasswordResetTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.password)
        )
    
email_ver_token = EmailVerificationTokenGenerator()
password_reset_token = CustomPasswordResetTokenGenerator()

class LoginRateThrottle(AnonRateThrottle):
    rate = '50/min'  # Allows 5 login attempts per minute

@api_view(['POST'])
@throttle_classes([LoginRateThrottle])
def login(request):
    try:
        email = request.data.get('email','').strip()
        password = request.data.get('password','').strip()

        if not email or not password:
            logger.warning("Email or password not provided in login request")
            return Response({"success": False, "message": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            logger.info(f"User found: {user.username}, is_active: {user.is_active}")
        except ObjectDoesNotExist:
            logger.error("User not found")
            return Response({"success": False, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if not user.is_active:
            logger.warning(f"Login attempt for inactive user: {email}")
            return Response({"success": False, "message": "User account is not activated"}, status=status.HTTP_403_FORBIDDEN)

        if not user.check_password(password):
            logger.warning(f"Failed login attempt for user: {email}")
            return Response({"success": False, "message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        logger.info(f"Successful login for user: {email}")
        return Response({
            "success": True,
            "message": "Login successful",
            "token": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        })
    except Exception as e:
        logger.exception(f"Unexpected error during login attempt for email: {email}")
        return Response({"success": False, "message": "An unexpected error occurred. Please try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    user = request.user
    return Response({
        "message": f"Welcome to the home page, {user.username}!",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_active": user.is_active,
            "profile_picture": user.profile_picture.url if user.profile_picture else None,
            "interests": user.interests if hasattr(user, 'interests') else None
        }
    })

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    logger.info(f"Received request: {request.method} {request.path}")
    logger.info(f"Headers: {request.headers}")
    logger.info(f"User: {request.user}")
    user = request.user
    
    if request.method == 'GET':
        data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'profile_picture': user.profile_picture.url if user.profile_picture else None,
            'interests': user.interests,
            'extra_data': user.extra_data
        }
        return Response(data)
    elif request.method == 'PUT':
        try:
            logger.info(f"Received data: {request.data}")
            user=request.user
            data = request.data
            extra_data = data.get('extra_data')
            if extra_data:
                try:
                    json.loads(extra_data)  # Validate JSON
                except json.JSONDecodeError:
                    return Response({'error': 'Invalid extra_data format'}, status=400)
            interests = data.get('interests')
            l=[]
            l=interests.split(',')
            user.interests = l
            if 'extra_data' in data:
                user.extra_data = data['extra_data']
            if 'profile_picture' in request.FILES:
                user.profile_picture = request.FILES['profile_picture']
            user.username = request.data.get('username', user.username)
            user.email = request.data.get('email', user.email)
            user.save()
            return Response({'message': 'Profile updated successfully'})
        except Exception as e:
            logger.error(f"Error updating profile: {str(e)}", exc_info=True)
            return Response({'error': 'An unexpected error occurred'}, status=500)

def index(request):
    return render(request, r'C:\Users\dheer\email_ver\front\public\index.html')

def verify_email(request):
    token_param = request.GET.get('token')
    if token_param:
        try:
            uidb64, token_value = token_param.split(':')
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
            logger.info(f"User found: {user.username}, is_active: {user.is_active}")
        except (ValueError, TypeError, OverflowError, User.DoesNotExist) as e:
            logger.error(f"Exception: {e}")
            return JsonResponse({'success': False, 'message': 'Invalid token format or user not found'}, status=400)
        
        if user.is_active:
            logger.info(f"User {user.username} is already verified")
            return JsonResponse({'success': True, 'message': 'Email already verified'}, status=200)
        
        if email_ver_token.check_token(user, token_value):
            user.is_active = True
            user.save()
            logger.info(f"Email verified successfully for user: {user.username}")
            return JsonResponse({'success': True, 'message': 'Email verified successfully!'},status=200)
        else:
            logger.warning(f"Invalid token for user: {user.username}")
            logger.debug(f"uidb64: {uidb64}, token_value: {token_value}")
            return JsonResponse({'success': False, 'message': 'Invalid verification link!'}, status=400)
    else:
        logger.error("Token not provided")
        return JsonResponse({'success': False, 'message': 'Token not provided'}, status=400)
    
@api_view(['POST'])
def verify_password_reset(request):
    token_param = request.data.get('token')
    new_password = request.data.get('new_password')
    if token_param:
        try:
            uidb64, token_value = token_param.split(':')
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
            logger.info(f"User found: {user.username}, is_active: {user.is_active}")
        except (ValueError, TypeError, OverflowError, User.DoesNotExist) as e:
            logger.error(f"Exception: {e}")
            return JsonResponse({'success': False, 'message': 'Invalid token format or user not found'}, status=400)
        
        if password_reset_token.check_token(user, token_value):
            user.set_password(new_password)
            user.save()
            logger.info(f"Password reset successfully for user: {user.username}")
            return JsonResponse({'success': True, 'message': 'Password reset successfully!',
                                 'password_hash':new_password},status=200)
        else:
            logger.warning(f"Invalid token for user: {user.username}")
            logger.debug(f"uidb64: {uidb64}, token_value: {token_value}")
            return JsonResponse({'success': False, 'message': 'Invalid Token!'}, status=400)
    else:
        logger.error("Token not provided")
        return JsonResponse({'success': False, 'message': 'Token not provided'}, status=400)
    
@api_view(['POST'])
def resend_verification(request):
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email, is_active=False)
        token_value = email_ver_token.make_token(user)
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = f"{uidb64}:{token_value}"
        verification_url = f"{settings.FRONTEND_URL}/verify-email?token={token}"

        send_verification_email(user, verification_url)

        return Response({"success": True, "message": "Verification email resent successfully"})
    except User.DoesNotExist:
        return Response({"success": False, "message": "User not found or already verified"}, status=400)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=500)

@api_view(['POST'])
def send_reset_password(request):
    email = request.data.get('email')
    logger.info(f"Received password reset request for email: {email}")
    if not email:
        logger.warning("Email not provided in password reset request")
        return Response({"success": False, "message": "Email is required"}, status=400)
    try:
        user = User.objects.get(email=email)
        token_value = password_reset_token.make_token(user)
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = f"{uidb64}:{token_value}"
        reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token}"

        send_password_reset_email(user, reset_url)

        return Response({"success": True, "message": "Reset email resent successfully"})
    except ObjectDoesNotExist:
        return Response({"success": False, "message": "User not found or already verified"}, status=404)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=500)

# def confirm_user(request):
#     # Assuming you want to confirm something in response to an HTTP request
#     if request.method == 'POST':
#         return HttpResponse('Confirmation successful', status=200)
#     else:
#         # Handle cases where the request method is not POST
#         return HttpResponse('Method not allowed', status=405)
        

def register_user(request):
    csrf_token = get_token(request)
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        
        # Create user
        user = User.objects.create(username=username, email=email)
        user.set_password(password)
        user.is_active = False
        user.save()

        # Generate a token and verification URL
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token_value = email_ver_token.make_token(user)
        token=f"{uid}:{token_value}"
        verification_url = request.build_absolute_uri(f'/registration/verify-email/?token={token}')

        # Send verification email
        send_verification_email(user, verification_url)
        
        return HttpResponse('Registration successful! Please check your email to verify your account.')
    elif request.method == 'GET':
        return HttpResponse('This is the registration endpoint. Please use POST to register.')
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser])
def registration_list(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # Check if passwords match
            if request.data.get('password') != request.data.get('cpassword'):
                return Response({"error": "Passwords do not match"}, status=status.HTTP_424_FAILED_DEPENDENCY)

            # Check if email is already registered
            if User.objects.filter(email=serializer.validated_data['email']).exists():
                return Response({"error": "Email is already registered"}, status=status.HTTP_426_UPGRADE_REQUIRED)

            try:
                user = serializer.save()
                user.is_active = False  # Set user as inactive until email verification
                if 'img' in request.FILES:
                    user.profile_picture = request.FILES['img']
                user.save()

                # Generate a token and verification URL
                token_value = email_ver_token.make_token(user)
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                token = f"{uidb64}:{token_value}"
                verification_url = f"{settings.FRONTEND_URL}/verify-email?token={token}"

                # Send verification email
                send_verification_email(user, verification_url)

                return Response({
                    "message": "Registration successful! Please check your email to verify your account.",
                    "token": token,
                    "email": user.email
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.exception("Error processing registration")
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        try:
            users = User.objects.all()
            serializer = RegistrationSerializer(users, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.exception("Error retrieving user list")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)