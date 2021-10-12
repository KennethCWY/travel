from django.contrib import admin
from .models import Comment, Experience, ExperienceReaction, Flight, FlightReaction, Trip

admin.site.register(Trip)
admin.site.register(Flight)
admin.site.register(Experience)
admin.site.register(FlightReaction)
admin.site.register(ExperienceReaction)
admin.site.register(Comment)
