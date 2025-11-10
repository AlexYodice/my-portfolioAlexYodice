import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { supabase, isSupabaseConfigured } from "../../supabaseClient";

const About = () => {
  const [bioText, setBioText] = useState('');
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    // Default fallback bio
    const defaultBio = `I'm Alex, a <span class="yellow">5th year Computer Engineer student </span>
from <span class="yellow"> Puerto Rico.</span>
<br />
<br />
I'm graduating soon and have experience in full-stack development, with a focus on web technologies and projects involving <b class="yellow">HTML, CSS, JavaScript</b> and <b class="yellow">Google Maps API.</b>
<br />
<br />
I am proficient in 
<b class="yellow"> JavaScript </b> and have a solid foundation in languages like C, Python, SQL,
<b class="yellow"> GraphQL, and more.</b>
<br />
<br />
I enjoy working with
<b class="yellow"> Node.js, React.js,</b> and backend technologies like
<b class="yellow"> MongoDB.</b> 
<br />
<br />
I'm also passionate about <b class="yellow">web development, artificial intelligence,</b>
and continuously learning to expand my skillset.
<br />
<br />
In my spare time, I enjoy practicing coding challenges on <b class="yellow">LeetCode</b> and working on projects that push me out of my comfort zone.`;

    // If Supabase is not configured, use fallback bio immediately
    if (!isSupabaseConfigured) {
      setBioText(defaultBio);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profile')
        .select('bio_text')
        .order('updated_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setBioText(data[0].bio_text);
      } else {
        // Fallback to default bio if database is empty
        setBioText(defaultBio);
      }
    } catch (err) {
      // Only log errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching bio:', err);
      }
      // Fallback to default bio on error
      setBioText(defaultBio);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoordinates = async () => {
    if (!address.trim()) {
      setGeoError('Please enter a street address');
      return;
    }

    setGeoLoading(true);
    setGeoError('');
    setCoordinates(null);

    try {
      // Using OpenStreetMap Nominatim API (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
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
        setGeoError('Address not found. Try a more specific address.');
      }
    } catch (err) {
      setGeoError('Error fetching coordinates: ' + err.message);
      console.error('Geocoding error:', err);
    } finally {
      setGeoLoading(false);
    }
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="yellow"> INTRODUCE </span> MYSELF
            </h1>
            {loading ? (
              <p className="home-about-body">Loading...</p>
            ) : (
              <p 
                className="home-about-body"
                dangerouslySetInnerHTML={{ __html: bioText }}
              />
            )}
          </Col>

          {/* Replacing Image with Google Maps */}
          <Col md={4} className="myAvtar">
            <div style={{ marginBottom: '15px' }}>
              <p className="text-white" style={{ 
                fontSize: '14px', 
                fontStyle: 'italic',
                textAlign: 'center',
                padding: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '5px',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                This is what I learned in my previous internship
              </p>
            </div>
            <iframe
              title="Location Map"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0, borderRadius: '5px' }}
              src={
                coordinates 
                  ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lon}&output=embed&z=15`
                  : "https://www.google.com/maps?q=San+Juan+PR&output=embed"
              }
              allowFullScreen
              key={coordinates ? `${coordinates.lat}-${coordinates.lon}` : 'default'}
            ></iframe>
            
            {/* Address Input and Coordinates Display */}
            <div style={{ 
              marginTop: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)', 
              border: '2px solid #ffffff', 
              borderRadius: '5px', 
              padding: '15px'
            }}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  Enter Street Address:
                </Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g., 123 Main St, San Juan, PR"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      border: '2px solid #ffffff',
                      color: '#ffffff',
                      padding: '8px 12px',
                      fontSize: '14px'
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        fetchCoordinates();
                      }
                    }}
                  />
                  <Button
                    variant="primary"
                    onClick={fetchCoordinates}
                    disabled={geoLoading}
                    style={{
                      backgroundColor: '#000000',
                      border: '2px solid #ffffff',
                      color: '#ffffff',
                      padding: '8px 20px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {geoLoading ? '...' : 'Get Coords'}
                  </Button>
                </div>
              </Form.Group>

              {geoError && (
                <Alert variant="danger" className="mt-2" style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '2px solid #ffffff',
                  color: '#ffffff',
                  padding: '10px',
                  fontSize: '12px'
                }}>
                  {geoError}
                </Alert>
              )}

              {coordinates && (
                <div className="text-white mt-3" style={{ fontSize: '13px' }}>
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '2px solid #ffffff',
                    borderRadius: '5px',
                    padding: '12px'
                  }}>
                    <strong>Coordinates:</strong><br />
                    <span style={{ fontFamily: 'monospace' }}>
                      Latitude: {coordinates.lat.toFixed(6)}<br />
                      Longitude: {coordinates.lon.toFixed(6)}
                    </span>
                    {coordinates.displayName && (
                      <>
                        <br /><br />
                        <strong>Location:</strong><br />
                        <span style={{ fontSize: '12px', opacity: 0.9 }}>
                          {coordinates.displayName}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="yellow">connect</span> with me through the following platforms.
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Alexyodice"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  aria-label="github"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/yodic1"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  aria-label="twitter"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/alexander-yodice-434595235"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  aria-label="linkedin"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://leetcode.com/u/Taylorjmjr1959_"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="leetcode"
                >
                  <SiLeetcode />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default About;
