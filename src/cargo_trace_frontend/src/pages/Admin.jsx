import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminDashboard from '../components/admin/sections/AdminDashboard';
import AdminDocuments from '../components/admin/sections/AdminDocuments';
import AdminLoans from '../components/admin/sections/AdminLoans';
import AdminUsers from '../components/admin/sections/AdminUsers';
import AdminSettings from '../components/admin/sections/AdminSettings';
import AdminBlockchain from '../components/admin/sections/AdminBlockchain';
import AdminACID from '../components/admin/sections/AdminACID';
import AdminNFTs from '../components/admin/sections/AdminNFTs';
import AdminAudit from '../components/admin/sections/AdminAudit';
import AdminReports from '../components/admin/sections/AdminReports';

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
      case 'users':
        return <AdminUsers />;
      case 'settings':
        return <AdminSettings />;
      case 'blockchain':
        return <AdminBlockchain />;
      case 'acid':
        return <AdminACID />;
      case 'nfts':
        return <AdminNFTs />;
      case 'audit':
        return <AdminAudit />;
      case 'reports':
        return <AdminReports />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="admin-container">
      {/* Admin Sidebar */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="admin-main-content">
        {/* Header */}
        <AdminHeader 
          activeTab={activeTab} 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Content */}
        <main className="admin-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
