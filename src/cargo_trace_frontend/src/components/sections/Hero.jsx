const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content fade-in animate">
        <h1 className="hero-title">
          <span className="gradient-text">CargoTrace</span> Finance
        </h1>
        <p className="hero-subtitle">
          Revolutionizing trade finance in Egypt and MENA through blockchain-powered 
          document verification and decentralized lending on the Internet Computer
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Start Trading Now</button>
          <button className="btn-secondary">Watch Demo</button>
        </div>
        
        {/* Hero Stats */}
        <div className="hero-stats">
          <div className="hero-stat stagger-animation animate">
            <div className="hero-stat-number">$50M+</div>
            <div className="hero-stat-label">Trade Volume</div>
          </div>
          <div className="hero-stat stagger-animation animate">
            <div className="hero-stat-number">1,000+</div>
            <div className="hero-stat-label">Documents Verified</div>
          </div>
          <div className="hero-stat stagger-animation animate">
            <div className="hero-stat-number">500+</div>
            <div className="hero-stat-label">Active Traders</div>
          </div>
          <div className="hero-stat stagger-animation animate">
            <div className="hero-stat-number">99.9%</div>
            <div className="hero-stat-label">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 