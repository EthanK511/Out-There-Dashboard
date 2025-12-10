/**
 * Shared fetch utility for all widgets
 * Handles API calls through the proxy server
 */

const API_BASE = '/api';

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

// NASA APOD
export const fetchNasaApod = () => fetchData('/nasa/apod');

// OpenWeather
export const fetchWeather = (city) => fetchData(`/weather?city=${encodeURIComponent(city)}`);

// News API
export const fetchNews = (topic = 'technology') => fetchData(`/news?topic=${encodeURIComponent(topic)}`);

// SpaceX
export const fetchSpaceXLaunches = () => fetchData('/spacex/launches');

// Bored API
export const fetchBoredActivity = () => fetchData('/bored');

// Aviation
export const fetchAviation = () => fetchData('/aviation');
