import React, { useState, useEffect } from 'react';
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
  Globe,
  Loader2
} from 'lucide-react';
import { cargo_trace_backend as backend } from '../../../../declarations/cargo_trace_backend';

const DashboardDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [acidNumber, setAcidNumber] = useState('');
  const [ethereumTxHash, setEthereumTxHash] = useState('');
  const [valueUsd, setValueUsd] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [shipper, setShipper] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [processingAction, setProcessingAction] = useState(null);

  // Load documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const backendDocs = await backend.get_my_documents();
      
      // Transform backend documents to frontend format
      const transformedDocs = backendDocs.map(doc => ({
        id: doc.id,
        acid: doc.acid_number,
        type: 'Bill of Lading', // Default type
        description: `Document for ACID: ${doc.acid_number}`,
        value: `$${doc.value_usd.toString().toLocaleString()}`,
        status: getDocumentStatus(doc.status),
        date: new Date(Number(doc.created_at) / 1000000).toLocaleDateString(),
        nftId: 'NftMinted' in doc.status ? `NFT-ICP-${doc.id}` : null,
        cargoDetails: 'Cargo details',
        origin: 'Origin Country',
        destination: 'Destination Country',
        shipper: 'Shipper Company',
        consignee: 'Consignee Company',
        ethereumTxHash: doc.ethereum_tx_hash,
        rawValue: doc.value_usd, // Keep as BigInt
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

  const documentStats = {
    total: documents.length,
    pending: documents.filter(doc => doc.status === 'pending').length,
    verified: documents.filter(doc => doc.status === 'verified').length,
    nftMinted: documents.filter(doc => doc.status === 'nft-minted').length,
    rejected: documents.filter(doc => doc.status === 'rejected').length,
    totalValue: documents.reduce((sum, doc) => {
      const val = typeof doc.rawValue === 'bigint' ? doc.rawValue : BigInt(doc.rawValue || 0n);
      return sum + val;
    }, 0n).toString()
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

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.acid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || document.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmitDocument = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      setSuccessMessage('');
      
      // Validate required fields
      if (!acidNumber || !ethereumTxHash || !valueUsd) {
        throw new Error('Please fill in all required fields');
      }

      // Validate ACID number format
      if (acidNumber.length !== 9 || !/^\d+$/.test(acidNumber)) {
        throw new Error('ACID number must be exactly 9 digits');
      }

      // Validate value
      const value = parseInt(valueUsd);
      if (isNaN(value) || value <= 0) {
        throw new Error('Please enter a valid value');
      }

      // Submit document to backend
      const result = await backend.submit_document(acidNumber, ethereumTxHash, BigInt(value));
      
      if ('Err' in result) {
        throw new Error(result.Err);
      }

      // Clear form
      setDocumentType('');
      setDescription('');
      setAcidNumber('');
      setEthereumTxHash('');
      setValueUsd('');
      setOrigin('');
      setDestination('');
      setShipper('');

      // Show success message
      setSuccessMessage(`Document submitted successfully! Document ID: ${result.Ok}`);
      
      // Reload documents
      await loadDocuments();
      
      console.log('✅ Document submitted successfully:', result.Ok);
    } catch (err) {
      console.error('Failed to submit document:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleApproveDocument = async (documentId) => {
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
        value: backendDoc.value_usd.toString(),  // Convert BigInt to string for display
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

  if (loading) {
    return (
      <div className="dashboard-documents-container">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading documents...</span>
        </div>
      </div>
    );
  }

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
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon nfts">
                <Shield size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">+22.1%</span>
              </div>
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
            <div className="dashboard-stat-value">${(parseInt(documentStats.totalValue) / 1000000).toFixed(1)}M</div>
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
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700">{successMessage}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitDocument} className="dashboard-form-grid">
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Document Type</label>
            <select 
              value={documentType} 
              onChange={(e) => setDocumentType(e.target.value)}
              className="dashboard-form-input"
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
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">CargoX Document ID *</label>
            <input
              type="text"
              value={ethereumTxHash}
              onChange={(e) => setEthereumTxHash(e.target.value)}
              className="dashboard-form-input monospace"
              placeholder="0x1234...abcd"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">ACID Number *</label>
            <input
              type="text"
              value={acidNumber}
              onChange={(e) => setAcidNumber(e.target.value)}
              className="dashboard-form-input monospace"
              placeholder="123456789"
              maxLength="9"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Cargo Value (USD) *</label>
            <input
              type="number"
              value={valueUsd}
              onChange={(e) => setValueUsd(e.target.value)}
              className="dashboard-form-input"
              placeholder="125000"
              min="1"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Origin Country</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="dashboard-form-input"
              placeholder="China"
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="dashboard-form-input"
              placeholder="Egypt"
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Shipper</label>
            <input
              type="text"
              value={shipper}
              onChange={(e) => setShipper(e.target.value)}
              className="dashboard-form-input"
              placeholder="Company name"
            />
          </div>
        </form>
        <button 
          type="submit" 
          onClick={handleSubmitDocument}
          disabled={submitting}
          className="dashboard-submit-button"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Upload size={16} />
              Submit Document for Verification
            </>
          )}
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
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600">
                {documents.length === 0 
                  ? "No documents have been submitted yet. Submit your first document above." 
                  : "No documents match your search criteria."}
              </p>
            </div>
          ) : (
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
                        <button 
                          onClick={() => handleViewDocument(document.id)}
                          className="dashboard-action-link"
                          title="View Document"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        {document.status === 'pending' && (
                          <button 
                            onClick={() => handleApproveDocument(document.id)}
                            disabled={processingAction === document.id}
                            className="dashboard-action-link"
                            title="Approve Document"
                          >
                            {processingAction === document.id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <CheckCircle size={14} />
                            )}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardDocuments;