import React, { useEffect, useRef } from 'react';
import styles from '../../styles/landing/WhyCargoTrace.module.css';

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


  const stats = [
    {
      number: "5 Min",
      label: "Lightning Fast Processing",
      description: "From document upload to loan disbursement",
      icon: "⚡"
    },
    {
      number: "60%",
      label: "Cost Savings",
      description: "Compared to traditional trade finance",
      icon: "💰"
    },
    {
      number: "99.9%",
      label: "Reliability",
      description: "Uptime guarantee with 24/7 availability",
      icon: "🔒"
    },
    {
      number: "24/7",
      label: "Global Support",
      description: "Round-the-clock assistance in Arabic & English",
      icon: "🌍"
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


        {/* Creative Stats Section */}
        <div className={styles.statsSection}>
          <h3 className={styles.statsTitle}>Our Impact in Numbers</h3>
          <div className={styles.statsContainer}>
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => statRefs.current[index] = el}
                  className={`${styles.statCard} ${styles[`stat-${index + 1}`]} fade-in`}
                >
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <div className={styles.statDescription}>{stat.description}</div>
                  <div className={styles.statGlow}></div>
                  <div className={styles.statParticles}></div>
                </div>
              ))}
            </div>
            <div className={styles.statsConnector}>
              <div className={styles.connectorLine}></div>
              <div className={styles.connectorDots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
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
