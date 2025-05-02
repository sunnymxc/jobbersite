from django import forms
from .models import Subscriber
from django.core.exceptions import ValidationError

class SubscriptionForm(forms.ModelForm):
    """
    Form for subscribing to the newsletter.
    """
    email = forms.EmailField(
        label="Email Address",
        widget=forms.EmailInput(attrs={'placeholder': 'Enter your email'}),
        help_text="Please enter a valid email address.",
    )
    name = forms.CharField(
        label="Full Name (Optional)",
        max_length=255,
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'Enter your full name (optional)'}),
        help_text="Your name (optional).",
    )

    class Meta:
        model = Subscriber
        fields = ['email', 'name']  # Include 'name' in the fields
        # No need to exclude fields.  Specify the fields to include.

    def clean_email(self):
        """
        Validates the email address.  Checks for duplicate subscriptions.
        """
        email = self.cleaned_data['email'].lower() # Ensure email is lowercase
        if Subscriber.objects.filter(email=email, is_active=True).exists():
            raise forms.ValidationError(
                "This email address is already subscribed.",
                code='duplicate'
            )
        return email

    def save(self, commit=True):
        """
        Saves the form data to the Subscriber model.
        """
        # Ensure email is lower case before saving.
        self.instance.email = self.cleaned_data['email'].lower()
        return super().save(commit=commit)