from django.urls import path

from .views import ManipulatorView

urlpatterns = [path("", ManipulatorView.as_view(), name="images-manipulator")]
