import numpy as np
import pandas as pd

try:
    df = pd.read_csv('data/face_embeddings.csv')

    # 'name' 컬럼이 있는지 확인
    if 'name' not in df.columns:
        print("❌ 'data/face_embeddings.csv' 파일에 'name' 컬럼이 없습니다.")
        all_embeddings = {}
    else:
        df.set_index('name', inplace=True)
        all_embeddings = {name: data.to_numpy(dtype=np.float32) for name, data in df.iterrows()}
        print("✅ CSV 파일에서 얼굴 임베딩 로드 완료!")

except FileNotFoundError:
    print("❌ 'data/face_embeddings.csv' 파일을 찾을 수 없습니다.")
    print("얼굴 임베딩을 생성하는 스크립트를 먼저 실행하거나, 다른 형식의 파일을 csv로 변환하세요.")
    all_embeddings = {}
except Exception as e:
    print(f"❌ CSV 파일을 읽는 중 오류가 발생했습니다: {e}")
    all_embeddings = {}


if all_embeddings:
    my_favorite_celebs = ["김태리"]
    selected_vectors = []
    for name in my_favorite_celebs:
        if name in all_embeddings:
            selected_vectors.append(all_embeddings[name])
        else:
            print(f"'{name}'을 찾을 수 없습니다. csv 파일의 이름을 확인하세요.")

    if selected_vectors:
        ideal_type_vector = np.mean(selected_vectors, axis=0)

        output_path = 'data/ideal_type.npy'
        np.save(output_path, ideal_type_vector)
        print("✅ 최종 이상형 기준 벡터 생성 및 저장 완료!")
        print(f"저장 경로: {output_path}")
        print(f"기준 벡터 차원: {ideal_type_vector.shape}")
    else:
        print("❌ 선택된 연예인이 없어 기준 벡터를 생성하지 못했습니다.")