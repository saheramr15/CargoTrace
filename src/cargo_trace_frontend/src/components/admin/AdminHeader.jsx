import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const AdminHeader = ({ activeTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'New Document Verified',
      message: 'Bill of Lading #BL-2024-001 has been verified and NFT minted successfully',
      time: '2 minutes ago',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'warning',
      title: 'Loan Request Pending',
      message: 'Loan request #LR-2024-008 requires manual approval from admin',
      time: '15 minutes ago',
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'Blockchain monitoring system updated to v2.1.1 with improved performance',
      time: '1 hour ago',
      icon: Clock
    },
    {
      id: 4,
      type: 'success',
      title: 'ACID Validation Complete',
      message: 'NAFEZA integration processed 45 new ACID numbers successfully',
      time: '2 hours ago',
      icon: CheckCircle
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    console.log('Admin logout');
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Admin Dashboard',
      documents: 'Document Management',
      loans: 'Loan Management',
      repayments: 'Repayment Tracking',
      users: 'User Management',
      blockchain: 'Blockchain Monitor',
      acid: 'ACID Verification',
      nfts: 'NFT Management',
      audit: 'Audit Logs',
      reports: 'Reports & Analytics',
      settings: 'System Settings'
    };
    return titles[activeTab] || 'Admin Panel';
  };

  const getPageDescription = () => {
    const descriptions = {
      dashboard: 'Monitor and control all CargoTrace operations',
      documents: 'Manage trade documents, verification status, and blockchain integration',
      loans: 'Process loan requests and manage lending operations',
      repayments: 'Track payment schedules and manage repayment workflows',
      users: 'Manage platform users, roles, and permissions',
      blockchain: 'Monitor blockchain integrations and chain fusion operations',
      acid: 'Manage Advanced Cargo Information Declaration verification',
      nfts: 'Manage digital tokens and blockchain representations',
      audit: 'System activity and security audit trail',
      reports: 'Comprehensive analytics and reporting dashboard',
      settings: 'Configure system parameters and integrations'
    };
    return descriptions[activeTab] || 'Manage and monitor the CargoTrace Finance platform';
  };

  return (
    <header className="admin-header">
      {/* Mobile Menu Toggle */}
      <button
        className="admin-header-mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Page Title */}
      <div className="admin-header-title">
        <h1>{getPageTitle()}</h1>
        <p className="admin-header-subtitle">
          {getPageDescription()}
        </p>
      </div>

      {/* Search Bar */}
      <div className="admin-header-search">
        <form onSubmit={handleSearch} className="admin-search-form">
          <div className="admin-search-input-wrapper">
            <Search className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search documents, users, loans, ACID numbers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
            <button type="submit" className="admin-search-button">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Header Actions */}
      <div className="admin-header-actions">
        {/* Quick Actions */}
        <div className="admin-header-quick-actions">
          <button className="admin-header-action-btn" title="Refresh Data">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="admin-header-action-btn" title="Export Data">
            <Download className="w-5 h-5" />
          </button>
          <button className="admin-header-action-btn" title="Advanced Filters">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications */}
        <div className="admin-header-notifications">
          <button
            className="admin-header-notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" />
            <span className="admin-header-notification-badge">{notifications.length}</span>
          </button>

          {showNotifications && (
            <div className="admin-header-notification-dropdown">
              <div className="admin-header-notification-header">
                <h3>Notifications</h3>
                <button className="admin-header-notification-clear">Clear All</button>
              </div>
              <div className="admin-header-notification-list">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div key={notification.id} className={`admin-header-notification-item ${notification.type}`}>
                      <div className="admin-header-notification-icon">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="admin-header-notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className="admin-header-notification-time">{notification.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="admin-header-profile">
          <div className="admin-header-profile-info">
            <div className="admin-header-profile-avatar">
              <User className="w-6 h-6" />
            </div>
            <div className="admin-header-profile-details">
              <span className="admin-header-profile-name">Admin User</span>
              <span className="admin-header-profile-role">Super Administrator</span>
            </div>
          </div>
          <div className="admin-header-profile-actions">
            <button className="admin-header-profile-btn" title="Settings">
              <Settings className="w-4 h-4" />
            </button>
            <button 
              className="admin-header-profile-btn" 
              title="Logout"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
