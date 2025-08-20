import React, { useState } from 'react';
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Database,
  Globe,
  Bell,
  Users,
  Activity,
  DollarSign,
  FileText,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Mock settings data - in real app, this would come from API
  const settings = {
    general: {
      platformName: 'CargoTrace Finance',
      platformVersion: '2.1.0',
      maintenanceMode: false,
      debugMode: false,
      timezone: 'Africa/Cairo',
      language: 'en',
      dateFormat: 'DD/MM/YYYY',
      currency: 'USD'
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true
      },
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      maxLoginAttempts: 5,
      lockoutDuration: 15
    },
    blockchain: {
      ethereumNetwork: 'mainnet',
      icpNetwork: 'mainnet',
      gasLimit: 300000,
      gasPrice: '25',
      nafezaApiKey: '********',
      nafezaEndpoint: 'https://api.nafeza.gov.eg',
      syncInterval: 30
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      adminAlerts: true,
      userAlerts: true,
      systemAlerts: true,
      alertLevels: ['error', 'warning', 'info']
    },
    integrations: {
      cargoXApiKey: '********',
      cargoXEndpoint: 'https://api.cargox.io',
      ethereumRpcUrl: 'https://mainnet.infura.io/v3/...',
      icpCanisterId: 'abc123-def456-ghi789',
      webhookUrl: 'https://webhook.site/...',
      webhookSecret: '********'
    },
    limits: {
      maxLoanAmount: 1000000,
      minLoanAmount: 1000,
      maxDocumentsPerUser: 50,
      maxLoansPerUser: 10,
      documentFileSizeLimit: 10,
      supportedFileTypes: ['pdf', 'jpg', 'png', 'doc', 'docx']
    }
  };

  const [formData, setFormData] = useState(settings);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async (section) => {
    setIsSaving(true);
    console.log('Saving settings for section:', section, formData[section]);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleTestConnection = (integration) => {
    console.log('Testing connection for:', integration);
  };

  const settingsTabs = [
    {
      id: 'general',
      name: 'General',
      icon: Settings,
      description: 'Basic platform configuration'
    },
    {
      id: 'security',
      name: 'Security',
      icon: Shield,
      description: 'Security and authentication settings'
    },
    {
      id: 'blockchain',
      name: 'Blockchain',
      icon: Database,
      description: 'Blockchain network configuration'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      description: 'Notification preferences'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: Globe,
      description: 'Third-party service integrations'
    },
    {
      id: 'limits',
      name: 'Limits',
      icon: Activity,
      description: 'Platform limits and restrictions'
    }
  ];

  const renderGeneralSettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-group">
        <h3>Platform Information</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Platform Name</label>
            <input
              type="text"
              value={formData.general.platformName}
              onChange={(e) => handleInputChange('general', 'platformName', e.target.value)}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <label>Platform Version</label>
            <input
              type="text"
              value={formData.general.platformVersion}
              disabled
              className="admin-settings-input disabled"
            />
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>System Settings</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Maintenance Mode</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.general.maintenanceMode}
                onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
          <div className="admin-settings-field">
            <label>Debug Mode</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.general.debugMode}
                onChange={(e) => handleInputChange('general', 'debugMode', e.target.checked)}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>Regional Settings</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Timezone</label>
            <select
              value={formData.general.timezone}
              onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
              className="admin-settings-select"
            >
              <option value="Africa/Cairo">Africa/Cairo</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </div>
          <div className="admin-settings-field">
            <label>Language</label>
            <select
              value={formData.general.language}
              onChange={(e) => handleInputChange('general', 'language', e.target.value)}
              className="admin-settings-select"
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="admin-settings-field">
            <label>Currency</label>
            <select
              value={formData.general.currency}
              onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
              className="admin-settings-select"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="EGP">EGP</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-group">
        <h3>Authentication</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Two-Factor Authentication</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.security.twoFactorAuth}
                onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
          <div className="admin-settings-field">
            <label>Session Timeout (minutes)</label>
            <input
              type="number"
              value={formData.security.sessionTimeout}
              onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="admin-settings-input"
            />
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>Password Policy</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Minimum Length</label>
            <input
              type="number"
              value={formData.security.passwordPolicy.minLength}
              onChange={(e) => handleInputChange('security', 'passwordPolicy', {
                ...formData.security.passwordPolicy,
                minLength: parseInt(e.target.value)
              })}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <label>Require Uppercase</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.security.passwordPolicy.requireUppercase}
                onChange={(e) => handleInputChange('security', 'passwordPolicy', {
                  ...formData.security.passwordPolicy,
                  requireUppercase: e.target.checked
                })}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>Access Control</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Max Login Attempts</label>
            <input
              type="number"
              value={formData.security.maxLoginAttempts}
              onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <label>Lockout Duration (minutes)</label>
            <input
              type="number"
              value={formData.security.lockoutDuration}
              onChange={(e) => handleInputChange('security', 'lockoutDuration', parseInt(e.target.value))}
              className="admin-settings-input"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlockchainSettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-group">
        <h3>Network Configuration</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Ethereum Network</label>
            <select
              value={formData.blockchain.ethereumNetwork}
              onChange={(e) => handleInputChange('blockchain', 'ethereumNetwork', e.target.value)}
              className="admin-settings-select"
            >
              <option value="mainnet">Mainnet</option>
              <option value="goerli">Goerli Testnet</option>
              <option value="sepolia">Sepolia Testnet</option>
            </select>
          </div>
          <div className="admin-settings-field">
            <label>ICP Network</label>
            <select
              value={formData.blockchain.icpNetwork}
              onChange={(e) => handleInputChange('blockchain', 'icpNetwork', e.target.value)}
              className="admin-settings-select"
            >
              <option value="mainnet">Mainnet</option>
              <option value="testnet">Testnet</option>
            </select>
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>Gas Settings</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Gas Limit</label>
            <input
              type="number"
              value={formData.blockchain.gasLimit}
              onChange={(e) => handleInputChange('blockchain', 'gasLimit', parseInt(e.target.value))}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <label>Gas Price (Gwei)</label>
            <input
              type="text"
              value={formData.blockchain.gasPrice}
              onChange={(e) => handleInputChange('blockchain', 'gasPrice', e.target.value)}
              className="admin-settings-input"
            />
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>NAFEZA Integration</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>API Key</label>
            <div className="admin-settings-password-field">
              <input
                type="password"
                value={formData.blockchain.nafezaApiKey}
                onChange={(e) => handleInputChange('blockchain', 'nafezaApiKey', e.target.value)}
                className="admin-settings-input"
              />
              <button className="admin-settings-password-toggle">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="admin-settings-field">
            <label>Endpoint</label>
            <input
              type="url"
              value={formData.blockchain.nafezaEndpoint}
              onChange={(e) => handleInputChange('blockchain', 'nafezaEndpoint', e.target.value)}
              className="admin-settings-input"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-group">
        <h3>Notification Channels</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Email Notifications</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.notifications.emailNotifications}
                onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
          <div className="admin-settings-field">
            <label>SMS Notifications</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.notifications.smsNotifications}
                onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
          <div className="admin-settings-field">
            <label>Push Notifications</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.notifications.pushNotifications}
                onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>Alert Types</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Admin Alerts</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.notifications.adminAlerts}
                onChange={(e) => handleInputChange('notifications', 'adminAlerts', e.target.checked)}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
          <div className="admin-settings-field">
            <label>User Alerts</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.notifications.userAlerts}
                onChange={(e) => handleInputChange('notifications', 'userAlerts', e.target.checked)}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
          <div className="admin-settings-field">
            <label>System Alerts</label>
            <div className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={formData.notifications.systemAlerts}
                onChange={(e) => handleInputChange('notifications', 'systemAlerts', e.target.checked)}
                className="admin-settings-checkbox"
              />
              <span className="admin-settings-toggle-slider"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-group">
        <h3>CargoX Integration</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>API Key</label>
            <div className="admin-settings-password-field">
              <input
                type="password"
                value={formData.integrations.cargoXApiKey}
                onChange={(e) => handleInputChange('integrations', 'cargoXApiKey', e.target.value)}
                className="admin-settings-input"
              />
              <button className="admin-settings-password-toggle">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="admin-settings-field">
            <label>Endpoint</label>
            <input
              type="url"
              value={formData.integrations.cargoXEndpoint}
              onChange={(e) => handleInputChange('integrations', 'cargoXEndpoint', e.target.value)}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <button
              className="admin-settings-test-btn"
              onClick={() => handleTestConnection('cargoX')}
            >
              <Activity className="w-4 h-4" />
              Test Connection
            </button>
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>Blockchain RPC</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Ethereum RPC URL</label>
            <input
              type="url"
              value={formData.integrations.ethereumRpcUrl}
              onChange={(e) => handleInputChange('integrations', 'ethereumRpcUrl', e.target.value)}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <label>ICP Canister ID</label>
            <input
              type="text"
              value={formData.integrations.icpCanisterId}
              onChange={(e) => handleInputChange('integrations', 'icpCanisterId', e.target.value)}
              className="admin-settings-input"
            />
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>Webhooks</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Webhook URL</label>
            <input
              type="url"
              value={formData.integrations.webhookUrl}
              onChange={(e) => handleInputChange('integrations', 'webhookUrl', e.target.value)}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <label>Webhook Secret</label>
            <div className="admin-settings-password-field">
              <input
                type="password"
                value={formData.integrations.webhookSecret}
                onChange={(e) => handleInputChange('integrations', 'webhookSecret', e.target.value)}
                className="admin-settings-input"
              />
              <button className="admin-settings-password-toggle">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLimitsSettings = () => (
    <div className="admin-settings-section">
      <div className="admin-settings-group">
        <h3>Loan Limits</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Maximum Loan Amount ($)</label>
            <input
              type="number"
              value={formData.limits.maxLoanAmount}
              onChange={(e) => handleInputChange('limits', 'maxLoanAmount', parseInt(e.target.value))}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <label>Minimum Loan Amount ($)</label>
            <input
              type="number"
              value={formData.limits.minLoanAmount}
              onChange={(e) => handleInputChange('limits', 'minLoanAmount', parseInt(e.target.value))}
              className="admin-settings-input"
            />
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>User Limits</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Max Documents Per User</label>
            <input
              type="number"
              value={formData.limits.maxDocumentsPerUser}
              onChange={(e) => handleInputChange('limits', 'maxDocumentsPerUser', parseInt(e.target.value))}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <label>Max Loans Per User</label>
            <input
              type="number"
              value={formData.limits.maxLoansPerUser}
              onChange={(e) => handleInputChange('limits', 'maxLoansPerUser', parseInt(e.target.value))}
              className="admin-settings-input"
            />
          </div>
        </div>
      </div>

      <div className="admin-settings-group">
        <h3>File Upload Limits</h3>
        <div className="admin-settings-grid">
          <div className="admin-settings-field">
            <label>Document File Size Limit (MB)</label>
            <input
              type="number"
              value={formData.limits.documentFileSizeLimit}
              onChange={(e) => handleInputChange('limits', 'documentFileSizeLimit', parseInt(e.target.value))}
              className="admin-settings-input"
            />
          </div>
          <div className="admin-settings-field">
            <label>Supported File Types</label>
            <input
              type="text"
              value={formData.limits.supportedFileTypes.join(', ')}
              onChange={(e) => handleInputChange('limits', 'supportedFileTypes', e.target.value.split(', '))}
              className="admin-settings-input"
              placeholder="pdf, jpg, png, doc, docx"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'blockchain':
        return renderBlockchainSettings();
      case 'notifications':
        return renderNotificationsSettings();
      case 'integrations':
        return renderIntegrationsSettings();
      case 'limits':
        return renderLimitsSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="admin-settings">
      {/* Header */}
      <div className="admin-settings-header">
        <div className="admin-settings-title">
          <h2>System Settings</h2>
          <p>Configure platform settings, integrations, and system preferences</p>
        </div>
        <div className="admin-settings-actions">
          <button
            className="admin-settings-action-btn"
            onClick={() => handleSaveSettings(activeTab)}
            disabled={isSaving}
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="admin-settings-tabs">
        {settingsTabs.map((tab) => (
          <button
            key={tab.id}
            className={`admin-settings-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="w-5 h-5" />
            <div className="admin-settings-tab-content">
              <span className="admin-settings-tab-name">{tab.name}</span>
              <span className="admin-settings-tab-description">{tab.description}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="admin-settings-content">
        {renderSettingsContent()}
      </div>
    </div>
  );
};

export default AdminSettings;
