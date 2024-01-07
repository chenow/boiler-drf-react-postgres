from rest_framework import permissions
from rest_framework.request import Request


class IsActiveAndAuthenticated(permissions.BasePermission):
    """Custom permission to only allow access to active and authenticated users."""

    def has_permission(self, request: Request, view) -> bool:  # noqa: ANN001
        return bool(request.user and request.user.is_authenticated and request.user.is_active)
