import React from "react";
import { Row, Col } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";

function LeetCode() {
  // You can replace these with your actual LeetCode stats
  const leetCodeStats = {
    totalSolved: 150,
    totalProblems: 2000,
    easySolved: 80,
    easyTotal: 500,
    mediumSolved: 60,
    mediumTotal: 1000,
    hardSolved: 10,
    hardTotal: 500,
  };

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={12} md={6} className="leetcode-stats">
        <h3>Total Problems Solved</h3>
        <ProgressBar 
          variant="success"
          now={(leetCodeStats.totalSolved / leetCodeStats.totalProblems) * 100} 
          label={`${leetCodeStats.totalSolved}/${leetCodeStats.totalProblems}`} 
        />
        
        <h3 className="mt-4">Easy Problems</h3>
        <ProgressBar 
          variant="success" 
          now={(leetCodeStats.easySolved / leetCodeStats.easyTotal) * 100} 
          label={`${leetCodeStats.easySolved}/${leetCodeStats.easyTotal}`} 
        />
        
        <h3 className="mt-4">Medium Problems</h3>
        <ProgressBar 
          variant="warning" 
          now={(leetCodeStats.mediumSolved / leetCodeStats.mediumTotal) * 100} 
          label={`${leetCodeStats.mediumSolved}/${leetCodeStats.mediumTotal}`} 
        />
        
        <h3 className="mt-4">Hard Problems</h3>
        <ProgressBar 
          variant="danger" 
          now={(leetCodeStats.hardSolved / leetCodeStats.hardTotal) * 100} 
          label={`${leetCodeStats.hardSolved}/${leetCodeStats.hardTotal}`} 
        />
      </Col>
    </Row>
  );
}

export default LeetCode;
