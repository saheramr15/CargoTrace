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
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'under-review':
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      verified: 'bg-green-500/20 text-green-400 border border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      'under-review': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      rejected: 'bg-red-500/20 text-red-400 border border-red-500/30'
    };
    return `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-slate-500/20 text-slate-400 border border-slate-500/30'}`;
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
      <div className="px-6 py-6 lg:pl-80 lg:pr-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <Link size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Customs Integration</h1>
              <p className="text-slate-400">Manage CargoX mappings and customs verifications</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur opacity-50"></div>
            </div>
            <p className="text-slate-300 text-lg">Loading customs data...</p>
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
              <Link size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Customs Integration</h1>
              <p className="text-slate-400">Manage CargoX mappings and customs verifications</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative mb-6">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur opacity-50"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Error Loading Data</h3>
            <p className="text-slate-300 mb-6 max-w-md">{error}</p>
            <button 
              onClick={loadData}
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
              <Link size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Customs Integration</h1>
              <p className="text-slate-400">Manage CargoX mappings and customs verifications</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <Hash size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-white">{mappings.length}</span>
            <span className="text-xs text-slate-400">total mappings</span>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 via-indigo-400/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Link size={20} className="text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{mappings.length}</div>
                <div className="text-xs text-slate-400">Total Mappings</div>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-green-400/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/10 via-emerald-400/10 to-green-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stats.verified}</div>
                <div className="text-xs text-slate-400">Verified</div>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-yellow-400/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/10 via-orange-400/10 to-yellow-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock size={20} className="text-yellow-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stats.pending}</div>
                <div className="text-xs text-slate-400">Pending</div>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-red-400/30 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 via-pink-400/10 to-red-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-pink-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <XCircle size={20} className="text-red-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stats.rejected}</div>
                <div className="text-xs text-slate-400">Rejected</div>
              </div>
            </div>
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
                placeholder="Search mappings by ID, NFT hash, or ACID..."
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
              <option value="rejected">Rejected</option>
              <option value="under-review">Under Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mappings Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
        {filteredMappings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <Link className="w-16 h-16 text-slate-400" />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur opacity-50"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No mappings found</h3>
            <p className="text-slate-400 text-center max-w-md">
              {mappings.length === 0 
                ? "No CargoX mappings have been created yet." 
                : "No mappings match your search criteria."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/30 border-b border-slate-600/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Mapping ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">CargoX NFT Hash</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ACID Number</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredMappings.map((mapping) => {
                  const verification = verifications.find(v => v.nft_hash === mapping.nft_hash);
                  const verificationStatus = verification ? getVerificationStatus(verification.verification_status) : 'pending';
                  
                  return (
                    <tr key={mapping.id} className="hover:bg-slate-700/30 transition-colors duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="group-hover:scale-110 transition-transform duration-300">
                            {getStatusIcon(verificationStatus)}
                          </div>
                          <span className="text-sm font-medium text-white">{mapping.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-slate-300 bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-600/30">
                          {mapping.nft_hash}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-slate-300 bg-slate-800/50 px-3 py-1 rounded-lg border border-slate-600/30">
                          {mapping.acid_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          verificationStatus === 'verified' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          verificationStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          verificationStatus === 'under-review' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {verificationStatus.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {new Date(mapping.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewMapping(mapping)}
                            className="group/btn p-2 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110"
                            title="View Mapping"
                          >
                            <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                          </button>
                          {verificationStatus === 'pending' && (
                            <>
                              <button
                                onClick={() => handleVerifyCustomsEntry(mapping.nft_hash)}
                                disabled={processingAction === mapping.nft_hash}
                                className="group/btn p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Verify Entry"
                              >
                                {processingAction === mapping.nft_hash ? (
                                  <Loader2 size={16} className="animate-spin" />
                                ) : (
                                  <CheckCircle size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                )}
                              </button>
                              <button
                                onClick={() => handleRejectCustomsEntry(mapping.nft_hash)}
                                disabled={processingAction === mapping.nft_hash}
                                className="group/btn p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Reject Entry"
                              >
                                {processingAction === mapping.nft_hash ? (
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustoms;
