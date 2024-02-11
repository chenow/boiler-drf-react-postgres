from django.urls import path

from authentification.views import UsersView

app_name = "users"


urlpatterns = [
    path("", UsersView.as_view(), name="users"),
]
