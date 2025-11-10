import React from "react";
import Typewriter from "typewriter-effect";

const Type = () => {
    return (
        <Typewriter
          options={{
            strings: [
              "Happy to Help",
              "Problem Solver",
              "Committed to the Mission",
              "Front-End",
              "Back-End",
              "Full-Stack",
              "Engineer",
              "Software Developer",
              "Experience with VS, Cursor, Power BI, Supabase",
              "Open Source Contributor",
              "Eager to Learn",
              "Experience with AWS"
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
          }}
        />
      )
}

export default Type