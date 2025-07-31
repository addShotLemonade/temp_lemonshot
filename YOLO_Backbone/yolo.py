import tensorflow as tf
import numpy as np
import cv2
from ultralytics import YOLO
from numpy.linalg import norm
import os
import time

def load_frozen_graph(pb_path):
    if not os.path.exists(pb_path):
        raise FileNotFoundError(f"파일이 없음")
    graph = tf.Graph()
    with tf.io.gfile.GFile(pb_path, "rb") as f:
        graph_def = tf.compat.v1.GraphDef()
        graph_def.ParseFromString(f.read())
    with graph.as_default():
        tf.compat.v1.import_graph_def(graph_def, name="")
    return graph

def prewhiten(x):
    mean = np.mean(x)
    std = np.std(x)
    std_adj = np.maximum(std, 1.0 / np.sqrt(x.size))
    return (x - mean) / std_adj

YOLO_MODEL_PATH = 'models/yolov8s-face-lindevs.pt'
FACENET_MODEL_PATH = 'models/facenet/20180402-114759.pb'
IDEAL_VECTOR_PATH = 'data/ideal_type.npy'

if not os.path.exists(YOLO_MODEL_PATH):
    print(f"모델 불러오기 실패: {YOLO_MODEL_PATH}")
    exit()
yolo_detector = YOLO(YOLO_MODEL_PATH)
print("YOLO-Face 모델 로드 완료")

try:
    facenet_graph = load_frozen_graph(FACENET_MODEL_PATH)
    input_tensor = facenet_graph.get_tensor_by_name("input:0")
    embeddings_tensor = facenet_graph.get_tensor_by_name("embeddings:0")
    phase_train_tensor = facenet_graph.get_tensor_by_name("phase_train:0")
    print("FaceNet 모델 로드 완료")
except FileNotFoundError as e:
    print(f"{e}")
    exit()
except Exception as e:
    print(f"FaceNet 모델 로드 중 오류: {e}")
    exit()

try:
    ideal_type_vector = np.load(IDEAL_VECTOR_PATH)
    print(f"이상형 기준 벡터 로드 완료 (차원: {ideal_type_vector.shape})")
except FileNotFoundError:
    print(f"이상형 기준 벡터를 찾을 수 없음: {IDEAL_VECTOR_PATH}")
    exit()

sess = tf.compat.v1.Session(graph=facenet_graph)

cap = cv2.VideoCapture(1, cv2.CAP_AVFOUNDATION)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("❌ 맥북 카메라를 열 수 없습니다.")
    print("   카메라 권한이 허용되어 있는지 확인하세요.")
    exit()

time.sleep(2)
print("✅ 맥북 카메라 연결 완료!")

FACENET_IMAGE_SIZE = 160

print("\n🚀 실시간 이상형 유사도 측정을 시작합니다. (종료: q)")

while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ 프레임을 읽을 수 없습니다.")
        break

    results = yolo_detector(frame, verbose=False)
    
    largest_face_box = None
    max_area = 0
    if len(results[0].boxes) > 0:
        for box in results[0].boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            area = (x2 - x1) * (y2 - y1)
            if area > max_area:
                max_area = area
                largest_face_box = (x1, y1, x2, y2)
    
    if largest_face_box:
        x1, y1, x2, y2 = largest_face_box
        
        face_img = frame[y1:y2, x1:x2]

        resized_face = cv2.resize(face_img, (FACENET_IMAGE_SIZE, FACENET_IMAGE_SIZE))
        rgb_face = cv2.cvtColor(resized_face, cv2.COLOR_BGR2RGB)
        prewhitened_face = prewhiten(rgb_face)
        prewhitened_face = np.expand_dims(prewhitened_face, axis=0)

        feed_dict = {
            input_tensor: prewhitened_face,
            phase_train_tensor: False
        }
        current_embedding = sess.run(embeddings_tensor, feed_dict=feed_dict)[0]

        cosine_similarity = np.dot(ideal_type_vector, current_embedding) / (norm(ideal_type_vector) * norm(current_embedding))
        similarity_percent = max(0, cosine_similarity) * 100

        text = f"Similarity: {similarity_percent:.2f}%"
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame, text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

    cv2.imshow("Ideal Type Similarity Meter (Press 'q' to quit)", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

print("\n👋 프로그램을 종료합니다.")
sess.close()
cap.release()
cv2.destroyAllWindows()