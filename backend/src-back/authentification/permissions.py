from rest_framework import permissions


class IsActiveAndAuthenticated(permissions.BasePermission):
    """
    Custom permission to only allow access to active and authenticated users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_active
