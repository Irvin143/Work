const drawPose = (results, canvasRef, videoRef) => {
  const canvas = canvasRef.current;
  const video = videoRef.current;

  if (!canvas || !video) return;

  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

  if (!results.poseLandmarks) return;
  
  results.poseLandmarks.forEach((p) => {
    ctx.beginPath();
    ctx.arc(
      p.x * canvas.width,
      p.y * canvas.height,
      5,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "red";
    ctx.fill();
  });
};

export default drawPose;