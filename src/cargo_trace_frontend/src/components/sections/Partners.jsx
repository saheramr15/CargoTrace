const Partners = () => {
  const partners = [
    { name: "CargoX", type: "Document Platform", color: "#ff9a9e" },
    { name: "ICP", type: "Internet Computer", color: "#feca57" },
    { name: "ETH", type: "Ethereum Network", color: "#a8edea" },
    { name: "NAFEZA", type: "Egypt Customs", color: "#fed6e3" },
    { name: "ACI", type: "Advanced Cargo", color: "#ff6b6b" },
    { name: "DeFi", type: "Lending Protocols", color: "#fecfef" }
  ];

  return (
    <section id="partners" className="partners">
      <h2 className="section-title gradient-text fade-in animate">Trusted Partners</h2>
      <p className="section-subtitle fade-in animate">
        Working with leading institutions and technology providers to build the future of trade finance
      </p>
      <div className="partners-container">
        <div className="partners-scroll">
          <div className="partners-grid">
            {/* First set of partners */}
            {partners.map((partner, index) => (
              <div key={`first-${index}`} className="partner-logo scale-in animate">
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: partner.color }}>
                  {partner.name}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#b0b0b0', marginTop: '0.5rem' }}>
                  {partner.type}
                </p>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((partner, index) => (
              <div key={`second-${index}`} className="partner-logo scale-in animate">
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: partner.color }}>
                  {partner.name}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#b0b0b0', marginTop: '0.5rem' }}>
                  {partner.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners; 