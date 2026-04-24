import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Camara() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const poseRef = useRef(null);
  const animFrameRef = useRef(null);
  const isRunningRef = useRef(false);

  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [started, setStarted] = useState(false);
  const [logs, setLogs] = useState([]); // 👈 logs visibles en pantalla

  const log = useCallback((msg) => {
    console.log(msg);
    setLogs((prev) => [...prev.slice(-6), msg]); // muestra últimos 7 logs
  }, []);

  // 🔁 Loop manual
  const startLoop = useCallback((pose) => {
    const loop = async () => {
      if (!isRunningRef.current) return;
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        try {
          await pose.send({ image: video });
        } catch (e) {
          log("Error en pose.send: " + e.message);
        }
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
  }, [log]);

  // ✅ Esta función se llama SOLO cuando el usuario toca el botón
  const handleStart = async () => {
    log("Iniciando...");
    if (!navigator.mediaDevices?.getUserMedia) {
        log("❌ Sin acceso a cámara - probablemente HTTP");
        return;
    }
    try {
      // Paso 1: pedir permiso con cámara trasera por defecto
      log("Pidiendo permiso de cámara...");
      const tempStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      tempStream.getTracks().forEach((t) => t.stop());
      log("Permiso concedido ✓");

      // Paso 2: enumerar cámaras
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cams = devices.filter((d) => d.kind === "videoinput");
      log(`Cámaras encontradas: ${cams.length}`);
      setCameras(cams);

      const firstId = cams[0]?.deviceId || "";
      setSelectedCamera(firstId);
      setStarted(true);
    } catch (err) {
      log("ERROR: " + err.name + " - " + err.message);
    }
  };

  // 🎥 Arrancar stream + MediaPipe cuando cambia la cámara
  useEffect(() => {
    if (!started || !selectedCamera) return;

    let cancelled = false;

    const init = async () => {
      // Limpiar anterior
      isRunningRef.current = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());

      log("Abriendo stream de cámara...");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedCamera }, width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });

        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }

        streamRef.current = stream;
        const video = videoRef.current;
        video.srcObject = stream;
        log("Stream asignado, esperando metadata...");

        await new Promise((resolve, reject) => {
          video.onloadedmetadata = async () => {
            try {
              await video.play();
              log("Video reproduciéndose ✓");
              resolve();
            } catch (e) {
              reject(e);
            }
          };
          setTimeout(() => reject(new Error("Timeout esperando metadata")), 8000);
        });

        log("Inicializando MediaPipe Pose...");

        const pose = new window.Pose({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        pose.onResults((results) => {
          const canvas = canvasRef.current;
          if (!canvas || !videoRef.current) return;
          const ctx = canvas.getContext("2d");

          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

          if (results.poseLandmarks) {
            results.poseLandmarks.forEach((p) => {
              ctx.beginPath();
              ctx.arc(p.x * canvas.width, p.y * canvas.height, 5, 0, 2 * Math.PI);
              ctx.fillStyle = "red";
              ctx.fill();
            });
          }
        });

        await pose.initialize();
        log("Pose inicializado ✓ — arrancando loop...");

        poseRef.current = pose;
        isRunningRef.current = true;
        startLoop(pose);
      } catch (err) {
        log("ERROR init: " + err.name + " - " + err.message);
      }
    };

    init();

    return () => {
      cancelled = true;
      isRunningRef.current = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, [started, selectedCamera, log, startLoop]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-900 p-4">
      <Link to="/principal" className="self-start p-5 text-[1.2em]  hover:cursor-pointer" > ← Regresar</Link>
                
      <video ref={videoRef} autoPlay muted playsInline className="hidden " />

      <canvas
        ref={canvasRef}
        className="rounded-xl shadow-lg border border-gray-700  bg-[#111] w-[95%]"
      />
      <article className="flex gap-5 my-4">
        {!started ? (
          <button
            onClick={handleStart}
            className="px-4 py-3 bg-green-500 text-white text-md rounded-xl font-bold"
          >
            Iniciar Cámara
          </button>
        ) : (
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="mb-4 p-2 rounded bg-white"
          >
            {cameras.map((cam, index) => (
              <option key={cam.deviceId} value={cam.deviceId}>
                {cam.label || `Cámara ${index + 1}`}
              </option>
            ))}
          </select>
        )}
        <button  className="px-4 py-2 bg-red-500 text-white text-md rounded-xl font-bold">
          Detener Cámara
        </button>
      </article>

      {/* 📋 Log visible en pantalla para debug mobile */}
      <div className="w-full max-w-lg mb-4 bg-black rounded p-2 text-xs text-green-400 font-mono min-h-[80px]">
        {logs.length === 0 ? <span className="text-gray-600">Logs aparecerán aquí...</span> : logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}