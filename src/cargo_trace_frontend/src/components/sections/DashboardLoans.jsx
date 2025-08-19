import React, { useState } from 'react';
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
  Building
} from 'lucide-react';

const DashboardLoans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loanAmount, setLoanAmount] = useState('');
  const [collateralDocument, setCollateralDocument] = useState('');

  // Focused loan application data
  const mockLoanApplications = [
    {
      id: 'LOAN-APP-2024-001',
      documentId: 'CX-2024-001',
      amount: '$100,000',
      collateral: 'Electronics NFT',
      apr: '8.5%',
      status: 'approved',
      applicationDate: '2024-01-10',
      approvalDate: '2024-01-12',
      disbursementDate: '2024-01-15',
      origin: 'China',
      destination: 'Egypt',
      cargoType: 'Electronics',
      shipper: 'Samsung Electronics Co.',
      consignee: 'TechTrade Egypt',
      loanType: 'ICRC-1 Stable Token',
      blockchain: 'Internet Computer',
      nftId: 'NFT-ICP-001',
      creditScore: 85,
      riskLevel: 'Low',
      processingTime: '2 days'
    },
    {
      id: 'LOAN-APP-2024-002',
      documentId: 'CX-2024-003',
      amount: '$50,000',
      collateral: 'Agricultural NFT',
      apr: '7.2%',
      status: 'pending',
      applicationDate: '2024-01-15',
      approvalDate: null,
      disbursementDate: null,
      origin: 'Kenya',
      destination: 'Egypt',
      cargoType: 'Agricultural',
      shipper: 'Kenya Coffee Exporters',
      consignee: 'Cairo Coffee Roasters',
      loanType: 'ICRC-1 Stable Token',
      blockchain: 'Internet Computer',
      nftId: 'NFT-ICP-002',
      creditScore: 72,
      riskLevel: 'Medium',
      processingTime: 'In Progress'
    },
    {
      id: 'LOAN-APP-2024-003',
      documentId: 'CX-2024-005',
      amount: '$75,000',
      collateral: 'Pharmaceutical NFT',
      apr: '6.8%',
      status: 'under_review',
      applicationDate: '2024-01-18',
      approvalDate: null,
      disbursementDate: null,
      origin: 'Switzerland',
      destination: 'Egypt',
      cargoType: 'Pharmaceuticals',
      shipper: 'Swiss Pharma AG',
      consignee: 'Egyptian Healthcare Ltd.',
      loanType: 'ICRC-1 Stable Token',
      blockchain: 'Internet Computer',
      nftId: 'NFT-ICP-003',
      creditScore: 90,
      riskLevel: 'Low',
      processingTime: 'Under Review'
    },
    {
      id: 'LOAN-APP-2024-004',
      documentId: 'CX-2024-002',
      amount: '$120,000',
      collateral: 'Textile NFT',
      apr: '9.1%',
      status: 'rejected',
      applicationDate: '2024-01-05',
      approvalDate: null,
      disbursementDate: null,
      origin: 'India',
      destination: 'Egypt',
      cargoType: 'Textiles',
      shipper: 'Indian Textile Corp.',
      consignee: 'Egyptian Fashion Ltd.',
      loanType: 'ICRC-1 Stable Token',
      blockchain: 'Internet Computer',
      nftId: 'NFT-ICP-004',
      creditScore: 45,
      riskLevel: 'High',
      processingTime: 'Rejected'
    }
  ];

  const loanStats = {
    total: mockLoanApplications.length,
    approved: mockLoanApplications.filter(loan => loan.status === 'approved').length,
    pending: mockLoanApplications.filter(loan => loan.status === 'pending').length,
    underReview: mockLoanApplications.filter(loan => loan.status === 'under_review').length,
    rejected: mockLoanApplications.filter(loan => loan.status === 'rejected').length,
    totalValue: mockLoanApplications.reduce((sum, loan) => sum + parseFloat(loan.amount.replace('$', '').replace(',', '')), 0),
    avgProcessingTime: '2.3 days',
    approvalRate: ((mockLoanApplications.filter(loan => loan.status === 'approved').length / mockLoanApplications.length) * 100).toFixed(1)
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

  const handleNewLoanApplication = (e) => {
    e.preventDefault();
    console.log('Processing new loan application:', { loanAmount, collateralDocument });
  };

  const filteredLoans = mockLoanApplications.filter(loan => {
    const matchesSearch = searchTerm === '' ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.cargoType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.shipper.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
        <form onSubmit={handleNewLoanApplication} className="dashboard-form-grid">
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Loan Amount (USD)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="dashboard-form-input"
              placeholder="50000"
              required
            />
          </div>

          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Collateral Document</label>
            <select 
              value={collateralDocument} 
              onChange={(e) => setCollateralDocument(e.target.value)}
              className="dashboard-form-input"
              required
            >
              <option value="">Select a document...</option>
              <option value="CX-2024-006">CX-2024-006 - Electronics Shipment</option>
              <option value="CX-2024-007">CX-2024-007 - Agricultural Products</option>
              <option value="CX-2024-008">CX-2024-008 - Textile Imports</option>
            </select>
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

          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Collateral Type</label>
            <select className="dashboard-form-input" required>
              <option value="">Select collateral type</option>
              <option value="electronics">Electronics NFT</option>
              <option value="agricultural">Agricultural NFT</option>
              <option value="pharmaceutical">Pharmaceutical NFT</option>
              <option value="textile">Textile NFT</option>
            </select>
          </div>
        </form>
        <button type="submit" className="dashboard-submit-button">
          <DollarSign size={16} />
          Submit Application
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
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Document ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Application Date</th>
                <th>Processing Time</th>
                <th>Credit Score</th>
                <th>Risk Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.documentId}</td>
                  <td>{loan.amount}</td>
                  <td>
                    <span className={`dashboard-status ${getStatusColor(loan.status)}`}>
                      {getStatusIcon(loan.status)}
                      {loan.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{loan.applicationDate}</td>
                  <td>{loan.processingTime}</td>
                  <td>
                    <span className={`dashboard-credit-score ${loan.creditScore >= 80 ? 'excellent' : loan.creditScore >= 70 ? 'good' : 'poor'}`}>
                      {loan.creditScore}
                    </span>
                  </td>
                  <td>
                    <span className={`dashboard-risk-level ${loan.riskLevel.toLowerCase()}`}>
                      {loan.riskLevel}
                    </span>
                  </td>
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
              <div className="dashboard-pipeline-count">{loanStats.total} Documents</div>
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