import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiPostman,
  SiVercel,
  SiNetlify,
  SiGithub,
  SiJira,
  SiDocker,
  SiFigma,
  SiAdobepremierepro,
  SiFirebase,
  SiMongodb,
  SiGit
} from "react-icons/si";
import { FaCode } from "react-icons/fa";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <FaCode />
        <h5>VS Code</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman />
        <h5>Postman</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVercel />
        <h5>Vercel</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNetlify />
        <h5>Netlify</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGithub />
        <h5>GitHub</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJira />
        <h5>Jira</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
        <h5>Docker</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFigma />
        <h5>Figma</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAdobepremierepro />
        <h5>Premiere Pro</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFirebase />
        <h5>Firebase</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMongodb />
        <h5>MongoDB</h5>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGit />
        <h5>Git</h5>
      </Col>
    </Row>
  );
}

export default Toolstack;
