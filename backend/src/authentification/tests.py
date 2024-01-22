from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import User


class UserViewTests(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.registered_user = {"password": "testpassword123", "email": "registered@example.com"}
        self.not_registered_user = {"password": "testpassword123", "email": "notregistered@example.com"}
        User.objects.create_user(**self.registered_user)

    def test_register_user(self) -> None:
        response = self.client.post(reverse("authentification:register"), self.not_registered_user)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

    def test_login_user(self) -> None:
        response = self.client.post(reverse("authentification:login"), self.registered_user)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.json())
        self.assertIn("refresh", response.json())

    def test_login_wrong_password(self) -> None:
        response = self.client.post(
            reverse("authentification:login"),
            {"password": "wrongpassword", "email": self.registered_user["email"]},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn("access", response.json())
        self.assertNotIn("refresh", response.json())

    def test_missing_email(self) -> None:
        response = self.client.post(reverse("authentification:login"), {"password": "wrongpassword"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn("access", response.json())
        self.assertNotIn("refresh", response.json())

    def test_register_user_already_exists(self) -> None:
        response = self.client.post(reverse("authentification:register"), self.registered_user)
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(response.json(), {"email": ["Un utilisateur avec cette adresse email existe déjà."]})
