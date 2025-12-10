import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Sidebar from './components/Sidebar';
import NasaWidget from './components/widgets/NasaWidget';
import WeatherWidget from './components/widgets/WeatherWidget';
import NewsWidget from './components/widgets/NewsWidget';
import SpaceXWidget from './components/widgets/SpaceXWidget';
import BoredWidget from './components/widgets/BoredWidget';
import AviationWidget from './components/widgets/AviationWidget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const WIDGET_COMPONENTS = {
  nasa: NasaWidget,
  weather: WeatherWidget,
  news: NewsWidget,
  spacex: SpaceXWidget,
  bored: BoredWidget,
  aviation: AviationWidget,
};

const DEFAULT_LAYOUTS = {
  lg: [
    { i: 'nasa', x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
    { i: 'weather', x: 4, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
    { i: 'news', x: 8, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
    { i: 'spacex', x: 0, y: 2, w: 4, h: 2, minW: 3, minH: 2 },
    { i: 'bored', x: 4, y: 2, w: 4, h: 2, minW: 3, minH: 2 },
    { i: 'aviation', x: 8, y: 2, w: 4, h: 2, minW: 3, minH: 2 },
  ],
};

function App() {
  const [layouts, setLayouts] = useState(() => {
    const saved = localStorage.getItem('dashboardLayouts');
    return saved ? JSON.parse(saved) : DEFAULT_LAYOUTS;
  });

  const [enabledWidgets, setEnabledWidgets] = useState(() => {
    const saved = localStorage.getItem('enabledWidgets');
    return saved ? JSON.parse(saved) : Object.keys(WIDGET_COMPONENTS);
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Save layouts to localStorage
  useEffect(() => {
    localStorage.setItem('dashboardLayouts', JSON.stringify(layouts));
  }, [layouts]);

  // Save enabled widgets to localStorage
  useEffect(() => {
    localStorage.setItem('enabledWidgets', JSON.stringify(enabledWidgets));
  }, [enabledWidgets]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setRefreshKey((prev) => prev + 1);
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleLayoutChange = (layout, allLayouts) => {
    setLayouts(allLayouts);
  };

  const toggleWidget = (widgetId) => {
    setEnabledWidgets((prev) =>
      prev.includes(widgetId)
        ? prev.filter((id) => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleReset = () => {
    setLayouts(DEFAULT_LAYOUTS);
    setEnabledWidgets(Object.keys(WIDGET_COMPONENTS));
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌌 Out There Dashboard</h1>
        <div className="header-controls">
          <button
            className="control-btn"
            onClick={handleRefresh}
            title="Refresh all widgets"
          >
            🔄 Refresh
          </button>
          <button
            className={`control-btn ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
            title="Toggle auto-refresh (every 5 minutes)"
          >
            ⏱️ Auto-refresh
          </button>
          <button
            className="control-btn"
            onClick={handleReset}
            title="Reset layout and widgets"
          >
            🔄 Reset
          </button>
          <button
            className="control-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle sidebar"
          >
            ☰ Widgets
          </button>
        </div>
      </header>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        widgets={Object.keys(WIDGET_COMPONENTS)}
        enabledWidgets={enabledWidgets}
        onToggleWidget={toggleWidget}
      />

      <main className="app-main">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={150}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".widget-handle"
        >
          {enabledWidgets.map((widgetId) => {
            const WidgetComponent = WIDGET_COMPONENTS[widgetId];
            return (
              <div key={widgetId}>
                <WidgetComponent refreshKey={refreshKey} />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </main>
    </div>
  );
}

export default App;
