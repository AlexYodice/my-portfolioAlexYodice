import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import LaptopImg from "../../assets/home-main.svg";
// import Particle from "../Particle";
import {
  AiFillGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

// Rest of the code...


const About = () => {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="yellow"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm Alex, a <span className="yellow">5th year Computer Engineer student </span>
              from <span className="yellow"> Puerto Rico.</span>
              <br />
              <br />
              I'm graduating soon and have experience in full-stack development, with a focus on web technologies and projects involving <b className="yellow">HTML, CSS, JavaScript</b> and <b className="yellow">Google Maps API.</b>
              <br />
              <br />
              I am proficient in 
              <b className="yellow"> JavaScript </b> and have a solid foundation in languages like C, Python, SQL,
              <b className="yellow"> GraphQL, and more.</b>
              <br />
              <br />
              I enjoy working with
              <b className="yellow"> Node.js, React.js,</b> and backend technologies like
              <b className="yellow"> MongoDB.</b> 
              <br />
              <br />
              I'm also passionate about <b className="yellow">web development, artificial intelligence,</b>
              and continuously learning to expand my skillset.
              <br />
              <br />
              In my spare time, I enjoy practicing coding challenges on <b className="yellow">LeetCode</b> and working on projects that push me out of my comfort zone.
            </p>
          </Col>

          {/* Replacing Image with Google Maps */}
          <Col md={4} className="myAvtar">
            <iframe
              title="Location Map"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps?q=San+Juan+PR&output=embed"
              allowFullScreen
            ></iframe>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="yellow">connect</span> with me through the following platforms.
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Alexyodice"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  aria-label="github"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/yodic1"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  aria-label="twitter"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/alexander-yodice-434595235"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  aria-label="linkedin"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://leetcode.com/alexandersay"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="leetcode"
                >
                  <SiLeetcode />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
