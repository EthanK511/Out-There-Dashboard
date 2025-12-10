# 🚀 Deployment Guide

Complete guide for deploying Out There Dashboard to GitHub Pages.

## Prerequisites

- GitHub account
- Repository pushed to GitHub
- All code committed and pushed to `main` branch

## Method 1: GitHub Actions (Automatic) ⭐ Recommended

This is the easiest method - push your code and GitHub automatically deploys it!

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save

### Step 2: Configure Repository

The repository already has the workflow file at `.github/workflows/deploy.yml`.

Make sure `vite.config.js` has the correct base path:
```javascript
export default defineConfig({
  base: '/Out-There-Dashboard/', // Change to match your repo name
  // ... rest of config
});
```

### Step 3: Push to Deploy

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Step 4: Monitor Deployment

1. Go to **Actions** tab in your repository
2. Watch the deployment workflow run
3. Once complete (green checkmark), your site is live!
4. Visit: `https://yourusername.github.io/Out-There-Dashboard/`

### Automatic Updates

Every time you push to `main`, GitHub Actions automatically rebuilds and redeploys your site!

---

## Method 2: Manual Deploy with gh-pages

If you prefer manual control over deployments:

### Step 1: Install gh-pages

```bash
npm install gh-pages --save-dev
```

### Step 2: Update package.json

Add this to your scripts (already done):
```json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
}
```

### Step 3: Deploy

```bash
npm run deploy
```

This will:
1. Build your project
2. Create/update `gh-pages` branch
3. Push build files to GitHub

### Step 4: Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `/ (root)`
4. Save

Your site will be live at: `https://yourusername.github.io/Out-There-Dashboard/`

---

## Method 3: Other Platforms

### Vercel

1. Import your GitHub repository
2. Framework: Vite
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Environment Variables: Add your API keys
6. Deploy!

**Note**: For Vercel, you can deploy the full stack including the proxy server.

### Netlify

1. New site from Git
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy!

### Cloudflare Pages

1. Connect GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Build output: `dist`
5. Deploy!

---

## Important Notes

### ⚠️ API Keys

**DO NOT** commit your `.env` file with real API keys to GitHub!

The `.gitignore` file already excludes `.env`:
```
.env
```

### 📝 Configuration

Before deploying, ensure:

1. ✅ `vite.config.js` has correct `base` path
2. ✅ `.env` is in `.gitignore`
3. ✅ `.env.example` is committed (without real keys)
4. ✅ All dependencies are in `package.json`

### 🔄 Updating Deployment

#### GitHub Actions
Just push to main:
```bash
git add .
git commit -m "Update dashboard"
git push origin main
```

#### gh-pages
Run deploy script:
```bash
npm run deploy
```

### 🐛 Troubleshooting

#### 404 Error after deployment
- Check `base` in `vite.config.js` matches your repo name
- Ensure it starts and ends with `/`
- Example: `base: '/Out-There-Dashboard/'`

#### Blank page after deployment
- Check browser console for errors
- Verify asset paths are correct
- Clear browser cache

#### GitHub Actions fails
- Check Actions tab for error logs
- Ensure all dependencies are installed
- Verify `package.json` has all required packages

#### Widgets not loading
- Remember: Proxy server won't run on GitHub Pages
- Widgets that need API keys won't work unless you:
  - Deploy full stack on Vercel/Netlify/Heroku
  - Or make API calls directly from frontend (not recommended)

### 💡 Production Tips

For a production deployment with full functionality:

1. **Use Vercel/Netlify** to run both frontend and backend
2. **Set environment variables** in platform settings
3. **Enable caching** to reduce API calls
4. **Monitor API usage** to stay within free tiers

### 🌐 Custom Domain

#### GitHub Pages
1. Add CNAME file to `public/` folder:
   ```
   yourdomain.com
   ```
2. Configure DNS with your provider
3. Enable in Settings → Pages → Custom domain

#### Other Platforms
- Vercel: Settings → Domains
- Netlify: Site settings → Domain management
- Cloudflare: Workers & Pages → Custom domains

---

## 🎉 Your Dashboard is Live!

Once deployed, share your dashboard with the world!

URL format:
- GitHub Pages: `https://username.github.io/repo-name/`
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`
- Cloudflare: `https://your-project.pages.dev`

---

Need help? Check the [README](README.md) or open an issue on GitHub!
