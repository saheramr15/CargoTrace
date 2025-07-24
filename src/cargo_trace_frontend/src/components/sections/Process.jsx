import React from 'react';

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
    <section 
      id="process"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #111827 0%, #4C1D95 50%, #111827 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
        margin: '0'
      }}
    >
      {/* Background Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 0
      }}></div>

      {/* Section Content */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        textAlign: 'center',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #A78BFA, #D8B4FE)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          marginBottom: '1.5rem',
          animation: 'fadeIn 1s ease-out forwards'
        }}>
          How It Works
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: '#D1D5DB',
          maxWidth: '700px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.75',
          animation: 'fadeIn 1s ease-out forwards 0.2s',
          textAlign: 'center'
        }}>
          A seamless three-step process that transforms traditional trade finance
        </p>

        {/* Process Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {steps.map((step, index) => (
            <div 
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
                boxShadow: '0 4px 15px rgba(124, 58, 237, 0.2)',
                animation: index === 0 ? 'slideInLeft 0.8s ease-out forwards' : 
                         index === 1 ? 'fadeIn 0.8s ease-out forwards' : 
                         'slideInRight 0.8s ease-out forwards',
                animationDelay: `${0.4 + index * 0.2}s`
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'rgba(167, 139, 250, 0.1)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#A78BFA',
                marginBottom: '1rem'
              }}>
                {step.number}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#FFFFFF',
                marginBottom: '1rem'
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#9CA3AF',
                lineHeight: '1.5'
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Background Animation */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          width: '24rem',
          height: '24rem',
          background: 'rgba(167, 139, 250, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          top: '-5rem',
          left: '-5rem',
          animation: 'pulseSlow 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          width: '24rem',
          height: '24rem',
          background: 'rgba(167, 139, 250, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          bottom: '-5rem',
          right: '-5rem',
          animation: 'pulseSlow 8s ease-in-out infinite 1s'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
    </section>
  );
};

export default Process;