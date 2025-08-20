import React, { useState, useEffect } from 'react';
import {
  Activity,
  Globe,
  Database,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Copy,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
  Wifi,
  WifiOff,
  Shield,
  Zap
} from 'lucide-react';

const AdminBlockchain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock data - in real app, this would come from API
  const blockchainStatus = {
    ethereum: {
      status: 'online',
      lastBlock: '18,456,789',
      syncTime: '2s ago',
      gasPrice: '25 Gwei',
             pendingTransactions: 1234,
      networkLoad: 'Medium',
      uptime: '99.9%',
      lastSync: new Date(Date.now() - 2000)
    },
    icp: {
      status: 'online',
      lastBlock: '1,234,567',
      syncTime: '1s ago',
      canisterCount: 45,
             activeNodes: 1234,
      networkLoad: 'Low',
      uptime: '99.8%',
      lastSync: new Date(Date.now() - 1000)
    },
    nafeza: {
      status: 'online',
      lastSyncTime: '5 minutes ago',
      apiResponseTime: '45ms',
      uptime: '99.5%',
      lastSync: new Date(Date.now() - 300000)
    }
  };

  const recentTransactions = [
    {
      id: 'tx-001',
      network: 'ethereum',
      type: 'document_verification',
      hash: '0x1234...5678',
      status: 'confirmed',
      blockNumber: '18,456,789',
      timestamp: new Date(Date.now() - 30000),
      gasUsed: '45,000',
      gasPrice: '25 Gwei'
    },
    {
      id: 'tx-002',
      network: 'icp',
      type: 'nft_mint',
      hash: 'NFT-001',
      status: 'confirmed',
      blockNumber: '1,234,567',
      timestamp: new Date(Date.now() - 60000),
      canisterId: 'abc123'
    },
    {
      id: 'tx-003',
      network: 'ethereum',
      type: 'loan_disbursement',
      hash: '0x5678...9012',
      status: 'pending',
      blockNumber: '18,456,788',
      timestamp: new Date(Date.now() - 90000),
      gasUsed: '120,000',
      gasPrice: '30 Gwei'
    },
    {
      id: 'tx-004',
      network: 'icp',
      type: 'smart_contract_execution',
      hash: 'SC-001',
      status: 'confirmed',
      blockNumber: '1,234,566',
      timestamp: new Date(Date.now() - 120000),
      canisterId: 'def456'
    }
  ];

  const networkMetrics = {
    ethereum: {
      totalTransactions: '1,234,567',
      averageGasPrice: '25 Gwei',
      networkUtilization: '65%',
      pendingTransactions: '1,234',
      blockTime: '12s'
    },
    icp: {
      totalTransactions: '567,890',
      averageBlockTime: '1s',
      networkUtilization: '45%',
      activeCanisters: '45',
      nodeCount: '1,234'
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      online: 'bg-green-100 text-green-800',
      offline: 'bg-red-100 text-red-800',
      syncing: 'bg-yellow-100 text-yellow-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getTransactionStatusBadge = (status) => {
    const statusClasses = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const handleViewTransaction = (tx) => {
    console.log('Viewing transaction:', tx);
  };

  return (
    <div className="admin-blockchain">
      {/* Header */}
      <div className="admin-blockchain-header">
        <div className="admin-blockchain-title">
          <h2>Blockchain Monitor</h2>
          <p>Real-time monitoring of Ethereum and ICP blockchain networks</p>
        </div>
        <div className="admin-blockchain-actions">
          <button 
            className="admin-blockchain-action-btn"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <span className="admin-blockchain-last-refresh">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Network Status Cards */}
      <div className="admin-blockchain-networks">
        {Object.entries(blockchainStatus).map(([network, status]) => (
          <div key={network} className="admin-blockchain-network-card">
            <div className="admin-blockchain-network-header">
              <div className="admin-blockchain-network-icon">
                {network === 'ethereum' && <Globe className="w-6 h-6" />}
                {network === 'icp' && <Database className="w-6 h-6" />}
                {network === 'nafeza' && <Shield className="w-6 h-6" />}
              </div>
              <div className="admin-blockchain-network-info">
                <h3 className="admin-blockchain-network-name">
                  {network.toUpperCase()}
                </h3>
                <div className="admin-blockchain-network-status">
                  {getStatusIcon(status.status)}
                  <span className={getStatusBadge(status.status)}>
                    {status.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="admin-blockchain-network-metrics">
              {network === 'ethereum' && (
                <>
                  <div className="admin-blockchain-metric">
                    <span className="admin-blockchain-metric-label">Last Block</span>
                    <span className="admin-blockchain-metric-value">{status.lastBlock}</span>
                  </div>
                  <div className="admin-blockchain-metric">
                    <span className="admin-blockchain-metric-label">Gas Price</span>
                    <span className="admin-blockchain-metric-value">{status.gasPrice}</span>
                  </div>
                  <div className="admin-blockchain-metric">
                    <span className="admin-blockchain-metric-label">Pending TX</span>
                    <span className="admin-blockchain-metric-value">{status.pendingTransactions.toLocaleString()}</span>
                  </div>
                </>
              )}
              
              {network === 'icp' && (
                <>
                  <div className="admin-blockchain-metric">
                    <span className="admin-blockchain-metric-label">Last Block</span>
                    <span className="admin-blockchain-metric-value">{status.lastBlock}</span>
                  </div>
                  <div className="admin-blockchain-metric">
                    <span className="admin-blockchain-metric-label">Canisters</span>
                    <span className="admin-blockchain-metric-value">{status.canisterCount}</span>
                  </div>
                  <div className="admin-blockchain-metric">
                    <span className="admin-blockchain-metric-label">Active Nodes</span>
                    <span className="admin-blockchain-metric-value">{status.activeNodes.toLocaleString()}</span>
                  </div>
                </>
              )}
              
              {network === 'nafeza' && (
                <>
                  <div className="admin-blockchain-metric">
                    <span className="admin-blockchain-metric-label">API Response</span>
                    <span className="admin-blockchain-metric-value">{status.apiResponseTime}</span>
                  </div>
                                     <div className="admin-blockchain-metric">
                     <span className="admin-blockchain-metric-label">Last Sync</span>
                     <span className="admin-blockchain-metric-value">{status.lastSyncTime}</span>
                   </div>
                </>
              )}
              
              <div className="admin-blockchain-metric">
                <span className="admin-blockchain-metric-label">Uptime</span>
                <span className="admin-blockchain-metric-value">{status.uptime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Network Metrics */}
      <div className="admin-blockchain-metrics">
        <div className="admin-blockchain-metrics-card">
          <div className="admin-blockchain-metrics-header">
            <h3>Ethereum Network Metrics</h3>
            <Globe className="w-5 h-5" />
          </div>
          <div className="admin-blockchain-metrics-content">
            <div className="admin-blockchain-metrics-grid">
              <div className="admin-blockchain-metric-item">
                <span className="admin-blockchain-metric-label">Total Transactions</span>
                <span className="admin-blockchain-metric-value">{networkMetrics.ethereum.totalTransactions}</span>
              </div>
              <div className="admin-blockchain-metric-item">
                <span className="admin-blockchain-metric-label">Avg Gas Price</span>
                <span className="admin-blockchain-metric-value">{networkMetrics.ethereum.averageGasPrice}</span>
              </div>
              <div className="admin-blockchain-metric-item">
                <span className="admin-blockchain-metric-label">Network Utilization</span>
                <span className="admin-blockchain-metric-value">{networkMetrics.ethereum.networkUtilization}</span>
              </div>
              <div className="admin-blockchain-metric-item">
                <span className="admin-blockchain-metric-label">Block Time</span>
                <span className="admin-blockchain-metric-value">{networkMetrics.ethereum.blockTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-blockchain-metrics-card">
          <div className="admin-blockchain-metrics-header">
            <h3>ICP Network Metrics</h3>
            <Database className="w-5 h-5" />
          </div>
          <div className="admin-blockchain-metrics-content">
            <div className="admin-blockchain-metrics-grid">
              <div className="admin-blockchain-metric-item">
                <span className="admin-blockchain-metric-label">Total Transactions</span>
                <span className="admin-blockchain-metric-value">{networkMetrics.icp.totalTransactions}</span>
              </div>
              <div className="admin-blockchain-metric-item">
                <span className="admin-blockchain-metric-label">Avg Block Time</span>
                <span className="admin-blockchain-metric-value">{networkMetrics.icp.averageBlockTime}</span>
              </div>
              <div className="admin-blockchain-metric-item">
                <span className="admin-blockchain-metric-label">Network Utilization</span>
                <span className="admin-blockchain-metric-value">{networkMetrics.icp.networkUtilization}</span>
              </div>
              <div className="admin-blockchain-metric-item">
                <span className="admin-blockchain-metric-label">Active Canisters</span>
                <span className="admin-blockchain-metric-value">{networkMetrics.icp.activeCanisters}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="admin-blockchain-transactions">
        <div className="admin-blockchain-transactions-header">
          <h3>Recent Transactions</h3>
          <Activity className="w-5 h-5" />
        </div>
        <div className="admin-blockchain-transactions-table">
          <table className="admin-blockchain-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Network</th>
                <th>Type</th>
                <th>Status</th>
                <th>Block</th>
                <th>Timestamp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="admin-blockchain-table-row">
                  <td>
                    <div className="admin-blockchain-tx-id">
                      <span className="admin-blockchain-tx-hash">{tx.hash}</span>
                      <button className="admin-blockchain-copy-btn">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="admin-blockchain-network-badge">
                      {tx.network === 'ethereum' && <Globe className="w-3 h-3" />}
                      {tx.network === 'icp' && <Database className="w-3 h-3" />}
                      <span>{tx.network.toUpperCase()}</span>
                    </div>
                  </td>
                  <td>
                    <span className="admin-blockchain-tx-type">{tx.type.replace('_', ' ')}</span>
                  </td>
                  <td>
                    <span className={getTransactionStatusBadge(tx.status)}>
                      {tx.status}
                    </span>
                  </td>
                  <td>
                    <span className="admin-blockchain-block-number">{tx.blockNumber}</span>
                  </td>
                  <td>
                    <span className="admin-blockchain-timestamp">
                      {tx.timestamp.toLocaleTimeString()}
                    </span>
                  </td>
                  <td>
                    <div className="admin-blockchain-actions">
                      <button
                        className="admin-blockchain-action-btn small"
                        onClick={() => handleViewTransaction(tx)}
                        title="View Transaction"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Health */}
      <div className="admin-blockchain-health">
        <div className="admin-blockchain-health-card">
          <div className="admin-blockchain-health-header">
            <h3>System Health</h3>
            <Zap className="w-5 h-5" />
          </div>
          <div className="admin-blockchain-health-content">
            <div className="admin-blockchain-health-metrics">
              <div className="admin-blockchain-health-item">
                <span className="admin-blockchain-health-label">Chain Fusion Status</span>
                <div className="admin-blockchain-health-status">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="admin-blockchain-health-value">Operational</span>
                </div>
              </div>
              <div className="admin-blockchain-health-item">
                <span className="admin-blockchain-health-label">Smart Contract Status</span>
                <div className="admin-blockchain-health-status">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="admin-blockchain-health-value">Deployed & Active</span>
                </div>
              </div>
              <div className="admin-blockchain-health-item">
                <span className="admin-blockchain-health-label">NFT Minting Service</span>
                <div className="admin-blockchain-health-status">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="admin-blockchain-health-value">Online</span>
                </div>
              </div>
              <div className="admin-blockchain-health-item">
                <span className="admin-blockchain-health-label">Document Verification</span>
                <div className="admin-blockchain-health-status">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="admin-blockchain-health-value">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlockchain;
