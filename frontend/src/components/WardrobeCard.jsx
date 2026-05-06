import { MdDelete, MdCheckroom } from 'react-icons/md';
import { Button } from './Button';
import { useWardrobe } from '../hooks/useWardrobe';
import { useState } from 'react';

export const WardrobeCard = ({ item, onDelete }) => {
  const { performTryOn } = useWardrobe();
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isTryingOn, setIsTryingOn] = useState(false);

  const handleTryOn = async () => {
    setIsTryingOn(true);
    const result = await performTryOn(item.imageUrl);
    if (result && result.images && result.images.length > 0) {
      setTryOnResult(result.images[0]);
    }
    setIsTryingOn(false);
  };

  return (
    <div className="bg-gradient-to-br from-card to-dark border border-border rounded-lg p-4 hover:border-primary/50 transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold capitalize">{item.category}</h3>
          <p className="text-sm text-gray-400 capitalize">{item.style}</p>
        </div>
        <div
          className="w-8 h-8 rounded-full border-2"
          style={{ borderColor: getColorValue(item.color) }}
        />
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Color:</span>
          <span className="capitalize">{item.color}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Condition:</span>
          <span className="capitalize">{item.condition}</span>
        </div>
        {item.brand && (
          <div className="flex justify-between">
            <span className="text-gray-400">Brand:</span>
            <span>{item.brand}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-400">Size:</span>
          <span>{item.size}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleTryOn}
          loading={isTryingOn}
          className="w-full justify-center"
        >
          <MdCheckroom size={16} />
          Try On
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete?.(item.id)}
          className="w-full justify-center text-red-400 hover:bg-red-500/10"
        >
          <MdDelete size={16} />
          Delete
        </Button>
      </div>

      {tryOnResult && (
        <div className="mt-4 p-2 bg-dark/50 rounded border border-primary/30">
          <p className="text-xs text-primary mb-2 font-semibold">Virtual Try-On Result:</p>
          <img src={tryOnResult} alt="Try On Result" className="w-full rounded shadow-lg" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setTryOnResult(null)}
            className="w-full mt-2 text-xs"
          >
            Clear Result
          </Button>
        </div>
      )}
    </div>
  );
};

const getColorValue = (color) => {
  const colorMap = {
    'black': '#000000',
    'white': '#FFFFFF',
    'gray': '#808080',
    'navy': '#000080',
    'blue': '#0000FF',
    'red': '#FF0000',
    'pink': '#FFC0CB',
    'yellow': '#FFFF00',
    'orange': '#FFA500',
    'green': '#008000',
    'purple': '#800080',
    'brown': '#A52A2A',
    'beige': '#F5F5DC',
  };

  for (const [key, value] of Object.entries(colorMap)) {
    if (color.toLowerCase().includes(key)) return value;
  }
  return '#808080';
};
