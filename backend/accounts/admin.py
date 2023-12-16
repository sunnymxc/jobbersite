from django.contrib import admin

from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'first_name', 'last_name']
    list_filter = ['email']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    list_filter = ['category']

# Register your models here.
admin.site.register(CustomUser, UserAdmin)
admin.site.register(Category)
admin.site.register(Specialty)
admin.site.register(Profile)
admin.site.register(Cert)
admin.site.register(Employment)
admin.site.register(Lang)
admin.site.register(Tax)
admin.site.register(Identity)
admin.site.register(Business)
admin.site.register(Badge)