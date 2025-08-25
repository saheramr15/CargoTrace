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
      <nav className="navbar scrolled">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            CargoTrace
          </Link>

          {/* Desktop Navigation */}
          <ul className="desktop-nav">
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'partners', label: 'Partners' },
              { id: 'stats', label: 'Stats' },
              { id: 'process', label: 'How It Works' },
              { id: 'about', label: 'About' },
            ].map((item, index) => (
              <li key={index}>
                <Link 
                  to="/" 
                  onClick={() => scrollToSection(item.id)}
                  className="desktop-nav-item"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Get Started Button */}
          <Link to="/login" className="desktop-get-started">
            Get Started
          </Link>

          {/* Mobile Toggle Button */}
          <div 
            className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
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
                  className="mobile-nav-item"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" className="mobile-get-started">
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;