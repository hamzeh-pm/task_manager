from rest_framework import serializers
from tasks.models import Category


class CategorySerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Category
        fields = ["id", "name", "color", "created_at", "created_by"]
        extra_kwargs = {"created_by": {"read_only": True}}
