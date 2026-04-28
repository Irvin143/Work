import { useEffect, useRef } from "react";

export default function useSocket(log) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8000/ws/keypoints");

    socketRef.current.onopen = () => {
      log("WebSocket conectado ✓");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      log("Ejercicio: " + data.NombreEjercicio);
    };

    return () => socketRef.current?.close();
  }, []);

  return socketRef;
}