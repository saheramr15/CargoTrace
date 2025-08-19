import React from 'react';
import {
  Home,
  FileText,
  DollarSign,
  CreditCard,
  Wallet,
  Menu
} from 'lucide-react';

const DashboardSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Overview & Analytics'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      description: 'CargoX & ACID Management'
    },
    {
      id: 'loans',
      label: 'Loan Requests',
      icon: DollarSign,
      description: 'ICRC-1 Financing'
    },
    {
      id: 'repayment',
      label: 'Repayment',
      icon: CreditCard,
      description: 'Loan Management'
    }
  ];

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
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="sidebar-nav-icon" />
              <span className="sidebar-nav-label">{item.label}</span>
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
    </aside>
  );
};

// Shield icon component since it's not in lucide-react
const Shield = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
  </svg>
);

export default DashboardSidebar; 