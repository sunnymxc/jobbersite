from rest_framework import serializers
from .models import *

class SubscriberSerializer(serializers.ModelSerializer):
    """
    Serializer for the Subscriber model.  This serializer will be used
    to convert Subscriber instances to JSON, and vice-versa, for use in
    a Django REST Framework API.
    """
    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'name', 'subscribed_at', 'is_active', 'unsubscribed_at']
        #  Consider adding 'read_only' to some fields, especially 'id' and 'subscribed_at'
        read_only_fields = ['id', 'subscribed_at', 'unsubscribed_at']

    def validate_email(self, value):
        """
        Override to validate the email.  This is important, even with the
        form validation, as the serializer can be used independently.
        """
        value = value.lower()
        if self.instance is None:  # Only check on creation
            if Subscriber.objects.filter(email=value, is_active=True).exists():
                raise serializers.ValidationError("This email address is already subscribed.")
        return value

    def create(self, validated_data):
        """
        Override the create method to ensure email is lowercase before saving.
        """
        validated_data['email'] = validated_data['email'].lower()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Override the update method to ensure email is lowercase before updating.
        """
        if 'email' in validated_data:
            validated_data['email'] = validated_data['email'].lower()
        return super().update(instance, validated_data)