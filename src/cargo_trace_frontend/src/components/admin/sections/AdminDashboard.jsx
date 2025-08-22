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
  AlertTriangle
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
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1>Dashboard</h1>
          <p>Welcome to CargoTrace Finance Admin Panel</p>
        </div>
        <div className="admin-dashboard-actions">
          <button className="admin-dashboard-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Pending Actions */}
      <div className="admin-dashboard-section">
        <div className="admin-dashboard-section-header">
          <h2>Pending Actions</h2>
        </div>
        <div className="admin-dashboard-pending-grid">
          <div className="admin-dashboard-pending-card">
            <div className="admin-dashboard-pending-header">
              <div className="admin-dashboard-pending-icon">
                <FileText className="w-5 h-5" />
              </div>
              <div className="admin-dashboard-pending-info">
                <span className="admin-dashboard-pending-type">DOCUMENTS</span>
                <span className="admin-dashboard-pending-count text-red-600">{stats.pendingDocuments}</span>
              </div>
            </div>
            <div className="admin-dashboard-pending-content">
              <p className="admin-dashboard-pending-description">Documents need verification</p>
              <button className="admin-dashboard-pending-btn">
                <Eye className="w-4 h-4" />
                Review
              </button>
            </div>
          </div>

          <div className="admin-dashboard-pending-card">
            <div className="admin-dashboard-pending-header">
              <div className="admin-dashboard-pending-icon">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="admin-dashboard-pending-info">
                <span className="admin-dashboard-pending-type">LOANS</span>
                <span className="admin-dashboard-pending-count text-yellow-600">{stats.pendingLoans}</span>
              </div>
            </div>
            <div className="admin-dashboard-pending-content">
              <p className="admin-dashboard-pending-description">Loan requests need approval</p>
              <button className="admin-dashboard-pending-btn">
                <Eye className="w-4 h-4" />
                Review
              </button>
            </div>
          </div>

          <div className="admin-dashboard-pending-card">
            <div className="admin-dashboard-pending-header">
              <div className="admin-dashboard-pending-icon">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="admin-dashboard-pending-info">
                <span className="admin-dashboard-pending-type">PAYMENTS</span>
                <span className="admin-dashboard-pending-count text-red-600">{stats.overduePayments}</span>
              </div>
            </div>
            <div className="admin-dashboard-pending-content">
              <p className="admin-dashboard-pending-description">Payments are overdue</p>
              <button className="admin-dashboard-pending-btn">
                <Eye className="w-4 h-4" />
                Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="admin-dashboard-section">
        <div className="admin-dashboard-section-header">
          <h2>Recent Activities</h2>
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
                  <span className={getStatusBadge(activity.status)}>{activity.status}</span>
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
    </div>
  );
};

export default AdminDashboard;
