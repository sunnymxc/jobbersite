from rest_framework import serializers
from .models import Category, Notification

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__' # Include all fields
        read_only_fields = ['slug']

class NotificationSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True, required=True
    )
    gallery = serializers.SerializerMethodField()
    video = serializers.CharField(allow_null=True, allow_blank=True)

    class Meta:
        model = Notification
        fields = '__all__'  # Include all fields
        read_only_fields = ['created_at', 'updated_at']

    def get_gallery(self, obj):
        if obj.gallery:
            return {
                'id': obj.gallery.id,
                'name': obj.gallery.name,
                # Add other gallery fields as needed
            }
        return None
