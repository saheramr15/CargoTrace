import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Wallet, 
  ArrowUpRight,
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
  Eye
} from 'lucide-react';

const DashboardHome = () => {
  const [isHovered, setIsHovered] = useState(null);

  const documentTransfers = [
    { id: '0x1234...abcd', acid: '123456789', status: 'Transferred', date: '2024-08-01', value: '$45,000', type: 'Bill of Lading' },
    { id: '0xabcd...5678', acid: '987654321', status: 'In Progress', date: '2024-08-02', value: '$32,500', type: 'Commercial Invoice' },
    { id: '0x5678...efgh', acid: '456766123', status: 'Transferred', date: '2024-08-03', value: '$58,750', type: 'Packing List' },
    { id: '0x9abc...def0', acid: '789012345', status: 'Pending', date: '2024-08-04', value: '$28,900', type: 'Certificate of Origin' }
  ];

  const pendingLoans = [
    { docId: 'ABCD...1234', amount: '$50,000', date: '2024-08-01', status: 'Pending', apr: '4.5%', collateral: 'NFT #1234' },
    { docId: 'EFGH...5678', amount: '$75,000', date: '2024-08-02', status: 'Approved', apr: '3.8%', collateral: 'NFT #5678' },
    { docId: 'IJKL...9012', amount: '$30,000', date: '2024-08-03', status: 'Processing', apr: '4.2%', collateral: 'NFT #9012' }
  ];

  const recentTransactions = [
    { type: 'Loan Disbursed', amount: '+$50,000', date: '2024-08-01', status: 'Completed', txHash: '0xabc...def' },
    { type: 'Repayment', amount: '-$15,000', date: '2024-08-02', status: 'Completed', txHash: '0xdef...ghi' },
    { type: 'NFT Minted', amount: 'NFT #1234', date: '2024-08-03', status: 'Completed', txHash: '0xghi...jkl' },
    { type: 'Document Verified', amount: 'ACID: 123456789', date: '2024-08-04', status: 'Completed', txHash: '0xjkl...mno' }
  ];

  const statsCards = [
    { 
      title: 'ICP Balance', 
      value: '10.248 ICP', 
      change: '+2.4% from last week', 
      icon: Wallet, 
      gradient: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
      description: 'Available for trade finance',
      trend: 'up',
      percentage: '+12.5%'
    },
    { 
      title: 'Active Documents', 
      value: '12', 
      change: '3 processed today', 
      icon: FileText, 
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      description: 'CargoX documents verified',
      trend: 'up',
      percentage: '+25.0%'
    },
    { 
      title: 'Total Loans', 
      value: '$185,000', 
      change: '$45k repaid', 
      icon: DollarSign, 
      gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      description: 'ICRC-1 stable tokens',
      trend: 'up',
      percentage: '+32.1%'
    },
    { 
      title: 'Credit Score', 
      value: '850', 
      change: 'Excellent rating', 
      icon: TrendingUp, 
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      description: 'Trade finance rating',
      trend: 'up',
      percentage: '+5.2%'
    }
  ];

  const quickActions = [
    { title: 'Submit Document', icon: FileText, action: 'upload', color: '#10B981' },
    { title: 'Request Loan', icon: DollarSign, action: 'loan', color: '#F97316' },
    { title: 'Make Payment', icon: Wallet, action: 'payment', color: '#8B5CF6' },
    { title: 'View NFTs', icon: Shield, action: 'nfts', color: '#7C3AED' }
  ];

  const systemStatus = [
    { service: 'CargoX Integration', status: 'Operational', uptime: '99.9%', icon: Globe },
    { service: 'NAFEZA System', status: 'Operational', uptime: '99.8%', icon: Shield },
    { service: 'ICP Blockchain', status: 'Operational', uptime: '99.9%', icon: Activity },
    { service: 'Chain Fusion', status: 'Operational', uptime: '99.7%', icon: Zap }
  ];

  return (
    <div className="dashboard-home-container">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="dashboard-welcome-content">
          <div className="dashboard-welcome-header">
            <h1>Welcome back, Trade Partner</h1>
            <div className="dashboard-welcome-badges">
              <span className="dashboard-welcome-badge">
                <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                Chain Fusion Active
              </span>
              <span className="dashboard-welcome-badge">
                <TrendingUp style={{ width: '1rem', height: '1rem' }} />
                +12.5% Portfolio Growth
              </span>
              <span className="dashboard-welcome-badge">
                <Shield style={{ width: '1rem', height: '1rem' }} />
                NAFEZA Integration
              </span>
            </div>
          </div>
          <p>Your CargoTrace Finance portfolio is thriving with blockchain-powered trade finance solutions. Monitor your documents, loans, and transactions in real-time.</p>
          <div className="dashboard-welcome-stats">
            <div className="dashboard-welcome-stat">
              <div className="dashboard-welcome-indicator"></div>
              <span className="dashboard-welcome-stat-text">Chain Fusion operational</span>
            </div>
            <div className="dashboard-welcome-stat">
              <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
              <span className="dashboard-welcome-stat-text">+12.5% portfolio growth</span>
            </div>
            <div className="dashboard-welcome-stat">
              <div style={{ width: '0.75rem', height: '0.75rem', background: '#A78BFA', borderRadius: '50%' }}></div>
              <span className="dashboard-welcome-stat-text">NAFEZA integration active</span>
            </div>
          </div>
        </div>
        <div className="dashboard-welcome-bg"></div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-quick-actions">
        <h3 className="dashboard-section-subtitle">Quick Actions</h3>
        <div className="dashboard-quick-actions-grid">
          {quickActions.map((action, index) => (
            <button key={index} className="dashboard-quick-action-card">
              <div className="dashboard-quick-action-icon" style={{ background: action.color }}>
                <action.icon style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
              </div>
              <span className="dashboard-quick-action-title">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        {statsCards.map((card, index) => (
          <div key={index} className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className={`dashboard-stat-icon ${card.title.toLowerCase().replace(' ', '-')}`}>
                <card.icon style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                <span className="dashboard-stat-percentage">{card.percentage}</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>{card.title}</p>
              <div className="dashboard-stat-value">{card.value}</div>
              <div className={`dashboard-stat-change ${card.change.includes('+') ? 'positive' : 'negative'}`}>
                {card.change}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-grid">
        {/* Recent Activity */}
        <div className="dashboard-section dashboard-section-large">
          <div className="dashboard-section-header">
            <h3 className="dashboard-section-title">
              <FileText className="dashboard-section-icon" />
              Recent CargoX Document Transfers
            </h3>
            <button className="dashboard-section-action">
              View All
              <ArrowUpRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
            </button>
          </div>
          <div className="dashboard-documents-list">
            {documentTransfers.map((transfer, index) => (
              <div 
                key={index} 
                className="dashboard-document-card"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}>
                <div className="dashboard-document-header">
                  <div className="dashboard-document-info">
                    <div className="dashboard-document-icon">
                      <FileText style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                    </div>
                    <div className="dashboard-document-details">
                      <p className="dashboard-document-id">{transfer.id}</p>
                      <p className="dashboard-document-acid">ACID: {transfer.acid}</p>
                      <p className="dashboard-document-type">{transfer.type}</p>
                    </div>
                  </div>
                  <div className="dashboard-document-amount">
                    <p className="dashboard-document-value">{transfer.value}</p>
                    <span className={`dashboard-status ${transfer.status === 'Transferred' ? 'success' : transfer.status === 'In Progress' ? 'processing' : 'pending'}`}>
                      {transfer.status}
                    </span>
                  </div>
                </div>
                <div className="dashboard-document-footer">
                  <span className="dashboard-document-date">{transfer.date}</span>
                  <button className="dashboard-document-action">
                    <Eye style={{ width: '1rem', height: '1rem' }} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="dashboard-sidebar-content">
          {/* Loan Overview */}
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h3 className="dashboard-section-title">
                <DollarSign className="dashboard-section-icon" />
                ICRC-1 Loan Overview
              </h3>
              <button className="dashboard-section-action">View All</button>
            </div>
            <div className="dashboard-loans-list">
              {pendingLoans.map((loan, index) => (
                <div 
                  key={index} 
                  className="dashboard-loan-card"
                  onMouseEnter={() => setIsHovered(`loan-${index}`)}
                  onMouseLeave={() => setIsHovered(null)}>
                  <div className="dashboard-loan-header">
                    <div className="dashboard-loan-info">
                      <p className="dashboard-loan-id">{loan.docId}</p>
                      <p className="dashboard-loan-collateral">{loan.collateral}</p>
                    </div>
                    <span className={`dashboard-status ${loan.status === 'Approved' ? 'success' : loan.status === 'Processing' ? 'processing' : 'pending'}`}>
                      {loan.status}
                    </span>
                  </div>
                  <div className="dashboard-loan-details">
                    <div className="dashboard-loan-amount">{loan.amount}</div>
                    <div className="dashboard-loan-apr">{loan.apr} APR</div>
                  </div>
                  <div className="dashboard-loan-footer">
                    <span className="dashboard-loan-date">{loan.date}</span>
                    {loan.status === 'Approved' && (
                      <button className="dashboard-loan-action">Accept</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h3 className="dashboard-section-title">
                <Activity className="dashboard-section-icon" />
                System Status
              </h3>
            </div>
            <div className="dashboard-system-status">
              {systemStatus.map((service, index) => (
                <div key={index} className="dashboard-system-item">
                  <div className="dashboard-system-info">
                    <service.icon style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                    <span className="dashboard-system-name">{service.service}</span>
                  </div>
                  <div className="dashboard-system-details">
                    <span className="dashboard-system-uptime">{service.uptime}</span>
                    <span className="dashboard-system-status-badge">{service.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h3 className="dashboard-section-title">
                <BarChart3 className="dashboard-section-icon" />
                Recent Transactions
              </h3>
            </div>
            <div className="dashboard-transactions-list">
              {recentTransactions.map((tx, index) => (
                <div key={index} className="dashboard-transaction-item">
                  <div className="dashboard-transaction-info">
                    <p className="dashboard-transaction-type">{tx.type}</p>
                    <p className="dashboard-transaction-hash">{tx.txHash}</p>
                  </div>
                  <div className="dashboard-transaction-details">
                    <span className="dashboard-transaction-amount">{tx.amount}</span>
                    <span className="dashboard-transaction-date">{tx.date}</span>
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
          <h3 className="dashboard-section-title">
            <Target className="dashboard-section-icon" />
            Platform Insights
          </h3>
        </div>
        <div className="dashboard-insights-grid">
          <div className="dashboard-insight-card">
            <div className="dashboard-insight-header">
              <div className="dashboard-insight-icon">
                <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText style={{ width: '1rem', height: '1rem', color: '#ffffff' }} />
                </div>
              </div>
              <div className="dashboard-insight-title">CargoX Integration</div>
            </div>
            <div className="dashboard-insight-content">
              <p className="dashboard-insight-subtitle">Ethereum Documents</p>
              <p className="dashboard-insight-description">Monitoring bills of lading and shipping papers on Ethereum blockchain with real-time verification</p>
              <div className="dashboard-insight-metrics">
                <span className="dashboard-insight-metric">12 Active Documents</span>
                <span className="dashboard-insight-metric">99.9% Uptime</span>
              </div>
            </div>
          </div>

          <div className="dashboard-insight-card">
            <div className="dashboard-insight-header">
              <div className="dashboard-insight-icon">
                <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp style={{ width: '1rem', height: '1rem', color: '#ffffff' }} />
                </div>
              </div>
              <div className="dashboard-insight-title">NAFEZA Verification</div>
            </div>
            <div className="dashboard-insight-content">
              <p className="dashboard-insight-subtitle">ACID Validation</p>
              <p className="dashboard-insight-description">Advanced Cargo Information Declaration verification with Egyptian customs integration</p>
              <div className="dashboard-insight-metrics">
                <span className="dashboard-insight-metric">8 Verified Today</span>
                <span className="dashboard-insight-metric">100% Accuracy</span>
              </div>
            </div>
          </div>

          <div className="dashboard-insight-card">
            <div className="dashboard-insight-header">
              <div className="dashboard-insight-icon">
                <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign style={{ width: '1rem', height: '1rem', color: '#ffffff' }} />
                </div>
              </div>
              <div className="dashboard-insight-title">ICP NFT Minting</div>
            </div>
            <div className="dashboard-insight-content">
              <p className="dashboard-insight-subtitle">Immutable Documents</p>
              <p className="dashboard-insight-description">Tamper-proof NFT versions on Internet Computer blockchain with smart contract automation</p>
              <div className="dashboard-insight-metrics">
                <span className="dashboard-insight-metric">15 NFTs Minted</span>
                <span className="dashboard-insight-metric">0% Failure Rate</span>
              </div>
            </div>
          </div>

          <div className="dashboard-insight-card">
            <div className="dashboard-insight-header">
              <div className="dashboard-insight-icon">
                <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wallet style={{ width: '1rem', height: '1rem', color: '#ffffff' }} />
                </div>
              </div>
              <div className="dashboard-insight-title">Chain Fusion</div>
            </div>
            <div className="dashboard-insight-content">
              <p className="dashboard-insight-subtitle">Ethereum ↔ ICP</p>
              <p className="dashboard-insight-description">Seamless bridge between Ethereum and Internet Computer with automated cross-chain operations</p>
              <div className="dashboard-insight-metrics">
                <span className="dashboard-insight-metric">24/7 Operation</span>
                <span className="dashboard-insight-metric">2.3s Avg Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <Award className="dashboard-section-icon" />
            Performance Metrics
          </h3>
        </div>
        <div className="dashboard-metrics-grid">
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Document Processing</h4>
              <span className="dashboard-metric-value">98.5%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '98.5%' }}></div>
            </div>
            <p className="dashboard-metric-description">Success rate for document verification and NFT minting</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Loan Approval</h4>
              <span className="dashboard-metric-value">94.2%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '94.2%' }}></div>
            </div>
            <p className="dashboard-metric-description">Automated loan approval rate with smart contract execution</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">System Uptime</h4>
              <span className="dashboard-metric-value">99.9%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '99.9%' }}></div>
            </div>
            <p className="dashboard-metric-description">Platform availability and reliability metrics</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">User Satisfaction</h4>
              <span className="dashboard-metric-value">4.8/5</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '96%' }}></div>
            </div>
            <p className="dashboard-metric-description">User experience and platform satisfaction rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 