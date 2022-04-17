from django.db import models

# Create your models here.


class tracker(models.Model):
    UserId = models.CharField(max_length=12)
    Title = models.CharField(max_length=122)
    Start_Time = models.CharField(max_length=122)
    End_Time = models.CharField(max_length=122)
    Date = models.CharField(max_length=122)
    Description = models.CharField(max_length=122)
    Modified_Date = models.CharField(max_length=122)
