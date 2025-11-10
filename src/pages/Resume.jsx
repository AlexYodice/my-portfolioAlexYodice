import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Particle from '../components/Particle';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
// Fallback resume if database is empty
import resumePDF from "../assets/projects/Updated_Yodice_Alexander_Resume_November2023.pdf";

const Resume = () => {
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    // If Supabase is not configured, use fallback resume immediately
    if (!isSupabaseConfigured) {
      setResumeUrl(resumePDF);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('resume')
        .select('file_url')
        .order('updated_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0 && data[0].file_url) {
        setResumeUrl(data[0].file_url);
      } else {
        // Fallback to local file if database is empty
        setResumeUrl(resumePDF);
      }
    } catch (err) {
      // Only log errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching resume:', err);
      }
      // Fallback to local file on error
      setResumeUrl(resumePDF);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsClick = () => {
    console.log("Resume settings clicked");
    navigate('/admin-login', { state: { from: 'resume' } });
  };

  return (
    <div className="resume-section">
      <Container fluid>
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Col md={8} style={{ textAlign: "center" }}>
            <div className="resume-heading-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                My <strong className="yellow">Resume</strong>
              </h1>
              <FaCog 
                className="settings-icon" 
                onClick={handleSettingsClick}
                style={{ 
                  cursor: 'pointer', 
                  fontSize: '30px', 
                  color: 'white',
                  marginLeft: '10px',
                  marginBottom: '20px'
                }}
              />
            </div>
            {loading ? (
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Spinner animation="border" variant="primary" />
                <p className="text-white mt-2">Loading resume...</p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <Button
                    variant="primary"
                    href={resumeUrl}
                    target="_blank"
                    style={{ maxWidth: "250px" }}
                    download="Alexander_Yodice_Maldonado_Resume.pdf"
                  >
                    <AiOutlineDownload />
                    &nbsp;Download Resume
                  </Button>
                </div>
                <div style={{ textAlign: "center" }}>
                  <iframe
                    src={`${resumeUrl}#toolbar=0&navpanes=0`}
                    title="Alexander Yodice Resume"
                    width="100%"
                    height="800px"
                    style={{ border: "none", borderRadius: "5px" }}
                  />
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Resume;
