import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// Import routes
import faceAnalysisRoutes from './routes/faceAnalysis.js';
import wardrobeRoutes from './routes/wardrobe.js';
import recommendationsRoutes from './routes/recommendations.js';
import clothRoutes from './routes/cloth.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allowed Frontend URLs
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// API Routes
app.use('/api/face', faceAnalysisRoutes);
app.use('/api/wardrobe', wardrobeRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/cloth', clothRoutes);

// Serve frontend static files in production when available
const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  const indexFile = path.join(frontendDist, 'index.html');
  res.sendFile(indexFile, (err) => {
    if (err) {
      next(err);
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Wardrobe AI Therapist - Backend       ║
║  Server running on port ${PORT}         ║
║  http://localhost:${PORT}              ║
╚════════════════════════════════════════╝
  `);
  console.log('Health check: http://localhost:' + PORT + '/health');
  console.log('API Key Status:', process.env.PERFECT_CORP_API_KEY === 'your_api_key_here' ? 'DEMO MODE' : 'CONFIGURED');
});
