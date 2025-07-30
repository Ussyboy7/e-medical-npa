# backend/auth_app/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "role": self.get_role(self.user),
        }
        return data

    def get_role(self, user):
        if hasattr(user, "role"):
            return user.role
        if user.is_superuser:
            return "superadmin"
        if user.is_staff:
            return "admin"
        return "user"


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "role"]

    def get_role(self, obj):
        if hasattr(obj, "role"):
            return obj.role
        if obj.is_superuser:
            return "superadmin"
        if obj.is_staff:
            return "admin"
        return "user"


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)