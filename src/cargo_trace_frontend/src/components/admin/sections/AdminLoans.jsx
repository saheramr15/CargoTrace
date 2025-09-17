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
import { cargo_trace_backend as backend } from '../../../../../declarations/cargo_trace_backend';

const AdminLoans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);

  // Load all loans on component mount
  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all loans directly (no need for individual fetching)
      const backendLoans = await backend.get_all_loans();
      
      console.log('📊 Raw loans from backend:', backendLoans);

      // Transform backend loans to frontend format
      const transformedLoans = backendLoans
        .filter(loan => loan !== null && loan !== undefined)
        .map(loan => ({
          id: loan.id || 'Unknown',
          status: getLoanStatus(loan.status),
          company: 'Trade Company',
          amount: loan.amount ? `$${loan.amount.toString().toLocaleString()}` : '$0',
          interestRate: loan.interest_rate ? `${loan.interest_rate}%` : 'N/A',
          term: calculateTerm(loan.created_at, loan.repayment_date),
          requestedAt: loan.created_at ? new Date(Number(loan.created_at) / 1000000).toISOString() : 'N/A',
          dueDate: loan.repayment_date ? new Date(Number(loan.repayment_date) / 1000000).toISOString() : 'N/A',
          documentId: loan.document_id || 'N/A',
          borrower: loan.borrower ? loan.borrower.toString() : 'Unknown',
          rawAmount: loan.amount || 0n
        }));

      console.log('✅ Transformed loans:', transformedLoans);
      setLoans(transformedLoans);

    } catch (err) {
      console.error('❌ Failed to load loans:', err);
      setError(err.message.includes('Panicked at') 
        ? 'Backend storage error. Please redeploy the canister or contact support.' 
        : err.message || 'Failed to load loans');
    } finally {
      setLoading(false);
    }
  };

  const getLoanStatus = (status) => {
    if (!status) return 'unknown';
    
    if ('Pending' in status) return 'pending';
    if ('Approved' in status) return 'approved';
    if ('Repaid' in status) return 'repaid';
    if ('Rejected' in status) return 'rejected';
    if ('Active' in status) return 'active';
    if ('Defaulted' in status) return 'defaulted';
    return 'pending';
  };

  const calculateTerm = (createdAt, repaymentDate) => {
    if (!createdAt || !repaymentDate) return 'N/A';
    const created = new Date(Number(createdAt) / 1000000);
    const repayment = new Date(Number(repaymentDate) / 1000000);
    const diffTime = repayment - created;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
      case 'repaid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'active':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'defaulted':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      repaid: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      defaulted: 'bg-red-100 text-red-800',
      unknown: 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleApproveLoan = async (loanId) => {
    try {
      setProcessingAction(loanId);
      const result = await backend.approve_loan(loanId);
      
      if ('Err' in result) {
        throw new Error(result.Err);
      }

      await loadLoans();
      console.log('✅ Loan approved successfully:', loanId);
    } catch (err) {
      console.error('Failed to approve loan:', err);
      setError(err.message || 'Failed to approve loan');
    } finally {
      setProcessingAction(null);
    }
  };

  const handleRejectLoan = async (loanId) => {
    try {
      setProcessingAction(loanId);
      const result = await backend.reject_loan(loanId);
      
      if ('Err' in result) {
        throw new Error(result.Err);
      }

      await loadLoans();
      console.log('✅ Loan rejected successfully:', loanId);
    } catch (err) {
      console.error('Failed to reject loan:', err);
      setError(err.message || 'Failed to reject loan');
    } finally {
      setProcessingAction(null);
    }
  };

  const handleViewLoan = async (loanId) => {
    try {
      const loan = await backend.get_all_loans(loanId);
      
      if (!loan) {
        throw new Error('Loan not found');
      }

      const loanDetails = {
        id: loan.id || 'Unknown',
        documentId: loan.document_id || 'N/A',
        amount: loan.amount ? loan.amount.toString().toLocaleString() : '0',
        interestRate: loan.interest_rate ? `${loan.interest_rate}%` : 'N/A',
        status: getLoanStatus(loan.status),
        createdAt: loan.created_at ? new Date(Number(loan.created_at) / 1000000).toLocaleString() : 'N/A',
        repaymentDate: loan.repayment_date ? new Date(Number(loan.repayment_date) / 1000000).toLocaleDateString() : 'N/A',
        borrower: loan.borrower ? loan.borrower.toString() : 'Unknown'
      };

      console.log('Viewing loan:', loanDetails);
      alert(`Loan Details:\nID: ${loanDetails.id}\nDocument ID: ${loanDetails.documentId}\nAmount: $${loanDetails.amount}\nInterest Rate: ${loanDetails.interestRate}\nStatus: ${loanDetails.status}\nCreated: ${loanDetails.createdAt}\nDue Date: ${loanDetails.repaymentDate}\nBorrower: ${loanDetails.borrower}`);
    } catch (err) {
      console.error('Failed to load loan details:', err);
      setError(err.message || 'Failed to load loan details');
    }
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
            <option value="repaid">Repaid</option>
            <option value="rejected">Rejected</option>
            <option value="active">Active</option>
            <option value="defaulted">Defaulted</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>

      <div className="admin-loans-table-container" style={{ overflowX: 'auto' }}>
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
          <table className="admin-loans-table" style={{ minWidth: '900px' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '110px' }}>Loan ID</th>
                <th style={{ minWidth: '110px' }}>Document ID</th>
                <th style={{ minWidth: '110px' }}>Company</th>
                <th style={{ minWidth: '90px' }}>Amount</th>
                <th style={{ minWidth: '80px' }}>Interest<br />Rate</th>
                <th style={{ minWidth: '70px' }}>Term</th>
                <th style={{ minWidth: '90px' }}>Status</th>
                <th style={{ minWidth: '90px' }}>Due Date</th>
                <th style={{ minWidth: '140px' }}>Actions</th>
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
                  <td className="font-mono text-xs">{loan.documentId}</td>
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
                        onClick={() => handleViewLoan(loan.id)}
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
      <style jsx>{`
        .admin-loans-table-container {
          overflow-x: auto;
          width: 100%;
          -webkit-overflow-scrolling: touch;
        }
        .admin-loans-table {
          width: 100%;
          min-width: 900px;
          border-collapse: collapse;
        }
        .admin-loans-table th,
        .admin-loans-table td {
          padding: 6px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
          font-size: 0.85rem;
        }
        .admin-loans-table th {
          font-weight: 600;
          color: #374151;
          background-color: #f9fafb;
          line-height: 1.2;
        }
        .admin-loans-table-row:hover {
          background-color: #f3f4f6;
        }
        .admin-loans-action-btn {
          padding: 4px;
          border-radius: 4px;
          background: none;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .admin-loans-action-btn:hover {
          background-color: #e5e7eb;
        }
        .admin-loans-action-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default AdminLoans;