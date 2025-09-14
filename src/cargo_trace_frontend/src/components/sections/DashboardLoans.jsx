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
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'under_review': return 'info';
      case 'rejected': return 'danger';
      default: return 'pending';
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
      <div className="dashboard-loans-container">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading loans and documents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-loans-container">
      {/* Loan Application Statistics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Loan Application Overview
          </h2>
        </div>
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon documents">
              <FileCheck size={24} color="white" />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp size={16} />
              <span className="dashboard-stat-percentage">+12.5%</span>
            </div>
            <div className="dashboard-stat-value">{loanStats.total}</div>
            <div className="dashboard-stat-label">Total Applications</div>
            <div className="dashboard-stat-description">All loan requests</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon loans">
              <CheckCircle size={24} color="white" />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp size={16} />
              <span className="dashboard-stat-percentage">+8.3%</span>
            </div>
            <div className="dashboard-stat-value">{loanStats.approved}</div>
            <div className="dashboard-stat-label">Approved Loans</div>
            <div className="dashboard-stat-description">Successfully processed</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon nfts">
              <Percent size={24} color="white" />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp size={16} />
              <span className="dashboard-stat-percentage">+5.7%</span>
            </div>
            <div className="dashboard-stat-value">{loanStats.approvalRate}%</div>
            <div className="dashboard-stat-label">Approval Rate</div>
            <div className="dashboard-stat-description">Success rate</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon fusion">
              <Timer size={24} color="white" />
            </div>
            <div className="dashboard-stat-trend">
              <TrendingUp size={16} />
              <span className="dashboard-stat-percentage">-15.2%</span>
            </div>
            <div className="dashboard-stat-value">{loanStats.avgProcessingTime}</div>
            <div className="dashboard-stat-label">Avg Processing Time</div>
            <div className="dashboard-stat-description">Faster approvals</div>
          </div>
        </div>
      </div>

      {/* New Loan Application Form */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Plus className="dashboard-section-icon" />
            New Loan Application
          </h2>
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
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700">{successMessage}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleNewLoanApplication} className="dashboard-form-grid">
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Loan Amount (USD) *</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="dashboard-form-input"
              placeholder="50000"
              min="1"
              required
            />
          </div>

          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Collateral Document *</label>
            <select 
              value={collateralDocument} 
              onChange={(e) => setCollateralDocument(e.target.value)}
              className="dashboard-form-input"
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
              <p className="text-sm text-gray-500 mt-1">
                No approved documents available. Please submit and get a document approved first.
              </p>
            )}
          </div>

          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Repayment Date *</label>
            <input
              type="date"
              value={repaymentDate}
              onChange={(e) => setRepaymentDate(e.target.value)}
              className="dashboard-form-input"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Loan Type</label>
            <select className="dashboard-form-input" required>
              <option value="">Select loan type</option>
              <option value="icrc1">ICRC-1 Stable Token</option>
              <option value="icp">ICP Native Token</option>
              <option value="bridge">Cross-Chain Bridge</option>
            </select>
          </div>
        </form>
        <button 
          type="submit" 
          onClick={handleNewLoanApplication}
          disabled={submitting || documents.length === 0}
          className="dashboard-submit-button"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <DollarSign size={16} />
              Submit Application
            </>
          )}
        </button>
      </div>

      {/* Loan Applications Management */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <FileCheck className="dashboard-section-icon" />
            Loan Applications
          </h2>
          <div className="dashboard-section-actions">
            <span className="dashboard-section-count">{filteredLoans.length} applications</span>
            <div className="dashboard-search-filter">
              <div className="dashboard-search-box">
                <Search size={16} className="dashboard-search-icon" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dashboard-search-input"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="dashboard-filter-select"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        <div className="dashboard-table-container">
          {filteredLoans.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No loans found</h3>
              <p className="text-gray-600">
                {loans.length === 0 
                  ? "No loans have been requested yet. Submit your first loan application above." 
                  : "No loans match your search criteria."}
              </p>
            </div>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Document ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Application Date</th>
                  <th>Repayment Date</th>
                  <th>Interest Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td className="font-mono text-sm">{loan.documentId}</td>
                    <td>{loan.amount}</td>
                    <td>
                      <span className={`dashboard-status ${getStatusColor(loan.status)}`}>
                        {getStatusIcon(loan.status)}
                        {loan.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{loan.applicationDate}</td>
                    <td>{loan.repaymentDate}</td>
                    <td>{loan.apr}</td>
                    <td className="dashboard-table-actions">
                      <button className="dashboard-action-button view">
                        <Eye size={16} />
                      </button>
                      <button className="dashboard-action-button edit">
                        <Edit size={16} />
                      </button>
                      <button className="dashboard-action-button download">
                        <FileText size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Loan Processing Pipeline */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Target className="dashboard-section-icon" />
            Loan Processing Pipeline
          </h2>
        </div>
        <div className="dashboard-pipeline">
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon">
              <FileCheck size={24} color="white" />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>Document Verification</h4>
              <p>CargoX & ACID validation</p>
              <div className="dashboard-pipeline-count">{documents.length} Documents</div>
            </div>
          </div>
          <div className="dashboard-pipeline-arrow">→</div>
          
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon">
              <Shield size={24} color="white" />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>NFT Minting</h4>
              <p>ICP blockchain collateral</p>
              <div className="dashboard-pipeline-count">100% Secure</div>
            </div>
          </div>
          <div className="dashboard-pipeline-arrow">→</div>
          
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon">
              <CheckCircle size={24} color="white" />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>Smart Contract</h4>
              <p>Automated loan issuance</p>
              <div className="dashboard-pipeline-count">{loanStats.approved} Approved</div>
            </div>
          </div>
          <div className="dashboard-pipeline-arrow">→</div>
          
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon">
              <Wallet size={24} color="white" />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>ICRC-1 Disbursement</h4>
              <p>Instant stable token transfer</p>
              <div className="dashboard-pipeline-count">24/7 Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoans;