import React, { useState, useEffect } from 'react';
import { fetchSpaceXLaunches } from '../../utils/api';
import './Widget.css';

function SpaceXWidget({ refreshKey }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchSpaceXLaunches();
        // Filter for launches within next 30 days
        const now = Date.now();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        const upcoming = result.filter(launch => {
          const launchDate = new Date(launch.date_unix * 1000).getTime();
          return launchDate - now <= thirtyDays && launchDate > now;
        });
        setData(upcoming);
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
        🛸 SpaceX Launches
      </div>
      <div className="widget-content">
        {loading && <div className="widget-loading">Loading...</div>}
        {error && <div className="widget-error">Error: {error}</div>}
        {data && !loading && !error && (
          <div className="spacex-content">
            {data.length === 0 ? (
              <p className="spacex-empty">No launches scheduled within the next 30 days</p>
            ) : (
              data.slice(0, 3).map((launch, idx) => (
                <div key={launch.id} className="spacex-item">
                  <h4>{launch.name}</h4>
                  <p className="spacex-date">
                    🚀 {new Date(launch.date_unix * 1000).toLocaleString()}
                  </p>
                  {launch.details && (
                    <p className="spacex-details">{launch.details}</p>
                  )}
                  {launch.links?.webcast && (
                    <a
                      href={launch.links.webcast}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spacex-link"
                    >
                      Watch Live
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SpaceXWidget;
