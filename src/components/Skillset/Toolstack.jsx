import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiWindows,
  DiEclipse,
  DiIntellij,
  DiApple,
} from "react-icons/di";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px", marginTop: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <DiWindows />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiEclipse />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiIntellij />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiApple />
      </Col>
    </Row>
  );
}

export default Toolstack;
