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

  // Focused repayment data
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
      case 'active': return 'blue';
      case 'completed': return 'cyan';
      case 'overdue': return 'slate';
      case 'pending': return 'indigo';
      default: return 'indigo';
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
    console.log('Making payment:', { selectedLoan, paymentAmount });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 lg:pl-80 lg:pr-8">
      {/* Repayment Statistics */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
            <BarChart3 size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Repayment Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <DollarSign size={20} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+15.7%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">${(repaymentStats.totalOutstanding / 1000000).toFixed(1)}M</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Outstanding Balance</div>
            <div className="text-xs text-slate-400">Total remaining to be repaid</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <CreditCard size={20} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+22.3%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">${(repaymentStats.totalPaid / 1000000).toFixed(1)}M</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Total Repaid</div>
            <div className="text-xs text-slate-400">Successfully repaid amount</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Percent size={20} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+8.9%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{repaymentStats.avgProgress}%</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Average Progress</div>
            <div className="text-xs text-slate-400">Overall repayment progress</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <CalendarDays size={20} className="text-white" />
              </div>
              <div className="flex items-center space-x-1 text-slate-400">
                <TrendingUp size={16} className="rotate-180" />
                <span className="text-sm font-medium">-12.5%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{repaymentStats.overdue}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">Overdue Loans</div>
            <div className="text-xs text-slate-400">Past due payments</div>
          </div>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Upcoming Payments</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-orange-400/30 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-white">LOAN-2024-001</span>
                  <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-medium rounded-full">Due in 5 days</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-white">$25,000</div>
                  <div className="text-sm text-slate-400">Jan 20, 2024</div>
                </div>
              </div>
              <button className="px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200">
                Pay Now
              </button>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-white">LOAN-2024-002</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">Due in 12 days</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-white">$18,500</div>
                  <div className="text-sm text-slate-400">Jan 27, 2024</div>
                </div>
              </div>
              <button className="px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-cyan-300 transition-all duration-200">
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
              
      {/* Quick Payment Form */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Plus size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Make Payment</h2>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <form onSubmit={handleMakePayment} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Select Loan</label>
              <select 
                value={selectedLoan} 
                onChange={(e) => setSelectedLoan(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
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
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Payment Amount (USD)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                placeholder="15000"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Payment Method</label>
              <select className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200" required>
                <option value="">Select payment method</option>
                <option value="icrc1">ICRC-1 Stable Token</option>
                <option value="icp">ICP Native Token</option>
                <option value="bridge">Cross-Chain Bridge</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Payment Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
                defaultValue={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </form>
          
          <div className="mt-4 flex justify-end">
            <button 
              type="submit" 
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-emerald-500 hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/25"
            >
              <CreditCard size={16} />
              <span>Process Payment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Repayment Management */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <CreditCard size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Repayment Management</h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-400">{filteredRepayments.length} repayments</span>
            <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200">
              <Download size={16} />
              <span>Export Data</span>
            </button>
          </div>
        </div>
              
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by loan ID, document ID, or cargo type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Repayments Table */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Repayment Information</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Loan Details</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Remaining</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Next Payment</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Due Date</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Progress</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredRepayments.map((repayment) => {
                  const StatusIcon = getStatusIcon(repayment.status);
                  return (
                    <tr key={repayment.id} className="hover:bg-slate-700/30 transition-colors duration-200">
                      <td className="px-3 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                            <CreditCard size={16} className="text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{repayment.loanId}</div>
                            <div className="text-xs text-slate-400">{repayment.cargoType} - {repayment.origin} to {repayment.destination}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="text-sm text-slate-300">
                          <div>Original: {repayment.originalAmount}</div>
                          <div>APR: {repayment.apr}</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-white">{repayment.remainingBalance}</td>
                      <td className="px-3 py-3 text-sm font-semibold text-white">{repayment.nextPayment}</td>
                      <td className="px-3 py-3">
                        <div className="text-sm text-slate-300">
                          <div>{repayment.nextDueDate}</div>
                          <div className={`text-xs ${
                            getDaysUntilDueColor(repayment.daysUntilDue) === 'rejected' ? 'text-slate-400' :
                            getDaysUntilDueColor(repayment.daysUntilDue) === 'pending' ? 'text-indigo-400' : 'text-cyan-400'
                          }`}>
                            {repayment.daysUntilDue < 0 ? `${Math.abs(repayment.daysUntilDue)} days overdue` : 
                             repayment.daysUntilDue === 0 ? 'Due today' : 
                             `${repayment.daysUntilDue} days left`}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300" 
                              style={{ width: `${repayment.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-300">{repayment.progress}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center space-x-2">
                          <StatusIcon size={16} className={
                            getStatusColor(repayment.status) === 'blue' ? 'text-blue-400' :
                            getStatusColor(repayment.status) === 'cyan' ? 'text-cyan-400' :
                            getStatusColor(repayment.status) === 'slate' ? 'text-slate-400' : 'text-indigo-400'
                          } />
                            <span className={`text-sm font-medium ${
                              getStatusColor(repayment.status) === 'blue' ? 'text-blue-400' :
                              getStatusColor(repayment.status) === 'cyan' ? 'text-cyan-400' :
                              getStatusColor(repayment.status) === 'slate' ? 'text-slate-400' : 'text-indigo-400'
                            }`}>
                            {repayment.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200">
                            <Eye size={14} />
                          </button>
                          {repayment.status === 'active' && (
                            <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200">
                              <CreditCard size={14} />
                            </button>
                          )}
                          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200">
                            <Download size={14} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all duration-200">
                            <Edit size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Upcoming Payments</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockRepayments
            .filter(repay => repay.status === 'active' && repay.daysUntilDue >= 0)
            .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
            .slice(0, 5)
            .map((repayment) => (
              <div key={repayment.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-orange-400/30 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-white">{repayment.loanId}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        getDaysUntilDueColor(repayment.daysUntilDue) === 'rejected' ? 'bg-slate-500/20 text-slate-400' :
                        getDaysUntilDueColor(repayment.daysUntilDue) === 'pending' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {repayment.daysUntilDue === 0 ? 'Due today' : `${repayment.daysUntilDue} days`}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-white">{repayment.nextPayment}</div>
                      <div className="text-sm text-slate-400">{repayment.nextDueDate}</div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200">
                    <CreditCard size={16} />
                    <span>Pay Now</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Repayment Performance Metrics */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Target size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Performance Metrics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-green-400/30 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">On-Time Payment Rate</h4>
              <span className="text-xl font-bold text-cyan-400">96.8%</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-1000" style={{ width: '96.8%' }}></div>
            </div>
            <p className="text-xs text-slate-400">Payments made on or before due date</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">Average Payment Time</h4>
              <span className="text-xl font-bold text-blue-400">1.2s</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000" style={{ width: '98%' }}></div>
            </div>
            <p className="text-xs text-slate-400">Time to process payments</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-purple-400/30 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">Collection Rate</h4>
              <span className="text-xl font-bold text-indigo-400">98.5%</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-1000" style={{ width: '98.5%' }}></div>
            </div>
            <p className="text-xs text-slate-400">Successful payment collection rate</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-orange-400/30 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">Customer Satisfaction</h4>
              <span className="text-xl font-bold text-slate-400">4.9/5</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-orange-500 to-red-400 transition-all duration-1000" style={{ width: '98%' }}></div>
            </div>
            <p className="text-xs text-slate-400">Repayment experience rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRepayment; 