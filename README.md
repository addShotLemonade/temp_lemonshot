# lemonshot: YOLO 기반 이상형 찾기 AI 서비스
 faceNet, YOLO 모델 학습 및 추론 temp repo

 
# 프로젝트 설치 및 실행 가이드

## 백엔드 (yolo_backbone) 설치 및 실행

```bash
cd yolo_backbone

# 가상환경 생성 (최초 1회)
python -m venv venv

# 가상환경 활성화 (macOS/Linux)
source venv/bin/activate

# 가상환경 활성화 (Windows)
.\venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python app.py


