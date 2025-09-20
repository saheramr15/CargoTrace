import React, { useState } from 'react';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import DashboardHeader from '../components/layout/DashboardHeader';
import DashboardHome from '../components/sections/DashboardHome';
import DashboardDocuments from '../components/sections/DashboardDocuments';
import DashboardLoans from '../components/sections/DashboardLoans';
import DashboardRepayment from '../components/sections/DashboardRepayment';
import CustomsIntegration from '../components/sections/CustomsIntegrationSafe';
// CSS imports removed - using Tailwind classes instead

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close mobile menu when tab changes
  };

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
      case 'customs':
        return <CustomsIntegration />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex relative overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader 
          activeTab={activeTab} 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Content */}
        <main className="flex-1 pt-16">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
