import express from 'express';
import { generateOutfits, getStatistics } from '../controllers/recommendationsController.js';

const router = express.Router();

router.post('/outfits', generateOutfits);
router.post('/statistics', getStatistics);

export default router;
