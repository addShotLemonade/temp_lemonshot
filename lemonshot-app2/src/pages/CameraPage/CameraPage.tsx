// CameraPage.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import NavBar from '../../components/NavBar.tsx';
import './CameraPage.css';
import edgeIcon from '../../assets/images/edge.svg';

const CameraPage = () => {
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("스페이스바를 눌러 얼굴을 캡처하세요.");

  const { name, gender, age, contact, contactType } = location.state || {};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !loading) {
        capture();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading]);

  const capture = async () => {
    if (!webcamRef.current) return;
    const screenshot = webcamRef.current.getScreenshot();

    if (!screenshot) {
      setMessage("❌ 얼굴을 인식하지 못했습니다.");
      return;
    }

    setLoading(true);
    setMessage("⏳ 로딩중...");

    try {
      const response = await fetch("http://localhost:5000/analyze_face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: screenshot,
          name,
          gender,
          age,
          contact,
          contactType
        })
      });

      const result = await response.json();

      if (result.status === "success") {
        setMessage("✅ 로딩 완료!");
        setTimeout(() => {
          navigate("/success", {
            state: { name, gender, age, contact, contactType }
          });
        }, 1500);
      } else {
        setMessage("❌ 분석 실패: 얼굴을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("서버 오류:", error);
      setMessage("❌ 서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="camera-page-wrapper">
      <NavBar />
      <div className="camera-page">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
          className="webcam"
          mirrored = {true}
          
        />

        <div className="capture-area">
          <img src={edgeIcon} className="edge-icon top-left" />
          <img src={edgeIcon} className="edge-icon top-right" />
          <img src={edgeIcon} className="edge-icon bottom-right" />
          <img src={edgeIcon} className="edge-icon bottom-left" />
        </div>

        <div className="overlay" />

        <p className="message">{message}</p>

        {loading && (
          <p className="loading-text">로딩중...</p>
        )}
      </div>
    </div>
  );
};

export default CameraPage;
