from flask import Flask, request, jsonify
from flask_cors import CORS
import base64, cv2, numpy as np, tensorflow as tf, os, json
from ultralytics import YOLO
from numpy.linalg import norm

app = Flask(__name__)
CORS(app)

# 모델 경로
YOLO_MODEL_PATH = 'models/yolov8s-face-lindevs.pt'
FACENET_MODEL_PATH = 'models/facenet/20180402-114759.pb'
IDEAL_VECTOR_PATH = 'data/ideal_type.npy'

# 모델 로드
yolo_detector = YOLO(YOLO_MODEL_PATH)
facenet_graph = tf.Graph()
with tf.io.gfile.GFile(FACENET_MODEL_PATH, "rb") as f:
    graph_def = tf.compat.v1.GraphDef()
    graph_def.ParseFromString(f.read())
with facenet_graph.as_default():
    tf.compat.v1.import_graph_def(graph_def, name="")
sess = tf.compat.v1.Session(graph=facenet_graph)
input_tensor = facenet_graph.get_tensor_by_name("input:0")
embeddings_tensor = facenet_graph.get_tensor_by_name("embeddings:0")
phase_train_tensor = facenet_graph.get_tensor_by_name("phase_train:0")
ideal_vector = np.load(IDEAL_VECTOR_PATH)

def prewhiten(x):
    mean = np.mean(x)
    std_adj = np.maximum(np.std(x), 1.0 / np.sqrt(x.size))
    return (x - mean) / std_adj

def base64_to_image(base64_str):
    img_bytes = base64.b64decode(base64_str.split(',')[-1])
    img_array = np.frombuffer(img_bytes, np.uint8)
    return cv2.imdecode(img_array, cv2.IMREAD_COLOR)

@app.route('/analyze_face', methods=['POST'])
def analyze_face():
    try:
        data = request.get_json()

        # 사용자 정보
        base64_img = data['image']
        name = data.get('name', '')
        gender = data.get('gender', '')
        age = data.get('age', '')
        contact = data.get('contact', '')
        contact_type = data.get('contactType', '')
        ideal_type_celebrity = data.get('idealTypeCelebrity', '')

        frame = base64_to_image(base64_img)
        results = yolo_detector(frame, verbose=False)
        boxes = results[0].boxes

        if len(boxes) == 0:
            return jsonify({'error': '얼굴을 찾지 못했습니다.'}), 400

        largest_face = max(boxes, key=lambda b: (b.xyxy[0][2] - b.xyxy[0][0]) * (b.xyxy[0][3] - b.xyxy[0][1]))
        x1, y1, x2, y2 = map(int, largest_face.xyxy[0])
        face_img = frame[y1:y2, x1:x2]

        resized = cv2.resize(face_img, (160, 160))
        rgb_face = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
        prewhitened = prewhiten(rgb_face)[np.newaxis, ...]

        feed_dict = {
            input_tensor: prewhitened,
            phase_train_tensor: False
        }
        embedding = sess.run(embeddings_tensor, feed_dict=feed_dict)[0]

        cosine_similarity = np.dot(ideal_vector, embedding) / (norm(ideal_vector) * norm(embedding))
        similarity_percent = max(0, cosine_similarity) * 100

        # 이미지 with bounding box
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame, f"{similarity_percent:.2f}%", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        _, buffer = cv2.imencode('.jpg', frame)
        image_base64 = f"data:image/jpeg;base64,{base64.b64encode(buffer).decode('utf-8')}"

        user_result = {
            "name": name,
            "gender": gender,
            "age": age,
            "contact_type": contact_type,
            "contact": contact,
            "visitor_embedding": [float(x) for x in embedding[:5]],
            "ideal_embedding": [float(x) for x in ideal_vector[:5]],
            "similarity_percent": f"{similarity_percent:.2f}%",
            "ideal_type_celebrity": ideal_type_celebrity
        }

        result_file = "lemonshot_result.json"
        if os.path.exists(result_file):
            with open(result_file, "r", encoding="utf-8") as f:
                try:
                    all_results = json.load(f)
                except json.JSONDecodeError:
                    all_results = []
        else:
            all_results = []

        all_results.append(user_result)
        with open(result_file, "w", encoding="utf-8") as f:
            json.dump(all_results, f, indent=4, ensure_ascii=False)

        return jsonify({
            'status': 'success',
            'similarity': f"{similarity_percent:.2f}%",
            'previewImage': image_base64
        })

    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/set_ideal', methods=['POST'])
def set_ideal():
    try:
        data = request.get_json()
        ideal_name = data.get("idealTypeCelebrity", "")

        result_file = "lemonshot_result.json"
        if not os.path.exists(result_file):
            return jsonify({"error": "결과 파일이 존재하지 않습니다."}), 404

        with open(result_file, "r", encoding="utf-8") as f:
            all_results = json.load(f)

        if not all_results:
            return jsonify({"error": "저장된 사용자 정보가 없습니다."}), 404

        # ✅ 가장 마지막 사용자에 ideal_type_celebrity 업데이트
        all_results[-1]["ideal_type_celebrity"] = ideal_name

        with open(result_file, "w", encoding="utf-8") as f:
            json.dump(all_results, f, indent=4, ensure_ascii=False)

        return jsonify({"status": "success", "message": "이상형 연예인 저장 완료"})

    except Exception as e:
        print(f"❌ set_ideal 오류: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
