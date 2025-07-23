from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import requests

model = BlipForConditionalGeneration.from_pretrained("rcfg/FashionBLIP-1")
processor = BlipProcessor.from_pretrained("rcfg/FashionBLIP-1")

img = Image.open("testimage1.jpg").convert("RGB")

# Prepare input
inputs = processor(img, return_tensors="pt").to("cpu")

# Generate caption
out = model.generate(**inputs, max_length=50)
caption = processor.decode(out[0], skip_special_tokens=True)

print("Caption:", caption)