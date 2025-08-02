import pandas as pd
import os
import unicodedata
from icrawler.builtin import GoogleImageCrawler
from PIL import Image
import shutil

# --------- 루트 경로 설정 
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # crawling.py의 위치
PUBLIC_IMAGE_DIR = os.path.join(BASE_DIR, 'lemonshot-app2', 'public', 'images')
FEMALE_DIR = os.path.join(PUBLIC_IMAGE_DIR, 'female')
MALE_DIR = os.path.join(PUBLIC_IMAGE_DIR, 'male')

# 폴더 없으면 생성
os.makedirs(FEMALE_DIR, exist_ok=True)
os.makedirs(MALE_DIR, exist_ok=True)

# --------- CSV 데이터 로드 ---------
df = pd.read_csv(os.path.join(BASE_DIR,"faceNet-vector", "celeb_data.csv"))
df = df.rename(columns={"Celebrity Name": "celeb_name"})
df["celeb_name"] = df["celeb_name"].apply(lambda x: unicodedata.normalize("NFC", x))

# --------- 크롤링 함수 ---------
def crawl_image(name, save_path):
    try:
        crawler = GoogleImageCrawler(storage={"root_dir": save_path})
        crawler.crawl(
            keyword=f"{name} 고화질",
            max_num=1,
            min_size=(500, 500),  # 고화질 기준
            file_idx_offset=0
        )
    except Exception as e:
        print(f"❌ {name} 크롤링 실패: {e}")

# --------- 크롤링 실행 ---------
for idx, row in df.iterrows():
    name = row["celeb_name"]
    is_female = idx < 86
    folder = FEMALE_DIR if is_female else MALE_DIR
    temp_dir = os.path.join(folder, name)

    os.makedirs(temp_dir, exist_ok=True)
    crawl_image(name, temp_dir)

    # 이미지 이동 및 저장
    files = os.listdir(temp_dir)
    if files:
        src = os.path.join(temp_dir, files[0])
        dest_filename = name.replace(" ", "_") + ".png"
        dest = os.path.join(folder, dest_filename)

        try:
            img = Image.open(src).convert("RGB")
            img.save(dest, "PNG")
            print(f"✅ 저장 완료: {dest_filename}")
        except Exception as e:
            print(f"❌ 이미지 저장 실패 ({name}): {e}")

    shutil.rmtree(temp_dir, ignore_errors=True)
