import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  BarChart3
} from 'lucide-react';

const AdminLoans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLoans, setSelectedLoans] = useState([]);

  // Mock data - in real app, this would come from API
  const loans = [
    {
      id: 'LR-2024-001',
      status: 'approved',
      company: 'ABC Trading Co.',
      documentId: 'BL-2024-001',
      amount: '$45,000',
      currency: 'USD',
      interestRate: '8.5%',
      term: '90 days',
      collateral: 'Bill of Lading NFT',
      requestedAt: '2024-01-15T10:30:00Z',
      approvedAt: '2024-01-15T10:35:00Z',
      disbursedAt: '2024-01-15T10:40:00Z',
      dueDate: '2024-04-15T10:30:00Z',
      riskScore: 'Low',
      repaymentStatus: 'On Track'
    },
    {
      id: 'LR-2024-002',
      status: 'pending',
      company: 'XYZ Import Ltd.',
      documentId: 'BL-2024-002',
      amount: '$32,500',
      currency: 'USD',
      interestRate: '9.2%',
      term: '60 days',
      collateral: 'Bill of Lading NFT',
      requestedAt: '2024-01-15T11:15:00Z',
      approvedAt: null,
      disbursedAt: null,
      dueDate: null,
      riskScore: 'Medium',
      repaymentStatus: 'N/A'
    },
    {
      id: 'LR-2024-003',
      status: 'rejected',
      company: 'DEF Export Co.',
      documentId: 'BL-2024-003',
      amount: '$28,750',
      currency: 'USD',
      interestRate: '10.1%',
      term: '120 days',
      collateral: 'Bill of Lading NFT',
      requestedAt: '2024-01-15T09:45:00Z',
      approvedAt: null,
      disbursedAt: null,
      dueDate: null,
      riskScore: 'High',
      repaymentStatus: 'N/A',
      rejectionReason: 'Document verification failed'
    },
    {
      id: 'LR-2024-004',
      status: 'active',
      company: 'GHI Trading Ltd.',
      documentId: 'BL-2024-004',
      amount: '$15,200',
      currency: 'USD',
      interestRate: '7.8%',
      term: '45 days',
      collateral: 'Certificate of Origin NFT',
      requestedAt: '2024-01-10T08:20:00Z',
      approvedAt: '2024-01-10T08:25:00Z',
      disbursedAt: '2024-01-10T08:30:00Z',
      dueDate: '2024-02-24T08:20:00Z',
      riskScore: 'Low',
      repaymentStatus: 'On Track'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'active':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getRiskScoreBadge = (riskScore) => {
    const riskClasses = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${riskClasses[riskScore] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleApproveLoan = (loanId) => {
    console.log('Approving loan:', loanId);
  };

  const handleRejectLoan = (loanId) => {
    console.log('Rejecting loan:', loanId);
  };

  const handleViewLoan = (loan) => {
    console.log('Viewing loan:', loan);
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loan.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLoans = loans.length;
  const totalAmount = loans.reduce((sum, loan) => sum + parseFloat(loan.amount.replace('$', '').replace(',', '')), 0);
  const pendingLoans = loans.filter(loan => loan.status === 'pending').length;
  const activeLoans = loans.filter(loan => loan.status === 'active').length;

  return (
    <div className="admin-loans">
      {/* Header */}
      <div className="admin-loans-header">
        <div className="admin-loans-title">
          <h2>Loan Management</h2>
          <p>Monitor and manage loan requests, approvals, and repayment tracking</p>
        </div>
        <div className="admin-loans-actions">
          <button className="admin-loans-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="admin-loans-action-btn">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-loans-filters">
        <div className="admin-loans-search">
          <Search className="admin-loans-search-icon" />
          <input
            type="text"
            placeholder="Search loans by ID, company, or document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-loans-search-input"
          />
        </div>
        <div className="admin-loans-filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-loans-status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="admin-loans-filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-loans-stats">
        <div className="admin-loans-stat-card">
          <div className="admin-loans-stat-icon">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="admin-loans-stat-content">
            <div className="admin-loans-stat-value">${totalAmount.toLocaleString()}</div>
            <div className="admin-loans-stat-label">Total Loan Volume</div>
          </div>
        </div>
        <div className="admin-loans-stat-card">
          <div className="admin-loans-stat-icon">
            <FileText className="w-6 h-6" />
          </div>
          <div className="admin-loans-stat-content">
            <div className="admin-loans-stat-value">{totalLoans}</div>
            <div className="admin-loans-stat-label">Total Loans</div>
          </div>
        </div>
        <div className="admin-loans-stat-card">
          <div className="admin-loans-stat-icon pending">
            <Clock className="w-6 h-6" />
          </div>
          <div className="admin-loans-stat-content">
            <div className="admin-loans-stat-value">{pendingLoans}</div>
            <div className="admin-loans-stat-label">Pending Approval</div>
          </div>
        </div>
        <div className="admin-loans-stat-card">
          <div className="admin-loans-stat-icon active">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="admin-loans-stat-content">
            <div className="admin-loans-stat-value">{activeLoans}</div>
            <div className="admin-loans-stat-label">Active Loans</div>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="admin-loans-table-container">
        <table className="admin-loans-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLoans(filteredLoans.map(l => l.id));
                    } else {
                      setSelectedLoans([]);
                    }
                  }}
                />
              </th>
              <th>Loan ID</th>
              <th>Company</th>
              <th>Document</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Risk Score</th>
              <th>Term</th>
              <th>Interest Rate</th>
              <th>Repayment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.id} className="admin-loans-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedLoans.includes(loan.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLoans([...selectedLoans, loan.id]);
                      } else {
                        setSelectedLoans(selectedLoans.filter(id => id !== loan.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <div className="admin-loans-id">
                    <span className="admin-loans-id-text">{loan.id}</span>
                    <button className="admin-loans-copy-btn">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td>
                  <span className="admin-loans-company">{loan.company}</span>
                </td>
                <td>
                  <div className="admin-loans-document">
                    <span>{loan.documentId}</span>
                    <p className="admin-loans-collateral">{loan.collateral}</p>
                  </div>
                </td>
                <td>
                  <div className="admin-loans-amount">
                    <span className="admin-loans-amount-value">{loan.amount}</span>
                    <span className="admin-loans-currency">{loan.currency}</span>
                  </div>
                </td>
                <td>
                  <div className="admin-loans-status">
                    {getStatusIcon(loan.status)}
                    <span className={getStatusBadge(loan.status)}>
                      {loan.status}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={getRiskScoreBadge(loan.riskScore)}>
                    {loan.riskScore}
                  </span>
                </td>
                <td>
                  <span className="admin-loans-term">{loan.term}</span>
                </td>
                <td>
                  <span className="admin-loans-interest">{loan.interestRate}</span>
                </td>
                <td>
                  <div className="admin-loans-repayment">
                    <span className={`admin-loans-repayment-status ${loan.repaymentStatus === 'On Track' ? 'success' : 'warning'}`}>
                      {loan.repaymentStatus}
                    </span>
                    {loan.dueDate && (
                      <span className="admin-loans-due-date">
                        Due: {new Date(loan.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="admin-loans-actions-cell">
                    <button
                      className="admin-loans-action-btn small"
                      onClick={() => handleViewLoan(loan)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {loan.status === 'pending' && (
                      <>
                        <button
                          className="admin-loans-action-btn small success"
                          onClick={() => handleApproveLoan(loan.id)}
                          title="Approve Loan"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          className="admin-loans-action-btn small danger"
                          onClick={() => handleRejectLoan(loan.id)}
                          title="Reject Loan"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      className="admin-loans-action-btn small"
                      title="View on Blockchain"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      {selectedLoans.length > 0 && (
        <div className="admin-loans-bulk-actions">
          <span className="admin-loans-bulk-text">
            {selectedLoans.length} loan(s) selected
          </span>
          <div className="admin-loans-bulk-buttons">
            <button className="admin-loans-bulk-btn success">
              <CheckCircle className="w-4 h-4" />
              Approve Selected
            </button>
            <button className="admin-loans-bulk-btn danger">
              <XCircle className="w-4 h-4" />
              Reject Selected
            </button>
            <button className="admin-loans-bulk-btn">
              <Download className="w-4 h-4" />
              Export Selected
            </button>
          </div>
        </div>
      )}

      {/* Loan Analytics */}
      <div className="admin-loans-analytics">
        <div className="admin-loans-analytics-card">
          <div className="admin-loans-analytics-header">
            <h3>Loan Performance</h3>
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="admin-loans-analytics-content">
            <div className="admin-loans-analytics-chart">
              <div className="admin-loans-chart-placeholder">
                <BarChart3 className="w-16 h-16 text-gray-400" />
                <p>Loan performance chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-loans-analytics-card">
          <div className="admin-loans-analytics-header">
            <h3>Risk Distribution</h3>
            <TrendingDown className="w-5 h-5" />
          </div>
          <div className="admin-loans-analytics-content">
            <div className="admin-loans-risk-distribution">
              <div className="admin-loans-risk-item">
                <span className="admin-loans-risk-label">Low Risk</span>
                <div className="admin-loans-risk-bar">
                  <div className="admin-loans-risk-bar-fill low" style={{ width: '60%' }}></div>
                </div>
                <span className="admin-loans-risk-percentage">60%</span>
              </div>
              <div className="admin-loans-risk-item">
                <span className="admin-loans-risk-label">Medium Risk</span>
                <div className="admin-loans-risk-bar">
                  <div className="admin-loans-risk-bar-fill medium" style={{ width: '30%' }}></div>
                </div>
                <span className="admin-loans-risk-percentage">30%</span>
              </div>
              <div className="admin-loans-risk-item">
                <span className="admin-loans-risk-label">High Risk</span>
                <div className="admin-loans-risk-bar">
                  <div className="admin-loans-risk-bar-fill high" style={{ width: '10%' }}></div>
                </div>
                <span className="admin-loans-risk-percentage">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoans;
