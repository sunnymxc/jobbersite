from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import Notification
from .serializers import NotificationSerializer

# Create your views here.
class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to view notifications.
    """
    queryset = Notification.objects.filter(status=1)  # Only active notifications
    serializer_class = NotificationSerializer
    permission_classes = [permissions.AllowAny]  # Adjust permissions as needed

    def get_queryset(self):
        """
        Optionally filter notifications by category.
        """
        queryset = Notification.objects.filter(status=1) # start with active
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset
