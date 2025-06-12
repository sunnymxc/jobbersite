<<<<<<< HEAD
from django.contrib import admin
from .forms import PostForm
from django.utils.html import format_html

admin.site.site_header = "Jobbersite.com"  # Replace with your desired header

from .models import *

class PostAdmin(admin.ModelAdmin):
    form = PostForm

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = CustomUser.objects.filter(id=request.user.id)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        initial['user'] = request.user.id
        return initial

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs  # Superusers see all posts
        return qs.filter(user=request.user)  # Regular users see only their posts
        
    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name == 'status':
            if not request.user.is_superuser:
                kwargs['choices'] = [
                    choice for choice in db_field.choices if choice[0] != 1
                ] # 1 is the value for featured.
        if db_field.name == "user":
            kwargs["queryset"] = CustomUser.objects.filter(id=request.user.id)
        return super().formfield_for_dbfield(db_field, request, **kwargs)
    
    def get_list_display(self, request):
        if request.user.is_superuser:
            return ('title', 'user', 'created_at')
        else:
            return ('title', 'created_at')
    
    def get_exclude(self, request, obj=None):
        exclude = list(super().get_exclude(request, obj) or ()) # Get the original exclude, or create a new list.
        if not request.user.is_superuser:
            exclude.append('status')  # Add 'status' to the exclude list
        return tuple(exclude) # return as a tuple.
    
    exclude = ('slug', 'video', 'gallery')

    class Media:
        css = {
            'all': ('admin/css/hide_status.css',) # Link to your CSS file.
        }

class CategoryAdmin(admin.ModelAdmin):
    exclude = ('slug',)

class DisciplineAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    ordering = ['category']
    exclude = ('slug',)

class GalleryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_preview')  # Display image preview
    readonly_fields = ('image_preview',)  # Make image preview read-only
    # or if you want to also edit the image
    # fields = ('name', 'image', 'image_preview')
    class Media:  # Add this class to add inline styling to the image in the admin preview
        css = {
            'all': ('admin/css/widgets.css',)
        }
    exclude = ('',)

# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Discipline, DisciplineAdmin)
admin.site.register(Gallery, GalleryAdmin)
=======
from django.contrib import admin
from .forms import PostForm
from django.utils.html import format_html

admin.site.site_header = "Jobbersite.com Admin"

from .models import *

class PostAdmin(admin.ModelAdmin):
    form = PostForm

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = CustomUser.objects.filter(id=request.user.id)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        initial['user'] = request.user.id
        return initial

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name == 'status':
            if not request.user.is_superuser:
                kwargs['choices'] = [
                    choice for choice in db_field.choices if choice[0] != 1
                ]
        return super().formfield_for_dbfield(db_field, request, **kwargs)

    def get_list_display(self, request):
        if request.user.is_superuser:
            return ('title', 'user', 'created_at')
        else:
            return ('title', 'created_at')

    def get_exclude(self, request, obj=None):
        exclude = list(super().get_exclude(request, obj) or ())
        if not request.user.is_superuser:
            exclude.append('status')
        return tuple(exclude)

    exclude = ('slug', 'video', 'gallery')

    class Media:
        css = {
            'all': (
                'admin/css/hide_status.css',
                'admin/css/vendor/select2/select2.min.css',  # Add select2 CSS
            ),
        }
        js = (
            'admin/js/vendor/jquery/jquery.min.js',
            'admin/js/vendor/select2/select2.full.min.js',  # Add select2 JS
            'django_select2/admin/select2.init.js',  # Add django-select2 init
        )

class CategoryAdmin(admin.ModelAdmin):
    exclude = ('slug',)

class DisciplineAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    ordering = ['category']
    exclude = ('slug',)

class GalleryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_preview')
    readonly_fields = ('image_preview',)
    class Media:
        css = {
            'all': ('admin/css/widgets.css',)
        }
    exclude = ('',)

admin.site.register(Post, PostAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Discipline, DisciplineAdmin)
admin.site.register(Gallery, GalleryAdmin)
>>>>>>> 8a27717 (Existing files)
