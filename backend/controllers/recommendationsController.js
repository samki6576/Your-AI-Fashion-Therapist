import { generateOutfitCombinations, calculateStatistics } from '../services/recommendationEngine.js';

export const generateOutfits = (req, res, next) => {
  try {
    const { keepItems, occasion } = req.body;

    if (!keepItems || keepItems.length === 0) {
      return res.status(400).json({ error: 'No keep items provided' });
    }

    const outfits = generateOutfitCombinations(keepItems, occasion || 'casual');

    res.json({
      success: true,
      outfits
    });
  } catch (error) {
    next(error);
  }
};

export const getStatistics = (req, res, next) => {
  try {
    const { wardrobeItems, recommendations } = req.body;

    if (!wardrobeItems || !recommendations) {
      return res.status(400).json({ error: 'Wardrobe items and recommendations required' });
    }

    const stats = calculateStatistics(wardrobeItems, recommendations);

    res.json({
      success: true,
      statistics: stats
    });
  } catch (error) {
    next(error);
  }
};
