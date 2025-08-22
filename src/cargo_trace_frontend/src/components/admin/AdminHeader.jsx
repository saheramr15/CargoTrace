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
  RefreshCw,
  ChevronDown,
  ExternalLink,
  Shield,
  Activity
} from 'lucide-react';

const AdminHeader = ({ activeTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'New Document Verified',
      message: 'Bill of Lading #BL-2024-001 has been verified and NFT minted successfully on Ethereum and ICP',
      time: '2 minutes ago',
      icon: CheckCircle,
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Loan Request Pending',
      message: 'Loan request #LR-2024-008 requires manual approval from admin - Amount: $45,000',
      time: '15 minutes ago',
      icon: AlertTriangle,
      priority: 'high'
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update Complete',
      message: 'Blockchain monitoring system updated to v2.1.1 with improved performance and security',
      time: '1 hour ago',
      icon: Shield,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'success',
      title: 'ACID Validation Complete',
      message: 'NAFEZA integration processed 45 new ACID numbers successfully - All documents synced',
      time: '2 hours ago',
      icon: CheckCircle,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'info',
      title: 'Chain Fusion Status',
      message: 'Ethereum-ICP bridge operating normally - 156 transactions processed in last hour',
      time: '3 hours ago',
      icon: Activity,
      priority: 'low'
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
      dashboard: 'Dashboard Overview',
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
      dashboard: 'Monitor and control all CargoTrace Finance operations in real-time',
      documents: 'Manage trade documents, verification status, and blockchain integration',
      loans: 'Process loan requests and manage lending operations with blockchain security',
      repayments: 'Track payment schedules and manage repayment workflows',
      users: 'Manage platform users, roles, and permissions with advanced security',
      blockchain: 'Monitor blockchain integrations and chain fusion operations',
      acid: 'Manage Advanced Cargo Information Declaration verification with NAFEZA',
      nfts: 'Manage digital tokens and blockchain representations of documents',
      audit: 'System activity and security audit trail with detailed logging',
      reports: 'Comprehensive analytics and reporting dashboard with real-time data',
      settings: 'Configure system parameters, integrations, and security settings'
    };
    return descriptions[activeTab] || 'Manage and monitor the CargoTrace Finance platform';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <header className="admin-header">
      {/* Mobile Menu Toggle */}
      <button
        className="admin-header-mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Page Title and Breadcrumb */}
      <div className="admin-header-title">
        <div className="admin-header-breadcrumb">
          <span className="admin-header-breadcrumb-item">CargoTrace</span>
          <span className="admin-header-breadcrumb-separator">/</span>
          <span className="admin-header-breadcrumb-item active">{getPageTitle()}</span>
        </div>
        <h1>{getPageTitle()}</h1>
        <p className="admin-header-subtitle">
          {getPageDescription()}
        </p>
      </div>

      {/* Enhanced Search Bar */}
      <div className="admin-header-search">
        <form onSubmit={handleSearch} className="admin-search-form">
          <div className="admin-search-input-wrapper">
            <Search className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search documents, users, loans, ACID numbers, NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
            <div className="admin-search-actions">
              <button type="button" className="admin-search-filter-btn" title="Advanced Search">
                <Filter className="w-4 h-4" />
              </button>
              <button type="submit" className="admin-search-button">
                Search
              </button>
            </div>
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
          <button className="admin-header-action-btn" title="System Status">
            <Activity className="w-5 h-5" />
          </button>
        </div>

        {/* Enhanced Notifications */}
        <div className="admin-header-notifications">
          <button
            className="admin-header-notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="admin-header-notification-badge">{notifications.length}</span>
          </button>

          {showNotifications && (
            <div className="admin-header-notification-dropdown">
              <div className="admin-header-notification-header">
                <h3>Notifications</h3>
                <div className="admin-header-notification-actions">
                  <button className="admin-header-notification-mark-all">Mark All Read</button>
                  <button className="admin-header-notification-clear">Clear All</button>
                </div>
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
                        <div className="admin-header-notification-header-row">
                          <h4>{notification.title}</h4>
                          <span className={`admin-header-notification-priority ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                        <p>{notification.message}</p>
                        <div className="admin-header-notification-footer">
                          <span className="admin-header-notification-time">{notification.time}</span>
                          <button className="admin-header-notification-action">View Details</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="admin-header-notification-footer">
                <button className="admin-header-notification-view-all">
                  View All Notifications
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Admin Profile */}
        <div className="admin-header-profile">
          <div 
            className="admin-header-profile-info"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="admin-header-profile-avatar">
              <User className="w-6 h-6" />
            </div>
            <div className="admin-header-profile-details">
              <span className="admin-header-profile-name">Admin User</span>
              <span className="admin-header-profile-role">Super Administrator</span>
            </div>
            <ChevronDown className="admin-header-profile-chevron" />
          </div>
          
          {showProfileMenu && (
            <div className="admin-header-profile-dropdown">
              <div className="admin-header-profile-menu-item">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </div>
              <div className="admin-header-profile-menu-item">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
              <div className="admin-header-profile-menu-divider"></div>
              <div className="admin-header-profile-menu-item logout" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
