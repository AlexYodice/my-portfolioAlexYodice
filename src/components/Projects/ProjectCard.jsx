import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiLinkExternal } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

function ProjectCard(props) {
  return (
    <Card className="project-card-view">
      <Card.Img 
        variant="top" 
        src={props.imgPath} 
        alt="card-img"
        style={{ 
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "10px"
        }} 
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button variant="primary" href={props.ghLink} target="_blank">
          <BsGithub /> &nbsp;GitHub
        </Button>
        {props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <BiLinkExternal /> &nbsp;Demo
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
