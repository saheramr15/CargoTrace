import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { backendService } from '../../../services/backendService';

const AdminLoans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);

  // Load loans on component mount
  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!backendService.isReady()) {
        throw new Error('Backend service not initialized');
      }

      const backendLoans = await backendService.getMyLoans();
      
      // Transform backend loans to frontend format
      const transformedLoans = backendLoans.map(loan => ({
        id: loan.id,
        status: getLoanStatus(loan.status),
        company: 'Trade Company', // Default company
        amount: `$${loan.amount.toLocaleString()}`,
        interestRate: `${loan.interest_rate}%`,
        term: calculateTerm(loan.created_at, loan.repayment_date),
        requestedAt: new Date(loan.created_at).toISOString(),
        dueDate: new Date(loan.repayment_date).toISOString(),
        documentId: loan.document_id,
        borrower: loan.borrower,
        rawAmount: loan.amount
      }));

      setLoans(transformedLoans);
    } catch (err) {
      console.error('Failed to load loans:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLoanStatus = (status) => {
    if (status.Pending !== undefined) return 'pending';
    if (status.Approved !== undefined) return 'approved';
    if (status.Active !== undefined) return 'active';
    if (status.Repaid !== undefined) return 'repaid';
    if (status.Defaulted !== undefined) return 'defaulted';
    return 'pending';
  };

  const calculateTerm = (createdAt, repaymentDate) => {
    const created = new Date(createdAt);
    const repayment = new Date(repaymentDate);
    const diffTime = repayment - created;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
      case 'active':
      case 'repaid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
      case 'defaulted':
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
      rejected: 'bg-red-100 text-red-800',
      repaid: 'bg-green-100 text-green-800',
      defaulted: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleApproveLoan = async (loanId) => {
    try {
      setProcessingAction(loanId);
      
      if (!backendService.isReady()) {
        throw new Error('Backend service not initialized');
      }

      const result = await backendService.approveLoan(loanId);
      
      if (result.Err) {
        throw new Error(result.Err);
      }

      // Reload loans to reflect changes
      await loadLoans();
      
      console.log('✅ Loan approved successfully:', loanId);
    } catch (err) {
      console.error('Failed to approve loan:', err);
      setError(err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleRejectLoan = async (loanId) => {
    try {
      setProcessingAction(loanId);
      
      // Note: The backend doesn't have a reject function, so we'll simulate it
      // In a real implementation, you'd add a reject_loan function to the backend
      console.log('Rejecting loan:', loanId);
      
      // For now, we'll just show a success message
      setTimeout(() => {
        setProcessingAction(null);
        loadLoans();
      }, 1000);
      
    } catch (err) {
      console.error('Failed to reject loan:', err);
      setError(err.message);
      setProcessingAction(null);
    }
  };

  const handleViewLoan = (loan) => {
    console.log('Viewing loan:', loan);
    // In a real implementation, this would open a modal or navigate to a detail page
    alert(`Loan Details:\nID: ${loan.id}\nDocument ID: ${loan.documentId}\nAmount: ${loan.amount}\nInterest Rate: ${loan.interestRate}\nStatus: ${loan.status}\nDue Date: ${new Date(loan.dueDate).toLocaleDateString()}`);
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loan.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loan.documentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="admin-loans">
        <div className="admin-loans-header">
          <div className="admin-loans-title">
            <h2>Loans</h2>
            <p>Manage loan applications and approvals</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading loans...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-loans">
        <div className="admin-loans-header">
          <div className="admin-loans-title">
            <h2>Loans</h2>
            <p>Manage loan applications and approvals</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Loans</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={loadLoans}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-loans">
      {/* Header */}
      <div className="admin-loans-header">
        <div className="admin-loans-title">
          <h2>Loans</h2>
          <p>Manage loan applications and approvals</p>
        </div>
        <div className="admin-loans-stats">
          <span className="text-sm text-gray-600">
            {loans.length} total loans
          </span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-loans-filters">
        <div className="admin-loans-search">
          <Search className="admin-loans-search-icon" />
          <input
            type="text"
            placeholder="Search loans by ID, document ID, or company..."
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
            <option value="repaid">Repaid</option>
            <option value="defaulted">Defaulted</option>
          </select>
        </div>
      </div>

      {/* Loans Table */}
      <div className="admin-loans-table-container">
        {filteredLoans.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No loans found</h3>
            <p className="text-gray-600">
              {loans.length === 0 
                ? "No loans have been requested yet." 
                : "No loans match your search criteria."}
            </p>
          </div>
        ) : (
          <table className="admin-loans-table">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Document ID</th>
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
                  <td className="font-mono text-sm">{loan.documentId}</td>
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
                            disabled={processingAction === loan.id}
                            className="admin-loans-action-btn"
                            title="Approve Loan"
                          >
                            {processingAction === loan.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleRejectLoan(loan.id)}
                            disabled={processingAction === loan.id}
                            className="admin-loans-action-btn"
                            title="Reject Loan"
                          >
                            {processingAction === loan.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminLoans;
