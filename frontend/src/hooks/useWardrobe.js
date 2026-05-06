import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import * as api from '../api/client';
import { analyzeWardrobeItem } from '../utils/recommendationEngine';
import toast from 'react-hot-toast';

export const useWardrobe = () => {
  const { updateRecommendations, setIsLoading, faceData, wardrobeItems, addWardrobeItem, removeWardrobeItem, userImage } = useContext(AppContext);
  const [isAdding, setIsAdding] = useState(false);


  const addItem = async (itemData) => {
    try {
      setIsAdding(true);
      setIsLoading(true);

      const newItem = {
        ...itemData,
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      };

      addWardrobeItem(newItem);
      
      toast.success('Item added!');
      return newItem;
    } catch (error) {
      toast.error('Failed to add item');
      console.error('Add item error:', error);
    } finally {
      setIsAdding(false);
      setIsLoading(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      setIsLoading(true);
      removeWardrobeItem(itemId);
      toast.success('Item deleted');
    } catch (error) {
      toast.error('Failed to delete item');
      console.error('Delete item error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      if (!faceData) {
        toast.error('Please analyze your face first');
        return;
      }

      if (wardrobeItems.length === 0) {
        toast.error('Please add wardrobe items first');
        return;
      }

      setIsLoading(true);
      
      // Perform recommendation analysis locally
      const recommendations = wardrobeItems.map(item => ({
        ...item,
        ...analyzeWardrobeItem(item, faceData)
      }));

      updateRecommendations(recommendations);
      toast.success('Recommendations generated!');
      return recommendations;
    } catch (error) {
      toast.error('Failed to get recommendations');
      console.error('Recommendations error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const performTryOn = async (itemImageUrl) => {
    try {
      if (!userImage) {
        toast.error('Please take a selfie first');
        return null;
      }

      if (!itemImageUrl) {
        toast.error('This item has no image for try-on');
        return null;
      }

      setIsLoading(true);
      const response = await api.tryOnCloth(userImage, itemImageUrl);
      
      if (response.data.success) {
        toast.success('Try-on successful!');
        return response.data.data; // This contains the result image URL
      }
    } catch (error) {
      toast.error('Failed to perform try-on');
      console.error('Try-on error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addItem, deleteItem, fetchRecommendations, performTryOn, isAdding };
};
