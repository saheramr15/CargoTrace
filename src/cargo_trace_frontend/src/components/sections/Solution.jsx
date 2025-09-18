import React from 'react';
import styles from './Solution.module.css';

const Solution = () => {
  const solutions = [
    {
      icon: "⚡",
      title: "Instant Processing",
      description: "Our blockchain-powered system processes trade finance applications in minutes, not weeks. Automated document verification eliminates manual delays.",
      benefits: [
        "Minutes instead of weeks",
        "24/7 automated processing",
        "Real-time status updates"
      ],
      color: "blue"
    },
    {
      icon: "💰",
      title: "Competitive Rates",
      description: "Access to DeFi lending protocols provides significantly lower interest rates compared to traditional banking, making capital more affordable for SMEs.",
      benefits: [
        "3-5% interest rates",
        "No hidden fees",
        "Transparent pricing"
      ],
      color: "green"
    },
    {
      icon: "🔗",
      title: "Seamless Integration",
      description: "Direct integration with CargoX and ACI/NAFEZA systems ensures automatic document verification and instant loan disbursement upon customs clearance.",
      benefits: [
        "One-click application",
        "Automatic verification",
        "Instant disbursement"
      ],
      color: "purple"
    }
  ];

  const features = [
    {
      icon: "📄",
      title: "Document Tokenization",
      description: "Convert customs documents into verifiable NFTs on Internet Computer blockchain"
    },
    {
      icon: "🏦",
      title: "DeFi Lending",
      description: "Access instant loans through automated smart contracts and lending protocols"
    },
    {
      icon: "🌍",
      title: "MENA Focus",
      description: "Specialized for Egyptian customs and broader MENA region compliance"
    },
    {
      icon: "🔒",
      title: "Secure & Transparent",
      description: "Blockchain ensures immutable records and transparent transaction history"
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Track your trade finance applications and loan status in real-time"
    },
    {
      icon: "🚀",
      title: "Scalable Platform",
      description: "Built on Internet Computer for unlimited scalability and low costs"
    }
  ];

  return (
    <section id="solution" className={styles.solution}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            CargoTrace <span className={styles.highlight}>Unlocks</span> Instant Funding
          </h2>
          <p className={styles.subtitle}>
            Our blockchain-powered platform transforms trade finance by providing instant, 
            affordable, and accessible funding solutions for MENA region traders.
          </p>
        </div>

        {/* Main Solution Cards */}
        <div className={styles.solutionsGrid}>
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className={`${styles.solutionCard} ${styles[solution.color]} ${styles[`card-${index + 1}`]}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{solution.icon}</div>
                <h3 className={styles.cardTitle}>{solution.title}</h3>
              </div>
              <p className={styles.cardDescription}>{solution.description}</p>
              <ul className={styles.benefitsList}>
                {solution.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className={styles.benefitItem}>
                    <span className={styles.benefitIcon}>✓</span>
                    <span className={styles.benefitText}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className={styles.featuresSection}>
          <h3 className={styles.featuresTitle}>Platform Features</h3>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`${styles.featureCard} ${styles[`feature-${index + 1}`]}`}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <div className={styles.valueProposition}>
          <div className={styles.valueContent}>
            <h3 className={styles.valueTitle}>Transform Your Trade Finance</h3>
            <p className={styles.valueText}>
              Join the future of decentralized trade finance. CargoTrace Finance provides 
              instant access to working capital through our blockchain-powered document 
              verification system, designed specifically for the MENA region.
            </p>
            <div className={styles.valueStats}>
              <div className={styles.valueStat}>
                <div className={styles.statNumber}>95%</div>
                <div className={styles.statLabel}>Faster Processing</div>
              </div>
              <div className={styles.valueStat}>
                <div className={styles.statNumber}>60%</div>
                <div className={styles.statLabel}>Lower Costs</div>
              </div>
              <div className={styles.valueStat}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
