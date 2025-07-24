import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const DashboardLoans = () => {
  const [isHovered, setIsHovered] = useState(null);

  const pendingLoans = [
    { docId: 'ABCD...1234', amount: '$50,000', date: '2024-08-01', status: 'Pending', apr: '4.5%' },
    { docId: 'EFGH...5678', amount: '$75,000', date: '2024-08-02', status: 'Approved', apr: '3.8%' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: '"Inter", sans-serif', backgroundColor: '#1f2937', padding: '2rem' }}>
      {/* Loan Request Form */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
        <div style={{ maxWidth: '48rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Request New Loan</h3>
          <p style={{ color: '#d1d5db', marginBottom: '2rem', fontSize: '0.875rem' }}>Use verified documents as collateral for trade finance</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>Select Document NFT</label>
              <select style={{ 
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
              onBlur={(e) => e.target.style.boxShadow = 'none'}>
                <option style={{ backgroundColor: '#4b5563', color: '#ffffff' }}>ABCD...1234 - $50,000 Trade Value</option>
                <option style={{ backgroundColor: '#4b5563', color: '#ffffff' }}>EFGH...5678 - $75,000 Trade Value</option>
                <option style={{ backgroundColor: '#4b5563', color: '#ffffff' }}>IJKL...9012 - $30,000 Trade Value</option>
              </select>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>Loan Amount</label>
                <input
                  type="text"
                  placeholder="$50,000"
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
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>Interest Rate</label>
                <input
                  type="text"
                  value="4.5% APR"
                  disabled
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: '1px solid #4b5563', 
                    borderRadius: '0.75rem', 
                    backgroundColor: '#4b5563', 
                    color: '#d1d5db', 
                    fontSize: '0.875rem',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>Repayment Date</label>
                <input
                  type="date"
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
            </div>
            
            <button style={{ 
              backgroundColor: '#7c3aed', 
              color: '#ffffff', 
              padding: '1rem 2rem', 
              borderRadius: '0.75rem', 
              fontWeight: '600', 
              fontSize: '0.875rem',
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
              Submit Loan Request
            </button>
          </div>
        </div>
      </div>

      {/* Pending Loans */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', letterSpacing: '-0.025em' }}>Pending Loan Requests</h3>
          <span style={{ fontSize: '0.875rem', color: '#d1d5db', fontWeight: '500' }}>{pendingLoans.length} requests</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pendingLoans.map((loan, index) => (
            <div 
              key={index} 
              style={{ 
                border: '1px solid #4b5563', 
                borderRadius: '0.75rem', 
                padding: '1.5rem', 
                backgroundColor: isHovered === `pending-loan-${index}` ? '#4b5563' : '#374151',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setIsHovered(`pending-loan-${index}`)}
              onMouseLeave={() => setIsHovered(null)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
                      borderRadius: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <DollarSign style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#ffffff', fontSize: '0.875rem' }}>Document: {loan.docId}</p>
                      <p style={{ fontSize: '0.75rem', color: '#d1d5db' }}>Requested: {loan.date}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Amount:</span>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#ffffff' }}>{loan.amount}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Interest Rate:</span>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#ffffff' }}>{loan.apr}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Status:</span>
                      <div>
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.75rem', 
                          fontWeight: '500', 
                          backgroundColor: loan.status === 'Approved' ? '#064e3b' : '#4c1d95', 
                          color: '#ffffff',
                          transition: 'transform 0.3s'
                        }}>
                          {loan.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {loan.status === 'Approved' && (
                  <button style={{ 
                    backgroundColor: '#10b981', 
                    color: '#ffffff', 
                    padding: '0.75rem 1.5rem', 
                    borderRadius: '0.75rem', 
                    fontWeight: '500', 
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#10b981';
                    e.target.style.transform = 'translateY(0)';
                  }}>
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