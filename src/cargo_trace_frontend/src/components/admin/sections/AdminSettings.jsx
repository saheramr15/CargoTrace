import React, { useState } from 'react';
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Database,
  Globe,
  Zap,
  Bell,
  User,
  Lock,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  BarChart3,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  ExternalLink
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'CargoTrace Finance',
      siteDescription: 'DeFi + TradeTech platform for Egypt and MENA region',
      timezone: 'Africa/Cairo',
      language: 'en',
      maintenanceMode: false,
      debugMode: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordPolicy: 'strong',
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      sslEnabled: true
    },
    blockchain: {
      ethereumRpc: 'https://mainnet.infura.io/v3/your-key',
      icpEndpoint: 'https://ic0.app',
      cargoXApiKey: 'cargox-api-key-here',
      nafezaApiKey: 'nafeza-api-key-here',
      gasLimit: 300000,
      confirmations: 12
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      webhookUrl: 'https://webhook.site/your-url',
      alertLevel: 'medium',
      digestFrequency: 'daily'
    },
    integrations: {
      cargoXWebhook: 'https://your-domain.com/webhooks/cargox',
      nafezaWebhook: 'https://your-domain.com/webhooks/nafeza',
      ethereumWebhook: 'https://your-domain.com/webhooks/ethereum',
      icpWebhook: 'https://your-domain.com/webhooks/icp'
    }
  });

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = (section) => {
    console.log(`Saving ${section} settings:`, settings[section]);
    // In real app, this would make an API call
  };

  const handleTestConnection = (service) => {
    console.log(`Testing ${service} connection...`);
    // In real app, this would test the connection
  };

  const handleBackupSystem = () => {
    console.log('Creating system backup...');
    // In real app, this would create a backup
  };

  const handleRestoreSystem = () => {
    console.log('Restoring system from backup...');
    // In real app, this would restore from backup
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'blockchain', label: 'Blockchain', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'backup', label: 'Backup & Restore', icon: Download }
  ];

  return (
    <div className="admin-settings">
      {/* Header */}
      <div className="admin-settings-header">
        <div className="admin-settings-title">
          <h2>System Settings</h2>
          <p>Configure platform parameters, security settings, and integrations</p>
        </div>
        <div className="admin-settings-actions">
          <button className="admin-settings-action-btn">
            <RefreshCw className="w-4 h-4" />
            Reset to Defaults
          </button>
          <button className="admin-settings-action-btn primary">
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="admin-settings-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`admin-settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="admin-settings-content">
        {activeTab === 'general' && (
          <div className="admin-settings-section">
            <h3>General Settings</h3>
            <div className="admin-settings-grid">
              <div className="admin-settings-field">
                <label>Site Name</label>
                <input
                  type="text"
                  value={settings.general.siteName}
                  onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                  className="admin-settings-input"
                />
              </div>
              <div className="admin-settings-field">
                <label>Site Description</label>
                <textarea
                  value={settings.general.siteDescription}
                  onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                  className="admin-settings-textarea"
                  rows="3"
                />
              </div>
              <div className="admin-settings-field">
                <label>Timezone</label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                  className="admin-settings-select"
                >
                  <option value="Africa/Cairo">Africa/Cairo</option>
                  <option value="UTC">UTC</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </div>
              <div className="admin-settings-field">
                <label>Language</label>
                <select
                  value={settings.general.language}
                  onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                  className="admin-settings-select"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div className="admin-settings-field">
                <label className="admin-settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                    className="admin-settings-checkbox"
                  />
                  Maintenance Mode
                </label>
              </div>
              <div className="admin-settings-field">
                <label className="admin-settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.general.debugMode}
                    onChange={(e) => handleSettingChange('general', 'debugMode', e.target.checked)}
                    className="admin-settings-checkbox"
                  />
                  Debug Mode
                </label>
              </div>
            </div>
            <button 
              className="admin-settings-save-btn"
              onClick={() => handleSaveSettings('general')}
            >
              <Save className="w-4 h-4" />
              Save General Settings
            </button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="admin-settings-section">
            <h3>Security Settings</h3>
            <div className="admin-settings-grid">
              <div className="admin-settings-field">
                <label className="admin-settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                    className="admin-settings-checkbox"
                  />
                  Enable Two-Factor Authentication
                </label>
              </div>
              <div className="admin-settings-field">
                <label>Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="admin-settings-input"
                  min="5"
                  max="1440"
                />
              </div>
              <div className="admin-settings-field">
                <label>Max Login Attempts</label>
                <input
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  className="admin-settings-input"
                  min="3"
                  max="10"
                />
              </div>
              <div className="admin-settings-field">
                <label>Password Policy</label>
                <select
                  value={settings.security.passwordPolicy}
                  onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
                  className="admin-settings-select"
                >
                  <option value="basic">Basic (8+ characters)</option>
                  <option value="medium">Medium (10+ chars, mixed case)</option>
                  <option value="strong">Strong (12+ chars, symbols, numbers)</option>
                </select>
              </div>
              <div className="admin-settings-field">
                <label>IP Whitelist (one per line)</label>
                <textarea
                  value={settings.security.ipWhitelist.join('\n')}
                  onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value.split('\n'))}
                  className="admin-settings-textarea"
                  rows="4"
                  placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                />
              </div>
              <div className="admin-settings-field">
                <label className="admin-settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.security.sslEnabled}
                    onChange={(e) => handleSettingChange('security', 'sslEnabled', e.target.checked)}
                    className="admin-settings-checkbox"
                  />
                  Force SSL/HTTPS
                </label>
              </div>
            </div>
            <button 
              className="admin-settings-save-btn"
              onClick={() => handleSaveSettings('security')}
            >
              <Save className="w-4 h-4" />
              Save Security Settings
            </button>
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div className="admin-settings-section">
            <h3>Blockchain Configuration</h3>
            <div className="admin-settings-grid">
              <div className="admin-settings-field">
                <label>Ethereum RPC URL</label>
                <div className="admin-settings-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={settings.blockchain.ethereumRpc}
                    onChange={(e) => handleSettingChange('blockchain', 'ethereumRpc', e.target.value)}
                    className="admin-settings-input"
                    placeholder="https://mainnet.infura.io/v3/your-key"
                  />
                  <button
                    className="admin-settings-input-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button 
                  className="admin-settings-test-btn"
                  onClick={() => handleTestConnection('ethereum')}
                >
                  <Activity className="w-4 h-4" />
                  Test Connection
                </button>
              </div>
              <div className="admin-settings-field">
                <label>ICP Endpoint</label>
                <input
                  type="text"
                  value={settings.blockchain.icpEndpoint}
                  onChange={(e) => handleSettingChange('blockchain', 'icpEndpoint', e.target.value)}
                  className="admin-settings-input"
                  placeholder="https://ic0.app"
                />
                <button 
                  className="admin-settings-test-btn"
                  onClick={() => handleTestConnection('icp')}
                >
                  <Activity className="w-4 h-4" />
                  Test Connection
                </button>
              </div>
              <div className="admin-settings-field">
                <label>CargoX API Key</label>
                <div className="admin-settings-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={settings.blockchain.cargoXApiKey}
                    onChange={(e) => handleSettingChange('blockchain', 'cargoXApiKey', e.target.value)}
                    className="admin-settings-input"
                    placeholder="cargox-api-key-here"
                  />
                  <button
                    className="admin-settings-input-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="admin-settings-field">
                <label>NAFEZA API Key</label>
                <div className="admin-settings-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={settings.blockchain.nafezaApiKey}
                    onChange={(e) => handleSettingChange('blockchain', 'nafezaApiKey', e.target.value)}
                    className="admin-settings-input"
                    placeholder="nafeza-api-key-here"
                  />
                  <button
                    className="admin-settings-input-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="admin-settings-field">
                <label>Gas Limit</label>
                <input
                  type="number"
                  value={settings.blockchain.gasLimit}
                  onChange={(e) => handleSettingChange('blockchain', 'gasLimit', parseInt(e.target.value))}
                  className="admin-settings-input"
                  min="21000"
                  max="1000000"
                />
              </div>
              <div className="admin-settings-field">
                <label>Confirmations Required</label>
                <input
                  type="number"
                  value={settings.blockchain.confirmations}
                  onChange={(e) => handleSettingChange('blockchain', 'confirmations', parseInt(e.target.value))}
                  className="admin-settings-input"
                  min="1"
                  max="50"
                />
              </div>
            </div>
            <button 
              className="admin-settings-save-btn"
              onClick={() => handleSaveSettings('blockchain')}
            >
              <Save className="w-4 h-4" />
              Save Blockchain Settings
            </button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="admin-settings-section">
            <h3>Notification Settings</h3>
            <div className="admin-settings-grid">
              <div className="admin-settings-field">
                <label className="admin-settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailEnabled}
                    onChange={(e) => handleSettingChange('notifications', 'emailEnabled', e.target.checked)}
                    className="admin-settings-checkbox"
                  />
                  Enable Email Notifications
                </label>
              </div>
              <div className="admin-settings-field">
                <label className="admin-settings-checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.notifications.smsEnabled}
                    onChange={(e) => handleSettingChange('notifications', 'smsEnabled', e.target.checked)}
                    className="admin-settings-checkbox"
                  />
                  Enable SMS Notifications
                </label>
              </div>
              <div className="admin-settings-field">
                <label>Webhook URL</label>
                <input
                  type="url"
                  value={settings.notifications.webhookUrl}
                  onChange={(e) => handleSettingChange('notifications', 'webhookUrl', e.target.value)}
                  className="admin-settings-input"
                  placeholder="https://webhook.site/your-url"
                />
              </div>
              <div className="admin-settings-field">
                <label>Alert Level</label>
                <select
                  value={settings.notifications.alertLevel}
                  onChange={(e) => handleSettingChange('notifications', 'alertLevel', e.target.value)}
                  className="admin-settings-select"
                >
                  <option value="low">Low (Info only)</option>
                  <option value="medium">Medium (Warnings + Info)</option>
                  <option value="high">High (All alerts)</option>
                </select>
              </div>
              <div className="admin-settings-field">
                <label>Digest Frequency</label>
                <select
                  value={settings.notifications.digestFrequency}
                  onChange={(e) => handleSettingChange('notifications', 'digestFrequency', e.target.value)}
                  className="admin-settings-select"
                >
                  <option value="immediate">Immediate</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
            <button 
              className="admin-settings-save-btn"
              onClick={() => handleSaveSettings('notifications')}
            >
              <Save className="w-4 h-4" />
              Save Notification Settings
            </button>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="admin-settings-section">
            <h3>Integration Webhooks</h3>
            <div className="admin-settings-grid">
              <div className="admin-settings-field">
                <label>CargoX Webhook URL</label>
                <input
                  type="url"
                  value={settings.integrations.cargoXWebhook}
                  onChange={(e) => handleSettingChange('integrations', 'cargoXWebhook', e.target.value)}
                  className="admin-settings-input"
                  placeholder="https://your-domain.com/webhooks/cargox"
                />
                <button 
                  className="admin-settings-test-btn"
                  onClick={() => handleTestConnection('cargox-webhook')}
                >
                  <ExternalLink className="w-4 h-4" />
                  Test Webhook
                </button>
              </div>
              <div className="admin-settings-field">
                <label>NAFEZA Webhook URL</label>
                <input
                  type="url"
                  value={settings.integrations.nafezaWebhook}
                  onChange={(e) => handleSettingChange('integrations', 'nafezaWebhook', e.target.value)}
                  className="admin-settings-input"
                  placeholder="https://your-domain.com/webhooks/nafeza"
                />
                <button 
                  className="admin-settings-test-btn"
                  onClick={() => handleTestConnection('nafeza-webhook')}
                >
                  <ExternalLink className="w-4 h-4" />
                  Test Webhook
                </button>
              </div>
              <div className="admin-settings-field">
                <label>Ethereum Webhook URL</label>
                <input
                  type="url"
                  value={settings.integrations.ethereumWebhook}
                  onChange={(e) => handleSettingChange('integrations', 'ethereumWebhook', e.target.value)}
                  className="admin-settings-input"
                  placeholder="https://your-domain.com/webhooks/ethereum"
                />
                <button 
                  className="admin-settings-test-btn"
                  onClick={() => handleTestConnection('ethereum-webhook')}
                >
                  <ExternalLink className="w-4 h-4" />
                  Test Webhook
                </button>
              </div>
              <div className="admin-settings-field">
                <label>ICP Webhook URL</label>
                <input
                  type="url"
                  value={settings.integrations.icpWebhook}
                  onChange={(e) => handleSettingChange('integrations', 'icpWebhook', e.target.value)}
                  className="admin-settings-input"
                  placeholder="https://your-domain.com/webhooks/icp"
                />
                <button 
                  className="admin-settings-test-btn"
                  onClick={() => handleTestConnection('icp-webhook')}
                >
                  <ExternalLink className="w-4 h-4" />
                  Test Webhook
                </button>
              </div>
            </div>
            <button 
              className="admin-settings-save-btn"
              onClick={() => handleSaveSettings('integrations')}
            >
              <Save className="w-4 h-4" />
              Save Integration Settings
            </button>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="admin-settings-section">
            <h3>Backup & Restore</h3>
            <div className="admin-settings-backup-grid">
              <div className="admin-settings-backup-card">
                <h4>System Backup</h4>
                <p>Create a complete backup of all system data, settings, and configurations</p>
                <div className="admin-settings-backup-actions">
                  <button 
                    className="admin-settings-backup-btn"
                    onClick={handleBackupSystem}
                  >
                    <Download className="w-4 h-4" />
                    Create Backup
                  </button>
                  <button className="admin-settings-backup-btn secondary">
                    <Clock className="w-4 h-4" />
                    Schedule Auto-Backup
                  </button>
                </div>
              </div>
              <div className="admin-settings-backup-card">
                <h4>System Restore</h4>
                <p>Restore the system from a previous backup file</p>
                <div className="admin-settings-backup-actions">
                  <button className="admin-settings-backup-btn">
                    <Upload className="w-4 h-4" />
                    Choose Backup File
                  </button>
                  <button 
                    className="admin-settings-backup-btn danger"
                    onClick={handleRestoreSystem}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Restore System
                  </button>
                </div>
              </div>
            </div>
            <div className="admin-settings-backup-info">
              <h4>Backup Information</h4>
              <ul>
                <li>Last backup: 2024-01-20 14:30:00 UTC</li>
                <li>Backup size: 2.4 GB</li>
                <li>Auto-backup: Enabled (Daily at 02:00 UTC)</li>
                <li>Retention: 30 days</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
