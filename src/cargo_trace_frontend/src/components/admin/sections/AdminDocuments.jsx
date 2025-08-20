import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  Shield,
  Database,
  Globe
} from 'lucide-react';

const AdminDocuments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [viewMode, setViewMode] = useState('table');

  // Mock data - in real app, this would come from API
  const documents = [
    {
      id: 'BL-2024-001',
      type: 'Bill of Lading',
      status: 'verified',
      company: 'ABC Trading Co.',
      acIdNumber: 'ACID-2024-001',
      ethereumHash: '0x1234...5678',
      icpNftId: 'NFT-001',
      value: '$45,000',
      createdAt: '2024-01-15T10:30:00Z',
      verifiedAt: '2024-01-15T10:35:00Z',
      description: 'Electronics shipment from China',
      blockchainStatus: 'synced'
    },
    {
      id: 'BL-2024-002',
      type: 'Bill of Lading',
      status: 'pending',
      company: 'XYZ Import Ltd.',
      acIdNumber: 'ACID-2024-002',
      ethereumHash: '0x5678...9012',
      icpNftId: null,
      value: '$32,500',
      createdAt: '2024-01-15T11:15:00Z',
      verifiedAt: null,
      description: 'Textile shipment from India',
      blockchainStatus: 'pending'
    },
    {
      id: 'BL-2024-003',
      type: 'Bill of Lading',
      status: 'rejected',
      company: 'DEF Export Co.',
      acIdNumber: 'ACID-2024-003',
      ethereumHash: '0x9012...3456',
      icpNftId: null,
      value: '$28,750',
      createdAt: '2024-01-15T09:45:00Z',
      verifiedAt: null,
      description: 'Agricultural products from Egypt',
      blockchainStatus: 'failed'
    },
    {
      id: 'BL-2024-004',
      type: 'Certificate of Origin',
      status: 'verified',
      company: 'GHI Trading Ltd.',
      acIdNumber: 'ACID-2024-004',
      ethereumHash: '0x3456...7890',
      icpNftId: 'NFT-002',
      value: '$15,200',
      createdAt: '2024-01-15T08:20:00Z',
      verifiedAt: '2024-01-15T08:25:00Z',
      description: 'Coffee beans from Ethiopia',
      blockchainStatus: 'synced'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleVerifyDocument = (documentId) => {
    console.log('Verifying document:', documentId);
  };

  const handleRejectDocument = (documentId) => {
    console.log('Rejecting document:', documentId);
  };

  const handleViewDocument = (document) => {
    console.log('Viewing document:', document);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-documents">
      {/* Header */}
      <div className="admin-documents-header">
        <div className="admin-documents-title">
          <h2>Document Management</h2>
          <p>Monitor and manage trade documents, verification status, and blockchain integration</p>
        </div>
        <div className="admin-documents-actions">
          <button className="admin-documents-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="admin-documents-action-btn">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-documents-filters">
        <div className="admin-documents-search">
          <Search className="admin-documents-search-icon" />
          <input
            type="text"
            placeholder="Search documents by ID, company, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-documents-search-input"
          />
        </div>
        <div className="admin-documents-filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-documents-status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="admin-documents-filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-documents-stats">
        <div className="admin-documents-stat-card">
          <div className="admin-documents-stat-icon">
            <FileText className="w-6 h-6" />
          </div>
          <div className="admin-documents-stat-content">
            <div className="admin-documents-stat-value">{documents.length}</div>
            <div className="admin-documents-stat-label">Total Documents</div>
          </div>
        </div>
        <div className="admin-documents-stat-card">
          <div className="admin-documents-stat-icon verified">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="admin-documents-stat-content">
            <div className="admin-documents-stat-value">
              {documents.filter(d => d.status === 'verified').length}
            </div>
            <div className="admin-documents-stat-label">Verified</div>
          </div>
        </div>
        <div className="admin-documents-stat-card">
          <div className="admin-documents-stat-icon pending">
            <Clock className="w-6 h-6" />
          </div>
          <div className="admin-documents-stat-content">
            <div className="admin-documents-stat-value">
              {documents.filter(d => d.status === 'pending').length}
            </div>
            <div className="admin-documents-stat-label">Pending</div>
          </div>
        </div>
        <div className="admin-documents-stat-card">
          <div className="admin-documents-stat-icon rejected">
            <XCircle className="w-6 h-6" />
          </div>
          <div className="admin-documents-stat-content">
            <div className="admin-documents-stat-value">
              {documents.filter(d => d.status === 'rejected').length}
            </div>
            <div className="admin-documents-stat-label">Rejected</div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="admin-documents-table-container">
        <table className="admin-documents-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDocuments(filteredDocuments.map(d => d.id));
                    } else {
                      setSelectedDocuments([]);
                    }
                  }}
                />
              </th>
              <th>Document ID</th>
              <th>Type</th>
              <th>Company</th>
              <th>ACID Number</th>
              <th>Status</th>
              <th>Value</th>
              <th>Blockchain</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((document) => (
              <tr key={document.id} className="admin-documents-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(document.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDocuments([...selectedDocuments, document.id]);
                      } else {
                        setSelectedDocuments(selectedDocuments.filter(id => id !== document.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <div className="admin-documents-id">
                    <span className="admin-documents-id-text">{document.id}</span>
                    <button className="admin-documents-copy-btn">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td>
                  <span className="admin-documents-type">{document.type}</span>
                </td>
                <td>
                  <div className="admin-documents-company">
                    <span>{document.company}</span>
                    <p className="admin-documents-description">{document.description}</p>
                  </div>
                </td>
                <td>
                  <div className="admin-documents-acid">
                    <span>{document.acIdNumber}</span>
                    <button className="admin-documents-copy-btn">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="admin-documents-status">
                    {getStatusIcon(document.status)}
                    <span className={getStatusBadge(document.status)}>
                      {document.status}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="admin-documents-value">{document.value}</span>
                </td>
                <td>
                  <div className="admin-documents-blockchain">
                    <div className="admin-documents-blockchain-item">
                      <Globe className="w-3 h-3" />
                      <span className="admin-documents-blockchain-hash">
                        {document.ethereumHash}
                      </span>
                    </div>
                    {document.icpNftId && (
                      <div className="admin-documents-blockchain-item">
                        <Database className="w-3 h-3" />
                        <span className="admin-documents-nft-id">
                          {document.icpNftId}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="admin-documents-date">
                    <span>{new Date(document.createdAt).toLocaleDateString()}</span>
                    <span className="admin-documents-time">
                      {new Date(document.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="admin-documents-actions-cell">
                    <button
                      className="admin-documents-action-btn small"
                      onClick={() => handleViewDocument(document)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {document.status === 'pending' && (
                      <>
                        <button
                          className="admin-documents-action-btn small success"
                          onClick={() => handleVerifyDocument(document.id)}
                          title="Verify Document"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          className="admin-documents-action-btn small danger"
                          onClick={() => handleRejectDocument(document.id)}
                          title="Reject Document"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      className="admin-documents-action-btn small"
                      title="View on Blockchain"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      {selectedDocuments.length > 0 && (
        <div className="admin-documents-bulk-actions">
          <span className="admin-documents-bulk-text">
            {selectedDocuments.length} document(s) selected
          </span>
          <div className="admin-documents-bulk-buttons">
            <button className="admin-documents-bulk-btn success">
              <CheckCircle className="w-4 h-4" />
              Verify Selected
            </button>
            <button className="admin-documents-bulk-btn danger">
              <XCircle className="w-4 h-4" />
              Reject Selected
            </button>
            <button className="admin-documents-bulk-btn">
              <Download className="w-4 h-4" />
              Export Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocuments;
