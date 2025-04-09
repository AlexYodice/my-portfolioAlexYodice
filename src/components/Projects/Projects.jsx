import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import Particle from "../Particle";

// Import your project images
import portfolioImg from "../../Assets/Projects/portfolio-website.png";
import gotChessImg from "../../Assets/Projects/got-chess.png";
import dawImg from "../../Assets/Projects/daw-development.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p>Here are a few projects I've worked on recently.</p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col sm={12} md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={portfolioImg}
              isBlog={false}
              title="First Portfolio Website"
              description="My first portfolio website built with HTML, CSS, and JavaScript. Features a responsive design, multiple sections including about, portfolio, and contact. Includes interactive elements and smooth animations."
              ghLink="https://github.com/alexyodice/portfolio-website"
              demoLink="https://alexyodice.github.io/portfolio-website"
            />
          </Col>
          <Col sm={12} md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={gotChessImg}
              isBlog={false}
              title="Game of Thrones Chess"
              description="A chess game inspired by Game of Thrones, built with JavaScript. Features themed chess pieces, interactive game board, and visual animations. Follows traditional chess rules with a Westeros-inspired design."
              ghLink="https://github.com/alexyodice/got-chess"
            />
          </Col>
          <Col sm={12} md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={dawImg}
              isBlog={false}
              title="DAW DEVELOPEMENT"
              description="DAW Development 🎵 💻 A cross-platform Digital Audio Workstation (DAW) built with Electron, React, and the WebAudio API for real-time music production."
              ghLink="https://github.com/alexyodice/daw-development"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects; 