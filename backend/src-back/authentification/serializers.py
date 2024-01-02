from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):  # pylint: disable=abstract-method
    def __init__(self, *args, **kwargs) -> None:
        self.user: User
        super().__init__(*args, **kwargs)

    def validate(self, attrs):
        self.user: User
        data = super().validate(attrs)
        data["is_superuser"] = str(self.user.is_superuser)
        return data


class UserRegisterSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        fields = ("id", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
