import cv2
import numpy as np
import yaml

try:
    from tflite_runtime.interpreter import Interpreter
except ImportError:
    import tensorflow as tf
    Interpreter = tf.lite.Interpreter


class YOLOv8TFLite:
    def __init__(self, model_path, conf=0.25, iou=0.45, metadata=None):
        self.conf = conf
        self.iou = iou
        # 클래스 이름 읽기
        if metadata:
            with open(metadata, 'r') as f:
                self.classes = yaml.safe_load(f)['names']
        else:
            self.classes = {i: str(i) for i in range(1000)}
        # 색깔 팔레트
        np.random.seed(42)
        self.color_palette = np.random.uniform(128, 255, size=(len(self.classes), 3))
        
        # TFLite 인터프리터 로드
        self.model = Interpreter(model_path=model_path)
        self.model.allocate_tensors()

        input_details = self.model.get_input_details()[0]
        self.in_index = input_details['index']
        self.in_width, self.in_height = input_details['shape'][1:3]
        self.in_scale, self.in_zero_point = input_details['quantization']
        self.int8 = input_details['dtype'] == np.int8

        output_details = self.model.get_output_details()[0]
        self.out_index = output_details['index']
        self.out_scale, self.out_zero_point = output_details['quantization']

    def preprocess(self, img):
        h0, w0 = img.shape[:2]  # 원본 크기
        r = min(self.in_width / w0, self.in_height / h0)
        new_size = (int(w0 * r), int(h0 * r))

        # 이미지 resize 후 padding
        img_resized = cv2.resize(img, new_size, interpolation=cv2.INTER_LINEAR)
        dw, dh = self.in_width - new_size[0], self.in_height - new_size[1]
        top, bottom = dh // 2, dh - (dh // 2)
        left, right = dw // 2, dw - (dw // 2)

        img_padded = cv2.copyMakeBorder(img_resized, top, bottom, left, right, cv2.BORDER_CONSTANT, value=(114, 114, 114))
        img_rgb = cv2.cvtColor(img_padded, cv2.COLOR_BGR2RGB)
        img_norm = img_rgb.astype(np.float32) / 255.0
        input_data = np.expand_dims(img_norm, axis=0)

        if self.int8:
            input_data = (input_data / self.in_scale + self.in_zero_point).astype(np.int8)

        return input_data, r, (left, top)

    def detect(self, img):
        input_data, scale, (pad_x, pad_y) = self.preprocess(img)
        self.model.set_tensor(self.in_index, input_data)
        self.model.invoke()
        output_data = self.model.get_tensor(self.out_index)[0]  # 예시

        # 예시: 출력이 [N, 6] 형태 (x1, y1, x2, y2, conf, cls)
        detections = []
        for det in output_data:
            x1, y1, x2, y2, conf, cls_id = det
            if conf < self.conf:
                continue
            # 원본 이미지로 복원
            x1 = (x1 - pad_x) / scale
            y1 = (y1 - pad_y) / scale
            x2 = (x2 - pad_x) / scale
            y2 = (y2 - pad_y) / scale
            detections.append([int(x1), int(y1), int(x2), int(y2), float(conf), int(cls_id)])

        return detections
    
    def postprocess(self, original_img, output_data, scale, pad):
        # output_data에서 confidence가 threshold 이상인 결과만 필터링합니다.
        # padding과 scale을 고려하여 원본 이미지 크기로 좌표를 되돌립니다.
        # cv2.rectangle()과 cv2.putText()로 바운딩 박스와 클래스 라벨을 그림.
        pad_x, pad_y = pad
        h, w = original_img.shape[:2]
        result_img = original_img.copy()

        for det in output_data[0]:  # [1, N, 7] 또는 [N, 7]
            if len(det) < 6:
                continue  # skip invalid results
            x1, y1, x2, y2, conf, cls_id = det[:6]  # ← 여기 수정됨

            if conf < self.conf:
                continue


            # 원본 좌표로 복원
            x1 = int((x1 - pad_x) / scale)
            y1 = int((y1 - pad_y) / scale)
            x2 = int((x2 - pad_x) / scale)
            y2 = int((y2 - pad_y) / scale)

            # 경계 클리핑
            x1 = max(0, min(x1, w - 1))
            y1 = max(0, min(y1, h - 1))
            x2 = max(0, min(x2, w - 1))
            y2 = max(0, min(y2, h - 1))

            color = self.color_palette[int(cls_id) % len(self.color_palette)]
            color = tuple(map(int, color))
            label = f"{self.classes.get(int(cls_id), str(int(cls_id)))} {conf:.2f}"

            cv2.rectangle(result_img, (x1, y1), (x2, y2), color, 2)
            cv2.putText(result_img, label, (x1, y1 - 5),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

        return result_img


