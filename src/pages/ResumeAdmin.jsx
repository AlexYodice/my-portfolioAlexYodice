import React from 'react';
import { useNavigate } from 'react-router-dom';

// This component is now deprecated - redirecting to main AdminDashboard
function ResumeAdmin() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to main admin dashboard with resume tab active
    navigate('/admin-dashboard', { state: { tab: 'resume' }, replace: true });
  }, [navigate]);

  return null;
}

export default ResumeAdmin;
