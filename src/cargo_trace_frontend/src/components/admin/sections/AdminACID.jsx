import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  Shield,
  Database,
  Globe,
  FileText,
  BarChart3,
  Settings
} from 'lucide-react';

const AdminACID = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedACIDs, setSelectedACIDs] = useState([]);

  // Mock data - in real app, this would come from API
  const acidRecords = [
    {
      id: 'ACID-2024-001',
      documentId: 'BL-2024-001',
      status: 'verified',
      company: 'ABC Trading Co.',
      acidNumber: 'EG-2024-001-123456',
      nafezaResponse: 'VALID',
      verificationTime: '2 minutes',
      createdAt: '2024-01-15T10:30:00Z',
      verifiedAt: '2024-01-15T10:32:00Z',
      description: 'Electronics shipment from China',
      customsValue: '$45,000',
      portOfEntry: 'Alexandria Port',
      verificationMethod: 'API'
    },
    {
      id: 'ACID-2024-002',
      documentId: 'BL-2024-002',
      status: 'pending',
      company: 'XYZ Import Ltd.',
      acidNumber: 'EG-2024-002-789012',
      nafezaResponse: 'PENDING',
      verificationTime: null,
      createdAt: '2024-01-15T11:15:00Z',
      verifiedAt: null,
      description: 'Textile shipment from India',
      customsValue: '$32,500',
      portOfEntry: 'Suez Canal',
      verificationMethod: 'Manual'
    },
    {
      id: 'ACID-2024-003',
      documentId: 'BL-2024-003',
      status: 'rejected',
      company: 'DEF Export Co.',
      acidNumber: 'EG-2024-003-345678',
      nafezaResponse: 'INVALID',
      verificationTime: '5 minutes',
      createdAt: '2024-01-15T09:45:00Z',
      verifiedAt: '2024-01-15T09:50:00Z',
      description: 'Agricultural products from Egypt',
      customsValue: '$28,750',
      portOfEntry: 'Damietta Port',
      verificationMethod: 'API',
      rejectionReason: 'Document mismatch with customs records'
    },
    {
      id: 'ACID-2024-004',
      documentId: 'BL-2024-004',
      status: 'verified',
      company: 'GHI Trading Ltd.',
      acidNumber: 'EG-2024-004-901234',
      nafezaResponse: 'VALID',
      verificationTime: '1 minute',
      createdAt: '2024-01-15T08:20:00Z',
      verifiedAt: '2024-01-15T08:21:00Z',
      description: 'Coffee beans from Ethiopia',
      customsValue: '$15,200',
      portOfEntry: 'Port Said',
      verificationMethod: 'API'
    }
  ];

  const nafezaStatus = {
    apiStatus: 'online',
    lastSync: '5 minutes ago',
    responseTime: '45ms',
    uptime: '99.5%',
    totalRequests: '1,234',
    successRate: '98.2%',
    errorRate: '1.8%'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getNafezaResponseBadge = (response) => {
    const responseClasses = {
      VALID: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      INVALID: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${responseClasses[response] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleVerifyACID = (acidId) => {
    console.log('Verifying ACID:', acidId);
  };

  const handleRejectACID = (acidId) => {
    console.log('Rejecting ACID:', acidId);
  };

  const handleViewACID = (acid) => {
    console.log('Viewing ACID:', acid);
  };

  const filteredACIDs = acidRecords.filter(acid => {
    const matchesSearch = acid.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         acid.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         acid.acidNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || acid.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalACIDs = acidRecords.length;
  const verifiedACIDs = acidRecords.filter(acid => acid.status === 'verified').length;
  const pendingACIDs = acidRecords.filter(acid => acid.status === 'pending').length;
  const rejectedACIDs = acidRecords.filter(acid => acid.status === 'rejected').length;

  return (
    <div className="admin-acid">
      {/* Header */}
      <div className="admin-acid-header">
        <div className="admin-acid-title">
          <h2>ACID Verification</h2>
          <p>Manage Advanced Cargo Information Declaration verification and NAFEZA system integration</p>
        </div>
        <div className="admin-acid-actions">
          <button className="admin-acid-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="admin-acid-action-btn">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* NAFEZA Status */}
      <div className="admin-acid-nafeza-status">
        <div className="admin-acid-nafeza-card">
          <div className="admin-acid-nafeza-header">
            <Shield className="w-6 h-6" />
            <h3>NAFEZA System Status</h3>
          </div>
          <div className="admin-acid-nafeza-metrics">
            <div className="admin-acid-nafeza-metric">
              <span className="admin-acid-nafeza-label">API Status</span>
              <div className="admin-acid-nafeza-status-indicator">
                <div className="admin-acid-nafeza-status-dot online"></div>
                <span className="admin-acid-nafeza-status-text">{nafezaStatus.apiStatus}</span>
              </div>
            </div>
            <div className="admin-acid-nafeza-metric">
              <span className="admin-acid-nafeza-label">Response Time</span>
              <span className="admin-acid-nafeza-value">{nafezaStatus.responseTime}</span>
            </div>
            <div className="admin-acid-nafeza-metric">
              <span className="admin-acid-nafeza-label">Success Rate</span>
              <span className="admin-acid-nafeza-value">{nafezaStatus.successRate}</span>
            </div>
            <div className="admin-acid-nafeza-metric">
              <span className="admin-acid-nafeza-label">Last Sync</span>
              <span className="admin-acid-nafeza-value">{nafezaStatus.lastSync}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-acid-filters">
        <div className="admin-acid-search">
          <Search className="admin-acid-search-icon" />
          <input
            type="text"
            placeholder="Search ACID records by ID, company, or ACID number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-acid-search-input"
          />
        </div>
        <div className="admin-acid-filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-acid-status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="admin-acid-filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-acid-stats">
        <div className="admin-acid-stat-card">
          <div className="admin-acid-stat-icon">
            <FileText className="w-6 h-6" />
          </div>
          <div className="admin-acid-stat-content">
            <div className="admin-acid-stat-value">{totalACIDs}</div>
            <div className="admin-acid-stat-label">Total ACID Records</div>
          </div>
        </div>
        <div className="admin-acid-stat-card">
          <div className="admin-acid-stat-icon verified">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="admin-acid-stat-content">
            <div className="admin-acid-stat-value">{verifiedACIDs}</div>
            <div className="admin-acid-stat-label">Verified</div>
          </div>
        </div>
        <div className="admin-acid-stat-card">
          <div className="admin-acid-stat-icon pending">
            <Clock className="w-6 h-6" />
          </div>
          <div className="admin-acid-stat-content">
            <div className="admin-acid-stat-value">{pendingACIDs}</div>
            <div className="admin-acid-stat-label">Pending</div>
          </div>
        </div>
        <div className="admin-acid-stat-card">
          <div className="admin-acid-stat-icon rejected">
            <XCircle className="w-6 h-6" />
          </div>
          <div className="admin-acid-stat-content">
            <div className="admin-acid-stat-value">{rejectedACIDs}</div>
            <div className="admin-acid-stat-label">Rejected</div>
          </div>
        </div>
      </div>

      {/* ACID Records Table */}
      <div className="admin-acid-table-container">
        <table className="admin-acid-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedACIDs(filteredACIDs.map(a => a.id));
                    } else {
                      setSelectedACIDs([]);
                    }
                  }}
                />
              </th>
              <th>ACID ID</th>
              <th>Document ID</th>
              <th>Company</th>
              <th>ACID Number</th>
              <th>Status</th>
              <th>NAFEZA Response</th>
              <th>Verification Time</th>
              <th>Port of Entry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredACIDs.map((acid) => (
              <tr key={acid.id} className="admin-acid-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedACIDs.includes(acid.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedACIDs([...selectedACIDs, acid.id]);
                      } else {
                        setSelectedACIDs(selectedACIDs.filter(id => id !== acid.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <div className="admin-acid-id">
                    <span className="admin-acid-id-text">{acid.id}</span>
                    <button className="admin-acid-copy-btn">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td>
                  <span className="admin-acid-document-id">{acid.documentId}</span>
                </td>
                <td>
                  <div className="admin-acid-company">
                    <span>{acid.company}</span>
                    <p className="admin-acid-description">{acid.description}</p>
                  </div>
                </td>
                <td>
                  <div className="admin-acid-number">
                    <span>{acid.acidNumber}</span>
                    <button className="admin-acid-copy-btn">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="admin-acid-status">
                    {getStatusIcon(acid.status)}
                    <span className={getStatusBadge(acid.status)}>
                      {acid.status}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={getNafezaResponseBadge(acid.nafezaResponse)}>
                    {acid.nafezaResponse}
                  </span>
                </td>
                <td>
                  <div className="admin-acid-verification">
                    <span className="admin-acid-verification-time">
                      {acid.verificationTime || 'N/A'}
                    </span>
                    <span className="admin-acid-verification-method">
                      {acid.verificationMethod}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="admin-acid-port">{acid.portOfEntry}</span>
                </td>
                <td>
                  <div className="admin-acid-actions-cell">
                    <button
                      className="admin-acid-action-btn small"
                      onClick={() => handleViewACID(acid)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {acid.status === 'pending' && (
                      <>
                        <button
                          className="admin-acid-action-btn small success"
                          onClick={() => handleVerifyACID(acid.id)}
                          title="Verify ACID"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          className="admin-acid-action-btn small danger"
                          onClick={() => handleRejectACID(acid.id)}
                          title="Reject ACID"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      className="admin-acid-action-btn small"
                      title="View in NAFEZA"
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

      {/* Bulk Actions */}
      {selectedACIDs.length > 0 && (
        <div className="admin-acid-bulk-actions">
          <span className="admin-acid-bulk-text">
            {selectedACIDs.length} ACID record(s) selected
          </span>
          <div className="admin-acid-bulk-buttons">
            <button className="admin-acid-bulk-btn success">
              <CheckCircle className="w-4 h-4" />
              Verify Selected
            </button>
            <button className="admin-acid-bulk-btn danger">
              <XCircle className="w-4 h-4" />
              Reject Selected
            </button>
            <button className="admin-acid-bulk-btn">
              <Download className="w-4 h-4" />
              Export Selected
            </button>
          </div>
        </div>
      )}

      {/* Verification Analytics */}
      <div className="admin-acid-analytics">
        <div className="admin-acid-analytics-card">
          <div className="admin-acid-analytics-header">
            <h3>Verification Performance</h3>
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="admin-acid-analytics-content">
            <div className="admin-acid-analytics-chart">
              <div className="admin-acid-chart-placeholder">
                <BarChart3 className="w-16 h-16 text-gray-400" />
                <p>Verification performance chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-acid-analytics-card">
          <div className="admin-acid-analytics-header">
            <h3>Port Distribution</h3>
            <Globe className="w-5 h-5" />
          </div>
          <div className="admin-acid-analytics-content">
            <div className="admin-acid-port-distribution">
              <div className="admin-acid-port-item">
                <span className="admin-acid-port-label">Alexandria Port</span>
                <div className="admin-acid-port-bar">
                  <div className="admin-acid-port-bar-fill" style={{ width: '40%' }}></div>
                </div>
                <span className="admin-acid-port-percentage">40%</span>
              </div>
              <div className="admin-acid-port-item">
                <span className="admin-acid-port-label">Suez Canal</span>
                <div className="admin-acid-port-bar">
                  <div className="admin-acid-port-bar-fill" style={{ width: '30%' }}></div>
                </div>
                <span className="admin-acid-port-percentage">30%</span>
              </div>
              <div className="admin-acid-port-item">
                <span className="admin-acid-port-label">Damietta Port</span>
                <div className="admin-acid-port-bar">
                  <div className="admin-acid-port-bar-fill" style={{ width: '20%' }}></div>
                </div>
                <span className="admin-acid-port-percentage">20%</span>
              </div>
              <div className="admin-acid-port-item">
                <span className="admin-acid-port-label">Port Said</span>
                <div className="admin-acid-port-bar">
                  <div className="admin-acid-port-bar-fill" style={{ width: '10%' }}></div>
                </div>
                <span className="admin-acid-port-percentage">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminACID;
