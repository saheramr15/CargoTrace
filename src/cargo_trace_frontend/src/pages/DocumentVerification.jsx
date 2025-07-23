import { useScrollAnimation } from '../hooks/useScrollAnimation';

const DocumentVerification = () => {
  useScrollAnimation();

  return (
    <div className="document-verification">
      <div className="page-header fade-in animate">
        <h1 className="gradient-text">Document Verification</h1>
        <p>Monitor and verify CargoX documents across Ethereum and ICP networks</p>
      </div>
      
      <div className="verification-grid">
        <div className="verification-card slide-in-left animate">
          <h3>📄 Document Upload</h3>
          <div className="upload-area">
            <div className="upload-icon">📁</div>
            <p>Drag and drop CargoX documents here</p>
            <button className="btn-primary">Browse Files</button>
          </div>
        </div>
        
        <div className="verification-card fade-in animate">
          <h3>🔍 Verification Status</h3>
          <div className="status-list">
            <div className="status-item">
              <span className="status-icon">✅</span>
              <span>Ethereum Verification</span>
              <span className="status-badge success">Complete</span>
            </div>
            <div className="status-item">
              <span className="status-icon">⏳</span>
              <span>ICP Chain Fusion</span>
              <span className="status-badge pending">Processing</span>
            </div>
            <div className="status-item">
              <span className="status-icon">🔄</span>
              <span>Customs Matching</span>
              <span className="status-badge pending">Pending</span>
            </div>
          </div>
        </div>
        
        <div className="verification-card slide-in-right animate">
          <h3>📊 Verification History</h3>
          <div className="history-list">
            <div className="history-item">
              <div className="history-details">
                <h4>Document #CX-2024-001</h4>
                <p>Verified on 2024-01-15 at 14:30 UTC</p>
              </div>
              <span className="history-status success">✓</span>
            </div>
            <div className="history-item">
              <div className="history-details">
                <h4>Document #CX-2024-002</h4>
                <p>Verified on 2024-01-14 at 09:15 UTC</p>
              </div>
              <span className="history-status success">✓</span>
            </div>
            <div className="history-item">
              <div className="history-details">
                <h4>Document #CX-2024-003</h4>
                <p>Failed verification on 2024-01-13</p>
              </div>
              <span className="history-status error">✗</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="verification-actions">
        <div className="action-section fade-in animate">
          <h2>Quick Verification</h2>
          <div className="action-buttons">
            <button className="btn-primary">Verify New Document</button>
            <button className="btn-secondary">Batch Verification</button>
            <button className="btn-secondary">Export Results</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification; 