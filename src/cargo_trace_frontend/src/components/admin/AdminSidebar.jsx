import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  DollarSign, 
  CreditCard,
  Users,
  Settings,
  LogOut,
  Shield,
  Link,
  Database,
  Activity,
  BarChart3,
  Crown,
  Zap,
  Globe,
  RefreshCw
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
      description: 'Document management'
    },
    {
      id: 'customs',
      label: 'Customs',
      icon: Link,
      description: 'ACID verification'
    },
    {
      id: 'loans',
      label: 'Loans',
      icon: DollarSign,
      description: 'Loan management'
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
    <aside className={`fixed left-0 top-0 h-full w-72 bg-slate-900 border-r border-slate-700/50 shadow-lg z-40 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Crown size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  CargoTrace
                </h1>
                <p className="text-slate-400 text-sm">Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-blue-400">ADMIN</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`group relative w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-500/20 text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={18} className={`${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'} transition-colors duration-300`} />
                  <div className="flex-1 text-left">
                    <div className={`text-sm font-medium ${isActive ? 'text-white' : 'group-hover:text-white'} transition-colors duration-300`}>
                      {item.label}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-blue-300' : 'text-slate-400 group-hover:text-slate-300'} transition-colors duration-300`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-slate-700/30">
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">System Online</span>
            </div>
            <div className="text-xs text-slate-400">All services operational</div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/30">
          <div className="flex space-x-2">
            <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-all duration-300">
              <Settings size={14} />
              <span className="text-xs font-medium">Settings</span>
            </button>
            <button 
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-slate-800/50 hover:bg-red-500/20 rounded-lg text-slate-300 hover:text-red-400 transition-all duration-300"
              onClick={handleLogout}
            >
              <LogOut size={14} />
              <span className="text-xs font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
