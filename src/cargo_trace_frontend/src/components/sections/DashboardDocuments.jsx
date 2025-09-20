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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="flex items-center justify-center py-12 relative z-10">
          <div className="text-center">
            <div className="relative">
              <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto mb-6" />
              <div className="absolute inset-0 w-16 h-16 border-2 border-blue-500/20 rounded-full animate-ping mx-auto"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Loading Documents</h3>
            <p className="text-slate-300">Please wait while we fetch your data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
      {/* Hero Section */}
      <div className="mb-8">
        <div className="relative">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-2xl p-6 lg:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-black text-white">Document Management</h1>
                  <p className="text-lg text-slate-300">Manage your CargoX documents and blockchain NFTs</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-400 mb-1">{documentStats.total}</div>
                  <div className="text-xs text-slate-300">Total Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-purple-400 mb-1">{documentStats.nftMinted}</div>
                  <div className="text-xs text-slate-300">NFTs Minted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-green-400 mb-1">${(parseInt(documentStats.totalValue) / 1000000).toFixed(1)}M</div>
                  <div className="text-xs text-slate-300">Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-orange-400 mb-1">{documentStats.verified}</div>
                  <div className="text-xs text-slate-300">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Submission Form */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Upload size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Submit New Document</h2>
            <p className="text-slate-400">Upload and verify your CargoX documents</p>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <span className="text-red-300">{error}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-green-300 font-semibold">{successMessage}</span>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6">
          <form onSubmit={handleSubmitDocument} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Document Type</label>
                <select 
                  value={documentType} 
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                >
                  <option value="">Select document type</option>
                  {documentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Cargo Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                  placeholder="Describe the cargo contents..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">CargoX Document ID *</label>
                <input
                  type="text"
                  value={ethereumTxHash}
                  onChange={(e) => setEthereumTxHash(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 font-mono"
                  placeholder="0x1234...abcd"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">ACID Number *</label>
                <input
                  type="text"
                  value={acidNumber}
                  onChange={(e) => setAcidNumber(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 font-mono"
                  placeholder="123456789"
                  maxLength="9"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Cargo Value (USD) *</label>
                <input
                  type="number"
                  value={valueUsd}
                  onChange={(e) => setValueUsd(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                  placeholder="125000"
                  min="1"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Origin Country</label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                  placeholder="China"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                  placeholder="Egypt"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Shipper</label>
                <input
                  type="text"
                  value={shipper}
                  onChange={(e) => setShipper(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                  placeholder="Company name"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                onClick={handleSubmitDocument}
                disabled={submitting}
                className={`group flex items-center space-x-2 px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
                  submitting
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 hover:scale-105 shadow-lg shadow-green-500/25'
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Submit Document</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Document Management */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Document Management</h2>
              <p className="text-slate-400">Manage and track your submitted documents</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-slate-300">{filteredDocuments.length} documents</span>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 hover:scale-105">
              <Download size={16} />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by ID, ACID, or description..."
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
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="nft-minted">NFT Minted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 rounded-xl overflow-hidden">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">No documents found</h3>
              <p className="text-slate-500">
                {documents.length === 0 
                  ? "No documents have been submitted yet. Submit your first document above." 
                  : "No documents match your search criteria."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Document Info</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">ACID Number</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredDocuments.map((document) => {
                    const StatusIcon = getStatusIcon(document.status);
                    return (
                      <tr key={document.id} className="hover:bg-slate-700/30 transition-all duration-300">
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                              <FileText size={16} className="text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{document.id}</div>
                              <div className="text-xs text-slate-400">{document.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs font-medium">
                            {document.type}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm font-mono text-slate-300">{document.acid}</td>
                        <td className="px-4 py-4 text-sm font-bold text-white">{document.value}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-2">
                            <StatusIcon size={14} className={
                              getStatusColor(document.status) === 'success' ? 'text-green-400' :
                              getStatusColor(document.status) === 'pending' ? 'text-orange-400' :
                              getStatusColor(document.status) === 'nft-minted' ? 'text-purple-400' :
                              getStatusColor(document.status) === 'rejected' ? 'text-red-400' : 'text-slate-400'
                            } />
                            <span className={`text-xs font-bold ${
                              getStatusColor(document.status) === 'success' ? 'text-green-400' :
                              getStatusColor(document.status) === 'pending' ? 'text-orange-400' :
                              getStatusColor(document.status) === 'nft-minted' ? 'text-purple-400' :
                              getStatusColor(document.status) === 'rejected' ? 'text-red-400' : 'text-slate-400'
                            }`}>
                              {document.status.replace('-', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-300 font-medium">{document.date}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewDocument(document.id)}
                              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                              title="View Document"
                            >
                              <Eye size={14} />
                            </button>
                            {document.status === 'pending' && (
                              <button 
                                onClick={() => handleApproveDocument(document.id)}
                                disabled={processingAction === document.id}
                                className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                                title="Approve Document"
                              >
                                {processingAction === document.id ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <CheckCircle size={14} />
                                )}
                              </button>
                            )}
                            {document.status === 'nft-minted' && (
                              <button className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200 hover:scale-110">
                                <Download size={14} />
                              </button>
                            )}
                            <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all duration-200 hover:scale-110">
                              <Edit size={14} />
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
  );
};

export default DashboardDocuments;