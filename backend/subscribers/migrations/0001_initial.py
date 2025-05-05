# subscribers/migrations/0001_initial.py (Corrected Again)
import django.core.validators
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Subscriber',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(error_messages={'unique': 'This email address is already subscribed.'}, max_length=254, validators=[django.core.validators.EmailValidator()], verbose_name='Email Address')),
                ('name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Full Name')),
                ('subscribed_at', models.DateTimeField(auto_now_add=True, help_text='The date and time when the subscriber joined.', verbose_name='Subscription Date')),
                ('is_active', models.BooleanField(default=True, help_text='Indicates whether the subscriber is active.', verbose_name='Active Subscriber')),
                ('unsubscribed_at', models.DateTimeField(blank=True, help_text='The date and time when the subscriber unsubscribed.', null=True, verbose_name='Unsubscription Date')),
            ],
            options={
                'verbose_name': 'Subscriber',
                'verbose_name_plural': 'Subscribers',
                'ordering': ['-subscribed_at'],
            },
        ),
        migrations.RunSQL(
            sql="ALTER TABLE subscribers_subscriber ADD UNIQUE INDEX subscriber_email_unique (email(191));",
            reverse_sql="ALTER TABLE subscribers_subscriber DROP INDEX subscriber_email_unique;",
        ),
    ]