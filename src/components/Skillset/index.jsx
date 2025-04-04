import React from "react";
import { Container } from "react-bootstrap";
import Github from "./Github";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Leetcode from "./Leetcode";

function Skillset() {
  return (
    <Container fluid className="about-section">
      <Container>
        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>
        <Techstack />
        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />
        <Github />
        <Leetcode />
      </Container>
    </Container>
  );
}

export default Skillset; 