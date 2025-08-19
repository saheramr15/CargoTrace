import React from 'react';
import { Home, FileText, DollarSign, CreditCard, Ship, Wallet } from 'lucide-react';

const DashboardSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'loans', label: 'Loan Requests', icon: DollarSign },
    { id: 'repayment', label: 'Repayments', icon: CreditCard },
  ];

  return (
    <div className={`dashboard-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-logo-section">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo-icon">
            <Ship style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
          </div>
          <div className="sidebar-logo-text">
            <h1>CargoTrace</h1>
            <p>Trade Finance</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-list">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <item.icon className="sidebar-nav-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Wallet Section */}
      <div className="sidebar-wallet-section">
        <div className="sidebar-wallet-card">
          <div className="sidebar-wallet-header">
            <div className="sidebar-wallet-icon">
              <Wallet style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
            </div>
            <span className="sidebar-wallet-title">ICP Wallet</span>
          </div>
          <p className="sidebar-wallet-amount">10.248 ICP</p>
          <div className="sidebar-wallet-status">
            <div className="sidebar-wallet-indicator"></div>
            <span className="sidebar-wallet-status-text">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar; 