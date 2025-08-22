import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Download,
  Eye,
  ExternalLink,
  Filter,
  BarChart3,
  Settings,
  Shield,
  Database,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const AdminAcid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAcids, setSelectedAcids] = useState([]);

  // Mock data - in real app, this would come from API
  const acidValidations = [
    {
      id: 'ACID-2024-001',
      acidNumber: '123456789',
      status: 'validated',
      company: 'ABC Trading Co.',
      documentType: 'Bill of Lading',
      customsData: {
        importer: 'ABC Trading Co.',
        exporter: 'China Electronics Ltd.',
        goods: 'Electronics',
        value: '$45,000',
        origin: 'China',
        destination: 'Egypt'
      },
      validationDate: '2024-01-15T10:35:00Z',
      validatedBy: 'NAFEZA System',
      confidence: 98.5,
      nafezaResponse: 'success',
      documentId: 'BL-2024-001'
    },
    {
      id: 'ACID-2024-002',
      acidNumber: '987654321',
      status: 'pending',
      company: 'XYZ Import Ltd.',
      documentType: 'Bill of Lading',
      customsData: {
        importer: 'XYZ Import Ltd.',
        exporter: 'India Textiles Ltd.',
        goods: 'Textiles',
        value: '$32,500',
        origin: 'India',
        destination: 'Egypt'
      },
      validationDate: null,
      validatedBy: null,
      confidence: null,
      nafezaResponse: 'pending',
      documentId: 'BL-2024-002'
    },
    {
      id: 'ACID-2024-003',
      acidNumber: '456789123',
      status: 'failed',
      company: 'DEF Export Co.',
      documentType: 'Bill of Lading',
      customsData: {
        importer: 'DEF Export Co.',
        exporter: 'Egypt Agricultural Ltd.',
        goods: 'Agricultural Products',
        value: '$28,750',
        origin: 'Egypt',
        destination: 'Saudi Arabia'
      },
      validationDate: '2024-01-15T09:45:00Z',
      validatedBy: 'NAFEZA System',
      confidence: 0,
      nafezaResponse: 'failed',
      documentId: 'BL-2024-003',
      failureReason: 'Invalid ACID number format'
    }
  ];

  const acidStats = {
    total: acidValidations.length,
    validated: acidValidations.filter(a => a.status === 'validated').length,
    pending: acidValidations.filter(a => a.status === 'pending').length,
    failed: acidValidations.filter(a => a.status === 'failed').length,
    successRate: 85.7,
    averageConfidence: 92.3,
    lastSync: '5 minutes ago',
    nafezaStatus: 'online'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'validated':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      validated: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getConfidenceBadge = (confidence) => {
    if (!confidence) return null;
    
    let colorClass = 'bg-red-100 text-red-800';
    if (confidence >= 90) {
      colorClass = 'bg-green-100 text-green-800';
    } else if (confidence >= 70) {
      colorClass = 'bg-yellow-100 text-yellow-800';
    }
    
    return `px-2 py-1 rounded-full text-xs font-medium ${colorClass}`;
  };

  const handleViewAcid = (acid) => {
    console.log('Viewing ACID:', acid);
  };

  const handleRetryValidation = (acid) => {
    console.log('Retrying validation for:', acid);
  };

  const filteredAcids = acidValidations.filter(acid => {
    const matchesSearch = acid.acidNumber.includes(searchQuery) ||
                         acid.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         acid.documentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || acid.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-acid">
      {/* Header */}
      <div className="admin-acid-header">
        <div className="admin-acid-title">
          <h2>ACID Verification</h2>
          <p>Manage Advanced Cargo Information Declaration verification and NAFEZA integration</p>
        </div>
        <div className="admin-acid-actions">
          <button className="admin-acid-action-btn">
            <RefreshCw className="w-4 h-4" />
            Sync NAFEZA
          </button>
          <button className="admin-acid-action-btn">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="admin-acid-action-btn">
            <Settings className="w-4 h-4" />
            Configure
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-acid-stats">
        <div className="admin-acid-stat-card">
          <div className="admin-acid-stat-icon">
            <Search className="w-6 h-6" />
          </div>
          <div className="admin-acid-stat-content">
            <div className="admin-acid-stat-value">{acidStats.total}</div>
            <div className="admin-acid-stat-label">Total ACID Numbers</div>
          </div>
        </div>
        <div className="admin-acid-stat-card">
          <div className="admin-acid-stat-icon validated">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="admin-acid-stat-content">
            <div className="admin-acid-stat-value">{acidStats.validated}</div>
            <div className="admin-acid-stat-label">Validated</div>
          </div>
        </div>
        <div className="admin-acid-stat-card">
          <div className="admin-acid-stat-icon pending">
            <Clock className="w-6 h-6" />
          </div>
          <div className="admin-acid-stat-content">
            <div className="admin-acid-stat-value">{acidStats.pending}</div>
            <div className="admin-acid-stat-label">Pending</div>
          </div>
        </div>
        <div className="admin-acid-stat-card">
          <div className="admin-acid-stat-icon">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div className="admin-acid-stat-content">
            <div className="admin-acid-stat-value">{acidStats.successRate}%</div>
            <div className="admin-acid-stat-label">Success Rate</div>
          </div>
        </div>
      </div>

      {/* NAFEZA Status */}
      <div className="admin-acid-nafeza-status">
        <div className="admin-acid-nafeza-card">
          <div className="admin-acid-nafeza-header">
            <Shield className="w-5 h-5" />
            <span>NAFEZA Integration Status</span>
          </div>
          <div className="admin-acid-nafeza-details">
            <div className="admin-acid-nafeza-status-item">
              <span className="admin-acid-nafeza-label">Status:</span>
              <span className="admin-acid-nafeza-value online">Online</span>
            </div>
            <div className="admin-acid-nafeza-status-item">
              <span className="admin-acid-nafeza-label">Last Sync:</span>
              <span className="admin-acid-nafeza-value">{acidStats.lastSync}</span>
            </div>
            <div className="admin-acid-nafeza-status-item">
              <span className="admin-acid-nafeza-label">API Response:</span>
              <span className="admin-acid-nafeza-value">200 OK</span>
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
            placeholder="Search by ACID number, company, or document ID..."
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
            <option value="validated">Validated</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button className="admin-acid-filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* ACID Validations Table */}
      <div className="admin-acid-table-container">
        <table className="admin-acid-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAcids(filteredAcids.map(a => a.id));
                    } else {
                      setSelectedAcids([]);
                    }
                  }}
                />
              </th>
              <th>ACID Number</th>
              <th>Company</th>
              <th>Document</th>
              <th>Status</th>
              <th>Confidence</th>
              <th>NAFEZA Response</th>
              <th>Validation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAcids.map((acid) => (
              <tr key={acid.id} className="admin-acid-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAcids.includes(acid.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAcids([...selectedAcids, acid.id]);
                      } else {
                        setSelectedAcids(selectedAcids.filter(id => id !== acid.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <div className="admin-acid-number">
                    <span className="admin-acid-number-text">{acid.acidNumber}</span>
                    <span className="admin-acid-id">({acid.id})</span>
                  </div>
                </td>
                <td>
                  <div className="admin-acid-company">
                    <span className="admin-acid-company-name">{acid.company}</span>
                    <span className="admin-acid-document-type">{acid.documentType}</span>
                  </div>
                </td>
                <td>
                  <span className="admin-acid-document-id">{acid.documentId}</span>
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
                  {acid.confidence ? (
                    <span className={getConfidenceBadge(acid.confidence)}>
                      {acid.confidence}%
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td>
                  <div className="admin-acid-nafeza-response">
                    <span className={`admin-acid-response-badge ${acid.nafezaResponse}`}>
                      {acid.nafezaResponse}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="admin-acid-date">
                    {acid.validationDate ? (
                      <>
                        <span>{new Date(acid.validationDate).toLocaleDateString()}</span>
                        <span className="admin-acid-time">
                          {new Date(acid.validationDate).toLocaleTimeString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400">Pending</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="admin-acid-actions-cell">
                    <button
                      className="admin-acid-action-btn small"
                      onClick={() => handleViewAcid(acid)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {acid.status === 'failed' && (
                      <button
                        className="admin-acid-action-btn small"
                        onClick={() => handleRetryValidation(acid)}
                        title="Retry Validation"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      className="admin-acid-action-btn small"
                      title="View on NAFEZA"
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
      {selectedAcids.length > 0 && (
        <div className="admin-acid-bulk-actions">
          <span className="admin-acid-bulk-text">
            {selectedAcids.length} ACID number(s) selected
          </span>
          <div className="admin-acid-bulk-buttons">
            <button className="admin-acid-bulk-btn">
              <RefreshCw className="w-4 h-4" />
              Retry Selected
            </button>
            <button className="admin-acid-bulk-btn">
              <Download className="w-4 h-4" />
              Export Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAcid;
