from django_filters import rest_framework as filters
from .models import Post, State, Discipline

class PostFilter(filters.FilterSet):
    state__id__in = filters.CharFilter(method='filter_states')
    discipline__in = filters.CharFilter(method='filter_disciplines') # Changed line
    state__country = filters.NumberFilter(field_name='state__country__id')
    discipline__category = filters.NumberFilter(field_name='discipline__category__id') # Added category filter
    created_at__gte = filters.DateTimeFilter(field_name='created_at', lookup_expr='gte')
    created_at__lt = filters.DateTimeFilter(field_name='created_at', lookup_expr='lt')
    status = filters.NumberFilter(field_name='status')

    def filter_states(self, queryset, name, value):
        state_ids = value.split(',')
        return queryset.filter(state__id__in=state_ids)
    
    def filter_disciplines(self, queryset, name, value):
        discipline_ids = self.request.query_params.getlist('discipline__in')
        if discipline_ids:
            return queryset.filter(discipline__id__in=discipline_ids)
        return queryset

    class Meta:
        model = Post
        fields = ['state__id__in', 'discipline__in', 'state__country', 'discipline__category', 'status'] # changed line