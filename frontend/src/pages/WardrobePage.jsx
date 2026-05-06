import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WardrobeUpload } from '../components/WardrobeUpload';
import { WardrobeGrid } from '../components/WardrobeGrid';
import { ProgressStepper } from '../components/ProgressStepper';
import { Button } from '../components/Button';
import { AppContext } from '../context/AppContext';
import { useWardrobe } from '../hooks/useWardrobe';

export const WardrobePage = () => {
  const { wardrobeItems } = useContext(AppContext);
  const { deleteItem } = useWardrobe();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <ProgressStepper
        steps={['Selfie', 'Wardrobe', 'Results', 'Outfits']}
        currentStep={1}
      />

      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold">Add Your Wardrobe Items</h1>
          <p className="text-gray-400 text-lg">
            Add items from your wardrobe one by one. Include color, style, condition, and any other details to get accurate recommendations.
          </p>
        </motion.div>

        <WardrobeUpload onSuccess={() => {}} />

        {wardrobeItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Wardrobe ({wardrobeItems.length})</h2>
            </div>
            <WardrobeGrid items={wardrobeItems} onDelete={deleteItem} />

            <Link to="/results" className="inline-block">
              <Button variant="primary" size="lg">
                Get Recommendations
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};
