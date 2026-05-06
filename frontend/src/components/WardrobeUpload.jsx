import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { CLOTHING_CATEGORIES, CLOTHING_STYLES, ITEM_CONDITIONS, COLORS } from '../utils/constants';
import { useWardrobe } from '../hooks/useWardrobe';

export const WardrobeUpload = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    category: 'top',
    style: 'casual',
    color: 'black',
    condition: 'good',
    brand: '',
    size: 'M',
    notes: '',
    imageUrl: ''
  });


  const { addItem, isAdding } = useWardrobe();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let finalImageUrl = formData.imageUrl;

    // No need to upload to Firebase, use the data URL directly
    // The image is already stored as data URL from the file input

    const item = await addItem({ ...formData, imageUrl: finalImageUrl });
    if (item) {
      setFormData({
        category: 'top',
        style: 'casual',
        color: 'black',
        condition: 'good',
        brand: '',
        size: 'M',
        notes: '',
        imageUrl: ''
      });

      onSuccess?.();
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6 bg-card/50 backdrop-blur border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-dark border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
            >
              {CLOTHING_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Style</label>
            <select
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full bg-dark border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
            >
              {CLOTHING_STYLES.map(style => (
                <option key={style} value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color *</label>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full bg-dark border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
            >
              {Object.values(COLORS).flat().map(color => (
                <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full bg-dark border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
            >
              {ITEM_CONDITIONS.map(cond => (
                <option key={cond} value={cond}>{cond.charAt(0).toUpperCase() + cond.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Nike, Zara"
              className="w-full bg-dark border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="e.g., M, 10, S"
              className="w-full bg-dark border border-border rounded px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Item Image (Upload or URL)</label>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setFormData(prev => ({ ...prev, imageUrl: event.target.result }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 italic">OR paste URL:</span>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl.startsWith('data:') ? 'Image Uploaded' : formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/item-image.jpg"
                className="flex-1 bg-dark border border-border rounded px-3 py-1 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            {formData.imageUrl && (
              <div className="mt-2 w-20 h-20 rounded border border-border overflow-hidden">
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional notes about this item..."
            className="w-full bg-dark border border-border rounded px-3 py-2 focus:outline-none focus:border-primary h-24 resize-none"
          />
        </div>

        <Button type="submit" variant="primary" size="lg" loading={isAdding} className="w-full">
          Add Item to Wardrobe
        </Button>
      </form>
    </motion.div>
  );
};
