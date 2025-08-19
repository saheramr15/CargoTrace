import React from 'react';
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
  ArrowUpRight
} from 'lucide-react';

const DashboardHome = () => {
  // Simplified and focused data for overview
  const keyMetrics = [
    {
      id: 1,
      title: 'Total Documents',
      value: '1,247',
      change: '+12.5%',
      icon: FileText,
      color: 'documents',
      description: 'CargoX documents processed'
    },
    {
      id: 2,
      title: 'Active Loans',
      value: '$2.4M',
      change: '+8.3%',
      icon: DollarSign,
      color: 'loans',
      description: 'ICRC-1 stable tokens issued'
    },
    {
      id: 3,
      title: 'NFTs Minted',
      value: '892',
      change: '+15.2%',
      icon: Shield,
      color: 'nfts',
      description: 'ICP blockchain NFTs'
    },
    {
      id: 4,
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: Network,
      color: 'fusion',
      description: 'Chain Fusion bridge status'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'document',
      title: 'New CargoX document verified',
      description: 'Electronics shipment from China',
      time: '2 min ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'loan',
      title: 'ICRC-1 loan approved',
      description: '$100,000 for agricultural imports',
      time: '5 min ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'nft',
      title: 'NFT minted successfully',
      description: 'Document NFT-ICP-001 created',
      time: '10 min ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Repayment received',
      description: '$25,000 payment processed',
      time: '15 min ago',
      status: 'success'
    }
  ];

  const systemHealth = [
    {
      name: 'CargoX Integration',
      status: 'online',
      uptime: '99.98%'
    },
    {
      name: 'NAFEZA System',
      status: 'online',
      uptime: '99.95%'
    },
    {
      name: 'ICP Blockchain',
      status: 'online',
      uptime: '99.99%'
    },
    {
      name: 'Chain Fusion Bridge',
      status: 'online',
      uptime: '99.97%'
    }
  ];

  const getStatusColor = (status) => {
    return status === 'online' ? '#10b981' : '#ef4444';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'document': return FileText;
      case 'loan': return DollarSign;
      case 'nft': return Shield;
      case 'payment': return CheckCircle;
      default: return Activity;
    }
  };

  return (
    <div className="dashboard-home-container">
      {/* Welcome Header */}
      <div className="dashboard-welcome-header">
        <div className="dashboard-welcome-content">
          <h1>Welcome to CargoTrace Finance</h1>
          <p>Your DeFi + TradeTech platform for seamless trade finance in Egypt and MENA</p>
          <div className="dashboard-welcome-badges">
            <div className="dashboard-welcome-badge">
              <Activity size={16} />
              <span>Chain Fusion Active</span>
            </div>
            <div className="dashboard-welcome-badge">
              <TrendingUp size={16} />
              <span>Portfolio +12.5%</span>
            </div>
            <div className="dashboard-welcome-badge">
              <Shield size={16} />
              <span>NAFEZA Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Platform Overview
          </h2>
        </div>
        <div className="dashboard-stats-grid">
          {keyMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div key={metric.id} className="dashboard-stat-card">
                <div className="dashboard-stat-header">
                  <div className={`dashboard-stat-icon ${metric.color}`}>
                    <IconComponent size={24} color="white" />
                  </div>
                  <div className="dashboard-stat-trend">
                    <TrendingUp size={16} />
                    <span className="dashboard-stat-percentage">{metric.change}</span>
                  </div>
                </div>
                <div className="dashboard-stat-value">{metric.value}</div>
                <div className="dashboard-stat-label">{metric.title}</div>
                <div className="dashboard-stat-description">{metric.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-grid">
        {/* Recent Activity */}
        <div className="dashboard-section dashboard-section-large">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">
              <Activity className="dashboard-section-icon" />
              Recent Activity
            </h2>
            <button className="dashboard-section-action">View All</button>
          </div>
          <div className="dashboard-activity-list">
            {recentActivity.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="dashboard-activity-item">
                  <div className="dashboard-activity-icon">
                    <ActivityIcon size={20} color="white" />
                  </div>
                  <div className="dashboard-activity-content">
                    <div className="dashboard-activity-title">{activity.title}</div>
                    <div className="dashboard-activity-description">{activity.description}</div>
                    <div className="dashboard-activity-time">{activity.time}</div>
                  </div>
                  <div className="dashboard-activity-status">
                    <CheckCircle size={16} color="#10b981" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">
              <Target className="dashboard-section-icon" />
              System Health
            </h2>
          </div>
          <div className="dashboard-system-health">
            {systemHealth.map((system, index) => (
              <div key={index} className="dashboard-system-item">
                <div className="dashboard-system-info">
                  <div className="dashboard-system-name">{system.name}</div>
                  <div className="dashboard-system-uptime">{system.uptime}</div>
                </div>
                <div className="dashboard-system-status">
                  <div
                    className="dashboard-system-indicator"
                    style={{ backgroundColor: getStatusColor(system.status) }}
                  ></div>
                  <span className="dashboard-system-status-text">{system.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <ArrowUpRight className="dashboard-section-icon" />
            Quick Actions
          </h2>
        </div>
        <div className="dashboard-quick-actions-grid">
          <button className="dashboard-quick-action-card">
            <div className="dashboard-quick-action-icon blue">
              <FileText size={24} color="white" />
            </div>
            <div>
              <div className="dashboard-quick-action-title">Upload Document</div>
              <div className="dashboard-quick-action-description">Submit CargoX document for verification</div>
            </div>
          </button>
          
          <button className="dashboard-quick-action-card">
            <div className="dashboard-quick-action-icon green">
              <DollarSign size={24} color="white" />
            </div>
            <div>
              <div className="dashboard-quick-action-title">Request Loan</div>
              <div className="dashboard-quick-action-description">Apply for ICRC-1 stable token loan</div>
            </div>
          </button>
          
          <button className="dashboard-quick-action-card">
            <div className="dashboard-quick-action-icon purple">
              <Shield size={24} color="white" />
            </div>
            <div>
              <div className="dashboard-quick-action-title">View NFTs</div>
              <div className="dashboard-quick-action-description">Browse minted document NFTs</div>
            </div>
          </button>
          
          <button className="dashboard-quick-action-card">
            <div className="dashboard-quick-action-icon orange">
              <Network size={24} color="white" />
            </div>
            <div>
              <div className="dashboard-quick-action-title">Monitor Bridge</div>
              <div className="dashboard-quick-action-description">Check Chain Fusion status</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 