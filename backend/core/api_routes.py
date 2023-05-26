from django.urls import include, path

app_name = "api"

urlpatterns = [
    path("tasks/", include("tasks.api.urls", namespace="tasks")),
]
