import React from 'react';
import './Sidebar.css';

const WIDGET_INFO = {
  nasa: { name: 'NASA APOD', emoji: '🚀', description: 'Astronomy Picture of the Day' },
  weather: { name: 'Weather', emoji: '🌤️', description: 'Current weather by city' },
  news: { name: 'News', emoji: '📰', description: 'Latest news headlines' },
  spacex: { name: 'SpaceX', emoji: '🛸', description: 'Upcoming launches' },
  bored: { name: 'Bored API', emoji: '🎲', description: 'Random activity ideas' },
  aviation: { name: 'Aviation', emoji: '✈️', description: 'Live flight tracking' },
};

function Sidebar({ isOpen, onClose, widgets, enabledWidgets, onToggleWidget }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Widget Controls</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="sidebar-content">
          <p className="sidebar-description">
            Toggle widgets on/off to customize your dashboard:
          </p>
          <div className="widget-toggles">
            {widgets.map((widgetId) => {
              const info = WIDGET_INFO[widgetId];
              const isEnabled = enabledWidgets.includes(widgetId);
              return (
                <div key={widgetId} className="widget-toggle">
                  <label>
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() => onToggleWidget(widgetId)}
                    />
                    <span className="widget-info">
                      <span className="widget-emoji">{info.emoji}</span>
                      <span>
                        <strong>{info.name}</strong>
                        <small>{info.description}</small>
                      </span>
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
