from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import LoginView, RegisterUserView

app_name = "authentification"  # pylint: disable=invalid-name

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),  # type: ignore
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),  # type: ignore
    path("register/", RegisterUserView.as_view(), name="register"),  # type: ignore
]
