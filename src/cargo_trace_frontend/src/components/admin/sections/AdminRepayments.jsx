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
  Target,
  RefreshCw,
  Shield,
  Activity,
  Hash,
  X
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
      active: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      overdue: 'bg-red-500/20 text-red-400 border border-red-500/30',
      completed: 'bg-green-500/20 text-green-400 border border-green-500/30',
      defaulted: 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
    };
    return `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || statusClasses.defaulted}`;
  };

  const getDaysUntilDueColor = (days) => {
    if (days < 0) return 'text-red-400';
    if (days <= 7) return 'text-yellow-400';
    return 'text-green-400';
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
    <div className="px-6 py-6 lg:pl-80 lg:pr-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <CreditCard size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Repayment Management</h1>
              <p className="text-slate-400">Monitor and manage all loan repayments and payment schedules</p>
            </div>
          </div>
          <button className="group relative px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-purple-500/30 text-blue-400 rounded-lg hover:from-purple-500/30 hover:to-indigo-400/30 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <Download size={16} />
              <span>Export Report</span>
            </div>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Repayments */}
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                <CreditCard size={24} className="text-blue-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+5</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{stats.totalRepayments}</p>
              <p className="text-sm text-slate-400">Total Repayments</p>
            </div>
          </div>
        </div>

        {/* Outstanding Balance */}
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/10 to-emerald-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-lg flex items-center justify-center">
                <DollarSign size={24} className="text-green-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingDown size={16} />
                <span className="text-sm font-medium">-2.3%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{stats.totalOutstanding}</p>
              <p className="text-sm text-slate-400">Outstanding Balance</p>
            </div>
          </div>
        </div>

        {/* Overdue Payments */}
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-pink-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-400/20 rounded-lg flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-400" />
              </div>
              <div className="text-red-400">
                <span className="text-sm font-medium">Action Required</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{stats.overdueRepayments}</p>
              <p className="text-sm text-slate-400">Overdue Payments</p>
            </div>
          </div>
        </div>

        {/* On-Time Payments */}
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                <Percent size={24} className="text-blue-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+1.2%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{stats.onTimePayments}%</p>
              <p className="text-sm text-slate-400">On-Time Payments</p>
            </div>
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
                placeholder="Search by company or repayment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="overdue">Overdue</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* More Filters Button */}
          <button className="group relative px-4 py-3 bg-slate-800/50 border border-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-700/50 hover:text-white transition-all duration-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <Filter size={16} />
              <span>More Filters</span>
            </div>
          </button>
        </div>
      </div>

      {/* Repayments Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-700/30 border-b border-slate-600/50">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Repayment ID</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Company</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Original Amount</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Remaining Balance</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Next Payment</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredRepayments.map((repayment) => (
                <tr key={repayment.id} className="hover:bg-slate-700/30 transition-colors duration-200 group">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-white">{repayment.id}</div>
                      <div className="text-xs text-slate-400 font-mono bg-slate-800/50 px-2 py-1 rounded border border-slate-600/30">
                        {repayment.loanId}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-white">{repayment.company}</div>
                      <div className="text-xs text-slate-400">{repayment.cargoType}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-400">
                    {repayment.originalAmount}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-yellow-400">
                    {repayment.remainingBalance}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-400">
                    {repayment.nextPayment}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-300">{repayment.nextDueDate}</div>
                      <div className={`text-xs font-medium ${getDaysUntilDueColor(repayment.daysUntilDue)}`}>
                        {repayment.daysUntilDue > 0 ? `${repayment.daysUntilDue} days` : 
                         repayment.daysUntilDue < 0 ? `${Math.abs(repayment.daysUntilDue)} days overdue` : 'Due today'}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(repayment.status)}>
                      {repayment.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(repayment.progress)}`}
                          style={{ width: `${repayment.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-300 min-w-[3rem]">{repayment.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedRepayment(repayment)}
                        className="group/btn p-2 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110"
                        title="View Details"
                      >
                        <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                      </button>
                      {repayment.status === 'overdue' && (
                        <button
                          className="group/btn p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110"
                          title="Send Reminder"
                        >
                          <AlertTriangle size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History Modal */}
      {selectedRepayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                  <CreditCard size={20} className="text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Payment History</h2>
                  <p className="text-sm text-slate-400">{selectedRepayment.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRepayment(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-8">
                {/* Repayment Details */}
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <FileText size={20} className="text-blue-400" />
                    <span>Repayment Details</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-sm text-slate-400">Company:</span>
                      <span className="block text-white font-medium">{selectedRepayment.company}</span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-slate-400">Original Amount:</span>
                      <span className="block text-green-400 font-medium">{selectedRepayment.originalAmount}</span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-slate-400">Remaining Balance:</span>
                      <span className="block text-yellow-400 font-medium">{selectedRepayment.remainingBalance}</span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-slate-400">APR:</span>
                      <span className="block text-blue-400 font-medium">{selectedRepayment.apr}</span>
                    </div>
                  </div>
                </div>
                
                {/* Payment History */}
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Activity size={20} className="text-blue-400" />
                    <span>Payment History</span>
                  </h3>
                  <div className="space-y-3">
                    {selectedRepayment.paymentHistory.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600/30 hover:bg-slate-800/70 transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle size={16} className="text-green-400" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{payment.amount}</div>
                            <div className="text-sm text-slate-400">{payment.date}</div>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
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
