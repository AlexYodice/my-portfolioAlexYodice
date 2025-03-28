import React from "react";
import Typewriter from "typewriter-effect";

const Type = () => {
    return (
        <Typewriter
          options={{
            strings: [
              "Happy",
              "Commited",
              "Front-End",
              "Back-End",
              "Full-Stack",
              "Engineer",
              "Passionate CyberSecurity Enthusiast",
              "Problem Solver",
              "Open Source Contributor"
              
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
          }}
        />
      )
}

export default Type