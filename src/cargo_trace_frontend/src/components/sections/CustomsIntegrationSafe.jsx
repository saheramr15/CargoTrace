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

const CustomsIntegrationSafe = () => {
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
  const [stats, setStats] = useState({
    pending: 0,
    verified: 0,
    rejected: 0,
    underReview: 0
  });
  const [showToast, setShowToast] = useState(false);
  const [newlyCreatedMapping, setNewlyCreatedMapping] = useState(null);
  const [relatedDocuments, setRelatedDocuments] = useState([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      // Add some sample data
      setMappings([
        {
          id: 'MAP-000001',
          nft_hash: '0x1234567890abcdef1234567890abcdef12345678',
          acid_number: '123456789',
          verified: false,
          created_at: Date.now() - 86400000,
          owner: '2vxsx-fae',
          customs_entry_id: null
        }
      ]);
      setStats({
        pending: 1,
        verified: 0,
        rejected: 0,
        underReview: 0
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLinkCargoxToAcid = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      setSuccessMessage('');
      
      if (!nftHash || !acidNumber) {
        throw new Error('Please fill in all required fields');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new mapping
      const newMapping = {
        id: `MAP-${Date.now()}`,
        nft_hash: nftHash,
        acid_number: acidNumber,
        verified: false,
        created_at: Date.now(),
        owner: '2vxsx-fae',
        customs_entry_id: null
      };

      setMappings(prev => [newMapping, ...prev]);
      setNftHash('');
      setAcidNumber('');
      setSuccessMessage(`CargoX NFT successfully linked to ACID! Mapping ID: ${newMapping.id}`);
      setShowToast(true);
      setNewlyCreatedMapping(newMapping.id);
      
      setTimeout(() => setShowToast(false), 5000);
      setTimeout(() => setNewlyCreatedMapping(null), 10000);
      
    } catch (err) {
      console.error('Failed to link CargoX to ACID:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getVerificationStatus = (status) => {
    if (status.Pending !== undefined) return 'pending';
    if (status.Verified !== undefined) return 'verified';
    if (status.Rejected !== undefined) return 'rejected';
    if (status.UnderReview !== undefined) return 'underReview';
    return 'pending';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const filteredMappings = mappings.filter(mapping => {
    const matchesSearch = mapping.nft_hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mapping.acid_number.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'verified' && mapping.verified) ||
                         (filterStatus === 'pending' && !mapping.verified);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Loading Customs Integration...</h3>
            <p className="text-slate-300">Please wait while we load your data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-cyan-500 to-blue-400 text-white px-6 py-4 rounded-xl shadow-2xl shadow-cyan-500/25 animate-bounce">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-3" />
            <span className="font-semibold">Success! CargoX linked to ACID</span>
          </div>
        </div>
      )}

      {/* Statistics Overview */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
            <Globe size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Customs Integration</h2>
        </div>
        <p className="text-slate-300 text-lg max-w-3xl mb-8">
          Link CargoX NFT hashes to ACID numbers for seamless customs verification and automated compliance processing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+12.5%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{mappings.length}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Total Mappings</div>
            <div className="text-xs text-slate-400">CargoX to ACID links</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
                <CheckCircle size={24} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+8.3%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.verified}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Verified</div>
            <div className="text-xs text-slate-400">Customs approved</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-400/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-xl flex items-center justify-center">
                <Clock size={24} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-indigo-400">
                <Clock size={16} />
                <span className="text-sm font-medium">In Queue</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.pending}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Pending</div>
            <div className="text-xs text-slate-400">Awaiting review</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-400/30 hover:shadow-xl hover:shadow-slate-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-400 rounded-xl flex items-center justify-center">
                <XCircle size={24} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-slate-400">
                <AlertCircle size={16} />
                <span className="text-sm font-medium">Issues</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.rejected}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Rejected</div>
            <div className="text-xs text-slate-400">Requires attention</div>
          </div>
        </div>
      </div>

      {/* Link CargoX to ACID Form */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
            <Link size={20} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Link CargoX to ACID</h3>
        </div>
        <p className="text-slate-300 text-lg max-w-3xl mb-8">
          Create a mapping between a CargoX NFT hash and an ACID number for customs verification.
        </p>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <form onSubmit={handleLinkCargoxToAcid} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  CargoX NFT Hash *
                </label>
                <input
                  type="text"
                  value={nftHash}
                  onChange={(e) => setNftHash(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 font-mono"
                  placeholder="0x1234567890abcdef..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  ACID Number *
                </label>
                <input
                  type="text"
                  value={acidNumber}
                  onChange={(e) => setAcidNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 font-mono"
                  placeholder="123456789"
                  maxLength="9"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={submitting}
                className={`flex items-center space-x-2 px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
                  submitting
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-400 hover:to-cyan-300 hover:scale-105 shadow-lg shadow-blue-500/25'
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Linking...</span>
                  </>
                ) : (
                  <>
                    <Link size={16} />
                    <span>Link CargoX to ACID</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-slate-500/10 border border-slate-500/30 rounded-xl">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-slate-400 mr-3" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-300">Error</h3>
                  <p className="mt-1 text-sm text-slate-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3" />
                <div>
                  <h3 className="text-sm font-semibold text-cyan-300">Success</h3>
                  <p className="mt-1 text-sm text-cyan-200">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mappings Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">My CargoX Mappings</h3>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-400">{filteredMappings.length} mappings</span>
          </div>
        </div>
        <p className="text-slate-300 text-lg max-w-3xl mb-8">
          View and manage your CargoX to ACID mappings for customs verification.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by NFT hash or ACID number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
            />
          </div>
          
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
          {filteredMappings.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No mappings found</h3>
              <p className="text-slate-400">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Create your first CargoX to ACID mapping using the form above.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Mapping ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">NFT Hash</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">ACID Number</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredMappings.map((mapping) => (
                    <tr 
                      key={mapping.id}
                      className={`${newlyCreatedMapping === mapping.id ? 'bg-cyan-500/10 border-l-4 border-cyan-500' : 'hover:bg-slate-700/30'} transition-colors duration-200`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                            <Hash size={16} className="text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{mapping.id}</div>
                            {newlyCreatedMapping === mapping.id && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-slate-300">
                          {mapping.nft_hash.substring(0, 20)}...
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-white">{mapping.acid_number}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(mapping.verified ? 'verified' : 'pending')}
                          <span className={`text-sm font-medium ${
                            mapping.verified ? 'text-cyan-400' : 'text-indigo-400'
                          }`}>
                            {mapping.verified ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {new Date(mapping.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200">
                            <Eye size={14} />
                          </button>
                            {!mapping.verified && (
                              <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200">
                                <CheckSquare size={14} />
                              </button>
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
    </div>
  );
};

export default CustomsIntegrationSafe;
