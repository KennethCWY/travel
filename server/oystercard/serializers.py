from rest_framework.serializers import ModelSerializer
from .models import Comment, Experience, ExperienceReaction, Flight, FlightReaction, Trip


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class FlightReactionSerializer(ModelSerializer):
    class Meta:
        model = FlightReaction
        fields = '__all__'


class ExperienceReactionSerializer(ModelSerializer):
    class Meta:
        model = ExperienceReaction
        fields = '__all__'


class FlightSerializer(ModelSerializer):
    reactions = FlightReactionSerializer(many=True, read_only=True)

    class Meta:
        model = Flight
        fields = '__all__'


class ExperienceSerializer(ModelSerializer):
    reactions = ExperienceReactionSerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = '__all__'


class TripSerializer(ModelSerializer):
    flights = FlightSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = '__all__'
