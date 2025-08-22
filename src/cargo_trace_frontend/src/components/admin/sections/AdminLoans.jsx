import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const AdminLoans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const loans = [
    {
      id: 'LR-2024-001',
      status: 'approved',
      company: 'ABC Trading Co.',
      amount: '$45,000',
      interestRate: '8.5%',
      term: '90 days',
      requestedAt: '2024-01-15T10:30:00Z',
      dueDate: '2024-04-15T10:30:00Z'
    },
    {
      id: 'LR-2024-002',
      status: 'pending',
      company: 'XYZ Import Ltd.',
      amount: '$32,500',
      interestRate: '9.2%',
      term: '60 days',
      requestedAt: '2024-01-15T11:15:00Z',
      dueDate: null
    },
    {
      id: 'LR-2024-003',
      status: 'rejected',
      company: 'DEF Export Co.',
      amount: '$28,750',
      interestRate: '10.1%',
      term: '120 days',
      requestedAt: '2024-01-15T09:45:00Z',
      dueDate: null
    },
    {
      id: 'LR-2024-004',
      status: 'active',
      company: 'GHI Trading Ltd.',
      amount: '$15,200',
      interestRate: '7.8%',
      term: '45 days',
      requestedAt: '2024-01-10T08:20:00Z',
      dueDate: '2024-02-24T08:20:00Z'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
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

  return (
    <div className="admin-loans">
      {/* Header */}
      <div className="admin-loans-header">
        <div className="admin-loans-title">
          <h2>Loans</h2>
          <p>Manage loan applications and approvals</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-loans-filters">
        <div className="admin-loans-search">
          <Search className="admin-loans-search-icon" />
          <input
            type="text"
            placeholder="Search loans..."
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
        </div>
      </div>

      {/* Loans Table */}
      <div className="admin-loans-table-container">
        <table className="admin-loans-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Company</th>
              <th>Amount</th>
              <th>Interest Rate</th>
              <th>Term</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.id} className="admin-loans-table-row">
                <td>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(loan.status)}
                    <span className="font-medium">{loan.id}</span>
                  </div>
                </td>
                <td>{loan.company}</td>
                <td>{loan.amount}</td>
                <td>{loan.interestRate}</td>
                <td>{loan.term}</td>
                <td>
                  <span className={getStatusBadge(loan.status)}>
                    {loan.status}
                  </span>
                </td>
                <td>
                  {loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : 'N/A'}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewLoan(loan)}
                      className="admin-loans-action-btn"
                      title="View Loan"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {loan.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveLoan(loan.id)}
                          className="admin-loans-action-btn"
                          title="Approve Loan"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRejectLoan(loan.id)}
                          className="admin-loans-action-btn"
                          title="Reject Loan"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLoans;
