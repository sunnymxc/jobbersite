from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html

from django import forms
from tinymce.models import HTMLField

import logging, uuid
logger = logging.getLogger(__name__)

from accounts.models import CustomUser
from docs.models import Gallery

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)

    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return self.name
    
    def generate_unique_slug(self, base_slug, max_length=100):
        unique_slug = f"{base_slug}-{uuid.uuid4().hex[:8]}"  # Combine title and UUID

        if self.__class__.objects.filter(slug=unique_slug).exists():
            # If slug exists, try generating a new one with more random characters.
            unique_slug = f"{base_slug}-{uuid.uuid4().hex[:12]}"

        return unique_slug[:max_length]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            self.slug = self.generate_unique_slug(base_slug)

        # Still check if the generated slug already exists before saving
        if self.__class__.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            # If a duplicate slug exists, generate a new one
            self.slug = self.generate_unique_slug(base_slug)

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = u'Category'
        verbose_name_plural = u'Categories'
        ordering = ('name',)

class Blog(models.Model):
    user = models.ForeignKey(CustomUser, related_name='blog_writer', on_delete=models.CASCADE)

    category = models.ForeignKey(Category, related_name='blog_category', on_delete=models.CASCADE)

    title = models.CharField(max_length=255)

    content = HTMLField(verbose_name="Message")

    gallery = models.ForeignKey(Gallery, related_name='blog_image', null=True, blank=True, on_delete=models.CASCADE)

    video = models.CharField(max_length=11, null=True, blank=True,)

    STATUS_CHOICES = (
        (0, 'Draft'),
        (1, 'Published'),
    )

    status = models.IntegerField(choices=STATUS_CHOICES, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title   
    def get_absolute_url(self):
        return reverse("blog_detail", kwargs={"slug": self.slug})

    def generate_unique_slug(self, base_slug, max_length=100):
        unique_slug = f"{base_slug}-{uuid.uuid4().hex[:8]}"  # Combine title and UUID

        if self.__class__.objects.filter(slug=unique_slug).exists():
            # If slug exists, try generating a new one with more random characters.
            unique_slug = f"{base_slug}-{uuid.uuid4().hex[:12]}"

        return unique_slug[:max_length]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            self.slug = self.generate_unique_slug(base_slug)

        # Still check if the generated slug already exists before saving
        if self.__class__.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            # If a duplicate slug exists, generate a new one
            self.slug = self.generate_unique_slug(base_slug)

        super().save(*args, **kwargs)

    def image_preview(self):
        if self.image and self.image.thumbnail:  # Check if image and thumbnail exist
            return format_html('<img src="{}" width="150" height="150" style="object-fit: cover;" />', self.image.thumbnail.url)
        elif self.image:  # If no thumbnail, display original image (smaller size if needed)
            return format_html('<img src="{}" width="150" height="150" style="object-fit: cover;" />', self.image.image.url)
        return "No Image"  # Or a placeholder image

    image_preview.short_description = 'Image Preview'
    image_preview.allow_tags = True

    class Meta:
        verbose_name = u'Blog'
        verbose_name_plural = u'Blog Posts'
        ordering = ('created_at',)
