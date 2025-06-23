from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.shortcuts import render  # Import render
from django.views.generic import TemplateView

from accounts.views import *
from docs.views import *
from regions.views import *
from subscribers.views import *
from notifications.views import *

router = routers.DefaultRouter()
router.register(r'docs', PostViewSet, basename='doc')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'countries', CountryViewSet, basename='country')
router.register(r'states', StateViewSet, 'state')
router.register(r'disciplines', DisciplineViewSet, basename='discipline')
router.register(r'subscribers', SubscriberViewSet, basename='subscriber')
router.register(r'notifications', NotificationViewSet, basename='notification') # Register the NotificationViewSet

# Users api
router.register(r'category', CategoryView, basename='user_category')
router.register(r'users', UserViewSet, 'users')
router.register(r'profiles', ProfileViewSet, 'profiles')
router.register(r'certs', CertViewSet, 'certs')
router.register(r'langs', LangViewSet, 'langs')
router.register(r'taxes', TaxViewSet, 'taxes')
router.register(r'identities', CertViewSet, 'identities')
router.register(r'badges', BadgeViewSet, 'badges')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("__reload__/", include("django_browser_reload.urls")),
    path('api/', include(router.urls)),
    path("select2/", include("django_select2.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)