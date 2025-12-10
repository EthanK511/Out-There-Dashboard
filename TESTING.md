# Testing & Demo Checklist

## Pre-Demo Setup ✅

- [x] Dependencies installed (`npm install`)
- [x] `.env` file created with API keys
- [x] Proxy server running (port 3001)
- [x] Dev server running (port 5173)
- [x] Browser open to http://localhost:5173

## Feature Testing Checklist

### 1. Widget Display ✓
- [ ] NASA widget shows Astronomy Picture of the Day
- [ ] Weather widget displays with search box
- [ ] News widget shows with topic dropdown
- [ ] SpaceX widget displays (or shows "no launches" message)
- [ ] Bored widget shows random activity
- [ ] Aviation widget displays flight data (or error if no key)

### 2. Drag & Drop ✓
- [ ] Click and drag NASA widget by header bar
- [ ] Drag Weather widget to new position
- [ ] All widgets can be dragged without breaking layout
- [ ] Placeholder shows during drag
- [ ] Widget snaps to grid on release

### 3. Resize Functionality ✓
- [ ] Hover bottom-right corner shows resize handle
- [ ] Drag to resize NASA widget
- [ ] Widget respects minimum size (minW: 3, minH: 2)
- [ ] Content adjusts to new size
- [ ] Other widgets reflow around resized widget

### 4. Sidebar Controls ✓
- [ ] Click "☰ Widgets" button opens sidebar
- [ ] Sidebar slides in from right
- [ ] All 6 widgets listed with checkboxes
- [ ] Toggle NASA widget off → widget disappears
- [ ] Toggle NASA widget on → widget reappears
- [ ] Click overlay closes sidebar
- [ ] Click X button closes sidebar

### 5. Layout Persistence ✓
- [ ] Drag widgets to new positions
- [ ] Refresh page (F5 or Ctrl+R)
- [ ] Layout remains the same
- [ ] Enabled/disabled widgets preserved
- [ ] Weather city search preserved
- [ ] News topic selection preserved

### 6. Refresh Functionality ✓
- [ ] Click "🔄 Refresh" button
- [ ] All widgets show loading state
- [ ] All widgets fetch new data
- [ ] Error widgets (if any) retry fetch

### 7. Auto-Refresh ✓
- [ ] Click "⏱️ Auto-refresh" button
- [ ] Button turns green (active state)
- [ ] Wait 5 minutes → widgets auto-refresh
- [ ] Click again to disable
- [ ] Button returns to normal color

### 8. Reset Functionality ✓
- [ ] Drag widgets to random positions
- [ ] Disable some widgets
- [ ] Click "🔄 Reset" button
- [ ] Layout returns to default grid
- [ ] All widgets re-enabled
- [ ] All widgets refresh data

### 9. Weather Widget ✓
- [ ] Type "New York" in search box
- [ ] Click "Search" button
- [ ] Weather data loads for New York
- [ ] Temperature displays in Celsius
- [ ] Weather icon shows
- [ ] Humidity, wind, visibility displayed
- [ ] Try "Tokyo" → data updates
- [ ] Refresh page → last city remembered

### 10. News Widget ✓
- [ ] Default topic is "technology"
- [ ] 5 news articles displayed
- [ ] Select "science" from dropdown
- [ ] Articles update to science news
- [ ] Click article → opens in new tab
- [ ] Source and date shown for each article

### 11. SpaceX Widget ✓
- [ ] Shows upcoming launches (if any within 30 days)
- [ ] Launch name, date/time displayed
- [ ] Launch details shown (if available)
- [ ] "Watch Live" link visible (if webcast available)
- [ ] Click link → opens YouTube/webcast
- [ ] If no launches: Shows "No launches scheduled" message

### 12. Bored Widget ✓
- [ ] Random activity displayed
- [ ] Type, participants, cost shown
- [ ] Accessibility percentage shown
- [ ] Click "🎲 Get New Activity" button
- [ ] New activity loads
- [ ] Can click multiple times for different activities

### 13. Aviation Widget ✓
- [ ] Best flight displayed (if API key provided)
- [ ] Flight number/code shown
- [ ] Origin and destination airports
- [ ] Live data: altitude, speed, GPS coordinates
- [ ] Aircraft registration shown
- [ ] If no API key: Error message displayed
- [ ] Layout looks clean and organized

### 14. Responsive Design ✓
- [ ] Resize browser to tablet size (768px)
- [ ] Widgets reflow to smaller grid
- [ ] Header controls wrap nicely
- [ ] Sidebar becomes full-width
- [ ] Resize to mobile (480px)
- [ ] All content remains accessible
- [ ] No horizontal scrolling

### 15. Error Handling ✓
- [ ] Stop proxy server
- [ ] Widgets show error messages
- [ ] Error messages are user-friendly
- [ ] Restart proxy → click refresh
- [ ] Widgets recover and load data
- [ ] No console errors in browser

### 16. Loading States ✓
- [ ] Initial load shows "Loading..." for all widgets
- [ ] Refresh shows loading indicators
- [ ] Loading doesn't break layout
- [ ] Loading clears when data arrives

### 17. API Integration ✓
- [ ] NASA widget uses /api/nasa/apod endpoint
- [ ] Weather uses /api/weather?city= endpoint
- [ ] News uses /api/news?topic= endpoint
- [ ] SpaceX uses /api/spacex/launches endpoint
- [ ] Bored uses /api/bored endpoint
- [ ] Aviation uses /api/aviation endpoint

### 18. localStorage ✓
- [ ] Open DevTools → Application → localStorage
- [ ] Verify "dashboardLayouts" key exists
- [ ] Verify "enabledWidgets" key exists
- [ ] Verify "weatherCity" key exists
- [ ] Verify "newsTopic" key exists
- [ ] Clear localStorage
- [ ] Refresh → layout resets to defaults

### 19. Visual Polish ✓
- [ ] Purple gradient background looks good
- [ ] Widget shadows provide depth
- [ ] Header bar gradient is attractive
- [ ] Hover effects work smoothly
- [ ] Colors are consistent
- [ ] Typography is readable
- [ ] Spacing feels balanced

### 20. Performance ✓
- [ ] Page loads quickly (< 2 seconds)
- [ ] Drag/drop is smooth (60fps)
- [ ] Widget updates don't lag
- [ ] No memory leaks after multiple refreshes
- [ ] Browser doesn't freeze or stutter

## Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

## Demo Script

### Opening (30 seconds)
1. Show dashboard with all widgets active
2. Briefly explain the purple gradient design
3. Mention 6 live data sources

### Core Features (2 minutes)
4. **Drag & Drop**: Move NASA widget
5. **Resize**: Make Weather widget larger
6. **Toggle**: Open sidebar, disable SpaceX widget
7. **Refresh**: Click refresh button

### Persistence (30 seconds)
8. Refresh browser page
9. Show layout remained the same
10. Mention localStorage

### Individual Widgets (2 minutes)
11. **Weather**: Search for "Paris"
12. **News**: Change topic to "space"
13. **Bored**: Click "Get New Activity"
14. **Aviation**: Explain heuristic (altitude, speed, etc.)

### Advanced Features (1 minute)
15. Show auto-refresh toggle
16. Show reset button
17. Resize browser to demonstrate responsive design

### Closing (30 seconds)
18. Mention tech stack (React, Vite, Express)
19. Mention modular code structure
20. Show README documentation

Total demo time: ~6 minutes

## Known Issues (To Mention)

✋ **Rate Limits**:
- NASA DEMO_KEY: 30 requests/hour
- Aviation free tier: 100 requests/month
- News API free: Development only

✋ **API Dependencies**:
- Some widgets need API keys to work
- SpaceX widget may show "no launches" if none scheduled
- Aviation might show error without API key

## Quick Fixes

### Widget shows error
```bash
# Check proxy is running
# Terminal 1: npm run start-proxy
```

### Layout not saving
```bash
# Check localStorage is enabled in browser
# Clear cache and try again
```

### Port already in use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
# Restart proxy
npm run start-proxy
```

## Success Criteria

✅ **Demo is successful if**:
- All widgets load data
- Drag & drop works smoothly
- Layout persists after refresh
- Sidebar controls work
- User interactions feel polished
- No console errors
- Responsive design works

## Post-Demo Q&A

**Q: How do I add a new widget?**
A: Create component in `src/components/widgets/`, add to `WIDGET_COMPONENTS` in App.jsx, add endpoint in `proxy/server.js`.

**Q: Can I change the color scheme?**
A: Yes! Edit gradients in `App.css` and `Sidebar.css`.

**Q: How do I deploy this?**
A: See README.md "Deployment" section for Vercel, Netlify, Docker options.

**Q: Is this production-ready?**
A: Yes! Just add real API keys and configure rate limiting.

**Q: Can I add authentication?**
A: Yes, you'd need to add an auth provider (Auth0, Firebase, etc.) and protect routes.

---

**Testing completed by**: _______________
**Date**: _______________
**All checks passed**: ☐ Yes ☐ No
**Notes**: _______________________________________________
