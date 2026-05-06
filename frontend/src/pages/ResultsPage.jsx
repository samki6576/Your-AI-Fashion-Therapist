import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProgressStepper } from '../components/ProgressStepper';
import { Button } from '../components/Button';
import { KeepSection } from '../components/KeepSection';
import { DonateSection } from '../components/DonateSection';
import { SellSection } from '../components/SellSection';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AppContext } from '../context/AppContext';
import { useWardrobe } from '../hooks/useWardrobe';

export const ResultsPage = () => {
  const { recommendations, isLoading, faceData, wardrobeItems } = useContext(AppContext);
  const { fetchRecommendations, deleteItem } = useWardrobe();

  useEffect(() => {
    if (wardrobeItems.length > 0 && !recommendations.length) {
      fetchRecommendations();
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Analyzing your wardrobe..." />;
  }

  const keepItems = recommendations.filter(r => r.recommendation === 'keep');
  const donateItems = recommendations.filter(r => r.recommendation === 'donate');
  const sellItems = recommendations.filter(r => r.recommendation === 'sell');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <ProgressStepper
        steps={['Selfie', 'Wardrobe', 'Results', 'Outfits']}
        currentStep={2}
      />

      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold">Your Wardrobe Analysis</h1>
          <p className="text-gray-400 text-lg">
            Based on your face analysis, here&apos;s what we recommend for your wardrobe.
          </p>
        </motion.div>

        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm font-semibold mb-2">Keep</h3>
              <p className="text-3xl font-bold text-green-400">{keepItems.length}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm font-semibold mb-2">Donate</h3>
              <p className="text-3xl font-bold text-blue-400">{donateItems.length}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/30 rounded-lg p-6">
              <h3 className="text-gray-400 text-sm font-semibold mb-2">Sell</h3>
              <p className="text-3xl font-bold text-amber-400">{sellItems.length}</p>
            </div>
          </motion.div>
        )}

        <div className="space-y-16">
          {keepItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <KeepSection items={keepItems} onDelete={deleteItem} />
            </motion.div>
          )}

          {donateItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <DonateSection items={donateItems} onDelete={deleteItem} />
            </motion.div>
          )}

          {sellItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SellSection items={sellItems} onDelete={deleteItem} />
            </motion.div>
          )}
        </div>

        {keepItems.length > 0 && (
          <Link to="/outfits" className="inline-block">
            <Button variant="primary" size="lg">
              Generate Outfits
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
