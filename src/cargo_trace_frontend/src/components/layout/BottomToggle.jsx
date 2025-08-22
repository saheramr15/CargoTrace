import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, User } from 'lucide-react';

const BottomToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSwitchToAdmin = () => {
    navigate('/admin');
  };

  const handleSwitchToUser = () => {
    navigate('/dashboard');
  };

  // Don't show toggle on login page
  if (location.pathname === '/login' || location.pathname === '/') {
    return null;
  }

  return (
    <div className="bottom-toggle-container">
      {location.pathname.startsWith('/dashboard') && (
        <button 
          className="bottom-toggle-button admin"
          onClick={handleSwitchToAdmin}
          title="Switch to Admin Panel"
        >
          <Shield size={12} />
          <span>Admin</span>
        </button>
      )}
      
      {location.pathname.startsWith('/admin') && (
        <button 
          className="bottom-toggle-button user"
          onClick={handleSwitchToUser}
          title="Switch to User Dashboard"
        >
          <User size={12} />
          <span>User</span>
        </button>
      )}
    </div>
  );
};

export default BottomToggle;
