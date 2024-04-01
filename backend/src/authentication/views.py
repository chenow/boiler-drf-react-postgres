from rest_framework import generics, permissions, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from authentication.models import User

from .serializers import CustomTokenObtainPairSerializer, UserRegisterSerializer


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer  # type: ignore
    permission_classes = ()  # No need for authentication


class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request: Request, *args, **kwargs) -> Response:
        user_email = request.data.get("email")
        if User.objects.filter(email=user_email).exists():
            return Response(
                {"email": ["Un utilisateur avec cette adresse email existe déjà."]},
                status=status.HTTP_409_CONFLICT,
            )
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UsersView(generics.ListAPIView):
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAdminUser,)
