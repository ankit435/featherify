from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .helpers.get_feather_image import get_feather_images
from .serializers import ManipulatorSerializer


class ManipulatorView(APIView):
    def get(self, request):
        api_info_data = {"status": "online"}
        return Response(data=api_info_data)

    def post(self, request, format=None):

        serializer = ManipulatorSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        urls = serializer.validated_data.get("urls")

        image_files = serializer.validated_data.get("images")

        width = serializer.validated_data.get("width")
        height = serializer.validated_data.get("height")

        config = serializer.validated_data.get("config")

        results = get_feather_images(
            files=image_files, urls=urls, width=width, height=height, config=config
        )

        return Response(data=results)
