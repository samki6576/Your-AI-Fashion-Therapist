import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import { MdCamera, MdUploadFile } from 'react-icons/md';
import { Button } from './Button';
import { useFaceAnalysis } from '../hooks/useFaceAnalysis';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

export const SelfieUpload = ({ onSuccess }) => {
  const { setUserImage } = useContext(AppContext);
  const [useWebcam, setUseWebcam] = useState(false);

  const [preview, setPreview] = useState(null);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const { analyzeImage, isAnalyzing } = useFaceAnalysis();

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
        setUserImage(event.target.result);
      };
      reader.readAsDataURL(file);
      await analyzeImage(file);
      onSuccess?.();
    }
  };

  const handleWebcamCapture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convert base64 to blob
      const blob = await fetch(imageSrc).then(r => r.blob());
      const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
      setPreview(imageSrc);
      setUserImage(imageSrc);
      await analyzeImage(file);
      setUseWebcam(false);
      onSuccess?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {preview && (
        <div className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-primary/30">
          <img src={preview} alt="Selfie" className="w-full" />
        </div>
      )}

      {!useWebcam && !preview && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setUseWebcam(true)}
            className="w-full"
          >
            <MdCamera size={20} />
            Use Webcam
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <MdUploadFile size={20} />
            Upload Photo
          </Button>
        </div>
      )}

      {useWebcam && (
        <div className="space-y-4">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-lg"
          />
          <div className="flex gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleWebcamCapture}
              loading={isAnalyzing}
              className="flex-1"
            >
              <MdCamera size={20} />
              Capture Photo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setUseWebcam(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </motion.div>
  );
};
