from ultralytics import YOLO
model = YOLO("yolov8n-seg.pt")
results = model("testimage1.jpg")
results[0].show()  # show segmented clothing
