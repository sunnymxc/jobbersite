from rest_framework import serializers

from .models import Job, Proposal

# create serializers here
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('pk', 'user', 'title', 'desc', 'fee', 'duration', 'created_at', 'updated_at')

class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = ('pk', 'job', 'user', 'proposal', 'fee', 'milestone_fee', 'created_at', 'updated_at')