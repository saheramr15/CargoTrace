import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        color: '#FFFFFF',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Link 
            to="/" 
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              background: 'linear-gradient(to right, #A78BFA, #D8B4FE)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              zIndex: 1100
            }}
            onMouseOver={e => e.target.style.opacity = '0.8'}
            onMouseOut={e => e.target.style.opacity = '1'}
          >
            CargoTrace
          </Link>

          {/* Desktop Navigation */}
          <ul className="desktop-nav" style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '2rem',
            alignItems: 'center'
          }}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'partners', label: 'Partners' },
              { id: 'process', label: 'How It Works' },
              { id: 'stats', label: 'Stats' },
              { id: 'about', label: 'About' },
            ].map((item, index) => (
              <li key={index}>
                <Link 
                  to="/" 
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#D1D5DB',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    animation: 'fadeIn 0.5s ease-out forwards',
                    animationDelay: `${0.1 * index}s`
                  }}
                  onMouseOver={e => {
                    e.target.style.color = '#A78BFA';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={e => {
                    e.target.style.color = '#D1D5DB';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Get Started Button */}
          <Link 
            to="/login" 
            className="desktop-get-started"
            style={{
              padding: '0.5rem 1.5rem',
              background: '#A78BFA',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(124, 58, 237, 0.2)'
            }}
            onMouseOver={e => {
              e.target.style.background = '#7C3AED';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={e => {
              e.target.style.background = '#A78BFA';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Get Started
          </Link>

          {/* Mobile Toggle Button */}
          <div 
            className="mobile-toggle"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              cursor: 'pointer',
              zIndex: 1100
            }}
            onClick={toggleMobileMenu}
          >
            <span style={{
              width: '24px',
              height: '3px',
              background: '#D1D5DB',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}></span>
            <span style={{
              width: '24px',
              height: '3px',
              background: '#D1D5DB',
              transition: 'all 0.3s ease',
              opacity: isMobileMenuOpen ? '0' : '1'
            }}></span>
            <span style={{
              width: '24px',
              height: '3px',
              background: '#D1D5DB',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'
            }}></span>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="mobile-nav" style={{
          display: isMobileMenuOpen ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(17, 24, 39, 0.98)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem 0'
        }}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: '0 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'partners', label: 'Partners' },
              { id: 'process', label: 'How It Works' },
              { id: 'stats', label: 'Stats' },
              { id: 'about', label: 'About' },
            ].map((item, index) => (
              <li key={index}>
                <Link 
                  to="/" 
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    color: '#D1D5DB',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'block',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseOver={e => {
                    e.target.style.color = '#A78BFA';
                    e.target.style.paddingLeft = '0.5rem';
                  }}
                  onMouseOut={e => {
                    e.target.style.color = '#D1D5DB';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li style={{ marginTop: '1rem' }}>
              <Link 
                to="/login" 
                style={{
                  display: 'block',
                  padding: '0.75rem 1.5rem',
                  background: '#A78BFA',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(124, 58, 237, 0.2)'
                }}
                onMouseOver={e => {
                  e.target.style.background = '#7C3AED';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseOut={e => {
                  e.target.style.background = '#A78BFA';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Desktop Styles */
        @media (min-width: 768px) {
          .mobile-toggle {
            display: none !important;
          }
          
          .mobile-nav {
            display: none !important;
          }
          
          .desktop-nav {
            display: flex !important;
          }
          
          .desktop-get-started {
            display: inline-block !important;
          }
        }

        /* Mobile Styles */
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          
          .desktop-get-started {
            display: none !important;
          }
          
          .mobile-toggle {
            display: flex !important;
          }
        }

        /* Tablet Styles */
        @media (min-width: 768px) and (max-width: 1023px) {
          .desktop-nav {
            gap: 1.5rem !important;
          }
        }

        /* Large Desktop Styles */
        @media (min-width: 1024px) {
          .desktop-nav {
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;