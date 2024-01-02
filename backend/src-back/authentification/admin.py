import logging

from django.contrib import admin
from django.contrib.auth.models import Group
from rest_framework.authtoken.models import TokenProxy as DRFToken
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)

from authentification.models import User

logger = logging.getLogger(__name__)
logger.info("Registering authentification app in admin panel")


class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "is_active", "date_joined")
    list_display_links = ["email"]
    list_filter = ("is_active", "date_joined")
    search_fields = ("email",)
    ordering = ("-date_joined",)
    filter_horizontal = ()

    fieldsets = (
        ("Permissions", {"fields": ("is_active", "is_superuser")}),
        ("Date", {"fields": ("date_joined",)}),
    )


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
admin.site.unregister([DRFToken, OutstandingToken, BlacklistedToken])


admin.site.site_header = "Administration d'InternHub"
admin.site.site_title = "Administration d'InternHub"
