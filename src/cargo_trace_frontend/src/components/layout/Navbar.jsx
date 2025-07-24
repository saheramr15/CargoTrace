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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">CargoTrace</Link>
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/" onClick={() => scrollToSection('home')}>Home</Link></li>
          <li><Link to="/" onClick={() => scrollToSection('features')}>Features</Link></li>
          <li><Link to="/" onClick={() => scrollToSection('partners')}>Partners</Link></li>
          <li><Link to="/" onClick={() => scrollToSection('process')}>How It Works</Link></li>
          <li><Link to="/" onClick={() => scrollToSection('stats')}>Stats</Link></li>
          <li><Link to="/" onClick={() => scrollToSection('about')}>About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/verification">Verification</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <Link to="/" className="nav-cta" onClick={() => scrollToSection('contact')}>Get Started</Link>
        <div className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 