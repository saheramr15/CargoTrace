import React from 'react';
import { 
  Activity, 
  Shield, 
  Globe, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  BarChart3, 
  Users, 
  Zap, 
  Target, 
  Award, 
  Eye,
  TrendingUp,
  DollarSign,
  FileText,
  CreditCard,
  ArrowUpRight,
  Wallet,
  Building2,
  Ship,
  Package,
  Database,
  Link,
  Network
} from 'lucide-react';

const DashboardHome = () => {
  // Enhanced mock data for CargoTrace Finance
  const platformStats = [
    {
      id: 1,
      title: 'Total Documents Processed',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
      color: 'documents',
      description: 'CargoX documents verified'
    },
    {
      id: 2,
      title: 'Active Loans',
      value: '$2.4M',
      change: '+8.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'loans',
      description: 'ICRC-1 stable tokens issued'
    },
    {
      id: 3,
      title: 'NFTs Minted',
      value: '892',
      change: '+15.2%',
      trend: 'up',
      icon: Shield,
      color: 'nfts',
      description: 'ICP blockchain NFTs'
    },
    {
      id: 4,
      title: 'Chain Fusion Status',
      value: 'Active',
      change: '99.9%',
      trend: 'up',
      icon: Network,
      color: 'fusion',
      description: 'Ethereum ↔ ICP bridge'
    }
  ];

  const recentDocuments = [
    {
      id: 'CX-2024-001',
      acid: 'ACID-EG-2024-789456',
      type: 'Bill of Lading',
      value: '$125,000',
      status: 'verified',
      date: '2024-01-15',
      description: 'Electronics shipment from China'
    },
    {
      id: 'CX-2024-002',
      acid: 'ACID-EG-2024-789457',
      type: 'Commercial Invoice',
      value: '$89,500',
      status: 'pending',
      date: '2024-01-14',
      description: 'Textile imports from Turkey'
    },
    {
      id: 'CX-2024-003',
      acid: 'ACID-EG-2024-789458',
      type: 'Certificate of Origin',
      value: '$67,200',
      status: 'nft-minted',
      date: '2024-01-13',
      description: 'Agricultural products from Kenya'
    }
  ];

  const activeLoans = [
    {
      id: 'LOAN-2024-001',
      documentId: 'CX-2024-001',
      amount: '$100,000',
      collateral: 'Electronics NFT',
      apr: '8.5%',
      status: 'active',
      dueDate: '2024-04-15',
      progress: 65
    },
    {
      id: 'LOAN-2024-002',
      documentId: 'CX-2024-003',
      amount: '$50,000',
      collateral: 'Agricultural NFT',
      apr: '7.2%',
      status: 'active',
      dueDate: '2024-03-20',
      progress: 45
    }
  ];

  const systemStatus = [
    {
      name: 'CargoX Integration',
      status: 'online',
      uptime: '99.98%',
      lastSync: '2 min ago'
    },
    {
      name: 'NAFEZA System',
      status: 'online',
      uptime: '99.95%',
      lastSync: '5 min ago'
    },
    {
      name: 'ICP Blockchain',
      status: 'online',
      uptime: '99.99%',
      lastSync: '1 min ago'
    },
    {
      name: 'Chain Fusion Bridge',
      status: 'online',
      uptime: '99.97%',
      lastSync: '30 sec ago'
    }
  ];

  const quickActions = [
    {
      title: 'Submit Document',
      description: 'Upload CargoX document for verification',
      icon: FileText,
      action: 'submit-document',
      color: 'blue'
    },
    {
      title: 'Request Loan',
      description: 'Apply for ICRC-1 stable token loan',
      icon: DollarSign,
      action: 'request-loan',
      color: 'green'
    },
    {
      title: 'View NFTs',
      description: 'Browse minted document NFTs',
      icon: Shield,
      action: 'view-nfts',
      color: 'purple'
    },
    {
      title: 'Monitor Bridge',
      description: 'Check Chain Fusion status',
      icon: Network,
      action: 'monitor-bridge',
      color: 'orange'
    }
  ];

  const platformInsights = [
    {
      title: 'Document Processing Pipeline',
      subtitle: 'CargoX → NAFEZA → ICP NFT',
      description: 'Real-time document verification and NFT minting process',
      metrics: ['1,247 Processed', '892 NFTs Minted', '99.9% Success Rate'],
      icon: Database,
      color: 'blue'
    },
    {
      title: 'DeFi Lending Network',
      subtitle: 'Automated ICRC-1 Token Issuance',
      description: 'Smart contract-based lending using NFT collateral',
      metrics: ['$2.4M Active Loans', '8.5% Avg APR', '0 Defaults'],
      icon: CreditCard,
      color: 'green'
    },
    {
      title: 'Cross-Chain Integration',
      subtitle: 'Ethereum ↔ Internet Computer',
      description: 'Seamless bridge between trade documents and financing',
      metrics: ['99.9% Uptime', '<1s Bridge Time', 'Zero Downtime'],
      icon: Link,
      color: 'purple'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'pending';
      case 'nft-minted': return 'nft-minted';
      case 'active': return 'success';
      default: return 'pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'pending': return Clock;
      case 'nft-minted': return Shield;
      case 'active': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="dashboard-home-container">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="dashboard-welcome-content">
          <div className="dashboard-welcome-header">
            <div>
              <h1>Welcome to CargoTrace Finance</h1>
              <p>Your DeFi + TradeTech platform for seamless trade finance in Egypt and MENA</p>
            </div>
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
          
          <div className="dashboard-welcome-stats">
            <div className="dashboard-welcome-stat">
              <div className="dashboard-welcome-indicator"></div>
              <span className="dashboard-welcome-stat-text">Real-time CargoX monitoring</span>
            </div>
            <div className="dashboard-welcome-stat">
              <div className="dashboard-welcome-indicator"></div>
              <span className="dashboard-welcome-stat-text">Automated ACID verification</span>
            </div>
            <div className="dashboard-welcome-stat">
              <div className="dashboard-welcome-indicator"></div>
              <span className="dashboard-welcome-stat-text">ICP NFT minting active</span>
            </div>
          </div>
        </div>
        <div className="dashboard-welcome-bg"></div>
      </div>

      {/* Platform Statistics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Platform Overview
          </h2>
        </div>
        <div className="dashboard-stats-grid">
          {platformStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="dashboard-stat-card">
                <div className="dashboard-stat-header">
                  <div className={`dashboard-stat-icon ${stat.color}`}>
                    <IconComponent size={24} color="white" />
                  </div>
                  <div className="dashboard-stat-trend">
                    <TrendingUp size={16} />
                    <span className="dashboard-stat-percentage">{stat.change}</span>
                  </div>
                </div>
                <div className="dashboard-stat-value">{stat.value}</div>
                <div className="dashboard-stat-label">{stat.title}</div>
                <div className="dashboard-stat-description">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Zap className="dashboard-section-icon" />
            Quick Actions
          </h2>
        </div>
        <div className="dashboard-quick-actions-grid">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button key={index} className="dashboard-quick-action-card">
                <div className={`dashboard-quick-action-icon ${action.color}`}>
                  <IconComponent size={24} color="white" />
                </div>
                <div>
                  <div className="dashboard-quick-action-title">{action.title}</div>
                  <div className="dashboard-quick-action-description">{action.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-grid">
        {/* Recent Documents */}
        <div className="dashboard-section dashboard-section-large">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">
              <FileText className="dashboard-section-icon" />
              Recent CargoX Documents
            </h2>
            <button className="dashboard-section-action">View All</button>
          </div>
          <div className="dashboard-documents-list">
            {recentDocuments.map((document) => {
              const StatusIcon = getStatusIcon(document.status);
              return (
                <div key={document.id} className="dashboard-document-card">
                  <div className="dashboard-document-header">
                    <div className="dashboard-document-info">
                      <div className="dashboard-document-icon">
                        <FileText size={20} color="white" />
                      </div>
                      <div className="dashboard-document-details">
                        <p className="dashboard-document-id">{document.id}</p>
                        <p className="dashboard-document-acid">{document.acid}</p>
                        <p className="dashboard-document-type">{document.type}</p>
                      </div>
                    </div>
                    <div className="dashboard-document-amount">
                      <p className="dashboard-document-value">{document.value}</p>
                    </div>
                  </div>
                  <div className="dashboard-document-description">{document.description}</div>
                  <div className="dashboard-document-footer">
                    <span className="dashboard-document-date">{document.date}</span>
                    <div className="dashboard-status-container">
                      <StatusIcon size={16} />
                      <span className={`dashboard-status ${getStatusColor(document.status)}`}>
                        {document.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="dashboard-sidebar-content">
          {/* System Status */}
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">
                <Activity className="dashboard-section-icon" />
                System Status
              </h2>
            </div>
            <div className="dashboard-system-status">
              {systemStatus.map((system, index) => (
                <div key={index} className="dashboard-system-item">
                  <div className="dashboard-system-info">
                    <div className={`dashboard-system-indicator ${system.status}`}></div>
                    <span className="dashboard-system-name">{system.name}</span>
                  </div>
                  <div className="dashboard-system-details">
                    <span className="dashboard-system-uptime">{system.uptime}</span>
                    <span className="dashboard-system-status-badge">{system.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Loans Overview */}
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">
                <DollarSign className="dashboard-section-icon" />
                Active Loans
              </h2>
            </div>
            <div className="dashboard-loans-list">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="dashboard-loan-card">
                  <div className="dashboard-loan-header">
                    <div className="dashboard-loan-info">
                      <p className="dashboard-loan-id">{loan.id}</p>
                      <p className="dashboard-loan-collateral">{loan.collateral}</p>
                    </div>
                    <div className="dashboard-loan-status">
                      <CheckCircle size={16} />
                      <span className="dashboard-status success">{loan.status}</span>
                    </div>
                  </div>
                  <div className="dashboard-loan-details">
                    <div className="dashboard-loan-amount">{loan.amount}</div>
                    <div className="dashboard-loan-apr">{loan.apr} APR</div>
                  </div>
                  <div className="dashboard-loan-progress">
                    <div className="dashboard-loan-progress-label">
                      <span>Repayment Progress</span>
                      <span>{loan.progress}%</span>
                    </div>
                    <div className="dashboard-loan-progress-bar">
                      <div 
                        className="dashboard-loan-progress-fill" 
                        style={{ width: `${loan.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="dashboard-loan-footer">
                    <span className="dashboard-loan-date">Due: {loan.dueDate}</span>
                    <button className="dashboard-loan-action">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Insights */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Target className="dashboard-section-icon" />
            Platform Insights
          </h2>
        </div>
        <div className="dashboard-insights-grid">
          {platformInsights.map((insight, index) => {
            const IconComponent = insight.icon;
            return (
              <div key={index} className="dashboard-insight-card">
                <div className="dashboard-insight-header">
                  <div className={`dashboard-insight-icon ${insight.color}`}>
                    <IconComponent size={20} />
                  </div>
                  <h3 className="dashboard-insight-title">{insight.title}</h3>
                </div>
                <div className="dashboard-insight-content">
                  <p className="dashboard-insight-subtitle">{insight.subtitle}</p>
                  <p className="dashboard-insight-description">{insight.description}</p>
                  <div className="dashboard-insight-metrics">
                    {insight.metrics.map((metric, idx) => (
                      <span key={idx} className="dashboard-insight-metric">{metric}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 