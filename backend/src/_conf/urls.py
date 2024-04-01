from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version="v1",
        description="Boiler plate for Django Rest Framework",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


prefix = "api/v1"

urlpatterns = [
    path(f"{prefix}/swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),  # type: ignore
    path(f"{prefix}/admin/", admin.site.urls),
    path(f"{prefix}/authentication/", include("authentication.urls")),
    path(f"{prefix}/users", include("authentication.urlsusers")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
