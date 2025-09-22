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
  Wallet,
  TrendingUp,
  TrendingDown,
  Hash,
  Building,
  Calendar,
  Percent,
  RefreshCw,
  Shield,
  Activity
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
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
      case 'transfer_pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'rejected':
      case 'defaulted':
      case 'transfer_failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: 'bg-green-500/20 text-green-400 border border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      rejected: 'bg-red-500/20 text-red-400 border border-red-500/30',
      repaid: 'bg-green-500/20 text-green-400 border border-green-500/30',
      active: 'bg-green-500/20 text-green-400 border border-green-500/30',
      defaulted: 'bg-red-500/20 text-red-400 border border-red-500/30',
      transfer_pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      transfer_failed: 'bg-red-500/20 text-red-400 border border-red-500/30',
      unknown: 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
    };
    return `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-slate-500/20 text-slate-400 border border-slate-500/30'}`;
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
      <div className="px-6 py-6 lg:pl-80 lg:pr-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Loan Management</h1>
              <p className="text-slate-400">Manage loan applications and approvals</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur opacity-50"></div>
            </div>
            <p className="text-slate-300 text-lg">Loading loans...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-6 lg:pl-80 lg:pr-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Loan Management</h1>
              <p className="text-slate-400">Manage loan applications and approvals</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative mb-6">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur opacity-50"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Error Loading Loans</h3>
            <p className="text-slate-300 mb-6 max-w-md">{error}</p>
            <button 
              onClick={loadLoans}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5 shadow-lg hover:shadow-purple-500/25"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6 lg:pl-80 lg:pr-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Loan Management</h1>
              <p className="text-slate-400">Manage loan applications and approvals</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
            <Hash size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-white">{loans.length}</span>
            <span className="text-xs text-slate-400">total loans</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" size={18} />
              <input
                type="text"
                placeholder="Search loans by ID, document ID, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
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
      </div>

      {/* Loans Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
        {filteredLoans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <DollarSign className="w-16 h-16 text-slate-400" />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur opacity-50"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No loans found</h3>
            <p className="text-slate-400 text-center max-w-md">
              {loans.length === 0 
                ? "No loans have been requested yet." 
                : "No loans match your search criteria."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: '850px' }}>
              <thead className="bg-slate-700/30 border-b border-slate-600/50">
                <tr>
                  <th style={{ minWidth: '100px' }} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Loan ID</th>
                  <th style={{ minWidth: '100px' }} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Document ID</th>
                  <th style={{ minWidth: '100px' }} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Company</th>
                  <th style={{ minWidth: '80px' }} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Amount</th>
                  <th style={{ minWidth: '70px' }} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Interest<br />Rate</th>
                  <th style={{ minWidth: '60px' }} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Term</th>
                  <th style={{ minWidth: '80px' }} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                  <th style={{ minWidth: '80px' }} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Due Date</th>
                  <th style={{ minWidth: '130px' }} className="px-3 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-slate-700/30 transition-colors duration-200 group">
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="group-hover:scale-110 transition-transform duration-300">
                          {getStatusIcon(loan.status)}
                        </div>
                        <span className="text-xs font-medium text-white">{loan.id}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="text-xs font-mono text-slate-300 bg-slate-800/50 px-2 py-1 rounded-lg border border-slate-600/30">
                        {loan.documentId}
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-300">{loan.company}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs font-medium text-green-400">{loan.amount}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-300">{loan.interestRate}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-300">{loan.term}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={getStatusBadge(loan.status)}>
                        {loan.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-slate-300">
                      {loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewLoan(loan.id)}
                          className="group/btn p-2 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110"
                          title="View Loan"
                        >
                          <Eye size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                        </button>
                        {loan.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveLoan(loan.id)}
                              disabled={processingAction === loan.id}
                              className="group/btn p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Approve Loan"
                            >
                              {processingAction === loan.id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <CheckCircle size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                              )}
                            </button>
                            <button
                              onClick={() => handleRejectLoan(loan.id)}
                              disabled={processingAction === loan.id}
                              className="group/btn p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Reject Loan"
                            >
                              {processingAction === loan.id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <XCircle size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
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
          </div>
        )}
      </div>
      {/* Fund Canister Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleFundCanister}
          disabled={funding}
          className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          title="Fund Canister with Test Tokens"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-2">
            {funding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Wallet className="w-4 h-4" />
            )}
            <span>Fund Canister</span>
          </div>
        </button>
      </div>
      <style jsx>{`
        .overflow-x-auto {
          overflow-x: auto;
          width: 100%;
          -webkit-overflow-scrolling: touch;
        }
        table {
          border-collapse: collapse;
        }
        th, td {
          padding: 6px 8px;
          line-height: 1.2;
        }
        th {
          font-size: 0.75rem;
        }
        td {
          font-size: 0.75rem;
        }
        .admin-status-badge {
          padding: 2px 8px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default AdminLoans;