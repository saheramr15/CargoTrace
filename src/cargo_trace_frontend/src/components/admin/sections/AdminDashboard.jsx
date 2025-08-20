import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Globe,
  Shield,
  Database
} from 'lucide-react';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const stats = {
    totalLoans: { value: '$2,456,789', change: '+12.5%', trend: 'up' },
    activeUsers: { value: '156', change: '+8.2%', trend: 'up' },
    documentsProcessed: { value: '1,234', change: '+15.3%', trend: 'up' },
    nftsMinted: { value: '45', change: '+22.1%', trend: 'up' },
    pendingApprovals: { value: '8', change: '-5.2%', trend: 'down' },
    systemUptime: { value: '99.8%', change: '+0.2%', trend: 'up' }
  };

  const recentActivities = [
    {
      id: 1,
      type: 'document_verified',
      title: 'Bill of Lading Verified',
      description: 'BL-2024-001 verified and NFT minted',
      time: '2 minutes ago',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'loan_approved',
      title: 'Loan Approved',
      description: 'Loan #LR-2024-007 approved for $45,000',
      time: '15 minutes ago',
      status: 'success',
      icon: CheckCircle
    },
    {
      id: 3,
      type: 'user_registered',
      title: 'New User Registered',
      description: 'Exporter ABC Trading Co. registered',
      time: '1 hour ago',
      status: 'info',
      icon: Users
    },
    {
      id: 4,
      type: 'system_alert',
      title: 'Blockchain Sync',
      description: 'Ethereum-ICP sync completed',
      time: '2 hours ago',
      status: 'warning',
      icon: AlertTriangle
    }
  ];

  const blockchainStatus = {
    ethereum: { status: 'online', lastBlock: '18,456,789', syncTime: '2s ago' },
    icp: { status: 'online', lastBlock: '1,234,567', syncTime: '1s ago' },
    nafeza: { status: 'online', lastSync: '5 minutes ago' }
  };

  const quickActions = [
    { id: 'approve_loans', label: 'Approve Loans', icon: CheckCircle, count: 3 },
    { id: 'verify_documents', label: 'Verify Documents', icon: FileText, count: 12 },
    { id: 'monitor_blockchain', label: 'Monitor Blockchain', icon: Activity, count: 0 },
    { id: 'generate_report', label: 'Generate Report', icon: BarChart3, count: 0 }
  ];

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h2>Platform Overview</h2>
          <p>Real-time monitoring of CargoTrace Finance operations</p>
        </div>
        <div className="admin-dashboard-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="admin-dashboard-time-select"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-dashboard-stats-grid">
        {Object.entries(stats).map(([key, stat]) => (
          <div key={key} className="admin-dashboard-stat-card">
            <div className="admin-dashboard-stat-header">
              <div className="admin-dashboard-stat-icon">
                {key === 'totalLoans' && <DollarSign className="w-6 h-6" />}
                {key === 'activeUsers' && <Users className="w-6 h-6" />}
                {key === 'documentsProcessed' && <FileText className="w-6 h-6" />}
                {key === 'nftsMinted' && <Activity className="w-6 h-6" />}
                {key === 'pendingApprovals' && <Clock className="w-6 h-6" />}
                {key === 'systemUptime' && <Shield className="w-6 h-6" />}
              </div>
              <div className={`admin-dashboard-stat-trend ${stat.trend}`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="admin-dashboard-stat-value">{stat.value}</div>
            <div className="admin-dashboard-stat-label">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="admin-dashboard-content-grid">
        {/* Blockchain Status */}
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h3>Blockchain Status</h3>
            <Globe className="w-5 h-5" />
          </div>
          <div className="admin-dashboard-card-content">
            {Object.entries(blockchainStatus).map(([network, status]) => (
              <div key={network} className="admin-blockchain-status-item">
                <div className="admin-blockchain-status-header">
                  <span className="admin-blockchain-network">{network.toUpperCase()}</span>
                  <div className={`admin-blockchain-status-indicator ${status.status}`}>
                    <div className="admin-blockchain-status-dot"></div>
                    <span>{status.status}</span>
                  </div>
                </div>
                <div className="admin-blockchain-status-details">
                  {network === 'nafeza' ? (
                    <span>Last sync: {status.lastSync}</span>
                  ) : (
                    <>
                      <span>Block: {status.lastBlock}</span>
                      <span>Sync: {status.syncTime}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h3>Quick Actions</h3>
            <Activity className="w-5 h-5" />
          </div>
          <div className="admin-dashboard-card-content">
            <div className="admin-quick-actions-grid">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="admin-quick-action-btn"
                  onClick={() => handleQuickAction(action.id)}
                >
                  <div className="admin-quick-action-icon">
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div className="admin-quick-action-content">
                    <span className="admin-quick-action-label">{action.label}</span>
                    {action.count > 0 && (
                      <span className="admin-quick-action-count">{action.count}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h3>Recent Activities</h3>
            <Clock className="w-5 h-5" />
          </div>
          <div className="admin-dashboard-card-content">
            <div className="admin-activities-list">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className={`admin-activity-item ${activity.status}`}>
                    <div className="admin-activity-icon">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="admin-activity-content">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <span className="admin-activity-time">{activity.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h3>System Health</h3>
            <Shield className="w-5 h-5" />
          </div>
          <div className="admin-dashboard-card-content">
            <div className="admin-system-health">
              <div className="admin-system-health-item">
                <span className="admin-system-health-label">API Response Time</span>
                <span className="admin-system-health-value">45ms</span>
                <div className="admin-system-health-bar">
                  <div className="admin-system-health-bar-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="admin-system-health-item">
                <span className="admin-system-health-label">Database Performance</span>
                <span className="admin-system-health-value">98%</span>
                <div className="admin-system-health-bar">
                  <div className="admin-system-health-bar-fill" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div className="admin-system-health-item">
                <span className="admin-system-health-label">Blockchain Sync</span>
                <span className="admin-system-health-value">100%</span>
                <div className="admin-system-health-bar">
                  <div className="admin-system-health-bar-fill" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="admin-dashboard-charts">
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h3>Loan Volume Trends</h3>
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="admin-dashboard-card-content">
            <div className="admin-chart-placeholder">
              <LineChart className="w-16 h-16 text-gray-400" />
              <p>Loan volume chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="admin-dashboard-card">
          <div className="admin-dashboard-card-header">
            <h3>Document Processing</h3>
            <PieChart className="w-5 h-5" />
          </div>
          <div className="admin-dashboard-card-content">
            <div className="admin-chart-placeholder">
              <PieChart className="w-16 h-16 text-gray-400" />
              <p>Document processing chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
