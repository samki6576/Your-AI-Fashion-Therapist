# Netlify Deployment Troubleshooting

## ✅ Fix Applied

Your project had a **root-level Next.js project** that was conflicting with the **React Vite app** in `/frontend`.

**What was wrong:**
- Netlify was trying to build the root Next.js project
- The actual React Vite app was in the `/frontend` folder
- netlify.toml didn't specify which app to use

**What I fixed:**
- Updated `netlify.toml` to set `base = "frontend"`
- Changed build command to work from the frontend directory
- Published `dist` folder (Vite output)
- Pushed changes to GitHub

---

## 🔧 Next Steps in Netlify Dashboard

### 1. **Clear Netlify Cache & Rebuild**

Go to your Netlify site:
1. Click **"Site settings"**
2. Go to **"Build & deploy"** → **"Deploys"**
3. Click **"Trigger deploy"** → **"Deploy site"**
   - This will rebuild with the new netlify.toml

### 2. **Verify Build Settings**

In Netlify Dashboard:
1. **Site settings** → **Build & deploy** → **Build settings**
2. Should show:
   - **Base directory**: `frontend` ✓
   - **Build command**: `npm run build` ✓
   - **Publish directory**: `dist` ✓
3. If different, click "Edit settings" and update

### 3. **Check Build Logs**

1. Go to **"Deploys"** tab
2. Click the latest deploy
3. Click **"Deploy log"** to see detailed build output
4. Look for:
   - ✓ `vite build` succeeded
   - ✓ `built in X.Xs`
   - ✓ No errors

### 4. **Set Environment Variables**

1. Go to **"Site settings"** → **"Build & deploy"** → **"Environment"**
2. Add variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
3. Trigger a rebuild

---

## 🐛 If Still Not Working

### Check Netlify Build Output

Possible errors and solutions:

**Error: "Cannot find module"**
- Solution: Check `frontend/node_modules` exists
- Netlify will run `npm install` automatically

**Error: "VITE_API_URL is undefined"**
- Solution: Add to Netlify environment variables
- Or set in `frontend/.env.production`

**Error: "dist folder not found"**
- Check: `frontend/package.json` has `"build": "vite build"`
- Manual test: `cd frontend && npm run build`

**Blank page (nothing showing)**
- Check: Network tab in DevTools (F12)
- Check: Console for JavaScript errors
- Verify: API calls to backend are working
- Test locally first: `cd frontend && npm run dev`

---

## 📝 Manual Rebuild Steps

If Netlify continues to fail, rebuild manually:

```powershell
cd "c:\New folder (5)\silicon\frontend"

# Clean install
rm node_modules -r -force
rm package-lock.json
npm install

# Build
npm run build

# Check output
ls dist
# Should show: index.html, assets folder
```

Then commit and push:
```powershell
cd "c:\New folder (5)\silicon"
git add .
git commit -m "Rebuild frontend"
git push origin main
```

---

## 🔍 Verify Deployment

After rebuild, check:

1. ✓ Site loads (no 404)
2. ✓ Page doesn't show errors
3. ✓ Console tab clean (F12)
4. ✓ Can upload wardrobe items
5. ✓ API calls work (check Network tab)

---

## 📊 Project Structure

```
silicon/ (root)
├── package.json (Next.js - ignore this)
├── netlify.toml (deployment config)
├── frontend/ ← BUILD FROM HERE
│   ├── package.json (Vite + React)
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   └── dist/ (output - DO NOT commit)
└── backend/ (separate project)
    ├── server.js
    └── ...
```

---

## 🆘 Still Stuck?

Try these debugging steps:

### 1. Check Build Command Works Locally
```powershell
cd frontend
npm run build
# Should succeed and create frontend/dist
```

### 2. Check Netlify Sees New Config
```powershell
# View netlify.toml
cat netlify.toml
# Should show: base = "frontend"
```

### 3. Check GitHub Has Latest
```powershell
git log --oneline -3
# Should show your recent commits
```

### 4. Force Clean Rebuild
In Netlify:
- **Deploys** → **Deploy settings** → **Clear cache & redeploy**

### 5. Check Frontend Builds
```powershell
cd frontend
npm install
npm run build
# Should succeed without errors
```

---

## ✨ Common Mistakes

❌ **Frontend not showing?**
- Check build output says "vite build succeeded"
- Verify Netlify deploying from `frontend/dist`

❌ **API calls failing?**
- Add backend URL to env variables
- Restart backend if needed
- Check CORS settings on backend

❌ **Old version deployed?**
- Clear Netlify cache and redeploy
- Hard refresh browser (Ctrl+Shift+R)

---

Contact support if issues persist!
