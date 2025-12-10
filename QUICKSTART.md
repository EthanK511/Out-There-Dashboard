# 🎯 Quick Setup Guide

This guide will help you set up the Out There Dashboard in under 5 minutes!

## Step 1: Get Your API Keys (2 minutes)

All API keys go in **ONE FILE**: `.env`

### 🚀 NASA API (30 seconds)
1. Visit: https://api.nasa.gov/
2. Fill in name and email
3. Copy the API key
4. Or just use `DEMO_KEY` (limited to 30 requests/hour)

### 🌤️ OpenWeather API (1 minute)
1. Visit: https://openweathermap.org/api
2. Click "Get API Key" or "Sign Up"
3. Verify email
4. Copy API key from dashboard

### 📰 News API (1 minute)
1. Visit: https://newsapi.org/
2. Click "Get API Key"
3. Fill in details
4. Copy API key from email or dashboard

### ✈️ Aviation Stack API (30 seconds)
1. Visit: https://aviationstack.com/
2. Click "Get Free API Access"
3. Sign up with email
4. Copy API key from dashboard

## Step 2: Configure the Dashboard (1 minute)

1. **Copy the example environment file**
   ```bash
   cp .env.example .env
   ```

2. **Open `.env` and paste your keys**
   ```env
   NASA_API_KEY=your_nasa_key_here
   OPENWEATHER_API_KEY=your_openweather_key_here
   NEWS_API_KEY=your_newsapi_key_here
   AVIATION_API_KEY=your_aviationstack_key_here
   PROXY_PORT=3001
   ```

That's it! All configuration is in this single file.

## Step 3: Run the Dashboard (30 seconds)

1. **Start the proxy server** (Terminal 1)
   ```bash
   npm run start-proxy
   ```

2. **Start the frontend** (Terminal 2)
   ```bash
   npm run dev
   ```

3. **Open your browser**
   - Go to: http://localhost:5173
   - 🎉 You're done!

## 🎨 Using the Dashboard

### Basic Controls
- **Drag widgets**: Click and hold the header bar
- **Resize widgets**: Drag the bottom-right corner
- **Toggle widgets**: Click "☰ Widgets" button in header
- **Refresh data**: Click "🔄 Refresh" button
- **Auto-refresh**: Click "⏱️ Auto-refresh" button
- **Reset layout**: Click "🔄 Reset" button

### Widget-Specific Features

#### 🌤️ Weather Widget
- Type any city name
- Press Enter or click "Search"
- Shows temperature, humidity, wind, visibility

#### 📰 News Widget
- Use dropdown to change topic
- Topics: Technology, Science, Space, Business, Health
- Clickable headlines open in new tab

#### 🎲 Bored Widget
- Click "🎲 Get New Activity" for suggestions
- Shows activity type, participants, cost, accessibility

### Layout Persistence
- Your layout is automatically saved
- Widgets stay where you place them
- Settings persist across browser sessions

## 🚀 Deployment to GitHub Pages

1. **Enable GitHub Pages**
   - Repository Settings → Pages
   - Source: "GitHub Actions"

2. **Push your code**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

3. **Wait for deployment** (~2 minutes)
   - Check Actions tab for progress
   - Once complete, visit: `https://yourusername.github.io/Out-There-Dashboard/`

## 🆘 Troubleshooting

### Proxy server won't start
- Check if port 3001 is already in use
- Change `PROXY_PORT` in `.env`

### Widget shows error
- Check API key is correct in `.env`
- Verify API key is active on provider's dashboard
- Check rate limits haven't been exceeded

### Layout reset after refresh
- Check browser localStorage is enabled
- Disable incognito/private browsing mode

### Build fails for GitHub Pages
- Ensure `base` in `vite.config.js` matches your repo name
- Check all dependencies are in `package.json`

## 📊 API Usage Tips

### Minimize API Calls
- Don't refresh too frequently
- Use auto-refresh (every 5 minutes) instead of manual
- Disable widgets you don't use

### Free Tier Limits
- **NASA DEMO_KEY**: 30/hour → Get free key for unlimited
- **OpenWeather**: 1000/day → Plenty for personal use
- **News API**: 100/day → Use sparingly in dev mode
- **Aviation Stack**: 100/month → ~3 calls per day

### Upgrade When Needed
All APIs offer paid tiers if you exceed free limits.

## 🎉 You're All Set!

Enjoy your personalized dashboard! Customize it, share it, and make it your own.

---

Need help? Open an issue on GitHub!
