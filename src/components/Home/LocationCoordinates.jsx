import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const LocationCoordinates = () => {
  const [locationName, setLocationName] = useState('San Juan, Puerto Rico');
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCoordinates = async () => {
    if (!locationName.trim()) {
      setError('Please enter a location name');
      return;
    }

    setLoading(true);
    setError('');
    setCoordinates(null);

    try {
      // Using OpenStreetMap Nominatim API (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`,
        {
          headers: {
            'User-Agent': 'Portfolio App' // Required by Nominatim
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        setCoordinates({
          lat: parseFloat(result.lat),
          lon: parseFloat(result.lon),
          displayName: result.display_name
        });
      } else {
        setError('Location not found. Try a more specific location name.');
      }
    } catch (err) {
      setError('Error fetching coordinates: ' + err.message);
      console.error('Geocoding error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.6)', 
      border: '2px solid #ffffff', 
      borderRadius: '5px', 
      padding: '20px',
      marginTop: '20px'
    }}>
      <h5 className="text-white mb-3">Get Location Coordinates</h5>
      
      <Form.Group className="mb-3">
        <Form.Label className="text-white">Location Name</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="e.g., San Juan, Puerto Rico"
            className="admin-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                fetchCoordinates();
              }
            }}
          />
          <Button
            variant="primary"
            className="admin-button"
            onClick={fetchCoordinates}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Coordinates'}
          </Button>
        </div>
      </Form.Group>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {coordinates && (
        <div className="text-white mt-3">
          <Alert variant="success" className="text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '2px solid #ffffff' }}>
            <strong>Location:</strong> {coordinates.displayName}<br />
            <strong>Latitude:</strong> {coordinates.lat.toFixed(6)}<br />
            <strong>Longitude:</strong> {coordinates.lon.toFixed(6)}<br />
            <strong>Google Maps Link:</strong>{' '}
            <a 
              href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', textDecoration: 'underline' }}
            >
              Open in Google Maps
            </a>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default LocationCoordinates;

