import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  ExternalLink,
  Shield,
  Activity,
  User as UserIcon,
  Crown,
  Zap,
  Database,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ activeTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'New Document Verified',
      message: 'Bill of Lading #BL-2024-001 has been verified and NFT minted successfully on Ethereum and ICP',
      time: '2 minutes ago',
      icon: CheckCircle,
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Loan Request Pending',
      message: 'Loan request #LR-2024-008 requires manual approval from admin - Amount: $45,000',
      time: '15 minutes ago',
      icon: AlertTriangle,
      priority: 'high'
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update Complete',
      message: 'Blockchain monitoring system updated to v2.1.1 with improved performance and security',
      time: '1 hour ago',
      icon: Shield,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'success',
      title: 'ACID Validation Complete',
      message: 'NAFEZA integration processed 45 new ACID numbers successfully - All documents synced',
      time: '2 hours ago',
      icon: CheckCircle,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'info',
      title: 'Chain Fusion Status',
      message: 'Ethereum-ICP bridge operating normally - 156 transactions processed in last hour',
      time: '3 hours ago',
      icon: Activity,
      priority: 'low'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    console.log('Admin logout');
  };

  const handleSwitchToUser = () => {
    navigate('/dashboard');
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      documents: 'Documents',
      customs: 'Customs',
      loans: 'Loans',
      repayments: 'Repayments',
      users: 'Users'
    };
    return titles[activeTab] || 'Admin Panel';
  };

  const getPageDescription = () => {
    const descriptions = {
      dashboard: 'System overview and monitoring',
      documents: 'Document management and verification',
      customs: 'ACID verification and customs integration',
      loans: 'Loan management and approvals',
      repayments: 'Payment tracking and management',
      users: 'User management and permissions'
    };
    return descriptions[activeTab] || 'Admin panel';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg z-40">
      <div className="h-full flex items-center justify-between px-6">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-105"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <Menu size={20} />
        </button>

        {/* Page Title */}
        <div className="flex-1 lg:flex-none lg:ml-8">
          <h1 className="text-xl font-bold text-white">{getPageTitle()}</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden lg:block">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:outline-none transition-all duration-300 text-sm"
            />
          </form>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-2">
          {/* User Toggle Button */}
          <button 
            className="flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300"
            onClick={handleSwitchToUser}
            title="Switch to User Dashboard"
          >
            <UserIcon size={16} />
            <span className="hidden sm:block text-sm font-medium">User</span>
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button 
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="fixed right-4 top-20 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-[9999]">
                <div className="p-4 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white">Notifications</h4>
                    <button className="text-xs text-blue-400 hover:text-blue-300 hover:underline">Clear All</button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div key={notification.id} className="p-4 border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors duration-200">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/20 text-blue-400">
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-semibold text-white">{notification.title}</h5>
                            <p className="text-xs text-slate-300 mb-2">{notification.message}</p>
                            <span className="text-xs text-slate-400">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-4 border-t border-slate-700/50">
                  <button className="w-full flex items-center justify-center space-x-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    <span>View All Notifications</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile */}
          <div className="relative" ref={profileRef}>
            <button 
              className="flex items-center space-x-2 p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Crown size={16} className="text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-semibold text-white">Admin</div>
                <div className="text-xs text-slate-400">Super Admin</div>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            
            {showProfileMenu && (
              <div className="fixed right-4 top-20 w-64 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-[9999]">
                <div className="p-4 border-b border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Crown size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Admin</div>
                      <div className="text-sm text-slate-400">Super Administrator</div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-300">
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-300">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-slate-700/50 my-2"></div>
                  <button 
                    className="w-full flex items-center space-x-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
