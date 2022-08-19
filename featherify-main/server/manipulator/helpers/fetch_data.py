from django.core.files.uploadedfile import InMemoryUploadedFile
import urllib3
from io import BytesIO


def get_file_data(file: InMemoryUploadedFile) -> dict:

    file_data = {}

    if type(file_data) == "str":
        error = "{} is not a valid file".format(file)
        file_data["error"] = error

    else:
        file_data["name"] = file.name
        file_data["file"] = file.file

    return file_data


def get_url_data(url: str) -> dict:

    response = {}

    http = urllib3.PoolManager()

    try:
        resp = http.request("GET", url)
        response["image_bytes"] = BytesIO(resp.data)

    except (urllib3.exceptions.HTTPError or urllib3.exceptions.ProtocolError) as e:
        response["error"] = "could not get url {0} - {1}".format(url, e)

    except:
        response["error"] = "request failed for the url - {}".format(url)

    return response
