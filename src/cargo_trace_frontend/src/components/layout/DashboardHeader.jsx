import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  User, 
  ChevronDown,
  Activity,
  Shield,
  Network,
  Globe,
  Menu,
  Shield as AdminIcon,
  Copy,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../auth';
const DashboardHeader = ({ activeTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
 
const { globalPrincipal, setGlobalPrincipal } = useAuth(); 
  console.log("DashboardHeader Principal:", globalPrincipal);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullPrincipal, setShowFullPrincipal] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New CargoX document verified', time: '2 min ago', type: 'success' },
    { id: 2, message: 'ICRC-1 loan approved', time: '5 min ago', type: 'success' },
    { id: 3, message: 'Chain Fusion bridge active', time: '10 min ago', type: 'info' }
  ]);

  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getTabInfo = (tab) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          description: 'Overview of your CargoTrace Finance portfolio'
        };
      case 'documents':
        return {
          title: 'Documents',
          description: 'Manage CargoX documents and ACID verification'
        };
      case 'loans':
        return {
          title: 'Loan Requests',
          description: 'ICRC-1 stable token loan management'
        };
      case 'repayment':
        return {
          title: 'Repayment',
          description: 'Track and manage loan repayments'
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Overview of your CargoTrace Finance portfolio'
        };
    }
  };

  const tabInfo = getTabInfo(activeTab);

  
  const handleLogout = async () => {
    try {
      await logout();                        // end Internet Identity session
      setGlobalPrincipal(null);              // clear principal from context
      
      navigate('/', { replace: true });
      window.location.reload(); 
                      // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSwitchToAdmin = () => {
    navigate('/admin');
  };

  // Function to truncate principal
  const truncatePrincipal = (principal) => {
    if (!principal) return '';
    if (principal.length <= 20) return principal;
    return `${principal.substring(0, 10)}...${principal.substring(principal.length - 10)}`;
  };

  // Function to copy principal to clipboard
  const copyPrincipal = async () => {
    if (globalPrincipal) {
      try {
        await navigator.clipboard.writeText(globalPrincipal);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy principal:', err);
      }
    }
  };

  
  return (
    <div className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl z-40">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
      </div>
      
      <div className="h-full flex items-center justify-between px-4 relative z-10">
        {/* Left Section - Mobile Menu & Tab Info */}
        <div className="flex items-center space-x-4">
          <button 
            className="lg:hidden group relative p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={18} className="group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              {tabInfo.title}
            </h2>
            <p className="text-slate-400 text-sm">{tabInfo.description}</p>
          </div>
        </div>

        {/* Right Section - Actions & User Menu */}
        <div className="flex items-center space-x-3">
          {/* Admin Toggle Button */}
          <button 
            className="hidden lg:group relative flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-400/30 text-blue-300 rounded-lg hover:from-blue-500/30 hover:to-cyan-400/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5"
            onClick={handleSwitchToAdmin}
            title="Switch to Admin Panel"
          >
            <AdminIcon size={14} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium">Admin</span>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* System Status Indicators */}
          <div className="hidden xl:flex items-center space-x-2">
            {[
              { name: 'CargoX', status: 'online', color: 'from-blue-500 to-cyan-400' },
              { name: 'NAFEZA', status: 'online', color: 'from-green-500 to-emerald-400' },
              { name: 'ICP', status: 'online', color: 'from-purple-500 to-indigo-400' },
              { name: 'Bridge', status: 'online', color: 'from-orange-500 to-yellow-400' }
            ].map((service, index) => (
              <div key={index} className="group flex items-center space-x-1 px-2 py-1 bg-slate-800/30 rounded-md hover:bg-slate-700/50 transition-all duration-300">
                <div className="relative">
                  <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full animate-pulse`}></div>
                  <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                </div>
                <span className="text-xs text-slate-300 font-medium group-hover:text-white transition-colors duration-300">{service.name}</span>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:group relative flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 min-w-64 hover:border-blue-400/30 transition-all duration-300">
            <Search size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white placeholder-slate-400 text-sm outline-none flex-1"
            />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>


          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button 
              className="group relative p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsUserMenuOpen(false);
              }}
            >
              <Bell size={18} className="group-hover:scale-110 transition-transform duration-300" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {notifications.length}
                </span>
              )}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="fixed right-4 top-20 w-72 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-[9999]">
                <div className="p-4 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white">Notifications</h4>
                    <button className="text-xs text-blue-400 hover:text-blue-300 hover:underline">Clear all</button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <div key={notification.id} className="p-3 hover:bg-slate-700/50 transition-colors duration-200 border-b border-slate-700/30 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-400' : 
                          notification.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">{notification.message}</p>
                          <span className="text-xs text-slate-400">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button 
              className="group flex items-center space-x-2 p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5"
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsNotificationsOpen(false);
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                  <User size={16} color="white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
            </button>
            
            {isUserMenuOpen && (
              <div className="fixed right-4 top-20 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl z-[9999] overflow-hidden">
                <div className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                        <User size={20} color="white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-xl blur"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-white">Trade Partner</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <p 
                          className="text-sm text-slate-300 font-mono cursor-pointer hover:text-white transition-colors duration-300 bg-slate-700/50 px-3 py-1 rounded-lg"
                          onClick={() => setShowFullPrincipal(!showFullPrincipal)}
                          title={showFullPrincipal ? "Click to collapse" : "Click to expand"}
                        >
                          {showFullPrincipal ? globalPrincipal : truncatePrincipal(globalPrincipal)}
                        </p>
                        <button 
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110"
                          onClick={copyPrincipal}
                          title="Copy principal"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="py-3">
                  <div className="group flex items-center space-x-4 px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 cursor-pointer">
                    <User size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-semibold">Profile</span>
                  </div>
                  
                  <div className="group flex items-center space-x-4 px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 cursor-pointer">
                    <Settings size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-semibold">Settings</span>
                  </div>
                  
                  <div className="group flex items-center space-x-4 px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 cursor-pointer">
                    <Activity size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-semibold">Activity Log</span>
                  </div>
                  
                  <div className="border-t border-slate-700/50 my-3"></div>
                  
                  <div 
                    className="group flex items-center space-x-4 px-6 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-bold">Logout</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader; 