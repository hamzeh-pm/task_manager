from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=6)
    created_by = models.ForeignKey(
        User, related_name="categories", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
