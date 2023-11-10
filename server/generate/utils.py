import base64
from PIL import Image

"""
resize image

params: image, res: resolution
"""
def resize_image(image, res):
	image = Image.open(image)
	width, height = image.size
	return image.resize((res, int(res * height / width)))

"""
encode image to base64

params: image
"""
def encode_image(image):
	return base64.b64encode(image).decode('utf-8')