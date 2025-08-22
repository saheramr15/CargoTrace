import React, { useState } from 'react';
import {
  Database,
  Globe,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  BarChart3,
  Settings,
  Eye
} from 'lucide-react';

const AdminBlockchain = () => {
  const [selectedChain, setSelectedChain] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data - in real app, this would come from API
  const blockchainData = {
    ethereum: {
      name: 'Ethereum',
      status: 'online',
      lastBlock: '18,456,789',
      blockTime: '12.5s',
      transactions: 156,
      gasPrice: '25 Gwei',
      pendingTxs: 12,
      lastSync: '2 minutes ago',
      uptime: '99.8%',
      chainId: 1,
      rpcEndpoint: 'https://mainnet.infura.io/v3/...',
      explorer: 'https://etherscan.io'
    },
    icp: {
      name: 'Internet Computer',
      status: 'online',
      lastBlock: '1,234,567',
      blockTime: '2s',
      transactions: 892,
      cycles: '1.2M',
      pendingTxs: 5,
      lastSync: '1 minute ago',
      uptime: '99.9%',
      chainId: 'ic',
      rpcEndpoint: 'https://ic0.app',
      explorer: 'https://dashboard.internetcomputer.org'
    },
    cargoX: {
      name: 'CargoX',
      status: 'online',
      documents: 1247,
      verified: 1189,
      pending: 45,
      rejected: 13,
      lastSync: '30 seconds ago',
      uptime: '99.5%',
      apiEndpoint: 'https://api.cargox.io',
      webhookStatus: 'active'
    },
    nafeza: {
      name: 'NAFEZA',
      status: 'online',
      acidNumbers: 892,
      validated: 856,
      pending: 23,
      failed: 13,
      lastSync: '5 minutes ago',
      uptime: '99.2%',
      apiEndpoint: 'https://api.nafeza.gov.eg',
      webhookStatus: 'active'
    }
  };

  const chainFusionStats = {
    totalTransfers: 156,
    successfulTransfers: 152,
    failedTransfers: 4,
    averageTransferTime: '45s',
    totalVolume: '$2.4M',
    activeBridges: 2,
    lastTransfer: '5 minutes ago'
  };

  const recentTransfers = [
    {
      id: 'TF-001',
      from: 'Ethereum',
      to: 'ICP',
      amount: '$45,000',
      status: 'completed',
      time: '2 minutes ago',
      txHash: '0x1234...5678'
    },
    {
      id: 'TF-002',
      from: 'ICP',
      to: 'Ethereum',
      amount: '$32,500',
      status: 'pending',
      time: '5 minutes ago',
      txHash: '0x5678...9012'
    },
    {
      id: 'TF-003',
      from: 'Ethereum',
      to: 'ICP',
      amount: '$28,750',
      status: 'failed',
      time: '8 minutes ago',
      txHash: '0x9012...3456'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'syncing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
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

  const getTransferStatusBadge = (status) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="admin-blockchain">
      {/* Header */}
      <div className="admin-blockchain-header">
        <div className="admin-blockchain-title">
          <h2>Blockchain Monitor</h2>
          <p>Monitor blockchain integrations, chain fusion, and cross-chain operations</p>
        </div>
        <div className="admin-blockchain-actions">
          <button className="admin-blockchain-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh All
          </button>
          <button className="admin-blockchain-action-btn">
            <Settings className="w-4 h-4" />
            Configure
          </button>
        </div>
      </div>

      {/* Chain Status Overview */}
      <div className="admin-blockchain-overview">
        <h3>Chain Status Overview</h3>
        <div className="admin-blockchain-chains">
          {Object.entries(blockchainData).map(([key, chain]) => (
            <div key={key} className="admin-blockchain-chain-card">
              <div className="admin-blockchain-chain-header">
                <div className="admin-blockchain-chain-info">
                  <h4>{chain.name}</h4>
                  <div className="admin-blockchain-chain-status">
                    {getStatusIcon(chain.status)}
                    <span className={getStatusBadge(chain.status)}>{chain.status}</span>
                  </div>
                </div>
                <div className="admin-blockchain-chain-uptime">
                  <span className="admin-blockchain-uptime-label">Uptime</span>
                  <span className="admin-blockchain-uptime-value">{chain.uptime}</span>
                </div>
              </div>
              
              <div className="admin-blockchain-chain-details">
                {chain.lastBlock && (
                  <div className="admin-blockchain-detail">
                    <span className="admin-blockchain-detail-label">Last Block</span>
                    <span className="admin-blockchain-detail-value">{chain.lastBlock}</span>
                  </div>
                )}
                {chain.blockTime && (
                  <div className="admin-blockchain-detail">
                    <span className="admin-blockchain-detail-label">Block Time</span>
                    <span className="admin-blockchain-detail-value">{chain.blockTime}</span>
                  </div>
                )}
                {chain.transactions && (
                  <div className="admin-blockchain-detail">
                    <span className="admin-blockchain-detail-label">Transactions</span>
                    <span className="admin-blockchain-detail-value">{chain.transactions}</span>
                  </div>
                )}
                {chain.documents && (
                  <div className="admin-blockchain-detail">
                    <span className="admin-blockchain-detail-label">Documents</span>
                    <span className="admin-blockchain-detail-value">{chain.documents}</span>
                  </div>
                )}
                {chain.acidNumbers && (
                  <div className="admin-blockchain-detail">
                    <span className="admin-blockchain-detail-label">ACID Numbers</span>
                    <span className="admin-blockchain-detail-value">{chain.acidNumbers}</span>
                  </div>
                )}
              </div>

              <div className="admin-blockchain-chain-footer">
                <span className="admin-blockchain-last-sync">Last sync: {chain.lastSync}</span>
                <button className="admin-blockchain-explorer-btn">
                  <ExternalLink className="w-3 h-3" />
                  Explorer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chain Fusion Stats */}
      <div className="admin-blockchain-fusion">
        <h3>Chain Fusion Statistics</h3>
        <div className="admin-blockchain-fusion-stats">
          <div className="admin-blockchain-fusion-stat">
            <div className="admin-blockchain-fusion-stat-icon">
              <Zap className="w-6 h-6" />
            </div>
            <div className="admin-blockchain-fusion-stat-content">
              <div className="admin-blockchain-fusion-stat-value">{chainFusionStats.totalTransfers}</div>
              <div className="admin-blockchain-fusion-stat-label">Total Transfers</div>
            </div>
          </div>
          <div className="admin-blockchain-fusion-stat">
            <div className="admin-blockchain-fusion-stat-icon success">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="admin-blockchain-fusion-stat-content">
              <div className="admin-blockchain-fusion-stat-value">{chainFusionStats.successfulTransfers}</div>
              <div className="admin-blockchain-fusion-stat-label">Successful</div>
            </div>
          </div>
          <div className="admin-blockchain-fusion-stat">
            <div className="admin-blockchain-fusion-stat-icon">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="admin-blockchain-fusion-stat-content">
              <div className="admin-blockchain-fusion-stat-value">{chainFusionStats.totalVolume}</div>
              <div className="admin-blockchain-fusion-stat-label">Total Volume</div>
            </div>
          </div>
          <div className="admin-blockchain-fusion-stat">
            <div className="admin-blockchain-fusion-stat-icon">
              <Clock className="w-6 h-6" />
            </div>
            <div className="admin-blockchain-fusion-stat-content">
              <div className="admin-blockchain-fusion-stat-value">{chainFusionStats.averageTransferTime}</div>
              <div className="admin-blockchain-fusion-stat-label">Avg Transfer Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transfers */}
      <div className="admin-blockchain-transfers">
        <div className="admin-blockchain-transfers-header">
          <h3>Recent Cross-Chain Transfers</h3>
          <button className="admin-blockchain-view-all-btn">View All</button>
        </div>
        <div className="admin-blockchain-transfers-table">
          <table>
            <thead>
              <tr>
                <th>Transfer ID</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransfers.map((transfer) => (
                <tr key={transfer.id} className="admin-blockchain-transfer-row">
                  <td>
                    <span className="admin-blockchain-transfer-id">{transfer.id}</span>
                  </td>
                  <td>
                    <div className="admin-blockchain-chain-badge">
                      <Globe className="w-3 h-3" />
                      {transfer.from}
                    </div>
                  </td>
                  <td>
                    <div className="admin-blockchain-chain-badge">
                      <Database className="w-3 h-3" />
                      {transfer.to}
                    </div>
                  </td>
                  <td>
                    <span className="admin-blockchain-transfer-amount">{transfer.amount}</span>
                  </td>
                  <td>
                    <span className={getTransferStatusBadge(transfer.status)}>
                      {transfer.status}
                    </span>
                  </td>
                  <td>
                    <span className="admin-blockchain-transfer-time">{transfer.time}</span>
                  </td>
                  <td>
                    <div className="admin-blockchain-transfer-actions">
                      <button className="admin-blockchain-action-btn small">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="admin-blockchain-action-btn small">
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
        <h3>System Health</h3>
        <div className="admin-blockchain-health-grid">
          <div className="admin-blockchain-health-card">
            <div className="admin-blockchain-health-header">
              <Shield className="w-5 h-5" />
              <span>Security Status</span>
            </div>
            <div className="admin-blockchain-health-status">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>All systems secure</span>
            </div>
          </div>
          <div className="admin-blockchain-health-card">
            <div className="admin-blockchain-health-header">
              <Activity className="w-5 h-5" />
              <span>Performance</span>
            </div>
            <div className="admin-blockchain-health-status">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Optimal performance</span>
            </div>
          </div>
          <div className="admin-blockchain-health-card">
            <div className="admin-blockchain-health-header">
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </div>
            <div className="admin-blockchain-health-status">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Data collection active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlockchain;
