import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Overlay */}
      <div className="hero-background-overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-gradient">
            CargoTrace
          </span>{' '}
          Finance
        </h1>
        <p className="hero-description">
          Revolutionizing trade finance in Egypt and MENA with blockchain-powered document verification and decentralized lending on the Internet Computer.
        </p>

        {/* Hero Buttons */}
        <div className="hero-buttons">
          <button className="hero-button primary">
            Start Trading Now
          </button>
          <button className="hero-button secondary">
            Watch Demo
          </button>
        </div>

        {/* Hero Stats */}
        <div className="hero-stats">
          <div className="hero-stat-item">
            <div className="hero-stat-value">$50M+</div>
            <div className="hero-stat-label">Trade Volume</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-value">1,000+</div>
            <div className="hero-stat-label">Documents Verified</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-value">500+</div>
            <div className="hero-stat-label">Active Traders</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-value">99.9%</div>
            <div className="hero-stat-label">Uptime</div>
          </div>
        </div>
      </div>

      {/* Subtle Background Animation */}
      <div className="hero-background-animation">
        <div className="hero-bg-circle top-left"></div>
        <div className="hero-bg-circle bottom-right"></div>
      </div>
    </section>
  );
};

export default Hero;