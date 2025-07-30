# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('superadmin', 'SuperAdmin'),
        ('nurse', 'Nurse'),
        ('doctor', 'Doctor'),
        ('lab', 'Lab Technician'),
        ('pharmacy', 'Pharmacy'),
        ('records', 'Medical Records'),
        ('physiotherapist', 'Physiotherapist'),
    )
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='superadmin')