import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Wallet, 
  ArrowUpRight 
} from 'lucide-react';

const DashboardHome = () => {
  const [isHovered, setIsHovered] = useState(null);

  const documentTransfers = [
    { id: '0x1234...abcd', acid: '123456789', status: 'Transferred', date: '2024-08-01', value: '$45,000' },
    { id: '0xabcd...5678', acid: '987654321', status: 'In Progress', date: '2024-08-02', value: '$32,500' },
    { id: '0x5678...efgh', acid: '456766123', status: 'Transferred', date: '2024-08-03', value: '$58,750' }
  ];

  const pendingLoans = [
    { docId: 'ABCD...1234', amount: '$50,000', date: '2024-08-01', status: 'Pending', apr: '4.5%' },
    { docId: 'EFGH...5678', amount: '$75,000', date: '2024-08-02', status: 'Approved', apr: '3.8%' }
  ];

  const statsCards = [
    { title: 'ICP Balance', value: '10.248 ICP', change: '+2.4% from last week', icon: Wallet, gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)', changeColor: '#10b981', hoverColor: '#6d28d9' },
    { title: 'Active Documents', value: '12', change: '3 processed today', icon: FileText, gradient: 'linear-gradient(135deg, #10b981, #047857)', changeColor: '#10b981', hoverColor: '#059669' },
    { title: 'Total Loans', value: '$185,000', change: '$45k repaid', icon: DollarSign, gradient: 'linear-gradient(135deg, #f97316, #ea580c)', changeColor: '#f97316', hoverColor: '#ea580c' },
    { title: 'Credit Score', value: '850', change: 'Excellent rating', icon: TrendingUp, gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', changeColor: '#8b5cf6', hoverColor: '#7c3aed' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="dashboard-welcome-content">
          <h1>Welcome back, User</h1>
          <p>Your trade finance portfolio is thriving</p>
          <div className="dashboard-welcome-stats">
            <div className="dashboard-welcome-stat">
              <div className="dashboard-welcome-indicator"></div>
              <span className="dashboard-welcome-stat-text">All systems operational</span>
            </div>
            <div className="dashboard-welcome-stat">
              <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
              <span className="dashboard-welcome-stat-text">+12.5% this month</span>
            </div>
          </div>
        </div>
        <div className="dashboard-welcome-bg"></div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        {statsCards.map((card, index) => (
          <div key={index} className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className={`dashboard-stat-icon ${card.title.toLowerCase().replace(' ', '-')}`}>
                <card.icon style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
              </div>
              <ArrowUpRight className="dashboard-stat-arrow" />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>{card.title}</p>
              <div className="dashboard-stat-value">{card.value}</div>
              <div className={`dashboard-stat-change ${card.change.includes('+') ? 'positive' : 'negative'}`}>
                {card.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h3 className="dashboard-section-title">
              <FileText className="dashboard-section-icon" />
              Recent Document Transfers
            </h3>
            <button className="dashboard-section-action">
              View All
              <ArrowUpRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {documentTransfers.map((transfer, index) => (
              <div 
                key={index} 
                className="dashboard-card"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)', 
                      borderRadius: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <FileText style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.875rem' }}>{transfer.id}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', fontFamily: 'monospace' }}>ACID: {transfer.acid}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{transfer.value}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`dashboard-status ${transfer.status === 'Transferred' ? 'success' : 'pending'}`}>
                        {transfer.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h3 className="dashboard-section-title">
                <DollarSign className="dashboard-section-icon" />
                Loan Overview
              </h3>
              <button className="dashboard-section-action">View All</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingLoans.slice(0, 2).map((loan, index) => (
                <div 
                  key={index} 
                  className="dashboard-card"
                  onMouseEnter={() => setIsHovered(`loan-${index}`)}
                  onMouseLeave={() => setIsHovered(null)}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.875rem' }}>{loan.docId}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{loan.amount} at {loan.apr}</p>
                    </div>
                    <span className={`dashboard-status ${loan.status === 'Approved' ? 'success' : 'pending'}`}>
                      {loan.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 