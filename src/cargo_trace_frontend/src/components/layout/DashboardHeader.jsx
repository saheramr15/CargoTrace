import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  User, 
  ChevronDown,
  Activity,
  Shield,
  Network,
  Globe,
  Menu,
  Shield as AdminIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../auth';
const DashboardHeader = ({ activeTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
 
const { globalPrincipal, setGlobalPrincipal } = useAuth(); 
  console.log("DashboardHeader Principal:", globalPrincipal);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New CargoX document verified', time: '2 min ago', type: 'success' },
    { id: 2, message: 'ICRC-1 loan approved', time: '5 min ago', type: 'success' },
    { id: 3, message: 'Chain Fusion bridge active', time: '10 min ago', type: 'info' }
  ]);

  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getTabInfo = (tab) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          description: 'Overview of your CargoTrace Finance portfolio'
        };
      case 'documents':
        return {
          title: 'Documents',
          description: 'Manage CargoX documents and ACID verification'
        };
      case 'loans':
        return {
          title: 'Loan Requests',
          description: 'ICRC-1 stable token loan management'
        };
      case 'repayment':
        return {
          title: 'Repayment',
          description: 'Track and manage loan repayments'
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Overview of your CargoTrace Finance portfolio'
        };
    }
  };

  const tabInfo = getTabInfo(activeTab);

  
  const handleLogout = async () => {
    try {
      await logout();                        // end Internet Identity session
      setGlobalPrincipal(null);              // clear principal from context
      
      navigate('/', { replace: true });
      window.location.reload(); 
                      // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSwitchToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-content">
        {/* Left Section - Mobile Menu & Tab Info */}
        <div className="dashboard-header-info">
          <button 
            className="dashboard-mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
          
          <div className="dashboard-header-tab-info">
            <h2 className="dashboard-header-title">{tabInfo.title}</h2>
            <p className="dashboard-header-description">{tabInfo.description}</p>
          </div>
        </div>

        {/* Right Section - Actions & User Menu */}
        <div className="dashboard-header-actions">
          {/* Admin Toggle Button */}
          <button 
            className="dashboard-header-admin-toggle"
            onClick={handleSwitchToAdmin}
            title="Switch to Admin Panel"
          >
            <AdminIcon size={16} />
            <span>Admin</span>
          </button>

          {/* System Status Indicators */}
          <div className="dashboard-header-status-indicators">
            <div className="dashboard-header-status-item">
              <div className="dashboard-header-status-dot online"></div>
              <span className="dashboard-header-status-label">CargoX</span>
            </div>
            <div className="dashboard-header-status-item">
              <div className="dashboard-header-status-dot online"></div>
              <span className="dashboard-header-status-label">NAFEZA</span>
            </div>
            <div className="dashboard-header-status-item">
              <div className="dashboard-header-status-dot online"></div>
              <span className="dashboard-header-status-label">ICP</span>
            </div>
            <div className="dashboard-header-status-item">
              <div className="dashboard-header-status-dot online"></div>
              <span className="dashboard-header-status-label">Bridge</span>
            </div>
          </div>

          {/* Search */}
          <div className="dashboard-header-search">
            <Search size={16} className="dashboard-header-search-icon" />
            <input
              type="text"
              placeholder="Search documents, loans, or transactions..."
              className="dashboard-header-search-input"
            />
          </div>

          {/* Notifications */}
          <div className="dashboard-header-notifications" ref={notificationsRef}>
            <button 
              className="dashboard-header-button notification"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="dashboard-header-notification-badge">
                  {notifications.length}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="dashboard-header-notifications-dropdown">
                <div className="dashboard-header-notifications-header">
                  <h4>Notifications</h4>
                  <button className="dashboard-header-notifications-clear">Clear all</button>
                </div>
                <div className="dashboard-header-notifications-list">
                  {notifications.map(notification => (
                    <div key={notification.id} className="dashboard-header-notification-item">
                      <div className={`dashboard-header-notification-dot ${notification.type}`}></div>
                      <div className="dashboard-header-notification-content">
                        <p className="dashboard-header-notification-message">{notification.message}</p>
                        <span className="dashboard-header-notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="dashboard-header-user-menu" ref={userMenuRef}>
            <button 
              className="dashboard-header-avatar"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <User size={20} color="white" />
              <ChevronDown size={14} color="white" />
            </button>
            
            {isUserMenuOpen && (
              <div className="dashboard-header-dropdown">
                <div className="dashboard-header-dropdown-header">
                  <div className="dashboard-header-user-info">
                    <div className="dashboard-header-user-avatar">
                      <User size={16} color="white" />
                    </div>
                    <div>
                      <p className="dashboard-header-user-name">Trade Partner</p>
                      <p className="dashboard-header-user-email">{globalPrincipal}</p>

                    </div>
                  </div>
                </div>
                
                <div className="dashboard-header-dropdown-divider"></div>
                
                <div className="dashboard-header-dropdown-item">
                  <User size={16} />
                  <span>Profile</span>
                </div>
                
                <div className="dashboard-header-dropdown-item">
                  <Settings size={16} />
                  <span>Settings</span>
                </div>
                
                <div className="dashboard-header-dropdown-item">
                  <Activity size={16} />
                  <span>Activity Log</span>
                </div>
                
                <div className="dashboard-header-dropdown-divider"></div>
                
                <div className="dashboard-header-dropdown-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader; 