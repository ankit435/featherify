from base64 import b64decode, b64encode
from io import BytesIO
from typing import AnyStr, Dict, List, Tuple

from PIL import Image, ImageEnhance


def __create_rows(pixels: List[Tuple], width: int) -> List[List[Tuple]]:
    return [pixels[x : x + width] for x in range(0, len(pixels), width)]


def _get_image_rows(
    file_content: BytesIO, width: int, height: int
) -> List[List[Tuple]]:

    im = Image.open(file_content)
    resized_image = im.resize((width, height))

    pixels: List[Tuple] = list(resized_image.getdata())

    rows = __create_rows(pixels, width)

    return rows


def _get_linear_gradient(rows: List[List[Tuple]]) -> List[AnyStr]:
    linear_gradients: List[AnyStr] = []

    for row in rows:
        rgbs: List[AnyStr] = []

        for t in row:
            rgb_vals = ",".join(map(str, t))
            rgb_str = "rgb({})".format(rgb_vals)
            rgbs.append(rgb_str)

        gradients: List[AnyStr] = []

        for i in range(0, len(rgbs)):
            a = (i / len(rgbs)) * 100.0
            start = "{}%".format((i / len(rgbs)) * 100.0)
            end = "{}%".format(((i + 1) / len(rgbs)) * 100.0)
            gradient = "{0} {1} {2}".format(rgbs[i], start, end)
            gradients.append(gradient)

        gradients = ", ".join(gradients)

        linear_gradients.append("linear-gradient(90deg, {})".format(gradients))

    return linear_gradients


def _get_image_size(gradients: List[AnyStr]) -> str:
    return "100% {}%".format(100.00 / len(gradients))


def _get_image_position(gradients: List[AnyStr]) -> str:
    positions = [
        "0 {}%".format(i / (len(gradients) - 1) * 100.00)
        for i in range(0, len(gradients))
    ]
    return ",".join(positions)


def get_image_css(content: BytesIO, width: int, height: int) -> Dict[str, str]:

    im_rows = _get_image_rows(content, width, height)
    im_gradient = _get_linear_gradient(im_rows)

    return {
        "backgroundImage": ",".join(im_gradient),
        "backgroundPosition": _get_image_position(im_gradient),
        "backgroundSize": _get_image_size(im_gradient),
    }


def get_image_base64(content: BytesIO, width: int, height: int) -> str:

    im = Image.open(content)

    img_format = im.format
    resized_image = im.resize((width, height))

    enhancer = ImageEnhance.Color(resized_image)
    newimg = enhancer.enhance(2)

    buffered = BytesIO()

    newimg.save(buffered, format=img_format)

    base64_data = b64encode(buffered.getvalue()).decode()

    base64_url = "data:image/{img_format};base64,{base64_data}".format(
        img_format=img_format, base64_data=base64_data
    )

    return base64_url
