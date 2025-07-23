const About = () => {
  const aboutItems = [
    {
      title: "Our Mission",
      description: "To democratize access to trade finance by leveraging blockchain technology to create transparent, efficient, and accessible financial services for global traders"
    },
    {
      title: "Our Vision",
      description: "To become the leading platform for blockchain-powered trade finance, connecting traditional commerce with cutting-edge DeFi solutions"
    },
    {
      title: "Our Values",
      description: "Innovation, transparency, security, and accessibility drive everything we do, ensuring we deliver value to traders, lenders, and the global economy"
    }
  ];

  return (
    <section id="about" className="features">
      <h2 className="section-title gradient-text fade-in animate">About CargoTrace Finance</h2>
      <p className="section-subtitle fade-in animate">
        Pioneering the future of trade finance through blockchain innovation
      </p>
      <div className="features-grid">
        {aboutItems.map((item, index) => (
          <div 
            key={index} 
            className={`card feature-card ${
              index === 0 ? 'slide-in-left' : 
              index === 1 ? 'fade-in' : 'slide-in-right'
            } animate`}
          >
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About; 