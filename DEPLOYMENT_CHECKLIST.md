# Netlify Deployment Checklist

## Pre-Deployment

- [ ] API key is NOT committed to git (check with `git log` for `.env`)
- [ ] `.env` files are in `.gitignore`
- [ ] Frontend builds successfully locally: `npm run build`
- [ ] Backend runs successfully locally: `npm run dev`
- [ ] All tests pass
- [ ] No console errors in browser

## Frontend Deployment

- [ ] Create Netlify account at [netlify.com](https://netlify.com)
- [ ] Connect GitHub repository to Netlify
- [ ] Verify build settings:
  - Base: (empty)
  - Build command: `cd frontend && npm install && npm run build`
  - Publish: `frontend/dist`
- [ ] Set environment variables in Netlify dashboard:
  - `VITE_API_URL` = backend URL
  - `NODE_ENV` = `production`
- [ ] Run test build in Netlify
- [ ] Deploy to production

## Backend Deployment

- [ ] Choose backend hosting (Railway/Heroku/Render/Replit)
- [ ] Create account and app
- [ ] Set environment variables:
  - `PERFECT_CORP_API_KEY` = your API key
  - `PORT` = 5000
  - `NODE_ENV` = `production`
- [ ] Connect GitHub repository
- [ ] Deploy backend
- [ ] Get backend public URL

## Post-Deployment

- [ ] Update Netlify `VITE_API_URL` with backend URL
- [ ] Test frontend at Netlify URL
- [ ] Verify API calls work:
  - [ ] Upload wardrobe item
  - [ ] Perform face analysis
  - [ ] Try virtual try-on
- [ ] Check browser console for errors
- [ ] Monitor logs for issues
- [ ] Test on mobile device

## Monitoring

- [ ] Set up Netlify notifications for failed builds
- [ ] Monitor backend logs for errors
- [ ] Track API usage
- [ ] Review error logs weekly

## Performance

- [ ] Frontend Lighthouse score: >90
- [ ] API response time: <2s
- [ ] No 5xx errors in logs

## Security

- [ ] HTTPS enabled (automatic on Netlify)
- [ ] No secrets in git history
- [ ] API key rotated (never exposed)
- [ ] CORS headers configured on backend

---

**Deployment Date**: _______________
**Frontend URL**: _______________
**Backend URL**: _______________
**Status**: ✅ Complete / ⏳ In Progress / ❌ Failed
