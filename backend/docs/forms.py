from django import forms
from django_select2.forms import Select2MultipleWidget
from django.utils.html import format_html, mark_safe
from .models import *

class GroupedDisciplineMultipleChoiceField(forms.ModelMultipleChoiceField):
    def label_from_instance(self, obj):
        return mark_safe(f"{obj.name}")

    def __init__(self, queryset, *args, **kwargs):  # Add queryset argument
        super().__init__(queryset, *args, **kwargs)  # Pass queryset to super
        self.choices = self._get_choices()

    def _get_choices(self):
        choices = [("", self.empty_label or "---------")] if self.empty_label is not None else []
        groups = {}
        for obj in self.queryset.order_by('category__name', 'name'):
            group_name = obj.category.name if obj.category else "Uncategorized"
            if group_name not in groups:
                groups[group_name] = []
            groups[group_name].append((obj.pk, self.label_from_instance(obj)))

        for group_name, group_choices in groups.items():
            choices.append((group_name, tuple(group_choices)))  # Changed here

        return choices

class GroupedStateMultipleChoiceField(forms.ModelMultipleChoiceField):
    def label_from_instance(self, obj):
        return mark_safe(f"{obj.name}")

    def __init__(self, queryset, *args, **kwargs):  # Add queryset argument
        super().__init__(queryset, *args, **kwargs)  # Pass queryset to super
        self.choices = self._get_choices()

    def _get_choices(self, ):
        choices = [("", self.empty_label or "---------")] if self.empty_label is not None else []
        groups = {}
        for obj in self.queryset.order_by('country__name', 'name'):
            group_name = obj.country.name if obj.country else "Uncategorized"
            if group_name not in groups:
                groups[group_name] = []
            groups[group_name].append((obj.pk, self.label_from_instance(obj)))

        for group_name, group_choices in groups.items():
            choices.append((group_name, tuple(group_choices)))  # Changed here

        return choices

STATUS_CHOICES = (
    (0, 'Published'),
    (1, 'Featured'),
    (2, 'Draft'),
)

class PostForm(forms.ModelForm):
    discipline = GroupedDisciplineMultipleChoiceField(
        queryset=Discipline.objects.all(),
        widget=Select2MultipleWidget(),  # Use Select2MultipleWidget here
    )

    state = GroupedStateMultipleChoiceField(
        queryset=State.objects.all(),
        widget=Select2MultipleWidget(),  # Use Select2MultipleWidget here
    )

    class Meta:
        model = Post
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk is None:
            self.fields['user'].widget.attrs['disabled'] = True