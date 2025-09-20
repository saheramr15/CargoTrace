import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  CreditCard,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  BarChart3,
  Eye,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Database,
  Zap,
  Clock,
  Crown
} from 'lucide-react';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Simple stats data
  const stats = {
    totalDocuments: 1247,
    pendingDocuments: 12,
    totalLoans: 156,
    pendingLoans: 8,
    totalRepayments: 89,
    overduePayments: 3,
    activeUsers: 234
  };

  const recentActivities = [
    {
      id: 1,
      type: 'document',
      action: 'New document uploaded',
      company: 'Egyptian Trading Co.',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'loan',
      action: 'Loan request submitted',
      company: 'Mediterranean Exports',
      time: '15 minutes ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'document',
      action: 'Document verified',
      company: 'Nile Import Ltd.',
      time: '1 hour ago',
      status: 'verified'
    },
    {
      id: 4,
      type: 'repayment',
      action: 'Payment overdue',
      company: 'Red Sea Trading',
      time: '2 hours ago',
      status: 'overdue'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'loan':
        return <DollarSign className="w-4 h-4" />;
      case 'repayment':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      verified: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      overdue: 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
    };
    return `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-slate-500/20 text-slate-400 border border-slate-500/30'}`;
  };

  return (
    <div className="px-6 py-6 lg:pl-80 lg:pr-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <Crown size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-400">Welcome to CargoTrace Finance Admin Panel</p>
            </div>
          </div>
          <button 
            className="group relative px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 hover:scale-105"
            onClick={() => setIsLoading(!isLoading)}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-indigo-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </div>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText size={24} className="text-blue-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalDocuments.toLocaleString()}</div>
            <div className="text-sm text-slate-400">Total Documents</div>
          </div>
        </div>

        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-green-400/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/10 via-emerald-400/10 to-green-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DollarSign size={24} className="text-green-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+8%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalLoans}</div>
            <div className="text-sm text-slate-400">Active Loans</div>
          </div>
        </div>

        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-purple-400/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 via-indigo-400/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CreditCard size={24} className="text-purple-400" />
              </div>
              <div className="flex items-center space-x-1 text-red-400">
                <TrendingDown size={16} />
                <span className="text-sm font-medium">-3%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalRepayments}</div>
            <div className="text-sm text-slate-400">Repayments</div>
          </div>
        </div>

        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-orange-400/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/10 via-yellow-400/10 to-orange-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users size={24} className="text-orange-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+15%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.activeUsers}</div>
            <div className="text-sm text-slate-400">Active Users</div>
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-pink-400/20 rounded-lg flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Pending Actions</h2>
            <p className="text-slate-400">Items requiring immediate attention</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative bg-slate-800/50 border border-red-500/30 rounded-xl p-6 hover:border-red-400/50 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 via-pink-400/10 to-red-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText size={24} className="text-red-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">DOCUMENTS</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded-full border border-red-500/30">
                    {stats.pendingDocuments}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 mb-4">Documents need verification</p>
              <button className="group/btn w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-300 hover:scale-105">
                <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                <span>Review</span>
              </button>
            </div>
          </div>

          <div className="group relative bg-slate-800/50 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/10 via-orange-400/10 to-yellow-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <DollarSign size={24} className="text-yellow-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">LOANS</span>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-bold rounded-full border border-yellow-500/30">
                    {stats.pendingLoans}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 mb-4">Loan requests need approval</p>
              <button className="group/btn w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 hover:text-yellow-300 rounded-lg transition-all duration-300 hover:scale-105">
                <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                <span>Review</span>
              </button>
            </div>
          </div>

          <div className="group relative bg-slate-800/50 border border-red-500/30 rounded-xl p-6 hover:border-red-400/50 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 via-pink-400/10 to-red-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CreditCard size={24} className="text-red-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">PAYMENTS</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded-full border border-red-500/30">
                    {stats.overduePayments}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 mb-4">Payments are overdue</p>
              <button className="group/btn w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-300 hover:scale-105">
                <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                <span>Review</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
            <Activity size={20} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Recent Activities</h2>
            <p className="text-slate-400">Latest system activities and updates</p>
          </div>
        </div>
        
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
          <div className="divide-y divide-slate-700/50">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="group p-6 hover:bg-slate-700/30 transition-colors duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{activity.action}</span>
                      <span className={getStatusBadge(activity.status)}>{activity.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{activity.company}</span>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
