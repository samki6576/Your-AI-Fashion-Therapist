import { analyzeWardrobeItem } from '../services/recommendationEngine.js';
import { db } from '../utils/firebase.js';

// In-memory fallback if Firebase is not configured
let wardrobeItemsFallback = [];

export const addWardrobeItem = async (req, res, next) => {
  try {
    const { category, style, color, condition, brand, size, notes, imageUrl } = req.body;

    if (!category || !color) {
      return res.status(400).json({ error: 'Category and color are required' });
    }

    const newItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      category,
      style: style || 'casual',
      color,
      condition: condition || 'good',
      brand: brand || '',
      size: size || 'M',
      notes: notes || '',
      imageUrl: imageUrl || '',
      createdAt: new Date().toISOString()
    };

    if (db) {
      await db.collection('wardrobe').doc(newItem.id).set(newItem);
    } else {
      wardrobeItemsFallback.push(newItem);
    }

    res.json({
      success: true,
      item: newItem
    });
  } catch (error) {
    next(error);
  }
};

export const getWardrobeItems = async (req, res, next) => {
  try {
    let items = [];
    if (db) {
      const snapshot = await db.collection('wardrobe').orderBy('createdAt', 'desc').get();
      items = snapshot.docs.map(doc => doc.data());
    } else {
      items = [...wardrobeItemsFallback].reverse();
    }

    res.json({
      success: true,
      items
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWardrobeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (db) {
      await db.collection('wardrobe').doc(itemId).delete();
    } else {
      wardrobeItemsFallback = wardrobeItemsFallback.filter(item => item.id !== itemId);
    }

    res.json({
      success: true,
      message: 'Item deleted'
    });
  } catch (error) {
    next(error);
  }
};

export const getWardrobeRecommendations = async (req, res, next) => {
  try {
    const { faceData } = req.body;

    let items = [];
    if (db) {
      const snapshot = await db.collection('wardrobe').get();
      items = snapshot.docs.map(doc => doc.data());
    } else {
      items = wardrobeItemsFallback;
    }

    if (!faceData || !items.length) {
      return res.status(400).json({ error: 'Face data and wardrobe items required' });
    }

    const recommendations = items.map(item => ({
      ...item,
      ...analyzeWardrobeItem(item, faceData)
    }));

    res.json({
      success: true,
      recommendations
    });
  } catch (error) {
    next(error);
  }
};
