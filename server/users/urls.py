from django.urls import path
from .views import UserRegistration

app_name = 'users'

urlpatterns = [
    path('register/', UserRegistration.as_view(), name="create_user")
]