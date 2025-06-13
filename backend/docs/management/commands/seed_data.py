import random
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils.text import slugify
import uuid

# Import your models, specifically Post and its related models
from docs.models import CustomUser, Discipline, State, Gallery, Post

from faker import Faker

class Command(BaseCommand):
    help = 'Populates the database with 25 fake Post entries, linking to pre-existing related models (ID 1) and ignoring Gallery and Video.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--num_posts',
            type=int,
            default=25, # Default to 25 posts as requested
            help='The number of fake posts to create.'
        )
        parser.add_argument(
            '--seed',
            type=int,
            help='Seed for Faker to generate repeatable data.'
        )

    def handle(self, *args, **options):
        # Initialize Faker
        fake = Faker('en_US') # 'en_US' for US English data. You can choose other locales.

        # Set seed if provided for reproducible data
        if options['seed']:
            Faker.seed(options['seed'])
            random.seed(options['seed']) # Also seed Python's random for consistent choices

        self.stdout.write("Starting data seeding for Post model...")

        num_posts = options['num_posts']

        try:
            with transaction.atomic():
                # Clear existing data for Post only
                self.stdout.write(self.style.WARNING("Clearing existing Post data..."))
                Post.objects.all().delete()
                self.stdout.write(self.style.SUCCESS("Existing Post data cleared."))

                # --- Fetch pre-existing required related models (ASSUMED TO EXIST WITH ID=1) ---

                # 1. Fetch CustomUser with ID=1
                self.stdout.write("Attempting to fetch CustomUser with ID=1...")
                try:
                    user_instance = CustomUser.objects.get(id=1)
                    self.stdout.write(self.style.SUCCESS(f"Found CustomUser: {user_instance.username} (ID: 1)"))
                except CustomUser.DoesNotExist:
                    raise CommandError("Error: CustomUser with ID=1 does not exist. Please create it first.")

                # 2. Fetch Discipline with ID=1
                self.stdout.write("Attempting to fetch Discipline with ID=1...")
                try:
                    discipline_instance = Discipline.objects.get(id=1)
                    self.stdout.write(self.style.SUCCESS(f"Found Discipline: {discipline_instance.name} (ID: 1)"))
                except Discipline.DoesNotExist:
                    raise CommandError("Error: Discipline with ID=1 does not exist. Please create it first.")

                # 3. Fetch State with ID=1
                self.stdout.write("Attempting to fetch State with ID=1...")
                try:
                    state_instance = State.objects.get(id=1)
                    self.stdout.write(self.style.SUCCESS(f"Found State: {state_instance.name} (ID: 1)"))
                except State.DoesNotExist:
                    raise CommandError("Error: State with ID=1 does not exist. Please create it first.")

                # --- Create Posts ---
                self.stdout.write(f"Creating {num_posts} fake posts...")
                posts_to_create_with_m2m = []
                for i in range(num_posts):
                    post_title = fake.unique.sentence(nb_words=6).rstrip('.') # Ensure unique titles for unique slugs

                    # Generate rich text content for HTMLField
                    desc_content = fake.html_content() if hasattr(fake, 'html_content') else fake.paragraph(nb_sentences=10, variable_nb_sentences=True)

                    # Create the Post object
                    # gallery and video are explicitly set to None as per your request
                    post = Post(
                        user=user_instance,
                        title=post_title,
                        desc=desc_content,
                        gallery=None, # Explicitly set to None as it's nullable
                        video=None,   # Explicitly set to None as it's nullable
                        status=random.choice([0, 1]),
                        # slug, created_at, updated_at are handled by the model's save method
                    )

                    # Store post and the specific related M2M instances for later setting
                    posts_to_create_with_m2m.append((post, [discipline_instance], [state_instance]))

                created_posts_count = 0
                for post, disciplines, states in posts_to_create_with_m2m:
                    post.save() # This triggers slug generation and auto_now_add/auto_now
                    post.discipline.set(disciplines) # Set ManyToMany relationships to the single instance (ID=1)
                    post.state.set(states) # Set ManyToMany relationships to the single instance (ID=1)
                    created_posts_count += 1

                self.stdout.write(self.style.SUCCESS(f"Successfully created {created_posts_count} posts."))

                self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))

        except CommandError as e:
            self.stdout.write(self.style.ERROR(str(e)))
        except Exception as e:
            raise CommandError(f"An unexpected error occurred during data seeding: {e}")