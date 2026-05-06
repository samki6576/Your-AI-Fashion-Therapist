import { getFaceAnalysis } from '../services/perfectCorpService.js';

export const analyzeFace = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const analysisResult = await getFaceAnalysis(req.file.buffer);

    if (!analysisResult.success) {
      return res.status(500).json({ error: 'Face analysis failed', data: null });
    }

    const faceData = analysisResult.data;

    res.json({
      success: true,
      faceData: {
        skin_tone: faceData.skin_tone,
        face_shape: faceData.face_shape,
        contrast_level: faceData.contrast_level,
        recommended_colors: faceData.recommended_colors || [],
        colors_to_avoid: faceData.colors_to_avoid || []
      }
    });
  } catch (error) {
    next(error);
  }
};
