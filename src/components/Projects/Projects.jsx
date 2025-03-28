import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import GOTchess from "../../assets/projects/GOTchess.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="yellow">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={GOTchess}
              isBlog={false}
              title="Game of Thrones Chess"
              description="A chess game inspired by Game of Thrones, built with JavaScript. Features themed chess pieces, interactive game board, and visual animations. Follows traditional chess rules with a Westeros-inspired design."
              ghLink="https://github.com/AlexYodice/Javascript-Chess-Game-GOT"
              demoLink="https://alexyodice.github.io/Javascript-Chess-Game-GOT/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects; 