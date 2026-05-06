import { getClothAnalysis } from '../services/perfectCorpService.js';

export const tryOnCloth = async (req, res, next) => {
  try {
    const { src_file_url, ref_file_url } = req.body;

    if (!src_file_url || !ref_file_url) {
      return res.status(400).json({ error: 'Source and reference image URLs are required' });
    }

    const result = await getClothAnalysis(src_file_url, ref_file_url);

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Cloth analysis failed' });
    }

    res.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};
