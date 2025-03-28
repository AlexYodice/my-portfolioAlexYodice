import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "../components/Projects/ProjectCards";
import Particle from "../components/Particle";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();

  // Get projects from localStorage
  const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];

  const handleSettingsClick = () => {
    navigate('/admin-login');
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <div className="project-heading-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <h1 className="project-heading">
            My Recent <strong className="yellow">Works</strong>
          </h1>
          <FaCog 
            className="settings-icon" 
            onClick={handleSettingsClick}
            style={{ 
              cursor: 'pointer', 
              fontSize: '30px', 
              color: 'white',
              marginLeft: '10px',
              marginTop: '10px'
            }}
          />
        </div>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((project) => (
            <Col md={4} className="project-card" key={project.id}>
              <ProjectCard
                imgPath={project.image}
                isBlog={false}
                title={project.title}
                description={project.description}
                ghLink={project.ghLink}
                demoLink={project.demoLink}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;