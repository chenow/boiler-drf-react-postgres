from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from utils import get_test_superuser_credentials

from .models import User


class UserViewTests(TestCase):
    def setUp(self) -> None:
        self.client: APIClient = APIClient()
        self.user_credentials = {"password": "testpassword123", "email": "testuser@example.com"}
        self.superuser_credentials = get_test_superuser_credentials()

    def test_register_user(self) -> None:
        response = self.client.post(reverse("authentification:register"), self.user_credentials)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

    def test_login_user(self) -> None:
        User.objects.create_user(**self.user_credentials)
        response = self.client.post(reverse("authentification:login"), self.user_credentials)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.json())
        self.assertIn("refresh", response.json())

    def test_login_wrong_password(self) -> None:
        User.objects.create_user(**self.user_credentials)
        response = self.client.post(
            reverse("authentification:login"),
            {"password": "wrongpassword", "email": self.user_credentials["email"]},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn("access", response.json())
        self.assertNotIn("refresh", response.json())

    def test_missing_password(self) -> None:
        response = self.client.post(reverse("authentification:login"), {"email": "testemail", "password": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn("access", response.json())
        self.assertNotIn("refresh", response.json())

    def test_register_user_already_exists(self) -> None:
        User.objects.create_user(**self.user_credentials)
        response = self.client.post(reverse("authentification:register"), self.user_credentials)
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(response.json(), {"email": ["Un utilisateur avec cette adresse email existe déjà."]})

    def test_list_users(self) -> None:
        superuser = User.objects.create_superuser(**self.superuser_credentials)
        self.client.force_authenticate(user=superuser)
        response = self.client.get(reverse("users:users"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["count"], 1)
        self.assertEqual(response.json()["results"][0]["id"], 1)
