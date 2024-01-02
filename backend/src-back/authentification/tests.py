from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import User


class UserViewTests(TestCase):
    def setUp(self):
        # Set up test data
        self.client = APIClient()
        self.user_data = {"password": "testpassword123", "email": "test@example.com"}
        self.user = User.objects.create_user(**self.user_data)

    def test_register_user(self):
        # Test registering a new user
        response = self.client.post(reverse("authentification:register"), self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)  # Including the one created in setUp

    def test_login_user(self):
        # Test logging in a user
        response = self.client.post(
            reverse("authentification:login"),
            {"email": self.user_data["email"], "password": self.user_data["password"]},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.json())
        self.assertIn("refresh", response.json())
