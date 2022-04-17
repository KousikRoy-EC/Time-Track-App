from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from track.models import tracker
from track.serializer import trackersearializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http.response import JsonResponse


@api_view(['POST'])
def time(req):

    if req.method == 'POST':
        serializer = trackersearializer(data=req.data)

        if serializer.is_valid():
            print(req.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'key': 'value'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def generate(req):
    if req.method == 'GET':
        data = tracker.objects.all()
        serializer = trackersearializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def generatebyID(req, id):

    try:
        timetrackerID = tracker.objects.get(id=id)
    except tracker.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if req.method == 'GET':
        serializer = trackersearializer(timetrackerID)
        return JsonResponse(serializer.data)


def home(req):
    return render(req, "index.html")
