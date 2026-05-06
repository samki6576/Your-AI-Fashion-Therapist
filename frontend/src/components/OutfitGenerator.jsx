import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { OCCASIONS } from '../utils/constants';
import { useRecommendations } from '../hooks/useRecommendations';

export const OutfitGenerator = ({ onOutfitsGenerated }) => {
  const [selectedOccasion, setSelectedOccasion] = useState('casual');
  const { generateOutfits, isGenerating } = useRecommendations();

  const handleGenerate = async () => {
    const outfits = await generateOutfits(selectedOccasion);
    onOutfitsGenerated?.(outfits);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Generate Outfits</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3">Select Occasion</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {OCCASIONS.map((occasion) => (
                <motion.button
                  key={occasion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedOccasion(occasion)}
                  className={`px-4 py-2 rounded-lg transition capitalize font-medium ${
                    selectedOccasion === occasion
                      ? 'bg-primary text-dark'
                      : 'bg-dark border border-border text-gray-300 hover:border-primary'
                  }`}
                >
                  {occasion}
                </motion.button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            loading={isGenerating}
            className="w-full"
          >
            Generate Outfits
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
