import React from 'react';
import { Home, FileText, DollarSign, CreditCard, Ship, Wallet } from 'lucide-react';

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'loans', label: 'Loan Requests', icon: DollarSign },
    { id: 'repayment', label: 'Repayments', icon: CreditCard },
  ];

  return (
    <div style={{ 
      width: '18rem', 
      backgroundColor: '#1f2937', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      position: 'sticky', 
      top: 0 
    }}>
      {/* Logo Section */}
      <div style={{ padding: '2rem', borderBottom: '1px solid #4b5563' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            width: '3rem', 
            height: '3rem', 
            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
            borderRadius: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)' 
          }}>
            <Ship style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.025em' }}>CargoTrace</h1>
            <p style={{ fontSize: '0.875rem', color: '#d1d5db', fontWeight: '500' }}>Trade Finance</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav style={{ flex: 1, padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1rem', 
                borderRadius: '0.75rem', 
                textAlign: 'left', 
                transition: 'all 0.3s ease', 
                backgroundColor: activeTab === item.id ? '#7c3aed' : 'transparent', 
                color: activeTab === item.id ? '#ffffff' : '#d1d5db'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = activeTab === item.id ? '#6d28d9' : '#374151'}
              onMouseLeave={(e) => e.target.style.backgroundColor = activeTab === item.id ? '#7c3aed' : 'transparent'}>
              <item.icon style={{ 
                width: '1.25rem', 
                height: '1.25rem', 
                transform: activeTab === item.id ? 'scale(1.1)' : 'none', 
                transition: 'transform 0.3s', 
                color: activeTab === item.id ? '#ffffff' : '#d1d5db' 
              }} />
              <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Wallet Section */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #4c1d95, #6b21a8)', 
          border: '1px solid #6b21a8', 
          borderRadius: '1rem', 
          padding: '1.5rem',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ 
              width: '2.5rem', 
              height: '2.5rem', 
              backgroundColor: '#4c1d95', 
              borderRadius: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Wallet style={{ width: '1.25rem', height: '1.25rem', color: '#e9d5ff' }} />
            </div>
            <span style={{ fontWeight: '600', color: '#e9d5ff', fontSize: '0.875rem' }}>ICP Wallet</span>
          </div>
          <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.25rem', letterSpacing: '-0.025em' }}>10.248 ICP</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
            <span style={{ fontSize: '0.875rem', color: '#e9d5ff', fontWeight: '500' }}>Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar; 