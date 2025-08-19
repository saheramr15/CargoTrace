import React from 'react';
import { Search, Bell, Users, Menu } from 'lucide-react';

const DashboardHeader = ({ activeTab, onMenuToggle }) => {
  const getTabInfo = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          description: 'Monitor your trade finance portfolio and activities'
        };
      case 'documents':
        return {
          title: 'Documents',
          description: 'Manage document transfers and submissions'
        };
      case 'loans':
        return {
          title: 'Loan Requests',
          description: 'Request and manage trade finance loans'
        };
      case 'repayment':
        return {
          title: 'Repayments',
          description: 'Track and manage loan repayments'
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Monitor your trade finance portfolio and activities'
        };
    }
  };

  const tabInfo = getTabInfo();

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content">
        <div className="dashboard-header-info">
          <button 
            className="dashboard-mobile-menu-toggle"
            onClick={onMenuToggle}
            aria-label="Toggle mobile menu"
          >
            <Menu style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
          <div>
            <h2>{tabInfo.title}</h2>
            <p>{tabInfo.description}</p>
          </div>
        </div>
        <div className="dashboard-header-actions">
          <button className="dashboard-header-button">
            <Search style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
          <button className="dashboard-header-button notification">
            <Bell style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
          <div className="dashboard-header-avatar">
            <Users style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 