import React, { useState, useEffect } from 'react';
import {
  Home,
  FileText,
  DollarSign,
  CreditCard,
  Wallet,
  Menu,
  Activity,
  Shield,
  Settings,
  HelpCircle,
  Link
} from 'lucide-react';
import { cargo_trace_backend as backend } from '../../../../declarations/cargo_trace_backend';

const DashboardSidebar = ({ activeTab, setActiveTab, isMobileMenuOpen }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [activeLoan, setActiveLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch wallet balance
      const balanceResult = await backend.get_wallet_balance_async();  // Now an update call
      if (balanceResult.Err) {
        throw new Error(balanceResult.Err);
      }
      // Convert e8s to USD (assuming 1 token = 1 USD for simplicity)
      const balanceInUSD = (balanceResult.Ok / 100_000_000).toFixed(2);
      setWalletBalance(balanceInUSD);

      // Fetch active loan
      const loanResult = await backend.get_active_loan();
      if (loanResult) {
        const repaymentAmount = (loanResult.amount * (1 + loanResult.interest_rate / 100)).toFixed(2);
        setActiveLoan({
          amount: (loanResult.amount / 100_000_000).toFixed(2),
          repaymentAmount,
          dueDate: new Date(loanResult.repayment_date).toLocaleDateString(),
        });
      } else {
        setActiveLoan(null);
      }
    } catch (err) {
      console.error('Failed to fetch wallet data:', err);
      setError(err.message || 'Failed to load wallet data');
    } finally {
      setLoading(false);
    }
  };

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      badge: null
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      badge: '12'
    },
    {
      id: 'customs',
      label: 'Customs Integration',
      icon: Link,
      badge: '5'
    },
    {
      id: 'loans',
      label: 'Loan Requests',
      icon: DollarSign,
      badge: '3'
    },
    {
      id: 'repayment',
      label: 'Repayment',
      icon: CreditCard,
      badge: null
    }
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
            <span className="sidebar-wallet-title">CargoTrace Wallet</span>
          </div>
          <div className="sidebar-wallet-title">Wallet Balance</div>
          <div className="sidebar-wallet-amount">
            {loading ? 'Loading...' : error ? 'Error' : `${walletBalance} USD`}
          </div>
          <div className="sidebar-wallet-title">Active Loan</div>
          <div className="sidebar-wallet-amount">
            {loading ? 'Loading...' : error ? 'Error' : activeLoan ? `${activeLoan.amount} USD` : '0.00 USD'}
          </div>
          <div className="sidebar-wallet-title">Repayment Due</div>
          <div className="sidebar-wallet-amount">
            {loading ? 'Loading...' : error ? 'Error' : activeLoan ? `${activeLoan.repaymentAmount} USD` : '0.00 USD'}
          </div>
          <div className="sidebar-wallet-status">
            <div className="sidebar-wallet-indicator"></div>
            <span className="sidebar-wallet-status-text">Connected</span>
            {error && <button onClick={fetchWalletData} className="ml-2 text-xs text-blue-500 hover:underline">Retry</button>}
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