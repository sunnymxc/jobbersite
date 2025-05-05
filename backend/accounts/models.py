from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse("category_detail", kwargs={"slug": self.slug})  # new
    
    slug = models.SlugField()

    class Meta:
        verbose_name = u'Category'
        verbose_name_plural = u'Categories'
        ordering = ('name',)

class Specialty(models.Model):
    category = models.ForeignKey(Category, related_name='specialty', on_delete=models.CASCADE)

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse("category_detail", kwargs={"slug": self.slug})  # new
    
    slug = models.SlugField()

    class Meta:
        verbose_name = u'Specialty'
        verbose_name_plural = u'Specialties'
        ordering = ('name',)


class CustomUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(_('Email Address'), max_length=150, unique=True)

    is_active = models.BooleanField(default=True)
    is_recruiter = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = CustomUserManager()

    first_name = models.CharField(max_length=200)

    last_name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.first_name + " " + self.last_name

    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    class Meta:
        verbose_name = u'User'
        verbose_name_plural = u'Users'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Profile(models.Model):
    user = models.ForeignKey('accounts.CustomUser', related_name='user_profile', on_delete=models.CASCADE, blank=True)

    specialty = models.ManyToManyField(Specialty, related_name='profile_specialty', blank=True)

    pic = models.ImageField(upload_to='user/pic', height_field=None, max_length=255)

    headline = models.CharField(max_length=255, null=True, blank=True)

    overview = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.headline

    class Meta:
        verbose_name = u'Profile'
        verbose_name_plural = u'Profiles'

class LangType(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse("category_detail", kwargs={"slug": self.slug})  # new
    
    slug = models.SlugField()

    class Meta:
        verbose_name = u'Language'
        verbose_name_plural = u'Languages'
        ordering = ('name',)

class Lang(models.Model):
    user = models.ForeignKey(CustomUser, related_name='user_langs', on_delete=models.CASCADE)
    
    lang = models.ManyToManyField(LangType, related_name='lang_type', blank=True)

    class Meta:
        verbose_name = u'Language Spoken'
        verbose_name_plural = u'Languages Spoken'

class Tax(models.Model):
    user = models.OneToOneField(CustomUser, related_name='user_tax', on_delete=models.CASCADE)

    tin = models.CharField(max_length=20)

    signature = models.CharField(max_length=255)

    status = models.BooleanField(default=False)

    class Meta:
        verbose_name = u'Tax'
        verbose_name_plural = u'Taxes'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Identity(models.Model):
    user = models.OneToOneField(CustomUser, related_name='user_identity', on_delete=models.CASCADE)
    
    id_card = models.ImageField() 
    
    status = models.BooleanField(default=False)

    country = models.CharField(max_length=255)

    state = models.CharField(max_length=255)

    address = models.TextField(max_length=255)
    
    class Meta:
        verbose_name = u'Identity'
        verbose_name_plural = u'Identities'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Badge(models.Model):
    user = models.OneToOneField(CustomUser, related_name='user_badge', on_delete=models.CASCADE)
    
    avail = models.BooleanField(default=False)

    rising_star = models.BooleanField(default=False)

    top_rated = models.BooleanField(default=False)

    plus = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)






                           




    