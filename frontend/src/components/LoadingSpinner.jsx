import { motion } from 'framer-motion';

export const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
      />
      <p className="mt-4 text-gray-400">{message}</p>
    </div>
  );
};
