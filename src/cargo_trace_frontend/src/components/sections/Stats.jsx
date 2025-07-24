const Stats = () => {
  const stats = [
    { number: "$50M+", label: "Trade Volume Processed" },
    { number: "1,000+", label: "Documents Verified" },
    { number: "500+", label: "Active Traders" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <section id="stats" className="stats">
      <h2 className="section-title fade-in animate">Platform Statistics</h2>
      <p className="section-subtitle fade-in animate">
        Real-time metrics showcasing our impact on global trade finance
      </p>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item fade-in animate">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats; 