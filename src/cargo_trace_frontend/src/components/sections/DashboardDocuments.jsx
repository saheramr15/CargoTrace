import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Calendar,
  Building2,
  Globe
} from 'lucide-react';

const DashboardDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');

  // Focused document data
  const mockDocuments = [
    {
      id: 'CX-2024-001',
      acid: 'ACID-EG-2024-789456',
      type: 'Bill of Lading',
      description: 'Electronics shipment from China - Samsung Electronics',
      value: '$125,000',
      status: 'verified',
      date: '2024-01-15',
      nftId: 'NFT-ICP-001',
      cargoDetails: 'Electronics, 500 units',
      origin: 'China',
      destination: 'Egypt',
      shipper: 'Samsung Electronics Co.',
      consignee: 'TechTrade Egypt'
    },
    {
      id: 'CX-2024-002',
      acid: 'ACID-EG-2024-789457',
      type: 'Commercial Invoice',
      description: 'Textile imports from Turkey - Cotton fabrics',
      value: '$89,500',
      status: 'pending',
      date: '2024-01-14',
      nftId: null,
      cargoDetails: 'Cotton fabrics, 2000 kg',
      origin: 'Turkey',
      destination: 'Egypt',
      shipper: 'Turkish Textiles Ltd.',
      consignee: 'Egyptian Garments Co.'
    },
    {
      id: 'CX-2024-003',
      acid: 'ACID-EG-2024-789458',
      type: 'Certificate of Origin',
      description: 'Agricultural products from Kenya - Coffee beans',
      value: '$67,200',
      status: 'nft-minted',
      date: '2024-01-13',
      nftId: 'NFT-ICP-002',
      cargoDetails: 'Coffee beans, 1500 kg',
      origin: 'Kenya',
      destination: 'Egypt',
      shipper: 'Kenya Coffee Exporters',
      consignee: 'Cairo Coffee Roasters'
    },
    {
      id: 'CX-2024-004',
      acid: 'ACID-EG-2024-789459',
      type: 'Packing List',
      description: 'Machinery parts from Germany - Industrial equipment',
      value: '$234,000',
      status: 'rejected',
      date: '2024-01-12',
      nftId: null,
      cargoDetails: 'Industrial machinery parts',
      origin: 'Germany',
      destination: 'Egypt',
      shipper: 'German Industrial GmbH',
      consignee: 'Egyptian Manufacturing Co.'
    },
    {
      id: 'CX-2024-005',
      acid: 'ACID-EG-2024-789460',
      type: 'Bill of Lading',
      description: 'Pharmaceuticals from Switzerland - Medical supplies',
      value: '$156,800',
      status: 'verified',
      date: '2024-01-11',
      nftId: 'NFT-ICP-003',
      cargoDetails: 'Pharmaceuticals, temperature controlled',
      origin: 'Switzerland',
      destination: 'Egypt',
      shipper: 'Swiss Pharma AG',
      consignee: 'Egyptian Healthcare Ltd.'
    }
  ];

  const documentStats = {
    total: mockDocuments.length,
    pending: mockDocuments.filter(doc => doc.status === 'pending').length,
    verified: mockDocuments.filter(doc => doc.status === 'verified').length,
    nftMinted: mockDocuments.filter(doc => doc.status === 'nft-minted').length,
    rejected: mockDocuments.filter(doc => doc.status === 'rejected').length,
    totalValue: mockDocuments.reduce((sum, doc) => sum + parseFloat(doc.value.replace('$', '').replace(',', '')), 0)
  };

  const documentTypes = [
    'Bill of Lading',
    'Commercial Invoice',
    'Certificate of Origin',
    'Packing List',
    'Customs Declaration',
    'Insurance Certificate',
    'Phytosanitary Certificate',
    'Fumigation Certificate'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'pending';
      case 'nft-minted': return 'nft-minted';
      case 'rejected': return 'rejected';
      default: return 'pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'pending': return Clock;
      case 'nft-minted': return Shield;
      case 'rejected': return AlertCircle;
      default: return Clock;
    }
  };

  const filteredDocuments = mockDocuments.filter(document => {
    const matchesSearch = document.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.acid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || document.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmitDocument = (e) => {
    e.preventDefault();
    console.log('Submitting document:', { documentType, description });
  };

  return (
    <div className="dashboard-documents-container">
      {/* Document Statistics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Document Overview
          </h2>
        </div>
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon documents">
                <FileText size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">+15.2%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">{documentStats.total}</div>
            <div className="dashboard-stat-label">Total Documents</div>
            <div className="dashboard-stat-description">CargoX documents processed</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon nfts">
              <Shield size={24} color="white" />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp size={16} />
              <span className="dashboard-stat-percentage">+22.1%</span>
            </div>
            <div className="dashboard-stat-value">{documentStats.nftMinted}</div>
            <div className="dashboard-stat-label">NFTs Minted</div>
            <div className="dashboard-stat-description">ICP blockchain NFTs</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon loans">
                <Building2 size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">+8.7%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">${(documentStats.totalValue / 1000000).toFixed(1)}M</div>
            <div className="dashboard-stat-label">Total Value</div>
            <div className="dashboard-stat-description">Document cargo value</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon fusion">
                <Globe size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">99.9%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">{documentStats.verified}</div>
            <div className="dashboard-stat-label">Verified</div>
            <div className="dashboard-stat-description">NAFEZA verified documents</div>
          </div>
        </div>
      </div>

      {/* Document Submission Form */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Upload className="dashboard-section-icon" />
            Submit New Document
          </h2>
        </div>
        <form onSubmit={handleSubmitDocument} className="dashboard-form-grid">
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Document Type</label>
            <select 
              value={documentType} 
              onChange={(e) => setDocumentType(e.target.value)}
              className="dashboard-form-input"
              required
            >
              <option value="">Select document type</option>
              {documentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Cargo Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="dashboard-form-input"
              placeholder="Describe the cargo contents..."
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">CargoX Document ID</label>
            <input
              type="text"
              className="dashboard-form-input monospace"
              placeholder="0x1234...abcd"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">ACID Number</label>
            <input
              type="text"
              className="dashboard-form-input monospace"
              placeholder="ACID-EG-2024-XXXXXX"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Cargo Value (USD)</label>
            <input
              type="number"
              className="dashboard-form-input"
              placeholder="125000"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Origin Country</label>
            <input
              type="text"
              className="dashboard-form-input"
              placeholder="China"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Destination</label>
            <input
              type="text"
              className="dashboard-form-input"
              placeholder="Egypt"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Shipper</label>
            <input
              type="text"
              className="dashboard-form-input"
              placeholder="Company name"
              required
            />
          </div>
        </form>
        <button type="submit" className="dashboard-submit-button">
          <Upload size={16} />
          Submit Document for Verification
        </button>
      </div>

      {/* Document Management */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <FileText className="dashboard-section-icon" />
            Document Management
          </h2>
          <div className="dashboard-section-actions">
            <span className="dashboard-section-count">{filteredDocuments.length} documents</span>
            <button className="dashboard-section-action">
              <Download size={16} />
              Export Data
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="dashboard-action-bar">
          <div className="dashboard-search-container">
            <Search className="dashboard-search-icon" />
            <input
              type="text"
              placeholder="Search by ID, ACID, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dashboard-search-input"
            />
          </div>
          <div className="dashboard-action-buttons">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="dashboard-action-button secondary"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="nft-minted">NFT Minted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Documents Table */}
        <div className="dashboard-table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Document Info</th>
                <th>Type</th>
                <th>ACID Number</th>
                <th>Value</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((document) => {
                const StatusIcon = getStatusIcon(document.status);
                return (
                  <tr key={document.id} className="dashboard-table-row">
                    <td>
                      <div className="dashboard-document-info">
                        <div className="dashboard-document-icon">
                          <FileText size={16} color="white" />
                        </div>
                        <div>
                          <div className="dashboard-document-id">{document.id}</div>
                          <div className="dashboard-document-description">{document.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="dashboard-table-cell">{document.type}</td>
                    <td className="dashboard-table-cell monospace">{document.acid}</td>
                    <td className="dashboard-table-cell value">{document.value}</td>
                    <td>
                      <div className="dashboard-status-container">
                        <StatusIcon size={16} />
                        <span className={`dashboard-status ${getStatusColor(document.status)}`}>
                          {document.status.replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="dashboard-table-cell">{document.date}</td>
                    <td className="dashboard-table-actions">
                      <button className="dashboard-action-link">
                        <Eye size={14} />
                        View
                      </button>
                      {document.status === 'pending' && (
                        <button className="dashboard-action-link approve">
                          <CheckCircle size={14} />
                          Approve
                        </button>
                      )}
                      {document.status === 'nft-minted' && (
                        <button className="dashboard-action-link">
                          <Download size={14} />
                          Download NFT
                        </button>
                      )}
                      <button className="dashboard-action-link">
                        <Edit size={14} />
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardDocuments; 