import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from '../ui/Button';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cleanupStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
  }, [stream]);

  useEffect(() => {
    const startCamera = async () => {
      setCapturedImage(null);
      setError(null);
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access the camera. Please check permissions.");
      }
    };
    startCamera();
    return cleanupStream;
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        cleanupStream(); // Stop the live feed
      }
    }
  };

  const handleRetake = async () => {
    setCapturedImage(null);
    setError(null);
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Could not re-access camera.");
      }
  };

  const handleUsePhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
      <div className="relative w-full max-w-md aspect-video bg-black rounded-md overflow-hidden mb-4">
        {error ? (
          <div className="flex items-center justify-center h-full text-red-500 p-4 text-center">{error}</div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover ${capturedImage ? 'hidden' : 'block'}`}
              aria-label="Live camera feed"
            />
            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
            {capturedImage && (
              <img src={capturedImage} alt="Captured preview" className="w-full h-full object-cover" />
            )}
          </>
        )}
      </div>
      <div className="flex justify-center gap-4 w-full">
        {capturedImage ? (
          <>
            <Button onClick={handleRetake} variant="secondary">Retake</Button>
            <Button onClick={handleUsePhoto} variant="primary">Use Photo</Button>
          </>
        ) : (
          <>
            <Button onClick={onCancel} variant="secondary">Cancel</Button>
            <Button onClick={handleCapture} disabled={!!error || !stream}>Capture</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;