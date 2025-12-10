# 🌌 Out There Dashboard

A polished, user-configurable dashboard that aggregates live public API data into draggable, toggleable widgets. Built with React + Vite and designed for real-time updates with persistent user layouts.

![Dashboard Preview](https://img.shields.io/badge/Status-Production-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### Core Widgets
- **🚀 NASA APOD**: Astronomy Picture of the Day with descriptions
- **🌤️ OpenWeather**: Current weather with city search
- **📰 News**: Latest headlines by topic (technology, science, space, business, health)
- **🛸 SpaceX**: Upcoming launches within 30 days
- **🎲 Bored API**: Random activity suggestions
- **✈️ Aviation**: Live flight tracking with intelligent flight selection heuristic

### User Experience
- **Draggable & Resizable**: Widgets can be moved and resized via `react-grid-layout`
- **Toggleable Widgets**: Enable/disable widgets through sidebar controls
- **Persistent Layout**: All layout changes and preferences saved to localStorage
- **Manual & Auto-Refresh**: Refresh all widgets on demand or enable 5-minute auto-refresh
- **Responsive Design**: Mobile-friendly layout that adapts to screen size
- **Modern Dark UI**: Beautiful glassmorphic design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EthanK511/Out-There-Dashboard.git
   cd Out-There-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API keys** (Single file setup!)
   ```bash
   cp .env.example .env
   ```
   
   Open `.env` and paste all your API keys in one place:
   ```env
   # ========================================
   # Out There Dashboard - API Configuration
   # ========================================
   # Get your API keys from the links below and paste them here:
   
   # NASA: https://api.nasa.gov/
   NASA_API_KEY=DEMO_KEY
   
   # OpenWeather: https://openweathermap.org/api
   OPENWEATHER_API_KEY=your_key_here
   
   # News API: https://newsapi.org/
   NEWS_API_KEY=your_key_here
   
   # Aviation Stack: https://aviationstack.com/
   AVIATION_API_KEY=your_key_here
   
   PROXY_PORT=3001
   ```

4. **Start the application**
   
   **Option A: Run both servers** (Recommended)
   ```bash
   # Terminal 1
   npm run start-proxy
   
   # Terminal 2 (in a new terminal)
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 API Key Setup

All API keys are configured in a **single `.env` file**! Just copy `.env.example` to `.env` and fill in your keys.

### Quick Setup Guide

| API | Free Tier | Sign Up Link | Required For |
|-----|-----------|--------------|--------------|
| 🚀 NASA | ✅ Unlimited with key | [Get Key](https://api.nasa.gov/) | NASA Widget |
| 🌤️ OpenWeather | ✅ 60 calls/min | [Sign Up](https://openweathermap.org/api) | Weather Widget |
| 📰 News API | ✅ 100 calls/day | [Sign Up](https://newsapi.org/) | News Widget |
| ✈️ Aviation Stack | ✅ 100 calls/month | [Sign Up](https://aviationstack.com/) | Aviation Widget |
| 🛸 SpaceX | ✅ No key needed | - | SpaceX Widget |
| 🎲 Bored API | ✅ No key needed | - | Bored Widget |

### Rate Limits

⚠️ **Important**: Free tier rate limits apply:
- **NASA DEMO_KEY**: 30 requests/hour (get a free key for unlimited)
- **OpenWeather**: 60 calls/minute, 1000 calls/day
- **News API**: 100 requests/day (development only)
- **Aviation Stack**: 100 requests/month

💡 **Tip**: The proxy server caches some requests to minimize API calls.

## 🌐 Deployment

### GitHub Pages (Recommended)

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages section
   - Source: GitHub Actions

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy dashboard"
   git push origin main
   ```

3. **Automatic deployment**
   - GitHub Actions will automatically build and deploy
   - Visit: `https://<username>.github.io/Out-There-Dashboard/`

### Manual Build

```bash
npm run build
npm run preview
```

### Deploy with gh-pages

```bash
npm run deploy
```

## 📁 Project Structure

```
Out-There-Dashboard/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Widget toggle controls
│   │   ├── Sidebar.css
│   │   └── widgets/
│   │       ├── NasaWidget.jsx
│   │       ├── WeatherWidget.jsx
│   │       ├── NewsWidget.jsx
│   │       ├── SpaceXWidget.jsx
│   │       ├── BoredWidget.jsx
│   │       ├── AviationWidget.jsx
│   │       └── Widget.css       # Shared widget styles
│   ├── utils/
│   │   └── api.js               # Centralized API calls
│   ├── App.jsx                  # Main app with grid layout
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── proxy/
│   └── server.js                # Express proxy for API keys
├── .env.example                 # API key template (SINGLE FILE!)
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages deployment
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 UI Features

- **Glassmorphic Design**: Modern frosted glass effect with backdrop blur
- **Dark Theme**: Easy on the eyes with vibrant accent colors
- **Smooth Animations**: Buttery transitions and hover effects
- **Gradient Accents**: Beautiful purple-blue-pink gradients
- **Custom Scrollbars**: Themed scrollbars that match the design
- **Responsive Layout**: Works beautifully on mobile, tablet, and desktop

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run start-proxy  # Start Express proxy server (port 3001)
npm run deploy       # Build and deploy to GitHub Pages
```

### Tech Stack

- **Frontend**: React 18, Vite 5
- **Layout**: react-grid-layout (draggable/resizable)
- **Backend**: Express.js (proxy server)
- **Styling**: Pure CSS with CSS Variables
- **State**: React Hooks + localStorage

### Adding New Widgets

1. Create widget component in `src/components/widgets/`
2. Import in `App.jsx` and add to `WIDGET_COMPONENTS`
3. Add default layout in `DEFAULT_LAYOUTS`
4. Add widget info in `Sidebar.jsx`
5. Add API endpoint in `proxy/server.js` (if needed)
6. Add API helper in `src/utils/api.js`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- News API free tier doesn't work in production (only localhost)
- Aviation Stack has very limited free tier (100 calls/month)
- Some widgets may show errors if API keys are not configured

## 💡 Tips

- Enable auto-refresh for live updates every 5 minutes
- Drag widgets by their header to rearrange
- Resize widgets by dragging the bottom-right corner
- Use the sidebar to toggle widgets on/off
- Your layout is automatically saved to localStorage
- Click "Reset" to restore default layout

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions

---

Made with 💜 by [EthanK511](https://github.com/EthanK511)
