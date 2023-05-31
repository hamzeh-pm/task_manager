from rest_framework import serializers
from tasks.models import Category, Task


class CategorySerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Category
        fields = ["id", "name", "color", "created_at", "created_by"]
        extra_kwargs = {"created_by": {"read_only": True}}


class TaskSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "created_at",
            "completed",
            "priority",
            "category",
            "created_by",
        ]
        extra_kwargs = {
            "created_by": {"read_only": True},
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["category"] = instance.category.name
        data["priority"] = instance.get_priority_display()
        return data
