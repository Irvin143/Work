import React, { useState } from "react";
import {
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";

const SubirVideo = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setVideo(file);
    }
  };

  const extraerKeypoints = async (file) => {
    // Inicializar MediaPipe
   const vision = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);

    const poseLandmarker = await PoseLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      }
    );

    // Crear video oculto
    const videoElement = document.createElement("video");

    videoElement.src = URL.createObjectURL(file);

    await new Promise((resolve) => {
      videoElement.onloadeddata = () => resolve();
    });

    const keypointsPorFrame = [];

    // Canvas oculto
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Leer frame por frame
    const fps = 10; // puedes cambiarlo
    const duracion = videoElement.duration;

    for (let tiempo = 0; tiempo < duracion; tiempo += 1 / fps) {
      videoElement.currentTime = tiempo;

      await new Promise((resolve) => {
        videoElement.onseeked = () => resolve();
      });

      ctx.drawImage(
        videoElement,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const timestamp = tiempo * 1000;

      const results = poseLandmarker.detectForVideo(
        canvas,
        timestamp
      );

      if (results.landmarks.length > 0) {
        const landmarks = results.landmarks[0].map((punto) => ({
          x: punto.x,
          y: punto.y,
          z: punto.z,
          visibility: punto.visibility,
        }));

        keypointsPorFrame.push({
          landmarks,
        });
      }
    }

    return keypointsPorFrame;
  };

  const handleUpload = async () => {
    if (!video) {
      alert("Selecciona un video primero");
      return;
    }

    try {
      setLoading(true);

      // Extraer keypoints
      const keypoints = await extraerKeypoints(video);

      console.log(keypoints);

    // Petición al backend
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keypoints: keypoints,
      }),
    });

    const data = await res.json();

    console.log(data);

    alert(`Ejercicio detectado: ${data.ejercicio}`);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#c4d2f4] p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">

        <h2 className="text-xl font-bold mb-4 text-[#393E46]">
          Subir video de ejercicio
        </h2>

        <input
          type="file"
          accept="video/*"
          onChange={handleChange}
          className="mb-4 w-full"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-[#00ADB5] text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 w-full"
        >
          {loading ? "Procesando..." : "Procesar video"}
        </button>

      </div>
    </div>
  );
};

export default SubirVideo;