export const OutfitsPage = () => {
  const { outfits } = useContext(AppContext);
  const [generatedOutfits, setGeneratedOutfits] = useState([]);

  // Safely check if generatedOutfits is an array with length
  const hasGeneratedOutfits = Array.isArray(generatedOutfits) && generatedOutfits.length > 0;

  // Safely check if outfits is an array with length  
  const hasSavedOutfits = Array.isArray(outfits) && outfits.length > 0;

  // Use generated outfits if available, otherwise use saved outfits (if available)
  const displayOutfits = hasGeneratedOutfits ? generatedOutfits : (hasSavedOutfits ? outfits : []);

  // Ensure displayOutfits is always an array
  const safeDisplayOutfits = Array.isArray(displayOutfits) ? displayOutfits : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <ProgressStepper
        steps={['Selfie', 'Wardrobe', 'Results', 'Outfits']}
        currentStep={3}
      />

      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold">Generate Perfect Outfits</h1>
          <p className="text-gray-400 text-lg">
            Create outfit combinations from your kept items tailored for different occasions.
          </p>
        </motion.div>

        <OutfitGenerator onOutfitsGenerated={setGeneratedOutfits} />

        {safeDisplayOutfits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Generated Outfits ({safeDisplayOutfits.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeDisplayOutfits.map((outfit, index) => (
                <OutfitCard key={outfit.id || index} outfit={outfit} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};