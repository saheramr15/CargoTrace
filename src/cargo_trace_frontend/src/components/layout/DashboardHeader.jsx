import React from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Menu,
  Settings,
  LogOut
} from 'lucide-react';

const DashboardHeader = ({ activeTab, onMenuToggle }) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'documents':
        return 'Documents';
      case 'loans':
        return 'Loan Requests';
      case 'repayment':
        return 'Repayment';
      default:
        return 'Dashboard';
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Monitor your trade finance portfolio and activities';
      case 'documents':
        return 'Manage CargoX documents and ACID verification';
      case 'loans':
        return 'Request and manage ICRC-1 financing';
      case 'repayment':
        return 'Track loan repayments and payments';
      default:
        return 'Monitor your trade finance portfolio and activities';
    }
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content">
        <div className="dashboard-header-info">
          {/* Mobile Menu Toggle */}
          <button 
            className="dashboard-mobile-menu-toggle"
            onClick={onMenuToggle}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title and Description */}
          <div>
            <h2>{getTabTitle()}</h2>
            <p>{getTabDescription()}</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="dashboard-header-actions">
          {/* Search */}
          <button className="dashboard-header-button">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="dashboard-header-button notification">
            <Bell className="w-5 h-5" />
          </button>

          {/* Settings */}
          <button className="dashboard-header-button">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Menu */}
          <div className="dashboard-header-user-menu">
            <button className="dashboard-header-avatar">
              <User className="w-5 h-5 text-white" />
            </button>
            
            {/* User Dropdown Menu */}
            <div className="dashboard-header-dropdown">
              <div className="dashboard-header-dropdown-item">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </div>
              <div className="dashboard-header-dropdown-item">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
              <div className="dashboard-header-dropdown-divider"></div>
              <div className="dashboard-header-dropdown-item" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 