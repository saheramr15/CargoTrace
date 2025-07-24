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
            transition: 'all 0.3s ease'
          }}
          onMouseOver={e => e.target.style.opacity = '0.8'}
          onMouseOut={e => e.target.style.opacity = '1'}
        >
          CargoTrace
        </Link>

        <ul style={{
          display: isMobileMenuOpen ? 'flex' : 'none',
          flexDirection: isMobileMenuOpen ? 'column' : 'row',
          listStyle: 'none',
          margin: isMobileMenuOpen ? '1rem 0' : '0',
          padding: isMobileMenuOpen ? '1rem' : '0',
          gap: isMobileMenuOpen ? '1rem' : '2rem',
          background: isMobileMenuOpen ? 'rgba(17, 24, 39, 0.95)' : 'transparent',
          position: isMobileMenuOpen ? 'absolute' : 'static',
          top: isMobileMenuOpen ? '60px' : 'auto',
          left: 0,
          right: 0,
          alignItems: isMobileMenuOpen ? 'center' : 'center'
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'features', label: 'Features' },
            { id: 'partners', label: 'Partners' },
            { id: 'process', label: 'How It Works' },
            { id: 'stats', label: 'Stats' },
            { id: 'about', label: 'About' },
            { id: 'dashboard', label: 'Dashboard', directLink: true },
            { id: 'verification', label: 'Verification', directLink: true }
          ].map((item, index) => (
            <li key={index}>
              <Link 
                to={item.directLink ? `/${item.id}` : '/'} 
                onClick={() => !item.directLink && scrollToSection(item.id)}
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
          <li><Link to="/login">Login</Link></li>
        </ul>

        <Link 
          to="/" 
          onClick={() => scrollToSection('contact')}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#A78BFA',
            color: '#FFFFFF',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '9999px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.2)',
            display: isMobileMenuOpen ? 'none' : 'inline-block'
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

        <div 
          style={{
            display: 'flex',
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (min-width: 768px) {
          div[style*="flex-direction: column; gap: 5px"] {
            display: none;
          }
          ul[style*="display: none"] {
            display: flex !important;
          }
        }

        @media (max-width: 767px) {
          a[style*="padding: 0.5rem 1.5rem"] {
            display: ${isMobileMenuOpen ? 'inline-block' : 'none'};
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;