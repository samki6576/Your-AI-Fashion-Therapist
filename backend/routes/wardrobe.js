import express from 'express';
import {
  addWardrobeItem,
  getWardrobeItems,
  deleteWardrobeItem,
  getWardrobeRecommendations
} from '../controllers/wardrobeController.js';

const router = express.Router();

router.post('/add', addWardrobeItem);
router.get('/items', getWardrobeItems);
router.delete('/items/:itemId', deleteWardrobeItem);
router.post('/recommendations', getWardrobeRecommendations);

export default router;
