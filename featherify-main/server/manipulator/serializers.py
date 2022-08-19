from rest_framework import serializers

from .default_settings import CONFIGURATION, WIDTH, HEIGHT


def configurationValidator(value):
    if value not in ["base64", "css"]:
        raise serializers.ValidationError(
            "The value for configuration should be either 'css' or 'base64'"
        )


def inRangeValidator(value):
    if not (value >= 5 and value <= 100):
        raise serializers.ValidationError(
            "The value for height and width should between 5 and 100"
        )


class ManipulatorSerializer(serializers.Serializer):
    images = serializers.ListField(default=[])
    urls = serializers.ListField(default=[])
    config = serializers.CharField(
        default=CONFIGURATION, validators=[configurationValidator]
    )
    width = serializers.IntegerField(default=WIDTH, validators=[inRangeValidator])
    height = serializers.IntegerField(default=HEIGHT, validators=[inRangeValidator])
