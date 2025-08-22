import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { backendService } from '../../../services/backendService';

const AdminDocuments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);

  // Load documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!backendService.isReady()) {
        throw new Error('Backend service not initialized');
      }

      const docs = await backendService.getMyDocuments();
      
      // Transform backend documents to frontend format
      const transformedDocs = docs.map(doc => ({
        id: doc.id,
        type: 'Bill of Lading', // Default type
        status: getDocumentStatus(doc.status),
        company: 'Trade Company', // Default company
        value: `$${doc.value_usd.toLocaleString()}`,
        createdAt: new Date(doc.created_at).toISOString(),
        description: `Document for ACID: ${doc.acid_number}`,
        acidNumber: doc.acid_number,
        ethereumTxHash: doc.ethereum_tx_hash,
        owner: doc.owner
      }));

      setDocuments(transformedDocs);
    } catch (err) {
      console.error('Failed to load documents:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDocumentStatus = (status) => {
    if (status.Pending !== undefined) return 'pending';
    if (status.Verified !== undefined) return 'verified';
    if (status.Rejected !== undefined) return 'rejected';
    if (status.NftMinted !== undefined) return 'verified'; // Treat NFT minted as verified
    return 'pending';
  };

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

  const handleVerifyDocument = async (documentId) => {
    try {
      setProcessingAction(documentId);
      
      if (!backendService.isReady()) {
        throw new Error('Backend service not initialized');
      }

      const result = await backendService.approveDocument(documentId);
      
      if (result.Err) {
        throw new Error(result.Err);
      }

      // Reload documents to reflect changes
      await loadDocuments();
      
      console.log('✅ Document verified successfully:', documentId);
    } catch (err) {
      console.error('Failed to verify document:', err);
      setError(err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleRejectDocument = async (documentId) => {
    try {
      setProcessingAction(documentId);
      
      // Note: The backend doesn't have a reject function, so we'll simulate it
      // In a real implementation, you'd add a reject_document function to the backend
      console.log('Rejecting document:', documentId);
      
      // For now, we'll just show a success message
      setTimeout(() => {
        setProcessingAction(null);
        loadDocuments();
      }, 1000);
      
    } catch (err) {
      console.error('Failed to reject document:', err);
      setError(err.message);
      setProcessingAction(null);
    }
  };

  const handleViewDocument = (document) => {
    console.log('Viewing document:', document);
    // In a real implementation, this would open a modal or navigate to a detail page
    alert(`Document Details:\nID: ${document.id}\nACID: ${document.acidNumber}\nStatus: ${document.status}\nValue: ${document.value}`);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.acidNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="admin-documents">
        <div className="admin-documents-header">
          <div className="admin-documents-title">
            <h2>Documents</h2>
            <p>Manage trade documents and verification status</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading documents...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-documents">
        <div className="admin-documents-header">
          <div className="admin-documents-title">
            <h2>Documents</h2>
            <p>Manage trade documents and verification status</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Documents</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={loadDocuments}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-documents">
      {/* Header */}
      <div className="admin-documents-header">
        <div className="admin-documents-title">
          <h2>Documents</h2>
          <p>Manage trade documents and verification status</p>
        </div>
        <div className="admin-documents-stats">
          <span className="text-sm text-gray-600">
            {documents.length} total documents
          </span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-documents-filters">
        <div className="admin-documents-search">
          <Search className="admin-documents-search-icon" />
          <input
            type="text"
            placeholder="Search documents by ID, ACID, or description..."
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
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">
              {documents.length === 0 
                ? "No documents have been submitted yet." 
                : "No documents match your search criteria."}
            </p>
          </div>
        ) : (
          <table className="admin-documents-table">
            <thead>
              <tr>
                <th>Document ID</th>
                <th>ACID Number</th>
                <th>Type</th>
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
                  <td className="font-mono text-sm">{doc.acidNumber}</td>
                  <td>{doc.type}</td>
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
                            disabled={processingAction === doc.id}
                            className="admin-documents-action-btn"
                            title="Verify Document"
                          >
                            {processingAction === doc.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleRejectDocument(doc.id)}
                            disabled={processingAction === doc.id}
                            className="admin-documents-action-btn"
                            title="Reject Document"
                          >
                            {processingAction === doc.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDocuments;
