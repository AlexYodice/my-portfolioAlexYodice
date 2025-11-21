import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, ListGroup, Modal, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { FaMinus, FaEdit } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'projects');
  
  // Projects state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    github_url: '',
    live_url: '',
    imageFile: null
  });
  const [existingProjects, setExistingProjects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  // Bio state
  const [bioText, setBioText] = useState('');
  const [currentBio, setCurrentBio] = useState('');
  const bioTextareaRef = useRef(null);
  
  // Resume state
  const [resumeFile, setResumeFile] = useState(null);
  const [currentResume, setCurrentResume] = useState(null);
  
  // General state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Test storage connection on mount
  useEffect(() => {
    const testStorageConnection = async () => {
      try {
        const { data: buckets, error } = await supabase.storage.listBuckets();
        if (error) {
          console.error('❌ Storage connection error:', error);
        } else {
          console.log('✅ Storage connection successful');
          console.log('📦 Available buckets:', buckets?.map(b => `${b.name} (${b.public ? 'public' : 'private'})`) || 'none');
        }
      } catch (err) {
        console.error('❌ Failed to test storage connection:', err);
      }
    };
    testStorageConnection();
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    } else if (activeTab === 'bio') {
      fetchBio();
    } else if (activeTab === 'resume') {
      fetchResume();
    }
  }, [activeTab]);

  // ==================== PROJECTS ====================
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setExistingProjects(data || []);
    } catch (err) {
      setError('Failed to fetch projects: ' + err.message);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    
    // Try to list buckets for debugging, but don't fail if it doesn't work
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.warn('⚠️ Could not list buckets (this may be normal):', listError.message);
    } else {
      console.log('📦 Available storage buckets:', buckets?.map(b => `${b.name} (${b.public ? 'public' : 'private'})`) || 'none');
    }
    
    console.log('🔍 Attempting to upload to bucket: "projects"');
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    // Try to upload directly - sometimes listBuckets() doesn't work but upload does
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(filePath, file);

    if (error) {
      console.error('❌ Upload error:', error);
      
      if (error.message.includes('Bucket not found') || error.message.includes('not found')) {
        const availableBuckets = buckets?.map(b => `"${b.name}"`).join(', ') || 'none';
        throw new Error(
          `Storage bucket "projects" not found or not accessible.\n\n` +
          `Available buckets (if any): ${availableBuckets}\n\n` +
          `Please verify in Supabase:\n` +
          `1. Go to https://app.supabase.com → Your Project → Storage\n` +
          `2. Ensure a bucket named exactly "projects" exists (case-sensitive)\n` +
          `3. Make sure it's set to Public (toggle ON)\n` +
          `4. Check Storage Policies:\n` +
          `   - Go to Storage → projects → Policies\n` +
          `   - You need a policy that allows INSERT for authenticated/anonymous users\n` +
          `   - See supabase-setup-3-storage-policies.sql for examples\n` +
          `5. If the bucket doesn't exist, create it:\n` +
          `   - Click "New bucket"\n` +
          `   - Name: projects (exactly, lowercase)\n` +
          `   - Public: ON\n` +
          `   - Click "Create bucket"`
        );
      }
      
      // Check for permission errors
      if (error.message.includes('permission') || error.message.includes('policy') || error.message.includes('denied')) {
        throw new Error(
          `Permission denied uploading to "projects" bucket.\n\n` +
          `This usually means the storage policies aren't set up correctly.\n\n` +
          `Fix this in Supabase:\n` +
          `1. Go to https://app.supabase.com → Your Project → Storage\n` +
          `2. Click on the "projects" bucket\n` +
          `3. Go to the "Policies" tab\n` +
          `4. Create a policy that allows:\n` +
          `   - Operation: INSERT (for uploads)\n` +
          `   - Target roles: anon, authenticated\n` +
          `   - Policy name: "Allow public uploads"\n` +
          `5. See supabase-setup-3-storage-policies.sql for the exact SQL\n\n` +
          `Error details: ${error.message}`
        );
      }
      
      throw error;
    }

    console.log('✅ Upload successful:', filePath);
    
    const { data: { publicUrl } } = supabase.storage
      .from('projects')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProject(prev => ({...prev, imageFile: file}));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!newProject.title || !newProject.description || !newProject.github_url || !newProject.imageFile) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      const imageUrl = await uploadImage(newProject.imageFile);
      
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            title: newProject.title,
            description: newProject.description,
            github_url: newProject.github_url,
            live_url: newProject.live_url || null,
            image_url: imageUrl
          }
        ])
        .select();

      if (error) throw error;

      setSuccess('Project added successfully!');
      setNewProject({
        title: '',
        description: '',
        github_url: '',
        live_url: '',
        imageFile: null
      });
      
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

      await fetchProjects();
    } catch (err) {
      setError('Failed to add project: ' + err.message);
      console.error('Error adding project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setLoading(true);
      const project = existingProjects.find(p => p.id === id);
      
      if (project?.image_url) {
        try {
          const urlParts = project.image_url.split('/projects/');
          if (urlParts.length > 1) {
            const filePath = urlParts[1];
            await supabase.storage.from('projects').remove([filePath]);
          }
        } catch (storageError) {
          console.warn('Could not delete image from storage:', storageError);
        }
      }

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSuccess('Project deleted successfully!');
      await fetchProjects();
    } catch (err) {
      setError('Failed to delete project: ' + err.message);
      console.error('Error deleting project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (project) => {
    setEditingProject({
      ...project,
      imageFile: null
    });
    setShowEditModal(true);
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingProject(prev => ({...prev, imageFile: file}));
    }
  };

  const handleEditSave = async () => {
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      let imageUrl = editingProject.image_url;

      if (editingProject.imageFile) {
        if (editingProject.image_url) {
          try {
            const urlParts = editingProject.image_url.split('/projects/');
            if (urlParts.length > 1) {
              const filePath = urlParts[1];
              await supabase.storage.from('projects').remove([filePath]);
            }
          } catch (storageError) {
            console.warn('Could not delete old image from storage:', storageError);
          }
        }
        imageUrl = await uploadImage(editingProject.imageFile);
      }

      const { error } = await supabase
        .from('projects')
        .update({
          title: editingProject.title,
          description: editingProject.description,
          github_url: editingProject.github_url,
          live_url: editingProject.live_url || null,
          image_url: imageUrl
        })
        .eq('id', editingProject.id);

      if (error) throw error;

      setSuccess('Project updated successfully!');
      setShowEditModal(false);
      await fetchProjects();
    } catch (err) {
      setError('Failed to update project: ' + err.message);
      console.error('Error updating project:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== BIO ====================
  const fetchBio = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setCurrentBio(data[0].bio_text);
        setBioText(data[0].bio_text);
      } else {
        setCurrentBio('');
        setBioText('');
      }
    } catch (err) {
      setError('Failed to fetch bio: ' + err.message);
      console.error('Error fetching bio:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBioSave = async () => {
    setError('');
    setSuccess('');

    if (!bioText.trim()) {
      setError('Bio text cannot be empty');
      return;
    }

    try {
      setLoading(true);
      
      // Check if profile exists
      const { data: existing } = await supabase
        .from('profile')
        .select('id')
        .limit(1);

      if (existing && existing.length > 0) {
        // Update existing
        const { error } = await supabase
          .from('profile')
          .update({ bio_text: bioText })
          .eq('id', existing[0].id);

        if (error) throw error;
        setSuccess('Bio updated successfully! Changes will be visible immediately.');
      } else {
        // Insert new
        const { error } = await supabase
          .from('profile')
          .insert([{ bio_text: bioText }]);

        if (error) throw error;
        setSuccess('Bio saved successfully! Changes will be visible immediately.');
      }

      await fetchBio();
    } catch (err) {
      setError('Failed to save bio: ' + err.message);
      console.error('Error saving bio:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== RESUME ====================
  const fetchResume = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resume')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setCurrentResume(data[0]);
      } else {
        setCurrentResume(null);
      }
    } catch (err) {
      setError('Failed to fetch resume: ' + err.message);
      console.error('Error fetching resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (file) => {
    if (!file) return null;
    
    console.log('🔍 Uploading resume to bucket: "resume"');
    
    const fileExt = file.name.split('.').pop();
    // Use proper filename: Alexander_Yodice_Maldonado_Resume.pdf
    const fileName = `Alexander_Yodice_Maldonado_Resume.${fileExt}`;
    const filePath = fileName;

    // Delete old resume if exists (before uploading new one)
    if (currentResume?.file_url) {
      try {
        // Extract the file path from the URL
        const urlParts = currentResume.file_url.split('/resume/');
        if (urlParts.length > 1) {
          const oldFilePath = urlParts[1].split('?')[0]; // Remove query params if any
          console.log('🗑️ Deleting old resume:', oldFilePath);
          const { error: deleteError } = await supabase.storage
            .from('resume')
            .remove([oldFilePath]);
          
          if (deleteError) {
            console.warn('⚠️ Could not delete old resume (may not exist):', deleteError.message);
          } else {
            console.log('✅ Old resume deleted successfully');
          }
        }
      } catch (storageError) {
        console.warn('⚠️ Error deleting old resume:', storageError);
        // Continue with upload even if deletion fails
      }
    }

    // Upload the new resume file
    console.log('📤 Uploading new resume:', fileName);
    const { data, error } = await supabase.storage
      .from('resume')
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('❌ Upload error:', error);
      const errorMsg = error.message || 'Unknown error';
      
      // Provide helpful error messages
      if (error.message?.includes('Bucket not found') || error.message?.includes('not found') || error.statusCode === 400 || error.statusCode === 404) {
        throw new Error(
          `Storage bucket "resume" not found.\n\n` +
          `Please verify in Supabase:\n` +
          `1. Go to https://app.supabase.com → Your Project → Storage\n` +
          `2. Ensure a bucket named "resume" exists (case-sensitive, lowercase)\n` +
          `3. Make sure it's set to Public (toggle ON)\n` +
          `4. Check Storage Policies are set up\n\n` +
          `Error: ${errorMsg}`
        );
      }
      
      if (error.message?.includes('permission') || error.message?.includes('policy') || error.message?.includes('denied') || error.statusCode === 403) {
        throw new Error(
          `Permission denied. Storage policies may not be set up correctly.\n\n` +
          `Please check Storage → resume → Policies in Supabase.\n\n` +
          `Error: ${errorMsg}`
        );
      }
      
      throw new Error(`Failed to upload resume: ${errorMsg}`);
    }

    console.log('✅ Upload successful:', filePath);

    const { data: { publicUrl } } = supabase.storage
      .from('resume')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleResumeSave = async () => {
    setError('');
    setSuccess('');

    if (!resumeFile) {
      setError('Please select a PDF file');
      return;
    }

    try {
      setLoading(true);
      
      const fileUrl = await uploadResume(resumeFile);
      
      // Check if resume exists
      const { data: existing } = await supabase
        .from('resume')
        .select('id')
        .limit(1);

      if (existing && existing.length > 0) {
        // Update existing
        const { error } = await supabase
          .from('resume')
          .update({ 
            file_url: fileUrl,
            file_name: resumeFile.name
          })
          .eq('id', existing[0].id);

        if (error) throw error;
        setSuccess('Resume updated successfully! Changes will be visible immediately.');
      } else {
        // Insert new
        const { error } = await supabase
          .from('resume')
          .insert([{ 
            file_url: fileUrl,
            file_name: resumeFile.name
          }]);

        if (error) throw error;
        setSuccess('Resume uploaded successfully! Changes will be visible immediately.');
      }

      setResumeFile(null);
      const fileInput = document.querySelector('input[type="file"][accept=".pdf"]');
      if (fileInput) fileInput.value = '';
      
      await fetchResume();
    } catch (err) {
      setError('Failed to save resume: ' + err.message);
      console.error('Error saving resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExit = () => {
    navigate('/project');
  };

  return (
    <Container className="admin-dashboard" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center mb-0" style={{ color: 'white' }}>Admin Dashboard</h1>
        <Button 
          variant="outline-danger" 
          className="admin-button-outline"
          onClick={handleExit}
        >
          Back to Site
        </Button>
      </div>
      
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')} style={{ whiteSpace: 'pre-line' }}>
          <div style={{ fontSize: '14px' }}>
            {error.split('\n').map((line, index) => {
              // Check if line contains a URL
              const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
              if (urlMatch) {
                const parts = line.split(urlMatch[0]);
                return (
                  <div key={index} style={{ marginBottom: index === 0 ? '8px' : '4px' }}>
                    {parts[0]}
                    <a href={urlMatch[0]} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
                      {urlMatch[0]}
                    </a>
                    {parts[1]}
                  </div>
                );
              }
              return <div key={index} style={{ marginBottom: index === 0 ? '8px' : '4px' }}>{line}</div>;
            })}
          </div>
        </Alert>
      )}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
        style={{ borderBottom: '2px solid #dc3545' }}
      >
        <Tab eventKey="projects" title="Projects">
          <div className="mt-4">
            <Form onSubmit={handleSubmit} className="admin-form">
              <h2 className="text-white mb-3">Add New Project</h2>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'white' }}>Project Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="admin-input"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'white' }}>Project Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({...prev, title: e.target.value}))}
                  className="admin-input"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'white' }}>Description</Form.Label>
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
                <Form.Label style={{ color: 'white' }}>GitHub Link</Form.Label>
                <Form.Control
                  type="url"
                  value={newProject.github_url}
                  onChange={(e) => setNewProject(prev => ({...prev, github_url: e.target.value}))}
                  className="admin-input"
                  placeholder="https://github.com/username/repo"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label style={{ color: 'white' }}>Live Demo Link (Optional)</Form.Label>
                <Form.Control
                  type="url"
                  value={newProject.live_url}
                  onChange={(e) => setNewProject(prev => ({...prev, live_url: e.target.value}))}
                  className="admin-input"
                  placeholder="https://your-demo-site.com"
                />
              </Form.Group>
              <Button 
                type="submit" 
                variant="danger" 
                className="admin-button w-100 mb-4"
                disabled={loading}
              >
                {loading ? <><Spinner size="sm" className="me-2" />Adding...</> : 'Add Project'}
              </Button>

              <h2 className="text-white mb-3">Existing Projects</h2>
              {loading && existingProjects.length === 0 ? (
                <div className="text-center text-white mb-4">
                  <Spinner animation="border" variant="danger" />
                  <p className="mt-2">Loading projects...</p>
                </div>
              ) : (
                <ListGroup className="project-list mb-4">
                  {existingProjects.length > 0 ? (
                    existingProjects.map((project) => (
                      <ListGroup.Item key={project.id} className="project-list-item d-flex justify-content-between align-items-center">
                        <span>{project.title}</span>
                        <div className="d-flex gap-2">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="edit-button"
                            onClick={() => handleEditClick(project)}
                            disabled={loading}
                          >
                            <FaEdit />
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            className="remove-button"
                            onClick={() => handleRemoveProject(project.id)}
                            disabled={loading}
                          >
                            <FaMinus />
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item className="text-center text-white">
                      No projects yet. Add your first project above!
                    </ListGroup.Item>
                  )}
                </ListGroup>
              )}
            </Form>
          </div>
        </Tab>

        <Tab eventKey="bio" title="Bio">
          <div className="mt-4">
            <h2 className="text-white mb-3">Edit Bio</h2>
            <p className="text-white-50 mb-4">
              Type your bio below. Use the "Highlight Text" button to make selected text yellow, or type HTML manually.
            </p>
            <Form>
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label style={{ color: 'white', marginBottom: 0 }}>Bio Text</Form.Label>
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="admin-button-outline"
                    onClick={() => {
                      const textarea = bioTextareaRef.current;
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const selectedText = bioText.substring(start, end);
                        if (selectedText) {
                          const newText = bioText.substring(0, start) + 
                            `<span class="yellow">${selectedText}</span>` + 
                            bioText.substring(end);
                          setBioText(newText);
                          // Restore cursor position after a brief delay
                          setTimeout(() => {
                            const newCursorPos = start + `<span class="yellow">`.length + selectedText.length + `</span>`.length;
                            textarea.setSelectionRange(newCursorPos, newCursorPos);
                            textarea.focus();
                          }, 10);
                        } else {
                          setError('Please select some text first to highlight it');
                          setTimeout(() => setError(''), 3000);
                        }
                      }
                    }}
                  >
                    Highlight Selected Text
                  </Button>
                </div>
                <Form.Control
                  ref={bioTextareaRef}
                  as="textarea"
                  rows={30}
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="admin-input bio-textarea"
                  style={{ fontFamily: 'monospace', fontSize: '14px' }}
                />
              </Form.Group>
              
              {/* Live Preview */}
              <div className="mb-4" style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                border: '2px solid #ffffff', 
                borderRadius: '5px', 
                padding: '20px',
                minHeight: '200px'
              }}>
                <h5 className="text-white mb-3" style={{ borderBottom: '2px solid #ffffff', paddingBottom: '10px' }}>
                  Live Preview:
                </h5>
                <div 
                  className="text-white"
                  style={{ 
                    lineHeight: '1.8',
                    fontSize: '16px',
                    minHeight: '150px'
                  }}
                  dangerouslySetInnerHTML={{ __html: bioText || '<em style="opacity: 0.5;">Start typing to see preview...</em>' }}
                />
              </div>
              
              <div className="d-flex gap-2">
                <Button 
                  variant="danger" 
                  className="admin-button"
                  onClick={handleBioSave}
                  disabled={loading || bioText === currentBio}
                >
                  {loading ? <><Spinner size="sm" className="me-2" />Saving...</> : 'Save Bio'}
                </Button>
                <Button 
                  variant="outline-secondary" 
                  className="admin-button-outline"
                  onClick={() => setBioText(currentBio)}
                  disabled={bioText === currentBio}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </div>
        </Tab>

        <Tab eventKey="resume" title="Resume">
          <div className="mt-4">
            <h2 className="text-white mb-3">Manage Resume</h2>
            {currentResume && (
              <div className="mb-4 p-3" style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                border: '2px solid #ffffff', 
                borderRadius: '5px' 
              }}>
                <h5 className="text-white mb-3" style={{ borderBottom: '2px solid #ffffff', paddingBottom: '10px' }}>
                  Current Resume
                </h5>
                <p className="text-white mb-2">
                  <strong>File:</strong> {currentResume.file_name}
                </p>
                <p className="text-white-50 mb-3">
                  <small>Last updated: {new Date(currentResume.updated_at).toLocaleString()}</small>
                </p>
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-light" 
                    size="sm" 
                    className="admin-button-outline"
                    href={currentResume.file_url}
                    target="_blank"
                  >
                    View Resume
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="sm" 
                    className="admin-button-outline"
                    href={currentResume.file_url}
                    download={currentResume.file_name}
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
            )}
            <Form>
              <Form.Group className="mb-4">
                <Form.Label style={{ color: 'white' }}>Upload New Resume (PDF)</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="admin-input"
                />
                {resumeFile && (
                  <Form.Text className="text-white-50">
                    Selected: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Form.Text>
                )}
              </Form.Group>
              <Button 
                variant="danger" 
                className="admin-button"
                onClick={handleResumeSave}
                disabled={loading || !resumeFile}
              >
                {loading ? <><Spinner size="sm" className="me-2" />Uploading...</> : 'Upload Resume'}
              </Button>
            </Form>
          </div>
        </Tab>
      </Tabs>

      {/* Edit Project Modal */}
      <Modal 
        show={showEditModal} 
        onHide={() => setShowEditModal(false)}
        className="edit-modal"
        centered
        size="lg"
      >
        <Modal.Header closeButton className="edit-modal-header">
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-modal-body">
          {editingProject && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Project Image (leave empty to keep current)</Form.Label>
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
                  type="url"
                  value={editingProject.github_url || ''}
                  onChange={(e) => setEditingProject(prev => ({...prev, github_url: e.target.value}))}
                  className="admin-input"
                  placeholder="https://github.com/username/repo"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Live Demo Link (Optional)</Form.Label>
                <Form.Control
                  type="url"
                  value={editingProject.live_url || ''}
                  onChange={(e) => setEditingProject(prev => ({...prev, live_url: e.target.value}))}
                  className="admin-input"
                  placeholder="https://your-demo-site.com"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="edit-modal-footer">
          <Button variant="secondary" onClick={() => setShowEditModal(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave} disabled={loading}>
            {loading ? <><Spinner size="sm" className="me-2" />Saving...</> : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminDashboard;
