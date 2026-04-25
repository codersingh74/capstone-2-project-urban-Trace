from rest_framework import viewsets
from .models import Issue
from .serializers import IssueSerializer
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from dashboard.models import Notification
from .email_utils import send_issue_report_email  # ← Email import

User = get_user_model()


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all().order_by('-created_at')   # ← Router ke liye zaroori
    serializer_class = IssueSerializer
    permission_classes = []
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def perform_create(self, serializer):
        issue = serializer.save()
        send_issue_report_email(issue)   # ← Issue save hone ke baad email bhejo

    def get_queryset(self):
        return Issue.objects.all().order_by('-created_at')

    @action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        issue = self.get_object()
        user_id = request.data.get('user_id')
        try:
            authority = User.objects.get(id=user_id)
            issue.assigned_to = authority
            issue.save()
            return Response({"message": "Assigned successfully"})
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=400)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        issue = self.get_object()

        if issue.created_by:
            Notification.objects.create(
                user=issue.created_by,
                message=f"Issue #{issue.id} status updated to: {issue.status}"
            )

        try:
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "issues",
                {"type": "send_issue_update", "data": {"id": issue.id, "status": issue.status}}
            )
        except Exception:
            pass

        return response
