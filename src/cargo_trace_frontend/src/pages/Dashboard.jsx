import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Dashboard = () => {
  useScrollAnimation();

  return (
    <div className="dashboard">
      <div className="dashboard-header fade-in animate">
        <h1 className="gradient-text">CargoTrace Dashboard</h1>
        <p>Monitor your trade finance activities and document verifications</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card fade-in animate">
          <h3>Active Documents</h3>
          <div className="dashboard-stat">24</div>
          <p>Documents being processed</p>
        </div>
        
        <div className="dashboard-card fade-in animate">
          <h3>Total Volume</h3>
          <div className="dashboard-stat">$2.4M</div>
          <p>Trade volume this month</p>
        </div>
        
        <div className="dashboard-card fade-in animate">
          <h3>Pending Loans</h3>
          <div className="dashboard-stat">8</div>
          <p>Loans awaiting approval</p>
        </div>
        
        <div className="dashboard-card fade-in animate">
          <h3>Success Rate</h3>
          <div className="dashboard-stat">98.5%</div>
          <p>Document verification success</p>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-section slide-in-left animate">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📄</span>
              <div className="activity-details">
                <h4>Document Verified</h4>
                <p>CargoX document #CX-2024-001 verified successfully</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">💰</span>
              <div className="activity-details">
                <h4>Loan Approved</h4>
                <p>Trade finance loan of $150,000 approved</p>
                <span className="activity-time">4 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🔗</span>
              <div className="activity-details">
                <h4>Chain Fusion Event</h4>
                <p>Cross-chain verification completed on ICP</p>
                <span className="activity-time">6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-section slide-in-right animate">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="btn-primary">Upload Document</button>
            <button className="btn-secondary">Request Loan</button>
            <button className="btn-secondary">View Analytics</button>
            <button className="btn-secondary">Export Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 