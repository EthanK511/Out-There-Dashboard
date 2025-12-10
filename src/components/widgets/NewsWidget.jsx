import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../utils/api';
import './Widget.css';

function NewsWidget({ refreshKey }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState(() => localStorage.getItem('newsTopic') || 'technology');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchNews(topic);
        setData(result);
        localStorage.setItem('newsTopic', topic);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [topic, refreshKey]);

  return (
    <div className="widget">
      <div className="widget-handle">
        📰 News
      </div>
      <div className="widget-content">
        <div className="news-controls">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="news-select"
          >
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="space">Space</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
          </select>
        </div>

        {loading && <div className="widget-loading">Loading...</div>}
        {error && <div className="widget-error">Error: {error}</div>}
        {data && !loading && !error && (
          <div className="news-content">
            {data.articles?.slice(0, 5).map((article, idx) => (
              <div key={idx} className="news-item">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h4>{article.title}</h4>
                  <p className="news-source">{article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}</p>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsWidget;
