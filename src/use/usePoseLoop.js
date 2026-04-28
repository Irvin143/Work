import { useRef } from "react";

export default function usePoseLoop() {
  const animRef = useRef(null);
  const isRunningRef = useRef(false);

  const startLoop = (pose, videoRef, log) => {
    isRunningRef.current = true;

    const loop = async () => {
      if (!isRunningRef.current) return;

      const video = videoRef.current;

      if (video && video.readyState >= 2) {
        try {
          await pose.send({ image: video });
        } catch (e) {
          log("Error pose.send: " + e.message);
        }
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
  };

  const stopLoop = () => {
    isRunningRef.current = false;
    if (animRef.current) cancelAnimationFrame(animRef.current);
  };

  return { startLoop, stopLoop };
}