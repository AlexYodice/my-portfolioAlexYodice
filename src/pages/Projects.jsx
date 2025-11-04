import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error fetching projects:', error);
      else setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <section className="projects-section">
      <h1 className="projects-title">MY RECENT <span>WORKS</span></h1>
      <p className="projects-subtitle">Here are a few projects I've worked on recently.</p>
      
      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className="project-card" key={project.id}>
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="project-image" />
              )}
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-buttons">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn">
                    GitHub
                  </a>
                )}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="loading-text">No projects to display yet.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
