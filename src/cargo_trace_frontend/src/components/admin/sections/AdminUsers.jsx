import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  Mail,
  Phone,
  Globe,
  Building,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  FileText
} from 'lucide-react';

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock data - in real app, this would come from API
  const users = [
    {
      id: 'USR-001',
      name: 'ABC Trading Co.',
      type: 'Importer',
      status: 'active',
      email: 'contact@abctrading.com',
      phone: '+20 123 456 789',
      country: 'Egypt',
      registrationDate: '2024-01-01T00:00:00Z',
      lastLogin: '2024-01-15T10:30:00Z',
      documentsCount: 5,
      loansCount: 2,
      totalLoanAmount: '$45,000',
      kycStatus: 'verified',
      complianceScore: 'A+'
    },
    {
      id: 'USR-002',
      name: 'XYZ Import Ltd.',
      type: 'Importer',
      status: 'pending',
      email: 'info@xyzimport.com',
      phone: '+20 987 654 321',
      country: 'Egypt',
      registrationDate: '2024-01-10T00:00:00Z',
      lastLogin: '2024-01-15T11:15:00Z',
      documentsCount: 2,
      loansCount: 1,
      totalLoanAmount: '$32,500',
      kycStatus: 'pending',
      complianceScore: 'B'
    },
    {
      id: 'USR-003',
      name: 'DEF Export Co.',
      type: 'Exporter',
      status: 'suspended',
      email: 'sales@defexport.com',
      phone: '+20 555 123 456',
      country: 'Egypt',
      registrationDate: '2024-01-05T00:00:00Z',
      lastLogin: '2024-01-14T09:45:00Z',
      documentsCount: 3,
      loansCount: 0,
      totalLoanAmount: '$0',
      kycStatus: 'rejected',
      complianceScore: 'C',
      suspensionReason: 'Document verification failed'
    },
    {
      id: 'USR-004',
      name: 'GHI Trading Ltd.',
      type: 'Importer',
      status: 'active',
      email: 'trading@ghitrading.com',
      phone: '+20 777 888 999',
      country: 'Egypt',
      registrationDate: '2024-01-08T00:00:00Z',
      lastLogin: '2024-01-15T08:20:00Z',
      documentsCount: 4,
      loansCount: 1,
      totalLoanAmount: '$15,200',
      kycStatus: 'verified',
      complianceScore: 'A'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'suspended':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getKycStatusBadge = (kycStatus) => {
    const kycClasses = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${kycClasses[kycStatus] || 'bg-gray-100 text-gray-800'}`;
  };

  const handleViewUser = (user) => {
    console.log('Viewing user:', user);
  };

  const handleEditUser = (user) => {
    console.log('Editing user:', user);
  };

  const handleDeleteUser = (userId) => {
    console.log('Deleting user:', userId);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const pendingUsers = users.filter(user => user.status === 'pending').length;
  const totalLoanVolume = users.reduce((sum, user) => sum + parseFloat(user.totalLoanAmount.replace('$', '').replace(',', '')), 0);

  return (
    <div className="admin-users">
      {/* Header */}
      <div className="admin-users-header">
        <div className="admin-users-title">
          <h2>User Management</h2>
          <p>Manage importers, exporters, and user accounts on the platform</p>
        </div>
        <div className="admin-users-actions">
          <button className="admin-users-action-btn primary">
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
          <button className="admin-users-action-btn">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-users-filters">
        <div className="admin-users-search">
          <Search className="admin-users-search-icon" />
          <input
            type="text"
            placeholder="Search users by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-users-search-input"
          />
        </div>
        <div className="admin-users-filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-users-status-filter"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="admin-users-filter-btn">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-users-stats">
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-icon">
            <Users className="w-6 h-6" />
          </div>
          <div className="admin-users-stat-content">
            <div className="admin-users-stat-value">{totalUsers}</div>
            <div className="admin-users-stat-label">Total Users</div>
          </div>
        </div>
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-icon active">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="admin-users-stat-content">
            <div className="admin-users-stat-value">{activeUsers}</div>
            <div className="admin-users-stat-label">Active Users</div>
          </div>
        </div>
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-icon pending">
            <Clock className="w-6 h-6" />
          </div>
          <div className="admin-users-stat-content">
            <div className="admin-users-stat-value">{pendingUsers}</div>
            <div className="admin-users-stat-label">Pending Approval</div>
          </div>
        </div>
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-icon">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="admin-users-stat-content">
            <div className="admin-users-stat-value">${totalLoanVolume.toLocaleString()}</div>
            <div className="admin-users-stat-label">Total Loan Volume</div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-users-table-container">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(filteredUsers.map(u => u.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </th>
              <th>User ID</th>
              <th>Company Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Contact</th>
              <th>KYC Status</th>
              <th>Activity</th>
              <th>Compliance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="admin-users-table-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <span className="admin-users-id">{user.id}</span>
                </td>
                <td>
                  <div className="admin-users-company">
                    <span className="admin-users-name">{user.name}</span>
                    <span className="admin-users-country">{user.country}</span>
                  </div>
                </td>
                <td>
                  <span className={`admin-users-type ${user.type.toLowerCase()}`}>
                    {user.type}
                  </span>
                </td>
                <td>
                  <div className="admin-users-status">
                    {getStatusIcon(user.status)}
                    <span className={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="admin-users-contact">
                    <div className="admin-users-email">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                    <div className="admin-users-phone">
                      <Phone className="w-3 h-3" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={getKycStatusBadge(user.kycStatus)}>
                    {user.kycStatus}
                  </span>
                </td>
                <td>
                  <div className="admin-users-activity">
                    <div className="admin-users-activity-item">
                      <FileText className="w-3 h-3" />
                      <span>{user.documentsCount} docs</span>
                    </div>
                    <div className="admin-users-activity-item">
                      <DollarSign className="w-3 h-3" />
                      <span>{user.loansCount} loans</span>
                    </div>
                    <div className="admin-users-last-login">
                      Last: {new Date(user.lastLogin).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="admin-users-compliance">
                    <span className={`admin-users-compliance-score ${user.complianceScore}`}>
                      {user.complianceScore}
                    </span>
                    <span className="admin-users-total-amount">
                      {user.totalLoanAmount}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="admin-users-actions-cell">
                    <button
                      className="admin-users-action-btn small"
                      onClick={() => handleViewUser(user)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="admin-users-action-btn small"
                      onClick={() => handleEditUser(user)}
                      title="Edit User"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="admin-users-action-btn small danger"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="admin-users-bulk-actions">
          <span className="admin-users-bulk-text">
            {selectedUsers.length} user(s) selected
          </span>
          <div className="admin-users-bulk-buttons">
            <button className="admin-users-bulk-btn success">
              <CheckCircle className="w-4 h-4" />
              Activate Selected
            </button>
            <button className="admin-users-bulk-btn warning">
              <Clock className="w-4 h-4" />
              Suspend Selected
            </button>
            <button className="admin-users-bulk-btn">
              <Mail className="w-4 h-4" />
              Send Message
            </button>
            <button className="admin-users-bulk-btn">
              <Download className="w-4 h-4" />
              Export Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
