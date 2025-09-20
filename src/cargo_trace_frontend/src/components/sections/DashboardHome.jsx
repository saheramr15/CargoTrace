import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Shield, 
  Globe, 
  Clock, 
  CheckCircle, 
  BarChart3, 
  TrendingUp,
  DollarSign,
  FileText,
  Network,
  Target,
  ArrowUpRight,
  Zap,
  Sparkles,
  Rocket,
  Star,
  Layers,
  Database,
  Cpu,
  Wifi,
  Lock
} from 'lucide-react';

const DashboardHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced metrics with animations
  const keyMetrics = [
    {
      id: 1,
      title: 'Documents Processed',
      value: '1,247',
      change: '+12.5%',
      icon: FileText,
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'from-blue-500/10 to-cyan-400/10',
      borderColor: 'border-blue-400/30',
      description: 'CargoX documents verified',
      trend: 'up'
    },
    {
      id: 2,
      title: 'Active Loans',
      value: '$2.4M',
      change: '+8.3%',
      icon: DollarSign,
      color: 'from-cyan-500 to-blue-400',
      bgColor: 'from-cyan-500/10 to-blue-400/10',
      borderColor: 'border-cyan-400/30',
      description: 'ICRC-1 stable tokens',
      trend: 'up'
    },
    {
      id: 3,
      title: 'NFTs Minted',
      value: '892',
      change: '+15.2%',
      icon: Shield,
      color: 'from-indigo-500 to-blue-400',
      bgColor: 'from-indigo-500/10 to-blue-400/10',
      borderColor: 'border-indigo-400/30',
      description: 'ICP blockchain NFTs',
      trend: 'up'
    },
    {
      id: 4,
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: Network,
      color: 'from-slate-500 to-slate-400',
      bgColor: 'from-slate-500/10 to-slate-400/10',
      borderColor: 'border-slate-400/30',
      description: 'Chain Fusion bridge',
      trend: 'up'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'document',
      title: 'Document Verified',
      description: 'Electronics shipment from China',
      time: '2 min ago',
      status: 'success',
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 2,
      type: 'loan',
      title: 'Loan Approved',
      description: '$100,000 for agricultural imports',
      time: '5 min ago',
      status: 'success',
      icon: DollarSign,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      id: 3,
      type: 'nft',
      title: 'NFT Minted',
      description: 'Document NFT-ICP-001 created',
      time: '10 min ago',
      status: 'success',
      icon: Shield,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/20'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Processed',
      description: '$25,000 repayment received',
      time: '15 min ago',
      status: 'success',
      icon: CheckCircle,
      color: 'text-slate-400',
      bgColor: 'bg-slate-500/20'
    }
  ];

  const systemHealth = [
    {
      name: 'CargoX Integration',
      status: 'online',
      uptime: '99.98%',
      icon: Globe,
      color: 'text-cyan-400'
    },
    {
      name: 'NAFEZA System',
      status: 'online',
      uptime: '99.95%',
      icon: Database,
      color: 'text-blue-400'
    },
    {
      name: 'ICP Blockchain',
      status: 'online',
      uptime: '99.99%',
      icon: Cpu,
      color: 'text-indigo-400'
    },
    {
      name: 'Chain Fusion Bridge',
      status: 'online',
      uptime: '99.97%',
      icon: Wifi,
      color: 'text-slate-400'
    }
  ];

  const quickActions = [
    {
      title: 'Upload Document',
      description: 'Submit CargoX document for verification',
      icon: FileText,
      color: 'from-blue-500 to-cyan-400',
      href: '#documents'
    },
    {
      title: 'Request Loan',
      description: 'Apply for ICRC-1 stable token loan',
      icon: DollarSign,
      color: 'from-cyan-500 to-blue-400',
      href: '#loans'
    },
    {
      title: 'View NFTs',
      description: 'Browse minted document NFTs',
      icon: Shield,
      color: 'from-indigo-500 to-blue-400',
      href: '#nfts'
    },
    {
      title: 'Monitor Bridge',
      description: 'Check Chain Fusion status',
      icon: Network,
      color: 'from-slate-500 to-slate-400',
      href: '#bridge'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
      {/* Hero Section */}
      <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative">
          {/* Main Hero Card */}
          <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6 lg:p-8 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                  <Sparkles size={16} />
                  <span>Welcome to the Future of Trade Finance</span>
                  <Sparkles size={16} />
                </div>
                
                <h1 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                    CargoTrace
                  </span>
                  <span className="block text-2xl lg:text-3xl mt-1">Finance</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed">
                  Revolutionary blockchain-powered trade finance platform connecting Egypt and MENA 
                  with the global supply chain through DeFi innovation.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex items-center space-x-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 hover:bg-green-500/20 transition-all duration-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Chain Fusion Active</span>
                  </div>
                  <div className="flex items-center space-x-2 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 hover:bg-blue-500/20 transition-all duration-300">
                    <TrendingUp size={16} />
                    <span className="font-medium">Portfolio +12.5%</span>
                  </div>
                  <div className="flex items-center space-x-2 px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 hover:bg-purple-500/20 transition-all duration-300">
                    <Shield size={16} />
                    <span className="font-medium">NAFEZA Connected</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Current Time</div>
                  <div className="text-2xl font-mono text-white">
                    {currentTime.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={`mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
            <BarChart3 size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
            <p className="text-slate-400">Real-time metrics and performance indicators</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={metric.id} 
                className={`group relative bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border ${metric.borderColor} rounded-xl p-4 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={20} className="text-white" />
                    </div>
                    <div className="flex items-center space-x-1 text-green-400">
                      <TrendingUp size={14} />
                      <span className="text-xs font-bold">{metric.change}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-white group-hover:text-blue-300 transition-colors duration-300">
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">
                      {metric.title}
                    </div>
                    <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      {metric.description}
                    </div>
                  </div>
                  
                  {/* Animated Underline */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Activity size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
                <p className="text-slate-400">Live updates from your platform</p>
              </div>
            </div>
            <button className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/50 hover:to-slate-500/50 border border-slate-600/50 rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105">
              <span>View All</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-xl p-4 overflow-hidden">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const ActivityIcon = activity.icon;
                return (
                  <div 
                    key={activity.id} 
                    className="group flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-700/30 to-slate-600/20 rounded-lg hover:from-slate-700/50 hover:to-slate-600/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <ActivityIcon size={16} className={activity.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 mb-1">
                        {activity.title}
                      </div>
                      <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-1">
                        {activity.description}
                      </div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                        {activity.time}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle size={12} className="text-green-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Target size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">System Health</h2>
              <p className="text-slate-400">Infrastructure status</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-xl p-4">
            <div className="space-y-3">
              {systemHealth.map((system, index) => {
                const SystemIcon = system.icon;
                return (
                  <div 
                    key={index} 
                    className="group flex items-center justify-between p-3 bg-gradient-to-r from-slate-700/30 to-slate-600/20 rounded-lg hover:from-slate-700/50 hover:to-slate-600/40 transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-600/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <SystemIcon size={16} className={system.color} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                          {system.name}
                        </div>
                        <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                          {system.uptime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium capitalize">{system.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`mb-8 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Rocket size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
            <p className="text-slate-400">Access key platform features instantly</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <button 
                key={action.title}
                className={`group relative bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-xl p-4 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105 hover:-translate-y-1 text-left overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <ActionIcon size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {action.title}
                      </div>
                      <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                        {action.description}
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated Arrow */}
                  <div className="flex items-center justify-end">
                    <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  
                  {/* Animated Underline */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className={`mb-8 transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Star size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Performance Insights</h2>
            <p className="text-slate-400">Platform analytics and trends</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-xl p-4 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-cyan-400">+24.5%</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Growth Rate</h3>
            <p className="text-xs text-slate-400">Month-over-month platform growth</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-xl p-4 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-xl flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-indigo-400">1.2s</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Response Time</h3>
            <p className="text-xs text-slate-400">Average API response time</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-xl p-4 hover:shadow-xl hover:shadow-slate-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-400 rounded-xl flex items-center justify-center">
                <Lock size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-400">100%</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Security Score</h3>
            <p className="text-xs text-slate-400">Platform security rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 