from django.db import models
from django.db.models import Q
from django.utils.text import slugify

import random, string, logging, uuid

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length=255)

    slug = models.SlugField(unique=True, blank=True)

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
    
    def __str__(self):
        return self.name   

    class Meta:
        verbose_name = u'Country'
        verbose_name_plural = u'Countries'
        ordering = ('name',)

class State(models.Model):
    country = models.ForeignKey(Country, related_name='state_country', on_delete=models.CASCADE)

    name = models.CharField(max_length=255)

    slug = models.SlugField(unique=True, blank=True)

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
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = u'State'
        verbose_name_plural = u'States'
        ordering = ('name',)