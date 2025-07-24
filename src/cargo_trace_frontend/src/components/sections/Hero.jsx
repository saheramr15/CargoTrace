import React from 'react';

const Hero = () => {
  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #111827 0%, #4C1D95 50%, #111827 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
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

      {/* Hero Content */}
      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        textAlign: 'center',
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '5rem',
          fontWeight: 'bold',
          lineHeight: '1.2',
          marginBottom: '1.5rem',
          animation: 'slideInUp 0.8s ease-out forwards'
        }}>
          <span style={{
            background: 'linear-gradient(to right, #A78BFA, #D8B4FE)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            CargoTrace
          </span>{' '}
          Finance
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#D1D5DB',
          maxWidth: '700px',
          margin: '0 auto 2.5rem auto',
          lineHeight: '1.75',
          animation: 'slideInUp 0.8s ease-out forwards 0.2s',
          textAlign: 'center'
        }}>
          Revolutionizing trade finance in Egypt and MENA with blockchain-powered document verification and decentralized lending on the Internet Computer.
        </p>

        {/* Hero Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '4rem',
          animation: 'slideInUp 0.8s ease-out forwards 0.4s'
        }}>
          <button style={{
            padding: '0.75rem 2rem',
            background: '#7C3AED',
            color: '#FFFFFF',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.5)',
            transform: 'scale(1)',
            zIndex: 10
          }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}
          >
            Start Trading Now
          </button>
          <button style={{
            padding: '0.75rem 2rem',
            background: 'transparent',
            border: '2px solid #A78BFA',
            color: '#A78BFA',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.5)',
            transform: 'scale(1)',
            zIndex: 10
          }}
          onMouseOver={e => {
            e.target.style.background = '#A78BFA';
            e.target.style.color = '#FFFFFF';
          }}
          onMouseOut={e => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#A78BFA';
          }}
          >
            Watch Demo
          </button>
        </div>

        {/* Hero Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            animation: 'slideInUp 0.8s ease-out forwards 0.6s',
            textAlign: 'center'
          }}
          onMouseOver={e => e.target.querySelector('div').style.color = '#D8B4FE'}
          onMouseOut={e => e.target.querySelector('div').style.color = '#A78BFA'}
          >
            <div style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: '#A78BFA',
              transition: 'color 0.3s ease'
            }}>$50M+</div>
            <div style={{
              fontSize: '0.875rem',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Trade Volume</div>
          </div>
          <div style={{
            animation: 'slideInUp 0.8s ease-out forwards 0.7s',
            textAlign: 'center'
          }}
          onMouseOver={e => e.target.querySelector('div').style.color = '#D8B4FE'}
          onMouseOut={e => e.target.querySelector('div').style.color = '#A78BFA'}
          >
            <div style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: '#A78BFA',
              transition: 'color 0.3s ease'
            }}>1,000+</div>
            <div style={{
              fontSize: '0.875rem',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Documents Verified</div>
          </div>
          <div style={{
            animation: 'slideInUp 0.8s ease-out forwards 0.8s',
            textAlign: 'center'
          }}
          onMouseOver={e => e.target.querySelector('div').style.color = '#D8B4FE'}
          onMouseOut={e => e.target.querySelector('div').style.color = '#A78BFA'}
          >
            <div style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: '#A78BFA',
              transition: 'color 0.3s ease'
            }}>500+</div>
            <div style={{
              fontSize: '0.875rem',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Active Traders</div>
          </div>
          <div style={{
            animation: 'slideInUp 0.8s ease-out forwards 0.9s',
            textAlign: 'center'
          }}
          onMouseOver={e => e.target.querySelector('div').style.color = '#D8B4FE'}
          onMouseOut={e => e.target.querySelector('div').style.color = '#A78BFA'}
          >
            <div style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: '#A78BFA',
              transition: 'color 0.3s ease'
            }}>99.9%</div>
            <div style={{
              fontSize: '0.875rem',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Uptime</div>
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
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

export default Hero;