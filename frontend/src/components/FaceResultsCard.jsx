import { motion } from 'framer-motion';

export const FaceResultsCard = ({ faceData }) => {
  if (!faceData) return null;

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-semibold mb-2">Skin Tone</h3>
          <p className="text-2xl font-bold text-primary capitalize">{faceData.skin_tone}</p>
        </div>

        <div className="bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/30 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-semibold mb-2">Face Shape</h3>
          <p className="text-2xl font-bold text-secondary capitalize">{faceData.face_shape}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-semibold mb-2">Contrast Level</h3>
          <p className="text-2xl font-bold text-purple-400 capitalize">{faceData.contrast_level}</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/30 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-semibold mb-2">Analysis Status</h3>
          <p className="text-2xl font-bold text-cyan-400">Complete</p>
        </div>
      </div>

      {faceData.recommended_colors && (
        <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6">
          <h3 className="font-bold mb-4">Recommended Colors</h3>
          <div className="flex flex-wrap gap-2">
            {faceData.recommended_colors.map((color, index) => (
              <span
                key={`${color}-${index}`}
                className="px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-sm text-primary"
              >
                {capitalize(color)}
              </span>
            ))}
          </div>
        </div>
      )}

      {faceData.colors_to_avoid && (
        <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6">
          <h3 className="font-bold mb-4">Colors to Avoid</h3>
          <div className="flex flex-wrap gap-2">
            {faceData.colors_to_avoid.map((color, index) => (
              <span
                key={`${color}-${index}`}
                className="px-4 py-2 bg-red-500/10 border border-red-500/50 rounded-full text-sm text-red-400"
              >
                {capitalize(color)}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
