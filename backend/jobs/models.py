from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
class Job(models.Model):
    user = models.ForeignKey(
        'accounts.CustomUser',
        on_delete=models.CASCADE,
    )

    title = models.CharField(max_length=255)

    desc = models.TextField()

    fee = models.IntegerField()

    LESS_1 = 'lESS_1'
    MONTH_1_3 = 'lESS_3'
    MONTH_3_6 = 'LESS_6'
    LESS_6 = 'AT_6'
    DURATION_CHOICES = (
        (LESS_1, 'Less than 1 month'),
        (MONTH_1_3, '1 to 3 months'),
        (MONTH_3_6, '3 to 6 months'),
        (LESS_6, 'Less than 6 months'),
    )

    duration = models.CharField(max_length=20, choices=DURATION_CHOICES, default=LESS_1)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Proposal(models.Model):
    job = models.ForeignKey(
        'Job',
        on_delete=models.CASCADE
    )

    user = models.ForeignKey(
        'accounts.CustomUser',
        on_delete=models.CASCADE
    )

    proposal = models.TextField()

    status = models.BooleanField(default=False)

    fee = models.IntegerField() 

    milestone = models.BooleanField(default=False)

    milestone_fee = ArrayField(
        models.CharField(max_length=255),
        size=8,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    

