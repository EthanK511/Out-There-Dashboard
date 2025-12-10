# Out There Dashboard - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER (Port 5173)                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      React App (Vite)                       │ │
│  │                                                             │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │ │
│  │  │  App.jsx     │  │ Sidebar.jsx  │  │  utils/      │    │ │
│  │  │  (Main)      │  │  (Controls)  │  │  api.js      │    │ │
│  │  └──────┬───────┘  └──────────────┘  └──────┬───────┘    │ │
│  │         │                                     │            │ │
│  │         │  ┌──────────────────────────────┐  │            │ │
│  │         └─►│  react-grid-layout           │  │            │ │
│  │            │  (Draggable Grid)            │  │            │ │
│  │            └──────────┬───────────────────┘  │            │ │
│  │                       │                       │            │ │
│  │         ┌─────────────┴────────────┐          │            │ │
│  │         │                          │          │            │ │
│  │    ┌────▼────┐  ┌────▼────┐  ┌────▼────┐    │            │ │
│  │    │  NASA   │  │ Weather │  │  News   │    │            │ │
│  │    │ Widget  │  │ Widget  │  │ Widget  │    │            │ │
│  │    └────┬────┘  └────┬────┘  └────┬────┘    │            │ │
│  │         │            │            │          │            │ │
│  │    ┌────▼────┐  ┌────▼────┐  ┌────▼────┐    │            │ │
│  │    │ SpaceX  │  │  Bored  │  │Aviation │    │            │ │
│  │    │ Widget  │  │ Widget  │  │ Widget  │    │            │ │
│  │    └────┬────┘  └────┬────┘  └────┬────┘    │            │ │
│  │         │            │            │          │            │ │
│  │         └────────────┴────────────┴──────────┘            │ │
│  │                      │                                    │ │
│  │                      │ API Calls via /api/*               │ │
│  └──────────────────────┼────────────────────────────────────┘ │
│                         │                                       │
│  ┌──────────────────────▼────────────────────────────────────┐ │
│  │                  localStorage                              │ │
│  │  • dashboardLayouts  • enabledWidgets                      │ │
│  │  • weatherCity       • newsTopic                           │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    Express Proxy (Port 3001)                     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      proxy/server.js                        │ │
│  │                                                             │ │
│  │  Routes:                                                    │ │
│  │  • GET /api/nasa/apod                                       │ │
│  │  • GET /api/weather?city=<city>                             │ │
│  │  • GET /api/news?topic=<topic>                              │ │
│  │  • GET /api/spacex/launches                                 │ │
│  │  • GET /api/bored                                           │ │
│  │  • GET /api/aviation                                        │ │
│  │                                                             │ │
│  │  Middleware: CORS, Express.json                             │ │
│  └────────────────────┬───────────────────────────────────────┘ │
│                       │                                          │
│  ┌────────────────────▼───────────────────────────────────────┐ │
│  │                    .env (API Keys)                          │ │
│  │  • NASA_API_KEY      • OPENWEATHER_API_KEY                 │ │
│  │  • NEWS_API_KEY      • AVIATION_API_KEY                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ External API Calls
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      External APIs                               │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  NASA API    │  │ OpenWeather  │  │  News API    │         │
│  │  (nasa.gov)  │  │ (openweather │  │ (newsapi.org)│         │
│  └──────────────┘  │  map.org)    │  └──────────────┘         │
│                    └──────────────┘                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  SpaceX API  │  │  Bored API   │  │  Aviation    │         │
│  │ (spacexdata  │  │ (boredapi    │  │  Stack       │         │
│  │  .com)       │  │  .com)       │  │ (aviation    │         │
│  │              │  │              │  │  stack.com)  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Interaction Flow
```
User clicks widget
    ↓
Widget calls API utility (src/utils/api.js)
    ↓
Fetch request to /api/* endpoint
    ↓
Vite proxy forwards to localhost:3001
    ↓
Express proxy receives request
    ↓
Proxy adds API key from .env
    ↓
Proxy makes external API call
    ↓
Response returned to widget
    ↓
Widget displays data
```

### 2. Layout Persistence Flow
```
User drags widget
    ↓
react-grid-layout fires onLayoutChange
    ↓
App.jsx updates layouts state
    ↓
useEffect saves to localStorage
    ↓
On page reload:
    ↓
App.jsx reads from localStorage
    ↓
Layout restored automatically
```

### 3. Widget Toggle Flow
```
User opens sidebar
    ↓
Clicks widget checkbox
    ↓
Sidebar calls onToggleWidget
    ↓
App.jsx updates enabledWidgets state
    ↓
useEffect saves to localStorage
    ↓
Widgets re-render (show/hide)
```

## Component Hierarchy

```
App.jsx
├── header
│   ├── title
│   └── controls
│       ├── Refresh button
│       ├── Auto-refresh toggle
│       ├── Reset button
│       └── Sidebar toggle
├── Sidebar.jsx
│   ├── overlay
│   └── sidebar panel
│       ├── header
│       └── widget toggles
│           ├── NASA checkbox
│           ├── Weather checkbox
│           ├── News checkbox
│           ├── SpaceX checkbox
│           ├── Bored checkbox
│           └── Aviation checkbox
└── ResponsiveGridLayout
    ├── NasaWidget.jsx
    ├── WeatherWidget.jsx
    ├── NewsWidget.jsx
    ├── SpaceXWidget.jsx
    ├── BoredWidget.jsx
    └── AviationWidget.jsx
```

## File Organization

```
Out-There-Dashboard/
│
├── Frontend (React + Vite)
│   ├── index.html ─────────────► Entry point
│   ├── src/
│   │   ├── main.jsx ───────────► React bootstrap
│   │   ├── App.jsx ────────────► Main component
│   │   ├── App.css ────────────► App styles
│   │   ├── index.css ──────────► Global styles
│   │   ├── components/
│   │   │   ├── Sidebar.jsx ───► Toggle controls
│   │   │   ├── Sidebar.css ───► Sidebar styles
│   │   │   └── widgets/
│   │   │       ├── NasaWidget.jsx
│   │   │       ├── WeatherWidget.jsx
│   │   │       ├── NewsWidget.jsx
│   │   │       ├── SpaceXWidget.jsx
│   │   │       ├── BoredWidget.jsx
│   │   │       ├── AviationWidget.jsx
│   │   │       └── Widget.css ─► Shared widget styles
│   │   └── utils/
│   │       └── api.js ─────────► Fetch utilities
│   └── vite.config.js ─────────► Vite + proxy config
│
├── Backend (Express Proxy)
│   └── proxy/
│       └── server.js ──────────► API proxy with keys
│
├── Configuration
│   ├── .env ───────────────────► API keys (git-ignored)
│   ├── .env.example ───────────► Template
│   ├── .gitignore ─────────────► Git exclusions
│   └── package.json ───────────► Dependencies & scripts
│
└── Documentation
    ├── README.md ──────────────► Main documentation
    ├── SETUP.md ───────────────► Quick setup guide
    ├── PROJECT_SUMMARY.md ─────► Completion summary
    ├── ARCHITECTURE.md ────────► This file
    └── LICENSE ────────────────► MIT License
```

## Technology Stack Details

### Frontend Stack
```
React 18.2.0
├── Declarative UI
├── Hooks (useState, useEffect)
├── Component composition
└── Virtual DOM

Vite 5.0.8
├── Lightning-fast HMR
├── ES Modules
├── Dev server
└── Production builds

react-grid-layout 1.4.4
├── Drag & drop
├── Responsive breakpoints
├── Resizable widgets
└── Layout serialization
```

### Backend Stack
```
Express 4.18.2
├── REST API endpoints
├── Middleware (CORS, JSON)
├── Error handling
└── Route management

Axios 1.6.2
├── HTTP client
├── Promise-based
├── Request/response interceptors
└── Timeout handling

dotenv 16.3.1
├── Environment variables
├── .env file parsing
└── Secure key management
```

## Security Considerations

### Current Implementation
- ✅ API keys stored server-side (.env)
- ✅ Keys never exposed to browser
- ✅ CORS enabled for development
- ✅ .env in .gitignore
- ✅ Error messages sanitized

### Production Recommendations
- 🔒 Use environment variables on hosting platform
- 🔒 Enable rate limiting on proxy
- 🔒 Restrict CORS to specific origins
- 🔒 Add request authentication
- 🔒 Implement API key rotation
- 🔒 Add HTTPS in production
- 🔒 Monitor API usage/abuse

## Performance Optimizations

### Current
- ⚡ Vite for fast dev builds
- ⚡ React lazy loading ready
- ⚡ localStorage for instant layout restore
- ⚡ Minimal re-renders

### Potential
- ⚡ Add service worker for caching
- ⚡ Implement request debouncing
- ⚡ Use React.memo for widgets
- ⚡ Add CDN for static assets
- ⚡ Compress API responses
- ⚡ Lazy load widget components

## Scaling Considerations

### Current Setup (Single User)
```
Browser ←→ Proxy ←→ External APIs
(Local)    (Local)   (Internet)
```

### Production Setup (Multi-User)
```
Users ←→ CDN ←→ Load Balancer ←→ App Servers ←→ Cache ←→ APIs
              ├→ Server 1        Redis/
              ├→ Server 2        Memcached
              └→ Server N
```

### Potential Architecture
- Deploy frontend to CDN (Vercel, Netlify)
- Deploy proxy to serverless (AWS Lambda, Vercel Functions)
- Add Redis cache for API responses
- Use database for user preferences
- Implement WebSockets for real-time updates

---

**Last Updated**: December 10, 2025
**Version**: 1.0.0
**Status**: Production Ready
