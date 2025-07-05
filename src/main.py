import cv2
from yolov8_tflite import YOLOv8TFLite  # 클래스 정의한 파일명에 맞게 import

# 모델 로딩
detector = YOLOv8TFLite(
    model_path="yolov8n_saved_model/yolov8n_float16.tflite", 
    conf=0.25, 
    iou=0.45, 
    metadata="yolov8n_saved_model/metadata.yaml"
)

# 웹캠 캡처 시작
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # 전처리
    x, scale, pad = detector.preprocess(frame)

    # 정량화 처리
    if detector.int8:
        x = (x / detector.in_scale + detector.in_zero_point).astype(np.int8)

    # 추론
    detector.model.set_tensor(detector.in_index, x)
    detector.model.invoke()
    y = detector.model.get_tensor(detector.out_index)

    # 역정량화
    if detector.int8:
        y = (y.astype("float32") - detector.out_zero_point) * detector.out_scale

    # 후처리 및 시각화
    result_frame = detector.postprocess(frame, y, scale, pad)

    # 화면 출력
    cv2.imshow("YOLOv8 TFLite Video Detection", result_frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# 종료
cap.release()
cv2.destroyAllWindows()
