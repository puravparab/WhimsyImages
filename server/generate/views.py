import os
from io import BytesIO

from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import imghdr

from .utils import *
from .openai import *

"""
Whimsy api

body: image, style, ethnicity, gender

1. Only accepts images
2. Image files must be less than 1 MB
"""
@api_view(['POST'])
def whimsy(request):
	image = request.data.get("image")
	style = request.data.get("style")
	race = request.data.get("race")
	gender = request.data.get("gender")

	# If image not uploaded
	if not image:
		return Response(
			{"status": "error", "message": "Image not found"}, 
			status = status.HTTP_400_BAD_REQUEST
		)

	image_size = image.size
	# If image size is not less than 1 MB
	if image_size > 1000001:
		return Response(
			{"status": "error", "message": "Image size should be less that 1MB"}, 
			status = status.HTTP_400_BAD_REQUEST
		)

	try:
		# Verify if image is an image file
		image.seek(0)  # Reset file position to the beginning
		file_type = imghdr.what(image)

		allowed_image_types = ["jpeg", "png", "webp"]

		if file_type not in allowed_image_types:
			return Response(
				{"status": "error", "message": "File is not an image file (jpeg, png, webp)"}, 
				status = status.HTTP_400_BAD_REQUEST
			)

		# process image
		image = resize_image(image, 300)
		buffer = BytesIO()
		image.save(buffer, format="PNG")
		base64_image = encode_image(buffer.getvalue())

		try:
			# Call the vision api
			prompt = "Describe this image in detail"
			max_tokens = 300
			model = "gpt-4-vision-preview"
			res = get_img_desc(base64_image, prompt, max_tokens, model)

			if not res.ok:
				return Response(
					{"status": "error", "message": res.json()}, 
					status = status.HTTP_500_INTERNAL_SERVER_ERROR
				)

			# Call the dalle api
			model = "dall-e-3"
			prompt = res.json()["choices"][0]["message"]["content"]
			size = "1024x1024"
			quality = "standard"
			n = 1
			image_res = generate_image(style, race, gender, model, prompt, size, quality, n)

			if not image_res.ok:
				return Response(
					{"status": "error", "message": image_res.json()}, 
					status = status.HTTP_500_INTERNAL_SERVER_ERROR
				)

			return Response(
				{"status": "success", "message": {"desc": res.json(), "image_gen": image_res.json()}}, 
				status = status.HTTP_200_OK
			)
			

		except Exception as e:
			return Response(
				{"status": "error", "message": f'Error while generating description: {str(e)}'}, 
				status = status.HTTP_500_INTERNAL_SERVER_ERROR
			)

	except Exception as e:
		return Response(
			{"status": "error", "message": str(e)}, 
			status = status.HTTP_500_INTERNAL_SERVER_ERROR
		)