from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.views import APIView


class IsActiveAndAuthenticated(permissions.BasePermission):  # type: ignore
    """Custom permission to only allow access to active and authenticated users."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        return bool(request.user and request.user.is_authenticated and request.user.is_active)

    def has_object_permission(self, request: Request, view: APIView, obj: object) -> bool:
        return True
