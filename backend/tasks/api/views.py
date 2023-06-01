from django.db.models import Count
from rest_framework import filters, permissions, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Category, Task
from .permissions import TaskPermission
from .serializers import (
    CategorySerializer,
    TaskByCategorySerializer,
    TaskCompletedSerializer,
    TaskSerializer,
)


class StandardResultPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 5


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return self.request.user.categories.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, TaskPermission]
    serializer_class = TaskSerializer
    pagination_class = StandardResultPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title"]
    ordering_fields = ["completed", "title"]
    ordering = ["completed"]

    def get_queryset(self):
        user = self.request.user
        completed = self.request.query_params.get("completed")
        priority = self.request.query_params.get("priority")
        category = self.request.query_params.get("category")
        query_params = {}

        if completed is not None:
            query_params["completed"] = completed

        if priority is not None:
            query_params["priority"] = priority

        if category is not None:
            query_params["category"] = category

        return Task.objects.filter(created_by=user, **query_params)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskCompletedView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskCompletedSerializer

    def get(self, request, format=None):
        queryset = (
            Task.objects.filter(created_by=request.user)
            .values("completed")
            .annotate(count=Count("completed"))
        )
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


class TaskByCategoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskByCategorySerializer

    def get(self, request, format=None):
        queryset = Category.objects.filter(created_by=request.user).annotate(
            count=Count("tasks")
        )
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
