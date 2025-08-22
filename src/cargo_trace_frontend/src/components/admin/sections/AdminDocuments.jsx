import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const AdminDocuments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const documents = [
    {
      id: 'BL-2024-001',
      type: 'Bill of Lading',
      status: 'verified',
      company: 'ABC Trading Co.',
      value: '$45,000',
      createdAt: '2024-01-15T10:30:00Z',
      description: 'Electronics shipment from China'
    },
    {
      id: 'BL-2024-002',
      type: 'Bill of Lading',
      status: 'pending',
      company: 'XYZ Import Ltd.',
      value: '$32,500',
      createdAt: '2024-01-15T11:15:00Z',
      description: 'Textile shipment from India'
    },
    {
      id: 'BL-2024-003',
      type: 'Bill of Lading',
      status: 'rejected',
      company: 'DEF Export Co.',
      value: '$28,750',
      createdAt: '2024-01-15T09:45:00Z',
      description: 'Agricultural products from Egypt'
    },
    {
      id: 'BL-2024-004',
      type: 'Certificate of Origin',
      status: 'verified',
      company: 'GHI Trading Ltd.',
      value: '$15,200',
      createdAt: '2024-01-15T08:20:00Z',
      description: 'Coffee beans from Ethiopia'
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
        return <Clock className="w-4 h-4 text-gray-500" />;
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
          <h2>Documents</h2>
          <p>Manage trade documents and verification status</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-documents-filters">
        <div className="admin-documents-search">
          <Search className="admin-documents-search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
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
        </div>
      </div>

      {/* Documents Table */}
      <div className="admin-documents-table-container">
        <table className="admin-documents-table">
          <thead>
            <tr>
              <th>Document ID</th>
              <th>Type</th>
              <th>Company</th>
              <th>Value</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => (
              <tr key={doc.id} className="admin-documents-table-row">
                <td>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc.status)}
                    <span className="font-medium">{doc.id}</span>
                  </div>
                </td>
                <td>{doc.type}</td>
                <td>{doc.company}</td>
                <td>{doc.value}</td>
                <td>
                  <span className={getStatusBadge(doc.status)}>
                    {doc.status}
                  </span>
                </td>
                <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDocument(doc)}
                      className="admin-documents-action-btn"
                      title="View Document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {doc.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleVerifyDocument(doc.id)}
                          className="admin-documents-action-btn"
                          title="Verify Document"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRejectDocument(doc.id)}
                          className="admin-documents-action-btn"
                          title="Reject Document"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDocuments;
