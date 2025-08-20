import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Users,
  Activity,
  PieChart,
  LineChart,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react';

const AdminReports = () => {
  const [selectedReport, setSelectedReport] = useState('financial');
  const [dateRange, setDateRange] = useState('30d');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'financial',
      name: 'Financial Reports',
      description: 'Loan volume, revenue, and financial metrics',
      icon: DollarSign,
      reports: [
        { id: 'loan_volume', name: 'Loan Volume Report', description: 'Total loan volume and trends' },
        { id: 'revenue_analysis', name: 'Revenue Analysis', description: 'Revenue breakdown and growth' },
        { id: 'risk_assessment', name: 'Risk Assessment', description: 'Loan risk analysis and metrics' }
      ]
    },
    {
      id: 'operational',
      name: 'Operational Reports',
      description: 'System performance and operational metrics',
      icon: Activity,
      reports: [
        { id: 'document_processing', name: 'Document Processing', description: 'Document verification metrics' },
        { id: 'user_activity', name: 'User Activity', description: 'User engagement and activity' },
        { id: 'system_performance', name: 'System Performance', description: 'Platform performance metrics' }
      ]
    },
    {
      id: 'blockchain',
      name: 'Blockchain Reports',
      description: 'Blockchain transactions and NFT metrics',
      icon: FileText,
      reports: [
        { id: 'transaction_volume', name: 'Transaction Volume', description: 'Blockchain transaction metrics' },
        { id: 'nft_analytics', name: 'NFT Analytics', description: 'NFT minting and ownership data' },
        { id: 'network_health', name: 'Network Health', description: 'Blockchain network status' }
      ]
    }
  ];

  const financialMetrics = {
    totalLoanVolume: '$2,456,789',
    monthlyGrowth: '+12.5%',
    averageLoanSize: '$45,000',
    totalRevenue: '$123,456',
    revenueGrowth: '+8.2%',
    activeLoans: '156',
    defaultRate: '2.1%',
    profitMargin: '15.3%'
  };

  const operationalMetrics = {
    documentsProcessed: '1,234',
    verificationSuccessRate: '98.5%',
    averageProcessingTime: '2.3 minutes',
    activeUsers: '156',
    userGrowth: '+15.2%',
    systemUptime: '99.8%',
    apiResponseTime: '45ms',
    errorRate: '0.2%'
  };

  const blockchainMetrics = {
    totalTransactions: '5,678',
    nftsMinted: '45',
    averageGasPrice: '25 Gwei',
    networkUtilization: '65%',
    syncSuccessRate: '99.9%',
    activeCanisters: '12',
    totalValueLocked: '$1,234,567',
    transactionSuccessRate: '98.7%'
  };

  const handleGenerateReport = (reportId) => {
    setIsGenerating(true);
    console.log('Generating report:', reportId);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownloadReport = (reportId) => {
    console.log('Downloading report:', reportId);
  };

  const handleViewReport = (reportId) => {
    console.log('Viewing report:', reportId);
  };

  return (
    <div className="admin-reports">
      {/* Header */}
      <div className="admin-reports-header">
        <div className="admin-reports-title">
          <h2>Reports & Analytics</h2>
          <p>Generate comprehensive financial and operational reports for the platform</p>
        </div>
        <div className="admin-reports-controls">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="admin-reports-date-select"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="admin-reports-action-btn">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Report Types */}
      <div className="admin-reports-types">
        {reportTypes.map((type) => (
          <div key={type.id} className="admin-reports-type-card">
            <div className="admin-reports-type-header">
              <type.icon className="w-6 h-6" />
              <h3>{type.name}</h3>
              <p>{type.description}</p>
            </div>
            <div className="admin-reports-type-content">
              {type.reports.map((report) => (
                <div key={report.id} className="admin-reports-item">
                  <div className="admin-reports-item-info">
                    <h4>{report.name}</h4>
                    <p>{report.description}</p>
                  </div>
                  <div className="admin-reports-item-actions">
                    <button
                      className="admin-reports-action-btn small"
                      onClick={() => handleViewReport(report.id)}
                      title="View Report"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="admin-reports-action-btn small"
                      onClick={() => handleGenerateReport(report.id)}
                      disabled={isGenerating}
                      title="Generate Report"
                    >
                      {isGenerating ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <BarChart3 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      className="admin-reports-action-btn small"
                      onClick={() => handleDownloadReport(report.id)}
                      title="Download Report"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Metrics Overview */}
      <div className="admin-reports-metrics">
        <div className="admin-reports-metrics-section">
          <h3>Financial Metrics</h3>
          <div className="admin-reports-metrics-grid">
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <DollarSign className="w-5 h-5" />
                <span>Total Loan Volume</span>
              </div>
              <div className="admin-reports-metric-value">{financialMetrics.totalLoanVolume}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>{financialMetrics.monthlyGrowth}</span>
              </div>
            </div>
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <DollarSign className="w-5 h-5" />
                <span>Total Revenue</span>
              </div>
              <div className="admin-reports-metric-value">{financialMetrics.totalRevenue}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>{financialMetrics.revenueGrowth}</span>
              </div>
            </div>
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <Users className="w-5 h-5" />
                <span>Active Loans</span>
              </div>
              <div className="admin-reports-metric-value">{financialMetrics.activeLoans}</div>
              <div className="admin-reports-metric-change neutral">
                <span>Current</span>
              </div>
            </div>
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <Activity className="w-5 h-5" />
                <span>Default Rate</span>
              </div>
              <div className="admin-reports-metric-value">{financialMetrics.defaultRate}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingDown className="w-4 h-4" />
                <span>Low</span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-reports-metrics-section">
          <h3>Operational Metrics</h3>
          <div className="admin-reports-metrics-grid">
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <FileText className="w-5 h-5" />
                <span>Documents Processed</span>
              </div>
              <div className="admin-reports-metric-value">{operationalMetrics.documentsProcessed}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>High Volume</span>
              </div>
            </div>
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <Activity className="w-5 h-5" />
                <span>Success Rate</span>
              </div>
              <div className="admin-reports-metric-value">{operationalMetrics.verificationSuccessRate}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>Excellent</span>
              </div>
            </div>
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <Users className="w-5 h-5" />
                <span>Active Users</span>
              </div>
              <div className="admin-reports-metric-value">{operationalMetrics.activeUsers}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>{operationalMetrics.userGrowth}</span>
              </div>
            </div>
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <Activity className="w-5 h-5" />
                <span>System Uptime</span>
              </div>
              <div className="admin-reports-metric-value">{operationalMetrics.systemUptime}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-reports-metrics-section">
          <h3>Blockchain Metrics</h3>
          <div className="admin-reports-metrics-grid">
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <Activity className="w-5 h-5" />
                <span>Total Transactions</span>
              </div>
              <div className="admin-reports-metric-value">{blockchainMetrics.totalTransactions}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>Growing</span>
              </div>
            </div>
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <FileText className="w-5 h-5" />
                <span>NFTs Minted</span>
              </div>
              <div className="admin-reports-metric-value">{blockchainMetrics.nftsMinted}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>Active</span>
              </div>
            </div>
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <Activity className="w-5 h-5" />
                <span>Success Rate</span>
              </div>
              <div className="admin-reports-metric-value">{blockchainMetrics.transactionSuccessRate}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>High</span>
              </div>
            </div>
            <div className="admin-reports-metric-card">
              <div className="admin-reports-metric-header">
                <DollarSign className="w-5 h-5" />
                <span>Value Locked</span>
              </div>
              <div className="admin-reports-metric-value">{blockchainMetrics.totalValueLocked}</div>
              <div className="admin-reports-metric-change positive">
                <TrendingUp className="w-4 h-4" />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="admin-reports-charts">
        <div className="admin-reports-chart-card">
          <div className="admin-reports-chart-header">
            <h3>Loan Volume Trends</h3>
            <LineChart className="w-5 h-5" />
          </div>
          <div className="admin-reports-chart-content">
            <div className="admin-reports-chart-placeholder">
              <LineChart className="w-16 h-16 text-gray-400" />
              <p>Loan volume trends chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="admin-reports-chart-card">
          <div className="admin-reports-chart-header">
            <h3>Document Processing</h3>
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="admin-reports-chart-content">
            <div className="admin-reports-chart-placeholder">
              <BarChart3 className="w-16 h-16 text-gray-400" />
              <p>Document processing chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="admin-reports-chart-card">
          <div className="admin-reports-chart-header">
            <h3>User Activity</h3>
            <PieChart className="w-5 h-5" />
          </div>
          <div className="admin-reports-chart-content">
            <div className="admin-reports-chart-placeholder">
              <PieChart className="w-16 h-16 text-gray-400" />
              <p>User activity chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="admin-reports-chart-card">
          <div className="admin-reports-chart-header">
            <h3>Blockchain Transactions</h3>
            <Activity className="w-5 h-5" />
          </div>
          <div className="admin-reports-chart-content">
            <div className="admin-reports-chart-placeholder">
              <Activity className="w-16 h-16 text-gray-400" />
              <p>Blockchain transactions chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
