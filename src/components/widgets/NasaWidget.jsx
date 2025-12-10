import React, { useState, useEffect } from 'react';
import { fetchNasaApod } from '../../utils/api';
import './Widget.css';

function NasaWidget({ refreshKey }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchNasaApod();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [refreshKey]);

  return (
    <div className="widget">
      <div className="widget-handle">
        🚀 NASA APOD
      </div>
      <div className="widget-content">
        {loading && <div className="widget-loading">Loading...</div>}
        {error && <div className="widget-error">Error: {error}</div>}
        {data && !loading && !error && (
          <div className="nasa-content">
            <h3>{data.title}</h3>
            {data.media_type === 'image' ? (
              <img src={data.url} alt={data.title} className="nasa-image" />
            ) : (
              <iframe src={data.url} title={data.title} className="nasa-video" />
            )}
            <p className="nasa-date">{data.date}</p>
            <p className="nasa-explanation">{data.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NasaWidget;
