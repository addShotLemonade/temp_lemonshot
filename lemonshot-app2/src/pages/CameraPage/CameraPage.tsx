import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import NavBar from '../../components/NavBar.tsx';
import './CameraPage.css';

const CameraPage = () => {
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("스페이스바를 눌러 얼굴을 캡처하세요.");
  const { name, gender, age, contact, contactType } = location.state || {};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !loading) {
        capture();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [loading]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((old) => {
          if (old >= 100) {
            clearInterval(interval);
            return 100;
          }
          return old + 2;
        });
      }, 50);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const capture = async () => {
    if (!webcamRef.current) return;

    const screenshot = webcamRef.current.getScreenshot();

    if (!screenshot) {
      setMessage("❌ 얼굴을 인식하지 못했습니다.");
      return;
    }

    setLoading(true);
    setMessage("⏳ 얼굴 분석 중입니다...");

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
        setMessage("✅ 벡터 분석 완료! 이동합니다...");
        setTimeout(() => {
          navigate("/success", {
            state: { name, gender, age, contact, contactType }  // ✅ 정보 전달!
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
    <>
      <NavBar />

      <div className="camera-page">

        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
          className="webcam"
        />

        <div className="capture-area" />

        <div className="overlay" />

        <p className="message">{message}</p>

        {loading && (
          <div className="loader">
            <div
              className="loader-progress"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CameraPage;
