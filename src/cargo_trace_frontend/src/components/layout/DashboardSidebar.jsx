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
    <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
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
        <div className="sidebar-status-indicator">
          <div className="sidebar-status-dot"></div>
          <span className="sidebar-status-text">LIVE</span>
        </div>
      </div>

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
              {item.badge && <span className="sidebar-nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-wallet-section">
        <div className="sidebar-wallet-card">
          <div className="sidebar-wallet-header">
            <div className="sidebar-wallet-icon">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="sidebar-wallet-title">CargoTrace Wallet</span>
            <button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="ml-auto p-1 rounded hover:bg-gray-700 transition-colors"
              title="Refresh wallet balance"
            >
              <RefreshCw className={`w-3 h-3 text-gray-400 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="sidebar-wallet-title">Wallet Balance</div>
          <div className="sidebar-wallet-amount">
            {loading && !refreshing
              ? 'Loading...'
              : error || walletBalance === null
              ? 'Error'
              : `$${walletBalance} USD`}
          </div>

          {activeLoan && (
            <>
              <div className="sidebar-wallet-title">Repayment Due</div>
              <div className="sidebar-wallet-amount">${activeLoan.repaymentAmount} USD</div>

              <div className="sidebar-wallet-title">Due Date</div>
              <div className="sidebar-wallet-amount" style={{ fontSize: '0.75rem' }}>
                {activeLoan.dueDate}
              </div>

              <div className="sidebar-wallet-title">Status</div>
              <div
                className="sidebar-wallet-amount"
                style={{
                  color: getStatusColor(activeLoan.status),
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                }}
              >
                {activeLoan.status}
              </div>
            </>
          )}

          <div className="sidebar-wallet-status">
            <div className="sidebar-wallet-indicator"></div>
            <span className="sidebar-wallet-status-text">{error ? 'Connection Error' : 'Connected'}</span>
            {error && (
              <button
                onClick={handleRefresh}
                className="ml-2 text-xs text-blue-500 hover:underline"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>

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