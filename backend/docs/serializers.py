from rest_framework import serializers
from .models import *
from regions.serializers import CountrySerializer

# create serializers here
class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['name', 'image']  # Or other gallery fields

class StateSerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)

    class Meta:
        model = State
        fields = ['id', 'name', 'country']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class DisciplineSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # Nested category
    country = CountrySerializer(read_only=True)  # Nested country

    class Meta:
        model = Discipline
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    discipline = DisciplineSerializer(many=True, read_only=True)  # Add many=True
    state = StateSerializer(many=True, read_only=True)  # Add many=True
    gallery = GallerySerializer()  # Include the gallery serializer

    class Meta:
        model = Post
        fields = '__all__'
