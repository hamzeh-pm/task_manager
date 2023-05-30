from rest_framework import permissions, viewsets

from ..models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return self.request.user.categories.all()

    def perform_create(self, serializer):
        self.serializer_class.save(created_by=self.request.user)
