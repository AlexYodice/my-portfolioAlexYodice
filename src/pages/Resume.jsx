import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Particle from '../components/Particle';
import resumePDF from "../assets/projects/Updated_Yodice_Alexander_Resume_November2023.pdf";

const Resume = () => {
  const navigate = useNavigate();

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
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Button
                variant="primary"
                href={resumePDF}
                target="_blank"
                style={{ maxWidth: "250px" }}
                download
              >
                <AiOutlineDownload />
                &nbsp;Download Resume
              </Button>
            </div>
            <div style={{ textAlign: "center" }}>
              <iframe
                src={resumePDF}
                title="Alexander Yodice Resume"
                width="100%"
                height="800px"
                style={{ border: "none", borderRadius: "5px" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Resume;
