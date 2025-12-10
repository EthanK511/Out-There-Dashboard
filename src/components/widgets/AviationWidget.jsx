import React, { useState, useEffect } from 'react';
import { fetchAviation } from '../../utils/api';
import './Widget.css';

function AviationWidget({ refreshKey }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchAviation();
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
        ✈️ Live Flight
      </div>
      <div className="widget-content">
        {loading && <div className="widget-loading">Loading...</div>}
        {error && <div className="widget-error">Error: {error}</div>}
        {data && !loading && !error && (
          <div className="aviation-content">
            {data.error ? (
              <p className="aviation-empty">{data.error}</p>
            ) : (
              <>
                <div className="aviation-header">
                  <h3>{data.airline?.name || 'Unknown Airline'}</h3>
                  <div className="aviation-flight-number">
                    {data.flight?.iata || data.flight?.icao || 'N/A'}
                  </div>
                </div>
                
                <div className="aviation-route">
                  <div className="aviation-airport">
                    <div className="aviation-code">{data.departure?.iata || 'N/A'}</div>
                    <div className="aviation-city">{data.departure?.airport || 'Unknown'}</div>
                  </div>
                  <div className="aviation-arrow">✈️</div>
                  <div className="aviation-airport">
                    <div className="aviation-code">{data.arrival?.iata || 'N/A'}</div>
                    <div className="aviation-city">{data.arrival?.airport || 'Unknown'}</div>
                  </div>
                </div>

                {data.live && (
                  <div className="aviation-live">
                    <h4>Live Data</h4>
                    <div className="aviation-stats">
                      {data.live.altitude && (
                        <div className="aviation-stat">
                          <span>Altitude:</span>
                          <strong>{data.live.altitude}m</strong>
                        </div>
                      )}
                      {data.live.speed_horizontal && (
                        <div className="aviation-stat">
                          <span>Speed:</span>
                          <strong>{data.live.speed_horizontal} km/h</strong>
                        </div>
                      )}
                      {data.live.latitude && data.live.longitude && (
                        <div className="aviation-stat">
                          <span>Position:</span>
                          <strong>{data.live.latitude.toFixed(2)}°, {data.live.longitude.toFixed(2)}°</strong>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {data.aircraft && (
                  <div className="aviation-aircraft">
                    <strong>Aircraft:</strong> {data.aircraft.registration || 'N/A'}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AviationWidget;
