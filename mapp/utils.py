#code to verify mail
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import requests

def send_verification_email(user,verification_url):
    # subject = "Email Verification"
    # html_message = render_to_string('verification_email.html',{
    #     'user':user,
    #     'verification_url':verification_url,    
    #     })
    # plain_message = strip_tags(html_message)
    # send_mail(subject,plain_message,'sender.noreply.email@gmail.com',[user.email],html_message=html_message)

    # subject = 'Verify Your Email Address'
    # message = f'Hi {user.username},\n\nPlease click the link below to verify your email address:\n\n{verification_url}'
    # from_email = settings.EMAIL_HOST_USER
    # recipient_list = [user.email]

    # send_mail(subject, message, from_email, recipient_list)
    emailjs_user_id = settings.EMAILJS_USER_ID
    emailjs_service_id = settings.EMAILJS_SERVICE_ID
    emailjs_template_id = settings.EMAILJS_TEMPLATE_ID

    # Prepare email parameters
    email_params = {
        'to_email': user.email,
        'from_name': 'QuantumAuth Team',
        'verification_url': verification_url,
        'username': user.username,
    }

    # Data to be sent to EmailJS
    data = {
        'service_id': emailjs_service_id,
        'template_id': emailjs_template_id,
        'user_id': emailjs_user_id,
        'template_params': email_params
    }

    # Make POST request to EmailJS API
    response = requests.post('https://api.emailjs.com/api/v1.0/email/send', json=data)

    if response.status_code == 200:
        print('Verification email sent successfully')
        return True
    else:
        print('Failed to send verification email:', response.status_code, response.text)
        return False
    

def send_password_reset_email(user,reset_url):
    emailjs_user_id = settings.RP_EMAILJS_USER_ID
    emailjs_service_id = settings.RP_EMAILJS_SERVICE_ID
    emailjs_template_id = settings.RP_EMAILJS_TEMPLATE_ID

    # Prepare email parameters
    email_params = {
        'to_email': user.email,
        'from_name': 'QuantumAuth Team',
        'reset_url': reset_url,
        'username': user.username,
    }

    # Data to be sent to EmailJS
    data = {
        'service_id': emailjs_service_id,
        'template_id': emailjs_template_id,
        'user_id': emailjs_user_id,
        'template_params': email_params
    }

    # Make POST request to EmailJS API
    response = requests.post('https://api.emailjs.com/api/v1.0/email/send', json=data)

    if response.status_code == 200:
        print('Reset email sent successfully')
        return True
    else:
        print('Failed to send reset email:', response.status_code, response.text)
        return False