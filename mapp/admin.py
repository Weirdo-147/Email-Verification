# admin.py
from django.contrib import admin
# from .models import Registration

# admin.site.register(Registration)
# @admin.register(Registration)
# class RegistrationAdmin(admin.ModelAdmin):
#     list_display = ('id', 'username', 'email', 'password', 'cpassword', 'img')
#     list_filter = ('username', 'email')  # Optional: Add filters for easier searching
#     search_fields = ('username', 'email')  # Optional: Add search fields

#     # Customize the admin form as needed
#     fieldsets = (
#         (None, {
#             'fields': ('username', 'email', 'password', 'cpassword', 'img')
#         }),
#     )

# # Register your model admin
# admin.site.register(Registration, RegistrationAdmin)
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('profile_picture', 'interests', 'extra_data')}),
    )

admin.site.register(User, CustomUserAdmin)
