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
    category_name = serializers.SerializerMethodField(read_only=True)
    priority_name = serializers.SerializerMethodField(read_only=True)

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
            "category_name",
            "priority_name",
        ]
        extra_kwargs = {
            "created_by": {"read_only": True},
        }

    def get_category_name(self, obj):
        return obj.category.name

    def get_priority_name(self, obj):
        return obj.get_priority_display()


class TaskCompletedSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField()

    class Meta:
        model = Task
        fields = ["completed", "count"]


class TaskByCategorySerializer(serializers.ModelSerializer):
    count = serializers.IntegerField()

    class Meta:
        model = Category
        fields = ["id", "name", "color", "count"]
