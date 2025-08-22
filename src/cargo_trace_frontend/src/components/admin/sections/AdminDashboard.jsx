import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
  Settings,
  Eye,
  Shield,
  Globe,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  BarChart3,
  Zap,
  Building,
  Truck,
  Anchor
} from 'lucide-react';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const stats = {
    totalDocuments: 1247,
    pendingDocuments: 12,
    totalLoans: 156,
    pendingLoans: 8,
    totalRepayments: 89,
    overduePayments: 3,
    activeUsers: 234,
    systemUptime: '99.8%'
  };

  const recentActivities = [
    {
      id: 1,
      type: 'document',
      action: 'New CargoX document uploaded',
      company: 'Egyptian Trading Co.',
      time: '2 minutes ago',
      status: 'pending',
      requiresAction: true
    },
    {
      id: 2,
      type: 'loan',
      action: 'Loan request submitted',
      company: 'Mediterranean Exports',
      time: '15 minutes ago',
      status: 'pending',
      requiresAction: true
    },
    {
      id: 3,
      type: 'document',
      action: 'Document verification completed',
      company: 'Nile Import Ltd.',
      time: '1 hour ago',
      status: 'verified',
      requiresAction: false
    },
    {
      id: 4,
      type: 'repayment',
      action: 'Payment overdue',
      company: 'Red Sea Trading',
      time: '2 hours ago',
      status: 'overdue',
      requiresAction: true
    },
    {
      id: 5,
      type: 'loan',
      action: 'Loan approved and disbursed',
      company: 'Delta Exports',
      time: '3 hours ago',
      status: 'completed',
      requiresAction: false
    }
  ];

  const systemStatus = {
    cargoX: { status: 'online', lastSync: '2 minutes ago', documents: 45 },
    nafeza: { status: 'online', lastSync: '5 minutes ago', acidNumbers: 23 },
    ethereum: { status: 'online', lastBlock: '18,456,789', transactions: 156 },
    icp: { status: 'online', lastBlock: '1,234,567', nfts: 892 }
  };

  const pendingActions = [
    { type: 'documents', count: 12, priority: 'high', description: 'Documents need verification' },
    { type: 'loans', count: 8, priority: 'medium', description: 'Loan requests need approval' },
    { type: 'repayments', count: 3, priority: 'high', description: 'Payments are overdue' }
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
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      verified: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getSystemStatusIcon = (status) => {
    return status === 'online' ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <AlertTriangle className="w-4 h-4 text-red-500" />;
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
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>Dashboard Overview</h1>
          <p>Monitor and control all CargoTrace Finance operations in real-time</p>
        </div>
        <div className="admin-dashboard-actions">
          <button className="admin-dashboard-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </button>
          <button className="admin-dashboard-action-btn primary">
            <BarChart3 className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="admin-dashboard-stats">
        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            <FileText className="w-6 h-6" />
          </div>
          <div className="admin-dashboard-stat-content">
            <span className="admin-dashboard-stat-value">{stats.totalDocuments.toLocaleString()}</span>
            <span className="admin-dashboard-stat-label">Total Documents</span>
          </div>
          <div className="admin-dashboard-stat-trend">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">+12%</span>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="admin-dashboard-stat-content">
            <span className="admin-dashboard-stat-value">{stats.totalLoans}</span>
            <span className="admin-dashboard-stat-label">Active Loans</span>
          </div>
          <div className="admin-dashboard-stat-trend">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">+8%</span>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            <CreditCard className="w-6 h-6" />
          </div>
          <div className="admin-dashboard-stat-content">
            <span className="admin-dashboard-stat-value">{stats.totalRepayments}</span>
            <span className="admin-dashboard-stat-label">Repayments</span>
          </div>
          <div className="admin-dashboard-stat-trend">
            <ArrowDownRight className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-sm">-3%</span>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            <Users className="w-6 h-6" />
          </div>
          <div className="admin-dashboard-stat-content">
            <span className="admin-dashboard-stat-value">{stats.activeUsers}</span>
            <span className="admin-dashboard-stat-label">Active Users</span>
          </div>
          <div className="admin-dashboard-stat-trend">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">+15%</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="admin-dashboard-content-grid">
        {/* Left Column */}
        <div className="admin-dashboard-left-column">
          {/* Pending Actions */}
          <div className="admin-dashboard-section">
            <div className="admin-dashboard-section-header">
              <h2>Pending Actions</h2>
              <span className="admin-dashboard-section-badge">23</span>
            </div>
            <div className="admin-dashboard-pending-grid">
              {pendingActions.map((action) => (
                <div key={action.type} className="admin-dashboard-pending-card">
                  <div className="admin-dashboard-pending-header">
                    <div className="admin-dashboard-pending-icon">
                      {action.type === 'documents' && <FileText className="w-5 h-5" />}
                      {action.type === 'loans' && <DollarSign className="w-5 h-5" />}
                      {action.type === 'repayments' && <CreditCard className="w-5 h-5" />}
                    </div>
                    <div className="admin-dashboard-pending-info">
                      <span className="admin-dashboard-pending-type">{action.type.toUpperCase()}</span>
                      <span className={`admin-dashboard-pending-count ${getPriorityColor(action.priority)}`}>
                        {action.count}
                      </span>
                    </div>
                  </div>
                  <div className="admin-dashboard-pending-content">
                    <p className="admin-dashboard-pending-description">{action.description}</p>
                    <button className="admin-dashboard-pending-btn">
                      <Eye className="w-4 h-4" />
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="admin-dashboard-section">
            <div className="admin-dashboard-section-header">
              <h2>System Status</h2>
              <span className="admin-dashboard-status-indicator online">All Systems Online</span>
            </div>
            <div className="admin-dashboard-system-grid">
              {Object.entries(systemStatus).map(([service, status]) => (
                <div key={service} className="admin-dashboard-system-item">
                  <div className="admin-dashboard-system-header">
                    <div className="admin-dashboard-system-info">
                      <span className="admin-dashboard-system-name">{service.toUpperCase()}</span>
                      <span className="admin-dashboard-system-status">{status.status}</span>
                    </div>
                    {getSystemStatusIcon(status.status)}
                  </div>
                  <div className="admin-dashboard-system-details">
                    <span className="admin-dashboard-system-metric">
                      {service === 'cargoX' && `${status.documents} documents`}
                      {service === 'nafeza' && `${status.acidNumbers} ACID numbers`}
                      {service === 'ethereum' && `Block: ${status.lastBlock}`}
                      {service === 'icp' && `${status.nfts} NFTs minted`}
                    </span>
                    <span className="admin-dashboard-system-time">
                      {service === 'cargoX' && `Last sync: ${status.lastSync}`}
                      {service === 'nafeza' && `Last sync: ${status.lastSync}`}
                      {service === 'ethereum' && `${status.transactions} txn`}
                      {service === 'icp' && `Block: ${status.lastBlock}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="admin-dashboard-right-column">
          {/* Recent Activities */}
          <div className="admin-dashboard-section">
            <div className="admin-dashboard-section-header">
              <h2>Recent Activities</h2>
              <button className="admin-dashboard-view-all">View All</button>
            </div>
            <div className="admin-dashboard-activities-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="admin-dashboard-activity-item">
                  <div className="admin-dashboard-activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="admin-dashboard-activity-content">
                    <div className="admin-dashboard-activity-main">
                      <span className="admin-dashboard-activity-action">{activity.action}</span>
                      <div className="admin-dashboard-activity-status">
                        <span className={getStatusBadge(activity.status)}>{activity.status}</span>
                        {activity.requiresAction && (
                          <span className="admin-dashboard-activity-urgent">Action Required</span>
                        )}
                      </div>
                    </div>
                    <div className="admin-dashboard-activity-details">
                      <span className="admin-dashboard-activity-company">{activity.company}</span>
                      <span className="admin-dashboard-activity-time">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="admin-dashboard-section">
            <div className="admin-dashboard-section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="admin-dashboard-actions-grid">
              <button className="admin-dashboard-quick-action">
                <FileText className="w-5 h-5" />
                <span>Review Documents</span>
              </button>
              <button className="admin-dashboard-quick-action">
                <DollarSign className="w-5 h-5" />
                <span>Process Loans</span>
              </button>
              <button className="admin-dashboard-quick-action">
                <CreditCard className="w-5 h-5" />
                <span>Check Payments</span>
              </button>
              <button className="admin-dashboard-quick-action">
                <Users className="w-5 h-5" />
                <span>Manage Users</span>
              </button>
              <button className="admin-dashboard-quick-action">
                <Shield className="w-5 h-5" />
                <span>System Health</span>
              </button>
              <button className="admin-dashboard-quick-action">
                <Settings className="w-5 h-5" />
                <span>Configuration</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
