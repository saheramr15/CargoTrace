import React from 'react';
import styles from './NewFooter.module.css';

const NewFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>🚢</span>
              <span className={styles.logoText}>CargoTrace</span>
            </div>
            <p className={styles.brandDescription}>
              Revolutionizing trade finance in the MENA region through blockchain innovation. 
              Connecting traditional commerce with cutting-edge DeFi solutions for a more 
              efficient and accessible global trade ecosystem.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Email">
                <span>📧</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Telegram">
                <span>📱</span>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className={styles.linksSection}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Product</h4>
              <ul className={styles.linkList}>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#technology">Technology</a></li>
                <li><a href="#">API Documentation</a></li>
                <li><a href="#">Integration Guide</a></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Company</h4>
              <ul className={styles.linkList}>
                <li><a href="#about">About Us</a></li>
                <li><a href="#partners">Partners</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press Kit</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Support</h4>
              <ul className={styles.linkList}>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Status Page</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Legal</h4>
              <ul className={styles.linkList}>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Compliance</a></li>
                <li><a href="#">Licenses</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className={styles.bottomFooter}>
          <div className={styles.copyright}>
            © 2024 CargoTrace Finance. Built on Internet Computer. All rights reserved.
          </div>
          <div className={styles.techBadges}>
            <span className={styles.badge}>ICP</span>
            <span className={styles.badge}>Ethereum</span>
            <span className={styles.badge}>CargoX</span>
            <span className={styles.badge}>NAFEZA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
