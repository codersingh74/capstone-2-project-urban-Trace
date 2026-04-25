from rest_framework.response import Response
from issues.models import Issue
from rest_framework.views import APIView
from .models import Notification


class StatsView(APIView):
    def get(self, request):
        total = Issue.objects.count()
        pending = Issue.objects.filter(status='pending').count()
        in_progress = Issue.objects.filter(status='in_progress').count()
        resolved = Issue.objects.filter(status='resolved').count()

        return Response({
            "total": total,
            "pending": pending,
            "in_progress": in_progress,
            "resolved": resolved,
        })


class NotificationView(APIView):
    def get(self, request):
        # FIX: Auth off hai to request.user anonymous hoga - safely handle karo
        if not request.user or not request.user.is_authenticated:
            return Response([])
        notifications = Notification.objects.filter(user=request.user).order_by('-created_at')
        data = [{"id": n.id, "msg": n.message, "created_at": str(n.created_at)} for n in notifications]
        return Response(data)
