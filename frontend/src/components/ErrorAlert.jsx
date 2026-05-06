import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';

export const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full"
      >
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
          <div className="text-red-400 font-semibold">Error</div>
          <div className="text-red-300 flex-1">{message}</div>
          {onClose && (
            <button onClick={onClose} className="text-red-400 hover:text-red-300">
              <MdClose size={20} />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
