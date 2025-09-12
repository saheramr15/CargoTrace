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
      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Customs Integration...</h3>
            <p className="text-gray-600">Please wait while we load your data.</p>
          </div>
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
          <h2 className="dashboard-section-title">Customs Integration</h2>
          <p className="dashboard-section-description">
            Link CargoX NFT hashes to ACID numbers for customs verification
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Mappings</p>
                <p className="text-2xl font-bold text-gray-900">{mappings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link CargoX to ACID Form */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">Link CargoX to ACID</h3>
          <p className="dashboard-section-description">
            Create a mapping between a CargoX NFT hash and an ACID number
          </p>
        </div>

        <form onSubmit={handleLinkCargoxToAcid} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CargoX NFT Hash *
              </label>
              <input
                type="text"
                value={nftHash}
                onChange={(e) => setNftHash(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0x1234567890abcdef..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ACID Number *
              </label>
              <input
                type="text"
                value={acidNumber}
                onChange={(e) => setAcidNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123456789"
                maxLength="9"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
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
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success</h3>
                <p className="mt-1 text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mappings Table */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">My CargoX Mappings</h3>
          <p className="dashboard-section-description">
            View and manage your CargoX to ACID mappings
          </p>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by NFT hash or ACID number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {filteredMappings.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mappings found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Create your first CargoX to ACID mapping using the form above.'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mapping ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NFT Hash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACID Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMappings.map((mapping) => (
                  <tr 
                    key={mapping.id}
                    className={`${newlyCreatedMapping === mapping.id ? 'bg-green-50 border-l-4 border-green-500' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Hash className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{mapping.id}</span>
                        {newlyCreatedMapping === mapping.id && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">
                        {mapping.nft_hash.substring(0, 20)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{mapping.acid_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(mapping.verified ? 'verified' : 'pending')}
                        <span className="ml-2 text-sm text-gray-900">
                          {mapping.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(mapping.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        {!mapping.verified && (
                          <button className="text-green-600 hover:text-green-900">
                            <CheckSquare className="w-4 h-4" />
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
  );
};

export default CustomsIntegrationSafe;
