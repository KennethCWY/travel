from django.urls import path, include
from rest_framework import routers
from .views import (
    CommentView,
    ExperienceReactionView,
    ExperienceView,
    FlightReactionView,
    TripView,
    FlightView,
)

router = routers.DefaultRouter()
router.register(r'trips', TripView)
router.register(r'flights', FlightView)
router.register(r'experiences', ExperienceView)
router.register(r'flight_reactions', FlightReactionView)
router.register(r'experience_reactions', ExperienceReactionView)
router.register(r'comments', CommentView)

urlpatterns = [path('', include(router.urls))]
