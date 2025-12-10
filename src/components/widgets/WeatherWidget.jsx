import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../../utils/api';
import './Widget.css';

function WeatherWidget({ refreshKey }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(() => localStorage.getItem('weatherCity') || 'London');
  const [inputCity, setInputCity] = useState(city);

  useEffect(() => {
    const loadData = async () => {
      if (!city) return;
      setLoading(true);
      setError(null);
      try {
        const result = await fetchWeather(city);
        setData(result);
        localStorage.setItem('weatherCity', city);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [city, refreshKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  return (
    <div className="widget">
      <div className="widget-handle">
        🌤️ Weather
      </div>
      <div className="widget-content">
        <form onSubmit={handleSubmit} className="weather-form">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city name"
            className="weather-input"
          />
          <button type="submit" className="weather-btn">Search</button>
        </form>
        
        {loading && <div className="widget-loading">Loading...</div>}
        {error && <div className="widget-error">Error: {error}</div>}
        {data && !loading && !error && (
          <div className="weather-content">
            <h3>{data.name}, {data.sys?.country}</h3>
            <div className="weather-main">
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`}
                alt={data.weather[0]?.description}
                className="weather-icon"
              />
              <div className="weather-temp">{Math.round(data.main?.temp)}°C</div>
            </div>
            <p className="weather-description">{data.weather[0]?.description}</p>
            <div className="weather-details">
              <div>💧 Humidity: {data.main?.humidity}%</div>
              <div>💨 Wind: {data.wind?.speed} m/s</div>
              <div>👁️ Visibility: {(data.visibility / 1000).toFixed(1)} km</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherWidget;
