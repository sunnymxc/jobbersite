from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    
    """
    Custom user model manager where email is the unique identifiers for authentication instead of usernames
    """
    use_in_migrations = True

    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('Users must have a valid email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)

        # user.is_staff=False
        user.is_active = True
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, first_name, last_name, password=None):
        """
        Create and Save a SuperUser with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.is_active = True
        user.is_staff=True
        user.is_superuser=True
        user.set_password(password)
        user.save()

        return user