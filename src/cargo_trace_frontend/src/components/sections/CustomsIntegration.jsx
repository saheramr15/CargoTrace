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
  CheckSquare,
  ArrowRight,
  Zap,
  Lock,
  Activity
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="flex items-center justify-center py-12 relative z-10">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl flex items-center justify-center mx-auto shadow-2xl border border-blue-400/30">
                <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-2xl blur animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Loading Customs Integration
              </h3>
              <p className="text-slate-300 text-lg">Please wait while we load your data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-blue-400/8 rounded-full blur-xl animate-float" style={{animationDelay: '6s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300/25 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl shadow-green-500/25 animate-bounce backdrop-blur-sm border border-green-400/30">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-3" />
            <span className="font-semibold">Success! CargoX linked to ACID</span>
          </div>
        </div>
      )}

      {/* Statistics Overview */}
      <div className="mb-12 relative z-10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <BarChart3 size={24} className="text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Customs Integration
            </h2>
            <p className="text-slate-300 text-lg">Advanced blockchain-powered customs management</p>
          </div>
        </div>
        <p className="text-slate-300 text-lg max-w-4xl mb-8 leading-relaxed">
          Comprehensive customs integration system for linking CargoX NFTs to ACID numbers and managing verification processes with blockchain security and real-time tracking.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 hover:scale-105">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl flex items-center justify-center">
                    <Link size={28} className="text-blue-400" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-sm font-medium text-green-400">+12.5%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">{mappings.length}</div>
                <div className="text-lg font-bold text-white">Total Mappings</div>
                <div className="text-sm text-slate-400">CargoX → ACID links</div>
              </div>
            </div>
          </div>

          <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-700 hover:scale-105">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 via-emerald-400/20 to-green-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-2xl flex items-center justify-center">
                    <CheckCircle size={28} className="text-green-400" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-sm font-medium text-green-400">+8.3%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">{stats.verified}</div>
                <div className="text-lg font-bold text-white">Verified</div>
                <div className="text-sm text-slate-400">Customs verified entries</div>
              </div>
            </div>
          </div>

          <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-700 hover:scale-105">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 via-yellow-400/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-2xl flex items-center justify-center">
                    <Clock size={28} className="text-orange-400" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/20 to-yellow-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full">
                  <TrendingUp size={14} className="text-orange-400" />
                  <span className="text-sm font-medium text-orange-400">+5.7%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">{stats.pending}</div>
                <div className="text-lg font-bold text-white">Pending</div>
                <div className="text-sm text-slate-400">Awaiting verification</div>
              </div>
            </div>
          </div>

          <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-red-400/50 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-700 hover:scale-105">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 via-pink-400/20 to-red-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-pink-400/20 rounded-2xl flex items-center justify-center">
                    <Shield size={28} className="text-red-400" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-red-500/20 to-pink-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
                  <AlertCircle size={14} className="text-red-400" />
                  <span className="text-sm font-medium text-red-400">Issues</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black bg-gradient-to-r from-red-400 to-pink-300 bg-clip-text text-transparent">{stats.rejected}</div>
                <div className="text-lg font-bold text-white">Rejected</div>
                <div className="text-sm text-slate-400">Failed verification</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link CargoX to ACID Form */}
      <div className="mb-12 relative z-10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <Plus size={24} className="text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
              Link CargoX NFT to ACID
            </h2>
            <p className="text-slate-300 text-lg">Connect blockchain documents with customs records</p>
          </div>
        </div>
        <p className="text-slate-300 text-lg max-w-4xl mb-8 leading-relaxed">
          Link your CargoX NFT hash to an ACID number to enable customs verification. 
          This will connect your blockchain document with customs records for seamless integration.
        </p>
        
        {error && (
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-red-300 font-medium">{error}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl backdrop-blur-sm animate-pulse">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-green-300 font-semibold text-lg">{successMessage}</span>
            </div>
            <div className="text-sm text-green-200 ml-13">
              ✅ Your mapping has been created and is now visible in the table below!
            </div>
          </div>
        )}

        <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-green-400/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/10 via-emerald-400/10 to-green-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-lg font-bold text-white">
                  <Hash className="w-5 h-5 text-blue-400" />
                  <span>CargoX NFT Hash *</span>
                </label>
                <input
                  type="text"
                  value={nftHash}
                  onChange={(e) => setNftHash(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 font-mono disabled:opacity-50 hover:border-blue-400/30"
                  placeholder="0x1234567890abcdef..."
                  disabled={submitting}
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-lg font-bold text-white">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <span>ACID Number *</span>
                </label>
                <input
                  type="text"
                  value={acidNumber}
                  onChange={(e) => setAcidNumber(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 font-mono disabled:opacity-50 hover:border-cyan-400/30"
                  placeholder="123456789"
                  maxLength="9"
                  disabled={submitting}
                  required
                />
              </div>
            </div>
          
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                type="button" 
                onClick={handleLinkCargoxToAcid}
                disabled={submitting}
                className={`group relative inline-flex items-center justify-center px-8 py-4 font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
                  submitting
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-400 hover:shadow-2xl hover:shadow-green-500/25'
                }`}
              >
                {submitting ? (
                  <div className="flex items-center space-x-3">
                    <Loader2 size={20} className="animate-spin" />
                    <span>Linking...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link size={20} />
                    <span>Link CargoX to ACID</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                className="group inline-flex items-center justify-center px-6 py-4 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 transform hover:-translate-y-1"
              >
                <Activity size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold">Test Backend Connection</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Documents Section */}
      {relatedDocuments.length > 0 && (
        <div className="mb-12 relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <FileText size={24} className="text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Your Documents
              </h2>
              <p className="text-slate-300 text-lg">Blockchain-verified cargo documents</p>
            </div>
          </div>
          <p className="text-slate-300 text-lg max-w-4xl mb-8 leading-relaxed">
            Documents that can be linked to CargoX NFTs. Use the same ACID number to create mappings for seamless integration.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedDocuments.map((doc) => (
              <div key={doc.id} className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 hover:scale-105">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-xl flex items-center justify-center">
                          <FileText size={20} className="text-blue-400" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <span className="text-lg font-bold text-white">{doc.id}</span>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      doc.status.Pending ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      doc.status.Verified ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      doc.status.NftMinted ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {doc.status.Pending ? 'Pending' :
                       doc.status.Verified ? 'Verified' :
                       doc.status.NftMinted ? 'Ready for Loan' :
                       'Rejected'}
                    </span>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                      <span className="text-slate-400 font-medium">ACID:</span>
                      <span className="text-white font-mono text-lg">{doc.acid_number}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                      <span className="text-slate-400 font-medium">Value:</span>
                      <span className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">${doc.value_usd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-400 font-medium">Created:</span>
                      <span className="text-slate-300 font-semibold">{new Date(doc.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mappings Management */}
      <div className="mb-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <FileText size={24} className="text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/20 to-indigo-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
                CargoX Mappings
              </h2>
              <p className="text-slate-300 text-lg">Blockchain-verified cargo mappings</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{filteredMappings.length}</div>
              <div className="text-sm text-slate-400">Total Mappings</div>
            </div>
            <button className="group inline-flex items-center space-x-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
              <ExternalLink size={18} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Export Data</span>
            </button>
          </div>
        </div>
        <p className="text-slate-300 text-lg max-w-4xl mb-8 leading-relaxed">
          Manage your CargoX to ACID mappings and verification processes with real-time blockchain integration.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" size={20} />
            <input
              type="text"
              placeholder="Search by NFT hash, ACID, or mapping ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300 hover:border-blue-400/30 text-lg"
            />
          </div>
          <div className="sm:w-56">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 hover:border-purple-400/30 text-lg font-medium"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Mappings Table */}
        <div className="group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden hover:border-purple-400/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 via-indigo-400/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            {filteredMappings.length === 0 ? (
              <div className="text-center py-16">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-indigo-400/20 rounded-2xl flex items-center justify-center mx-auto shadow-2xl border border-purple-400/30">
                    <Link size={32} className="text-purple-400" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/10 to-indigo-400/10 rounded-2xl blur animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent mb-4">No mappings found</h3>
                <p className="text-slate-300 text-lg max-w-md mx-auto">
                  {mappings.length === 0 
                    ? "No CargoX mappings have been created yet. Create your first mapping above to get started." 
                    : "No mappings match your search criteria. Try adjusting your filters."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-700/50 to-slate-600/50">
                    <tr>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">Mapping Info</th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">CargoX NFT Hash</th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">ACID Number</th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">Status</th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">Created</th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {filteredMappings.map((mapping) => {
                      const verification = verifications.find(v => v.nft_hash === mapping.nft_hash);
                      const verificationStatus = verification ? getVerificationStatus(verification.verification_status) : 'pending';
                      const StatusIcon = getStatusIcon(verificationStatus);
                      
                      const isNewlyCreated = newlyCreatedMapping === mapping.id;
                      
                      return (
                        <tr key={mapping.id} className={`group ${isNewlyCreated ? 'bg-green-500/10 border-l-4 border-green-500' : 'hover:bg-slate-700/20'} transition-all duration-300`}>
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <div className="relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                                  <Link size={20} className="text-orange-400" />
                                </div>
                                <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-white flex items-center gap-3">
                                  {mapping.id}
                                  {isNewlyCreated && (
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full animate-pulse border border-green-500/30">
                                      NEW
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-slate-400 font-medium">CargoX → ACID Mapping</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm font-mono text-slate-300 max-w-xs truncate bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-600/30">
                              {mapping.nft_hash}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-lg font-bold text-white font-mono bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-600/30">{mapping.acid_number}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <StatusIcon size={20} className={
                                  verificationStatus === 'verified' ? 'text-green-400' :
                                  verificationStatus === 'pending' ? 'text-orange-400' :
                                  verificationStatus === 'under-review' ? 'text-blue-400' :
                                  verificationStatus === 'rejected' ? 'text-red-400' : 'text-slate-400'
                                } />
                                <div className={`absolute -inset-1 rounded-full ${
                                  verificationStatus === 'verified' ? 'bg-green-500/20' :
                                  verificationStatus === 'pending' ? 'bg-orange-500/20' :
                                  verificationStatus === 'under-review' ? 'bg-blue-500/20' :
                                  verificationStatus === 'rejected' ? 'bg-red-500/20' : 'bg-slate-500/20'
                                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                              </div>
                              <span className={`text-lg font-bold ${
                                verificationStatus === 'verified' ? 'text-green-400' :
                                verificationStatus === 'pending' ? 'text-orange-400' :
                                verificationStatus === 'under-review' ? 'text-blue-400' :
                                verificationStatus === 'rejected' ? 'text-red-400' : 'text-slate-400'
                              }`}>
                                {verificationStatus.replace('-', ' ')}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-lg text-slate-300 font-semibold">
                            {new Date(mapping.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-3">
                              <button 
                                onClick={() => handleVerifyCustomsEntry(mapping.nft_hash)}
                                disabled={verificationStatus === 'verified'}
                                className="group/btn p-3 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transform hover:-translate-y-1"
                                title="Verify Entry"
                              >
                                <CheckSquare size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
                              </button>
                              <button 
                                onClick={() => handleRejectCustomsEntry(mapping.nft_hash)}
                                disabled={verificationStatus === 'rejected'}
                                className="group/btn p-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transform hover:-translate-y-1"
                                title="Reject Entry"
                              >
                                <XCircle size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
                              </button>
                              <button className="group/btn p-3 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-300 hover:scale-110 transform hover:-translate-y-1">
                                <Eye size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
                              </button>
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
      </div>
    </div>
  );
};

export default CustomsIntegration;
