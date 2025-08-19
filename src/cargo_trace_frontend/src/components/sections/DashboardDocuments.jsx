import React, { useState, useEffect } from 'react';
import { Search, Filter, Upload, FileText, Eye, Download, CheckCircle, Clock, AlertCircle, BarChart3, TrendingUp, Shield, DollarSign } from 'lucide-react';
import backendService from '../../services/backendService';

const DashboardDocuments = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    acidNumber: '',
    ethereumTxHash: '',
    valueUsd: '',
    documentType: 'Bill of Lading',
    description: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Mock data for demonstration
  const mockDocuments = [
    { id: 'DOC001', acid_number: '123456789', value_usd: 45000, status: { Verified: true }, created_at: '2024-08-01', type: 'Bill of Lading', description: 'Electronics shipment from China' },
    { id: 'DOC002', acid_number: '987654321', value_usd: 32500, status: { Pending: true }, created_at: '2024-08-02', type: 'Commercial Invoice', description: 'Textile goods from India' },
    { id: 'DOC003', acid_number: '456766123', value_usd: 58750, status: { NftMinted: true }, created_at: '2024-08-03', type: 'Packing List', description: 'Machinery parts from Germany' },
    { id: 'DOC004', acid_number: '789012345', value_usd: 28900, status: { Rejected: true }, created_at: '2024-08-04', type: 'Certificate of Origin', description: 'Agricultural products from Brazil' }
  ];

  // Load documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      // Use mock data for now
      setDocuments(mockDocuments);
    } catch (error) {
      console.error('Failed to load documents:', error);
      setMessage({ type: 'error', text: 'Failed to load documents' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitDocument = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });

      // Validate inputs
      if (!formData.acidNumber || !formData.ethereumTxHash || !formData.valueUsd) {
        setMessage({ type: 'error', text: 'Please fill in all required fields' });
        return;
      }

      const valueUsd = parseInt(formData.valueUsd);
      if (isNaN(valueUsd) || valueUsd <= 0) {
        setMessage({ type: 'error', text: 'Please enter a valid value' });
        return;
      }

      // Simulate document submission
      const newDocument = {
        id: `DOC${String(documents.length + 1).padStart(3, '0')}`,
        acid_number: formData.acidNumber,
        value_usd: valueUsd,
        status: { Pending: true },
        created_at: new Date().toISOString().split('T')[0],
        type: formData.documentType,
        description: formData.description
      };

      setDocuments(prev => [newDocument, ...prev]);
      setMessage({ type: 'success', text: `Document submitted successfully! ID: ${newDocument.id}` });
      setFormData({ acidNumber: '', ethereumTxHash: '', valueUsd: '', documentType: 'Bill of Lading', description: '' });
    } catch (error) {
      console.error('Failed to submit document:', error);
      setMessage({ type: 'error', text: 'Failed to submit document' });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDocument = async (documentId) => {
    try {
      setLoading(true);
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, status: { NftMinted: true } }
          : doc
      ));
      setMessage({ type: 'success', text: 'Document approved and NFT minted!' });
    } catch (error) {
      console.error('Failed to approve document:', error);
      setMessage({ type: 'error', text: 'Failed to approve document' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status) => {
    if (status.Pending) return 'Pending';
    if (status.Verified) return 'Verified';
    if (status.Rejected) return 'Rejected';
    if (status.NftMinted) return 'NFT Minted';
    return 'Unknown';
  };

  const getStatusColor = (status) => {
    if (status.NftMinted) return 'success';
    if (status.Verified) return 'success';
    if (status.Pending) return 'pending';
    if (status.Rejected) return 'rejected';
    return 'pending';
  };

  const getStatusIcon = (status) => {
    if (status.NftMinted) return CheckCircle;
    if (status.Verified) return CheckCircle;
    if (status.Pending) return Clock;
    if (status.Rejected) return AlertCircle;
    return Clock;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.acid_number.includes(searchTerm) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'pending' && doc.status.Pending) ||
                         (filterStatus === 'verified' && doc.status.Verified) ||
                         (filterStatus === 'nft-minted' && doc.status.NftMinted) ||
                         (filterStatus === 'rejected' && doc.status.Rejected);
    return matchesSearch && matchesFilter;
  });

  const documentStats = {
    total: documents.length,
    pending: documents.filter(d => d.status.Pending).length,
    verified: documents.filter(d => d.status.Verified).length,
    nftMinted: documents.filter(d => d.status.NftMinted).length,
    rejected: documents.filter(d => d.status.Rejected).length,
    totalValue: documents.reduce((sum, doc) => sum + doc.value_usd, 0)
  };

  const documentTypes = [
    'Bill of Lading',
    'Commercial Invoice',
    'Packing List',
    'Certificate of Origin',
    'Insurance Certificate',
    'Inspection Certificate'
  ];

  return (
    <div className="dashboard-documents-container">
      {/* Message Display */}
      {message.text && (
        <div className={`dashboard-message ${message.type === 'success' ? 'success' : 'error'}`}>
          {message.text}
        </div>
      )}

      {/* Document Statistics */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon documents">
              <FileText style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
              <span className="dashboard-stat-percentage">+15.2%</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Total Documents</p>
            <div className="dashboard-stat-value">{documentStats.total}</div>
            <div className="dashboard-stat-change positive">Active in system</div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
              <DollarSign style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
              <span className="dashboard-stat-percentage">+8.7%</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Total Value</p>
            <div className="dashboard-stat-value">${documentStats.totalValue.toLocaleString()}</div>
            <div className="dashboard-stat-change positive">Trade volume</div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
              <CheckCircle style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
              <span className="dashboard-stat-percentage">+22.1%</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>NFTs Minted</p>
            <div className="dashboard-stat-value">{documentStats.nftMinted}</div>
            <div className="dashboard-stat-change positive">On ICP blockchain</div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' }}>
              <Shield style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
              <span className="dashboard-stat-percentage">+5.3%</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>Success Rate</p>
            <div className="dashboard-stat-value">{((documentStats.verified + documentStats.nftMinted) / documentStats.total * 100).toFixed(1)}%</div>
            <div className="dashboard-stat-change positive">Verification rate</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="dashboard-action-bar">
        <div className="dashboard-search-container">
          <Search className="dashboard-search-icon" />
          <input
            type="text"
            placeholder="Search documents by ID, ACID, or description..."
            className="dashboard-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="dashboard-action-buttons">
          <select 
            className="dashboard-action-button secondary"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid rgba(167, 139, 250, 0.2)', background: 'rgba(167, 139, 250, 0.1)', color: '#6b7280' }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="nft-minted">NFT Minted</option>
            <option value="rejected">Rejected</option>
          </select>
          <button 
            onClick={loadDocuments}
            disabled={loading}
            className="dashboard-action-button primary"
          >
            <Upload style={{ width: '1rem', height: '1rem' }} />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <Upload className="dashboard-section-icon" />
            Submit CargoX Document
          </h3>
        </div>
        <p className="dashboard-section-description">Submit CargoX trade documents to initiate ACID verification and ICP NFT minting. All documents are verified against NAFEZA system for authenticity.</p>
        
        <div className="dashboard-form-grid">
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">ACID Number *</label>
            <input
              type="text"
              placeholder="Enter ACID number (9 digits)"
              value={formData.acidNumber}
              onChange={(e) => handleInputChange('acidNumber', e.target.value)}
              className="dashboard-form-input"
            />
          </div>
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Ethereum TX Hash *</label>
            <input
              type="text"
              placeholder="0x..."
              value={formData.ethereumTxHash}
              onChange={(e) => handleInputChange('ethereumTxHash', e.target.value)}
              className="dashboard-form-input monospace"
            />
          </div>
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Value (USD) *</label>
            <input
              type="number"
              placeholder="50000"
              value={formData.valueUsd}
              onChange={(e) => handleInputChange('valueUsd', e.target.value)}
              className="dashboard-form-input"
            />
          </div>
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Document Type</label>
            <select
              value={formData.documentType}
              onChange={(e) => handleInputChange('documentType', e.target.value)}
              className="dashboard-form-input"
            >
              {documentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="dashboard-form-field" style={{ gridColumn: 'span 2' }}>
            <label className="dashboard-form-label">Description</label>
            <input
              type="text"
              placeholder="Brief description of the shipment"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="dashboard-form-input"
            />
          </div>
        </div>
        
        <button 
          onClick={handleSubmitDocument}
          disabled={loading}
          className="dashboard-submit-button"
        >
          {loading ? 'Submitting...' : 'Submit Document'}
        </button>
      </div>

      {/* Documents Table */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <FileText className="dashboard-section-icon" />
            CargoX Document Status
          </h3>
          <div className="dashboard-section-actions">
            <span className="dashboard-section-count">{filteredDocuments.length} of {documents.length} documents</span>
            <button className="dashboard-section-action">
              Export Data
              <Download style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
            </button>
          </div>
        </div>
        <div className="dashboard-table-container">
          {loading ? (
            <div className="dashboard-loading">
              Loading documents...
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="dashboard-empty">
              {searchTerm || filterStatus !== 'all' 
                ? 'No documents match your search criteria.' 
                : 'No documents found. Submit your first document above.'}
            </div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>ACID Number</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((document, index) => {
                  const StatusIcon = getStatusIcon(document.status);
                  const statusColor = getStatusColor(document.status);
                  return (
                    <tr 
                      key={index} 
                      className="dashboard-table-row"
                      onMouseEnter={() => setIsHovered(`table-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}>
                      <td>
                        <div className="dashboard-document-info">
                          <div className="dashboard-document-icon">
                            <FileText style={{ width: '1rem', height: '1rem', color: '#ffffff' }} />
                          </div>
                          <div className="dashboard-document-details">
                            <span className="dashboard-document-id">{document.id}</span>
                            <span className="dashboard-document-description">{document.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="dashboard-table-cell monospace">{document.acid_number}</td>
                      <td className="dashboard-table-cell">{document.type}</td>
                      <td className="dashboard-table-cell value">${document.value_usd.toLocaleString()}</td>
                      <td>
                        <div className="dashboard-status-container">
                          <StatusIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                          <span className={`dashboard-status ${statusColor}`}>
                            {getStatusDisplay(document.status)}
                          </span>
                        </div>
                      </td>
                      <td className="dashboard-table-cell">{new Date(document.created_at).toLocaleDateString()}</td>
                      <td className="dashboard-table-actions">
                        <button className="dashboard-action-link">
                          <Eye style={{ width: '1rem', height: '1rem' }} />
                          View
                        </button>
                        {document.status.Pending && (
                          <button 
                            onClick={() => handleApproveDocument(document.id)}
                            disabled={loading}
                            className="dashboard-action-link approve"
                          >
                            <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                            Approve
                          </button>
                        )}
                        {document.status.NftMinted && (
                          <button className="dashboard-action-link">
                            <Download style={{ width: '1rem', height: '1rem' }} />
                            Download NFT
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Document Processing Pipeline */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Document Processing Pipeline
          </h3>
        </div>
        <div className="dashboard-pipeline">
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon">
              <FileText style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>1. Document Submission</h4>
              <p>Submit CargoX documents with ACID verification</p>
              <span className="dashboard-pipeline-count">{documentStats.total} documents</span>
            </div>
          </div>
          <div className="dashboard-pipeline-arrow">→</div>
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
              <Shield style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>2. NAFEZA Verification</h4>
              <p>Advanced Cargo Information Declaration validation</p>
              <span className="dashboard-pipeline-count">{documentStats.verified} verified</span>
            </div>
          </div>
          <div className="dashboard-pipeline-arrow">→</div>
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' }}>
              <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>3. NFT Minting</h4>
              <p>Immutable document tokens on ICP blockchain</p>
              <span className="dashboard-pipeline-count">{documentStats.nftMinted} NFTs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDocuments; 