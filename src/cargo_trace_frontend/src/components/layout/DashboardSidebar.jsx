import React from 'react';
import {
  Home,
  FileText,
  DollarSign,
  CreditCard,
  Wallet,
  Menu,
  Activity,
  Shield,
  Network,
  Globe,
  BarChart3,
  Settings,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

const DashboardSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Overview & Analytics',
      badge: null
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      description: 'CargoX & ACID Management',
      badge: '12'
    },
    {
      id: 'loans',
      label: 'Loan Requests',
      icon: DollarSign,
      description: 'ICRC-1 Financing',
      badge: '3'
    },
    {
      id: 'repayment',
      label: 'Repayment',
      icon: CreditCard,
      description: 'Loan Management',
      badge: null
    }
  ];

  const systemStatus = [
    {
      name: 'CargoX Integration',
      status: 'online',
      description: 'Ethereum blockchain documents'
    },
    {
      name: 'NAFEZA System',
      status: 'online',
      description: 'Egyptian customs verification'
    },
    {
      name: 'ICP Blockchain',
      status: 'online',
      description: 'NFT minting & smart contracts'
    },
    {
      name: 'Chain Fusion',
      status: 'online',
      description: 'Ethereum ↔ ICP bridge'
    }
  ];

  const getStatusColor = (status) => {
    return status === 'online' ? '#10b981' : '#ef4444';
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-logo-section">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo-icon">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="sidebar-logo-text">
            <h1>CargoTrace</h1>
            <p>Trade Finance</p>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="sidebar-status-indicator">
          <div className="sidebar-status-dot"></div>
          <span className="sidebar-status-text">LIVE</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabChange(item.id)}
            >
              <Icon className="sidebar-nav-icon" />
              <span className="sidebar-nav-label">{item.label}</span>
              {item.badge && (
                <span className="sidebar-nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="sidebar-system-status">
        <h3 className="sidebar-section-title">
          <Activity size={16} />
          System Status
        </h3>
        <div className="sidebar-status-list">
          {systemStatus.map((system, index) => (
            <div key={index} className="sidebar-status-item">
              <div className="sidebar-status-info">
                <div className="sidebar-status-header">
                  <span className="sidebar-status-name">{system.name}</span>
                  <div
                    className="sidebar-system-status-indicator"
                    style={{ backgroundColor: getStatusColor(system.status) }}
                  ></div>
                </div>
                <p className="sidebar-status-description">{system.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Section */}
      <div className="sidebar-wallet-section">
        <div className="sidebar-wallet-card">
          <div className="sidebar-wallet-header">
            <div className="sidebar-wallet-icon">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="sidebar-wallet-title">ICP Wallet</span>
          </div>

          <div className="sidebar-wallet-amount">10.248 ICP</div>

          <div className="sidebar-wallet-status">
            <div className="sidebar-wallet-indicator"></div>
            <span className="sidebar-wallet-status-text">Connected</span>
          </div>

          <div className="sidebar-wallet-value">= $45,234 USD</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="sidebar-quick-actions">
        <h3 className="sidebar-section-title">
          <BarChart3 size={16} />
          Quick Actions
        </h3>
        <div className="sidebar-actions">
          <button className="sidebar-action">
            <FileText size={16} />
            <span>Upload Document</span>
          </button>
          <button className="sidebar-action">
            <DollarSign size={16} />
            <span>Request Loan</span>
          </button>
          <button className="sidebar-action">
            <CreditCard size={16} />
            <span>Make Payment</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-actions">
          <button className="sidebar-footer-action">
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <button className="sidebar-footer-action">
            <HelpCircle size={16} />
            <span>Help</span>
          </button>
        </div>

        <div className="sidebar-footer-info">
          <div className="sidebar-footer-version">
            <span>v2.1.0</span>
          </div>
          <div className="sidebar-footer-links">
            <a href="#" className="sidebar-footer-link">
              <ExternalLink size={12} />
              <span>Documentation</span>
            </a>
            <a href="#" className="sidebar-footer-link">
              <ExternalLink size={12} />
              <span>Support</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar; 