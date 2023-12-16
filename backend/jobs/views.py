from django.shortcuts import get_object_or_404

from rest_framework import viewsets 
from rest_framework.response import Response

from .models import Job, Proposal
from .serializers import *

# Create your views here.
class JobViewSet(viewsets.ViewSet): 
    def list(self, request): 
        queryset = Job.objects.all()
        serializer = JobSerializer(queryset, many=True)
        return Response(serializer.data) 
             

    def retrieve(self, request, pk=None):
        queryset = Job.objects.all()
        job = get_object_or_404(queryset, pk=pk)
        serializer = JobSerializer(job)
        return Response(serializer.data)

        