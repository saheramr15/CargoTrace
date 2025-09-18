import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewNavbar.module.css';

const NewNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🚢</span>
          <span className={styles.logoText}>CargoTrace</span>
          <span className={styles.logoFinance}>Finance</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
          <li><a href="#problem" onClick={() => scrollToSection('problem')}>Problem</a></li>
          <li><a href="#solution" onClick={() => scrollToSection('solution')}>Solution</a></li>
          <li><a href="#how-it-works" onClick={() => scrollToSection('how-it-works')}>How It Works</a></li>
          <li><a href="#technology" onClick={() => scrollToSection('technology')}>Technology</a></li>
          <li><a href="#why-cargotrace" onClick={() => scrollToSection('why-cargotrace')}>Why CargoTrace</a></li>
          <li><a href="#roadmap" onClick={() => scrollToSection('roadmap')}>Roadmap</a></li>
        </ul>

        {/* CTA Button */}
        <Link to="/login" className={styles.ctaButton}>
          Get Started
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
          <li><a href="#problem" onClick={() => scrollToSection('problem')}>Problem</a></li>
          <li><a href="#solution" onClick={() => scrollToSection('solution')}>Solution</a></li>
          <li><a href="#how-it-works" onClick={() => scrollToSection('how-it-works')}>How It Works</a></li>
          <li><a href="#technology" onClick={() => scrollToSection('technology')}>Technology</a></li>
          <li><a href="#why-cargotrace" onClick={() => scrollToSection('why-cargotrace')}>Why CargoTrace</a></li>
          <li><a href="#roadmap" onClick={() => scrollToSection('roadmap')}>Roadmap</a></li>
          <li>
            <Link to="/login" className={styles.mobileCtaButton}>
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NewNavbar;
