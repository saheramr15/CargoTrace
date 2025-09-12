import React, { useState, useEffect } from 'react';
import { 
  Link, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  FileText,
  Eye,
  Edit,
  Plus,
  Filter,
  Calendar,
  Building2,
  Globe,
  Loader2,
  ExternalLink,
  Hash,
  CheckSquare
} from 'lucide-react';
import { backendService } from '../../services/backendService';

const CustomsIntegration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [nftHash, setNftHash] = useState('');
  const [acidNumber, setAcidNumber] = useState('');
  const [mappings, setMappings] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [stats, setStats] = useState({ pending: 0, verified: 0, rejected: 0, underReview: 0 });
  const [showToast, setShowToast] = useState(false);
  const [newlyCreatedMapping, setNewlyCreatedMapping] = useState(null);
  const [relatedDocuments, setRelatedDocuments] = useState([]);

  // Load data on component mount
  useEffect(() => {
    // Ensure backend service is initialized
    const initializeBackend = async () => {
      if (!backendService.isReady()) {
        console.log('🔄 Backend not ready, trying to restore...');
        await backendService.tryRestore();
        
        if (!backendService.isReady()) {
          console.log('🔄 Still not ready, creating mock actor...');
          backendService.actor = backendService.createMockActor();
          backendService.isInitialized = true;
          localStorage.setItem("backend_initialized", "true");
        }
      }
      loadData();
    };
    
    initializeBackend();
  }, []);

  const loadData = async () => {
    try {
      console.log('🔄 Loading data...');
      setLoading(true);
      setError(null);
      
      if (!backendService.isReady()) {
        console.log('🔄 Backend not ready, initializing...');
        backendService.actor = backendService.createMockActor();
        backendService.isInitialized = true;
        localStorage.setItem("backend_initialized", "true");
      }

      console.log('📞 Calling backend services...');
      const [mappingsData, verificationsData, statsData, documentsData] = await Promise.all([
        backendService.getMyCargoxMappings(),
        backendService.getAllCustomsVerifications(),
        backendService.getVerificationStats(),
        backendService.getMyDocuments()
      ]);

      console.log('📊 Raw backend results:', { 
        mappingsData, 
        verificationsData, 
        statsData, 
        documentsData 
      });

      // Ensure we have arrays
      const mappings = Array.isArray(mappingsData) ? mappingsData : [];
      const verifications = Array.isArray(verificationsData) ? verificationsData : [];
      const documents = Array.isArray(documentsData) ? documentsData : [];
      const stats = Array.isArray(statsData) ? statsData : [0, 0, 0, 0];
      
      console.log('📊 Processed data:', { mappings, verifications, documents, stats });

      setMappings(mappings);
      setVerifications(verifications);
      setRelatedDocuments(documents);
      setStats({
        pending: stats[0],
        verified: stats[1],
        rejected: stats[2],
        underReview: stats[3]
      });
      
      console.log('✅ Data loaded successfully - Mappings count:', mappings.length);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getVerificationStatus = (status) => {
    if (status.Pending !== undefined) return 'pending';
    if (status.Verified !== undefined) return 'verified';
    if (status.Rejected !== undefined) return 'rejected';
    if (status.UnderReview !== undefined) return 'under-review';
    return 'pending';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'under-review': return 'info';
      case 'rejected': return 'danger';
      default: return 'warning';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'under-review': return <AlertCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const handleLinkCargoxToAcid = async (e) => {
    if (e) e.preventDefault();
    
    try {
      console.log('🚀 Starting link process...', { nftHash, acidNumber });
      setSubmitting(true);
      setError(null);
      setSuccessMessage('');
      
      // Basic validation first
      if (!nftHash || !acidNumber) {
        throw new Error('Please fill in all required fields');
      }

      console.log('Backend service ready:', backendService.isReady());
      
      // Ensure backend service is ready
      if (!backendService.isReady()) {
        console.log('🔄 Backend not ready, initializing...');
        backendService.actor = backendService.createMockActor();
        backendService.isInitialized = true;
        localStorage.setItem("backend_initialized", "true");
      }

      console.log('📞 Calling backend service...');
      const result = await backendService.linkCargoxToAcid(nftHash, acidNumber);
      console.log('📋 Backend result:', result);
      
      if (result.Err) {
        throw new Error(result.Err);
      }

      // Clear form
      setNftHash('');
      setAcidNumber('');

      // Show success message
      setSuccessMessage(`CargoX NFT successfully linked to ACID! Mapping ID: ${result.Ok}`);
      setShowToast(true);
      setNewlyCreatedMapping(result.Ok);
      
      // Auto-hide toast after 5 seconds
      setTimeout(() => setShowToast(false), 5000);
      
      // Remove highlight after 10 seconds
      setTimeout(() => setNewlyCreatedMapping(null), 10000);
      
      // Reload data
      console.log('Reloading data...');
      await loadData();
      
      console.log('✅ CargoX linked to ACID successfully:', result.Ok);
    } catch (err) {
      console.error('Failed to link CargoX to ACID:', err);
      setError(err.message);
      setSuccessMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyCustomsEntry = async (nftHash) => {
    try {
      setError(null);
      
      if (!backendService.isReady()) {
        throw new Error('Backend service not initialized');
      }

      const result = await backendService.verifyCustomsEntry(nftHash);
      
      if (result.Err) {
        throw new Error(result.Err);
      }

      // Reload data
      await loadData();
      
      console.log('✅ Customs entry verified successfully:', nftHash);
    } catch (err) {
      console.error('Failed to verify customs entry:', err);
      setError(err.message);
    }
  };

  const handleRejectCustomsEntry = async (nftHash) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      setError(null);
      
      if (!backendService.isReady()) {
        throw new Error('Backend service not initialized');
      }

      const result = await backendService.rejectCustomsEntry(nftHash, reason);
      
      if (result.Err) {
        throw new Error(result.Err);
      }

      // Reload data
      await loadData();
      
      console.log('✅ Customs entry rejected successfully:', nftHash);
    } catch (err) {
      console.error('Failed to reject customs entry:', err);
      setError(err.message);
    }
  };

  const filteredMappings = mappings.filter(mapping => {
    const matchesSearch = mapping.nft_hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mapping.acid_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mapping.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'verified' && mapping.verified) ||
                         (filterStatus === 'pending' && !mapping.verified);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="dashboard-loading">
          <Loader2 className="dashboard-loading-icon" />
          <span className="dashboard-loading-text">Loading customs integration data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-semibold">Success! CargoX linked to ACID</span>
          </div>
        </div>
      )}

      {/* Statistics Overview */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Customs Integration Overview
          </h2>
        </div>
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon documents">
              <Link size={24} color="white" />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp size={16} />
              <span className="dashboard-stat-percentage">+12.5%</span>
            </div>
            <div className="dashboard-stat-value">{mappings.length}</div>
            <div className="dashboard-stat-label">Total Mappings</div>
            <div className="dashboard-stat-description">CargoX → ACID links</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon nfts">
              <CheckCircle size={24} color="white" />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp size={16} />
              <span className="dashboard-stat-percentage">+8.3%</span>
            </div>
            <div className="dashboard-stat-value">{stats.verified}</div>
            <div className="dashboard-stat-label">Verified</div>
            <div className="dashboard-stat-description">Customs verified entries</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon loans">
              <Clock size={24} color="white" />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp size={16} />
              <span className="dashboard-stat-percentage">+5.7%</span>
            </div>
            <div className="dashboard-stat-value">{stats.pending}</div>
            <div className="dashboard-stat-label">Pending</div>
            <div className="dashboard-stat-description">Awaiting verification</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon fusion">
              <Shield size={24} color="white" />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp size={16} />
              <span className="dashboard-stat-percentage">99.9%</span>
            </div>
            <div className="dashboard-stat-value">{stats.rejected}</div>
            <div className="dashboard-stat-label">Rejected</div>
            <div className="dashboard-stat-description">Failed verification</div>
          </div>
        </div>
      </div>

      {/* Link CargoX to ACID Form */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Plus className="dashboard-section-icon" />
            Link CargoX NFT to ACID
          </h2>
          <div className="dashboard-section-description">
            <p className="text-sm text-gray-600">
              Link your CargoX NFT hash to an ACID number to enable customs verification. 
              This will connect your blockchain document with customs records.
            </p>
          </div>
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
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-pulse">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700 font-semibold">{successMessage}</span>
            </div>
            <div className="mt-2 text-sm text-green-600">
              ✅ Your mapping has been created and is now visible in the table below!
            </div>
          </div>
        )}

        <div className="dashboard-form">
          <div className="dashboard-form-row">
            <div className="dashboard-form-field">
              <label className="dashboard-form-label">CargoX NFT Hash *</label>
              <input
                type="text"
                value={nftHash}
                onChange={(e) => setNftHash(e.target.value)}
                className="dashboard-form-input"
                placeholder="0x1234567890abcdef..."
                disabled={submitting}
                required
              />
            </div>
            
            <div className="dashboard-form-field">
              <label className="dashboard-form-label">ACID Number *</label>
              <input
                type="text"
                value={acidNumber}
                onChange={(e) => setAcidNumber(e.target.value)}
                className="dashboard-form-input"
                placeholder="123456789"
                maxLength="9"
                disabled={submitting}
                required
              />
            </div>
          </div>
          
          <button 
            type="button" 
            onClick={handleLinkCargoxToAcid}
            disabled={submitting}
            className="dashboard-submit-button"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Linking...
              </>
            ) : (
              <>
                <Link size={16} />
                Link CargoX to ACID
              </>
            )}
          </button>
          
          {/* Debug Test Button */}
          <button 
            type="button" 
            onClick={async () => {
              console.log('🧪 Testing backend service...');
              console.log('Backend ready:', backendService.isReady());
              console.log('Backend initialized:', backendService.isInitialized);
              console.log('Backend actor:', backendService.actor);
              
              try {
                const mappings = await backendService.getMyCargoxMappings();
                console.log('Current mappings:', mappings);
                alert(`Found ${mappings.length} mappings`);
              } catch (err) {
                console.error('Error getting mappings:', err);
                alert('Error: ' + err.message);
              }
            }}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded text-sm"
          >
            Test Backend Connection
          </button>
        </div>
      </div>

      {/* Related Documents Section */}
      {relatedDocuments.length > 0 && (
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">
              <FileText className="dashboard-section-icon" />
              Your Documents
            </h2>
            <div className="dashboard-section-description">
              <p className="text-sm text-gray-600">
                Documents that can be linked to CargoX NFTs. Use the same ACID number to create mappings.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedDocuments.map((doc) => (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{doc.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doc.status.Pending ? 'bg-yellow-100 text-yellow-800' :
                    doc.status.Verified ? 'bg-green-100 text-green-800' :
                    doc.status.NftMinted ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {doc.status.Pending ? 'Pending' :
                     doc.status.Verified ? 'Verified' :
                     doc.status.NftMinted ? 'Ready for Loan' :
                     'Rejected'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>ACID:</strong> {doc.acid_number}</p>
                  <p><strong>Value:</strong> ${doc.value_usd.toLocaleString()}</p>
                  <p><strong>Created:</strong> {new Date(doc.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mappings Management */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <FileText className="dashboard-section-icon" />
            CargoX Mappings
          </h2>
          <div className="dashboard-section-actions">
            <span className="dashboard-section-count">{filteredMappings.length} mappings</span>
            <button className="dashboard-section-action">
              <ExternalLink size={16} />
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
              placeholder="Search by NFT hash, ACID, or mapping ID..."
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
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Mappings Table */}
        <div className="dashboard-table-container">
          {filteredMappings.length === 0 ? (
            <div className="dashboard-empty-state">
              <Link className="dashboard-empty-icon" />
              <h3 className="dashboard-empty-title">No mappings found</h3>
              <p className="dashboard-empty-description">
                {mappings.length === 0 
                  ? "No CargoX mappings have been created yet. Create your first mapping above." 
                  : "No mappings match your search criteria."}
              </p>
            </div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Mapping Info</th>
                  <th>CargoX NFT Hash</th>
                  <th>ACID Number</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMappings.map((mapping) => {
                  const verification = verifications.find(v => v.nft_hash === mapping.nft_hash);
                  const verificationStatus = verification ? getVerificationStatus(verification.verification_status) : 'pending';
                  const StatusIcon = getStatusIcon(verificationStatus);
                  
                  const isNewlyCreated = newlyCreatedMapping === mapping.id;
                  
                  return (
                    <tr key={mapping.id} className={`dashboard-table-row ${isNewlyCreated ? 'bg-green-50 border-l-4 border-green-500' : ''}`}>
                      <td>
                        <div className="dashboard-document-info">
                          <div className="dashboard-document-icon">
                            <Link size={16} color="white" />
                          </div>
                          <div>
                            <div className="dashboard-document-id flex items-center gap-2">
                              {mapping.id}
                              {isNewlyCreated && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full animate-pulse">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="dashboard-document-description">CargoX → ACID Mapping</div>
                          </div>
                        </div>
                      </td>
                      <td className="dashboard-table-cell font-mono text-sm">{mapping.nft_hash}</td>
                      <td className="dashboard-table-cell font-mono text-sm">{mapping.acid_number}</td>
                      <td>
                        <div className="dashboard-status-container">
                          <StatusIcon size={16} />
                          <span className={`dashboard-status ${getStatusColor(verificationStatus)}`}>
                            {verificationStatus.replace('-', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="dashboard-table-cell">{new Date(mapping.created_at).toLocaleDateString()}</td>
                      <td className="dashboard-table-actions">
                        <button 
                          onClick={() => handleVerifyCustomsEntry(mapping.nft_hash)}
                          disabled={verificationStatus === 'verified'}
                          className="dashboard-action-link"
                        >
                          <CheckSquare size={14} />
                          Verify
                        </button>
                        <button 
                          onClick={() => handleRejectCustomsEntry(mapping.nft_hash)}
                          disabled={verificationStatus === 'rejected'}
                          className="dashboard-action-link"
                        >
                          <XCircle size={14} />
                          Reject
                        </button>
                        <button className="dashboard-action-link">
                          <Eye size={14} />
                          View
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

export default CustomsIntegration;
