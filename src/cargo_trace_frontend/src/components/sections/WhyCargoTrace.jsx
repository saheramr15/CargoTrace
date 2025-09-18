import React, { useEffect, useRef } from 'react';
import styles from './WhyCargoTrace.module.css';

const WhyCargoTrace = () => {
  const sectionRef = useRef(null);
  const benefitRefs = useRef([]);
  const statRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe benefit cards
    benefitRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Observe stat cards
    statRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Complete your trade finance process in minutes, not weeks. Our AI-powered verification and blockchain technology ensure instant processing.",
      features: ["5-minute processing", "Real-time verification", "Instant disbursement"],
      color: "fast"
    },
    {
      icon: "🔒",
      title: "Bank-Grade Security",
      description: "Military-grade encryption, blockchain immutability, and multi-layer security protocols protect your data and transactions.",
      features: ["256-bit encryption", "Blockchain security", "Multi-factor auth"],
      color: "secure"
    },
    {
      icon: "🤖",
      title: "AI-Enhanced",
      description: "Advanced AI algorithms verify documents, detect fraud, and assess risk with unprecedented accuracy and speed.",
      features: ["AI verification", "Fraud detection", "Risk assessment"],
      color: "ai"
    },
    {
      icon: "💰",
      title: "Cost Effective",
      description: "Up to 60% lower costs than traditional banks. No hidden fees, transparent pricing, and competitive interest rates.",
      features: ["60% lower costs", "No hidden fees", "Transparent pricing"],
      color: "cost"
    },
    {
      icon: "🌍",
      title: "Global Access",
      description: "Available 24/7 from anywhere in the MENA region. No geographical restrictions or time zone limitations.",
      features: ["24/7 availability", "MENA coverage", "No restrictions"],
      color: "global"
    },
    {
      icon: "📊",
      title: "Transparent",
      description: "Complete transparency in all processes. Track your documents, monitor verification status, and view all transactions on the blockchain.",
      features: ["Real-time tracking", "Blockchain records", "Full transparency"],
      color: "transparent"
    }
  ];

  const stats = [
    {
      number: "5 Min",
      label: "Average Processing Time",
      description: "From document upload to loan disbursement"
    },
    {
      number: "60%",
      label: "Cost Reduction",
      description: "Compared to traditional trade finance"
    },
    {
      number: "99.9%",
      label: "Uptime Guarantee",
      description: "Reliable 24/7 service availability"
    },
    {
      number: "24/7",
      label: "Customer Support",
      description: "Round-the-clock assistance in Arabic & English"
    }
  ];

  return (
    <section id="why-cargotrace" className={styles.whyCargoTrace} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>⭐</div>
          <h2 className={styles.title}>
            Why Choose <span className={styles.highlight}>CargoTrace</span>?
          </h2>
          <p className={styles.subtitle}>
            Experience the future of trade finance with our revolutionary platform designed 
            specifically for the MENA region's unique needs and challenges.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => benefitRefs.current[index] = el}
              className={`${styles.benefitCard} ${styles[benefit.color]} ${styles[`benefit-${index + 1}`]} fade-in`}
            >
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
              <div className={styles.benefitFeatures}>
                {benefit.features.map((feature, featureIndex) => (
                  <span key={featureIndex} className={styles.benefitFeature}>
                    {feature}
                  </span>
                ))}
              </div>
              <div className={styles.benefitGlow}></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <h3 className={styles.statsTitle}>Our Impact in Numbers</h3>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => statRefs.current[index] = el}
                className={`${styles.statCard} ${styles[`stat-${index + 1}`]} fade-in`}
              >
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statDescription}>{stat.description}</div>
                <div className={styles.statGlow}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <div className={styles.valueProposition}>
          <div className={styles.valueContent}>
            <h3 className={styles.valueTitle}>
              Ready to Transform Your Trade Finance Experience?
            </h3>
            <p className={styles.valueDescription}>
              Join thousands of importers across the MENA region who have already 
              revolutionized their trade finance processes with CargoTrace.
            </p>
            <div className={styles.valueButtons}>
              <button className={styles.primaryButton}>
                Start Your Journey
              </button>
              <button className={styles.secondaryButton}>
                Watch Demo
              </button>
            </div>
          </div>
          <div className={styles.valueVisual}>
            <div className={styles.visualCard}>
              <div className={styles.visualIcon}>🚀</div>
              <div className={styles.visualText}>Launch Your Success</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCargoTrace;
