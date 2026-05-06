import express from 'express';
import { analyzeFace } from '../controllers/faceAnalysisController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/analyze', upload.single('image'), analyzeFace);

export default router;
