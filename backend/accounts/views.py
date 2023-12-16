from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets

import datetime
import json

from .models import *
from .serializers import *

# Create your views here.
class UserViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = CustomUser.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)        

    def retrieve(self, request, pk=None):
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

# Profile 
class ProfileViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = Profile.objects.all()
        serializer = ProfileSerializer(queryset, many=True)
        return Response(serializer.data)        

    def retrieve(self, request, pk=None):
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

# Certificate   
class CertViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = Cert.objects.all()
        serializer = CertSerializer(queryset, many=True)
        return Response(serializer.data)        

    def retrieve(self, request, pk=None):
        queryset = Cert.objects.all()
        cert = get_object_or_404(queryset, pk=pk)
        serializer = CertSerializer(cert)
        return Response(serializer.data)

# Employment View
class EmploymentViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = Employment.objects.all()
        serializer = EmploymentSerializer(queryset, many=True)
        return Response(serializer.data)        

    def retrieve(self, request, pk=None):
        queryset = Employment.objects.all()
        employment = get_object_or_404(queryset, pk=pk)
        serializer = EmploymentSerializer(employment)
        return Response(serializer.data)

# Languages spoken
class LangViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = Lang.objects.all()
        serializer = LangSerializer(queryset, many=True)
        return Response(serializer.data)        

    def retrieve(self, request, pk=None):
        queryset = Lang.objects.all()
        lang = get_object_or_404(queryset, pk=pk)
        serializer = LangSerializer(lang)
        return Response(serializer.data)

# Tax information   
class TaxViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = Tax.objects.all()
        serializer = TaxSerializer(queryset, many=True)
        return Response(serializer.data)        

    def retrieve(self, request, pk=None):
        queryset = Tax.objects.all()
        tax = get_object_or_404(queryset, pk=pk)
        serializer = TaxSerializer(tax)
        return Response(serializer.data)

# Identity verification
class IdentityViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = Identity.objects.all()
        serializer = IdentitySerializer(queryset, many=True)
        return Response(serializer.data)        

    def retrieve(self, request, pk=None):
        queryset = Identity.objects.all()
        identity = get_object_or_404(queryset, pk=pk)
        serializer = IdentitySerializer(identity)
        return Response(serializer.data)

# Business information
class BusinessViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = Business.objects.all()
        serializer = BusinessSerializer(queryset, many=True)
        return Response(serializer.data)        

    def retrieve(self, request, pk=None):
        queryset = Business.objects.all()
        business = get_object_or_404(queryset, pk=pk)
        serializer = BusinessSerializer(business)
        return Response(serializer.data)

# Badge of Honor  
class BadgeViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = Badge.objects.all()
        serializer = BadgeSerializer(queryset, many=True)
        return Response(serializer.data)        

    def retrieve(self, request, pk=None):
        queryset = Badge.objects.all()
        badge = get_object_or_404(queryset, pk=pk)
        serializer = TaxSerializer(badge)
        return Response(serializer.data)
    
class CategoryView(viewsets.ModelViewSet):  
    serializer_class = CategorySerializer  
    queryset = Category.objects.all()
     