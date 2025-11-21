import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { BsGithub } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

// 100% DYNAMIC - NO STATIC DATA
// Everything comes from Supabase database

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]); // 100% dynamic - only from database
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleSettingsClick = () => {
    console.log("Projects settings clicked");
    navigate('/admin-login', { state: { from: 'projects' } });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      // 100% DYNAMIC - Only fetch from database, no fallbacks
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: true }); // Oldest first
        
        if (error) {
          console.error('Error fetching projects:', error);
          setError('Failed to load projects. Please check your database connection.');
          setProjects([]);
        } else {
          // Show whatever is in the database - could be empty, that's fine!
          setProjects(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load projects.');
        setProjects([]);
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
        ) : error ? (
          <div className="error-message" style={{ color: '#dc3545', textAlign: 'center', padding: '20px' }}>
            <p>{error}</p>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              Go to <a href="/admin-login" style={{ color: '#fff' }}>Admin Dashboard</a> to add projects.
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state" style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>No projects yet.</p>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>
              <a href="/admin-login" style={{ color: '#dc3545' }}>Go to Admin Dashboard</a> to add your first project.
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <div className="project-card" key={project.id}>
              {project.image_url && (
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="project-image"
                  onError={(e) => {
                    // If Supabase Storage image fails to load, show placeholder
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
