from rest_framework.test import APITestCase
from django.urls import reverse
from track.models import tracker


class TestTracker(APITestCase):
    def setUp(self):
        tracker.objects.create(
            UserId="07",
            Title="Lab manual completion",
            Start_Time="2:00",
            End_Time="4:00",
            Date="13/04/2022",
            Description="This is lab manual completion time",
            Modified_Date="NA"
        )

    def test_get_data(self):
        response = self.client.get("/api/generate/1/")
        self.assertEqual(response.status_code, 200)

    def test_post_data(self):
        data = {
            "UserId": "09",
            "Title": "Lab manual completion",
            "Start_Time": "2:00",
            "End_Time": "4:00",
            "Date": "13/04/2022",
            "Description": "This is lab manual completion time",
            "Modified_Date": "NA",
        }
        response = self.client.post("/api/time/", data=data)
        self.assertEqual(response.status_code, 201)
