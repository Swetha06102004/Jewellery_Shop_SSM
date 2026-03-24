import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import "./TryOn.css";

function TryOn() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const jewelImage = location.state?.image;
  const category = location.state?.category || "necklace";

  useEffect(() => {

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const jewelry = new Image();
jewelry.crossOrigin = "anonymous";
jewelry.src = jewelImage;

    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiFaceLandmarks) {

        for (const landmarks of results.multiFaceLandmarks) {

          const width = canvas.width;
          const height = canvas.height;

          /* ----------- NECKLACE ----------- */

          if (category === "necklace") {

  const leftJaw = landmarks[234];
  const rightJaw = landmarks[454];
  const chin = landmarks[152];

  const width = canvas.width;
  const height = canvas.height;

  const leftX = leftJaw.x * width;
  const rightX = rightJaw.x * width;

  const centerX = (leftX + rightX) / 2;

  const neckWidth = rightX - leftX;

  const y = chin.y * height + 20;

  const drawWidth = neckWidth * 1.8;
  const drawHeight = drawWidth * 0.6;

  ctx.drawImage(
    jewelry,
    centerX - drawWidth / 2,
    y,
    drawWidth,
    drawHeight
  );
}

          /* ----------- EARRINGS ----------- */

          if (category === "earring") {

            const leftEar = landmarks[234];
            const rightEar = landmarks[454];

            const x1 = leftEar.x * width - 25;
            const y1 = leftEar.y * height + 20;

            const x2 = rightEar.x * width - 25;
            const y2 = rightEar.y * height + 20;

            ctx.drawImage(jewelry, x1, y1, 50, 80);
            ctx.drawImage(jewelry, x2, y2, 50, 80);

            const imgData = ctx.getImageData(x1, y1, 50, 80);
            const data = imgData.data;

            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];

              if (r < 40 && g < 40 && b < 40) {
                data[i + 3] = 0;
              }
            }

            ctx.putImageData(imgData, x1, y1);
          }

          /* ----------- NOSE RING ----------- */

          if (category === "nose") {

            const nose = landmarks[1];

            const x = nose.x * width - 15;
            const y = nose.y * height;

            ctx.drawImage(jewelry, x, y, 40, 40);

            const imgData = ctx.getImageData(x, y, 40, 40);
            const data = imgData.data;

            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];

              if (r < 40 && g < 40 && b < 40) {
                data[i + 3] = 0;
              }
            }

            ctx.putImageData(imgData, x, y);
          }

        }

      }

      ctx.restore();

    });

    const camera = new Camera(video, {
      onFrame: async () => {
        await faceMesh.send({ image: video });
      },
      width: 640,
      height: 480,
    });

    camera.start();

  }, []);

  return (

    <div className="tryon-container">

      <button 
        onClick={() => navigate(-1)}
        className="back-button"
      >
        ← Back
      </button>

      <h2 className="tryon-title">Virtual Try On</h2>

      <div className="tryon-content">

        <video ref={videoRef} style={{ display: "none" }} />

        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="tryon-canvas"
        />

      </div>

      <div className="tryon-instructions">
        <h3>How to Use</h3>
        <p>Position your face in the camera view. The jewelry will be overlaid on your face in real-time. Make sure you have good lighting for the best experience.</p>
      </div>

    </div>

  );

}

export default TryOn;