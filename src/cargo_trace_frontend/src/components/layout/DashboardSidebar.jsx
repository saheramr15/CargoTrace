import React, { useState, useEffect, useCallback } from 'react';
import {
  Home,
  FileText,
  DollarSign,
  CreditCard,
  Wallet,
  Shield,
  Settings,
  HelpCircle,
  Link,
  RefreshCw,
} from 'lucide-react';
import { cargo_trace_backend as backend } from '../../../../declarations/cargo_trace_backend';

const DashboardSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [activeLoan, setActiveLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchWalletData = useCallback(async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Fetch wallet balance in USD
      const balanceResult = await backend.get_wallet_balance_usd();
      console.log('Balance Result:', balanceResult);
      if ('Err' in balanceResult) {
        throw new Error(balanceResult.Err);
      }
      if ('Ok' in balanceResult) {
        const balanceInUSD = parseFloat(balanceResult.Ok || 0).toFixed(2);
        setWalletBalance(balanceInUSD);
      } else {
        throw new Error('Unexpected balance result format');
      }

      // Fetch active loan
      const loanResult = await backend.get_active_loan();
      console.log('Loan Result:', loanResult);
      if (loanResult) {
        const loan = loanResult;
        const loanAmountUSD = (Number(loan.amount || 0) / 100).toFixed(2);
        const interestRate = Number(loan.interest_rate || 0);
        const repaymentAmount = (
          (Number(loan.amount || 0) * (1 + interestRate / 100)) / 100
        ).toFixed(2);
        const dueDate = loan.repayment_date
          ? new Date(Number(loan.repayment_date) / 1_000_000).toLocaleDateString()
          : 'N/A';

        setActiveLoan({
          id: loan.id || 'unknown',
          amount: loanAmountUSD,
          repaymentAmount,
          dueDate,
          status: loan.status || 'Unknown',
        });
      } else {
        setActiveLoan(null);
      }

      setRetryCount(0);
    } catch (err) {
      console.error('Failed to fetch wallet data:', err.message, err.stack);
      setError(err.message || 'Failed to load wallet data');
      setWalletBalance(null);
      setActiveLoan(null);
      if (retryCount < MAX_RETRIES) {
        setRetryCount(retryCount + 1);
        setTimeout(() => fetchWalletData(showRefreshLoader), 2000 * (retryCount + 1));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchWalletData();
    // Polling disabled to avoid rate limits; rely on manual refresh
  }, [fetchWalletData]);

  const handleRefresh = () => {
    setRetryCount(0);
    fetchWalletData(true);
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'documents', label: 'Documents', icon: FileText, badge: '12' },
    { id: 'customs', label: 'Customs Integration', icon: Link, badge: '5' },
    { id: 'loans', label: 'Loan Requests', icon: DollarSign, badge: '3' },
    { id: 'repayment', label: 'Repayment', icon: CreditCard, badge: null },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const getStatusColor = (status) => {
    const statusMap = {
      Active: '#10b981',
      Pending: '#f59e0b',
      TransferPending: '#3b82f6',
      TransferFailed: '#ef4444',
      Approved: '#10b981',
      Repaid: '#6b7280',
      Rejected: '#ef4444',
      Defaulted: '#dc2626',
    };
    return statusMap[status] || '#6b7280';
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-700/50 shadow-2xl z-40 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-y-auto`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                {/* Premium Logo Container - Matching Navbar */}
                <div className="w-12 h-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 border border-slate-700/50 group-hover:border-blue-400/60 relative overflow-hidden">
                  {/* Premium Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-indigo-600/10 rounded-2xl"></div>
                  
                  {/* Main Logo Design - Letter C */}
                  <div className="relative z-10">
                    <div className="w-8 h-8 relative">
                      {/* Outer C Ring */}
                      <div className="absolute inset-0 border-3 border-blue-400 rounded-full"></div>
                      {/* Inner C Ring */}
                      <div className="absolute inset-1 border-2 border-cyan-300 rounded-full"></div>
                      {/* C Opening */}
                      <div className="absolute top-0 right-0 w-2 h-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-r-full"></div>
                      {/* Center Dot */}
                      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  CargoTrace
                </span>
                <span className="text-sm font-semibold tracking-wide text-slate-300">
                  Finance
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-md">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-400">LIVE</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`group relative w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-400/30 text-white shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                  onClick={() => handleTabChange(item.id)}
                >
                  <div className={`relative ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>
                    <Icon size={18} className={`${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'} transition-colors duration-300`} />
                    <div className={`absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg blur opacity-0 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}></div>
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'group-hover:text-white'} transition-colors duration-300`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-slate-600/50 text-slate-300 group-hover:bg-blue-500/20 group-hover:text-blue-400'
                    } transition-all duration-300`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Wallet Section */}
        <div className="p-4 border-t border-slate-700/30 flex-shrink-0">
          <div className="group relative bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-lg flex items-center justify-center">
                      <Wallet size={16} className="text-green-400" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <span className="text-sm font-medium text-white">Wallet</span>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing || loading}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Refresh wallet balance"
                >
                  <RefreshCw size={14} className={`${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Balance</div>
                  <div className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                    {loading && !refreshing
                      ? 'Loading...'
                      : error || walletBalance === null
                      ? 'Error'
                      : `$${walletBalance} USD`}
                  </div>
                </div>

                {activeLoan && (
                  <>
                    <div className="border-t border-slate-700/50 pt-3">
                      <div className="text-xs text-slate-400 mb-1">Repayment Due</div>
                      <div className="text-sm font-medium text-orange-400">${activeLoan.repaymentAmount} USD</div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-400 mb-1">Due Date</div>
                      <div className="text-xs text-slate-300">{activeLoan.dueDate}</div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-400 mb-1">Status</div>
                      <div
                        className="text-xs font-medium px-2 py-1 rounded inline-block"
                        style={{
                          color: getStatusColor(activeLoan.status),
                          backgroundColor: `${getStatusColor(activeLoan.status)}20`,
                        }}
                      >
                        {activeLoan.status}
                      </div>
                    </div>
                  </>
                )}

                <div className="border-t border-slate-700/50 pt-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></div>
                    <span className="text-xs text-slate-300">
                      {error ? 'Connection Error' : 'Connected'}
                    </span>
                    {error && (
                      <button
                        onClick={handleRefresh}
                        className="ml-auto text-xs text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors duration-300"
                      >
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/30 flex-shrink-0 mt-auto">
          <div className="space-y-3">
            <div className="flex space-x-1">
              <button className="group flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5">
                <Settings size={14} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-medium">Settings</span>
              </button>
              <button className="group flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5">
                <HelpCircle size={14} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-medium">Help</span>
              </button>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-400 bg-slate-800/30 px-2 py-1 rounded inline-block">
                v2.1.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;