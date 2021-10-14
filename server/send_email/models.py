from django.db import models

# Create your models here.
class Email(models.Model):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=500)
    to_email = models.EmailField(max_length=500)

    def __str__(self):
        return self.to_email