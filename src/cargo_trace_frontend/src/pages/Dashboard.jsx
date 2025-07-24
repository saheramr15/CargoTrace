import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  DollarSign, 
  CreditCard, 
  Settings, 
  Bell, 
  Search,
  Upload,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Wallet,
  TrendingUp,
  Ship,
  Users,
  ArrowUpRight,
  MoreHorizontal,
  Filter,
  Download,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'loans', label: 'Loan Requests', icon: DollarSign },
    { id: 'repayment', label: 'Repayments', icon: CreditCard },
  ];

  const documentTransfers = [
    { id: '0x1234...abcd', acid: '123456789', status: 'Transferred', date: '2024-08-01', value: '$45,000' },
    { id: '0xabcd...5678', acid: '987654321', status: 'In Progress', date: '2024-08-02', value: '$32,500' },
    { id: '0x5678...efgh', acid: '456766123', status: 'Transferred', date: '2024-08-03', value: '$58,750' }
  ];

  const pendingLoans = [
    { docId: 'ABCD...1234', amount: '$50,000', date: '2024-08-01', status: 'Pending', apr: '4.5%' },
    { docId: 'EFGH...5678', amount: '$75,000', date: '2024-08-02', status: 'Approved', apr: '3.8%' }
  ];

  const activeLoans = [
    { docId: 'WXYZ...9012', amount: '$40,000', dueDate: '2024-09-15', status: 'Active', repaid: '$15,000', progress: 37.5 },
    { docId: 'MNOP...3456', amount: '$60,000', dueDate: '2024-10-01', status: 'Overdue', repaid: '$30,000', progress: 50 }
  ];

  const renderDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'Inter, sans-serif' }}>
      {/* Welcome Section */}
      <div style={{ 
        background: 'linear-gradient(to right, #2563eb, #1e40af)', 
        borderRadius: '1rem', 
        padding: '2rem', 
        color: '#ffffff', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}></div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Welcome back, user</h1>
          <p style={{ fontSize: '1.125rem', color: '#dbeafe' }}>Your trade finance portfolio is performing well today</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#4ade80', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              <span style={{ fontSize: '0.875rem', color: '#dbeafe' }}>All systems operational</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp style={{ width: '1rem', height: '1rem', color: '#4ade80' }} />
              <span style={{ fontSize: '0.875rem', color: '#dbeafe' }}>+12.5% this month</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '-1.5rem', top: '-1.5rem', width: '8rem', height: '8rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', right: '-3rem', bottom: '-3rem', width: '10rem', height: '10rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '50%' }}></div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem' 
      }}>
        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '1rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          border: '1px solid #f3f4f6', 
          padding: '1.5rem', 
          transition: 'all 0.3s', 
          ':hover': { boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transform: 'translateY(-4px)' } 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', 
              borderRadius: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              transition: 'transform 0.3s' 
            }}>
              <Wallet style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
            </div>
            <ArrowUpRight style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af', ':hover': { color: '#2563eb' } }} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>ICP Balance</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>10.248 ICP</p>
            <p style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: '500', marginTop: '0.25rem' }}>+2.4% from last week</p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '1rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          border: '1px solid #f3f4f6', 
          padding: '1.5rem', 
          transition: 'all 0.3s' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              background: 'linear-gradient(to bottom right, #10b981, #059669)', 
              borderRadius: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <FileText style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
            </div>
            <ArrowUpRight style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af', ':hover': { color: '#059669' } }} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Active Documents</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>12</p>
            <p style={{ fontSize: '0.875rem', color: '#059669', fontWeight: '500', marginTop: '0.25rem' }}>3 processed today</p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '1rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          border: '1px solid #f3f4f6', 
          padding: '1.5rem', 
          transition: 'all 0.3s' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              background: 'linear-gradient(to bottom right, #f97316, #ea580c)', 
              borderRadius: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <DollarSign style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
            </div>
            <ArrowUpRight style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af', ':hover': { color: '#ea580c' } }} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Total Loans</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>$185,000</p>
            <p style={{ fontSize: '0.875rem', color: '#ea580c', fontWeight: '500', marginTop: '0.25rem' }}>$45k repaid</p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '1rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          border: '1px solid #f3f4f6', 
          padding: '1.5rem', 
          transition: 'all 0.3s' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              background: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)', 
              borderRadius: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <TrendingUp style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
            </div>
            <ArrowUpRight style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af', ':hover': { color: '#7c3aed' } }} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Credit Score</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>850</p>
            <p style={{ fontSize: '0.875rem', color: '#7c3aed', fontWeight: '500', marginTop: '0.25rem' }}>Excellent rating</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Recent Document Transfers</h3>
              <button style={{ color: '#2563eb', fontWeight: '500', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', ':hover': { color: '#1d4ed8' } }}>
                View all
                <ArrowUpRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {documentTransfers.map((transfer, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', ':hover': { backgroundColor: '#f3f4f6' } }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '500', color: '#111827' }}>{transfer.id}</p>
                      <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>ACID: {transfer.acid}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>{transfer.value}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        padding: '0.25rem 0.625rem', 
                        borderRadius: '9999px', 
                        fontSize: '0.75rem', 
                        fontWeight: '500', 
                        backgroundColor: transfer.status === 'Transferred' ? '#dcfce7' : '#fef3c7', 
                        color: transfer.status === 'Transferred' ? '#15803d' : '#b45309' 
                      }}>
                        {transfer.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Quick Actions</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button style={{ 
                width: '100%', 
                backgroundColor: '#2563eb', 
                color: '#ffffff', 
                padding: '0.75rem 1rem', 
                borderRadius: '0.75rem', 
                fontWeight: '500', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                ':hover': { backgroundColor: '#1d4ed8' } 
              }}>
                <Plus style={{ width: '1rem', height: '1rem' }} />
                New Document
              </button>
              <button style={{ 
                width: '100%', 
                backgroundColor: '#f3f4f6', 
                color: '#111827', 
                padding: '0.75rem 1rem', 
                borderRadius: '0.75rem', 
                fontWeight: '500', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                ':hover': { backgroundColor: '#e5e7eb' } 
              }}>
                <DollarSign style={{ width: '1rem', height: '1rem' }} />
                Request Loan
              </button>
              <button style={{ 
                width: '100%', 
                backgroundColor: '#f3f4f6', 
                color: '#111827', 
                padding: '0.75rem 1rem', 
                borderRadius: '0.75rem', 
                fontWeight: '500', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                ':hover': { backgroundColor: '#e5e7eb' } 
              }}>
                <Download style={{ width: '1rem', height: '1rem' }} />
                Export Report
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Loan Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingLoans.slice(0, 2).map((loan, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem' }}>
                  <div>
                    <p style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>{loan.docId}</p>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>{loan.amount} at {loan.apr}</p>
                  </div>
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '0.25rem 0.625rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.75rem', 
                    fontWeight: '500', 
                    backgroundColor: loan.status === 'Approved' ? '#dcfce7' : '#dbeafe', 
                    color: loan.status === 'Approved' ? '#15803d' : '#1d4ed8' 
                  }}>
                    {loan.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'Inter, sans-serif' }}>
      {/* Action Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } }}>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '1rem', height: '1rem' }} />
          <input
            type="text"
            placeholder="Search documents..."
            style={{ 
              width: '100%', 
              maxWidth: '20rem', 
              padding: '0.75rem 1rem 0.75rem 2.5rem', 
              border: '1px solid #e5e7eb', 
              borderRadius: '0.75rem', 
              backgroundColor: '#ffffff', 
              ':focus': { outline: 'none', borderColor: 'transparent', boxShadow: '0 0 0 2px #3b82f6' } 
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 1rem', 
            color: '#374151', 
            backgroundColor: '#ffffff', 
            border: '1px solid #e5e7eb', 
            borderRadius: '0.75rem', 
            ':hover': { backgroundColor: '#f9fafb' } 
          }}>
            <Filter style={{ width: '1rem', height: '1rem' }} />
            Filter
          </button>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 1.5rem', 
            backgroundColor: '#2563eb', 
            color: '#ffffff', 
            borderRadius: '0.75rem', 
            fontWeight: '500', 
            ':hover': { backgroundColor: '#1d4ed8' } 
          }}>
            <Upload style={{ width: '1rem', height: '1rem' }} />
            Upload Document
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '2rem' }}>
        <div style={{ maxWidth: '32rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Submit New Document</h3>
          <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>Upload your trade documents to start the verification process</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>ACID Number</label>
              <input
                type="text"
                placeholder="Enter ACID number"
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '0.75rem', 
                  backgroundColor: '#ffffff', 
                  ':focus': { outline: 'none', borderColor: 'transparent', boxShadow: '0 0 0 2px #3b82f6' } 
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Customs Wallet Address</label>
              <input
                type="text"
                placeholder="0x..."
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '0.75rem', 
                  backgroundColor: '#ffffff', 
                  ':focus': { outline: 'none', borderColor: 'transparent', boxShadow: '0 0 0 2px #3b82f6' } 
                }}
              />
            </div>
          </div>
          
          <div style={{ border: '2px dashed #d1d5db', borderRadius: '0.75rem', padding: '2rem', textAlign: 'center', ':hover': { borderColor: '#60a5fa' } }}>
            <Upload style={{ width: '3rem', height: '3rem', color: '#9ca3af', margin: '0 auto 1rem' }} />
            <p style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>Drop files here to upload</p>
            <p style={{ color: '#4b5563', marginBottom: '1rem' }}>or click to browse</p>
            <button style={{ 
              backgroundColor: '#2563eb', 
              color: '#ffffff', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '0.75rem', 
              fontWeight: '500', 
              ':hover': { backgroundColor: '#1d4ed8' } 
            }}>
              Choose Files
            </button>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Document Transfer Status</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: '600', color: '#111827' }}>Transfer ID</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: '600', color: '#111827' }}>ACID Number</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: '600', color: '#111827' }}>Value</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: '600', color: '#111827' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: '600', color: '#111827' }}>Date</th>
                <th style={{ textAlign: 'right', padding: '1rem 1.5rem', fontWeight: '600', color: '#111827' }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: '1px solid #f3f4f6' }}>
              {documentTransfers.map((transfer, index) => (
                <tr key={index} style={{ ':hover': { backgroundColor: '#f9fafb' } }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '2rem', height: '2rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText style={{ width: '1rem', height: '1rem', color: '#2563eb' }} />
                      </div>
                      <span style={{ fontWeight: '500', color: '#111827' }}>{transfer.id}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#4b5563', fontFamily: 'monospace', fontSize: '0.875rem' }}>{transfer.acid}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: '#111827' }}>{transfer.value}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      backgroundColor: transfer.status === 'Transferred' ? '#dcfce7' : '#fef3c7', 
                      color: transfer.status === 'Transferred' ? '#15803d' : '#b45309' 
                    }}>
                      {transfer.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#4b5563' }}>{transfer.date}</td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button style={{ 
                      color: '#2563eb', 
                      fontWeight: '500', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.25rem', 
                      marginLeft: 'auto', 
                      ':hover': { color: '#1e40af' } 
                    }}>
                      <Eye style={{ width: '1rem', height: '1rem' }} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLoans = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'Inter, sans-serif' }}>
      {/* Loan Request Form */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '2rem' }}>
        <div style={{ maxWidth: '48rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Request New Loan</h3>
          <p style={{ color: '#4b5563', marginBottom: '2rem' }}>Use your verified documents as collateral for trade finance</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>Select Document NFT</label>
              <select style={{ 
                width: '100%', 
                padding: '0.75rem 1rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.75rem', 
                backgroundColor: '#ffffff', 
                ':focus': { outline: 'none', borderColor: 'transparent', boxShadow: '0 0 0 2px #3b82f6' } 
              }}>
                <option>ABCD...1234 - $50,000 Trade Value</option>
                <option>EFGH...5678 - $75,000 Trade Value</option>
                <option>IJKL...9012 - $30,000 Trade Value</option>
              </select>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>Loan Amount</label>
                <input
                  type="text"
                  placeholder="$50,000"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '0.75rem', 
                    backgroundColor: '#ffffff', 
                    ':focus': { outline: 'none', borderColor: 'transparent', boxShadow: '0 0 0 2px #3b82f6' } 
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>Interest Rate</label>
                <input
                  type="text"
                  value="4.5% APR"
                  disabled
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '0.75rem', 
                    backgroundColor: '#f9fafb', 
                    color: '#4b5563' 
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>Repayment Date</label>
                <input
                  type="date"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '0.75rem', 
                    backgroundColor: '#ffffff', 
                    ':focus': { outline: 'none', borderColor: 'transparent', boxShadow: '0 0 0 2px #3b82f6' } 
                  }}
                />
              </div>
            </div>
            
            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h4 style={{ fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>Loan Terms</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: '#2563eb' }}>LTV Ratio:</span>
                  <div style={{ fontWeight: '600', color: '#1e40af' }}>80%</div>
                </div>
                <div>
                  <span style={{ color: '#2563eb' }}>Processing Fee:</span>
                  <div style={{ fontWeight: '600', color: '#1e40af' }}>1.5%</div>
                </div>
                <div>
                  <span style={{ color: '#2563eb' }}>Credit Score Impact:</span>
                  <div style={{ fontWeight: '600', color: '#15803d' }}>+15 points</div>
                </div>
                <div>
                  <span style={{ color: '#2563eb' }}>Approval Time:</span>
                  <div style={{ fontWeight: '600', color: '#1e40af' }}>24-48 hours</div>
                </div>
              </div>
            </div>
            
            <button style={{ 
              backgroundColor: '#2563eb', 
              color: '#ffffff', 
              padding: '1rem 2rem', 
              borderRadius: '0.75rem', 
              fontWeight: '600', 
              ':hover': { backgroundColor: '#1d4ed8' } 
            }}>
              Submit Loan Request
            </button>
          </div>
        </div>
      </div>

      {/* Pending Loans */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Pending Loan Requests</h3>
          <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{pendingLoans.length} requests</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pendingLoans.map((loan, index) => (
            <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem', ':hover': { boxShadow: '0 4px 6px rgba(0,0,0,0.1)' } }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DollarSign style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#111827' }}>Document: {loan.docId}</p>
                      <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Requested: {loan.date}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>Amount:</span>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#111827' }}>{loan.amount}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>Interest Rate:</span>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#111827' }}>{loan.apr}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>Status:</span>
                      <div>
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.875rem', 
                          fontWeight: '500', 
                          backgroundColor: loan.status === 'Approved' ? '#dcfce7' : '#dbeafe', 
                          color: loan.status === 'Approved' ? '#15803d' : '#1d4ed8' 
                        }}>
                          {loan.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {loan.status === 'Approved' && (
                  <button style={{ 
                    backgroundColor: '#16a34a', 
                    color: '#ffffff', 
                    padding: '0.75rem 1.5rem', 
                    borderRadius: '0.75rem', 
                    fontWeight: '500', 
                    ':hover': { backgroundColor: '#15803d' } 
                  }}>
                    Accept Loan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRepayment = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'Inter, sans-serif' }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} />
            </div>
            <h3 style={{ fontWeight: '600', color: '#111827' }}>Total Outstanding</h3>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>$55,000</p>
          <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem' }}>Across 2 active loans</p>
        </div>
        
        <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#dcfce7', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#16a34a' }} />
            </div>
            <h3 style={{ fontWeight: '600', color: '#111827' }}>Total Repaid</h3>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>$45,000</p>
          <p style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: '500', marginTop: '0.25rem' }}>45% of total loans</p>
        </div>
        
        <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock style={{ width: '1.25rem', height: '1.25rem', color: '#d97706' }} />
            </div>
            <h3 style={{ fontWeight: '600', color: '#111827' }}>Next Payment</h3>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Sep 15</p>
          <p style={{ fontSize: '0.875rem', color: '#d97706', fontWeight: '500', marginTop: '0.25rem' }}>$5,000 due</p>
        </div>
      </div>

      {/* Active Loans */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>Active Loans</h3>
          <button style={{ color: '#2563eb', fontWeight: '500', fontSize: '0.875rem', ':hover': { color: '#1d4ed8' } }}>
            Payment History
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {activeLoans.map((loan, index) => (
            <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '3rem', height: '3rem', background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#111827', fontSize: '1.125rem' }}>Document: {loan.docId}</p>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Due: {loan.dueDate}</p>
                  </div>
                </div>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '9999px', 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  backgroundColor: loan.status === 'Active' ? '#dbeafe' : '#fee2e2', 
                  color: loan.status === 'Active' ? '#1d4ed8' : '#dc2626' 
                }}>
                  {loan.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Total Amount</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>{loan.amount}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Repaid</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a' }}>{loan.repaid}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Remaining</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                    ${(parseInt(loan.amount.replace(/[$,]/g, '')) - parseInt(loan.repaid.replace(/[$,]/g, ''))).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Interest Rate</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>4.2%</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Repayment Progress</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{loan.progress}%</span>
                </div>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '0.75rem' }}>
                  <div 
                    style={{ 
                      height: '0.75rem', 
                      borderRadius: '9999px', 
                      transition: 'all 0.5s', 
                      background: loan.status === 'Active' ? 'linear-gradient(to right, #3b82f6, #2563eb)' : 'linear-gradient(to right, #ef4444, #dc2626)', 
                      width: `${loan.progress}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', '@media (min-width: 640px)': { flexDirection: 'row' } }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Enter payment amount"
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1rem', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '0.75rem', 
                      backgroundColor: '#ffffff', 
                      ':focus': { outline: 'none', borderColor: 'transparent', boxShadow: '0 0 0 2px #3b82f6' } 
                    }}
                  />
                </div>
                <button style={{ 
                  backgroundColor: '#2563eb', 
                  color: '#ffffff', 
                  padding: '0.75rem 2rem', 
                  borderRadius: '0.75rem', 
                  fontWeight: '500', 
                  whiteSpace: 'nowrap', 
                  ':hover': { backgroundColor: '#1d4ed8' } 
                }}>
                  Make Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Score Impact */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1.5rem' }}>Credit Score Impact</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'linear-gradient(to bottom right, #f0fdf4, #ecfdf5)', border: '1px solid #bbf7d0', borderRadius: '0.75rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#dcfce7', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <TrendingUp style={{ width: '1.5rem', height: '1.5rem', color: '#16a34a' }} />
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#15803d', marginBottom: '0.25rem' }}>+25</div>
            <div style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: '500' }}>On-time Payments</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'linear-gradient(to bottom right, #fff7ed, #ffedd5)', border: '1px solid #fed7aa', borderRadius: '0.75rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#fef3c7', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <AlertCircle style={{ width: '1.5rem', height: '1.5rem', color: '#d97706' }} />
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#b45309', marginBottom: '0.25rem' }}>-5</div>
            <div style={{ fontSize: '0.875rem', color: '#d97706', fontWeight: '500' }}>Late Payments</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', border: '1px solid #bfdbfe', borderRadius: '0.75rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#dbeafe', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1d4ed8', marginBottom: '0.25rem' }}>850</div>
            <div style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: '500' }}>Current Score</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: 'linear-gradient(to bottom right, #f5f3ff, #ede9fe)', border: '1px solid #ddd6fe', borderRadius: '0.75rem' }}>
            <div style={{ width: '3rem', height: '3rem', backgroundColor: '#ede9fe', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <TrendingUp style={{ width: '1.5rem', height: '1.5rem', color: '#7c3aed' }} />
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#6d28d9', marginBottom: '0.25rem' }}>A+</div>
            <div style={{ fontSize: '0.875rem', color: '#7c3aed', fontWeight: '500' }}>Credit Rating</div>
          </div>
        </div>
      </div>
    </div>
  );

  

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'documents':
        return renderDocuments();
      case 'loans':
        return renderLoans();
      case 'repayment':
        return renderRepayment();
      default:
        return renderDashboard();
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '18rem', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRight: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', background: 'linear-gradient(to bottom right, #2563eb, #1e40af)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              <Ship style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>CargoTrace</h1>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Trade Finance</p>
            </div>
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    padding: '1rem', 
                    borderRadius: '0.75rem', 
                    textAlign: 'left', 
                    transition: 'all 0.2s', 
                    backgroundColor: activeTab === item.id ? '#eff6ff' : 'transparent', 
                    color: activeTab === item.id ? '#1d4ed8' : '#4b5563', 
                    border: activeTab === item.id ? '1px solid #bfdbfe' : 'none', 
                    boxShadow: activeTab === item.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none', 
                    ':hover': { backgroundColor: '#f9fafb', color: '#111827' } 
                  }}
                >
                  <Icon style={{ width: '1.25rem', height: '1.25rem', transform: activeTab === item.id ? 'scale(1.1)' : 'none', ':hover': { transform: 'scale(1.05)' } }} />
                  <span style={{ fontWeight: '500' }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', border: '1px solid #bfdbfe', borderRadius: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#dbeafe', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} />
              </div>
              <span style={{ fontWeight: '600', color: '#1e40af' }}>ICP Wallet</span>
            </div>
            <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '0.25rem' }}>10.248 ICP</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.875rem', color: '#1d4ed8', fontWeight: '500' }}>Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', borderBottom: '1px solid #e5e7eb', padding: '2rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', textTransform: 'capitalize' }}>
                {activeTab === 'dashboard' ? 'Dashboard' : 
                 activeTab === 'documents' ? 'Documents' :
                 activeTab === 'loans' ? 'Loan Requests' :  'Repayments' }
              </h2>
              <p style={{ color: '#4b5563', marginTop: '0.25rem' }}>
                {activeTab === 'dashboard' ? 'Monitor your trade finance portfolio and activities' :
                 activeTab === 'documents' ? 'Manage document transfers and submissions' :
                 activeTab === 'loans' ? 'Request and manage trade finance loans' :
                 activeTab === 'repayment' ? 'Track and manage loan repayments' : 'Configure account preferences'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button style={{ 
                padding: '0.75rem', 
                color: '#9ca3af', 
                borderRadius: '0.75rem', 
                transition: 'all 0.2s', 
                ':hover': { color: '#4b5563', backgroundColor: '#f3f4f6' } 
              }}>
                <Search style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
              <button style={{ 
                padding: '0.75rem', 
                color: '#9ca3af', 
                borderRadius: '0.75rem', 
                transition: 'all 0.2s', 
                position: 'relative', 
                ':hover': { color: '#4b5563', backgroundColor: '#f3f4f6' } 
              }}>
                <Bell style={{ width: '1.25rem', height: '1.25rem' }} />
                <div style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', width: '0.75rem', height: '0.75rem', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
              </button>
              <div style={{ width: '2.5rem', height: '2.5rem', background: 'linear-gradient(to bottom right, #2563eb, #1e40af)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                <Users style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '2rem' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;