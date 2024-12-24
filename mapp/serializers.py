from rest_framework import serializers
from .models import User

class RegistrationSerializer(serializers.ModelSerializer):
    cpassword = serializers.CharField(write_only=True)
    img = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'cpassword', 'img']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['cpassword']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "Email is already registered"})
        return data

    def create(self, validated_data):
        validated_data.pop('cpassword')
        img = validated_data.pop('img', None)
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        if img:
            user.img = img
        user.is_active = False
        user.save()
        return user