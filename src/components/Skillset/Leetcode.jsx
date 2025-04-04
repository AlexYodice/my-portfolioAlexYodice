import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { AiOutlineCode, AiOutlineTrophy } from "react-icons/ai";

function LeetCode() {
  const leetCodeUrl = "https://leetcode.com/u/sMGGXEMQGq/";
  
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={12} md={10} className="leetcode-stats text-center">
        <h1 className="project-heading">
          <span className="purple">LeetCode</span> Stat
        </h1>
        
        <Card className="shadow-lg" style={{ backgroundColor: "#1a1a1a", color: "white", borderRadius: "15px", marginTop: "30px", marginBottom: "40px" }}>
          <Card.Body>
            <div className="text-center mb-4">
              <a 
                href={leetCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ borderRadius: "8px", backgroundColor: "#8A2BE2", borderColor: "#8A2BE2" }}
              >
                <AiOutlineCode className="me-2" /> View My LeetCode Profile
              </a>
            </div>
            
            <div className="embed-responsive" style={{ minHeight: "500px", border: "1px solid #333", borderRadius: "8px" }}>
              <iframe 
                src={leetCodeUrl}
                title="LeetCode Profile"
                width="100%"
                height="500px"
                style={{ border: "none", borderRadius: "8px" }}
              />
            </div>
          </Card.Body>
        </Card>
        
        <h1 className="project-heading" style={{ marginTop: "40px" }}>
          Days I <span className="purple">Code</span>
        </h1>
        
        {/* Replace this with your GitHub username */}
        <div className="github-calendar-container" style={{ marginTop: "30px" }}>
          <img 
            src="https://ghchart.rshah.org/8A2BE2/YOUR_GITHUB_USERNAME"
            alt="GitHub Contribution Calendar" 
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", background: "#0D1117" }}
          />
        </div>
      </Col>
    </Row>
  );
}

export default LeetCode;
