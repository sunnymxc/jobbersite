from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import *

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('pk', 'email', 'first_name', 'last_name', 'username', 'freelancer', 'client', 'status', 'password')

# Models Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['pk', 'email', 'first_name', 'last_name', 'password']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('pk', 'name')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('pk',  'user', 'specialty', 'pic', 'headline', 'overview')

class LangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lang
        fields = ('pk', 'lang1', 'lang2', 'lang3')

class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        fields = ('pk', 'name', 'tin', 'signature', 'status')

class IdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Identity
        fields = ('pk', 'id_card', 'status', 'country', 'state', 'address')

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ('pk', 'user', 'avail', 'rising_star', 'top_rated', 'plus')

