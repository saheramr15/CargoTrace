import React from 'react';
import styles from './Problem.module.css';

const Problem = () => {
  const problems = [
    {
      icon: "⏰",
      title: "Slow Processing Times",
      description: "Traditional trade finance takes 15-30 days for document verification and loan approval, causing cash flow delays for importers.",
      stat: "15-30 days"
    },
    {
      icon: "💰",
      title: "High Interest Rates",
      description: "Banks charge 8-15% interest rates for trade finance, making it expensive for small and medium enterprises to access capital.",
      stat: "8-15%"
    },
    {
      icon: "📋",
      title: "Complex Documentation",
      description: "Requires extensive paperwork, multiple approvals, and manual verification processes that are prone to errors and delays.",
      stat: "50+ documents"
    },
    {
      icon: "🚫",
      title: "Limited Access",
      description: "Many SMEs in MENA region lack access to traditional banking services due to strict requirements and limited branch networks.",
      stat: "70% excluded"
    },
    {
      icon: "🔒",
      title: "Lack of Transparency",
      description: "Opaque processes make it difficult for traders to track their applications and understand the approval timeline.",
      stat: "No visibility"
    },
    {
      icon: "🌍",
      title: "Cross-Border Challenges",
      description: "Different regulations, currencies, and banking systems across MENA countries create additional complexity and costs.",
      stat: "22 countries"
    }
  ];

  return (
    <section id="problem" className={styles.problem}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Trade Finance is <span className={styles.highlight}>Broken</span> in MENA
          </h2>
          <p className={styles.subtitle}>
            Traditional banking systems fail to serve the growing needs of importers and exporters 
            in the Middle East and North Africa region, creating significant barriers to economic growth.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className={styles.problemsGrid}>
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className={`${styles.problemCard} ${styles[`card-${index + 1}`]}`}
            >
              <div className={styles.cardIcon}>{problem.icon}</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{problem.title}</h3>
                <p className={styles.cardDescription}>{problem.description}</p>
                <div className={styles.cardStat}>{problem.stat}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Statement */}
        <div className={styles.impactStatement}>
          <div className={styles.impactContent}>
            <h3 className={styles.impactTitle}>The Real Impact</h3>
            <p className={styles.impactText}>
              These challenges result in <strong>$200+ billion</strong> in untapped trade potential across MENA, 
              with small and medium enterprises bearing the brunt of inefficient financial systems.
            </p>
            <div className={styles.impactStats}>
              <div className={styles.impactStat}>
                <div className={styles.statNumber}>$200B+</div>
                <div className={styles.statLabel}>Untapped Trade</div>
              </div>
              <div className={styles.impactStat}>
                <div className={styles.statNumber}>70%</div>
                <div className={styles.statLabel}>SMEs Excluded</div>
              </div>
              <div className={styles.impactStat}>
                <div className={styles.statNumber}>25+</div>
                <div className={styles.statLabel}>Days Average</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
