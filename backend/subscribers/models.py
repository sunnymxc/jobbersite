from django.db import models

import uuid  # For generating unique IDs
from django.core.validators import EmailValidator
from django.utils import timezone

# Create your models here.

class Subscriber(models.Model):
    """
    Represents an email subscriber.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(
        verbose_name="Email Address",
        unique=True,
        validators=[EmailValidator()],  # Use Django's built-in email validator
        error_messages={
            'unique': "This email address is already subscribed.",
        }
    )
    name = models.CharField(
        verbose_name="Full Name",
        max_length=255,
        blank=True,  # Allow blank names
        null=True,   # Allow null names in the database
    )
    subscribed_at = models.DateTimeField(
        verbose_name="Subscription Date",
        auto_now_add=True,  # Automatically set on creation
        help_text="The date and time when the subscriber joined."
    )
    is_active = models.BooleanField(
        verbose_name="Active Subscriber",
        default=True,
        help_text="Indicates whether the subscriber is active."
    )
    unsubscribed_at = models.DateTimeField(
        verbose_name="Unsubscription Date",
        null=True,
        blank=True,
        help_text="The date and time when the subscriber unsubscribed."
    )

    def __str__(self):
        """
        Returns the email address as the string representation of the subscriber.
        """
        return self.email

    def unsubscribe(self):
        """
        Deactivates the subscriber and sets the unsubscribed_at timestamp.
        """
        self.is_active = False
        self.unsubscribed_at = timezone.now()
        self.save()

    def save(self, *args, **kwargs):
        """
        Override the save method to ensure email is lowercase.
        """
        self.email = self.email.lower()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Subscriber"
        verbose_name_plural = "Subscribers"
        ordering = ['-subscribed_at']  # Most recent first