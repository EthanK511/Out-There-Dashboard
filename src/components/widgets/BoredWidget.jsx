import React, { useState, useEffect } from 'react';
import { fetchBoredActivity } from '../../utils/api';
import './Widget.css';

function BoredWidget({ refreshKey }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadActivity = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchBoredActivity();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivity();
  }, [refreshKey]);

  return (
    <div className="widget">
      <div className="widget-handle">
        🎲 Activity Ideas
      </div>
      <div className="widget-content">
        {loading && <div className="widget-loading">Loading...</div>}
        {error && <div className="widget-error">Error: {error}</div>}
        {data && !loading && !error && (
          <div className="bored-content">
            <div className="bored-activity">
              <h3>{data.activity}</h3>
            </div>
            <div className="bored-details">
              <div className="bored-tag">
                <span className="bored-label">Type:</span>
                <span className="bored-value">{data.type}</span>
              </div>
              <div className="bored-tag">
                <span className="bored-label">Participants:</span>
                <span className="bored-value">{data.participants}</span>
              </div>
              {data.price !== undefined && (
                <div className="bored-tag">
                  <span className="bored-label">Cost:</span>
                  <span className="bored-value">
                    {data.price === 0 ? 'Free' : '💰'.repeat(Math.ceil(data.price * 5))}
                  </span>
                </div>
              )}
              {data.accessibility !== undefined && (
                <div className="bored-tag">
                  <span className="bored-label">Accessibility:</span>
                  <span className="bored-value">
                    {Math.round((1 - data.accessibility) * 100)}%
                  </span>
                </div>
              )}
            </div>
            <button onClick={loadActivity} className="bored-btn">
              🎲 Get New Activity
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoredWidget;
