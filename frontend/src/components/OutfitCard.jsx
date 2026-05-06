import { motion } from 'framer-motion';
import { CLOTHING_CATEGORIES } from '../utils/constants';

export const OutfitCard = ({ outfit, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-card to-dark border border-border rounded-lg p-6 hover:border-primary/50 transition"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg capitalize">{outfit.occasion}</h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{outfit.compatibility_score}%</p>
          <p className="text-xs text-gray-400">Compatible</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {outfit.items.map((item, idx) => (
          <div key={idx} className="bg-dark/50 rounded p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold capitalize">{item.category}</p>
              <p className="text-sm text-gray-400 capitalize">{item.color}</p>
            </div>
            <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
              {item.style}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-400 pt-4 border-t border-border">
        <p>{outfit.season}</p>
      </div>
    </motion.div>
  );
};
