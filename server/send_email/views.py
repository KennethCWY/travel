from rest_framework import response, serializers
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from server.send_email.models import Email
from django.core.mail import send_mail

from .models import Email
from .serializers import EmailSerializer

# Create your views here.
class EmailView(ModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer

    def send_email(self, request):
        subject = "Oyster Invitation!"
        message = f"{request.name} invited you to a trip! f{request.url}"
        sender = ""
        if request.method == 'POST':
            send_mail(
                subject, #subject
                message, #message
                sender, #from email
                [''], #to email
                fail_silently=False
            )