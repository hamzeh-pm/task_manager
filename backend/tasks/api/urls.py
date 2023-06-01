from django.urls import path
from rest_framework import routers

from . import views

app_name = "tasks"

router = routers.DefaultRouter()
router.register("category", views.CategoryViewSet, "category")
router.register("task", views.TaskViewSet, "task")

urlpatterns = [
    path("status/task/", views.TaskCompletedView.as_view(), name="task_completed"),
    path(
        "status/category/", views.TaskByCategoryView.as_view(), name="task_by_category"
    ),
]

urlpatterns += router.urls
