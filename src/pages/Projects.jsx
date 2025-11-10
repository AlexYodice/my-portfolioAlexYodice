import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { BsGithub } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

// Fallback projects that will always be visible
const FALLBACK_PROJECTS = [
  {
    id: 'fallback-1',
    title: 'First Portfolio Website',
    description: 'My first portfolio website built with HTML, CSS, and JavaScript. Features a responsive design, multiple sections including about, portfolio, and contact. Includes interactive elements and smooth animations.',
    github_url: 'https://github.com/alexyodice/portfolio-website',
    live_url: 'https://alexyodice.github.io/portfolio-website',
    image_url: '/images/projects/portfolio-website.png'
  },
  {
    id: 'fallback-2',
    title: 'Game of Thrones Chess',
    description: 'A chess game inspired by Game of Thrones, built with JavaScript. Features themed chess pieces, interactive game board, and visual animations. Follows traditional chess rules with a Westeros-inspired design.',
    github_url: 'https://github.com/alexyodice/got-chess',
    live_url: null,
    image_url: '/images/projects/got-chess.png'
  },
  {
    id: 'fallback-3',
    title: 'DAW DEVELOPMENT',
    description: 'DAW Development 🎵 💻 A cross-platform Digital Audio Workstation (DAW) built with Electron, React, and the WebAudio API for real-time music production.',
    github_url: 'https://github.com/alexyodice/daw-development',
    live_url: null,
    image_url: '/images/projects/daw-development.png'
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);

  const handleSettingsClick = () => {
    console.log("Projects settings clicked");
    navigate('/admin-login', { state: { from: 'projects' } });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      // If Supabase is not configured, skip fetching and use fallback projects
      if (!isSupabaseConfigured) {
        setProjects(FALLBACK_PROJECTS);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) {
          // Only log errors in development
          if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching projects:', error);
          }
          // Keep fallback projects if there's an error
          setProjects(FALLBACK_PROJECTS);
        } else {
          // If we have data from Supabase, use it; otherwise use fallback
          setProjects(data && data.length > 0 ? data : FALLBACK_PROJECTS);
        }
      } catch (err) {
        // Only log errors in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Error:', err);
        }
        // Keep fallback projects if there's an error
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="projects-section">
      <div className="project-heading-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        <h1 className="projects-title">MY RECENT <span>WORKS</span></h1>
        <FaCog 
          className="settings-icon" 
          onClick={handleSettingsClick}
          style={{ 
            cursor: 'pointer', 
            fontSize: '30px', 
            color: 'white',
            marginLeft: '10px'
          }}
        />
      </div>
      <p className="projects-subtitle">Here are a few projects I've worked on recently.</p>
      
      <div className="projects-grid">
        {loading ? (
          <p className="loading-text">Loading projects...</p>
        ) : (
          projects.map((project) => (
            <div className="project-card" key={project.id}>
              {project.image_url && (
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="project-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" %3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              )}
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-buttons">
                {project.github_url && (
                  <a 
                    href={project.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-github"
                  >
                    <BsGithub /> &nbsp;GitHub
                  </a>
                )}
                {project.live_url && (
                  <a 
                    href={project.live_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-demo"
                  >
                    <CgWebsite /> &nbsp;Live Demo
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;
