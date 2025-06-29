from django.shortcuts import get_object_or_404
from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Post, Category, State, Discipline
from regions.models import Country
from .serializers import PostSerializer, CategorySerializer, StateSerializer, DisciplineSerializer
from .filters import PostFilter
from django.utils import timezone  # Import timezone utility
from rest_framework.pagination import PageNumberPagination # Import PageNumberPagination

class PostPagination(PageNumberPagination): # Custom pagination class
    page_size = 24 # Set the page size to match your frontend

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter] # <--- ADDED filters.SearchFilter here
    filterset_class = PostFilter
    lookup_field = 'slug'
    pagination_class = PostPagination
    search_fields = ['title'] # You had 'title', I've added 'content' and 'description' as common fields to search, adjust as needed.


    def list(self, request, *args, **kwargs):
        print(f"Query Params: {request.query_params}")
        queryset = self.filter_queryset(self.get_queryset())
        print(f"Filtered Queryset: {queryset.query}")

        # The print for individual posts can be very verbose, good to comment out for production
        # for post in queryset:
        #     print(f"Post ID: {post.id}, Created At: {post.created_at}")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = super().get_queryset()
        created_at_gte = self.request.query_params.get('created_at__gte')
        created_at_lt = self.request.query_params.get('created_at__lt')

        if created_at_gte and created_at_lt:
            try:
                created_at_gte = timezone.datetime.fromisoformat(created_at_gte.replace('Z', '+00:00'))
                created_at_lt = timezone.datetime.fromisoformat(created_at_lt.replace('Z', '+00:00'))
                queryset = queryset.filter(created_at__gte=created_at_gte, created_at__lt=created_at_lt)
            except ValueError as e:
                print(f"Error parsing date: {e}")
                return Post.objects.none()

        return queryset

class CategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

class StateViewSet(viewsets.ViewSet):
    def list(self, request):
        country_id = request.query_params.get('country')
        queryset = State.objects.all()

        if country_id:
            try:
                country_id = int(country_id)
                queryset = queryset.filter(country__id=country_id)
            except ValueError:
                return Response({"error": "Invalid country ID"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = StateSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        state = get_object_or_404(State, pk=pk)
        serializer = StateSerializer(state)
        return Response(serializer.data)

class DisciplineViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Discipline.objects.all()
        serializer = DisciplineSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        discipline = get_object_or_404(Discipline, pk=pk)
        serializer = DisciplineSerializer(discipline)
        return Response(serializer.data)