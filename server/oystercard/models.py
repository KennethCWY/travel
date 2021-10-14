from django.db import models
from django.conf import settings


class Trip(models.Model):
    trip_id = models.CharField(max_length=30, unique=True, verbose_name='Trip ID')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='trips', on_delete=models.CASCADE)
    destination = models.CharField(max_length=100, null=False)
    departure_date = models.CharField(max_length=30)
    return_date = models.CharField(max_length=30)

    def __str__(self):
        return self.destination


class Flight(models.Model):
    trip = models.ForeignKey(Trip, related_name='flights', on_delete=models.CASCADE)
    airline = models.CharField(max_length=100)
    location = models.CharField(max_length=100, null=False)
    destination = models.CharField(max_length=100, null=False)
    departure_airport = models.CharField(max_length=200, null=False)
    arrival_airport = models.CharField(max_length=200, null=False)
    scheduled_departure = models.CharField(max_length=30)
    scheduled_arrival = models.CharField(max_length=30)
    duration = models.IntegerField(null=False)

    def __str__(self):
        return f'Flight from {self.location} to {self.destination}'


class Experience(models.Model):
    trip = models.ForeignKey(Trip, related_name='experiences', on_delete=models.CASCADE)
    category = models.CharField(
        max_length=10,
        choices=[
            ('hotel', 'Hotel'),
            ('restaurant', 'Restaurant'),
            ('attraction', 'Attraction'),
        ],
    )
    name = models.CharField(max_length=200, null=False)
    address = models.CharField(max_length=500, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(default=0, decimal_places=1, max_digits=2)
    review_count = models.IntegerField(default=0)
    image = models.CharField(max_length=500)
    tripadvisor_link = models.CharField(max_length=500, null=True, blank=True)
    website_link = models.CharField(max_length=500, null=True, blank=True)
    cuisine = models.CharField(max_length=500, null=True, blank=True)
    price = models.CharField(max_length=10, null=True, blank=True)
    ranking = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return f'{self.category.capitalize()} - {self.name}'


class FlightReaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='flight_reactions', on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, related_name='reactions', on_delete=models.CASCADE)
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)
    timestamp = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.user.username} {"liked" if self.like == True else "disliked"} {self.flight.name} flight'


class ExperienceReaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='experience_reactions', on_delete=models.CASCADE)
    experience = models.ForeignKey(Experience, related_name='reactions', on_delete=models.CASCADE)
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)
    timestamp = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.user.username} {"liked" if self.like == True else "disliked"} {self.experience.name} experience'


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, related_name='comments', on_delete=models.CASCADE)
    body = models.CharField(max_length=500)
    timestamp = models.CharField(max_length=30)

    def __str__(self):
        return self.body