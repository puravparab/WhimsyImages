from django.conf import settings

import base64
import requests
import json

"""
Get image description from openai gpt4 vision api

params: base64 encoded image, prompt, max tokens, model
"""
def get_img_desc(image, prompt, max_tokens, model):
	# Define headers
	headers = {
		"Content-Type": "application/json",
		"Authorization": f"Bearer {settings.OPENAI_KEY}"
	}
	# Define payload to the vision api
	payload = {
		"model": model,
		"messages": [{
			"role": "user",
			"content": [{
					"type": "text",
					"text": "Describe this image"
				},{
					"type": "image_url",
					"image_url": {
				  	"url": f"data:image/jpeg;base64,{image}"
					}
				}
			]
		}],
		"max_tokens": max_tokens
	}

	return requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

"""
Generate image from dalle

params: style, ethnicity, gender, model, prompt, size of image, quality of image, no of images
"""
def generate_image(style, ethnicity, gender, model, prompt, size, quality, n):
	style_dir = {
		'StudioGhibli': "in the style of Studio Ghibli with the following characteristics: peaceful landscapes, vibrant colors, and whimsical characters reminiscent of Miyazaki's films.",
		'8-Bit': "8-bit pixelated art style. Emphasize blocky pixel graphics, limited color palette, and a retro video game aesthetic.",
		'Impressionism': "Impressionist style. Focus on capturing the essence of a scene with loose brushstrokes, soft lighting, and an emphasis on color and atmosphere reminiscent of artists like Monet and Renoir.",
		'random': "unique and random artistic style. Explore diverse elements of form, color, and composition to create a visually intriguing and novel piece.",
	}
	ethnicity_dir = {
		'none': "",
		'aian': "person is american indian or alaskan native.",
		'black': "person is african.",
		'ea': "person is east asian.",
		'his': "person is hispanic/latino",
		'sa': "person is indian/desi.",
		'white': "person is white/caucasian.",
		'random': "choose any race for this person."
	}
	gender_dir = {
		'none': "",
		'female': "person is female.",
		'male': "person is male.",
		'nb': "person is non binary.",
		'other': "person is neither male, female, or non binary.",
		'random': "choose any race for this person."
	}

	style_ = style_dir[style]
	ethnicity_ = ethnicity_dir[ethnicity]
	gender_ = gender_dir[gender]
	prompt = f'{style_}. {ethnicity_}. {gender_}. {prompt}'

	headers = {
		"Content-Type": "application/json",
		"Authorization": f"Bearer {settings.OPENAI_KEY}"
	}
	payload = {
		"model": model,
		"prompt": prompt,
		"size": size,
		"quality": quality,
		"n": n
	}

	return requests.post("https://api.openai.com/v1/images/generations", headers=headers, json=payload)