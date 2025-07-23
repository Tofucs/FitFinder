import torch
from transformers import AutoProcessor, AutoModelForZeroShotObjectDetection
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import requests
import os

# CONFIG
GROUNDING_DINO_ID = "IDEA-Research/grounding-dino-tiny"
FASHION_BLIP_ID = "rcfg/FashionBLIP-1"
CLOTHING_LABELS = ["shirt", "pants", "jacket", "dress", "skirt", "jeans", "sweater", "t-shirt", "coat", "scarf", "hat", "shorts", "shoes", "sneakers", "boots", "blouse", "suit"]
BOX_THRESHOLD = 0.4
TEXT_THRESHOLD = 0.3

device = "cpu"

# Load models
print("Loading Grounding DINO...")
gd_processor = AutoProcessor.from_pretrained(GROUNDING_DINO_ID)
gd_model = AutoModelForZeroShotObjectDetection.from_pretrained(GROUNDING_DINO_ID).to(device)

print("Loading FashionBLIP...")
blip_processor = BlipProcessor.from_pretrained(FASHION_BLIP_ID)
blip_model = BlipForConditionalGeneration.from_pretrained(FASHION_BLIP_ID).to(device)
blip_model.eval()

# Run Grounding DINO
def detect_clothing(image):
    inputs = gd_processor(images=image, text=[CLOTHING_LABELS], return_tensors="pt").to(device)
    with torch.no_grad():
        outputs = gd_model(**inputs)

    results = gd_processor.post_process_grounded_object_detection(
        outputs,
        inputs.input_ids,
        box_threshold=BOX_THRESHOLD,
        text_threshold=TEXT_THRESHOLD,
        target_sizes=[image.size[::-1]]  # PIL size is (W, H)
    )
    return results[0]  # Return first image result

# Run FashionBLIP
def describe_crop(crop):
    inputs = blip_processor(images=crop, return_tensors="pt").to(device)
    with torch.no_grad():
        out = blip_model.generate(**inputs)
        caption = blip_processor.decode(out[0], skip_special_tokens=True)
    return caption

# Main pipeline
def process_image(image_path, save_crops=False):
    image = Image.open(image_path).convert("RGB")
    results = detect_clothing(image)

    print(f"Found {len(results['boxes'])} clothing item(s).")
    for i, (box, label, score) in enumerate(zip(results['boxes'], results['labels'], results['scores'])):
        box = [int(x) for x in box.tolist()]
        crop = image.crop(box)

        if save_crops:
            crop.save(f"crop_{i}_{label}.jpg")

        caption = describe_crop(crop)
        print(f"[{label}] ({score:.2f}): {caption}")

# Example usage
if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python describe_outfits.py <image_path>")
        exit(1)
    process_image(sys.argv[1], save_crops=True)
