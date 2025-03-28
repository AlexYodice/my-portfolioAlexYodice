import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ResumeAdmin() {
  const navigate = useNavigate();
  const [newResume, setNewResume] = useState(null);
  // const [currentResumeName, setCurrentResumeName] = useState("Updated_Yodice_Alexander_Resume_November2023.pdf");

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewResume(file);
    }
  };

  const handleSave = () => {
    if (newResume) {
      console.log('Saving new resume:', newResume.name);
      // Here you would typically:
      // 1. Upload the new resume
      // 2. Delete the old resume
      // 3. Update the resumePDF import path
      navigate('/resume');
    }
  };

  const handleExit = () => {
    if (newResume && !window.confirm('Are you sure you want to exit without saving?')) {
      return;
    }
    navigate('/resume');
  };

  return (
    <Container className="admin-dashboard">
      <h1 className="text-center mb-4" style={{ color: 'white' }}>Update Resume</h1>
      <Form className="admin-form">
        <div className="current-resume mb-4">
          <h3 className="text-white mb-3">Current Resume</h3>
          <p className="text-white">{/* currentResumeName */}</p>
        </div>

        <Form.Group className="mb-4">
          <Form.Label>Upload New Resume (PDF)</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            className="admin-input"
          />
        </Form.Group>

        <div className="admin-footer">
          <Button 
            variant="danger" 
            className="admin-button me-3"
            onClick={handleSave}
            disabled={!newResume}
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
    </Container>
  );
}

export default ResumeAdmin; 