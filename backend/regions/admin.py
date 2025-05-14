from django.contrib import admin

from .models import *

class CountryAdmin(admin.ModelAdmin):
    exclude = ('slug',)

class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'country')  # Display image preview
    #readonly_fields = ('',)  # Make image preview read-only
    exclude = ('slug',)
    

# Register your models here.
admin.site.register(Country, CountryAdmin)
admin.site.register(State, StateAdmin)