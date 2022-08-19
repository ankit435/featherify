from django.urls import path, include

urlpatterns = [
    path("api/manipulate", include("manipulator.urls")),
]
