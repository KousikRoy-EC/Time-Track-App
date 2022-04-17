
from django.contrib import admin
from django.urls import path
from track import views


urlpatterns = [
    # path('', views.time, name="time"),
    path('time/', views.time, name="time"),
    path('generate/<int:id>/', views.generatebyID, name="generatebyid"),
    path('generate/', views.generate, name="generate"),


]
