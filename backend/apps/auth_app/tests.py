from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="emradmin",
            email="admin@example.com",
            password="emradmin"
        )

    def test_token_obtain_pair(self):
        url = reverse('token_obtain_pair')
        response = self.client.post(url, {
            "username": "emradmin",
            "password": "emradmin"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_user_detail_requires_auth(self):
        url = reverse('user_detail')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)  # Unauthorized

    def test_change_password(self):
        url = reverse('change_password')
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, {
            "old_password": "emradmin",
            "new_password": "newsecurepass"
        })
        self.assertEqual(response.status_code, 200)