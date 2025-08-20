import React, { useState } from 'react';
import {
  FileCheck,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  BarChart3,
  Calendar,
  Users,
  Activity,
  Shield,
  Database
} from 'lucide-react';

const AdminAudit = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedLogs, setSelectedLogs] = useState([]);

  // Mock data - in real app, this would come from API
  const auditLogs = [
    {
      id: 'AUDIT-001',
      timestamp: '2024-01-15T10:35:00Z',
      level: 'info',
      category: 'document_verification',
      action: 'Document verified',
      user: 'admin@cargotrace.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      details: {
        documentId: 'BL-2024-001',
        company: 'ABC Trading Co.',
        acidNumber: 'ACID-2024-001',
        result: 'VERIFIED'
      },
      sessionId: 'sess_123456789',
      requestId: 'req_987654321'
    },
    {
      id: 'AUDIT-002',
      timestamp: '2024-01-15T10:30:00Z',
      level: 'warning',
      category: 'loan_approval',
      action: 'Loan approval pending',
      user: 'admin@cargotrace.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      details: {
        loanId: 'LR-2024-002',
        company: 'XYZ Import Ltd.',
        amount: '$32,500',
        reason: 'Manual review required'
      },
      sessionId: 'sess_123456789',
      requestId: 'req_987654322'
    },
    {
      id: 'AUDIT-003',
      timestamp: '2024-01-15T10:25:00Z',
      level: 'error',
      category: 'blockchain_sync',
      action: 'Blockchain sync failed',
      user: 'system@cargotrace.com',
      ipAddress: '10.0.0.1',
      userAgent: 'CargoTrace-System/2.1.0',
      details: {
        network: 'Ethereum',
        error: 'Connection timeout',
        retryCount: 3
      },
      sessionId: 'sess_system_001',
      requestId: 'req_system_001'
    },
    {
      id: 'AUDIT-004',
      timestamp: '2024-01-15T10:20:00Z',
      level: 'info',
      category: 'user_management',
      action: 'User login',
      user: 'user@abctrading.com',
      ipAddress: '203.0.113.45',
      userAgent: 'Mozilla/5.0...',
      details: {
        userId: 'USR-001',
        company: 'ABC Trading Co.',
        loginMethod: 'email'
      },
      sessionId: 'sess_user_001',
      requestId: 'req_user_001'
    },
    {
      id: 'AUDIT-005',
      timestamp: '2024-01-15T10:15:00Z',
      level: 'success',
      category: 'nft_minting',
      action: 'NFT minted successfully',
      user: 'system@cargotrace.com',
      ipAddress: '10.0.0.1',
      userAgent: 'CargoTrace-System/2.1.0',
      details: {
        nftId: 'NFT-001',
        documentId: 'BL-2024-001',
        transactionHash: '0x5678...9012',
        gasUsed: '120,000'
      },
      sessionId: 'sess_system_002',
      requestId: 'req_system_002'
    }
  ];

  const auditStats = {
    totalLogs: '1,234',
    todayLogs: '45',
    errorLogs: '12',
    warningLogs: '23',
    infoLogs: '1,199',
    successLogs: '1,187'
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'info':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getLevelBadge = (level) => {
    const levelClasses = {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      success: 'bg-green-100 text-green-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${levelClasses[level] || 'bg-gray-100 text-gray-800'}`;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'document_verification':
        return <FileCheck className="w-4 h-4" />;
      case 'loan_approval':
        return <Database className="w-4 h-4" />;
      case 'blockchain_sync':
        return <Activity className="w-4 h-4" />;
      case 'user_management':
        return <Users className="w-4 h-4" />;
      case 'nft_minting':
        return <Shield className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const handleViewLog = (log) => {
    console.log('Viewing log:', log);
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="admin-audit">
      {/* Header */}
      <div className="admin-audit-header">
        <div className="admin-audit-title">
          <h2>Audit Logs</h2>
          <p>Track and monitor system activity, user actions, and security events</p>
        </div>
        <div className="admin-audit-actions">
          <button className="admin-audit-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="admin-audit-action-btn">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="admin-audit-stats">
        <div className="admin-audit-stat-card">
          <div className="admin-audit-stat-icon">
            <FileCheck className="w-6 h-6" />
          </div>
          <div className="admin-audit-stat-content">
            <div className="admin-audit-stat-value">{auditStats.totalLogs}</div>
            <div className="admin-audit-stat-label">Total Logs</div>
          </div>
        </div>
        <div className="admin-audit-stat-card">
          <div className="admin-audit-stat-icon today">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="admin-audit-stat-content">
            <div className="admin-audit-stat-value">{auditStats.todayLogs}</div>
            <div className="admin-audit-stat-label">Today</div>
          </div>
        </div>
        <div className="admin-audit-stat-card">
          <div className="admin-audit-stat-icon error">
            <XCircle className="w-6 h-6" />
          </div>
          <div className="admin-audit-stat-content">
            <div className="admin-audit-stat-value">{auditStats.errorLogs}</div>
            <div className="admin-audit-stat-label">Errors</div>
          </div>
        </div>
        <div className="admin-audit-stat-card">
          <div className="admin-audit-stat-icon warning">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="admin-audit-stat-content">
            <div className="admin-audit-stat-value">{auditStats.warningLogs}</div>
            <div className="admin-audit-stat-label">Warnings</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-audit-filters">
        <div className="admin-audit-search">
          <Search className="admin-audit-search-icon" />
          <input
            type="text"
            placeholder="Search logs by ID, action, user, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-audit-search-input"
          />
        </div>
        <div className="admin-audit-filter-controls">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="admin-audit-level-filter"
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="success">Success</option>
          </select>
          <button className="admin-audit-filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="admin-audit-table-container">
        <table className="admin-audit-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLogs(filteredLogs.map(l => l.id));
                    } else {
                      setSelectedLogs([]);
                    }
                  }}
                />
              </th>
              <th>Log ID</th>
              <th>Timestamp</th>
              <th>Level</th>
              <th>Category</th>
              <th>Action</th>
              <th>User</th>
              <th>IP Address</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="admin-audit-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedLogs.includes(log.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLogs([...selectedLogs, log.id]);
                      } else {
                        setSelectedLogs(selectedLogs.filter(id => id !== log.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <span className="admin-audit-id">{log.id}</span>
                </td>
                <td>
                  <div className="admin-audit-timestamp">
                    <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                    <span className="admin-audit-time">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="admin-audit-level">
                    {getLevelIcon(log.level)}
                    <span className={getLevelBadge(log.level)}>
                      {log.level}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="admin-audit-category">
                    {getCategoryIcon(log.category)}
                    <span className="admin-audit-category-text">
                      {log.category.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="admin-audit-action">{log.action}</span>
                </td>
                <td>
                  <div className="admin-audit-user">
                    <span className="admin-audit-user-email">{log.user}</span>
                    <span className="admin-audit-session">Session: {log.sessionId}</span>
                  </div>
                </td>
                <td>
                  <div className="admin-audit-ip">
                    <span className="admin-audit-ip-address">{log.ipAddress}</span>
                    <span className="admin-audit-user-agent">{log.userAgent.substring(0, 30)}...</span>
                  </div>
                </td>
                <td>
                  <div className="admin-audit-details">
                    {Object.entries(log.details).map(([key, value]) => (
                      <div key={key} className="admin-audit-detail-item">
                        <span className="admin-audit-detail-key">{key}:</span>
                        <span className="admin-audit-detail-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="admin-audit-actions-cell">
                    <button
                      className="admin-audit-action-btn small"
                      onClick={() => handleViewLog(log)}
                      title="View Log Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      {selectedLogs.length > 0 && (
        <div className="admin-audit-bulk-actions">
          <span className="admin-audit-bulk-text">
            {selectedLogs.length} log(s) selected
          </span>
          <div className="admin-audit-bulk-buttons">
            <button className="admin-audit-bulk-btn">
              <Download className="w-4 h-4" />
              Export Selected
            </button>
            <button className="admin-audit-bulk-btn">
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Audit Analytics */}
      <div className="admin-audit-analytics">
        <div className="admin-audit-analytics-card">
          <div className="admin-audit-analytics-header">
            <h3>Activity Trends</h3>
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="admin-audit-analytics-content">
            <div className="admin-audit-analytics-chart">
              <div className="admin-audit-chart-placeholder">
                <BarChart3 className="w-16 h-16 text-gray-400" />
                <p>Activity trends chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-audit-analytics-card">
          <div className="admin-audit-analytics-header">
            <h3>Category Distribution</h3>
            <Activity className="w-5 h-5" />
          </div>
          <div className="admin-audit-analytics-content">
            <div className="admin-audit-category-distribution">
              <div className="admin-audit-category-item">
                <span className="admin-audit-category-label">Document Verification</span>
                <div className="admin-audit-category-bar">
                  <div className="admin-audit-category-bar-fill" style={{ width: '40%' }}></div>
                </div>
                <span className="admin-audit-category-percentage">40%</span>
              </div>
              <div className="admin-audit-category-item">
                <span className="admin-audit-category-label">User Management</span>
                <div className="admin-audit-category-bar">
                  <div className="admin-audit-category-bar-fill" style={{ width: '30%' }}></div>
                </div>
                <span className="admin-audit-category-percentage">30%</span>
              </div>
              <div className="admin-audit-category-item">
                <span className="admin-audit-category-label">Loan Approval</span>
                <div className="admin-audit-category-bar">
                  <div className="admin-audit-category-bar-fill" style={{ width: '20%' }}></div>
                </div>
                <span className="admin-audit-category-percentage">20%</span>
              </div>
              <div className="admin-audit-category-item">
                <span className="admin-audit-category-label">Blockchain Sync</span>
                <div className="admin-audit-category-bar">
                  <div className="admin-audit-category-bar-fill" style={{ width: '10%' }}></div>
                </div>
                <span className="admin-audit-category-percentage">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAudit;
