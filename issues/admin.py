from django.contrib import admin
from .models import Issue

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'status', 'latitude', 'longitude', 'created_at')
    list_filter = ('status', 'category')
    search_fields = ('title', 'description')
    ordering = ('-created_at',)
