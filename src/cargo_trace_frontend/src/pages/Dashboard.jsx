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
  const [isHovered, setIsHovered] = useState(null);

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: '"Inter", sans-serif', backgroundColor: '#1f2937', padding: '2rem' }}>
      {/* Welcome Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #4c1d95, #6b21a8)', 
        borderRadius: '1rem', 
        padding: '2.5rem', 
        color: '#ffffff', 
        position: 'relative', 
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.05), transparent)' }}></div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.75rem', letterSpacing: '-0.025em' }}>Welcome back, User</h1>
          <p style={{ fontSize: '1.125rem', color: '#d1d5db', opacity: 0.9, marginBottom: '1.5rem' }}>Your trade finance portfolio is thriving</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '0.75rem', height: '0.75rem', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>All systems operational</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />
              <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>+12.5% this month</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '0', top: '0', width: '12rem', height: '12rem', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent)', borderRadius: '50%', transform: 'translate(50%, -50%)' }}></div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {[
          { title: 'ICP Balance', value: '10.248 ICP', change: '+2.4% from last week', icon: Wallet, gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)', changeColor: '#10b981', hoverColor: '#6d28d9' },
          { title: 'Active Documents', value: '12', change: '3 processed today', icon: FileText, gradient: 'linear-gradient(135deg, #10b981, #047857)', changeColor: '#10b981', hoverColor: '#059669' },
          { title: 'Total Loans', value: '$185,000', change: '$45k repaid', icon: DollarSign, gradient: 'linear-gradient(135deg, #f97316, #ea580c)', changeColor: '#f97316', hoverColor: '#ea580c' },
          { title: 'Credit Score', value: '850', change: 'Excellent rating', icon: TrendingUp, gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', changeColor: '#8b5cf6', hoverColor: '#7c3aed' }
        ].map((card, index) => (
          <div 
            key={index}
            style={{ 
              backgroundColor: '#374151', 
              borderRadius: '1rem', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
              border: '1px solid #4b5563', 
              padding: '1.5rem', 
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ 
                width: '3.5rem', 
                height: '3.5rem', 
                background: card.gradient, 
                borderRadius: '0.75rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                <card.icon style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
              </div>
              <ArrowUpRight style={{ width: '1.25rem', height: '1.25rem', color: '#d1d5db', cursor: 'pointer', transition: 'color 0.3s' }} 
                onMouseOver={(e) => e.target.style.color = card.hoverColor}
                onMouseOut={(e) => e.target.style.color = '#d1d5db'} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.25rem' }}>{card.title}</p>
              <p style={{ fontSize: '1.75rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.025em' }}>{card.value}</p>
              <p style={{ fontSize: '0.875rem', color: card.changeColor, fontWeight: '500', marginTop: '0.25rem' }}>{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', '@media (max-width: 1024px)': { gridTemplateColumns: '1fr' } }}>
        <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', letterSpacing: '-0.025em' }}>Recent Document Transfers</h3>
            <button style={{ 
              color: '#7c3aed', 
              fontWeight: '500', 
              fontSize: '0.875rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem', 
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = '#6d28d9'}
            onMouseOut={(e) => e.target.style.color = '#7c3aed'}>
              View all
              <ArrowUpRight style={{ width: '1rem', height: '1rem' }} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {documentTransfers.map((transfer, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '1rem', 
                  backgroundColor: isHovered === index ? '#4b5563' : '#374151', 
                  borderRadius: '0.75rem', 
                  border: '1px solid #4b5563',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => setSelectedDocument(transfer.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
                    borderRadius: '0.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <FileText style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#ffffff', fontSize: '0.875rem' }}>{transfer.id}</p>
                    <p style={{ fontSize: '0.75rem', color: '#d1d5db', fontFamily: 'monospace' }}>ACID: {transfer.acid}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600', color: '#ffffff', marginBottom: '0.25rem' }}>{transfer.value}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.75rem', 
                      fontWeight: '500', 
                      backgroundColor: transfer.status === 'Transferred' ? '#064e3b' : '#713f12', 
                      color: '#ffffff',
                      transition: 'transform 0.3s'
                    }}>
                      {transfer.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ffffff', marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'New Document', icon: Plus, bgColor: '#7c3aed', hoverColor: '#6d28d9' },
                { label: 'Request Loan', icon: DollarSign, bgColor: '#4b5563', hoverColor: '#6b7280', textColor: '#ffffff' },
                { label: 'Export Report', icon: Download, bgColor: '#4b5563', hoverColor: '#6b7280', textColor: '#ffffff' }
              ].map((action, index) => (
                <button 
                  key={index}
                  style={{ 
                    width: '100%', 
                    backgroundColor: action.bgColor, 
                    color: action.textColor || '#ffffff', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '0.75rem', 
                    fontWeight: '500', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem', 
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  onMouseOver={(e) => e.target.style.backgroundColor = action.hoverColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = action.bgColor}>
                  <action.icon style={{ width: '1rem', height: '1rem' }} />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.025em' }}>Loan Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingLoans.slice(0, 2).map((loan, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '0.75rem', 
                    backgroundColor: isHovered === `loan-${index}` ? '#4b5563' : '#374151', 
                    borderRadius: '0.75rem',
                    border: '1px solid #4b5563',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setIsHovered(`loan-${index}`)}
                  onMouseLeave={() => setIsHovered(null)}>
                  <div>
                    <p style={{ fontWeight: '600', color: '#ffffff', fontSize: '0.875rem' }}>{loan.docId}</p>
                    <p style={{ fontSize: '0.75rem', color: '#d1d5db' }}>{loan.amount} at {loan.apr}</p>
                  </div>
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.75rem', 
                    fontWeight: '500', 
                    backgroundColor: loan.status === 'Approved' ? '#064e3b' : '#4c1d95', 
                    color: '#ffffff',
                    transition: 'transform 0.3s'
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: '"Inter", sans-serif', backgroundColor: '#1f2937', padding: '2rem' }}>
      {/* Action Bar */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        '@media (min-width: 768px)': { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } 
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '20rem' }}>
          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#d1d5db', width: '1rem', height: '1rem' }} />
          <input
            type="text"
            placeholder="Search documents..."
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 2.5rem', 
              border: '1px solid #4b5563', 
              borderRadius: '0.75rem', 
              backgroundColor: '#374151', 
              fontSize: '0.875rem',
              color: '#d1d5db',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 1rem', 
            color: '#d1d5db', 
            backgroundColor: '#374151', 
            border: '1px solid #4b5563', 
            borderRadius: '0.75rem', 
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.backgroundColor = '#4b5563';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.backgroundColor = '#374151';
          }}>
            <Filter style={{ width: '1rem', height: '1rem' }} />
            Filter
          </button>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 1.5rem', 
            backgroundColor: '#7c3aed', 
            color: '#ffffff', 
            borderRadius: '0.75rem', 
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#6d28d9';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#7c3aed';
            e.target.style.transform = 'translateY(0)';
          }}>
            <Upload style={{ width: '1rem', height: '1rem' }} />
            Upload Document
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
        <div style={{ maxWidth: '32rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Submit New Document</h3>
          <p style={{ color: '#d1d5db', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Upload trade documents to initiate verification</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>ACID Number</label>
              <input
                type="text"
                placeholder="Enter ACID number"
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  border: '1px solid #4b5563', 
                  borderRadius: '0.75rem', 
                  backgroundColor: '#4b5563', 
                  fontSize: '0.875rem',
                  color: '#ffffff',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>Customs Wallet Address</label>
              <input
                type="text"
                placeholder="0x..."
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  border: '1px solid #4b5563', 
                  borderRadius: '0.75rem', 
                  backgroundColor: '#4b5563', 
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  color: '#ffffff',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
          </div>
          
          <div style={{ 
            border: '2px dashed #4b5563', 
            borderRadius: '0.75rem', 
            padding: '2rem', 
            textAlign: 'center', 
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#7c3aed';
            e.target.style.backgroundColor = '#4b5563';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#4b5563';
            e.target.style.backgroundColor = 'transparent';
          }}>
            <Upload style={{ width: '3rem', height: '3rem', color: '#d1d5db', margin: '0 auto 1rem', transition: 'color 0.3s' }}
              onMouseOver={(e) => e.target.style.color = '#7c3aed'}
              onMouseOut={(e) => e.target.style.color = '#d1d5db'} />
            <p style={{ fontSize: '1.125rem', fontWeight: '500', color: '#ffffff', marginBottom: '0.5rem' }}>Drop files to upload</p>
            <p style={{ color: '#d1d5db', marginBottom: '1rem', fontSize: '0.875rem' }}>or click to browse</p>
            <button style={{ 
              backgroundColor: '#7c3aed', 
              color: '#ffffff', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '0.75rem', 
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6d28d9';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#7c3aed';
              e.target.style.transform = 'translateY(0)';
            }}>
              Choose Files
            </button>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', overflow: 'hidden' }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid #4b5563' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', letterSpacing: '-0.025em' }}>Document Transfer Status</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#4b5563' }}>
              <tr>
                {['Transfer ID', 'ACID Number', 'Value', 'Status', 'Date', 'Actions'].map((header, index) => (
                  <th key={index} style={{ textAlign: 'left', padding: '1rem 1.5rem', fontWeight: '600', color: '#d1d5db', fontSize: '0.875rem' }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ borderTop: '1px solid #4b5563' }}>
              {documentTransfers.map((transfer, index) => (
                <tr 
                  key={index} 
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setIsHovered(`table-${index}`)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={() => setSelectedDocument(transfer.id)}
                >
                  <td style={{ padding: '1rem 1.5rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
                        borderRadius: '0.5rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        <FileText style={{ width: '1rem', height: '1rem', color: '#ffffff' }} />
                      </div>
                      <span style={{ fontWeight: '500', color: '#ffffff', fontSize: '0.875rem' }}>{transfer.id}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>{transfer.acid}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: '#ffffff', fontSize: '0.875rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>{transfer.value}</td>
                  <td style={{ padding: '1rem 1.5rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.75rem', 
                      fontWeight: '500', 
                      backgroundColor: transfer.status === 'Transferred' ? '#064e3b' : '#713f12', 
                      color: '#ffffff',
                      transition: 'transform 0.3s'
                    }}>
                      {transfer.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#d1d5db', fontSize: '0.875rem', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>{transfer.date}</td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right', backgroundColor: isHovered === `table-${index}` ? '#4b5563' : '#374151' }}>
                    <button style={{ 
                      color: '#7c3aed', 
                      fontWeight: '500', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.25rem', 
                      marginLeft: 'auto', 
                      fontSize: '0.875rem',
                      transition: 'color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#6d28d9'}
                    onMouseOut={(e) => e.target.style.color = '#7c3aed'}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: '"Inter", sans-serif', backgroundColor: '#1f2937', padding: '2rem' }}>
      {/* Loan Request Form */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
        <div style={{ maxWidth: '48rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Request New Loan</h3>
          <p style={{ color: '#d1d5db', marginBottom: '2rem', fontSize: '0.875rem' }}>Use verified documents as collateral for trade finance</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>Select Document NFT</label>
              <select style={{ 
                width: '100%', 
                padding: '0.75rem 1rem', 
                border: '1px solid #4b5563', 
                borderRadius: '0.75rem', 
                backgroundColor: '#4b5563', 
                fontSize: '0.875rem',
                color: '#ffffff',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}>
                <option style={{ backgroundColor: '#4b5563', color: '#ffffff' }}>ABCD...1234 - $50,000 Trade Value</option>
                <option style={{ backgroundColor: '#4b5563', color: '#ffffff' }}>EFGH...5678 - $75,000 Trade Value</option>
                <option style={{ backgroundColor: '#4b5563', color: '#ffffff' }}>IJKL...9012 - $30,000 Trade Value</option>
              </select>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>Loan Amount</label>
                <input
                  type="text"
                  placeholder="$50,000"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: '1px solid #4b5563', 
                    borderRadius: '0.75rem', 
                    backgroundColor: '#4b5563', 
                    fontSize: '0.875rem',
                    color: '#ffffff',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>Interest Rate</label>
                <input
                  type="text"
                  value="4.5% APR"
                  disabled
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: '1px solid #4b5563', 
                    borderRadius: '0.75rem', 
                    backgroundColor: '#4b5563', 
                    color: '#d1d5db', 
                    fontSize: '0.875rem',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>Repayment Date</label>
                <input
                  type="date"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: '1px solid #4b5563', 
                    borderRadius: '0.75rem', 
                    backgroundColor: '#4b5563', 
                    fontSize: '0.875rem',
                    color: '#ffffff',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
            </div>
            
            <div style={{ backgroundColor: '#4c1d95', border: '1px solid #6b21a8', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h4 style={{ fontWeight: '600', color: '#e9d5ff', marginBottom: '0.5rem', fontSize: '1rem' }}>Loan Terms</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
                {[
                  { label: 'LTV Ratio', value: '80%' },
                  { label: 'Processing Fee', value: '1.5%' },
                  { label: 'Credit Score Impact', value: '+15 points', color: '#10b981' },
                  { label: 'Approval Time', value: '24-48 hours' }
                ].map((term, index) => (
                  <div key={index}>
                    <span style={{ color: '#d1d5db' }}>{term.label}:</span>
                    <div style={{ fontWeight: '600', color: term.color || '#e9d5ff' }}>{term.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button style={{ 
              backgroundColor: '#7c3aed', 
              color: '#ffffff', 
              padding: '1rem 2rem', 
              borderRadius: '0.75rem', 
              fontWeight: '600', 
              fontSize: '0.875rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6d28d9';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#7c3aed';
              e.target.style.transform = 'translateY(0)';
            }}>
              Submit Loan Request
            </button>
          </div>
        </div>
      </div>

      {/* Pending Loans */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', letterSpacing: '-0.025em' }}>Pending Loan Requests</h3>
          <span style={{ fontSize: '0.875rem', color: '#d1d5db', fontWeight: '500' }}>{pendingLoans.length} requests</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pendingLoans.map((loan, index) => (
            <div 
              key={index} 
              style={{ 
                border: '1px solid #4b5563', 
                borderRadius: '0.75rem', 
                padding: '1.5rem', 
                backgroundColor: isHovered === `pending-loan-${index}` ? '#4b5563' : '#374151',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setIsHovered(`pending-loan-${index}`)}
              onMouseLeave={() => setIsHovered(null)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
                      borderRadius: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <DollarSign style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#ffffff', fontSize: '0.875rem' }}>Document: {loan.docId}</p>
                      <p style={{ fontSize: '0.75rem', color: '#d1d5db' }}>Requested: {loan.date}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Amount:</span>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#ffffff' }}>{loan.amount}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Interest Rate:</span>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#ffffff' }}>{loan.apr}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Status:</span>
                      <div>
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.75rem', 
                          fontWeight: '500', 
                          backgroundColor: loan.status === 'Approved' ? '#064e3b' : '#4c1d95', 
                          color: '#ffffff',
                          transition: 'transform 0.3s'
                        }}>
                          {loan.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {loan.status === 'Approved' && (
                  <button style={{ 
                    backgroundColor: '#10b981', 
                    color: '#ffffff', 
                    padding: '0.75rem 1.5rem', 
                    borderRadius: '0.75rem', 
                    fontWeight: '500', 
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#10b981';
                    e.target.style.transform = 'translateY(0)';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: '"Inter", sans-serif', backgroundColor: '#1f2937', padding: '2rem' }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {[
          { title: 'Total Outstanding', value: '$55,000', subtext: 'Across 2 active loans', icon: DollarSign, bgIcon: '#4c1d95', iconColor: '#e9d5ff' },
          { title: 'Total Repaid', value: '$45,000', subtext: '45% of total loans', icon: CheckCircle, bgIcon: '#064e3b', iconColor: '#10b981' },
          { title: 'Next Payment', value: 'Sep 15', subtext: '$5,000 due', icon: Clock, bgIcon: '#713f12', iconColor: '#fed7aa' }
        ].map((card, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: '#374151', 
              borderRadius: '1rem', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
              border: '1px solid #4b5563', 
              padding: '1.5rem', 
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-6px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: card.bgIcon, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <card.icon style={{ width: '1.25rem', height: '1.25rem', color: card.iconColor }} />
              </div>
              <h3 style={{ fontWeight: '600', color: '#d1d5db', fontSize: '1rem' }}>{card.title}</h3>
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.025em' }}>{card.value}</p>
            <p style={{ fontSize: '0.875rem', color: card.iconColor, fontWeight: '500', marginTop: '0.25rem' }}>{card.subtext}</p>
          </div>
        ))}
      </div>

      {/* Active Loans */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', letterSpacing: '-0.025em' }}>Active Loans</h3>
          <button style={{ 
            color: '#7c3aed', 
            fontWeight: '500', 
            fontSize: '0.875rem', 
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.color = '#6d28d9'}
          onMouseOut={(e) => e.target.style.color = '#7c3aed'}>
            Payment History
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {activeLoans.map((loan, index) => (
            <div 
              key={index} 
              style={{ 
                border: '1px solid #4b5563', 
                borderRadius: '0.75rem', 
                padding: '1.5rem', 
                backgroundColor: isHovered === `active-loan-${index}` ? '#4b5563' : '#374151',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setIsHovered(`active-loan-${index}`)}
              onMouseLeave={() => setIsHovered(null)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
                    borderRadius: '0.75rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <FileText style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#ffffff', fontSize: '1.125rem' }}>Document: {loan.docId}</p>
                    <p style={{ fontSize: '0.875rem', color: '#d1d5db' }}>Due: {loan.dueDate}</p>
                  </div>
                </div>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '9999px', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  backgroundColor: loan.status === 'Active' ? '#4c1d95' : '#7f1d1d', 
                  color: '#ffffff',
                  transition: 'transform 0.3s'
                }}>
                  {loan.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '0.25rem' }}>Total Amount</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>{loan.amount}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '0.25rem' }}>Repaid</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>{loan.repaid}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '0.25rem' }}>Remaining</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>
                    ${(parseInt(loan.amount.replace(/[$,]/g, '')) - parseInt(loan.repaid.replace(/[$,]/g, ''))).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginBottom: '0.25rem' }}>Interest Rate</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>4.2%</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db' }}>Repayment Progress</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db' }}>{loan.progress}%</span>
                </div>
                <div style={{ width: '100%', backgroundColor: '#4b5563', borderRadius: '9999px', height: '0.75rem' }}>
                  <div 
                    style={{ 
                      height: '0.75rem', 
                      borderRadius: '9999px', 
                      transition: 'all 0.5s', 
                      background: loan.status === 'Active' ? 'linear-gradient(to right, #7c3aed, #5b21b6)' : 'linear-gradient(to right, #ef4444, #dc2626)', 
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
                      border: '1px solid #4b5563', 
                      borderRadius: '0.75rem', 
                      backgroundColor: '#4b5563', 
                      fontSize: '0.875rem',
                      color: '#ffffff',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #7c3aed'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>
                <button style={{ 
                  backgroundColor: '#7c3aed', 
                  color: '#ffffff', 
                  padding: '0.75rem 2rem', 
                  borderRadius: '0.75rem', 
                  fontWeight: '500', 
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap', 
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6d28d9';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#7c3aed';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  Make Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Score Impact */}
      <div style={{ backgroundColor: '#374151', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #4b5563', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>Credit Score Impact</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
          {[
            { value: '+25', subtext: 'On-time Payments', icon: TrendingUp, bg: '#4c1d95', border: '#6b21a8', iconBg: '#4c1d95', iconColor: '#e9d5ff' },
            { value: '-5', subtext: 'Late Payments', icon: AlertCircle, bg: '#713f12', border: '#92400e', iconBg: '#713f12', iconColor: '#fed7aa' },
            { value: '850', subtext: 'Current Score', icon: CheckCircle, bg: '#4c1d95', border: '#6b21a8', iconBg: '#4c1d95', iconColor: '#e9d5ff' },
            { value: 'A+', subtext: 'Credit Rating', icon: TrendingUp, bg: '#4c1d95', border: '#6b21a8', iconBg: '#4c1d95', iconColor: '#e9d5ff' }
          ].map((item, index) => (
            <div 
              key={index} 
              style={{ 
                textAlign: 'center', 
                padding: '1.5rem', 
                background: `linear-gradient(to bottom right, ${item.bg}, #374151)`, 
                border: `1px solid ${item.border}`, 
                borderRadius: '0.75rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{ 
                width: '3rem', 
                height: '3rem', 
                backgroundColor: item.iconBg, 
                borderRadius: '0.75rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 0.75rem' 
              }}>
                <item.icon style={{ width: '1.5rem', height: '1.5rem', color: item.iconColor }} />
              </div>
              <div style={{ fontSize: '1.875rem', fontWeight: '700', color: item.iconColor, marginBottom: '0.25rem' }}>{item.value}</div>
              <div style={{ fontSize: '0.875rem', color: item.iconColor, fontWeight: '500' }}>{item.subtext}</div>
            </div>
          ))}
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
    <div style={{ minHeight: '100vh', backgroundColor: '#1f2937', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '18rem', 
        backgroundColor: '#1f2937', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        position: 'sticky', 
        top: 0 
      }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid #4b5563' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
              borderRadius: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)' 
            }}>
              <Ship style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.025em' }}>CargoTrace</h1>
              <p style={{ fontSize: '0.875rem', color: '#d1d5db', fontWeight: '500' }}>Trade Finance</p>
            </div>
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sidebarItems.map((item) => (
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
                  transition: 'all 0.3s ease', 
                  backgroundColor: activeTab === item.id ? '#7c3aed' : 'transparent', 
                  color: activeTab === item.id ? '#ffffff' : '#d1d5db'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = activeTab === item.id ? '#6d28d9' : '#374151'}
                onMouseLeave={(e) => e.target.style.backgroundColor = activeTab === item.id ? '#7c3aed' : 'transparent'}>
                <item.icon style={{ width: '1.25rem', height: '1.25rem', transform: activeTab === item.id ? 'scale(1.1)' : 'none', transition: 'transform 0.3s', color: activeTab === item.id ? '#ffffff' : '#d1d5db' }} />
                <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #4c1d95, #6b21a8)', 
            border: '1px solid #6b21a8', 
            borderRadius: '1rem', 
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                backgroundColor: '#4c1d95', 
                borderRadius: '0.75rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Wallet style={{ width: '1.25rem', height: '1.25rem', color: '#e9d5ff' }} />
              </div>
              <span style={{ fontWeight: '600', color: '#e9d5ff', fontSize: '0.875rem' }}>ICP Wallet</span>
            </div>
            <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.25rem', letterSpacing: '-0.025em' }}>10.248 ICP</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              <span style={{ fontSize: '0.875rem', color: '#e9d5ff', fontWeight: '500' }}>Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '4.5rem' }}>
        {/* Header */}
        <header style={{ 
          backgroundColor: 'rgba(31, 41, 55, 0.95)', 
          backdropFilter: 'blur(12px)', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)', 
          borderBottom: '1px solid #4b5563', 
          padding: '1.5rem 2rem', 
          position: 'sticky', 
          top: 0, 
          zIndex: 10 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.025em', textTransform: 'capitalize' }}>
                {activeTab === 'dashboard' ? 'Dashboard' : 
                 activeTab === 'documents' ? 'Documents' :
                 activeTab === 'loans' ? 'Loan Requests' : 'Repayments'}
              </h2>
              <p style={{ color: '#d1d5db', marginTop: '0.25rem', fontSize: '0.875rem' }}>
                {activeTab === 'dashboard' ? 'Monitor your trade finance portfolio and activities' :
                 activeTab === 'documents' ? 'Manage document transfers and submissions' :
                 activeTab === 'loans' ? 'Request and manage trade finance loans' :
                 'Track and manage loan repayments'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button style={{ 
                padding: '0.75rem', 
                color: '#d1d5db', 
                backgroundColor: '#374151', 
                borderRadius: '0.75rem', 
                border: '1px solid #4b5563',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.backgroundColor = '#4b5563';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.backgroundColor = '#374151';
                e.target.style.transform = 'translateY(0)';
              }}>
                <Search style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
              <button style={{ 
                padding: '0.75rem', 
                color: '#d1d5db', 
                backgroundColor: '#374151', 
                borderRadius: '0.75rem', 
                border: '1px solid #4b5563',
                position: 'relative', 
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.backgroundColor = '#4b5563';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.backgroundColor = '#374151';
                e.target.style.transform = 'translateY(0)';
              }}>
                <Bell style={{ width: '1.25rem', height: '1.25rem' }} />
                <div style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', width: '0.75rem', height: '0.75rem', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
              </button>
              <div style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', 
                borderRadius: '0.75rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
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

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
