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
    <div className="dashboard-container">
      {/* Sidebar */}
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="dashboard-main-content">
        {/* Header */}
        <DashboardHeader activeTab={activeTab} />

        {/* Content */}
        <main className="dashboard-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
