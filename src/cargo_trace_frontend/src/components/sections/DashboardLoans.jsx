import React, { useState } from 'react';
import { DollarSign, CreditCard, Calendar, Percent, TrendingUp, CheckCircle, Clock, AlertCircle, BarChart3, Wallet, Shield, ArrowUpRight, Eye, Download } from 'lucide-react';

const DashboardLoans = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [repaymentDate, setRepaymentDate] = useState('');

  const availableDocuments = [
    { id: 'DOC001', value: 45000, type: 'Bill of Lading', status: 'NFT Minted', nftId: 'NFT #1234' },
    { id: 'DOC002', value: 32500, type: 'Commercial Invoice', status: 'NFT Minted', nftId: 'NFT #5678' },
    { id: 'DOC003', value: 58750, type: 'Packing List', status: 'NFT Minted', nftId: 'NFT #9012' }
  ];

  const pendingLoans = [
    { 
      id: 'LOAN001', 
      docId: 'DOC001', 
      amount: 50000, 
      date: '2024-08-01', 
      status: 'Pending', 
      apr: 4.5, 
      collateral: 'NFT #1234',
      requestedAmount: 50000,
      maxAmount: 45000
    },
    { 
      id: 'LOAN002', 
      docId: 'DOC002', 
      amount: 75000, 
      date: '2024-08-02', 
      status: 'Approved', 
      apr: 3.8, 
      collateral: 'NFT #5678',
      requestedAmount: 75000,
      maxAmount: 65000
    },
    { 
      id: 'LOAN003', 
      docId: 'DOC003', 
      amount: 30000, 
      date: '2024-08-03', 
      status: 'Processing', 
      apr: 4.2, 
      collateral: 'NFT #9012',
      requestedAmount: 30000,
      maxAmount: 30000
    }
  ];

  const loanStats = {
    totalRequested: pendingLoans.reduce((sum, loan) => sum + loan.requestedAmount, 0),
    totalApproved: pendingLoans.filter(l => l.status === 'Approved').reduce((sum, loan) => sum + loan.amount, 0),
    totalPending: pendingLoans.filter(l => l.status === 'Pending').reduce((sum, loan) => sum + loan.requestedAmount, 0),
    averageApr: (pendingLoans.reduce((sum, loan) => sum + loan.apr, 0) / pendingLoans.length).toFixed(1)
  };

  const handleSubmitLoan = () => {
    if (!selectedDocument || !loanAmount || !repaymentDate) {
      alert('Please fill in all fields');
      return;
    }
    // Handle loan submission
    console.log('Loan submitted:', { selectedDocument, loanAmount, repaymentDate });
  };

  const handleAcceptLoan = (loanId) => {
    console.log('Loan accepted:', loanId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending': return 'pending';
      case 'Processing': return 'processing';
      case 'Rejected': return 'rejected';
      default: return 'pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return CheckCircle;
      case 'Pending': return Clock;
      case 'Processing': return Clock;
      case 'Rejected': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="dashboard-loans-container">
      {/* Loan Statistics */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)' }}>
              <DollarSign style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
              <span className="dashboard-stat-percentage">+18.5%</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Total Requested</p>
            <div className="dashboard-stat-value">${loanStats.totalRequested.toLocaleString()}</div>
            <div className="dashboard-stat-change positive">Loan requests</div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
              <CheckCircle style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
              <span className="dashboard-stat-percentage">+25.2%</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Approved Loans</p>
            <div className="dashboard-stat-value">${loanStats.totalApproved.toLocaleString()}</div>
            <div className="dashboard-stat-change positive">ICRC-1 tokens</div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
              <Clock style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
              <span className="dashboard-stat-percentage">+12.8%</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Pending Requests</p>
            <div className="dashboard-stat-value">${loanStats.totalPending.toLocaleString()}</div>
            <div className="dashboard-stat-change positive">Under review</div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' }}>
              <Percent style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
              <span className="dashboard-stat-percentage">-2.1%</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Average APR</p>
            <div className="dashboard-stat-value">{loanStats.averageApr}%</div>
            <div className="dashboard-stat-change positive">Competitive rates</div>
          </div>
        </div>
      </div>

      {/* Loan Request Form */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <CreditCard className="dashboard-section-icon" />
            Request ICRC-1 Loan
          </h3>
        </div>
        <p className="dashboard-section-description">Use verified CargoX documents as collateral for ICRC-1 stable token loans. Smart contracts automatically process loan requests based on document value and credit score.</p>
          
        <div className="dashboard-form-grid">
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Select Document NFT *</label>
            <select 
              className="dashboard-form-input"
              value={selectedDocument}
              onChange={(e) => setSelectedDocument(e.target.value)}
            >
              <option value="">Choose a verified document...</option>
              {availableDocuments.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.id} - {doc.type} (${doc.value.toLocaleString()}) - {doc.nftId}
                </option>
              ))}
            </select>
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Loan Amount (USD) *</label>
            <input
              type="number"
              placeholder="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="dashboard-form-input"
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Interest Rate</label>
            <input
              type="text"
              value="4.5% APR (Auto-calculated)"
              disabled
              className="dashboard-form-input"
              style={{ cursor: 'not-allowed', opacity: 0.6 }}
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Repayment Date *</label>
            <input
              type="date"
              value={repaymentDate}
              onChange={(e) => setRepaymentDate(e.target.value)}
              className="dashboard-form-input"
            />
          </div>
          
          <div className="dashboard-form-field" style={{ gridColumn: 'span 2' }}>
            <label className="dashboard-form-label">Loan Terms</label>
            <div className="dashboard-loan-terms">
              <div className="dashboard-loan-term">
                <Shield style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                <span>Collateralized by verified NFT</span>
              </div>
              <div className="dashboard-loan-term">
                <Wallet style={{ width: '1rem', height: '1rem', color: '#7C3AED' }} />
                <span>ICRC-1 stable tokens</span>
              </div>
              <div className="dashboard-loan-term">
                <CheckCircle style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                <span>Automated smart contract execution</span>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSubmitLoan}
          className="dashboard-submit-button"
        >
          Submit Loan Request
        </button>
      </div>

      {/* Pending Loans */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <DollarSign className="dashboard-section-icon" />
            ICRC-1 Loan Requests
          </h3>
          <div className="dashboard-section-actions">
            <span className="dashboard-section-count">{pendingLoans.length} requests</span>
            <button className="dashboard-section-action">
              View All
              <ArrowUpRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
            </button>
          </div>
        </div>
        <div className="dashboard-loans-grid">
          {pendingLoans.map((loan, index) => {
            const StatusIcon = getStatusIcon(loan.status);
            const statusColor = getStatusColor(loan.status);
            return (
              <div 
                key={index} 
                className="dashboard-loan-card"
                onMouseEnter={() => setIsHovered(`pending-loan-${index}`)}
                onMouseLeave={() => setIsHovered(null)}>
                <div className="dashboard-loan-header">
                  <div className="dashboard-loan-info">
                    <div className="dashboard-loan-id-section">
                      <p className="dashboard-loan-id">Loan: {loan.id}</p>
                      <p className="dashboard-loan-doc">Document: {loan.docId}</p>
                    </div>
                    <p className="dashboard-loan-collateral">{loan.collateral}</p>
                  </div>
                  <div className="dashboard-loan-status">
                    <StatusIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    <span className={`dashboard-status ${statusColor}`}>
                      {loan.status}
                    </span>
                  </div>
                </div>
                
                <div className="dashboard-loan-details">
                  <div className="dashboard-loan-amount-section">
                    <div className="dashboard-loan-amount">${loan.amount.toLocaleString()}</div>
                    <div className="dashboard-loan-apr">{loan.apr}% APR</div>
                  </div>
                  
                  <div className="dashboard-loan-progress">
                    <div className="dashboard-loan-progress-label">
                      <span>Requested: ${loan.requestedAmount.toLocaleString()}</span>
                      <span>Max: ${loan.maxAmount.toLocaleString()}</span>
                    </div>
                    <div className="dashboard-loan-progress-bar">
                      <div 
                        className="dashboard-loan-progress-fill"
                        style={{ 
                          width: `${Math.min((loan.requestedAmount / loan.maxAmount) * 100, 100)}%`,
                          background: loan.requestedAmount > loan.maxAmount ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #A78BFA, #7C3AED)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-loan-footer">
                  <div className="dashboard-loan-date-section">
                    <span className="dashboard-loan-date">Requested: {loan.date}</span>
                    <span className="dashboard-loan-eta">
                      {loan.status === 'Pending' ? 'ETA: 24-48 hours' : 
                       loan.status === 'Processing' ? 'ETA: 2-4 hours' : 
                       'Ready for acceptance'}
                    </span>
                  </div>
                  
                  <div className="dashboard-loan-actions">
                    <button className="dashboard-loan-action-secondary">
                      <Eye style={{ width: '1rem', height: '1rem' }} />
                      Details
                    </button>
                    {loan.status === 'Approved' && (
                      <button 
                        onClick={() => handleAcceptLoan(loan.id)}
                        className="dashboard-loan-action-primary"
                      >
                        <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                        Accept Loan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loan Performance Metrics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Loan Performance Metrics
          </h3>
        </div>
        <div className="dashboard-metrics-grid">
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Approval Rate</h4>
              <span className="dashboard-metric-value">87.5%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '87.5%' }}></div>
            </div>
            <p className="dashboard-metric-description">Percentage of loan requests approved</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Average Processing Time</h4>
              <span className="dashboard-metric-value">2.3h</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '92%' }}></div>
            </div>
            <p className="dashboard-metric-description">Time from request to approval</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Collateral Utilization</h4>
              <span className="dashboard-metric-value">78.2%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '78.2%' }}></div>
            </div>
            <p className="dashboard-metric-description">Average loan-to-value ratio</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Default Rate</h4>
              <span className="dashboard-metric-value">0.8%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '99.2%' }}></div>
            </div>
            <p className="dashboard-metric-description">Very low default rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoans; 