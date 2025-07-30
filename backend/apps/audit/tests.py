from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import AuditLog

User = get_user_model()

class AuditLogAPITests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(username='admin', password='adminpass')
        self.client = APIClient()
        self.client.force_authenticate(user=self.admin)

    def test_create_audit_log(self):
        log = AuditLog.objects.create(
            user=self.admin,
            action="Test action"
        )
        self.assertEqual(AuditLog.objects.count(), 1)
        self.assertEqual(log.user, self.admin)

    def test_list_audit_logs(self):
        AuditLog.objects.create(user=self.admin, action="First log")
        AuditLog.objects.create(user=self.admin, action="Second log")
        url = reverse('auditlog-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)