from ultralytics import YOLO
from torchvision import transforms
from PIL import Image
import cv2
import matplotlib.pyplot as plt
import numpy as np
import torch
import urllib.request
import os


yolo_model = YOLO("yolov8n-seg.pt")

img = cv2.imread("testimage1.jpg")

results = yolo_model(img)[0]

segmented_image = results.plot()

for box, cls in zip(results.boxes.xyxy, results.boxes.cls):
    if int(cls) == 0:  # person
        x1, y1, x2, y2 = map(int, box.tolist())
        cropped = img[y1:y2, x1:x2]
        break

crop_path = "person_crop.jpg"
cv2.imwrite(crop_path, cropped)

plt.imshow(cv2.cvtColor(segmented_image, cv2.COLOR_BGR2RGB))
plt.axis('off')
plt.show()

plt.imshow(cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB))
plt.axis('off')
plt.show()

if not os.path.exists("parsing.pth"):
    print("Downloading pretrained LIP model...")
    urllib.request.urlretrieve(
        "https://huggingface.co/xinyu1205/HumanParsing-LIP-JPPNet/resolve/main/parsing.pth",
        "parsing.pth"
    )

class DummyLIPModel(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.model = torch.jit.load("parsing.pth").eval()

    def forward(self, x):
        with torch.no_grad():
            out = self.model(x)[0]
            return out.argmax(1).squeeze().cpu().numpy()

lip_model = DummyLIPModel()

transform = transforms.Compose([
    transforms.Resize((384, 384)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

person_img = Image.open(crop_path).convert("RGB")
input_tensor = transform(person_img).unsqueeze(0)
seg_map = lip_model(input_tensor)

label_colors = np.array([
    (0, 0, 0),         # background
    (128, 0, 0),       # hat
    (255, 0, 0),       # hair
    (0, 85, 0),        # sunglasses
    (170, 0, 51),      # upper-clothes
    (255, 85, 0),      # dress
    (0, 0, 85),        # coat
    (0, 119, 221),     # socks
    (85, 85, 0),       # pants
    (0, 85, 85),       # gloves
    (85, 51, 0),       # scarf
    (52, 86, 128),     # skirt
    (0, 128, 0),       # face
    (0, 0, 128),       # left-arm
    (128, 128, 0),     # right-arm
    (0, 128, 128),     # left-leg
    (128, 0, 128),     # right-leg
    (255, 0, 255),     # shoes
    (0, 255, 255),     # left shoe
    (255, 255, 0)      # right shoe
])

seg_img = np.zeros_like(np.array(person_img))
for label in np.unique(seg_map):
    if label >= len(label_colors):
        continue
    seg_img[seg_map == label] = label_colors[label]

overlay = cv2.addWeighted(np.array(person_img), 0.6, seg_img, 0.4, 0)

plt.figure(figsize=(10, 5))
plt.imshow(overlay)
plt.title("Clothing Segmentation Overlay (LIP)")
plt.axis('off')
plt.show()


