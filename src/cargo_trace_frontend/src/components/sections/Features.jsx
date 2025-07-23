const Features = () => {
  const features = [
    {
      icon: "🚢",
      title: "CargoX Integration",
      description: "Real-time monitoring of CargoX document transfers on Ethereum/Polygon to trigger automated trade finance processes with instant verification"
    },
    {
      icon: "🔗",
      title: "Chain Fusion",
      description: "Seamless integration between Ethereum and Internet Computer, enabling cross-chain document verification and instant lending protocols"
    },
    {
      icon: "💰",
      title: "DeFi Lending",
      description: "Automated lending protocols triggered by customs document verification, providing instant working capital for traders with competitive rates"
    },
    {
      icon: "🛡️",
      title: "Risk Mitigation",
      description: "Advanced reputation scoring and oracle verification systems to ensure secure and reliable trade finance operations"
    },
    {
      icon: "🌍",
      title: "MENA Focus",
      description: "Specialized solutions for Egyptian customs (ACI/NAFEZA) and broader MENA region trade finance challenges with local compliance"
    },
    {
      icon: "⚡",
      title: "Instant Processing",
      description: "Lightning-fast document verification and loan processing powered by ICP's high-performance infrastructure"
    }
  ];

  return (
    <section id="features" className="features">
      <h2 className="section-title gradient-text fade-in animate">Core Features</h2>
      <p className="section-subtitle fade-in animate">
        Advanced blockchain technology meets traditional trade finance to create a seamless, 
        secure, and efficient ecosystem for global trade
      </p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`card feature-card ${
              index % 3 === 0 ? 'slide-in-left' : 
              index % 3 === 1 ? 'fade-in' : 'slide-in-right'
            } animate`}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features; 