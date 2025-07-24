import React, { useState } from 'react';
import { DollarSign, CheckCircle, Clock, FileText } from 'lucide-react';

const DashboardRepayment = () => {
  const [isHovered, setIsHovered] = useState(null);

  const activeLoans = [
    { docId: 'WXYZ...9012', amount: '$40,000', dueDate: '2024-09-15', status: 'Active', repaid: '$15,000', progress: 37.5 },
    { docId: 'MNOP...3456', amount: '$60,000', dueDate: '2024-10-01', status: 'Overdue', repaid: '$30,000', progress: 50 }
  ];

  const summaryCards = [
    { title: 'Total Outstanding', value: '$55,000', subtext: 'Across 2 active loans', icon: DollarSign, bgIcon: '#4c1d95', iconColor: '#e9d5ff' },
    { title: 'Total Repaid', value: '$45,000', subtext: '45% of total loans', icon: CheckCircle, bgIcon: '#064e3b', iconColor: '#10b981' },
    { title: 'Next Payment', value: 'Sep 15', subtext: '$5,000 due', icon: Clock, bgIcon: '#713f12', iconColor: '#fed7aa' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: '"Inter", sans-serif', backgroundColor: '#1f2937', padding: '2rem' }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {summaryCards.map((card, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: '#374151', 
              borderRadius: '1rem', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
              border: '1px solid #4b5563', 
              padding: '1.5rem', 
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-6px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: card.bgIcon, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <card.icon style={{ width: '1.25rem', height: '1.25rem', color: card.iconColor }} />
              </div>
              <h3 style={{ fontWeight: '600', color: '#d1d5db', fontSize: '1rem' }}>{card.title}</h3>
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.025em' }}>{card.value}</p>
            <p style={{ fontSize: '0.875rem', color: card.iconColor, fontWeight: '500', marginTop: '0.25rem' }}>{card.subtext}</p>
          </div>
        ))}
      </div>

      {/* Active Loans */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', letterSpacing: '-0.025em' }}>Active Loans</h3>
          <button style={{ 
            color: '#7c3aed', 
            fontWeight: '500', 
            fontSize: '0.875rem', 
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.color = '#6d28d9'}
          onMouseOut={(e) => e.target.style.color = '#7c3aed'}>
            Payment History
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {activeLoans.map((loan, index) => (
            <div 
              key={index} 
              style={{ 
                border: '1px solid #4b5563', 
                borderRadius: '0.75rem', 
                padding: '1.5rem', 
                backgroundColor: isHovered === `active-loan-${index}` ? '#4b5563' : '#374151',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setIsHovered(`active-loan-${index}`)}
              onMouseLeave={() => setIsHovered(null)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
                    borderRadius: '0.75rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <FileText style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#ffffff', fontSize: '1.125rem' }}>Document: {loan.docId}</p>
                    <p style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Due: {loan.dueDate}</p>
                  </div>
                </div>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '9999px', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  backgroundColor: loan.status === 'Active' ? '#4c1d95' : '#7f1d1d', 
                  color: '#ffffff',
                  transition: 'transform 0.3s'
                }}>
                  {loan.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '0.25rem' }}>Total Amount</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>{loan.amount}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '0.25rem' }}>Repaid</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>{loan.repaid}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '0.25rem' }}>Remaining</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>
                    ${(parseInt(loan.amount.replace(/[$,]/g, '')) - parseInt(loan.repaid.replace(/[$,]/g, ''))).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '0.25rem' }}>Interest Rate</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>4.2%</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db' }}>Repayment Progress</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db' }}>{loan.progress}%</span>
                </div>
                <div style={{ width: '100%', backgroundColor: '#4b5563', borderRadius: '9999px', height: '0.75rem' }}>
                  <div 
                    style={{ 
                      height: '0.75rem', 
                      borderRadius: '9999px', 
                      transition: 'all 0.5s', 
                      background: loan.status === 'Active' ? 'linear-gradient(to right, #7c3aed, #5b21b6)' : 'linear-gradient(to right, #ef4444, #dc2626)', 
                      width: `${loan.progress}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', '@media (min-width: 640px)': { flexDirection: 'row' } }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Enter payment amount"
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1rem', 
                      border: '1px solid #4b5563', 
                      borderRadius: '0.75rem', 
                      backgroundColor: '#4b5563', 
                      fontSize: '0.875rem',
                      color: '#ffffff',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>
                <button style={{ 
                  backgroundColor: '#7c3aed', 
                  color: '#ffffff', 
                  padding: '0.75rem 2rem', 
                  borderRadius: '0.75rem', 
                  fontWeight: '500', 
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap', 
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6d28d9';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#7c3aed';
                  e.target.style.transform = 'translateY(0)';
                }}>
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