import React, { useState } from 'react';
import { DollarSign, CheckCircle, Clock, FileText, TrendingUp, BarChart3, Calendar, AlertCircle, ArrowUpRight, Wallet, CreditCard, Percent } from 'lucide-react';

const DashboardRepayment = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedLoan, setSelectedLoan] = useState('');

  const activeLoans = [
    { 
      id: 'LOAN001', 
      docId: 'DOC001', 
      amount: 40000, 
      dueDate: '2024-09-15', 
      status: 'Active', 
      repaid: 15000, 
      progress: 37.5,
      apr: 4.2,
      nextPayment: 5000,
      daysUntilDue: 12
    },
    { 
      id: 'LOAN002', 
      docId: 'DOC002', 
      amount: 60000, 
      dueDate: '2024-10-01', 
      status: 'Overdue', 
      repaid: 30000, 
      progress: 50,
      apr: 4.5,
      nextPayment: 8000,
      daysUntilDue: -5
    },
    { 
      id: 'LOAN003', 
      docId: 'DOC003', 
      amount: 35000, 
      dueDate: '2024-09-30', 
      status: 'Active', 
      repaid: 28000, 
      progress: 80,
      apr: 3.8,
      nextPayment: 2000,
      daysUntilDue: 27
    }
  ];

  const summaryCards = [
    { 
      title: 'Total Outstanding', 
      value: '$55,000', 
      subtext: 'Across 3 active loans', 
      icon: DollarSign, 
      gradient: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
      trend: '+5.2%',
      change: 'from last month'
    },
    { 
      title: 'Total Repaid', 
      value: '$73,000', 
      subtext: '73% of total loans', 
      icon: CheckCircle, 
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      trend: '+12.8%',
      change: 'from last month'
    },
    { 
      title: 'Next Payment', 
      value: 'Sep 15', 
      subtext: '$5,000 due', 
      icon: Clock, 
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      trend: '12 days',
      change: 'until due'
    },
    { 
      title: 'Average APR', 
      value: '4.2%', 
      subtext: 'Competitive rates', 
      icon: Percent, 
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      trend: '-0.3%',
      change: 'from last month'
    }
  ];

  const paymentHistory = [
    { id: 'PAY001', loanId: 'LOAN001', amount: 5000, date: '2024-08-01', status: 'Completed', txHash: '0xabc...def' },
    { id: 'PAY002', loanId: 'LOAN002', amount: 8000, date: '2024-08-02', status: 'Completed', txHash: '0xdef...ghi' },
    { id: 'PAY003', loanId: 'LOAN001', amount: 10000, date: '2024-08-03', status: 'Completed', txHash: '0xghi...jkl' },
    { id: 'PAY004', loanId: 'LOAN003', amount: 15000, date: '2024-08-04', status: 'Completed', txHash: '0xjkl...mno' }
  ];

  const handleMakePayment = (loanId) => {
    if (!paymentAmount || paymentAmount <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }
    console.log('Payment made:', { loanId, amount: paymentAmount });
    setPaymentAmount('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Overdue': return 'rejected';
      case 'Completed': return 'success';
      default: return 'pending';
    }
  };

  const getDaysUntilDueText = (days) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `${days} days until due`;
  };

  const getDaysUntilDueColor = (days) => {
    if (days < 0) return '#ef4444';
    if (days <= 7) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="dashboard-repayment-container">
      {/* Summary Cards */}
      <div className="dashboard-stats-grid">
        {summaryCards.map((card, index) => (
          <div key={index} className="dashboard-stat-card">
            <div className="dashboard-stat-header">
              <div className="dashboard-stat-icon" style={{ background: card.gradient }}>
                <card.icon style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
              </div>
              <div className="dashboard-stat-trend">
                <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                <span className="dashboard-stat-percentage">{card.trend}</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.25rem' }}>{card.title}</p>
              <div className="dashboard-stat-value">{card.value}</div>
              <div className="dashboard-stat-change positive">{card.subtext}</div>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Loans */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <FileText className="dashboard-section-icon" />
            Active Loans
          </h3>
          <div className="dashboard-section-actions">
            <span className="dashboard-section-count">{activeLoans.length} active loans</span>
            <button className="dashboard-section-action">
              Payment History
              <ArrowUpRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
            </button>
          </div>
        </div>
        <div className="dashboard-loans-grid">
          {activeLoans.map((loan, index) => (
            <div 
              key={index} 
              className="dashboard-loan-card"
              onMouseEnter={() => setIsHovered(`active-loan-${index}`)}
              onMouseLeave={() => setIsHovered(null)}>
              <div className="dashboard-loan-header">
                <div className="dashboard-loan-info">
                  <div className="dashboard-loan-id-section">
                    <p className="dashboard-loan-id">Loan: {loan.id}</p>
                    <p className="dashboard-loan-doc">Document: {loan.docId}</p>
                  </div>
                  <div className="dashboard-loan-due-info">
                    <span className="dashboard-loan-due-date">Due: {loan.dueDate}</span>
                    <span 
                      className="dashboard-loan-days-until"
                      style={{ color: getDaysUntilDueColor(loan.daysUntilDue) }}
                    >
                      {getDaysUntilDueText(loan.daysUntilDue)}
                    </span>
                  </div>
                </div>
                <div className="dashboard-loan-status">
                  <span className={`dashboard-status ${getStatusColor(loan.status)}`}>
                    {loan.status}
                  </span>
                </div>
              </div>
              
              <div className="dashboard-loan-details">
                <div className="dashboard-loan-amounts">
                  <div className="dashboard-loan-amount-item">
                    <span className="dashboard-loan-amount-label">Total Amount</span>
                    <span className="dashboard-loan-amount-value">${loan.amount.toLocaleString()}</span>
                  </div>
                  <div className="dashboard-loan-amount-item">
                    <span className="dashboard-loan-amount-label">Repaid</span>
                    <span className="dashboard-loan-amount-value repaid">${loan.repaid.toLocaleString()}</span>
                  </div>
                  <div className="dashboard-loan-amount-item">
                    <span className="dashboard-loan-amount-label">Remaining</span>
                    <span className="dashboard-loan-amount-value">${(loan.amount - loan.repaid).toLocaleString()}</span>
                  </div>
                  <div className="dashboard-loan-amount-item">
                    <span className="dashboard-loan-amount-label">Next Payment</span>
                    <span className="dashboard-loan-amount-value">${loan.nextPayment.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="dashboard-loan-progress-section">
                  <div className="dashboard-loan-progress-header">
                    <span className="dashboard-loan-progress-label">Repayment Progress</span>
                    <span className="dashboard-loan-progress-percentage">{loan.progress}%</span>
                  </div>
                  <div className="dashboard-loan-progress-bar">
                    <div 
                      className="dashboard-loan-progress-fill"
                      style={{ 
                        width: `${loan.progress}%`,
                        background: loan.status === 'Active' ? 'linear-gradient(135deg, #A78BFA, #7C3AED)' : 'linear-gradient(135deg, #ef4444, #dc2626)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-loan-payment-section">
                <div className="dashboard-loan-payment-input">
                  <input
                    type="number"
                    placeholder="Enter payment amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="dashboard-form-input"
                  />
                  <button 
                    onClick={() => handleMakePayment(loan.id)}
                    className="dashboard-loan-payment-button"
                  >
                    <CreditCard style={{ width: '1rem', height: '1rem' }} />
                    Make Payment
                  </button>
                </div>
                <div className="dashboard-loan-payment-info">
                  <span className="dashboard-loan-apr-info">APR: {loan.apr}%</span>
                  <span className="dashboard-loan-min-payment">Min payment: ${Math.max(loan.nextPayment * 0.1, 100).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <BarChart3 className="dashboard-section-icon" />
            Recent Payment History
          </h3>
          <button className="dashboard-section-action">
            View All
            <ArrowUpRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
          </button>
        </div>
        <div className="dashboard-table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Loan ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr 
                  key={index} 
                  className="dashboard-table-row"
                  onMouseEnter={() => setIsHovered(`payment-${index}`)}
                  onMouseLeave={() => setIsHovered(null)}>
                  <td className="dashboard-table-cell">{payment.id}</td>
                  <td className="dashboard-table-cell">{payment.loanId}</td>
                  <td className="dashboard-table-cell value">${payment.amount.toLocaleString()}</td>
                  <td className="dashboard-table-cell">{payment.date}</td>
                  <td>
                    <span className={`dashboard-status ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="dashboard-table-cell monospace">{payment.txHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Repayment Analytics */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <TrendingUp className="dashboard-section-icon" />
            Repayment Analytics
          </h3>
        </div>
        <div className="dashboard-metrics-grid">
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">On-Time Payments</h4>
              <span className="dashboard-metric-value">94.2%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '94.2%' }}></div>
            </div>
            <p className="dashboard-metric-description">Percentage of payments made on time</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Average Payment</h4>
              <span className="dashboard-metric-value">$9,500</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '85%' }}></div>
            </div>
            <p className="dashboard-metric-description">Average payment amount per transaction</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Payment Frequency</h4>
              <span className="dashboard-metric-value">2.3/month</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '76%' }}></div>
            </div>
            <p className="dashboard-metric-description">Average payments per month</p>
          </div>
          
          <div className="dashboard-metric-card">
            <div className="dashboard-metric-header">
              <h4 className="dashboard-metric-title">Early Repayments</h4>
              <span className="dashboard-metric-value">18.5%</span>
            </div>
            <div className="dashboard-metric-bar">
              <div className="dashboard-metric-progress" style={{ width: '18.5%' }}></div>
            </div>
            <p className="dashboard-metric-description">Loans repaid before due date</p>
          </div>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3 className="dashboard-section-title">
            <Calendar className="dashboard-section-icon" />
            Upcoming Payments
          </h3>
        </div>
        <div className="dashboard-upcoming-payments">
          {activeLoans
            .filter(loan => loan.daysUntilDue >= 0)
            .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
            .slice(0, 3)
            .map((loan, index) => (
              <div key={index} className="dashboard-upcoming-payment">
                <div className="dashboard-upcoming-payment-info">
                  <div className="dashboard-upcoming-payment-header">
                    <span className="dashboard-upcoming-payment-loan">{loan.id}</span>
                    <span 
                      className="dashboard-upcoming-payment-days"
                      style={{ color: getDaysUntilDueColor(loan.daysUntilDue) }}
                    >
                      {getDaysUntilDueText(loan.daysUntilDue)}
                    </span>
                  </div>
                  <div className="dashboard-upcoming-payment-details">
                    <span className="dashboard-upcoming-payment-amount">${loan.nextPayment.toLocaleString()}</span>
                    <span className="dashboard-upcoming-payment-date">Due: {loan.dueDate}</span>
                  </div>
                </div>
                <button className="dashboard-upcoming-payment-action">
                  Pay Now
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardRepayment; 