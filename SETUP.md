# Quick Setup Guide

## Rapid Setup (3 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add your API keys (or use defaults for testing):
- NASA: Use `DEMO_KEY` (works out of the box)
- SpaceX: No key needed (public API)
- Bored: No key needed (public API)
- OpenWeather: Get free key at https://openweathermap.org/api
- News API: Get free key at https://newsapi.org/
- Aviation: Get free key at https://aviationstack.com/

### 3. Start Servers

**Terminal 1** (Proxy Server):
```bash
npm run start-proxy
```

**Terminal 2** (Development Server):
```bash
npm run dev
```

### 4. Open Dashboard
Navigate to: http://localhost:5173

## Quick Demo Actions

1. **Drag widgets**: Click and hold the colored header bar
2. **Resize widgets**: Drag from bottom-right corner
3. **Toggle widgets**: Click "☰ Widgets" button
4. **Search weather**: Enter any city name
5. **Change news topic**: Select from dropdown
6. **Refresh all**: Click "🔄 Refresh" button
7. **Enable auto-refresh**: Click "⏱️ Auto-refresh"
8. **Reset layout**: Click "🔄 Reset"

## Troubleshooting

### Proxy won't start
- Make sure port 3001 is available
- Check if `.env` file exists

### Widget shows error
- Check if proxy server is running
- Verify API keys in `.env`
- Check browser console for details

### Layout not saving
- Check localStorage is enabled
- Try hard refresh (Ctrl+Shift+R)

## API Key Priority

**Must have** (for full experience):
1. OpenWeather (for Weather widget)
2. News API (for News widget)
3. Aviation Stack (for Aviation widget)

**Optional** (works without keys):
- NASA (DEMO_KEY works fine)
- SpaceX (public API)
- Bored (public API)

## Production Deployment Checklist

- [ ] Get production API keys
- [ ] Set environment variables in hosting platform
- [ ] Update CORS settings in proxy
- [ ] Build frontend: `npm run build`
- [ ] Deploy proxy server
- [ ] Update API endpoints if needed
- [ ] Test all widgets
- [ ] Monitor rate limits

## Support

Found an issue? Open an issue on GitHub!
