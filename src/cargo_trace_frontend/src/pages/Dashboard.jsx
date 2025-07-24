import React, { useState } from 'react';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import DashboardHeader from '../components/layout/DashboardHeader';
import DashboardHome from '../components/sections/DashboardHome';
import DashboardDocuments from '../components/sections/DashboardDocuments';
import DashboardLoans from '../components/sections/DashboardLoans';
import DashboardRepayment from '../components/sections/DashboardRepayment';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'documents':
        return <DashboardDocuments />;
      case 'loans':
        return <DashboardLoans />;
      case 'repayment':
        return <DashboardRepayment />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1f2937', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      {/* Sidebar */}
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '4.5rem' }}>
        {/* Header */}
        <DashboardHeader activeTab={activeTab} />

        {/* Content */}
        <main style={{ flex: 1, padding: '2rem' }}>
          {renderContent()}
        </main>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
