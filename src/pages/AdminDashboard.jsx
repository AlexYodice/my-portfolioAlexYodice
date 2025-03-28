import React, { useState } from 'react';
import { Container, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import { FaMinus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    ghLink: '',
    demoLink: '',
    image: null
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Load existing projects from localStorage
  const [existingProjects, setExistingProjects] = useState(() => {
    const saved = localStorage.getItem('portfolioProjects');
    const initialValue = JSON.parse(saved);
    return initialValue || [
      {
        id: 1,
        title: "First Portfolio Website",
        description: "My first portfolio website built with HTML, CSS, and JavaScript. Features a responsive design, multiple sections including about, portfolio, and contact. Includes interactive elements and smooth animations.",
        ghLink: "https://github.com/AlexYodice/ResumeWebsite",
        demoLink: "https://alexyodicewebsite.netlify.app",
        image: "/static/media/FirstResumeWebsite.png"
      },
      {
        id: 2,
        title: "Game of Thrones Chess",
        description: "A chess game inspired by Game of Thrones, built with JavaScript. Features themed chess pieces, interactive game board, and visual animations. Follows traditional chess rules with a Westeros-inspired design.",
        ghLink: "https://github.com/AlexYodice/Javascript-Chess-Game-GOT",
        image: "/static/media/GOTchess.png"
      }
    ];
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject(prev => ({...prev, image: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProject.title && newProject.description && newProject.ghLink && newProject.image) {
      const newId = Math.max(...existingProjects.map(p => p.id), 0) + 1;
      const projectToAdd = {
        ...newProject,
        id: newId
      };
      
      const updatedProjects = [...existingProjects, projectToAdd];
      setExistingProjects(updatedProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      
      // Reset form
      setNewProject({
        title: '',
        description: '',
        ghLink: '',
        demoLink: '',
        image: null
      });
      
      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    }
  };

  const handleRemoveProject = (id) => {
    const updatedProjects = existingProjects.filter(project => project.id !== id);
    setExistingProjects(updatedProjects);
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
  };

  const handleSave = () => {
    localStorage.setItem('portfolioProjects', JSON.stringify(existingProjects));
    navigate('/project');
  };

  const handleExit = () => {
    if(window.confirm('Are you sure you want to exit without saving?')) {
      navigate('/project');
    }
  };

  const handleEditClick = (project) => {
    setEditingProject({...project});
    setShowEditModal(true);
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProject(prev => ({...prev, image: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSave = () => {
    const updatedProjects = existingProjects.map(project => 
      project.id === editingProject.id ? editingProject : project
    );
    setExistingProjects(updatedProjects);
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    setShowEditModal(false);
  };

  return (
    <Container className="admin-dashboard">
      <h1 className="text-center mb-4" style={{ color: 'white' }}>Add New Project</h1>
      <Form onSubmit={handleSubmit} className="admin-form">
        <Form.Group className="mb-3">
          <Form.Label>Project Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="admin-input"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Project Title</Form.Label>
          <Form.Control
            type="text"
            value={newProject.title}
            onChange={(e) => setNewProject(prev => ({...prev, title: e.target.value}))}
            className="admin-input"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({...prev, description: e.target.value}))}
            className="admin-input"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>GitHub Link</Form.Label>
          <Form.Control
            type="text"
            value={newProject.ghLink}
            onChange={(e) => setNewProject(prev => ({...prev, ghLink: e.target.value}))}
            className="admin-input"
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Demo Link (Optional)</Form.Label>
          <Form.Control
            type="text"
            value={newProject.demoLink}
            onChange={(e) => setNewProject(prev => ({...prev, demoLink: e.target.value}))}
            className="admin-input"
          />
        </Form.Group>
        <Button type="submit" variant="danger" className="admin-button w-100 mb-4">
          Add Project
        </Button>

        <h2 className="text-white mb-3">Existing Projects</h2>
        <ListGroup className="project-list mb-4">
          {existingProjects.map((project) => (
            <ListGroup.Item key={project.id} className="project-list-item d-flex justify-content-between align-items-center">
              <span>{project.title}</span>
              <div className="d-flex gap-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="edit-button"
                  onClick={() => handleEditClick(project)}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="remove-button"
                  onClick={() => handleRemoveProject(project.id)}
                >
                  <FaMinus />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div className="admin-footer">
          <Button 
            variant="danger" 
            className="admin-button me-3"
            onClick={handleSave}
          >
            Save Changes
          </Button>
          <Button 
            variant="outline-danger" 
            className="admin-button-outline"
            onClick={handleExit}
          >
            Exit Without Saving
          </Button>
        </div>
      </Form>

      {/* Edit Modal */}
      <Modal 
        show={showEditModal} 
        onHide={() => setShowEditModal(false)}
        className="edit-modal"
        centered
      >
        <Modal.Header closeButton className="edit-modal-header">
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-modal-body">
          {editingProject && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Project Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageUpload}
                  className="admin-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Project Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject(prev => ({...prev, title: e.target.value}))}
                  className="admin-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject(prev => ({...prev, description: e.target.value}))}
                  className="admin-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>GitHub Link</Form.Label>
                <Form.Control
                  type="text"
                  value={editingProject.ghLink}
                  onChange={(e) => setEditingProject(prev => ({...prev, ghLink: e.target.value}))}
                  className="admin-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Demo Link (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  value={editingProject.demoLink || ''}
                  onChange={(e) => setEditingProject(prev => ({...prev, demoLink: e.target.value}))}
                  className="admin-input"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="edit-modal-footer">
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminDashboard; 