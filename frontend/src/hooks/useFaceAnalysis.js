import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export const useFaceAnalysis = () => {
  const { updateFaceData, setIsLoading, setErrorMessage } = useContext(AppContext);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeImage = async (imageFile) => {
    try {
      setIsAnalyzing(true);
      setIsLoading(true);
      setErrorMessage(null);

      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock face analysis data
      const mockFaceData = {
        skin_tone: 'medium',
        face_shape: 'oval',
        contrast_level: 'medium',
        recommended_colors: ['blue', 'green', 'purple', 'navy', 'emerald'],
        colors_to_avoid: ['orange', 'yellow', 'bright red']
      };

      updateFaceData(mockFaceData);
      toast.success('Face analysis complete!');
      return mockFaceData;
    } catch (error) {
      const message = 'Face analysis failed';
      setErrorMessage(message);
      toast.error(message);
      console.error('Face analysis error:', error);
    } finally {
      setIsAnalyzing(false);
      setIsLoading(false);
    }
  };

  return { analyzeImage, isAnalyzing };
};
