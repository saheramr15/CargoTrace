import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  DollarSign, 
  CreditCard,
  Users,
  Settings,
  LogOut,
  Anchor,
  Link
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'System overview'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      description: 'CargoX verification'
    },
    {
      id: 'customs',
      label: 'Customs Integration',
      icon: Link,
      description: 'ACID mapping & verification'
    },
    {
      id: 'loans',
      label: 'Loans',
      icon: DollarSign,
      description: 'Lending operations'
    },
    {
      id: 'repayments',
      label: 'Repayments',
      icon: CreditCard,
      description: 'Payment tracking'
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      description: 'User management'
    }
  ];

  const handleLogout = () => {
    console.log('Admin logout');
  };

  return (
    <div className={`admin-sidebar ${isMobileMenuOpen ? 'admin-sidebar-open' : ''}`}>
      {/* Logo Section */}
      <div className="admin-sidebar-logo">
        <div className="admin-sidebar-logo-icon">
          <Anchor size={24} />
        </div>
        <div className="admin-sidebar-logo-text">
          <h2>CargoTrace</h2>
          <span>Finance Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        <ul>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  className={`admin-sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <IconComponent size={20} />
                  <div className="admin-sidebar-nav-content">
                    <span className="admin-sidebar-nav-label">{item.label}</span>
                    <span className="admin-sidebar-nav-description">{item.description}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="admin-sidebar-footer">
        <button className="admin-sidebar-footer-btn">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="admin-sidebar-footer-btn logout">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
