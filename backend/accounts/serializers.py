from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import *

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
<<<<<<< HEAD
        # Using '__all__' to include all fields from the CustomUser model
        # This will automatically include 'client' and 'freelancer' if they exist on the model.
        fields = '__all__'
=======
        fields = ('pk', 'email', 'first_name', 'last_name', 'username', 'freelancer', 'client', 'status', 'password')
>>>>>>> 8a27717 (Existing files)

# Models Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
<<<<<<< HEAD
        # Changed to use '__all__' as requested
        fields = '__all__'
=======
        fields = ['pk', 'email', 'first_name', 'last_name', 'password']
>>>>>>> 8a27717 (Existing files)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
<<<<<<< HEAD
        # Changed to use '__all__' as requested
        fields = '__all__'
=======
        fields = ('pk', 'name')
>>>>>>> 8a27717 (Existing files)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
<<<<<<< HEAD
        # Changed to use '__all__' as requested
        fields = '__all__'
=======
        fields = ('pk',  'user', 'specialty', 'pic', 'headline', 'overview')
>>>>>>> 8a27717 (Existing files)

class LangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lang
<<<<<<< HEAD
        # Changed to use '__all__' as requested
        fields = '__all__'
=======
        fields = ('pk', 'lang1', 'lang2', 'lang3')
>>>>>>> 8a27717 (Existing files)

class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
<<<<<<< HEAD
        # Changed to use '__all__' as requested
        fields = '__all__'
=======
        fields = ('pk', 'name', 'tin', 'signature', 'status')
>>>>>>> 8a27717 (Existing files)

class IdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Identity
<<<<<<< HEAD
        # Changed to use '__all__' as requested
        fields = '__all__'
=======
        fields = ('pk', 'id_card', 'status', 'country', 'state', 'address')
>>>>>>> 8a27717 (Existing files)

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
<<<<<<< HEAD
        # Changed to use '__all__' as requested
        fields = '__all__'
=======
        fields = ('pk', 'user', 'avail', 'rising_star', 'top_rated', 'plus')

>>>>>>> 8a27717 (Existing files)
