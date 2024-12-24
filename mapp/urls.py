"""
URL configuration for email_ver project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import registration_list,verify_email,register_user,resend_verification,verify_password_reset,send_reset_password,login,home,user_profile

urlpatterns = [
    path('', registration_list, name='registration_list'),
    path('nm/',register_user,name='register_user'),
    path('verify-email/',verify_email,name='verify_email'),
    path('resend-verification/', resend_verification, name='resend_verification'),
    path('verify-password-reset/', verify_password_reset, name='verify_password_reset'),
    path('send-reset-password/', send_reset_password, name='send_reset_password'),
    path('login/', login, name='login'),
    path('home/', home, name='home'),
    path('user-profile/', user_profile, name='user_profile'),
]
