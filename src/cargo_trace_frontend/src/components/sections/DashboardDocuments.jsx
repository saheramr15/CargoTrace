import React, { useState } from 'react';
import { Search, Filter, Upload, FileText, Eye } from 'lucide-react';

const DashboardDocuments = () => {
  const [isHovered, setIsHovered] = useState(null);

  const documentTransfers = [
    { id: '0x1234...abcd', acid: '123456789', status: 'Transferred', date: '2024-08-01', value: '$45,000' },
    { id: '0xabcd...5678', acid: '987654321', status: 'In Progress', date: '2024-08-02', value: '$32,500' },
    { id: '0x5678...efgh', acid: '456766123', status: 'Transferred', date: '2024-08-03', value: '$58,750' }
  ];

  return (
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
                  onMouseLeave={() => setIsHovered(null)}>
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
};

export default DashboardDocuments; 