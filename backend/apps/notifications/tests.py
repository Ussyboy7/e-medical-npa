from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import Notification

User = get_user_model()

class NotificationAPITests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_notification(self):
        notif = Notification.objects.create(
            recipient=self.user,
            message="Test notification"
        )
        self.assertEqual(Notification.objects.count(), 1)
        self.assertEqual(notif.recipient, self.user)

    def test_list_notifications(self):
        Notification.objects.create(recipient=self.user, message="First")
        Notification.objects.create(recipient=self.user, message="Second")
        url = reverse('notification-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)