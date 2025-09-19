import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertCircle,
  Wallet
} from 'lucide-react';
import { cargo_trace_backend as backend } from '../../../../../declarations/cargo_trace_backend';

const AdminLoans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);
  const [funding, setFunding] = useState(false);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      setLoading(true);
      setError(null);
      const backendLoans = await backend.get_all_loans();
      console.log('📊 Raw loans from backend:', backendLoans);
      const transformedLoans = backendLoans
        .filter(loan => loan !== null && loan !== undefined)
        .map(loan => ({
          id: loan.id || 'Unknown',
          status: getLoanStatus(loan.status),
          company: 'Trade Company',
          amount: loan.amount ? `$${Number(loan.amount).toLocaleString()}` : '$0',
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

  const handleFundCanister = async () => {
    try {
      setFunding(true);
      setError(null);
      const result = await backend.request_test_tokens(1000n);
      if ('Err' in result) {
        throw new Error(result.Err);
      }
      console.log('✅ Canister funded with 1000 USD worth of test tokens');
      alert('Canister successfully funded with 1000 USD worth of test tokens');
      const balance = await backend.check_canister_balance();
      console.log('📈 Canister balance after funding:', balance);
    } catch (err) {
      console.error('❌ Failed to fund canister:', err);
      setError(err.message || 'Failed to fund canister');
    } finally {
      setFunding(false);
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
    if ('TransferPending' in status) return 'transfer_pending';
    if ('TransferFailed' in status) return 'transfer_failed';
    return 'unknown';
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
      case 'active':
        return <CheckCircle className="w-4 h-4 admin-icon-active" />;
      case 'pending':
      case 'transfer_pending':
        return <Clock className="w-4 h-4 admin-icon-pending" />;
      case 'rejected':
      case 'defaulted':
      case 'transfer_failed':
        return <XCircle className="w-4 h-4 admin-icon-suspended" />;
      default:
        return <Clock className="w-4 h-4 admin-icon-default" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: 'admin-status-active',
      pending: 'admin-status-pending',
      rejected: 'admin-status-suspended',
      repaid: 'admin-status-active',
      active: 'admin-status-active',
      defaulted: 'admin-status-suspended',
      transfer_pending: 'admin-status-pending',
      transfer_failed: 'admin-status-suspended',
      unknown: 'admin-status-default'
    };
    return `admin-status-badge ${statusClasses[status] || 'admin-status-default'}`;
  };

  const handleApproveLoan = async (loanId) => {
    try {
      setProcessingAction(loanId);
      setError(null);
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
      setError(null);
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
      const loan = (await backend.get_all_loans()).find(l => l.id === loanId);
      if (!loan) {
        throw new Error('Loan not found');
      }
      const loanDetails = {
        id: loan.id || 'Unknown',
        documentId: loan.document_id || 'N/A',
        amount: loan.amount ? Number(loan.amount).toLocaleString() : '0',
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
          <Loader2 className="w-8 h-8 animate-spin admin-icon-active" />
          <span className="ml-2 admin-text-secondary">Loading loans...</span>
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
            <AlertCircle className="w-12 h-12 admin-icon-suspended mx-auto mb-4" />
            <h3 className="text-lg font-semibold admin-text-primary mb-2">Error Loading Loans</h3>
            <p className="admin-text-secondary mb-4">{error}</p>
            <button 
              onClick={loadLoans}
              className="admin-btn-primary"
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
          <span className="text-sm admin-text-secondary">
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
            <option value="transfer_pending">Transfer Pending</option>
            <option value="transfer_failed">Transfer Failed</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>

      <div className="admin-loans-table-container" style={{ overflowX: 'auto' }}>
        {filteredLoans.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 admin-icon-default mx-auto mb-4" />
            <h3 className="text-lg font-semibold admin-text-primary mb-2">No loans found</h3>
            <p className="admin-text-secondary">
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
                      {loan.status.replace('_', ' ')}
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
      {/* Moved Fund Canister Button beneath the table */}
      <div className="admin-loans-footer mt-4">
        <button
          onClick={handleFundCanister}
          disabled={funding}
          className="admin-btn-primary"
          title="Fund Canister with Test Tokens"
        >
          {funding ? (
            <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
          ) : (
            <Wallet className="w-4 h-4 inline mr-2" />
          )}
          Fund Canister
        </button>
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
        .admin-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 6px;
          background-color: #2563eb;
          color: white;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .admin-btn-primary:hover {
          background-color: #1d4ed8;
        }
        .admin-btn-primary:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }
        .admin-loans-footer {
          display: flex;
          justify-content: center;
          padding: 16px 0;
        }
      `}</style>
    </div>
  );
};

export default AdminLoans;
