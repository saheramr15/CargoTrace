const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand fade-in animate">
            <h3>CargoTrace Finance</h3>
            <p>
              Revolutionizing trade finance through blockchain innovation. 
              Connecting traditional commerce with cutting-edge DeFi solutions 
              for a more efficient and accessible global trade ecosystem.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">📧</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
              <a href="#" className="social-link">📱</a>
            </div>
          </div>
          
          <div className="footer-section fade-in animate">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#process">How It Works</a></li>
              <li><a href="#stats">Statistics</a></li>
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">Integration Guide</a></li>
            </ul>
          </div>
          
          <div className="footer-section fade-in animate">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Kit</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section fade-in animate">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Status Page</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2024 CargoTrace Finance. Built on Internet Computer. All rights reserved.
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 