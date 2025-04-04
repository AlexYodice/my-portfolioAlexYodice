import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

function Navbar() {
  const updateExpanded = (expanded) => {
    // Implementation of updateExpanded function
  };

  return (
    <Nav className="mr-auto">
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/skillset"
          onClick={() => updateExpanded(false)}
        >
          <AiOutlineFundProjectionScreen
            style={{ marginBottom: "2px" }}
          />{" "}
          Skills
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar; 