from rest_framework import serializers
from .models import Issue

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'
        # FIX 2: Server-side fields ko read-only rakho
        read_only_fields = ('id', 'created_at', 'created_by', 'assigned_to', 'status')
