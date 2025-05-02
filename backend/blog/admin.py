from django.contrib import admin
from .models import *

# Register your models here.
class BlogAdmin(admin.ModelAdmin):
    """
    Admin interface for managing subscribers.
    """
    list_display = ('title', 'status', 'category')
    list_filter = ('status', 'category')
    search_fields = ('title', 'category')
    #readonly_fields = ('subscribed_at', 'unsubscribed_at', 'id')  # Make these fields read-only in the admin
    date_hierarchy = 'updated_at'
    ordering = ('updated_at',)
    actions = ['export_as_csv']


    def export_as_csv(self, request, queryset):
        """
        Exports selected subscribers to a CSV file.
        """
        import csv
        from django.http import HttpResponse

        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=subscribers.csv'
        writer = csv.writer(response)

        writer.writerow(field_names)  # Write the header row
        for obj in queryset:
            row = [getattr(obj, field) for field in field_names]
            writer.writerow(row)

        return response
    export_as_csv.short_description = "Export selected subscribers to CSV"


admin.site.register(Blog, BlogAdmin)
admin.site.register(Category)