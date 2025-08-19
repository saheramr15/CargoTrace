import React, { useState } from 'react';
import { DollarSign, CheckCircle, Clock, FileText, TrendingUp } from 'lucide-react';

const DashboardRepayment = () => {
  const [isHovered, setIsHovered] = useState(null);

  const activeLoans = [
    { docId: 'WXYZ...9012', amount: '$40,000', dueDate: '2024-09-15', status: 'Active', repaid: '$15,000', progress: 37.5 },
    { docId: 'MNOP...3456', amount: '$60,000', dueDate: '2024-10-01', status: 'Overdue', repaid: '$30,000', progress: 50 }
  ];

  const summaryCards = [
    { title: 'Total Outstanding', value: '$55,000', subtext: 'Across 2 active loans', icon: DollarSign, gradient: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)' },
    { title: 'Total Repaid', value: '$45,000', subtext: '45% of total loans', icon: CheckCircle, gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
    { title: 'Next Payment', value: 'Sep 15', subtext: '$5,000 due', icon: Clock, gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Summary Cards */}
      <div className="dashboard-stats-grid">
        {summaryCards.map((card, index) => (
          <div key={index} className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon" style={{ background: card.gradient }}>
                <card.icon style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
              </div>
              <TrendingUp className="dashboard-stat-arrow" />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>{card.title}</p>
              <div className="dashboard-stat-value">{card.value}</div>
              <div className="dashboard-stat-change positive">{card.subtext}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Loans */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <FileText className="dashboard-section-icon" />
            Active Loans
          </h3>
          <button className="dashboard-section-action">
            Payment History
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {activeLoans.map((loan, index) => (
            <div 
              key={index} 
              className="dashboard-card"
              onMouseEnter={() => setIsHovered(`active-loan-${index}`)}
              onMouseLeave={() => setIsHovered(null)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)', 
                    borderRadius: '0.75rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <FileText style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '1.125rem' }}>Document: {loan.docId}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Due: {loan.dueDate}</p>
                  </div>
                </div>
                <span className={`dashboard-status ${loan.status === 'Active' ? 'success' : 'rejected'}`}>
                  {loan.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Total Amount</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>{loan.amount}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Repaid</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>{loan.repaid}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Remaining</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>
                    ${(parseInt(loan.amount.replace(/[$,]/g, '')) - parseInt(loan.repaid.replace(/[$,]/g, ''))).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Interest Rate</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>4.2%</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Repayment Progress</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>{loan.progress}%</span>
                </div>
                <div style={{ width: '100%', backgroundColor: 'rgba(167, 139, 250, 0.2)', borderRadius: '9999px', height: '0.75rem' }}>
                  <div 
                    style={{ 
                      height: '0.75rem', 
                      borderRadius: '9999px', 
                      transition: 'all 0.5s', 
                      background: loan.status === 'Active' ? 'linear-gradient(to right, #A78BFA, #7C3AED)' : 'linear-gradient(to right, #ef4444, #dc2626)', 
                      width: `${loan.progress}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Enter payment amount"
                    className="dashboard-form-input"
                  />
                </div>
                <button className="dashboard-submit-button">
                  Make Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardRepayment; 