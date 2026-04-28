import { useRef } from "react";

export default function useCamera() {
  const streamRef = useRef(null);

  const startCamera = async (deviceId, videoRef) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } },
      audio: false,
    });

    streamRef.current = stream;
    videoRef.current.srcObject = stream;
    await videoRef.current.play();

    return stream;
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
  };

  return { startCamera, stopCamera };
}