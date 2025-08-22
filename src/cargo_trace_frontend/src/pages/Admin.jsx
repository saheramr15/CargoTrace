import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminDashboard from '../components/admin/sections/AdminDashboard';
import AdminDocuments from '../components/admin/sections/AdminDocuments';
import AdminLoans from '../components/admin/sections/AdminLoans';
import AdminRepayments from '../components/admin/sections/AdminRepayments';
import AdminUsers from '../components/admin/sections/AdminUsers';
import AdminBlockchain from '../components/admin/sections/AdminBlockchain';
import AdminAcid from '../components/admin/sections/AdminAcid';
import AdminNfts from '../components/admin/sections/AdminNfts';
import AdminAudit from '../components/admin/sections/AdminAudit';
import AdminReports from '../components/admin/sections/AdminReports';
import AdminSettings from '../components/admin/sections/AdminSettings';

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
      case 'blockchain':
        return <AdminBlockchain />;
      case 'acid':
        return <AdminAcid />;
      case 'nfts':
        return <AdminNfts />;
      case 'audit':
        return <AdminAudit />;
      case 'reports':
        return <AdminReports />;
      case 'settings':
        return <AdminSettings />;
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
