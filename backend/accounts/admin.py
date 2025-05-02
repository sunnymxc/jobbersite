from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *

class UserAdmin(UserAdmin):
    list_display = ['email', 'first_name', 'last_name']
    list_filter = ['email']

class CategoryModelAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']

# Register your models here.
admin.site.register(CustomUser, UserAdmin)
admin.site.register(Category, CategoryModelAdmin)
admin.site.register(Specialty)
admin.site.register(Profile)
admin.site.register(Lang)
admin.site.register(Tax)
admin.site.register(Identity)
admin.site.register(Badge)

