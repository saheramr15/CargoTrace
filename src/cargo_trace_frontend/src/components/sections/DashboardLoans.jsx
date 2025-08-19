import React, { useState } from 'react';
import { DollarSign, CreditCard, Calendar, Percent } from 'lucide-react';

const DashboardLoans = () => {
  const [isHovered, setIsHovered] = useState(null);

  const pendingLoans = [
    { docId: 'ABCD...1234', amount: '$50,000', date: '2024-08-01', status: 'Pending', apr: '4.5%' },
    { docId: 'EFGH...5678', amount: '$75,000', date: '2024-08-02', status: 'Approved', apr: '3.8%' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Loan Request Form */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <CreditCard className="dashboard-section-icon" />
            Request New Loan
          </h3>
        </div>
        <p className="dashboard-section-description">Use verified documents as collateral for trade finance</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="dashboard-form-field">
              <label className="dashboard-form-label">Select Document NFT</label>
              <select className="dashboard-form-input">
                <option>ABCD...1234 - $50,000 Trade Value</option>
                <option>EFGH...5678 - $75,000 Trade Value</option>
                <option>IJKL...9012 - $30,000 Trade Value</option>
              </select>
            </div>
            
            <div className="dashboard-form-grid">
              <div className="dashboard-form-field">
                <label className="dashboard-form-label">Loan Amount</label>
                <input
                  type="text"
                  placeholder="$50,000"
                  className="dashboard-form-input"
                />
              </div>
              <div className="dashboard-form-field">
                <label className="dashboard-form-label">Interest Rate</label>
                <input
                  type="text"
                  value="4.5% APR"
                  disabled
                  className="dashboard-form-input"
                  style={{ cursor: 'not-allowed', opacity: 0.6 }}
                />
              </div>
              <div className="dashboard-form-field">
                <label className="dashboard-form-label">Repayment Date</label>
                <input
                  type="date"
                  className="dashboard-form-input"
                />
              </div>
            </div>
            
            <button className="dashboard-submit-button">
              Submit Loan Request
            </button>
          </div>
      </div>

      {/* Pending Loans */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <DollarSign className="dashboard-section-icon" />
            Pending Loan Requests
          </h3>
          <span className="dashboard-section-count">{pendingLoans.length} requests</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pendingLoans.map((loan, index) => (
            <div 
              key={index} 
              className="dashboard-card"
              onMouseEnter={() => setIsHovered(`pending-loan-${index}`)}
              onMouseLeave={() => setIsHovered(null)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)', 
                      borderRadius: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <DollarSign style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.875rem' }}>Document: {loan.docId}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Requested: {loan.date}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Amount:</span>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#1f2937' }}>{loan.amount}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Interest Rate:</span>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#1f2937' }}>{loan.apr}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Status:</span>
                      <div>
                        <span className={`dashboard-status ${loan.status === 'Approved' ? 'success' : 'pending'}`}>
                          {loan.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {loan.status === 'Approved' && (
                  <button className="dashboard-action-button primary">
                    Accept Loan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoans; 