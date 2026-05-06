import express from 'express';
import { tryOnCloth } from '../controllers/clothController.js';

const router = express.Router();

router.post('/try-on', tryOnCloth);

export default router;
