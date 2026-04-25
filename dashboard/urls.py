from django.urls import path
from .views import StatsView
from .views import NotificationView
urlpatterns = [
    path('stats/', StatsView.as_view()),
    path('notifications/', NotificationView.as_view()),
]