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
  ArrowUpRight
} from 'lucide-react';

const DashboardLoans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loanAmount, setLoanAmount] = useState('');
  const [collateralDocument, setCollateralDocument] = useState('');

  // Focused loan data
  const mockLoans = [
    {
      id: 'LOAN-2024-001',
      documentId: 'CX-2024-001',
      amount: '$100,000',
      collateral: 'Electronics NFT',
      apr: '8.5%',
      status: 'active',
      dueDate: '2024-04-15',
      progress: 65,
      repaid: '$65,000',
      remaining: '$35,000',
      origin: 'China',
      destination: 'Egypt',
      cargoType: 'Electronics',
      shipper: 'Samsung Electronics Co.',
      consignee: 'TechTrade Egypt',
      loanType: 'ICRC-1 Stable Token',
      blockchain: 'Internet Computer',
      nftId: 'NFT-ICP-001'
    },
    {
      id: 'LOAN-2024-002',
      documentId: 'CX-2024-003',
      amount: '$50,000',
      collateral: 'Agricultural NFT',
      apr: '7.2%',
      status: 'active',
      dueDate: '2024-03-20',
      progress: 45,
      repaid: '$22,500',
      remaining: '$27,500',
      origin: 'Kenya',
      destination: 'Egypt',
      cargoType: 'Agricultural',
      shipper: 'Kenya Coffee Exporters',
      consignee: 'Cairo Coffee Roasters',
      loanType: 'ICRC-1 Stable Token',
      blockchain: 'Internet Computer',
      nftId: 'NFT-ICP-002'
    },
    {
      id: 'LOAN-2024-003',
      documentId: 'CX-2024-005',
      amount: '$75,000',
      collateral: 'Pharmaceutical NFT',
      apr: '6.8%',
      status: 'pending',
      dueDate: '2024-05-10',
      progress: 0,
      repaid: '$0',
      remaining: '$75,000',
      origin: 'Switzerland',
      destination: 'Egypt',
      cargoType: 'Pharmaceuticals',
      shipper: 'Swiss Pharma AG',
      consignee: 'Egyptian Healthcare Ltd.',
      loanType: 'ICRC-1 Stable Token',
      blockchain: 'Internet Computer',
      nftId: 'NFT-ICP-003'
    },
    {
      id: 'LOAN-2024-004',
      documentId: 'CX-2024-002',
      amount: '$120,000',
      collateral: 'Textile NFT',
      apr: '9.1%',
      status: 'completed',
      dueDate: '2024-02-28',
      progress: 100,
      repaid: '$120,000',
      remaining: '$0',
      origin: 'Turkey',
      destination: 'Egypt',
      cargoType: 'Textiles',
      shipper: 'Turkish Textiles Ltd.',
      consignee: 'Egyptian Garments Co.',
      loanType: 'ICRC-1 Stable Token',
      blockchain: 'Internet Computer',
      nftId: 'NFT-ICP-004'
    }
  ];

  const loanStats = {
    total: mockLoans.length,
    active: mockLoans.filter(loan => loan.status === 'active').length,
    pending: mockLoans.filter(loan => loan.status === 'pending').length,
    completed: mockLoans.filter(loan => loan.status === 'completed').length,
    totalAmount: mockLoans.reduce((sum, loan) => sum + parseFloat(loan.amount.replace('$', '').replace(',', '')), 0),
    totalRepaid: mockLoans.reduce((sum, loan) => sum + parseFloat(loan.repaid.replace('$', '').replace(',', '')), 0),
    avgApr: (mockLoans.reduce((sum, loan) => sum + parseFloat(loan.apr.replace('%', '')), 0) / mockLoans.length).toFixed(1)
  };

  const loanTypes = [
    'ICRC-1 Stable Token',
    'ICP Native Token',
    'Cross-Chain Bridge Loan',
    'Document-Backed Loan',
    'Trade Finance Loan'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'pending';
      case 'completed': return 'completed';
      case 'defaulted': return 'rejected';
      default: return 'pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'completed': return Award;
      case 'defaulted': return AlertCircle;
      default: return Clock;
    }
  };

  const filteredLoans = mockLoans.filter(loan => {
    const matchesSearch = loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.documentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.cargoType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRequestLoan = (e) => {
    e.preventDefault();
    console.log('Requesting loan:', { loanAmount, collateralDocument });
  };

  return (
    <div className="dashboard-loans-container">
      {/* Loan Statistics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Loan Portfolio Overview
          </h2>
        </div>
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon loans">
                <DollarSign size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">+18.3%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">${(loanStats.totalAmount / 1000000).toFixed(1)}M</div>
            <div className="dashboard-stat-label">Total Loan Portfolio</div>
            <div className="dashboard-stat-description">ICRC-1 stable tokens issued</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon documents">
                <Shield size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">+12.7%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">{loanStats.active}</div>
            <div className="dashboard-stat-label">Active Loans</div>
            <div className="dashboard-stat-description">Currently active financing</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon nfts">
                <Percent size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">+2.1%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">{loanStats.avgApr}%</div>
            <div className="dashboard-stat-label">Average APR</div>
            <div className="dashboard-stat-description">Weighted average interest rate</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon fusion">
                <Target size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">+25.4%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">${(loanStats.totalRepaid / 1000000).toFixed(1)}M</div>
            <div className="dashboard-stat-label">Total Repaid</div>
            <div className="dashboard-stat-description">Successfully repaid loans</div>
          </div>
        </div>
      </div>

      {/* Loan Request Form */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Plus className="dashboard-section-icon" />
            Request New Loan
          </h2>
        </div>
        <form onSubmit={handleRequestLoan} className="dashboard-form-grid">
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Loan Amount (USD)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="dashboard-form-input"
              placeholder="100000"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Collateral Document ID</label>
            <input
              type="text"
              value={collateralDocument}
              onChange={(e) => setCollateralDocument(e.target.value)}
              className="dashboard-form-input monospace"
              placeholder="CX-2024-XXX"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Loan Type</label>
            <select className="dashboard-form-input" required>
              <option value="">Select loan type</option>
              {loanTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Cargo Type</label>
            <input
              type="text"
              className="dashboard-form-input"
              placeholder="Electronics, Textiles, etc."
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Origin Country</label>
            <input
              type="text"
              className="dashboard-form-input"
              placeholder="China"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Destination</label>
            <input
              type="text"
              className="dashboard-form-input"
              placeholder="Egypt"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Shipper</label>
            <input
              type="text"
              className="dashboard-form-input"
              placeholder="Company name"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Consignee</label>
            <input
              type="text"
              className="dashboard-form-input"
              placeholder="Company name"
              required
            />
          </div>
        </form>
        <button type="submit" className="dashboard-submit-button">
          <Plus size={16} />
          Request ICRC-1 Loan
        </button>
      </div>

      {/* Loan Management */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <DollarSign className="dashboard-section-icon" />
            Loan Portfolio Management
          </h2>
          <div className="dashboard-section-actions">
            <span className="dashboard-section-count">{filteredLoans.length} loans</span>
            <button className="dashboard-section-action">
              <ArrowUpRight size={16} />
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
              placeholder="Search by loan ID, document ID, or cargo type..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="defaulted">Defaulted</option>
            </select>
          </div>
        </div>

        {/* Loans Table */}
        <div className="dashboard-table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Loan Information</th>
                <th>Document</th>
                <th>Amount</th>
                <th>APR</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => {
                const StatusIcon = getStatusIcon(loan.status);
                return (
                  <tr key={loan.id} className="dashboard-table-row">
                    <td>
                      <div className="dashboard-document-info">
                        <div className="dashboard-document-icon">
                          <DollarSign size={16} color="white" />
                        </div>
                        <div>
                          <div className="dashboard-document-id">{loan.id}</div>
                          <div className="dashboard-document-description">{loan.cargoType} - {loan.origin} to {loan.destination}</div>
                        </div>
                      </div>
                    </td>
                    <td className="dashboard-table-cell monospace">{loan.documentId}</td>
                    <td className="dashboard-table-cell value">{loan.amount}</td>
                    <td className="dashboard-table-cell">{loan.apr}</td>
                    <td>
                      <div className="dashboard-loan-progress-mini">
                        <div className="dashboard-loan-progress-bar">
                          <div 
                            className="dashboard-loan-progress-fill" 
                            style={{ width: `${loan.progress}%` }}
                          ></div>
                        </div>
                        <span className="dashboard-loan-progress-text">{loan.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="dashboard-status-container">
                        <StatusIcon size={16} />
                        <span className={`dashboard-status ${getStatusColor(loan.status)}`}>
                          {loan.status}
                        </span>
                      </div>
                    </td>
                    <td className="dashboard-table-cell">{loan.dueDate}</td>
                    <td className="dashboard-table-actions">
                      <button className="dashboard-action-link">
                        <Eye size={14} />
                        View
                      </button>
                      {loan.status === 'active' && (
                        <button className="dashboard-action-link approve">
                          <CreditCard size={14} />
                          Repay
                        </button>
                      )}
                      {loan.status === 'pending' && (
                        <button className="dashboard-action-link approve">
                          <CheckCircle size={14} />
                          Approve
                        </button>
                      )}
                      <button className="dashboard-action-link">
                        <Edit size={14} />
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loan Performance Metrics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Target className="dashboard-section-icon" />
            Performance Metrics
          </h2>
        </div>
        <div className="dashboard-metrics-grid">
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Repayment Rate</h4>
              <span className="dashboard-metric-value">94.2%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '94.2%' }}></div>
            </div>
            <p className="dashboard-metric-description">Successful loan repayment rate</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Average Processing Time</h4>
              <span className="dashboard-metric-value">2.3s</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '95%' }}></div>
            </div>
            <p className="dashboard-metric-description">Time from request to funding</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Portfolio Growth</h4>
              <span className="dashboard-metric-value">+18.3%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '85%' }}></div>
            </div>
            <p className="dashboard-metric-description">Monthly portfolio growth rate</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Default Rate</h4>
              <span className="dashboard-metric-value">0.8%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '92%' }}></div>
            </div>
            <p className="dashboard-metric-description">Loan default rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoans; 