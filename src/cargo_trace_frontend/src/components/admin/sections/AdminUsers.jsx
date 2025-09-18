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
  Building,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Mock data - in real app, this would come from API
  const users = [
    {
      id: 'USR-001',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@egyptiantrading.com',
      phone: '+20 123 456 789',
      company: 'Egyptian Trading Co.',
      role: 'admin',
      status: 'active',
      documents: 15,
      loans: 8,
      joinedAt: '2024-01-15T10:30:00Z',
      lastActive: '2024-01-20T14:25:00Z',
      verified: true
    },
    {
      id: 'USR-002',
      name: 'Fatima Ali',
      email: 'fatima.ali@mediterranean.com',
      phone: '+20 987 654 321',
      company: 'Mediterranean Exports',
      role: 'user',
      status: 'active',
      documents: 8,
      loans: 3,
      joinedAt: '2024-01-10T09:15:00Z',
      lastActive: '2024-01-20T16:45:00Z',
      verified: true
    },
    {
      id: 'USR-003',
      name: 'Omar Khalil',
      email: 'omar.khalil@nileimport.com',
      phone: '+20 555 123 456',
      company: 'Nile Import Ltd.',
      role: 'user',
      status: 'pending',
      documents: 3,
      loans: 0,
      joinedAt: '2024-01-18T11:20:00Z',
      lastActive: '2024-01-19T10:30:00Z',
      verified: false
    },
    {
      id: 'USR-004',
      name: 'Layla Mahmoud',
      email: 'layla.mahmoud@redsea.com',
      phone: '+20 777 888 999',
      company: 'Red Sea Trading',
      role: 'user',
      status: 'suspended',
      documents: 12,
      loans: 5,
      joinedAt: '2024-01-05T14:45:00Z',
      lastActive: '2024-01-15T08:20:00Z',
      verified: true
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 admin-icon-active" />;
      case 'pending':
        return <Clock className="w-4 h-4 admin-icon-pending" />;
      case 'suspended':
        return <XCircle className="w-4 h-4 admin-icon-suspended" />;
      default:
        return <AlertTriangle className="w-4 h-4 admin-icon-default" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'admin-status-active',
      pending: 'admin-status-pending',
      suspended: 'admin-status-suspended'
    };
    return `admin-status-badge ${statusClasses[status] || 'admin-status-default'}`;
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      admin: 'admin-role-admin',
      user: 'admin-role-user',
      moderator: 'admin-role-moderator'
    };
    return `admin-role-badge ${roleClasses[role] || 'admin-role-default'}`;
  };

  const handleViewUser = (user) => {
    console.log('Viewing user:', user);
  };

  const handleEditUser = (user) => {
    console.log('Editing user:', user);
  };

  const handleDeleteUser = (user) => {
    console.log('Deleting user:', user);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-users">
      {/* Header */}
      <div className="admin-users-header">
        <div className="admin-users-title">
          <h2>User Management</h2>
          <p>Manage platform users, roles, and permissions</p>
        </div>
        <div className="admin-users-actions">
          <button 
            className="admin-users-action-btn primary"
            onClick={() => setShowAddUserModal(true)}
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
          <button className="admin-users-action-btn">
            <Download className="w-4 h-4" />
            Export
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
            <div className="admin-users-stat-value">{users.length}</div>
            <div className="admin-users-stat-label">Total Users</div>
          </div>
        </div>
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-icon active">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="admin-users-stat-content">
            <div className="admin-users-stat-value">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="admin-users-stat-label">Active Users</div>
          </div>
        </div>
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-icon pending">
            <Clock className="w-6 h-6" />
          </div>
          <div className="admin-users-stat-content">
            <div className="admin-users-stat-value">
              {users.filter(u => u.status === 'pending').length}
            </div>
            <div className="admin-users-stat-label">Pending</div>
          </div>
        </div>
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-icon verified">
            <Shield className="w-6 h-6" />
          </div>
          <div className="admin-users-stat-content">
            <div className="admin-users-stat-value">
              {users.filter(u => u.verified).length}
            </div>
            <div className="admin-users-stat-label">Verified</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-users-filters">
        <div className="admin-users-search">
          <Search className="admin-users-search-icon" />
          <input
            type="text"
            placeholder="Search users by name, email, or company..."
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
              <th>User</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Activity</th>
              <th>Documents</th>
              <th>Loans</th>
              <th>Joined</th>
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
                  <div className="admin-users-user-info">
                    <div className="admin-users-avatar">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="admin-users-details">
                      <span className="admin-users-name">{user.name}</span>
                      <span className="admin-users-email">{user.email}</span>
                      <span className="admin-users-phone">{user.phone}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="admin-users-company">
                    <Building className="w-4 h-4" />
                    <span>{user.company}</span>
                  </div>
                </td>
                <td>
                  <span className={getRoleBadge(user.role)}>
                    {user.role}
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
                  <div className="admin-users-activity">
                    <Activity className="w-4 h-4" />
                    <span>{new Date(user.lastActive).toLocaleDateString()}</span>
                  </div>
                </td>
                <td>
                  <span className="admin-users-count">{user.documents}</span>
                </td>
                <td>
                  <span className="admin-users-count">{user.loans}</span>
                </td>
                <td>
                  <div className="admin-users-date">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(user.joinedAt).toLocaleDateString()}</span>
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
                      onClick={() => handleDeleteUser(user)}
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
            <button className="admin-users-bulk-btn danger">
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
