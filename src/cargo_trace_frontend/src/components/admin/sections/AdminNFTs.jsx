import React, { useState } from 'react';
import {
  Layers,
  Search,
  Filter,
  Download,
  Eye,
  ExternalLink,
  Copy,
  Database,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Activity,
  Shield,
  FileText,
  DollarSign,
  Calendar
} from 'lucide-react';

const AdminNFTs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedNFTs, setSelectedNFTs] = useState([]);

  // Mock data - in real app, this would come from API
  const nfts = [
    {
      id: 'NFT-001',
      documentId: 'BL-2024-001',
      status: 'minted',
      company: 'ABC Trading Co.',
      tokenId: '0x1234567890abcdef',
      canisterId: 'abc123',
      metadata: {
        name: 'Bill of Lading NFT',
        description: 'Electronics shipment from China',
        image: 'ipfs://QmXxxx...',
        attributes: {
          documentType: 'Bill of Lading',
          cargoValue: '$45,000',
          origin: 'China',
          destination: 'Egypt'
        }
      },
      mintedAt: '2024-01-15T10:35:00Z',
      transactionHash: '0x5678...9012',
      gasUsed: '120,000',
      gasPrice: '25 Gwei',
      blockNumber: '1,234,567',
      owner: '0xabcd...efgh',
      loanId: 'LR-2024-001'
    },
    {
      id: 'NFT-002',
      documentId: 'BL-2024-004',
      status: 'minted',
      company: 'GHI Trading Ltd.',
      tokenId: '0xabcdef1234567890',
      canisterId: 'def456',
      metadata: {
        name: 'Certificate of Origin NFT',
        description: 'Coffee beans from Ethiopia',
        image: 'ipfs://QmYxxx...',
        attributes: {
          documentType: 'Certificate of Origin',
          cargoValue: '$15,200',
          origin: 'Ethiopia',
          destination: 'Egypt'
        }
      },
      mintedAt: '2024-01-15T08:25:00Z',
      transactionHash: '0x9012...3456',
      gasUsed: '95,000',
      gasPrice: '22 Gwei',
      blockNumber: '1,234,566',
      owner: '0xefgh...ijkl',
      loanId: 'LR-2024-004'
    },
    {
      id: 'NFT-003',
      documentId: 'BL-2024-005',
      status: 'pending',
      company: 'JKL Export Co.',
      tokenId: null,
      canisterId: null,
      metadata: {
        name: 'Commercial Invoice NFT',
        description: 'Textile products to Europe',
        image: null,
        attributes: {
          documentType: 'Commercial Invoice',
          cargoValue: '$28,500',
          origin: 'Egypt',
          destination: 'Germany'
        }
      },
      mintedAt: null,
      transactionHash: null,
      gasUsed: null,
      gasPrice: null,
      blockNumber: null,
      owner: null,
      loanId: null
    }
  ];

  const icpMetrics = {
    totalNFTs: '45',
    totalValue: '$2,456,789',
    averageGasUsed: '110,000',
    averageGasPrice: '24 Gwei',
    mintingSuccessRate: '98.5%',
    activeCanisters: '12'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'minted':
        return <Shield className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Activity className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <Database className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      minted: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleViewNFT = (nft) => {
    console.log('Viewing NFT:', nft);
  };

  const handleViewOnICP = (nft) => {
    console.log('Viewing on ICP:', nft);
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.documentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || nft.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalNFTs = nfts.length;
  const mintedNFTs = nfts.filter(nft => nft.status === 'minted').length;
  const pendingNFTs = nfts.filter(nft => nft.status === 'pending').length;
  const totalValue = nfts.reduce((sum, nft) => {
    if (nft.metadata?.attributes?.cargoValue) {
      return sum + parseFloat(nft.metadata.attributes.cargoValue.replace('$', '').replace(',', ''));
    }
    return sum;
  }, 0);

  return (
    <div className="admin-nfts">
      {/* Header */}
      <div className="admin-nfts-header">
        <div className="admin-nfts-title">
          <h2>NFT Management</h2>
          <p>Monitor and manage minted document NFTs on the Internet Computer blockchain</p>
        </div>
        <div className="admin-nfts-actions">
          <button className="admin-nfts-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="admin-nfts-action-btn">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* ICP Metrics */}
      <div className="admin-nfts-icp-metrics">
        <div className="admin-nfts-icp-card">
          <div className="admin-nfts-icp-header">
            <Database className="w-6 h-6" />
            <h3>ICP Network Metrics</h3>
          </div>
          <div className="admin-nfts-icp-metrics-grid">
            <div className="admin-nfts-icp-metric">
              <span className="admin-nfts-icp-label">Total NFTs</span>
              <span className="admin-nfts-icp-value">{icpMetrics.totalNFTs}</span>
            </div>
            <div className="admin-nfts-icp-metric">
              <span className="admin-nfts-icp-label">Total Value</span>
              <span className="admin-nfts-icp-value">{icpMetrics.totalValue}</span>
            </div>
            <div className="admin-nfts-icp-metric">
              <span className="admin-nfts-icp-label">Success Rate</span>
              <span className="admin-nfts-icp-value">{icpMetrics.mintingSuccessRate}</span>
            </div>
            <div className="admin-nfts-icp-metric">
              <span className="admin-nfts-icp-label">Active Canisters</span>
              <span className="admin-nfts-icp-value">{icpMetrics.activeCanisters}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-nfts-filters">
        <div className="admin-nfts-search">
          <Search className="admin-nfts-search-icon" />
          <input
            type="text"
            placeholder="Search NFTs by ID, company, or document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-nfts-search-input"
          />
        </div>
        <div className="admin-nfts-filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-nfts-status-filter"
          >
            <option value="all">All Status</option>
            <option value="minted">Minted</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button className="admin-nfts-filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-nfts-stats">
        <div className="admin-nfts-stat-card">
          <div className="admin-nfts-stat-icon">
            <Layers className="w-6 h-6" />
          </div>
          <div className="admin-nfts-stat-content">
            <div className="admin-nfts-stat-value">{totalNFTs}</div>
            <div className="admin-nfts-stat-label">Total NFTs</div>
          </div>
        </div>
        <div className="admin-nfts-stat-card">
          <div className="admin-nfts-stat-icon minted">
            <Shield className="w-6 h-6" />
          </div>
          <div className="admin-nfts-stat-content">
            <div className="admin-nfts-stat-value">{mintedNFTs}</div>
            <div className="admin-nfts-stat-label">Minted</div>
          </div>
        </div>
        <div className="admin-nfts-stat-card">
          <div className="admin-nfts-stat-icon pending">
            <Activity className="w-6 h-6" />
          </div>
          <div className="admin-nfts-stat-content">
            <div className="admin-nfts-stat-value">{pendingNFTs}</div>
            <div className="admin-nfts-stat-label">Pending</div>
          </div>
        </div>
        <div className="admin-nfts-stat-card">
          <div className="admin-nfts-stat-icon">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="admin-nfts-stat-content">
            <div className="admin-nfts-stat-value">${totalValue.toLocaleString()}</div>
            <div className="admin-nfts-stat-label">Total Value</div>
          </div>
        </div>
      </div>

      {/* NFTs Table */}
      <div className="admin-nfts-table-container">
        <table className="admin-nfts-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedNFTs(filteredNFTs.map(n => n.id));
                    } else {
                      setSelectedNFTs([]);
                    }
                  }}
                />
              </th>
              <th>NFT ID</th>
              <th>Document ID</th>
              <th>Company</th>
              <th>Token ID</th>
              <th>Status</th>
              <th>Metadata</th>
              <th>Minted At</th>
              <th>Transaction</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNFTs.map((nft) => (
              <tr key={nft.id} className="admin-nfts-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedNFTs.includes(nft.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedNFTs([...selectedNFTs, nft.id]);
                      } else {
                        setSelectedNFTs(selectedNFTs.filter(id => id !== nft.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <div className="admin-nfts-id">
                    <span className="admin-nfts-id-text">{nft.id}</span>
                    <button className="admin-nfts-copy-btn">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td>
                  <span className="admin-nfts-document-id">{nft.documentId}</span>
                </td>
                <td>
                  <span className="admin-nfts-company">{nft.company}</span>
                </td>
                <td>
                  <div className="admin-nfts-token-id">
                    {nft.tokenId ? (
                      <>
                        <span className="admin-nfts-token-id-text">{nft.tokenId}</span>
                        <button className="admin-nfts-copy-btn">
                          <Copy className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <span className="admin-nfts-token-id-pending">Pending</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="admin-nfts-status">
                    {getStatusIcon(nft.status)}
                    <span className={getStatusBadge(nft.status)}>
                      {nft.status}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="admin-nfts-metadata">
                    <span className="admin-nfts-metadata-name">{nft.metadata.name}</span>
                    <p className="admin-nfts-metadata-description">{nft.metadata.description}</p>
                    <div className="admin-nfts-metadata-attributes">
                      <span className="admin-nfts-metadata-attribute">
                        {nft.metadata.attributes.documentType}
                      </span>
                      <span className="admin-nfts-metadata-attribute">
                        {nft.metadata.attributes.cargoValue}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="admin-nfts-minted-at">
                    {nft.mintedAt ? (
                      <>
                        <span>{new Date(nft.mintedAt).toLocaleDateString()}</span>
                        <span className="admin-nfts-minted-time">
                          {new Date(nft.mintedAt).toLocaleTimeString()}
                        </span>
                      </>
                    ) : (
                      <span className="admin-nfts-minted-pending">Not minted</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="admin-nfts-transaction">
                    {nft.transactionHash ? (
                      <>
                        <span className="admin-nfts-tx-hash">{nft.transactionHash}</span>
                        <div className="admin-nfts-tx-details">
                          <span>Block: {nft.blockNumber}</span>
                          <span>Gas: {nft.gasUsed}</span>
                        </div>
                      </>
                    ) : (
                      <span className="admin-nfts-tx-pending">Pending</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="admin-nfts-actions-cell">
                    <button
                      className="admin-nfts-action-btn small"
                      onClick={() => handleViewNFT(nft)}
                      title="View NFT Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {nft.status === 'minted' && (
                      <button
                        className="admin-nfts-action-btn small"
                        onClick={() => handleViewOnICP(nft)}
                        title="View on ICP"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      {selectedNFTs.length > 0 && (
        <div className="admin-nfts-bulk-actions">
          <span className="admin-nfts-bulk-text">
            {selectedNFTs.length} NFT(s) selected
          </span>
          <div className="admin-nfts-bulk-buttons">
            <button className="admin-nfts-bulk-btn">
              <Download className="w-4 h-4" />
              Export Selected
            </button>
            <button className="admin-nfts-bulk-btn">
              <ExternalLink className="w-4 h-4" />
              View on ICP
            </button>
          </div>
        </div>
      )}

      {/* NFT Analytics */}
      <div className="admin-nfts-analytics">
        <div className="admin-nfts-analytics-card">
          <div className="admin-nfts-analytics-header">
            <h3>NFT Minting Trends</h3>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="admin-nfts-analytics-content">
            <div className="admin-nfts-analytics-chart">
              <div className="admin-nfts-chart-placeholder">
                <BarChart3 className="w-16 h-16 text-gray-400" />
                <p>NFT minting trends chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-nfts-analytics-card">
          <div className="admin-nfts-analytics-header">
            <h3>Document Type Distribution</h3>
            <FileText className="w-5 h-5" />
          </div>
          <div className="admin-nfts-analytics-content">
            <div className="admin-nfts-document-distribution">
              <div className="admin-nfts-document-item">
                <span className="admin-nfts-document-label">Bill of Lading</span>
                <div className="admin-nfts-document-bar">
                  <div className="admin-nfts-document-bar-fill" style={{ width: '60%' }}></div>
                </div>
                <span className="admin-nfts-document-percentage">60%</span>
              </div>
              <div className="admin-nfts-document-item">
                <span className="admin-nfts-document-label">Certificate of Origin</span>
                <div className="admin-nfts-document-bar">
                  <div className="admin-nfts-document-bar-fill" style={{ width: '25%' }}></div>
                </div>
                <span className="admin-nfts-document-percentage">25%</span>
              </div>
              <div className="admin-nfts-document-item">
                <span className="admin-nfts-document-label">Commercial Invoice</span>
                <div className="admin-nfts-document-bar">
                  <div className="admin-nfts-document-bar-fill" style={{ width: '15%' }}></div>
                </div>
                <span className="admin-nfts-document-percentage">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNFTs;
