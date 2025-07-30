# myapp/tests/test_auth.py
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthFlowTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="testpassword"
        )
        self.login_url = reverse("token_obtain_pair")
        self.me_url = reverse("user_detail")
        self.refresh_url = reverse("token_refresh")

    def test_login_and_me(self):
        res = self.client.post(self.login_url, {
            "username": "testuser",
            "password": "testpassword"
        })
        self.assertEqual(res.status_code, 200)
        access = res.data["access"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        me_res = self.client.get(self.me_url)
        self.assertEqual(me_res.status_code, 200)
        self.assertEqual(me_res.data["username"], "testuser")

    def test_token_refresh(self):
        res = self.client.post(self.login_url, {
            "username": "testuser",
            "password": "testpassword"
        })
        self.assertEqual(res.status_code, 200)
        refresh = res.data["refresh"]

        refresh_res = self.client.post(self.refresh_url, {
            "refresh": refresh
        })
        self.assertEqual(refresh_res.status_code, 200)
        self.assertIn("access", refresh_res.data)