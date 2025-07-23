const Process = () => {
  const steps = [
    {
      number: "1",
      title: "Document Monitoring",
      description: "Our Ethereum watcher continuously monitors CargoX transfers, indexing document movements in real-time across the blockchain"
    },
    {
      number: "2",
      title: "Customs Matching",
      description: "Documents are automatically matched to Egyptian customs entries through our intelligent ACI/NAFEZA integration system"
    },
    {
      number: "3",
      title: "Smart Contract Execution",
      description: "Once verified, ICP smart contracts automatically mint NFTs and execute lending protocols for instant funding"
    }
  ];

  return (
    <section id="process" className="process">
      <h2 className="section-title gradient-text fade-in animate">How It Works</h2>
      <p className="section-subtitle fade-in animate">
        A seamless three-step process that transforms traditional trade finance
      </p>
      <div className="process-grid">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`card process-step ${
              index === 0 ? 'slide-in-left' : 
              index === 1 ? 'fade-in' : 'slide-in-right'
            } animate`}
          >
            <div className="process-number">{step.number}</div>
            <h3 className="feature-title">{step.title}</h3>
            <p className="feature-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process; 