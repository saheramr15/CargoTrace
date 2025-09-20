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
  AlertTriangle,
  RefreshCw,
  Hash,
  TrendingUp,
  TrendingDown,
  X
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
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'suspended':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-500/20 text-green-400 border border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      suspended: 'bg-red-500/20 text-red-400 border border-red-500/30'
    };
    return `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-slate-500/20 text-slate-400 border border-slate-500/30'}`;
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      admin: 'bg-purple-500/20 text-blue-400 border border-purple-500/30',
      user: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      moderator: 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
    };
    return `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleClasses[role] || 'bg-slate-500/20 text-slate-400 border border-slate-500/30'}`;
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
    <div className="px-6 py-6 lg:pl-80 lg:pr-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">User Management</h1>
              <p className="text-slate-400">Manage platform users, roles, and permissions</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="group relative px-4 py-2 bg-slate-800/50 border border-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-700/50 hover:text-white transition-all duration-300">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <Download size={16} />
                <span>Export</span>
              </div>
            </button>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="group relative px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5 shadow-lg hover:shadow-purple-500/25"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <UserPlus size={16} />
                <span>Add User</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-blue-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{users.length}</p>
              <p className="text-sm text-slate-400">Total Users</p>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/10 to-emerald-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-lg flex items-center justify-center">
                <CheckCircle size={24} className="text-green-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+8%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                {users.filter(u => u.status === 'active').length}
              </p>
              <p className="text-sm text-slate-400">Active Users</p>
            </div>
          </div>
        </div>

        {/* Pending Users */}
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/10 to-orange-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-400/20 rounded-lg flex items-center justify-center">
                <Clock size={24} className="text-yellow-400" />
              </div>
              <div className="text-yellow-400">
                <span className="text-sm font-medium">Review Needed</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                {users.filter(u => u.status === 'pending').length}
              </p>
              <p className="text-sm text-slate-400">Pending</p>
            </div>
          </div>
        </div>

        {/* Verified Users */}
        <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                <Shield size={24} className="text-blue-400" />
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+5%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                {users.filter(u => u.verified).length}
              </p>
              <p className="text-sm text-slate-400">Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" size={18} />
              <input
                type="text"
                placeholder="Search users by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* More Filters Button */}
          <button className="group relative px-4 py-3 bg-slate-800/50 border border-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-700/50 hover:text-white transition-all duration-300">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <Filter size={16} />
              <span>More Filters</span>
            </div>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-700/30 border-b border-slate-600/50">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 bg-slate-800 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Company</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Activity</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Documents</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Loans</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Joined</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors duration-200 group">
                  <td className="px-4 py-4 whitespace-nowrap">
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
                      className="w-4 h-4 text-purple-600 bg-slate-800 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                        <Users size={20} className="text-blue-400" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.email}</div>
                        <div className="text-xs text-slate-500">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Building size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-300">{user.company}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={getRoleBadge(user.role)}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {getStatusIcon(user.status)}
                      </div>
                      <span className={getStatusBadge(user.status)}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Activity size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-300">{new Date(user.lastActive).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                      {user.documents}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      {user.loans}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-300">{new Date(user.joinedAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="group/btn p-2 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all duration-300 hover:scale-110"
                        title="View Details"
                      >
                        <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="group/btn p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-110"
                        title="Edit User"
                      >
                        <Edit size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="group/btn p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110"
                        title="Delete User"
                      >
                        <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Hash size={16} className="text-blue-400" />
              </div>
              <span className="text-sm font-medium text-white">
                {selectedUsers.length} user(s) selected
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="group relative px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/10 to-emerald-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <CheckCircle size={16} />
                  <span>Activate Selected</span>
                </div>
              </button>
              <button className="group relative px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/10 to-orange-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Clock size={16} />
                  <span>Suspend Selected</span>
                </div>
              </button>
              <button className="group relative px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-pink-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Trash2 size={16} />
                  <span>Delete Selected</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
