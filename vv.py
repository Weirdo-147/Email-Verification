import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "email_ver.settings")
django.setup()

from django.conf import settings
print(f"MEDIA_ROOT: {settings.MEDIA_ROOT}")

from mapp.models import User

users = User.objects.all()
if users:
    for user in users:
        if user.profile_picture:
            print(f"Profile picture path for {user.username}: {user.profile_picture.path}")
        else:
            print(f"User {user.username} doesn't have a profile picture")
else:
    print("No users found in the database")

from django.core.management.utils import get_random_secret_key

print(get_random_secret_key())