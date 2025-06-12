from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import *

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        # Using '__all__' to include all fields from the CustomUser model
        # This will automatically include 'client' and 'freelancer' if they exist on the model.
        fields = '__all__'

# Models Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # Changed to use '__all__' as requested
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # Changed to use '__all__' as requested
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        # Changed to use '__all__' as requested
        fields = '__all__'

class LangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lang
        # Changed to use '__all__' as requested
        fields = '__all__'

class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        # Changed to use '__all__' as requested
        fields = '__all__'

class IdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Identity
        # Changed to use '__all__' as requested
        fields = '__all__'

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        # Changed to use '__all__' as requested
        fields = '__all__'
