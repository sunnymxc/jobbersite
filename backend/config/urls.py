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
router.register('categories', CategoryViewSet, 'categories')
router.register('countries', CountryViewSet, 'countries')
router.register('states', StateViewSet, 'states')
router.register('disciplines', DisciplineViewSet, 'disciplines')
router.register('subscribers', SubscriberViewSet, basename='subscriber')
router.register('notifications', NotificationViewSet, basename='notification') # Register the NotificationViewSet

# Users api
router.register('category', CategoryView, 'category')
router.register('users', UserViewSet, 'users')
router.register('profiles', ProfileViewSet, 'profiles')
router.register('certs', CertViewSet, 'certs')
router.register('langs', LangViewSet, 'langs')
router.register('taxes', TaxViewSet, 'taxes')
router.register('identities', CertViewSet, 'identities')
router.register('badges', BadgeViewSet, 'badges')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("__reload__/", include("django_browser_reload.urls")),
    path('api/', include(router.urls)),
    path('api/docs/<slug:slug>/', PostViewSet.as_view({'get': 'retrieve'}), name='doc-detail'),
    path('api/docs/', PostViewSet.as_view({'get': 'list'})),
    path('api/docs/<slug:slug>/', PostViewSet.as_view({'put': 'update', 'delete': 'destroy'})),
    path('api/subscribers/', SubscriberViewSet.as_view({'get': 'list'}), name='subscriber_list'),
    path("select2/", include("django_select2.urls")),
    *router.urls
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)