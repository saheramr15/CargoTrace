import React from 'react';

const Partners = () => {
  const partners = [
    { name: "CargoX", type: "Document Platform", color: "#A78BFA" },
    { name: "ICP", type: "Internet Computer", color: "#A78BFA" },
    { name: "ETH", type: "Ethereum Network", color: "#A78BFA" },
    { name: "NAFEZA", type: "Egypt Customs", color: "#A78BFA" },
    { name: "ACI", type: "Advanced Cargo", color: "#A78BFA" },
    { name: "DeFi", type: "Lending Protocols", color: "#A78BFA" }
  ];

  return (
    <section 
      id="partners"
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
          Trusted Partners
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
          Working with leading institutions and technology providers to build the future of trade finance
        </p>

        {/* Partners Scroll Container */}
        <div style={{
          width: '100vw',
          overflow: 'hidden',
          margin: '0',
          padding: '0'
        }}>
          <div style={{
            display: 'flex',
            animation: 'scroll 20s linear infinite',
            whiteSpace: 'nowrap'
          }}>
            {/* First set of partners */}
            {partners.map((partner, index) => (
              <div 
                key={`first-${index}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  boxShadow: '0 4px 15px rgba(124, 58, 237, 0.2)',
                  animation: 'scaleIn 0.8s ease-out forwards',
                  animationDelay: `${0.4 + index * 0.1}s`,
                  marginRight: '2rem',
                  marginLeft: index === 0 ? '0' : '2rem',
                  minWidth: '200px',
                  display: 'inline-block'
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
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: partner.color,
                  transition: 'color 0.3s ease'
                }}>
                  {partner.name}
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#9CA3AF',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {partner.type}
                </p>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((partner, index) => (
              <div 
                key={`second-${index}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  boxShadow: '0 4px 15px rgba(124, 58, 237, 0.2)',
                  animation: 'scaleIn 0.8s ease-out forwards',
                  animationDelay: `${0.4 + index * 0.1}s`,
                  marginRight: '2rem',
                  marginLeft: index === 0 ? '0' : '2rem',
                  minWidth: '200px',
                  display: 'inline-block'
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
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: partner.color,
                  transition: 'color 0.3s ease'
                }}>
                  {partner.name}
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#9CA3AF',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {partner.type}
                </p>
              </div>
            ))}
          </div>
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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

export default Partners;