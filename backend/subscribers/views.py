from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import SubscriptionForm
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import SubscriptionForm
from .models import Subscriber
from django.http import HttpResponse, JsonResponse
from django.urls import reverse
from django.conf import settings # Import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import SubscriberSerializer  # Import the serializer
from rest_framework import viewsets # Import viewsets

# Create your views here.

class SubscriberViewSet(viewsets.ModelViewSet):
    """
    Viewset for handling CRUD operations on the Subscriber model.
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update`, and `destroy` actions.
    """
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

# The following views are for the HTML form, and are not part of the API.
def subscribe(request):
    """
    Handles the subscription form submission.  This view is used for
    the HTML form submission.
    """
    if request.method == 'POST':
        form = SubscriptionForm(request.POST)
        if form.is_valid():
            form.save() # Save the new subscriber
            email = form.cleaned_data['email']
            messages.success(request, f'Thank you for subscribing!  Please check your email ({email}) to confirm your subscription.')
            return redirect('subscribe')  # Redirect to the subscription page
        else:
            # Form is invalid, re-render the form with errors
            context = {'form': form}
            return render(request, 'subscribers/subscribe.html', context)
    else:
        # If it's a GET request, just display the empty form
        form = SubscriptionForm()
        context = {'form': form}
        return render(request, 'subscribers/subscribe.html', context)


def unsubscribe(request, email_or_id):
    """
    Handles the unsubscription request.  Uses email or ID.
    """
    try:
        # Attempt to get subscriber by email (case-insensitive)
        subscriber = Subscriber.objects.filter(email__iexact=email_or_id).first()
        if not subscriber:
            # If not found by email, try by ID
            try:
                subscriber = Subscriber.objects.get(id=email_or_id)
            except Subscriber.DoesNotExist:
                messages.error(request, "Invalid unsubscription link.")
                return redirect('subscribe')  # Or a more appropriate page

        if subscriber.is_active:
            subscriber.unsubscribe() # Use the unsubscribe method
            messages.success(request, "You have been successfully unsubscribed.")
        else:
            messages.info(request, "This email is already unsubscribed.")
        return redirect('subscribe') # Redirect to a confirmation page.

    except Exception as e:
        # Log the error
        print(f"Error during unsubscription: {e}")
        messages.error(request, "An error occurred during unsubscription. Please try again.")
        return redirect('subscribe')  # Redirect after error

def confirm_subscription(request, token):
    """
    Confirms a subscription using a token (optional, for future use).
    """
    #  Add actual token verification logic here.
    #  This is a placeholder.  You would typically look up the subscriber
    #  by the token and activate their subscription.
    #  For now, we'll just mark it as successful.
    messages.success(request, "Your subscription has been confirmed!")
    return redirect('subscribe')