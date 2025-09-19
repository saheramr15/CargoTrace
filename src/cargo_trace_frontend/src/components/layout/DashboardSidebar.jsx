import React, { useState, useEffect } from 'react';
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
  RefreshCw
} from 'lucide-react';
import { cargo_trace_backend as backend } from '../../../../declarations/cargo_trace_backend';

const DashboardSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletBalanceUsd, setWalletBalanceUsd] = useState(0);
  const [activeLoan, setActiveLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch wallet balance in tokens (TCIP)
      const balanceResult = await backend.get_wallet_balance_async();
      if (balanceResult.Err) {
        throw new Error(balanceResult.Err);
      }

      // Convert from smallest unit (e8s) to TCIP tokens
      const balanceInTCIP = (balanceResult.Ok / 100_000_000).toFixed(8);
      setWalletBalance(balanceInTCIP);

      // Also get USD equivalent
      try {
        const usdBalanceResult = await backend.get_wallet_balance_usd();
        if (usdBalanceResult.Ok) {
          setWalletBalanceUsd(usdBalanceResult.Ok);
        }
      } catch (usdError) {
        console.warn('Could not fetch USD balance:', usdError);
        // If USD conversion fails, assume 1:1 ratio for display
        setWalletBalanceUsd(parseFloat(balanceInTCIP).toFixed(2));
      }

      // Fetch active loan
      const loanResult = await backend.get_active_loan();
      if (loanResult && loanResult.length > 0) {
        const loan = loanResult[0];
        const repaymentAmount = (loan.amount * (1 + loan.interest_rate / 100)).toFixed(2);
        setActiveLoan({
          id: loan.id,
          amount: loan.amount.toFixed(2),
          repaymentAmount,
          dueDate: new Date(Number(loan.repayment_date) / 1000000).toLocaleDateString(), // Convert nanoseconds to milliseconds
          status: loan.status,
          transferBlockHeight: loan.transfer_block_height ? loan.transfer_block_height.toString() : null,
        });
      } else {
        setActiveLoan(null);
      }
    } catch (err) {
      console.error('Failed to fetch wallet data:', err);
      setError(err.message || 'Failed to load wallet data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchWalletData();
  };

  const formatBalance = (balance) => {
    if (loading) return 'Loading...';
    if (error) return 'Error';
    return `${balance}`;
  };

  const formatTokenBalance = (balance) => {
    if (loading) return 'Loading...';
    if (error) return 'Error';
    return `${parseFloat(balance).toFixed(4)} TCIP`;
  };

  const getLoanStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'TransferPending': return 'text-yellow-400';
      case 'TransferFailed': return 'text-red-400';
      case 'Pending': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText, badge: '12' },
    { id: 'customs', label: 'Customs Integration', icon: Link, badge: '5' },
    { id: 'loans', label: 'Loan Requests', icon: DollarSign, badge: '3' },
    { id: 'repayment', label: 'Repayment', icon: CreditCard },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-logo-section">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo-icon">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="sidebar-logo-text">
            <h1>CargoTrace</h1>
            <p>Trade Finance</p>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="sidebar-status-indicator">
          <div className="sidebar-status-dot"></div>
          <span className="sidebar-status-text">LIVE</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabChange(item.id)}
            >
              <Icon className="sidebar-nav-icon" />
              <span className="sidebar-nav-label">{item.label}</span>
              {item.badge && (
                <span className="sidebar-nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Wallet Section */}
      <div className="sidebar-wallet-section">
        <div className="sidebar-wallet-card">
          <div className="sidebar-wallet-header">
            <div className="sidebar-wallet-icon">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="sidebar-wallet-title">ICRC-1 Wallet</span>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="ml-auto p-1 hover:bg-gray-700 rounded transition-colors"
              title="Refresh balance"
            >
              <RefreshCw className={`w-3 h-3 text-gray-400 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="sidebar-wallet-title">Token Balance</div>
          <div className="sidebar-wallet-amount text-sm">
            {formatTokenBalance(walletBalance)}
          </div>

          <div className="sidebar-wallet-title">USD Equivalent</div>
          <div className="sidebar-wallet-amount">
            {formatBalance(walletBalanceUsd)} USD
          </div>

          <div className="sidebar-wallet-title">Active Loan</div>
          <div className="sidebar-wallet-amount">
            {loading ? 'Loading...' : error ? 'Error' : activeLoan ? (
              <div className="space-y-1">
                <div>{activeLoan.amount} USD</div>
                <div className={`text-xs ${getLoanStatusColor(activeLoan.status)}`}>
                  {activeLoan.status}
                </div>
                {activeLoan.transferBlockHeight && (
                  <div className="text-xs text-gray-400">
                    Block: {activeLoan.transferBlockHeight}
                  </div>
                )}
              </div>
            ) : 'No active loan'}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-actions">
          <button className="sidebar-footer-action">
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <button className="sidebar-footer-action">
            <HelpCircle size={16} />
            <span>Help</span>
          </button>
        </div>

        <div className="sidebar-footer-info">
          <div className="sidebar-footer-version">
            <span>v2.1.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
