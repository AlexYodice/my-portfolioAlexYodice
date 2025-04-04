import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Particle from "../Particle";
import LeetCode from "./Leetcode";

function Skillset() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>
        <Techstack />

        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />
        
        <h1 className="project-heading">
          My <strong className="purple">LeetCode</strong> Progress
        </h1>
        <LeetCode />
      </Container>
    </Container>
  );
}

export default Skillset; 