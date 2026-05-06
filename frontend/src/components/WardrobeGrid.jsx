import { motion } from 'framer-motion';
import { WardrobeCard } from './WardrobeCard';

export const WardrobeGrid = ({ items, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No wardrobe items yet. Add your first item!</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <WardrobeCard item={item} onDelete={onDelete} />
        </motion.div>
      ))}
    </motion.div>
  );
};
