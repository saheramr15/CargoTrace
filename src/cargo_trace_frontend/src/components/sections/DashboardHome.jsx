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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: '"Inter", sans-serif', backgroundColor: '#1f2937', padding: '2rem' }}>
      {/* Welcome Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #4c1d95, #6b21a8)', 
        borderRadius: '1rem', 
        padding: '2.5rem', 
        color: '#ffffff', 
        position: 'relative', 
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.05), transparent)' }}></div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.75rem', letterSpacing: '-0.025em' }}>Welcome back, User</h1>
          <p style={{ fontSize: '1.125rem', color: '#d1d5db', opacity: 0.9, marginBottom: '1.5rem' }}>Your trade finance portfolio is thriving</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '0.75rem', height: '0.75rem', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>All systems operational</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
              <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>+12.5% this month</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '0', top: '0', width: '12rem', height: '12rem', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent)', borderRadius: '50%', transform: 'translate(50%, -50%)' }}></div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {statsCards.map((card, index) => (
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
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ 
                width: '3.5rem', 
                height: '3.5rem', 
                background: card.gradient, 
                borderRadius: '0.75rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                <card.icon style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
              </div>
              <ArrowUpRight style={{ width: '1.25rem', height: '1.25rem', color: '#d1d5db', cursor: 'pointer', transition: 'color 0.3s' }} 
                onMouseOver={(e) => e.target.style.color = card.hoverColor}
                onMouseOut={(e) => e.target.style.color = '#d1d5db'} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.25rem' }}>{card.title}</p>
              <p style={{ fontSize: '1.75rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.025em' }}>{card.value}</p>
              <p style={{ fontSize: '0.875rem', color: card.changeColor, fontWeight: '500', marginTop: '0.25rem' }}>{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', '@media (max-width: 1024px)': { gridTemplateColumns: '1fr' } }}>
        <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', letterSpacing: '-0.025em' }}>Recent Document Transfers</h3>
            <button style={{ 
              color: '#7c3aed', 
              fontWeight: '500', 
              fontSize: '0.875rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem', 
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = '#6d28d9'}
            onMouseOut={(e) => e.target.style.color = '#7c3aed'}>
              View all
              <ArrowUpRight style={{ width: '1rem', height: '1rem' }} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {documentTransfers.map((transfer, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '1rem', 
                  backgroundColor: isHovered === index ? '#4b5563' : '#374151', 
                  borderRadius: '0.75rem', 
                  border: '1px solid #4b5563',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
                    borderRadius: '0.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <FileText style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#ffffff', fontSize: '0.875rem' }}>{transfer.id}</p>
                    <p style={{ fontSize: '0.75rem', color: '#d1d5db', fontFamily: 'monospace' }}>ACID: {transfer.acid}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600', color: '#ffffff', marginBottom: '0.25rem' }}>{transfer.value}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.75rem', 
                      fontWeight: '500', 
                      backgroundColor: transfer.status === 'Transferred' ? '#064e3b' : '#713f12', 
                      color: '#ffffff',
                      transition: 'transform 0.3s'
                    }}>
                      {transfer.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ffffff', marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>Loan Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingLoans.slice(0, 2).map((loan, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '0.75rem', 
                    backgroundColor: isHovered === `loan-${index}` ? '#4b5563' : '#374151', 
                    borderRadius: '0.75rem',
                    border: '1px solid #4b5563',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setIsHovered(`loan-${index}`)}
                  onMouseLeave={() => setIsHovered(null)}>
                  <div>
                    <p style={{ fontWeight: '600', color: '#ffffff', fontSize: '0.875rem' }}>{loan.docId}</p>
                    <p style={{ fontSize: '0.75rem', color: '#d1d5db' }}>{loan.amount} at {loan.apr}</p>
                  </div>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 