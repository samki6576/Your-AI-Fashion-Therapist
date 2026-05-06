# Quick Start Guide - Wardrobe AI Therapist

## One-Command Setup

We've pre-configured everything for you. Just follow these simple steps!

## Prerequisites

Make sure you have Node.js v16+ installed:
```bash
node --version  # Should be 16.0.0 or higher
npm --version
```

## Installation & Running

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║  Wardrobe AI Therapist - Backend       ║
║  Server running on port 5000           ║
║  http://localhost:5000                 ║
╚════════════════════════════════════════╝
```

### Step 2: Start the Frontend Server

Open another terminal and run:

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.0.0  ready in 245 ms

➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser

Visit: **http://localhost:5173**

## Demo Mode (No API Key Required)

The app works completely in **DEMO MODE** with mock data if you don't have a Perfect Corp API key!

Just use the app normally - it will automatically:
- Return fake but realistic face analysis results
- Generate recommendations based on mock data
- Create outfit combinations

## With Perfect Corp API Key (Optional)

If you have an API key:

1. Open `backend/.env`
2. Replace `your_api_key_here` with your actual API key
3. Restart the backend server

The app will then use real face analysis from Perfect Corp API.

## What You Get

### Backend (Express.js)
- ✅ Face analysis API integration with Perfect Corp
- ✅ Wardrobe item management
- ✅ Recommendation engine
- ✅ Outfit generation
- ✅ Complete error handling
- ✅ CORS enabled for frontend communication

### Frontend (React + Vite)
- ✅ Beautiful dark theme with glassmorphism
- ✅ 5 fully functional pages
- ✅ 23+ React components
- ✅ Webcam + file upload for photos
- ✅ Real-time state management
- ✅ Smooth animations with Framer Motion
- ✅ Mobile responsive design

## Project Workflow

1. **Home** - Learn about the app
2. **Selfie** - Upload photo or use webcam
3. **Wardrobe** - Add your clothing items
4. **Results** - See recommendations (Keep/Donate/Sell)
5. **Outfits** - Generate perfect outfit combinations

## API Endpoints Available

### Face Analysis
```
POST http://localhost:5000/api/face/analyze
Content-Type: multipart/form-data
```

### Wardrobe
```
POST   http://localhost:5000/api/wardrobe/add
GET    http://localhost:5000/api/wardrobe/items
DELETE http://localhost:5000/api/wardrobe/items/:itemId
POST   http://localhost:5000/api/wardrobe/recommendations
```

### Recommendations
```
POST http://localhost:5000/api/recommendations/outfits
POST http://localhost:5000/api/recommendations/statistics
```

## Troubleshooting

### Port Already in Use?

If port 5000 or 5173 is already in use:

**For Backend (port 5000):**
```bash
cd backend
# Edit .env and change PORT to 5001 (or any available port)
npm run dev
```

**For Frontend (port 5173):**
The frontend will automatically find the next available port.

### Dependencies Not Installing?

```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

### Hot Reload Not Working?

Try restarting the dev server:

```bash
# Press Ctrl+C to stop
# Then run again
npm run dev
```

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## File Structure Overview

```
wardrobe-ai-therapist/
├── backend/
│   ├── server.js           # Main server
│   ├── routes/             # API endpoints
│   ├── controllers/        # Business logic
│   ├── services/           # API integration
│   ├── middleware/         # Upload & errors
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/          # 5 main pages
│   │   ├── components/     # 23+ components
│   │   ├── hooks/          # State logic
│   │   ├── context/        # Global state
│   │   ├── api/            # API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
└── README.md               # Full documentation
```

## Tips & Tricks

### Add Multiple Items Quickly
Don't reload the page - just fill the form again and submit. Items persist in memory during the session.

### Try Different Occasions
In the Outfits page, select different occasions (work, date, party, etc.) to generate context-specific outfits.

### Color Names
When adding items, use color names like:
- Basic: black, white, gray, navy, red, blue, green
- Warm: warm red, golden yellow, burnt orange, rust, terracotta
- Cool: cool pink, icy blue, cool purple, dusty rose
- Neutral: beige, tan, off-white, brown

### Face Shapes
Face analysis returns one of:
- Oval
- Round
- Square
- Heart
- Oblong

Each shape has specific style recommendations!

## Need Help?

1. Check the full README.md for detailed documentation
2. Look at the component comments in the code
3. Check browser console for error messages
4. Check terminal output for backend errors

## What's Included

- ✅ 58+ Production-ready files
- ✅ Full API integration
- ✅ Complete UI/UX
- ✅ Error handling
- ✅ State management
- ✅ Responsive design
- ✅ Demo mode fallback
- ✅ Professional styling

## Ready to Hack?

You now have a fully functional full-stack application ready for:
- Hackathon submission
- Further development
- Production deployment
- Customization

**Start the servers and happy hacking!** 🚀

---

**Questions?** Check the README.md or review the code comments throughout the project.
