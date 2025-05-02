from rest_framework import serializers

from .models import *

# create serializers here
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']




