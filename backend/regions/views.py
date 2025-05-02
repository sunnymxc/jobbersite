from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404

from rest_framework import viewsets 
from rest_framework.response import Response

from .models import *
from regions.models import *
from .serializers import *

# Create your views here.
class CountryViewSet(viewsets.ViewSet):
    def list(self, request): 
        queryset = Country.objects.all()
        serializer = CountrySerializer(queryset, many=True)
        return Response(serializer.data) 
             

    def retrieve(self, request, pk=None):
        queryset = Country.objects.all()
        Category = get_object_or_404(queryset, pk=pk)
        serializer = CountrySerializer(Country)
        return Response(serializer.data)


