import React from 'react';
import styles from '../../styles/landing/Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Background Elements */}
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.backgroundPattern}></div>
      
      {/* Hero Content */}
      <div className={styles.container}>
        <div className={styles.content}>
        
          {/* Main Title */}
          <h1 className={styles.title}>
            <span className={styles.titleMain}>Decentralized Trade Finance</span>
            <span className={styles.titleSub}>for the MENA Region</span>
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Tokenize verified customs documents as NFTs on Internet Computer and unlock instant DeFi loans. 
            Helping importers in Egypt and the region access funding through CargoX and ACI/NAFEZA integration.
          </p>

          {/* CTA Button */}
          <div className={styles.ctaContainer}>
            <button className={styles.ctaButton}>
              <span className={styles.ctaText}>Explore Demo</span>
              <span className={styles.ctaIcon}>→</span>
            </button>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>$50M+</div>
              <div className={styles.statLabel}>Trade Volume</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1,000+</div>
              <div className={styles.statLabel}>Documents Verified</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Active Traders</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>99.9%</div>
              <div className={styles.statLabel}>Uptime</div>
            </div>
          </div>
        </div>

        {/* Visual Elements */}
        <div className={styles.visualContainer}>
          <div className={styles.floatingCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>📄</div>
              <div className={styles.cardTitle}>Document Verified</div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardRow}>
                <span>Document ID:</span>
                <span>CTX-2024-001</span>
              </div>
              <div className={styles.cardRow}>
                <span>Status:</span>
                <span className={styles.statusVerified}>Verified ✓</span>
              </div>
              <div className={styles.cardRow}>
                <span>Loan Amount:</span>
                <span className={styles.amount}>$25,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>Scroll to explore</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </section>
  );
};

export default Hero;
