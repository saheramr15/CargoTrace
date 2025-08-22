import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminDashboard from '../components/admin/sections/AdminDashboard';
import AdminDocuments from '../components/admin/sections/AdminDocuments';
import AdminLoans from '../components/admin/sections/AdminLoans';
import AdminRepayments from '../components/admin/sections/AdminRepayments';
import AdminUsers from '../components/admin/sections/AdminUsers';

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
    <div className="admin-container">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="admin-main-content">
        <AdminHeader 
          activeTab={activeTab} 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="admin-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
