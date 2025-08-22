import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  FileText,
  Percent,
  Target
} from 'lucide-react';

const AdminRepayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRepayment, setSelectedRepayment] = useState(null);

  // Mock data - in real app, this would come from API
  const repayments = [
    {
      id: 'REPAY-2024-001',
      loanId: 'LOAN-2024-001',
      documentId: 'CX-2024-001',
      company: 'TechTrade Egypt',
      originalAmount: '$100,000',
      remainingBalance: '$35,000',
      nextPayment: '$15,000',
      nextDueDate: '2024-02-15',
      daysUntilDue: 5,
      apr: '8.5%',
      status: 'active',
      totalPaid: '$65,000',
      progress: 65,
      cargoType: 'Electronics',
      origin: 'China',
      destination: 'Egypt',
      shipper: 'Samsung Electronics Co.',
      consignee: 'TechTrade Egypt',
      paymentHistory: [
        { date: '2024-01-15', amount: '$25,000', status: 'completed' },
        { date: '2024-01-30', amount: '$25,000', status: 'completed' },
        { date: '2024-02-01', amount: '$15,000', status: 'completed' }
      ]
    },
    {
      id: 'REPAY-2024-002',
      loanId: 'LOAN-2024-002',
      documentId: 'CX-2024-003',
      company: 'Cairo Coffee Roasters',
      originalAmount: '$50,000',
      remainingBalance: '$27,500',
      nextPayment: '$12,500',
      nextDueDate: '2024-02-20',
      daysUntilDue: 10,
      apr: '7.2%',
      status: 'active',
      totalPaid: '$22,500',
      progress: 45,
      cargoType: 'Agricultural',
      origin: 'Kenya',
      destination: 'Egypt',
      shipper: 'Kenya Coffee Exporters',
      consignee: 'Cairo Coffee Roasters',
      paymentHistory: [
        { date: '2024-01-20', amount: '$22,500', status: 'completed' }
      ]
    },
    {
      id: 'REPAY-2024-003',
      loanId: 'LOAN-2024-004',
      documentId: 'CX-2024-002',
      company: 'Egyptian Garments Co.',
      originalAmount: '$120,000',
      remainingBalance: '$0',
      nextPayment: '$0',
      nextDueDate: '2024-02-28',
      daysUntilDue: -5,
      apr: '9.1%',
      status: 'completed',
      totalPaid: '$120,000',
      progress: 100,
      cargoType: 'Textiles',
      origin: 'Turkey',
      destination: 'Egypt',
      shipper: 'Turkish Textiles Ltd.',
      consignee: 'Egyptian Garments Co.',
      paymentHistory: [
        { date: '2024-01-10', amount: '$60,000', status: 'completed' },
        { date: '2024-01-25', amount: '$40,000', status: 'completed' },
        { date: '2024-02-05', amount: '$20,000', status: 'completed' }
      ]
    },
    {
      id: 'REPAY-2024-004',
      loanId: 'LOAN-2024-005',
      documentId: 'CX-2024-005',
      company: 'Red Sea Trading',
      originalAmount: '$75,000',
      remainingBalance: '$45,000',
      nextPayment: '$15,000',
      nextDueDate: '2024-02-10',
      daysUntilDue: -2,
      apr: '8.8%',
      status: 'overdue',
      totalPaid: '$30,000',
      progress: 40,
      cargoType: 'Pharmaceuticals',
      origin: 'Switzerland',
      destination: 'Egypt',
      shipper: 'Swiss Pharma AG',
      consignee: 'Egyptian Healthcare Ltd.',
      paymentHistory: [
        { date: '2024-01-15', amount: '$30,000', status: 'completed' }
      ]
    }
  ];

  const stats = {
    totalRepayments: 89,
    activeRepayments: 67,
    overdueRepayments: 3,
    completedRepayments: 19,
    totalOutstanding: '$2.4M',
    averageAPR: '8.2%',
    onTimePayments: 94.5
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-blue-100 text-blue-800',
      overdue: 'bg-red-100 text-red-800',
      completed: 'bg-green-100 text-green-800',
      defaulted: 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || statusClasses.defaulted}`;
  };

  const getDaysUntilDueColor = (days) => {
    if (days < 0) return 'text-red-600';
    if (days <= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredRepayments = repayments.filter(repayment => {
    const matchesSearch = repayment.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repayment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || repayment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-repayments">
      {/* Header */}
      <div className="admin-repayments-header">
        <div className="admin-repayments-title">
          <h1>Repayment Management</h1>
          <p>Monitor and manage all loan repayments and payment schedules</p>
        </div>
        <div className="admin-repayments-actions">
          <button className="admin-repayments-action-btn">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-repayments-stats">
        <div className="admin-repayments-stat-card">
          <div className="admin-repayments-stat-icon">
            <CreditCard className="w-6 h-6" />
          </div>
          <div className="admin-repayments-stat-content">
            <span className="admin-repayments-stat-value">{stats.totalRepayments}</span>
            <span className="admin-repayments-stat-label">Total Repayments</span>
          </div>
          <div className="admin-repayments-stat-trend">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">+5</span>
          </div>
        </div>

        <div className="admin-repayments-stat-card">
          <div className="admin-repayments-stat-icon">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="admin-repayments-stat-content">
            <span className="admin-repayments-stat-value">{stats.totalOutstanding}</span>
            <span className="admin-repayments-stat-label">Outstanding Balance</span>
          </div>
          <div className="admin-repayments-stat-trend">
            <TrendingDown className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">-2.3%</span>
          </div>
        </div>

        <div className="admin-repayments-stat-card">
          <div className="admin-repayments-stat-icon">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="admin-repayments-stat-content">
            <span className="admin-repayments-stat-value">{stats.overdueRepayments}</span>
            <span className="admin-repayments-stat-label">Overdue Payments</span>
          </div>
          <div className="admin-repayments-stat-trend">
            <span className="text-red-500 text-sm">Requires Action</span>
          </div>
        </div>

        <div className="admin-repayments-stat-card">
          <div className="admin-repayments-stat-icon">
            <Percent className="w-6 h-6" />
          </div>
          <div className="admin-repayments-stat-content">
            <span className="admin-repayments-stat-value">{stats.onTimePayments}%</span>
            <span className="admin-repayments-stat-label">On-Time Payments</span>
          </div>
          <div className="admin-repayments-stat-trend">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm">+1.2%</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-repayments-filters">
        <div className="admin-repayments-search">
          <Search className="admin-repayments-search-icon" />
          <input
            type="text"
            placeholder="Search by company or repayment ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-repayments-search-input"
          />
        </div>
        <div className="admin-repayments-filter-controls">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-repayments-status-filter"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="overdue">Overdue</option>
            <option value="completed">Completed</option>
          </select>
          <button className="admin-repayments-filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Repayments Table */}
      <div className="admin-repayments-table-container">
        <table className="admin-repayments-table">
          <thead>
            <tr>
              <th>Repayment ID</th>
              <th>Company</th>
              <th>Original Amount</th>
              <th>Remaining Balance</th>
              <th>Next Payment</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRepayments.map((repayment) => (
              <tr key={repayment.id} className="admin-repayments-table-row">
                <td>
                  <div className="admin-repayments-id">
                    <span className="admin-repayments-id-text">{repayment.id}</span>
                    <span className="admin-repayments-loan-id">{repayment.loanId}</span>
                  </div>
                </td>
                <td>
                  <div className="admin-repayments-company">
                    <span className="admin-repayments-company-name">{repayment.company}</span>
                    <span className="admin-repayments-cargo-type">{repayment.cargoType}</span>
                  </div>
                </td>
                <td>
                  <span className="admin-repayments-amount">{repayment.originalAmount}</span>
                </td>
                <td>
                  <span className="admin-repayments-balance">{repayment.remainingBalance}</span>
                </td>
                <td>
                  <span className="admin-repayments-next-payment">{repayment.nextPayment}</span>
                </td>
                <td>
                  <div className="admin-repayments-due-date">
                    <span className="admin-repayments-date">{repayment.nextDueDate}</span>
                    <span className={`admin-repayments-days ${getDaysUntilDueColor(repayment.daysUntilDue)}`}>
                      {repayment.daysUntilDue > 0 ? `${repayment.daysUntilDue} days` : 
                       repayment.daysUntilDue < 0 ? `${Math.abs(repayment.daysUntilDue)} days overdue` : 'Due today'}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={getStatusBadge(repayment.status)}>{repayment.status}</span>
                </td>
                <td>
                  <div className="admin-repayments-progress">
                    <div className="admin-repayments-progress-bar">
                      <div 
                        className={`admin-repayments-progress-fill ${getProgressColor(repayment.progress)}`}
                        style={{ width: `${repayment.progress}%` }}
                      ></div>
                    </div>
                    <span className="admin-repayments-progress-text">{repayment.progress}%</span>
                  </div>
                </td>
                <td>
                  <div className="admin-repayments-actions">
                    <button
                      className="admin-repayments-action-btn small"
                      onClick={() => setSelectedRepayment(repayment)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {repayment.status === 'overdue' && (
                      <button
                        className="admin-repayments-action-btn small urgent"
                        title="Send Reminder"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment History Modal */}
      {selectedRepayment && (
        <div className="admin-repayments-modal">
          <div className="admin-repayments-modal-content">
            <div className="admin-repayments-modal-header">
              <h2>Payment History - {selectedRepayment.id}</h2>
              <button 
                className="admin-repayments-modal-close"
                onClick={() => setSelectedRepayment(null)}
              >
                ×
              </button>
            </div>
            <div className="admin-repayments-modal-body">
              <div className="admin-repayments-modal-info">
                <div className="admin-repayments-modal-section">
                  <h3>Repayment Details</h3>
                  <div className="admin-repayments-modal-grid">
                    <div className="admin-repayments-modal-item">
                      <span className="admin-repayments-modal-label">Company:</span>
                      <span className="admin-repayments-modal-value">{selectedRepayment.company}</span>
                    </div>
                    <div className="admin-repayments-modal-item">
                      <span className="admin-repayments-modal-label">Original Amount:</span>
                      <span className="admin-repayments-modal-value">{selectedRepayment.originalAmount}</span>
                    </div>
                    <div className="admin-repayments-modal-item">
                      <span className="admin-repayments-modal-label">Remaining Balance:</span>
                      <span className="admin-repayments-modal-value">{selectedRepayment.remainingBalance}</span>
                    </div>
                    <div className="admin-repayments-modal-item">
                      <span className="admin-repayments-modal-label">APR:</span>
                      <span className="admin-repayments-modal-value">{selectedRepayment.apr}</span>
                    </div>
                  </div>
                </div>
                
                <div className="admin-repayments-modal-section">
                  <h3>Payment History</h3>
                  <div className="admin-repayments-modal-payments">
                    {selectedRepayment.paymentHistory.map((payment, index) => (
                      <div key={index} className="admin-repayments-modal-payment">
                        <div className="admin-repayments-modal-payment-info">
                          <span className="admin-repayments-modal-payment-date">{payment.date}</span>
                          <span className="admin-repayments-modal-payment-amount">{payment.amount}</span>
                        </div>
                        <span className={`admin-repayments-modal-payment-status ${payment.status}`}>
                          {payment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRepayments;
