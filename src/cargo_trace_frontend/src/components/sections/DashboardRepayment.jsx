import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  FileText,
  Eye,
  Edit,
  Download,
  Plus,
  Wallet,
  Building2,
  Ship,
  Package,
  Globe,
  Activity,
  ArrowUpRight,
  Percent,
  Target,
  Award,
  AlertTriangle,
  CalendarDays,
  Receipt,
  Search
} from 'lucide-react';

const DashboardRepayment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedLoan, setSelectedLoan] = useState('');

  // Enhanced mock data for CargoTrace Finance
  const mockRepayments = [
    {
      id: 'REPAY-2024-001',
      loanId: 'LOAN-2024-001',
      documentId: 'CX-2024-001',
      originalAmount: '$100,000',
      remainingBalance: '$35,000',
      nextPayment: '$15,000',
      nextDueDate: '2024-02-15',
      daysUntilDue: 5,
      apr: '8.5%',
      status: 'active',
      totalPaid: '$65,000',
      progress: 65,
      paymentHistory: [
        { date: '2024-01-15', amount: '$25,000', status: 'completed' },
        { date: '2024-01-30', amount: '$25,000', status: 'completed' },
        { date: '2024-02-01', amount: '$15,000', status: 'completed' }
      ],
      cargoType: 'Electronics',
      origin: 'China',
      destination: 'Egypt',
      shipper: 'Samsung Electronics Co.',
      consignee: 'TechTrade Egypt'
    },
    {
      id: 'REPAY-2024-002',
      loanId: 'LOAN-2024-002',
      documentId: 'CX-2024-003',
      originalAmount: '$50,000',
      remainingBalance: '$27,500',
      nextPayment: '$12,500',
      nextDueDate: '2024-02-20',
      daysUntilDue: 10,
      apr: '7.2%',
      status: 'active',
      totalPaid: '$22,500',
      progress: 45,
      paymentHistory: [
        { date: '2024-01-20', amount: '$22,500', status: 'completed' }
      ],
      cargoType: 'Agricultural',
      origin: 'Kenya',
      destination: 'Egypt',
      shipper: 'Kenya Coffee Exporters',
      consignee: 'Cairo Coffee Roasters'
    },
    {
      id: 'REPAY-2024-003',
      loanId: 'LOAN-2024-004',
      documentId: 'CX-2024-002',
      originalAmount: '$120,000',
      remainingBalance: '$0',
      nextPayment: '$0',
      nextDueDate: '2024-02-28',
      daysUntilDue: -5,
      apr: '9.1%',
      status: 'completed',
      totalPaid: '$120,000',
      progress: 100,
      paymentHistory: [
        { date: '2024-01-10', amount: '$60,000', status: 'completed' },
        { date: '2024-01-25', amount: '$40,000', status: 'completed' },
        { date: '2024-02-05', amount: '$20,000', status: 'completed' }
      ],
      cargoType: 'Textiles',
      origin: 'Turkey',
      destination: 'Egypt',
      shipper: 'Turkish Textiles Ltd.',
      consignee: 'Egyptian Garments Co.'
    }
  ];

  const repaymentStats = {
    total: mockRepayments.length,
    active: mockRepayments.filter(repay => repay.status === 'active').length,
    completed: mockRepayments.filter(repay => repay.status === 'completed').length,
    overdue: mockRepayments.filter(repay => repay.daysUntilDue < 0).length,
    totalOutstanding: mockRepayments.reduce((sum, repay) => sum + parseFloat(repay.remainingBalance.replace('$', '').replace(',', '')), 0),
    totalPaid: mockRepayments.reduce((sum, repay) => sum + parseFloat(repay.totalPaid.replace('$', '').replace(',', '')), 0),
    avgProgress: (mockRepayments.reduce((sum, repay) => sum + repay.progress, 0) / mockRepayments.length).toFixed(1)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'completed';
      case 'overdue': return 'rejected';
      case 'pending': return 'pending';
      default: return 'pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'completed': return Award;
      case 'overdue': return AlertTriangle;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const getDaysUntilDueColor = (days) => {
    if (days < 0) return 'rejected';
    if (days <= 7) return 'pending';
    return 'success';
  };

  const filteredRepayments = mockRepayments.filter(repayment => {
    const matchesSearch = repayment.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repayment.documentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repayment.cargoType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || repayment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleMakePayment = (e) => {
    e.preventDefault();
    // Handle payment logic
    console.log('Making payment:', { selectedLoan, paymentAmount });
  };

  return (
    <div className="dashboard-repayment-container">
      {/* Repayment Statistics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Repayment Overview
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
                <span className="dashboard-stat-percentage">+15.7%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">${(repaymentStats.totalOutstanding / 1000000).toFixed(1)}M</div>
            <div className="dashboard-stat-label">Outstanding Balance</div>
            <div className="dashboard-stat-description">Total remaining to be repaid</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon documents">
                <CreditCard size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">+22.3%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">${(repaymentStats.totalPaid / 1000000).toFixed(1)}M</div>
            <div className="dashboard-stat-label">Total Repaid</div>
            <div className="dashboard-stat-description">Successfully repaid amount</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon nfts">
                <Percent size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">+8.9%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">{repaymentStats.avgProgress}%</div>
            <div className="dashboard-stat-label">Average Progress</div>
            <div className="dashboard-stat-description">Overall repayment progress</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon fusion">
                <CalendarDays size={24} color="white" />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp size={16} />
                <span className="dashboard-stat-percentage">-12.5%</span>
              </div>
            </div>
            <div className="dashboard-stat-value">{repaymentStats.overdue}</div>
            <div className="dashboard-stat-label">Overdue Loans</div>
            <div className="dashboard-stat-description">Past due payments</div>
          </div>
        </div>
      </div>

      {/* Repayment Pipeline */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <CreditCard className="dashboard-section-icon" />
            Repayment Pipeline
          </h2>
        </div>
        <div className="dashboard-pipeline">
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon">
              <Calendar size={24} color="white" />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>Payment Schedule</h4>
              <p>Automated payment reminders and scheduling</p>
              <div className="dashboard-pipeline-count">{repaymentStats.active} Active</div>
            </div>
          </div>
          <div className="dashboard-pipeline-arrow">→</div>
          
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon">
              <Wallet size={24} color="white" />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>ICRC-1 Payments</h4>
              <p>Stable token payments via smart contracts</p>
              <div className="dashboard-pipeline-count">24/7 Available</div>
            </div>
          </div>
          <div className="dashboard-pipeline-arrow">→</div>
          
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon">
              <Shield size={24} color="white" />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>NFT Release</h4>
              <p>Automatic NFT collateral release upon completion</p>
              <div className="dashboard-pipeline-count">{repaymentStats.completed} Completed</div>
            </div>
          </div>
          <div className="dashboard-pipeline-arrow">→</div>
          
          <div className="dashboard-pipeline-step">
            <div className="dashboard-pipeline-icon">
              <Receipt size={24} color="white" />
            </div>
            <div className="dashboard-pipeline-content">
              <h4>Transaction Records</h4>
              <p>Immutable blockchain transaction history</p>
              <div className="dashboard-pipeline-count">100% Transparent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Payment Form */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Plus className="dashboard-section-icon" />
            Make Payment
          </h2>
        </div>
        <form onSubmit={handleMakePayment} className="dashboard-form-grid">
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Select Loan</label>
            <select 
              value={selectedLoan} 
              onChange={(e) => setSelectedLoan(e.target.value)}
              className="dashboard-form-input"
              required
            >
              <option value="">Choose a loan to repay...</option>
              {mockRepayments.filter(repay => repay.status === 'active').map(repay => (
                <option key={repay.id} value={repay.id}>
                  {repay.loanId} - {repay.cargoType} (${repay.remainingBalance} remaining)
                </option>
              ))}
            </select>
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Payment Amount (USD)</label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="dashboard-form-input"
              placeholder="15000"
              required
            />
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Payment Method</label>
            <select className="dashboard-form-input" required>
              <option value="">Select payment method</option>
              <option value="icrc1">ICRC-1 Stable Token</option>
              <option value="icp">ICP Native Token</option>
              <option value="bridge">Cross-Chain Bridge</option>
            </select>
          </div>
          
          <div className="dashboard-form-field">
            <label className="dashboard-form-label">Payment Date</label>
            <input
              type="date"
              className="dashboard-form-input"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </form>
        <button type="submit" className="dashboard-submit-button">
          <CreditCard size={16} />
          Process Payment
        </button>
      </div>

      {/* Repayment Management */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <CreditCard className="dashboard-section-icon" />
            Repayment Management
          </h2>
          <div className="dashboard-section-actions">
            <span className="dashboard-section-count">{filteredRepayments.length} repayments</span>
            <button className="dashboard-section-action">
              <Download size={16} />
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
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Repayments Table */}
        <div className="dashboard-table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Repayment Information</th>
                <th>Loan Details</th>
                <th>Remaining</th>
                <th>Next Payment</th>
                <th>Due Date</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepayments.map((repayment) => {
                const StatusIcon = getStatusIcon(repayment.status);
                return (
                  <tr key={repayment.id} className="dashboard-table-row">
                    <td>
                      <div className="dashboard-document-info">
                        <div className="dashboard-document-icon">
                          <CreditCard size={16} color="white" />
                        </div>
                        <div>
                          <div className="dashboard-document-id">{repayment.loanId}</div>
                          <div className="dashboard-document-description">{repayment.cargoType} - {repayment.origin} to {repayment.destination}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="dashboard-table-cell">
                        <div>Original: {repayment.originalAmount}</div>
                        <div>APR: {repayment.apr}</div>
                      </div>
                    </td>
                    <td className="dashboard-table-cell value">{repayment.remainingBalance}</td>
                    <td className="dashboard-table-cell value">{repayment.nextPayment}</td>
                    <td>
                      <div className="dashboard-table-cell">
                        <div>{repayment.nextDueDate}</div>
                        <div className={`dashboard-status ${getDaysUntilDueColor(repayment.daysUntilDue)}`}>
                          {repayment.daysUntilDue < 0 ? `${Math.abs(repayment.daysUntilDue)} days overdue` : 
                           repayment.daysUntilDue === 0 ? 'Due today' : 
                           `${repayment.daysUntilDue} days left`}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="dashboard-loan-progress-mini">
                        <div className="dashboard-loan-progress-bar">
                          <div 
                            className="dashboard-loan-progress-fill" 
                            style={{ width: `${repayment.progress}%` }}
                          ></div>
                        </div>
                        <span className="dashboard-loan-progress-text">{repayment.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="dashboard-status-container">
                        <StatusIcon size={16} />
                        <span className={`dashboard-status ${getStatusColor(repayment.status)}`}>
                          {repayment.status}
                        </span>
                      </div>
                    </td>
                    <td className="dashboard-table-actions">
                      <button className="dashboard-action-link">
                        <Eye size={14} />
                        View
                      </button>
                      {repayment.status === 'active' && (
                        <button className="dashboard-action-link approve">
                          <CreditCard size={14} />
                          Pay
                        </button>
                      )}
                      <button className="dashboard-action-link">
                        <Download size={14} />
                        Statement
                      </button>
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

      {/* Upcoming Payments */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">
            <Calendar className="dashboard-section-icon" />
            Upcoming Payments
          </h2>
        </div>
        <div className="dashboard-upcoming-payments">
          {mockRepayments
            .filter(repay => repay.status === 'active' && repay.daysUntilDue >= 0)
            .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
            .slice(0, 5)
            .map((repayment) => (
              <div key={repayment.id} className="dashboard-upcoming-payment">
                <div className="dashboard-upcoming-payment-info">
                  <div className="dashboard-upcoming-payment-header">
                    <div className="dashboard-upcoming-payment-loan">{repayment.loanId}</div>
                    <div className={`dashboard-upcoming-payment-days ${getDaysUntilDueColor(repayment.daysUntilDue)}`}>
                      {repayment.daysUntilDue === 0 ? 'Due today' : `${repayment.daysUntilDue} days`}
                    </div>
                  </div>
                  <div className="dashboard-upcoming-payment-details">
                    <div className="dashboard-upcoming-payment-amount">{repayment.nextPayment}</div>
                    <div className="dashboard-upcoming-payment-date">{repayment.nextDueDate}</div>
                  </div>
                </div>
                <button className="dashboard-upcoming-payment-action">
                  <CreditCard size={16} />
                  Pay Now
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Repayment Performance Metrics */}
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
              <h4 className="dashboard-metric-title">On-Time Payment Rate</h4>
              <span className="dashboard-metric-value">96.8%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '96.8%' }}></div>
            </div>
            <p className="dashboard-metric-description">Payments made on or before due date</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Average Payment Time</h4>
              <span className="dashboard-metric-value">1.2s</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '98%' }}></div>
            </div>
            <p className="dashboard-metric-description">Time to process payments</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Collection Rate</h4>
              <span className="dashboard-metric-value">98.5%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '98.5%' }}></div>
            </div>
            <p className="dashboard-metric-description">Successful payment collection rate</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Customer Satisfaction</h4>
              <span className="dashboard-metric-value">4.9/5</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '98%' }}></div>
            </div>
            <p className="dashboard-metric-description">Repayment experience rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRepayment; 