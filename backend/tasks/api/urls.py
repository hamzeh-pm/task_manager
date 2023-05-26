from django.urls import path
from rest_framework import routers

from . import views

app_name = "tasks"

router = routers.DefaultRouter()
router.register("category", views.CategoryViewSet, "category")


urlpatterns = router.urls
