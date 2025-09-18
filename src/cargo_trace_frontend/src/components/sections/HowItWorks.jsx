import React, { useEffect, useRef } from 'react';
import styles from '../../styles/landing/HowItWorks.module.css';

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

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

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "01",
      icon: "📄",
      title: "Upload Documents",
      description: "Importers upload their customs documents through our secure platform integrated with CargoX and ACI/NAFEZA systems.",
      features: [
        "Secure document upload",
        "Real-time validation",
        "Automatic verification"
      ],
      color: "blue"
    },
    {
      number: "02", 
      icon: "🔍",
      title: "AI Verification",
      description: "Our advanced AI system analyzes and verifies document authenticity, checking against customs databases and fraud detection algorithms.",
      features: [
        "AI-powered analysis",
        "Fraud detection",
        "Instant verification"
      ],
      color: "cyan"
    },
    {
      number: "03",
      icon: "🏦",
      title: "Get Instant Loan",
      description: "Once verified, documents are tokenized as NFTs on Internet Computer blockchain, unlocking instant DeFi loans at competitive rates.",
      features: [
        "NFT tokenization",
        "Instant disbursement",
        "Competitive rates"
      ],
      color: "purple"
    }
  ];

  const benefits = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Complete process in minutes, not weeks"
    },
    {
      icon: "🔒",
      title: "Bank-Grade Security",
      description: "Military-grade encryption and blockchain security"
    },
    {
      icon: "💰",
      title: "Lower Costs",
      description: "Up to 60% lower interest rates than traditional banks"
    },
    {
      icon: "🌍",
      title: "Global Access",
      description: "Available 24/7 from anywhere in the MENA region"
    }
  ];

  return (
    <section id="how-it-works" className={styles.howItWorks} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>⚙️</div>
          <h2 className={styles.title}>
            How <span className={styles.highlight}>CargoTrace</span> Works
          </h2>
          <p className={styles.subtitle}>
            Our revolutionary 3-step process transforms trade finance from weeks to minutes, 
            making funding accessible and affordable for MENA region traders.
          </p>
        </div>

        {/* Elegant Process Flow */}
        <div className={styles.processFlow}>
          <div className={styles.stepsContainer}>
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => stepRefs.current[index] = el}
                className={`${styles.stepWrapper} ${styles[`step-${index + 1}`]} fade-in`}
              >
                {/* Step Number Circle */}
                <div className={styles.stepNumberCircle}>
                  <span className={styles.stepNumber}>{step.number}</span>
                </div>
                
                {/* Step Content */}
                <div className={styles.stepContent}>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                  <div className={styles.stepFeatures}>
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className={styles.featureItem}>
                        <span className={styles.featureIcon}>✓</span>
                        <span className={styles.featureText}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className={styles.connectingLine}>
                    <div className={styles.line}></div>
                    <div className={styles.arrow}>→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={styles.benefitsSection}>
          <h3 className={styles.benefitsTitle}>Why Choose Our Process?</h3>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`${styles.benefitCard} ${styles[`benefit-${index + 1}`]} fade-in`}
              >
                <div className={styles.benefitIcon}>{benefit.icon}</div>
                <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className={styles.timelineSection}>
          <h3 className={styles.timelineTitle}>Process Timeline</h3>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineTime}>0-2 min</div>
              <div className={styles.timelineContent}>
                <h4>Document Upload</h4>
                <p>Secure upload and initial validation</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineTime}>2-5 min</div>
              <div className={styles.timelineContent}>
                <h4>AI Verification</h4>
                <p>Advanced analysis and fraud detection</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineTime}>5-10 min</div>
              <div className={styles.timelineContent}>
                <h4>Loan Disbursement</h4>
                <p>NFT creation and instant funding</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
