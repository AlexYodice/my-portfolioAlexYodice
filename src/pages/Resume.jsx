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
    // Refresh resume every 30 seconds to catch updates
    const interval = setInterval(() => {
      console.log('🔄 Refreshing resume...');
      fetchResume();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchResume = async () => {
    // If Supabase is not configured, use fallback resume immediately
    if (!isSupabaseConfigured) {
      console.log('⚠️ Supabase not configured, using fallback resume');
      setResumeUrl(resumePDF);
      setLoading(false);
      return;
    }

    try {
      console.log('📄 Fetching resume from database...');
      const { data, error } = await supabase
        .from('resume')
        .select('file_url, file_name, updated_at')
        .order('updated_at', { ascending: false })
        .limit(1);
      
      if (error) {
        console.error('❌ Database error:', error);
        throw error;
      }
      
      console.log('📊 Resume query result:', data);
      
      if (data && data.length > 0 && data[0].file_url) {
        console.log('✅ Found resume in database:', data[0].file_url);
        console.log('📝 File name:', data[0].file_name);
        console.log('🕒 Last updated:', data[0].updated_at);
        setResumeUrl(data[0].file_url);
      } else {
        console.warn('⚠️ No resume found in database, using fallback');
        // Fallback to local file if database is empty
        setResumeUrl(resumePDF);
      }
    } catch (err) {
      console.error('❌ Error fetching resume:', err);
      console.error('Error details:', {
        message: err.message,
        code: err.code,
        details: err.details,
        hint: err.hint
      });
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
                <div style={{ textAlign: "center", marginBottom: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
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
                  <Button
                    variant="secondary"
                    onClick={() => {
                      console.log('🔄 Manual refresh triggered');
                      setLoading(true);
                      fetchResume();
                    }}
                    style={{ maxWidth: "200px" }}
                  >
                    🔄 Refresh
                  </Button>
                </div>
                <div style={{ textAlign: "center" }}>
                  <iframe
                    key={`${resumeUrl}-${Date.now()}`} // Force re-render with timestamp
                    src={`${resumeUrl}?t=${Date.now()}#toolbar=0&navpanes=0`}
                    title="Alexander Yodice Resume"
                    width="100%"
                    height="800px"
                    style={{ border: "none", borderRadius: "5px" }}
                    onLoad={() => {
                      console.log('✅ Resume iframe loaded successfully');
                      console.log('📄 URL:', resumeUrl);
                    }}
                    onError={(e) => {
                      console.error('❌ Resume iframe failed to load');
                      console.error('Error:', e);
                      console.error('URL:', resumeUrl);
                    }}
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
