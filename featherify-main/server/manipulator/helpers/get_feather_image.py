from typing import Dict, List
from uuid import uuid4

from django.core.files.uploadedfile import InMemoryUploadedFile

from .fetch_data import get_file_data, get_url_data
from .process_image import get_image_base64, get_image_css


def _get_image_css_from_file(
    file: InMemoryUploadedFile, width: int, height: int
) -> Dict[str, str]:

    file_data = get_file_data(file)

    output = {}

    if "error" in file_data:
        output["error"] = file_data.get("error")

    else:

        try:
            output["styles"] = get_image_css(file_data.get("file"), width, height)
            output["name"] = file_data.get("name")
        except:
            output["error"] = "problem processing file - {}".format(
                file_data.get("name")
            )

    return output


def _get_image_css_from_url(url: str, width: int, height: int) -> Dict[str, str]:

    output = {}

    try:

        response = get_url_data(url)

        if "image_bytes" in response:
            image_bytes = response.get("image_bytes")
            output["styles"] = get_image_css(image_bytes, width, height)
            output["name"] = url

        else:
            output["error"] = response.get("error")

    except:
        output["error"] = "problem processing url - {}".format(url)

    return output


def _get_image_base64_from_file(
    file: InMemoryUploadedFile, width: int, height: int
) -> Dict[str, str]:

    file_data = get_file_data(file)

    output = {}

    if "error" in file_data:
        output["error"] = file_data.get("error")

    else:

        try:
            output["base64"] = get_image_base64(file_data.get("file"), width, height)
            output["name"] = file_data.get("name")
        except:
            output["error"] = "problem processing file - {}".format(
                file_data.get("name")
            )

    return output


def _get_image_base64_from_url(url: str, width: int, height: int) -> Dict[str, str]:
    output = {}

    try:
        response = get_url_data(url)

        if "image_bytes" in response:
            image_bytes = response.get("image_bytes")
            output["base64"] = get_image_base64(image_bytes, width, height)
            output["name"] = url

        else:
            output["error"] = "problem processing url - {}".format(url)

    except:
        output["error"] = "problem processing url - {}".format(url)

    return output


def get_feather_images(
    files: List[InMemoryUploadedFile],
    urls: List[str],
    width: int,
    height: int,
    config: str,
) -> List[Dict]:
    results = []

    for file in files:
        res = None
        if config == "css":
            res = _get_image_css_from_file(file, width, height)
        else:
            res = _get_image_base64_from_file(file, width, height)

        if "error" not in res:
            res["uuid"] = uuid4()

        results.append(res)

    for url in urls:
        if config == "css":
            res = _get_image_css_from_url(url, width, height)
        else:
            res = _get_image_base64_from_url(url, width, height)

        if "error" not in res:
            res["uuid"] = uuid4()

        results.append(res)

    return results
