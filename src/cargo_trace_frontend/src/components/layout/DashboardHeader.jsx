import React from 'react';
import { Search, Bell, Users } from 'lucide-react';

const DashboardHeader = ({ activeTab }) => {
  const getTabInfo = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          description: 'Monitor your trade finance portfolio and activities'
        };
      case 'documents':
        return {
          title: 'Documents',
          description: 'Manage document transfers and submissions'
        };
      case 'loans':
        return {
          title: 'Loan Requests',
          description: 'Request and manage trade finance loans'
        };
      case 'repayment':
        return {
          title: 'Repayments',
          description: 'Track and manage loan repayments'
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Monitor your trade finance portfolio and activities'
        };
    }
  };

  const tabInfo = getTabInfo();

  return (
    <header style={{ 
      backgroundColor: 'rgba(31, 41, 55, 0.95)', 
      backdropFilter: 'blur(12px)', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)', 
      borderBottom: '1px solid #4b5563', 
      padding: '1.5rem 2rem', 
      position: 'sticky', 
      top: 0, 
      zIndex: 10 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.025em', textTransform: 'capitalize' }}>
            {tabInfo.title}
          </h2>
          <p style={{ color: '#d1d5db', marginTop: '0.25rem', fontSize: '0.875rem' }}>
            {tabInfo.description}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{ 
            padding: '0.75rem', 
            color: '#d1d5db', 
            backgroundColor: '#374151', 
            borderRadius: '0.75rem', 
            border: '1px solid #4b5563',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#ffffff';
            e.target.style.backgroundColor = '#4b5563';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#d1d5db';
            e.target.style.backgroundColor = '#374151';
            e.target.style.transform = 'translateY(0)';
          }}>
            <Search style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
          <button style={{ 
            padding: '0.75rem', 
            color: '#d1d5db', 
            backgroundColor: '#374151', 
            borderRadius: '0.75rem', 
            border: '1px solid #4b5563',
            position: 'relative', 
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#ffffff';
            e.target.style.backgroundColor = '#4b5563';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#d1d5db';
            e.target.style.backgroundColor = '#374151';
            e.target.style.transform = 'translateY(0)';
          }}>
            <Bell style={{ width: '1.25rem', height: '1.25rem' }} />
            <div style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', width: '0.75rem', height: '0.75rem', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
          </button>
          <div style={{ 
            width: '2.5rem', 
            height: '2.5rem', 
            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
            borderRadius: '0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            <Users style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 