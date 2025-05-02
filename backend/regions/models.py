from django.db import models
from django.db.models import Q
from django.utils.text import slugify

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length=255)

    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
    # Generate a base slug
        self.slug = slugify(f"{self.id}{" "}{self.name}")
        # Check for existing slugs with the same base
        existing_slugs = self.__class__.objects.filter(Q(slug__startswith=self.slug) & ~Q(slug=self.slug))
        # Append a unique counter if duplicates exist
        count = 1
        while existing_slugs.exists():
            self.slug = f"{base_slug}-{count}"
            count += 1
            existing_slugs = self.__class__.objects.filter(Q(slug__startswith=base_slug) & ~Q(slug=base_slug))
        # Call super().save() after generating a unique slug
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

    def save(self, *args, **kwargs):
        # Generate a base slug
        self.slug = slugify(f"{self.country.name}{" "}{self.name}")
        # Check for existing slugs with the same base
        existing_slugs = self.__class__.objects.filter(Q(slug__startswith=self.slug) & ~Q(slug=self.slug))
        # Append a unique counter if duplicates exist
        count = 1
        while existing_slugs.exists():
            self.slug = f"{base_slug}-{count}"
            count += 1
            existing_slugs = self.__class__.objects.filter(Q(slug__startswith=base_slug) & ~Q(slug=base_slug))
        # Call super().save() after generating a unique slug
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = u'State'
        verbose_name_plural = u'States'
        ordering = ('name',)