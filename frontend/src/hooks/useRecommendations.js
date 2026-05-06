import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { generateOutfitCombinations } from '../utils/recommendationEngine';
import toast from 'react-hot-toast';

export const useRecommendations = () => {
  const { updateOutfits, setIsLoading, recommendations } = useContext(AppContext);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateOutfits = async (occasion = 'casual') => {
    try {
      if (!recommendations || recommendations.length === 0) {
        toast.error('No recommendations available');
        return;
      }

      const keepItems = recommendations.filter(r => r.recommendation === 'keep');

      if (keepItems.length === 0) {
        toast.error('No items to keep');
        return;
      }

      setIsGenerating(true);
      setIsLoading(true);

      // Generate outfits locally
      const outfits = generateOutfitCombinations(keepItems, occasion);

      updateOutfits(outfits);
      toast.success('Outfits generated!');
      return outfits;
    } catch (error) {
      toast.error('Failed to generate outfits');
      console.error('Generate outfits error:', error);
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  return { generateOutfits, isGenerating };
};
