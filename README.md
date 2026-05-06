# Wardrobe AI Therapist

A full-stack React + Express.js application that uses AI-powered face analysis to provide personalized wardrobe recommendations.

## Features

- **Face Analysis**: AI-powered analysis using Perfect Corp API to determine skin tone, face shape, and color palette
- **Wardrobe Audit**: Smart categorization of clothing items into Keep, Donate, or Sell
- **Outfit Generator**: Create perfect outfit combinations based on face analysis and wardrobe items
- **Demo Mode**: Works without API key for testing and development
- **Responsive Design**: Beautiful dark theme with glassmorphism and smooth animations

## Project Structure

```
├── backend/                    # Express.js server
│   ├── server.js              # Main server file
│   ├── routes/                # API route handlers
│   ├── controllers/           # Business logic
│   ├── services/              # External API integration & recommendations
│   ├── middleware/            # Upload & error handling
│   ├── utils/                 # Helper functions
│   ├── package.json
│   └── .env
│
└── frontend/                   # React + Vite application
    ├── src/
    │   ├── pages/             # 5 main pages (Home, Selfie, Wardrobe, Results, Outfits)
    │   ├── components/        # 23+ reusable components
    │   ├── hooks/             # Custom React hooks
    │   ├── context/           # Global state management
    │   ├── api/               # API client
    │   ├── utils/             # Constants and helpers
    │   ├── App.jsx            # Main app component
    │   ├── main.jsx           # Entry point
    │   └── index.css          # Global styles
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── .env
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. **Clone or extract the project**

2. **Backend Setup**

```bash
cd backend
npm install
```

Edit `.env` file and add your Perfect Corp API key:
```
PORT=5000
PERFECT_CORP_API_KEY=your_api_key_here
PERFECT_CORP_BASE_URL=https://api.perfectcorp.com
NODE_ENV=development
```

Note: If you don't have an API key, the app will work in demo mode with mock data.

3. **Frontend Setup**

```bash
cd frontend
npm install
```

### Running the Application

1. **Start Backend Server** (Terminal 1)

```bash
cd backend
npm run dev
```

Server will be available at: `http://localhost:5000`

2. **Start Frontend Server** (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## How It Works

### Workflow

1. **Home Page**: Overview and features
2. **Selfie Page**: Upload a photo or use webcam for face analysis
3. **Wardrobe Page**: Add items from your wardrobe with details
4. **Results Page**: View recommendations (Keep/Donate/Sell)
5. **Outfits Page**: Generate and view outfit combinations

### Face Analysis Flow

```
Upload Image → Perfect Corp API → Extract Attributes → Store Face Data
                                    ↓
                              Fallback to Mock Data (if API fails)
```

Extracted attributes:
- Skin tone (warm, cool, neutral)
- Face shape (oval, round, square, heart, oblong)
- Contrast level (high, medium, low)
- Recommended colors
- Colors to avoid

### Recommendation Engine

Classification scoring:
- **Color matching** (90%) → KEEP
- **Color avoidance** (85%) → DONATE
- **Style matching** (75%) → KEEP
- **Condition + Brand** (70%) → SELL
- **Default** (60%) → DONATE

### Outfit Generation

Automatically creates outfit combinations from "Keep" items with:
- Compatibility score
- Season suitability
- Occasion tagging
- Color coordination

## API Endpoints

### Face Analysis

```
POST /api/face/analyze
Content-Type: multipart/form-data
Body: { image: File }
Response: { success: bool, faceData: {} }
```

### Wardrobe Management

```
POST /api/wardrobe/add
Body: { category, style, color, condition, brand, size, notes }
Response: { success: bool, item: {} }

GET /api/wardrobe/items
Response: { success: bool, items: [] }

DELETE /api/wardrobe/items/:itemId
Response: { success: bool }

POST /api/wardrobe/recommendations
Body: { faceData: {} }
Response: { success: bool, recommendations: [] }
```

### Recommendations

```
POST /api/recommendations/outfits
Body: { keepItems: [], occasion: string }
Response: { success: bool, outfits: [] }

POST /api/recommendations/statistics
Body: { wardrobeItems: [], recommendations: [] }
Response: { success: bool, statistics: {} }
```

## Demo Mode

The app works perfectly without an API key! Features:

- Uses pre-loaded mock face analysis data
- Generates recommendations based on mock data
- Full outfit generation
- Complete wardrobe management

To enable demo mode: Leave `PERFECT_CORP_API_KEY=your_api_key_here` in `.env`

## Frontend Features

### Components (23+)

**Layout**
- Header (with status indicator)
- Footer (with links)

**Common**
- LoadingSpinner
- ErrorAlert
- ProgressStepper
- Button (with variants)

**Upload**
- SelfieUpload (webcam + file)
- WardrobeUpload (form)
- DragDropZone

**Analysis**
- FaceResultsCard
- ColorPalette display

**Wardrobe**
- WardrobeGrid
- WardrobeCard
- KeepSection
- DonateSection
- SellSection

**Outfits**
- OutfitGenerator
- OutfitCard

### Pages (5)

1. **HomePage** - Landing page with features
2. **SelfiePage** - Face analysis workflow
3. **WardrobePage** - Wardrobe item management
4. **ResultsPage** - Wardrobe recommendations
5. **OutfitsPage** - Outfit generation and display

### State Management

Global context (`AppContext`) manages:
- `faceData` - Face analysis results
- `wardrobeItems` - User's wardrobe
- `recommendations` - Analysis recommendations
- `outfits` - Generated outfits
- `isLoading` - Loading state
- `error` - Error messages

### Custom Hooks

- `useFaceAnalysis()` - Face analysis logic
- `useWardrobe()` - Wardrobe management
- `useRecommendations()` - Outfit generation

## Styling

**Theme**: Dark mode with glassmorphism

**Colors**
- Primary: `#8B5CF6` (Purple)
- Secondary: `#EC4899` (Pink)
- Background: `#0F0F0F` (Dark)
- Card: `#1A1A2E` (Dark Blue)

**Effects**
- Glassmorphism (blur + transparency)
- Neon accents
- Smooth animations (Framer Motion)
- Custom scrollbar styling

## Build for Production

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

## Error Handling

- Form validation on all inputs
- API error responses with user-friendly messages
- Fallback to mock data if API fails
- Toast notifications for all user actions
- Global error alert display

## Technologies Used

### Backend

- **Express.js** - Web framework
- **CORS** - Cross-origin requests
- **Multer** - File upload handling
- **node-fetch** - HTTP requests to Perfect Corp API
- **dotenv** - Environment variables

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Dropzone** - Drag & drop
- **React Webcam** - Camera access
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

## Hackathon Notes

This project is production-ready for hackathon submission with:

- ✅ Full backend + frontend integration
- ✅ Real API integration (with demo fallback)
- ✅ Complete UI/UX with 5 pages
- ✅ All core features implemented
- ✅ Professional styling with animations
- ✅ Error handling throughout
- ✅ Responsive design
- ✅ Well-organized code
- ✅ Proper routing and state management

## Future Enhancements

- Database persistence (MongoDB/PostgreSQL)
- User authentication
- Photo gallery for wardrobe
- Social sharing features
- Mobile app version
- AI-powered trend suggestions
- Virtual try-on feature
- Integration with fashion retailers

## License

MIT

## Support

For issues or questions, please refer to the documentation or check the code comments for detailed implementation notes.

---

**Built with ✨ for the Wardrobe AI Therapist Hackathon**
#   Y o u r - A I - F a s h i o n - T h e r a p i s t  
 