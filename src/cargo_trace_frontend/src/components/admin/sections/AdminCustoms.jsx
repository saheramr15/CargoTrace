import React, { useState, useEffect } from 'react';
import {
  Link,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Shield,
  FileText,
  ExternalLink,
  Hash,
  CheckSquare,
  Users,
  Building
} from 'lucide-react';
import { backendService } from '../../../services/backendService';

const AdminCustoms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [mappings, setMappings] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);
  const [stats, setStats] = useState({ pending: 0, verified: 0, rejected: 0, underReview: 0 });

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!backendService.isReady()) {
        throw new Error('Backend service not initialized');
      }

      const [mappingsData, verificationsData, statsData] = await Promise.all([
        backendService.getAllCargoxMappings(),
        backendService.getAllCustomsVerifications(),
        backendService.getVerificationStats()
      ]);

      setMappings(mappingsData);
      setVerifications(verificationsData);
      setStats({
        pending: statsData[0],
        verified: statsData[1],
        rejected: statsData[2],
        underReview: statsData[3]
      });
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'under-review':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
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
      'under-review': 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleVerifyCustomsEntry = async (nftHash) => {
    try {
      setProcessingAction(nftHash);
      
      if (!backendService.isReady()) {
        throw new Error('Backend service not initialized');
      }

      const result = await backendService.verifyCustomsEntry(nftHash);
      
      if (result.Err) {
        throw new Error(result.Err);
      }

      // Reload data to reflect changes
      await loadData();
      
      console.log('✅ Customs entry verified successfully:', nftHash);
    } catch (err) {
      console.error('Failed to verify customs entry:', err);
      setError(err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleRejectCustomsEntry = async (nftHash) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      setProcessingAction(nftHash);
      
      if (!backendService.isReady()) {
        throw new Error('Backend service not initialized');
      }

      const result = await backendService.rejectCustomsEntry(nftHash, reason);
      
      if (result.Err) {
        throw new Error(result.Err);
      }

      // Reload data to reflect changes
      await loadData();
      
      console.log('✅ Customs entry rejected successfully:', nftHash);
    } catch (err) {
      console.error('Failed to reject customs entry:', err);
      setError(err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleViewMapping = (mapping) => {
    console.log('Viewing mapping:', mapping);
    alert(`Mapping Details:\nID: ${mapping.id}\nCargoX NFT: ${mapping.nft_hash}\nACID: ${mapping.acid_number}\nVerified: ${mapping.verified}\nCreated: ${new Date(mapping.created_at).toLocaleDateString()}`);
  };

  const filteredMappings = mappings.filter(mapping => {
    const matchesSearch = mapping.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mapping.nft_hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mapping.acid_number.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter !== 'all') {
      const verification = verifications.find(v => v.nft_hash === mapping.nft_hash);
      const verificationStatus = verification ? getVerificationStatus(verification.verification_status) : 'pending';
      matchesStatus = verificationStatus === statusFilter;
    }
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="admin-customs">
        <div className="admin-customs-header">
          <div className="admin-customs-title">
            <h2>Customs Integration</h2>
            <p>Manage CargoX mappings and customs verifications</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading customs data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-customs">
        <div className="admin-customs-header">
          <div className="admin-customs-title">
            <h2>Customs Integration</h2>
            <p>Manage CargoX mappings and customs verifications</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={loadData}
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
    <div className="admin-content">
      {/* Header */}
      <div className="admin-section-header">
        <div className="admin-section-title">
          <h2>Customs Integration</h2>
          <p>Manage CargoX mappings and customs verifications</p>
        </div>
        <div className="admin-section-stats">
          <span className="admin-section-count">
            {mappings.length} total mappings
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Link size={24} color="white" />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{mappings.length}</div>
            <div className="admin-stat-label">Total Mappings</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <CheckCircle size={24} color="white" />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{stats.verified}</div>
            <div className="admin-stat-label">Verified</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Clock size={24} color="white" />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{stats.pending}</div>
            <div className="admin-stat-label">Pending</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <XCircle size={24} color="white" />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{stats.rejected}</div>
            <div className="admin-stat-label">Rejected</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-action-bar">
        <div className="admin-search-container">
          <Search className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search mappings by ID, NFT hash, or ACID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input"
          />
        </div>
        <div className="admin-action-buttons">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-action-button secondary"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
            <option value="under-review">Under Review</option>
          </select>
        </div>
      </div>

      {/* Mappings Table */}
      <div className="admin-table-container">
        {filteredMappings.length === 0 ? (
          <div className="admin-empty-state">
            <Link className="admin-empty-icon" />
            <h3 className="admin-empty-title">No mappings found</h3>
            <p className="admin-empty-description">
              {mappings.length === 0 
                ? "No CargoX mappings have been created yet." 
                : "No mappings match your search criteria."}
            </p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mapping ID</th>
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
                
                return (
                  <tr key={mapping.id} className="admin-table-row">
                    <td>
                      <div className="admin-table-cell-content">
                        {getStatusIcon(verificationStatus)}
                        <span className="admin-table-cell-text">{mapping.id}</span>
                      </div>
                    </td>
                    <td className="admin-table-cell font-mono text-sm">{mapping.nft_hash}</td>
                    <td className="admin-table-cell font-mono text-sm">{mapping.acid_number}</td>
                    <td>
                      <span className={getStatusBadge(verificationStatus)}>
                        {verificationStatus.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="admin-table-cell">{new Date(mapping.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => handleViewMapping(mapping)}
                          className="admin-action-link"
                          title="View Mapping"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {verificationStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => handleVerifyCustomsEntry(mapping.nft_hash)}
                              disabled={processingAction === mapping.nft_hash}
                              className="admin-action-link"
                              title="Verify Entry"
                            >
                              {processingAction === mapping.nft_hash ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleRejectCustomsEntry(mapping.nft_hash)}
                              disabled={processingAction === mapping.nft_hash}
                              className="admin-action-link"
                              title="Reject Entry"
                            >
                              {processingAction === mapping.nft_hash ? (
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
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminCustoms;
