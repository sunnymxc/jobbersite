from django.contrib import admin

# Register your models here.
from .models import *

class SubscriberAdmin(admin.ModelAdmin):
    """
    Admin interface for managing subscribers.
    """
    list_display = ('email', 'name', 'subscribed_at', 'is_active', 'unsubscribed_at')
    list_filter = ('is_active', 'subscribed_at')
    search_fields = ('email', 'name')
    readonly_fields = ('subscribed_at', 'unsubscribed_at', 'id')  # Make these fields read-only in the admin
    date_hierarchy = 'subscribed_at'
    ordering = ('-subscribed_at',)
    actions = ['unsubscribe_selected', 'export_as_csv']

    def unsubscribe_selected(self, request, queryset):
        """
        Admin action to unsubscribe selected subscribers.
        """
        for subscriber in queryset:
            subscriber.unsubscribe()  # Use the model's unsubscribe method
        self.message_user(request, f"{queryset.count()} subscribers unsubscribed.")
    unsubscribe_selected.short_description = "Unsubscribe selected subscribers"

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


admin.site.register(Subscriber, SubscriberAdmin)