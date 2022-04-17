from pyexpat import model
from rest_framework import serializers
from track.models import tracker


class trackersearializer(serializers.ModelSerializer):

    class Meta:
        model = tracker
        fields = ['UserId', 'Title', 'Start_Time', 'End_Time',
                  'Date', 'Description', 'Modified_Date']

    # def get_userbyid(self, obj):
    #     userId = models.tracker.objects.filter(
    #         UserId=obj.UserId)
    #     serializer = trackersearializer(userId, many=True)
    #     return serializer.data
