import { useRef } from "react";

export default function useCamera(log) {
  const streamRef = useRef(null);

  const startCamera = async (deviceId, videoRef) => {
    log("Abriendo cámara...");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: { exact: deviceId },
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
      audio: false,
    });

    streamRef.current = stream;

    const video = videoRef.current;
    video.srcObject = stream;

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timeout esperando metadata"));
      }, 8000);

      video.onloadedmetadata = async () => {
        try {
          await video.play();
          clearTimeout(timeout);
          resolve();
        } catch (e) {
          reject(e);
        }
      };
    });

    log("Cámara lista ✓");

    return stream;
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    log("Cámara detenida");
  };

  return { startCamera, stopCamera };
}