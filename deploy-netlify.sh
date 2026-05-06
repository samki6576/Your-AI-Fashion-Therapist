#!/bin/bash

# Quick deployment script for Netlify

echo "🚀 Starting Netlify Deployment..."

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Login to Netlify
echo "📝 Logging into Netlify..."
netlify login

# Check if .env.production exists
if [ ! -f "frontend/.env.production" ]; then
    echo "⚠️  Creating frontend/.env.production..."
    cat > frontend/.env.production << EOF
VITE_API_URL=https://your-backend-url.com
NODE_ENV=production
EOF
    echo "📝 Please edit frontend/.env.production and set the correct backend URL"
fi

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Deploy to Netlify
echo "☁️  Deploying to Netlify..."
netlify deploy --prod

echo "✅ Deployment complete!"
echo "📊 View your site: netlify status"
