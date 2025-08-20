import React from 'react';
import {
  Home,
  FileText,
  DollarSign,
  Users,
  Settings,
  Activity,
  Shield,
  Database,
  Search,
  Layers,
  BarChart3,
  FileCheck,
  Wallet,
  AlertTriangle,
  TrendingUp,
  Globe,
  Lock,
  Bell,
  LogOut
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Admin Dashboard',
      icon: Home,
      badge: null,
      description: 'Overview & Analytics'
    },
    {
      id: 'documents',
      label: 'Document Management',
      icon: FileText,
      badge: '24',
      description: 'Trade Documents & Verification'
    },
    {
      id: 'loans',
      label: 'Loan Management',
      icon: DollarSign,
      badge: '8',
      description: 'Loan Requests & Approvals'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      badge: '156',
      description: 'Importers & Exporters'
    },
    {
      id: 'blockchain',
      label: 'Blockchain Monitor',
      icon: Activity,
      badge: 'LIVE',
      description: 'Ethereum & ICP Transactions'
    },
    {
      id: 'acid',
      label: 'ACID Verification',
      icon: Search,
      badge: '12',
      description: 'NAFEZA System Integration'
    },
    {
      id: 'nfts',
      label: 'NFT Management',
      icon: Layers,
      badge: '45',
      description: 'Minted Document NFTs'
    },
    {
      id: 'audit',
      label: 'Audit Logs',
      icon: FileCheck,
      badge: '1.2K',
      description: 'System Activity Tracking'
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      badge: null,
      description: 'Financial & Operational Reports'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      badge: null,
      description: 'Platform Configuration'
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleLogout = () => {
    // Handle admin logout
    console.log('Admin logout');
  };

  return (
    <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
      {/* Logo Section */}
      <div className="admin-sidebar-logo-section">
        <div className="admin-sidebar-logo-container">
          <div className="admin-sidebar-logo-icon">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="admin-sidebar-logo-text">
            <h1>CargoTrace</h1>
            <p>Admin Panel</p>
          </div>
        </div>

        {/* System Status */}
        <div className="admin-sidebar-status">
          <div className="admin-sidebar-status-indicator">
            <div className="admin-sidebar-status-dot"></div>
            <span className="admin-sidebar-status-text">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`admin-sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabChange(item.id)}
              title={item.description}
            >
              <div className="admin-sidebar-nav-icon">
                <Icon className="w-5 h-5" />
              </div>
              <div className="admin-sidebar-nav-content">
                <span className="admin-sidebar-nav-label">{item.label}</span>
                <span className="admin-sidebar-nav-description">{item.description}</span>
              </div>
              {item.badge && (
                <span className={`admin-sidebar-nav-badge ${item.badge === 'LIVE' ? 'live' : ''}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="admin-sidebar-stats">
        <div className="admin-sidebar-stats-header">
          <TrendingUp className="w-4 h-4" />
          <span>Quick Stats</span>
        </div>
        <div className="admin-sidebar-stats-grid">
          <div className="admin-sidebar-stat-item">
            <div className="admin-sidebar-stat-value">$2.4M</div>
            <div className="admin-sidebar-stat-label">Total Loans</div>
          </div>
          <div className="admin-sidebar-stat-item">
            <div className="admin-sidebar-stat-value">156</div>
            <div className="admin-sidebar-stat-label">Active Users</div>
          </div>
          <div className="admin-sidebar-stat-item">
            <div className="admin-sidebar-stat-value">45</div>
            <div className="admin-sidebar-stat-label">NFTs Minted</div>
          </div>
          <div className="admin-sidebar-stat-item">
            <div className="admin-sidebar-stat-value">98.5%</div>
            <div className="admin-sidebar-stat-label">Uptime</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="admin-sidebar-footer">
        <div className="admin-sidebar-footer-actions">
          <button className="admin-sidebar-footer-action">
            <Bell size={16} />
            <span>Notifications</span>
          </button>
          <button className="admin-sidebar-footer-action">
            <Globe size={16} />
            <span>Network Status</span>
          </button>
        </div>

        <div className="admin-sidebar-footer-user">
          <div className="admin-sidebar-user-info">
            <div className="admin-sidebar-user-avatar">
              <Shield className="w-6 h-6" />
            </div>
            <div className="admin-sidebar-user-details">
              <span className="admin-sidebar-user-name">Admin User</span>
              <span className="admin-sidebar-user-role">Super Admin</span>
            </div>
          </div>
          <button 
            className="admin-sidebar-logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={16} />
          </button>
        </div>

        <div className="admin-sidebar-footer-info">
          <div className="admin-sidebar-version">
            <span>v2.1.0</span>
            <span>•</span>
            <span>Production</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
