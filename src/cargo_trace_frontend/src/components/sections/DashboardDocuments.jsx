import React, { useState, useEffect } from 'react';
import { Search, Filter, Upload, FileText, Eye } from 'lucide-react';
import backendService from '../../services/backendService';

const DashboardDocuments = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    acidNumber: '',
    ethereumTxHash: '',
    valueUsd: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Load documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const docs = await backendService.getMyDocuments();
      setDocuments(docs);
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
        setMessage({ type: 'error', text: 'Please fill in all fields' });
        return;
      }

      const valueUsd = parseInt(formData.valueUsd);
      if (isNaN(valueUsd) || valueUsd <= 0) {
        setMessage({ type: 'error', text: 'Please enter a valid value' });
        return;
      }

      // Submit document
      const result = await backendService.submitDocument(
        formData.acidNumber,
        formData.ethereumTxHash,
        valueUsd
      );

      if (result.Ok) {
        setMessage({ type: 'success', text: `Document submitted successfully! ID: ${result.Ok}` });
        setFormData({ acidNumber: '', ethereumTxHash: '', valueUsd: '' });
        loadDocuments(); // Reload documents
      } else {
        setMessage({ type: 'error', text: result.Err || 'Failed to submit document' });
      }
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
      const result = await backendService.approveDocument(documentId);
      
      if (result.Ok !== undefined) {
        setMessage({ type: 'success', text: 'Document approved and NFT minted!' });
        loadDocuments(); // Reload documents
      } else {
        setMessage({ type: 'error', text: result.Err || 'Failed to approve document' });
      }
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
    if (status.NftMinted) return '#064e3b';
    if (status.Verified) return '#065f46';
    if (status.Pending) return '#713f12';
    if (status.Rejected) return '#7f1d1d';
    return '#4b5563';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Message Display */}
      {message.text && (
        <div className={`dashboard-message ${message.type === 'success' ? 'success' : 'error'}`}>
          {message.text}
        </div>
      )}

      {/* Action Bar */}
      <div className="dashboard-action-bar">
        <div className="dashboard-search-container">
          <Search className="dashboard-search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
            className="dashboard-search-input"
          />
        </div>
        <div className="dashboard-action-buttons">
          <button className="dashboard-action-button secondary">
            <Filter style={{ width: '1rem', height: '1rem' }} />
            Filter
          </button>
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
            Submit New Document
          </h3>
        </div>
        <p className="dashboard-section-description">Submit trade documents to initiate verification and NFT minting</p>
        
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
            Document Transfer Status
          </h3>
        </div>
        <div className="dashboard-table-container">
          {loading ? (
            <div className="dashboard-loading">
              Loading documents...
            </div>
          ) : documents.length === 0 ? (
            <div className="dashboard-empty">
              No documents found. Submit your first document above.
            </div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  {['Document ID', 'ACID Number', 'Value', 'Status', 'Date', 'Actions'].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => (
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
                        <span className="dashboard-document-id">{document.id}</span>
                      </div>
                    </td>
                    <td className="dashboard-table-cell monospace">{document.acid_number}</td>
                    <td className="dashboard-table-cell value">${document.value_usd.toLocaleString()}</td>
                    <td>
                      <span className={`dashboard-status ${getStatusDisplay(document.status).toLowerCase().replace(' ', '-')}`}>
                        {getStatusDisplay(document.status)}
                      </span>
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
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardDocuments; 