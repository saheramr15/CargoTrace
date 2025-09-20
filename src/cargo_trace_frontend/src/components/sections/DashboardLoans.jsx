import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  FileText,
  Eye,
  Edit,
  CreditCard,
  Wallet,
  Percent,
  Target,
  Award,
  Calendar,
  ArrowUpRight,
  FileCheck,
  Timer,
  Users,
  Building,
  Loader2
} from 'lucide-react';
import { cargo_trace_backend as backend } from '../../../../declarations/cargo_trace_backend';

const DashboardLoans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loanAmount, setLoanAmount] = useState('');
  const [collateralDocument, setCollateralDocument] = useState('');
  const [repaymentDate, setRepaymentDate] = useState('');
  const [loans, setLoans] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Load loans and documents on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load both loans and documents
      const [backendLoans, backendDocs] = await Promise.all([
        backend.get_my_loans(),
        backend.get_my_documents()
      ]);
      
      // Transform backend loans to frontend format
      const transformedLoans = backendLoans.map(loan => ({
        id: loan.id,
        documentId: loan.document_id,
        amount: `$${loan.amount.toString().toLocaleString()}`,
        collateral: 'Document NFT',
        apr: `${loan.interest_rate}%`,
        status: getLoanStatus(loan.status),
        applicationDate: new Date(Number(loan.created_at) / 1000000).toLocaleDateString(),
        approvalDate: 'Approved' in loan.status ? new Date(Number(loan.created_at) / 1000000).toLocaleDateString() : null,
        disbursementDate: 'Approved' in loan.status ? new Date(Number(loan.created_at) / 1000000).toLocaleDateString() : null,
        origin: 'Origin Country',
        destination: 'Destination Country',
        cargoType: 'Cargo Type',
        shipper: 'Shipper Company',
        consignee: 'Consignee Company',
        loanType: 'ICRC-1 Stable Token',
        blockchain: 'Internet Computer',
        nftId: `NFT-ICP-${loan.id}`,
        creditScore: 85,
        riskLevel: 'Low',
        processingTime: 'Approved' in loan.status ? '2 days' : 'In Progress',
        rawAmount: loan.amount,
        repaymentDate: new Date(Number(loan.repayment_date) / 1000000).toLocaleDateString()
      }));

      // Transform documents to show only NftMinted ones for the logged-in user
      const approvedDocuments = backendDocs
        .filter(doc => 'NftMinted' in doc.status)
        .map(doc => ({
          id: doc.id,
          acid: doc.acid_number,
          value: `$${doc.value_usd.toString().toLocaleString()}`,
          description: `Document for ACID: ${doc.acid_number}`,
          date: new Date(Number(doc.created_at) / 1000000).toLocaleDateString(),
          ethereumTxHash: doc.ethereum_tx_hash || null,
          rawValue: doc.value_usd
        }));

      setLoans(transformedLoans);
      setDocuments(approvedDocuments);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError(err.message.includes('Panicked at') ? 'Backend storage error. Please contact support or redeploy the canister.' : err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getLoanStatus = (status) => {
    if ('Pending' in status) return 'pending';
    if ('Approved' in status) return 'approved';
    if ('Active' in status) return 'active';
    if ('Repaid' in status) return 'repaid';
    if ('Defaulted' in status) return 'defaulted';
    if ('Rejected' in status) return 'rejected';
    return 'pending';
  };

  const loanStats = {
    total: loans.length,
    approved: loans.filter(loan => loan.status === 'approved').length,
    pending: loans.filter(loan => loan.status === 'pending').length,
    underReview: loans.filter(loan => loan.status === 'under_review').length,
    rejected: loans.filter(loan => loan.status === 'rejected').length,
    totalValue: loans.reduce((sum, loan) => {
      const val = typeof loan.rawAmount === 'bigint' ? loan.rawAmount : BigInt(loan.rawAmount || 0n);
      return sum + val;
    }, 0n).toString(),
    avgProcessingTime: '2.3 days',
    approvalRate: loans.length > 0 ? ((loans.filter(loan => loan.status === 'approved').length / loans.length) * 100).toFixed(1) : '0'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'cyan';
      case 'pending': return 'indigo';
      case 'under_review': return 'blue';
      case 'rejected': return 'slate';
      default: return 'indigo';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'under_review': return <FileCheck size={16} />;
      case 'rejected': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const handleNewLoanApplication = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      setSuccessMessage('');
      
      // Validate required fields
      if (!loanAmount || !collateralDocument || !repaymentDate) {
        throw new Error('Please fill in all required fields');
      }

      // Validate loan amount
      const amount = parseInt(loanAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid loan amount');
      }

      // Find the selected document
      const selectedDoc = documents.find(doc => doc.id === collateralDocument);
      if (!selectedDoc) {
        throw new Error('Please select a valid document');
      }

      // Validate loan amount doesn't exceed 80% of document value
      const docValue = typeof selectedDoc.rawValue === 'bigint' ? selectedDoc.rawValue : BigInt(selectedDoc.rawValue || 0n);
      if (BigInt(amount) > docValue * 80n / 100n) {
        throw new Error('Loan amount cannot exceed 80% of document value');
      }

      // Convert repayment date to timestamp (nanoseconds for IC)
      const repaymentTimestamp = BigInt(new Date(repaymentDate).getTime()) * 1000000n;

      // Submit loan request to backend
      const result = await backend.request_loan(collateralDocument, BigInt(amount), repaymentTimestamp);
      
      if ('Err' in result) {
        throw new Error(result.Err);
      }

      // Clear form
      setLoanAmount('');
      setCollateralDocument('');
      setRepaymentDate('');

      // Show success message
      setSuccessMessage(`Loan request submitted successfully! Loan ID: ${result.Ok}`);
      
      // Reload data
      await loadData();
      
      console.log('✅ Loan request submitted successfully:', result.Ok);
    } catch (err) {
      console.error('Failed to submit loan request:', err);
      setError(err.message || 'Failed to submit loan request');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = searchTerm === '' ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.cargoType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.shipper.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.documentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <span className="text-slate-300 text-lg">Loading loans and documents...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8">
      {/* Loan Application Statistics */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
            <BarChart3 size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Loan Application Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <FileCheck size={20} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <TrendingUp size={14} />
                <span className="text-xs font-medium">+12.5%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{loanStats.total}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Total Applications</div>
            <div className="text-xs text-slate-400">All loan requests</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
                <CheckCircle size={20} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <TrendingUp size={14} />
                <span className="text-xs font-medium">+8.3%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{loanStats.approved}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Approved Loans</div>
            <div className="text-xs text-slate-400">Successfully processed</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-indigo-400/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-xl flex items-center justify-center">
                <Percent size={20} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <TrendingUp size={14} />
                <span className="text-xs font-medium">+5.7%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{loanStats.approvalRate}%</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Approval Rate</div>
            <div className="text-xs text-slate-400">Success rate</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-slate-400/30 hover:shadow-xl hover:shadow-slate-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-400 rounded-xl flex items-center justify-center">
                <Timer size={20} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <TrendingUp size={14} />
                <span className="text-xs font-medium">-15.2%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{loanStats.avgProcessingTime}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Avg Processing Time</div>
            <div className="text-xs text-slate-400">Faster approvals</div>
          </div>
        </div>
      </div>

      {/* New Loan Application Form */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
            <Plus size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">New Loan Application</h2>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-slate-500/10 border border-slate-500/30 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 text-slate-400 mr-2" />
              <span className="text-slate-300 text-sm">{error}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-cyan-300 text-sm">{successMessage}</span>
            </div>
          </div>
        )}

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <form onSubmit={handleNewLoanApplication} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Loan Amount (USD) *</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                placeholder="50000"
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Collateral Document *</label>
              <select 
                value={collateralDocument} 
                onChange={(e) => setCollateralDocument(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                required
              >
                <option value="">Select a document...</option>
                {documents.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.id} - {doc.description} (Value: {doc.value})
                  </option>
                ))}
              </select>
              {documents.length === 0 && (
                <p className="text-sm text-indigo-400 mt-1">
                  No approved documents available. Please submit and get a document approved first.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Repayment Date *</label>
              <input
                type="date"
                value={repaymentDate}
                onChange={(e) => setRepaymentDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Loan Type</label>
              <select className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200" required>
                <option value="">Select loan type</option>
                <option value="icrc1">ICRC-1 Stable Token</option>
                <option value="icp">ICP Native Token</option>
                <option value="bridge">Cross-Chain Bridge</option>
              </select>
            </div>
          </form>
          
          <div className="mt-4 flex justify-end">
            <button 
              type="submit" 
              onClick={handleNewLoanApplication}
              disabled={submitting || documents.length === 0}
                className={`flex items-center space-x-2 px-4 py-2 font-semibold rounded-lg transition-all duration-200 ${
                  submitting || documents.length === 0
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-400 hover:to-cyan-300 hover:scale-105 shadow-lg shadow-blue-500/25'
                }`}
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <DollarSign size={14} />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loan Applications Management */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-xl flex items-center justify-center">
              <FileCheck size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Loan Applications</h2>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-400">{filteredLoans.length} applications</span>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
          {filteredLoans.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No loans found</h3>
              <p className="text-slate-400">
                {loans.length === 0 
                  ? "No loans have been requested yet. Submit your first loan application above." 
                  : "No loans match your search criteria."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Application ID</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Document ID</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Amount</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Application Date</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Repayment Date</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Interest Rate</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-slate-700/30 transition-colors duration-200">
                      <td className="px-3 py-3 text-sm font-semibold text-white">{loan.id}</td>
                      <td className="px-3 py-3 font-mono text-sm text-slate-300">{loan.documentId}</td>
                      <td className="px-3 py-3 text-sm font-semibold text-white">{loan.amount}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(loan.status)}
                          <span className={`text-sm font-medium ${
                            getStatusColor(loan.status) === 'cyan' ? 'text-cyan-400' :
                            getStatusColor(loan.status) === 'indigo' ? 'text-indigo-400' :
                            getStatusColor(loan.status) === 'blue' ? 'text-blue-400' :
                            getStatusColor(loan.status) === 'slate' ? 'text-slate-400' : 'text-slate-400'
                          }`}>
                            {loan.status.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-300">{loan.applicationDate}</td>
                      <td className="px-3 py-3 text-sm text-slate-300">{loan.repaymentDate}</td>
                      <td className="px-3 py-3 text-sm font-semibold text-white">{loan.apr}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200">
                            <Eye size={14} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all duration-200">
                            <Edit size={14} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200">
                            <FileText size={14} />
                          </button>
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

      {/* Loan Processing Pipeline */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-xl flex items-center justify-center">
            <Target size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Loan Processing Pipeline</h2>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileCheck size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Document Verification</h4>
              <p className="text-sm text-slate-400 mb-3">CargoX & ACID validation</p>
              <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full inline-block">
                {documents.length} Documents
              </div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">NFT Minting</h4>
              <p className="text-sm text-slate-400 mb-3">ICP blockchain collateral</p>
              <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full inline-block">
                100% Secure
              </div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Smart Contract</h4>
              <p className="text-sm text-slate-400 mb-3">Automated loan issuance</p>
              <div className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-medium rounded-full inline-block">
                {loanStats.approved} Approved
              </div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Wallet size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">ICRC-1 Disbursement</h4>
              <p className="text-sm text-slate-400 mb-3">Instant stable token transfer</p>
              <div className="px-3 py-1 bg-slate-500/20 text-slate-400 text-xs font-medium rounded-full inline-block">
                24/7 Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoans;