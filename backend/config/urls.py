"""
URL configuration for config project.

The urlpatterns list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include 
from rest_framework import routers  
from django.urls import re_path as url
from django.views.generic import TemplateView

from accounts.views import *
from jobs.views import *

router = routers.DefaultRouter()                   
router.register('jobs', JobViewSet, 'jobs')

# Users api
router.register('category', CategoryView, 'category')
router.register('users', UserViewSet, 'users')
router.register('profiles', ProfileViewSet, 'profiles')
router.register('certs', CertViewSet, 'certs')
router.register('employments', EmploymentViewSet, 'employments')
router.register('langs', LangViewSet, 'langs')
router.register('taxes', TaxViewSet, 'taxes')
router.register('identities', CertViewSet, 'identities')
router.register('businesses', BusinessViewSet, 'businesses')
router.register('badges', BadgeViewSet, 'badges')

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    path("__reload__/", include("django_browser_reload.urls")),

    path('api/', include(router.urls))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [url(r'^.*', TemplateView.as_view(template_name='index.html'))]
