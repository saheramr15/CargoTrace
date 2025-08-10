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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: '"Inter", sans-serif', backgroundColor: '#1f2937', padding: '2rem' }}>
      {/* Message Display */}
      {message.text && (
        <div style={{
          padding: '1rem',
          borderRadius: '0.75rem',
          backgroundColor: message.type === 'success' ? '#064e3b' : '#7f1d1d',
          color: '#ffffff',
          border: '1px solid',
          borderColor: message.type === 'success' ? '#10b981' : '#ef4444'
        }}>
          {message.text}
        </div>
      )}

      {/* Action Bar */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } 
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '20rem' }}>
          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#d1d5db', width: '1rem', height: '1rem' }} />
          <input
            type="text"
            placeholder="Search documents..."
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 2.5rem', 
              border: '1px solid #4b5563', 
              borderRadius: '0.75rem', 
              backgroundColor: '#374151', 
              fontSize: '0.875rem',
              color: '#d1d5db',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 1rem', 
            color: '#d1d5db', 
            backgroundColor: '#374151', 
            border: '1px solid #4b5563', 
            borderRadius: '0.75rem', 
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.backgroundColor = '#4b5563';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.backgroundColor = '#374151';
          }}>
            <Filter style={{ width: '1rem', height: '1rem' }} />
            Filter
          </button>
          <button 
            onClick={loadDocuments}
            disabled={loading}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#7c3aed', 
              color: '#ffffff', 
              borderRadius: '0.75rem', 
              fontWeight: '500',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#6d28d9';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#7c3aed';
                e.target.style.transform = 'translateY(0)';
              }
            }}>
            <Upload style={{ width: '1rem', height: '1rem' }} />
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
        <div style={{ maxWidth: '48rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Submit New Document</h3>
          <p style={{ color: '#d1d5db', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Submit trade documents to initiate verification and NFT minting</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>ACID Number *</label>
              <input
                type="text"
                placeholder="Enter ACID number (9 digits)"
                value={formData.acidNumber}
                onChange={(e) => handleInputChange('acidNumber', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  border: '1px solid #4b5563', 
                  borderRadius: '0.75rem', 
                  backgroundColor: '#4b5563', 
                  fontSize: '0.875rem',
                  color: '#ffffff',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>Ethereum TX Hash *</label>
              <input
                type="text"
                placeholder="0x..."
                value={formData.ethereumTxHash}
                onChange={(e) => handleInputChange('ethereumTxHash', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  border: '1px solid #4b5563', 
                  borderRadius: '0.75rem', 
                  backgroundColor: '#4b5563', 
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  color: '#ffffff',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>Value (USD) *</label>
              <input
                type="number"
                placeholder="50000"
                value={formData.valueUsd}
                onChange={(e) => handleInputChange('valueUsd', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  border: '1px solid #4b5563', 
                  borderRadius: '0.75rem', 
                  backgroundColor: '#4b5563', 
                  fontSize: '0.875rem',
                  color: '#ffffff',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
          </div>
          
          <button 
            onClick={handleSubmitDocument}
            disabled={loading}
            style={{ 
              backgroundColor: '#7c3aed', 
              color: '#ffffff', 
              padding: '1rem 2rem', 
              borderRadius: '0.75rem', 
              fontWeight: '600', 
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#6d28d9';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#7c3aed';
                e.target.style.transform = 'translateY(0)';
              }
            }}>
            {loading ? 'Submitting...' : 'Submit Document'}
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', overflow: 'hidden' }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid #4b5563' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', letterSpacing: '-0.025em' }}>Document Transfer Status</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#d1d5db' }}>
              Loading documents...
            </div>
          ) : documents.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#d1d5db' }}>
              No documents found. Submit your first document above.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#4b5563' }}>
                <tr>
                  {['Document ID', 'ACID Number', 'Value', 'Status', 'Date', 'Actions'].map((header, index) => (
                    <th key={index} style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: '600', color: '#d1d5db', fontSize: '0.875rem' }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ borderTop: '1px solid #4b5563' }}>
                {documents.map((document, index) => (
                  <tr 
                    key={index} 
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setIsHovered(`table-${index}`)}
                    onMouseLeave={() => setIsHovered(null)}>
                    <td style={{ padding: '1rem 1.5rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ 
                          width: '2rem', 
                          height: '2rem', 
                          background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
                          borderRadius: '0.5rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <FileText style={{ width: '1rem', height: '1rem', color: '#ffffff' }} />
                        </div>
                        <span style={{ fontWeight: '500', color: '#ffffff', fontSize: '0.875rem' }}>{document.id}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>{document.acid_number}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: '#ffffff', fontSize: '0.875rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>${document.value_usd.toLocaleString()}</td>
                    <td style={{ padding: '1rem 1.5rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '9999px', 
                        fontSize: '0.75rem', 
                        fontWeight: '500', 
                        backgroundColor: getStatusColor(document.status), 
                        color: '#ffffff',
                        transition: 'transform 0.3s'
                      }}>
                        {getStatusDisplay(document.status)}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#d1d5db', fontSize: '0.875rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>
                      {new Date(document.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button style={{ 
                          color: '#7c3aed', 
                          fontWeight: '500', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.25rem', 
                          fontSize: '0.875rem',
                          transition: 'color 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#6d28d9'}
                        onMouseOut={(e) => e.target.style.color = '#7c3aed'}>
                          <Eye style={{ width: '1rem', height: '1rem' }} />
                          View
                        </button>
                        {document.status.Pending && (
                          <button 
                            onClick={() => handleApproveDocument(document.id)}
                            disabled={loading}
                            style={{ 
                              color: '#10b981', 
                              fontWeight: '500', 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.25rem', 
                              fontSize: '0.875rem',
                              transition: 'color 0.3s',
                              opacity: loading ? 0.6 : 1
                            }}
                            onMouseOver={(e) => {
                              if (!loading) e.target.style.color = '#059669';
                            }}
                            onMouseOut={(e) => {
                              if (!loading) e.target.style.color = '#10b981';
                            }}>
                            Approve
                          </button>
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
    </div>
  );
};

export default DashboardDocuments; 