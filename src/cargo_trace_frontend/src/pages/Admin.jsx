import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminDashboard from '../components/admin/sections/AdminDashboard';
import AdminDocuments from '../components/admin/sections/AdminDocuments';
import AdminCustoms from '../components/admin/sections/AdminCustoms';
import AdminLoans from '../components/admin/sections/AdminLoans';
import AdminRepayments from '../components/admin/sections/AdminRepayments';
import AdminUsers from '../components/admin/sections/AdminUsers';
// CSS imports removed - using Tailwind classes instead

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'documents':
        return <AdminDocuments />;
      case 'customs':
        return <AdminCustoms />;
      case 'loans':
        return <AdminLoans />;
      case 'repayments':
        return <AdminRepayments />;
      case 'users':
        return <AdminUsers />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex relative overflow-hidden">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          activeTab={activeTab} 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="flex-1 pt-16">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
