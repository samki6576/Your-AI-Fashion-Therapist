import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SelfieUpload } from '../components/SelfieUpload';
import { FaceResultsCard } from '../components/FaceResultsCard';
import { ProgressStepper } from '../components/ProgressStepper';
import { Button } from '../components/Button';
import { AppContext } from '../context/AppContext';

export const SelfiePage = () => {
  const { faceData } = useContext(AppContext);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <ProgressStepper
        steps={['Selfie', 'Wardrobe', 'Results', 'Outfits']}
        currentStep={0}
      />

      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold">Let&apos;s Analyze Your Face</h1>
          <p className="text-gray-400 text-lg">
            Upload a selfie or use your webcam. We&apos;ll analyze your features to determine your perfect color palette and style recommendations.
          </p>
        </motion.div>

        <SelfieUpload onSuccess={() => {}} />

        {faceData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Your Analysis Results</h2>
            <FaceResultsCard faceData={faceData} />

            <Link to="/wardrobe" className="inline-block">
              <Button variant="primary" size="lg">
                Add Your Wardrobe Items
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};
