from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs) -> None:
        self.user: User
        super().__init__(*args, **kwargs)

    def validate(self, attrs: dict) -> dict:
        data = super().validate(attrs)
        data["is_superuser"] = str(self.user.is_superuser)
        return data


class UserRegisterSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        exclude = ["groups", "user_permissions"]
        extra_kwargs = {"password": {"write_only": True}, "email": {"write_only": True}}
        read_only_fields = ["is_active", "is_staff", "is_superuser", "last_login", "date_joined"]

    def create(self, validated_data: dict) -> User:
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
