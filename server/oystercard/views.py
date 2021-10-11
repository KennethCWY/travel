from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Comment, Experience, ExperienceReaction, Flight, FlightReaction, Trip
from .serializers import (
    CommentSerializer,
    ExperienceReactionSerializer,
    ExperienceSerializer,
    FlightReactionSerializer,
    FlightSerializer,
    TripSerializer,
)


class TripView(ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    # Users can only get a trip's detail by using the 'trip_id' value, instead of the 'id' value
    def retrieve(self, request, pk=None):
        queryset = Trip.objects.filter(trip_id=pk)
        trip = get_object_or_404(queryset)
        serializer = TripSerializer(trip)
        return Response(serializer.data)


class FlightView(ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer


class ExperienceView(ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class FlightReactionView(ModelViewSet):
    queryset = FlightReaction.objects.all()
    serializer_class = FlightReactionSerializer


class ExperienceReactionView(ModelViewSet):
    queryset = ExperienceReaction.objects.all()
    serializer_class = ExperienceReactionSerializer


class CommentView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
