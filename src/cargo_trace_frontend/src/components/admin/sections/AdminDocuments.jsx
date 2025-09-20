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
  AlertCircle,
  Shield,
  Database,
  Hash,
  Download,
  RefreshCw,
  TrendingUp,
  FileCheck,
  FileX
} from 'lucide-react';
import { cargo_trace_backend as backend } from '../../../../../declarations/cargo_trace_backend';

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
      
      const docs = await backend.get_my_documents();
      
      // Transform backend documents to frontend format
      const transformedDocs = docs.map(doc => ({
        id: doc.id,
        type: 'Bill of Lading', // Default type
        status: getDocumentStatus(doc.status),
        company: 'Trade Company', // Default company
        value: `$${Number(doc.value_usd).toLocaleString()}`,
        createdAt: new Date(Number(doc.created_at) / 1000000).toLocaleDateString(),
        description: `Document for ACID: ${doc.acid_number}`,
        acidNumber: doc.acid_number,
        ethereumTxHash: doc.ethereum_tx_hash,
        owner: doc.owner.toString()
      }));

      setDocuments(transformedDocs);
    } catch (err) {
      console.error('Failed to load documents:', err);
      setError(err.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const getDocumentStatus = (status) => {
    if ('Pending' in status) return 'pending';
    if ('Verified' in status) return 'verified';
    if ('Rejected' in status) return 'rejected';
    if ('NftMinted' in status) return 'nft-minted';
    return 'pending';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
      case 'nft-minted':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      verified: 'bg-green-500/20 text-green-400 border border-green-500/30',
      'nft-minted': 'bg-green-500/20 text-green-400 border border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      rejected: 'bg-red-500/20 text-red-400 border border-red-500/30'
    };
    return `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-slate-500/20 text-slate-400 border border-slate-500/30'}`;
  };

  const handleVerifyDocument = async (documentId) => {
    try {
      setProcessingAction(documentId);
      setError(null);
      
      const result = await backend.approve_document(documentId);
      
      if ('Err' in result) {
        throw new Error(result.Err);
      }

      // Reload documents to reflect changes
      await loadDocuments();
      
      console.log('✅ Document approved successfully:', documentId);
    } catch (err) {
      console.error('Failed to approve document:', err);
      setError(err.message || 'Failed to approve document');
    } finally {
      setProcessingAction(null);
    }
  };

  const handleRejectDocument = async (documentId) => {
    try {
      setProcessingAction(documentId);
      setError(null);
      
      const result = await backend.reject_document(documentId, "Rejected by admin");
      
      if ('Err' in result) {
        throw new Error(result.Err);
      }

      // Reload documents to reflect changes
      await loadDocuments();
      
      console.log('✅ Document rejected successfully:', documentId);
    } catch (err) {
      console.error('Failed to reject document:', err);
      setError(err.message || 'Failed to reject document');
    } finally {
      setProcessingAction(null);
    }
  };

  const handleViewDocument = async (documentId) => {
    try {
      const backendDoc = await backend.get_document(documentId);
      
      if (!backendDoc) {
        throw new Error('Document not found');
      }

      const doc = {
        id: backendDoc.id,
        acid: backendDoc.acid_number,
        ethereumTxHash: backendDoc.ethereum_tx_hash,
        value: Number(backendDoc.value_usd),
        status: getDocumentStatus(backendDoc.status),
        createdAt: new Date(Number(backendDoc.created_at) / 1000000).toLocaleString(),
        owner: backendDoc.owner.toString()
      };

      console.log('Viewing document:', doc);
      alert(`Document Details:\nID: ${doc.id}\nACID: ${doc.acid}\nStatus: ${doc.status}\nValue: $${doc.value.toLocaleString()}\nEthereum TX: ${doc.ethereumTxHash}\nCreated: ${doc.createdAt}\nOwner: ${doc.owner}`);
    } catch (err) {
      console.error('Failed to load document details:', err);
      setError(err.message || 'Failed to load document details');
    }
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
      <div className="px-6 py-6 lg:pl-80 lg:pr-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Document Management</h1>
              <p className="text-slate-400">Manage trade documents and verification status</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur opacity-50"></div>
            </div>
            <p className="text-slate-300 text-lg">Loading documents...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-6 lg:pl-80 lg:pr-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Document Management</h1>
              <p className="text-slate-400">Manage trade documents and verification status</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative mb-6">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur opacity-50"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Error Loading Documents</h3>
            <p className="text-slate-300 mb-6 max-w-md">{error}</p>
            <button 
              onClick={loadDocuments}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5 shadow-lg hover:shadow-purple-500/25"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6 lg:pl-80 lg:pr-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Document Management</h1>
              <p className="text-slate-400">Manage trade documents and verification status</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <Hash size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-white">{documents.length}</span>
            <span className="text-xs text-slate-400">total documents</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" size={18} />
              <input
                type="text"
                placeholder="Search documents by ID, ACID, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="nft-minted">NFT Minted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <FileText className="w-16 h-16 text-slate-400" />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur opacity-50"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No documents found</h3>
            <p className="text-slate-400 text-center max-w-md">
              {documents.length === 0 
                ? "No documents have been submitted yet." 
                : "No documents match your search criteria."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/30 border-b border-slate-600/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Document ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ACID Number</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-700/30 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="group-hover:scale-110 transition-transform duration-300">
                          {getStatusIcon(doc.status)}
                        </div>
                        <span className="text-sm font-medium text-white">{doc.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-slate-300 bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-600/30">
                        {doc.acidNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{doc.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">{doc.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(doc.status)}>
                        {doc.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{doc.createdAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDocument(doc.id)}
                          className="group/btn p-2 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110"
                          title="View Document"
                        >
                          <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                        </button>
                        {doc.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleVerifyDocument(doc.id)}
                              disabled={processingAction === doc.id}
                              className="group/btn p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Approve Document"
                            >
                              {processingAction === doc.id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <CheckCircle size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                              )}
                            </button>
                            <button
                              onClick={() => handleRejectDocument(doc.id)}
                              disabled={processingAction === doc.id}
                              className="group/btn p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Reject Document"
                            >
                              {processingAction === doc.id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <XCircle size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDocuments;