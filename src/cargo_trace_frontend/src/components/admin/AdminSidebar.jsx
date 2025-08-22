import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  DollarSign, 
  CreditCard,
  Users,
  Settings,
  LogOut,
  User,
  Shield,
  Database,
  Globe,
  Search,
  BarChart3,
  Activity,
  Zap,
  Lock,
  Eye,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  ExternalLink,
  BarChart,
  FileCheck,
  Building,
  Truck,
  Anchor
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'System overview',
      badge: null
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      description: 'CargoX verification',
      badge: '12'
    },
    {
      id: 'loans',
      label: 'Loans',
      icon: DollarSign,
      description: 'Lending operations',
      badge: '8'
    },
    {
      id: 'repayments',
      label: 'Repayments',
      icon: CreditCard,
      description: 'Payment tracking',
      badge: '15'
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      description: 'User management',
      badge: null
    },
    {
      id: 'blockchain',
      label: 'Blockchain',
      icon: Database,
      description: 'Chain fusion monitor',
      badge: null
    },
    {
      id: 'acid',
      label: 'ACID Verification',
      icon: FileCheck,
      description: 'NAFEZA integration',
      badge: '5'
    },
    {
      id: 'nfts',
      label: 'NFTs',
      icon: Zap,
      description: 'Token management',
      badge: null
    },
    {
      id: 'audit',
      label: 'Audit Logs',
      icon: Eye,
      description: 'Security trail',
      badge: null
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      description: 'Analytics dashboard',
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'System configuration',
      badge: null
    }
  ];

  const systemStats = [
    {
      label: 'Active Users',
      value: '1,247',
      urgent: false
    },
    {
      label: 'Pending Loans',
      value: '23',
      urgent: true
    },
    {
      label: 'Documents Today',
      value: '156',
      urgent: false
    },
    {
      label: 'System Health',
      value: '99.8%',
      urgent: false
    }
  ];

  const serviceStatus = [
    { name: 'Ethereum', status: 'online' },
    { name: 'ICP', status: 'online' },
    { name: 'CargoX', status: 'online' },
    { name: 'NAFEZA', status: 'online' }
  ];

  const handleLogout = () => {
    console.log('Admin logout');
  };

  return (
    <aside className={`admin-sidebar ${isMobileMenuOpen ? 'admin-sidebar-open' : ''}`}>
      {/* Logo Section - Fixed */}
      <div className="admin-sidebar-logo">
        <div className="admin-sidebar-logo-icon">
          <Anchor className="w-6 h-6" />
        </div>
        <div className="admin-sidebar-logo-text">
          <h2>CargoTrace</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      {/* System Status - Fixed */}
      <div className="admin-sidebar-status">
        <div className="admin-sidebar-status-indicator"></div>
        <span>System Online</span>
        
        <div className="admin-sidebar-status-details">
          {serviceStatus.map((service, index) => (
            <div key={index} className="admin-sidebar-service-status">
              <div className={`admin-sidebar-service-indicator ${service.status}`}></div>
              <span className="admin-sidebar-service-name">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation - No Scroll */}
      <nav className="admin-sidebar-nav">
        <ul className="admin-sidebar-nav-list">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  className={`admin-sidebar-nav-item ${activeTab === item.id ? 'admin-sidebar-nav-item-active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="admin-sidebar-nav-icon" />
                  <div className="admin-sidebar-nav-content">
                    <div className="admin-sidebar-nav-header">
                      <span className="admin-sidebar-nav-label">{item.label}</span>
                      {item.badge && (
                        <span className="admin-sidebar-nav-badge">{item.badge}</span>
                      )}
                    </div>
                    <span className="admin-sidebar-nav-description">{item.description}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Stats - Fixed */}
      <div className="admin-sidebar-stats">
        <h3 className="admin-sidebar-stats-title">Quick Stats</h3>
        {systemStats.map((stat, index) => (
          <div key={index} className="admin-sidebar-stat">
            <span className="admin-sidebar-stat-label">{stat.label}</span>
            <span className={`admin-sidebar-stat-value ${stat.urgent ? 'urgent' : ''}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer - Fixed */}
      <div className="admin-sidebar-footer">
        <div className="admin-sidebar-user">
          <div className="admin-sidebar-user-avatar">
            <User className="w-6 h-6" />
          </div>
          <div className="admin-sidebar-user-info">
            <span className="admin-sidebar-user-name">Admin User</span>
            <span className="admin-sidebar-user-role">Super Administrator</span>
          </div>
        </div>
        
        <button className="admin-sidebar-logout" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
