import React from 'react';

const CustomsIntegrationSimple = () => {
  return (
    <div className="dashboard-content">
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">Customs Integration</h2>
          <p className="dashboard-section-description">
            Link CargoX NFT hashes to ACID numbers for customs verification
          </p>
        </div>
        
        <div className="p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Customs Integration Module
          </h3>
          <p className="text-gray-600 mb-6">
            This feature is currently being loaded. Please wait...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomsIntegrationSimple;
