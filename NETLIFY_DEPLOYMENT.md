# Netlify Deployment Guide

## Overview
This app consists of:
- **Frontend**: React + Vite (deployed to Netlify)
- **Backend**: Express.js + Perfect Corp APIs (deployed separately)

## Step 1: Deploy Frontend to Netlify

### Option A: Using Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to project root
cd "c:\New folder (5)\silicon"

# Deploy
netlify deploy --prod
```

### Option B: Connect GitHub Repository
1. Go to [https://netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account (samki6576/Your-AI-Fashion-Therapist)
4. Set build settings:
   - **Base directory**: (leave empty)
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Publish directory**: `frontend/dist`
5. Click "Deploy site"

## Step 2: Configure Environment Variables in Netlify

In Netlify Dashboard:
1. Go to **Site settings → Build & deploy → Environment**
2. Add environment variables:
   - `VITE_API_URL` = `https://your-backend-url.com` (see Step 3)
   - `NODE_ENV` = `production`

## Step 3: Deploy Backend (Choose One Option)

### Option A: Deploy to Heroku (Recommended for Free)
```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set PERFECT_CORP_API_KEY=your_api_key_here
heroku config:set PORT=5000

# Deploy backend
cd backend
git push heroku main
```

### Option B: Deploy to Railway
1. Go to [https://railway.app](https://railway.app)
2. Click "New Project → Deploy from GitHub repo"
3. Select `Your-AI-Fashion-Therapist`
4. Railway will auto-detect the backend in `/backend`
5. Add environment variables in Railway dashboard:
   - `PERFECT_CORP_API_KEY=your_api_key_here`
6. Railway provides a public URL automatically

### Option C: Deploy to Render
1. Go to [https://render.com](https://render.com)
2. Click "New → Web Service"
3. Connect GitHub repository
4. Specify the backend directory as `/backend`
5. Add environment variables
6. Deploy

### Option D: Deploy to Replit (Free, Easy)
1. Go to [https://replit.com](https://replit.com)
2. Click "Import GitHub Repo"
3. Paste: `https://github.com/samki6576/Your-AI-Fashion-Therapist`
4. Click "Import"
5. Add `.env` file to backend with your API key
6. Replit auto-generates a URL (keeps it running)

## Step 4: Update API URL

After deploying backend, update the Netlify environment variable:

```
VITE_API_URL=https://your-heroku-app.herokuapp.com
```

Or Railway: `VITE_API_URL=https://your-railway-app.up.railway.app`

## Step 5: Test Deployment

1. Visit your Netlify site URL
2. Upload a wardrobe item
3. Test virtual try-on
4. Verify API calls are working

## Monitoring

### Netlify
- View logs: Site settings → Build & deploy → Deploys

### Backend (Heroku)
```bash
heroku logs --tail
```

### Backend (Railway/Render)
- Check dashboard logs

## Troubleshooting

### "API requests failing (500 errors)"
- Check backend is running
- Verify `VITE_API_URL` is correct in Netlify
- Check backend environment variables are set
- Review backend logs for errors

### "Image upload not working"
- Ensure Perfect Corp API key is correct
- Check API key hasn't been revoked
- Verify API key is set in backend environment

### "Build failing on Netlify"
```bash
# Test build locally
cd frontend
npm install
npm run build
```

## Tips & Best Practices

1. **Keep API Key Safe**: Never commit `.env` files
2. **Monitor Logs**: Check both frontend and backend logs regularly
3. **Test Before Deploy**: Test locally first with `npm run dev`
4. **Use HTTPS**: All modern deployments use HTTPS (secure)
5. **Scale Later**: Start free and upgrade as needed

## Estimated Costs (Monthly)

- **Netlify Free**: $0 (excellent for frontend)
- **Heroku Free**: $0 (plan discontinued, use alternatives)
- **Railway Free**: $5 starter plan (very affordable)
- **Render Free**: $0 (limited features)
- **Replit Paid**: $7/month (optional, free version available)

**Total**: Can deploy fully for free or ~$5-7/month

---

For questions or issues, check the deployment platform's documentation or contact support.
