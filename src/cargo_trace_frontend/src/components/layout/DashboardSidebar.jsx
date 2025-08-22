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
  Settings,
  HelpCircle
} from 'lucide-react';

const DashboardSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      badge: null
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      badge: '12'
    },
    {
      id: 'loans',
      label: 'Loan Requests',
      icon: DollarSign,
      badge: '3'
    },
    {
      id: 'repayment',
      label: 'Repayment',
      icon: CreditCard,
      badge: null
    }
  ];

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

      {/* Wallet Section */}
      <div className="sidebar-wallet-section">
        <div className="sidebar-wallet-card">
          <div className="sidebar-wallet-header">
            <div className="sidebar-wallet-icon">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="sidebar-wallet-title">CargoTrace Wallet</span>
          </div>
            <div className="sidebar-wallet-title">Active Loan</div>
              <div className="sidebar-wallet-amount">0.00 USD</div>
          

             <div className="sidebar-wallet-title">Repayment Due</div>
           <div className="sidebar-wallet-amount">0.00 USD</div>

          <div className="sidebar-wallet-status">
            <div className="sidebar-wallet-indicator"></div>
            <span className="sidebar-wallet-status-text">Connected</span>
          </div>

          {/* <div className="sidebar-wallet-value">= $45,234 USD</div> */}
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
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar; 