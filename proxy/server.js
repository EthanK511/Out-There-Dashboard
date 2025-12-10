import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PROXY_PORT || 3001;

app.use(cors());
app.use(express.json());

// NASA APOD endpoint
app.get('/api/nasa/apod', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: process.env.NASA_API_KEY || 'DEMO_KEY',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('NASA API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch NASA APOD' });
  }
});

// OpenWeather endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter required' });
    }
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('OpenWeather API Error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.message || 'Failed to fetch weather data' 
    });
  }
});

// News API endpoint
app.get('/api/news', async (req, res) => {
  try {
    const { topic = 'technology' } = req.query;
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: topic,
        apiKey: process.env.NEWS_API_KEY,
        pageSize: 5,
        sortBy: 'publishedAt',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('News API Error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.message || 'Failed to fetch news' 
    });
  }
});

// SpaceX launches endpoint
app.get('/api/spacex/launches', async (req, res) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/launches/upcoming');
    res.json(response.data);
  } catch (error) {
    console.error('SpaceX API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch SpaceX launches' });
  }
});

// Bored API endpoint
app.get('/api/bored', async (req, res) => {
  try {
    const response = await axios.get('https://www.boredapi.com/api/activity');
    res.json(response.data);
  } catch (error) {
    console.error('Bored API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Aviation endpoint with heuristic
app.get('/api/aviation', async (req, res) => {
  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.AVIATION_API_KEY,
        flight_status: 'active',
        limit: 100,
      },
    });

    // Heuristic: Select the most "viewable" flight
    // Criteria: altitude between 5000-12000m, speed > 200 km/h, has both origin and destination
    const flights = response.data.data || [];
    
    const scoreFlight = (flight) => {
      let score = 0;
      const alt = flight.live?.altitude || 0;
      const speed = flight.live?.speed_horizontal || 0;
      
      // Prefer mid-altitude flights (more visible)
      if (alt >= 5000 && alt <= 12000) score += 50;
      else if (alt > 0) score += 20;
      
      // Prefer faster flights (commercial jets)
      if (speed > 200) score += 30;
      
      // Has complete route info
      if (flight.departure?.airport && flight.arrival?.airport) score += 20;
      
      // Has airline name
      if (flight.airline?.name) score += 10;
      
      return score;
    };

    const bestFlight = flights.reduce((best, current) => {
      const currentScore = scoreFlight(current);
      const bestScore = best ? scoreFlight(best) : 0;
      return currentScore > bestScore ? current : best;
    }, null);

    res.json(bestFlight || { error: 'No suitable flights found' });
  } catch (error) {
    console.error('Aviation API Error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.message || 'Failed to fetch flight data' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log('API endpoints available:');
  console.log('  - /api/nasa/apod');
  console.log('  - /api/weather?city=<city>');
  console.log('  - /api/news?topic=<topic>');
  console.log('  - /api/spacex/launches');
  console.log('  - /api/bored');
  console.log('  - /api/aviation');
});
