import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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
    <>
      {/* Dynamic Background - Glassy when at top, solid when scrolled */}
      <div 
        className={`fixed top-0 left-0 w-full h-20 backdrop-blur-xl z-40 transition-all duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          background: isScrolled 
            ? `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)`
            : `linear-gradient(135deg, rgba(15, 23, 42, 0.1) 0%, rgba(30, 41, 59, 0.1) 50%, rgba(15, 23, 42, 0.1) 100%)`,
          boxShadow: isScrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.2)' 
            : '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.05)'
        }}
      />

      {/* Animated Background Elements - More visible when scrolled */}
      <div className="fixed top-0 left-0 w-full h-20 overflow-hidden z-30 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-blue-500/10"
          style={{ 
            transform: `translateX(${scrollY * 0.1}px)`,
            opacity: isScrolled ? 0.8 : 0.3
          }}
        />
        <div 
          className="absolute top-2 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"
          style={{ 
            transform: `translateY(${scrollY * 0.05}px)`,
            opacity: isScrolled ? 1 : 0.5
          }}
        />
        <div 
          className="absolute top-4 right-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping"
          style={{ 
            transform: `translateY(${scrollY * 0.08}px)`, 
            animationDelay: '2s',
            opacity: isScrolled ? 1 : 0.5
          }}
        />
        <div 
          className="absolute top-6 left-2/3 w-1.5 h-1.5 bg-blue-300/25 rounded-full animate-ping"
          style={{ 
            transform: `translateY(${scrollY * 0.03}px)`, 
            animationDelay: '4s',
            opacity: isScrolled ? 1 : 0.5
          }}
        />
      </div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-2xl border-b border-blue-400/40 shadow-2xl shadow-blue-500/20' 
          : 'bg-slate-900/10 backdrop-blur-xl border-b border-blue-400/10 shadow-lg'
      }`}>
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Creative Logo */}
            <Link 
              to="/" 
              className="group flex items-center space-x-4 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                {/* Main Logo Container */}
                <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300 border border-blue-400/20 group-hover:border-blue-400/40">
                  {/* Cargo Container Icon */}
                  <div className="relative">
                    {/* Container Base */}
                    <div className="w-8 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-sm shadow-lg">
                      {/* Container Lines */}
                      <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-blue-300"></div>
                      <div className="absolute top-2 left-0.5 right-0.5 h-0.5 bg-blue-300"></div>
                      <div className="absolute top-3 left-0.5 right-0.5 h-0.5 bg-blue-300"></div>
                      <div className="absolute top-4 left-0.5 right-0.5 h-0.5 bg-blue-300"></div>
                    </div>
                    {/* Blockchain Chain Links */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    {/* Tracking Signal */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-cyan-400/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating Elements */}
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '1s'}}></div>
              </div>
              
              <div className="flex flex-col">
                <span className={`text-2xl font-black transition-all duration-500 ${
                  isScrolled 
                    ? 'text-white drop-shadow-lg' 
                    : 'bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'
                }`}>
                  CargoTrace
                </span>
                <span className={`text-sm font-medium transition-all duration-500 ${
                  isScrolled 
                    ? 'text-blue-200 drop-shadow-md' 
                    : 'text-slate-300'
                }`}>
                  Finance
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'problem', label: 'Problem' },
                { id: 'solution', label: 'Solution' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'why-cargotrace', label: 'Why CargoTrace' }
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 hover:scale-105 group ${
                      isScrolled 
                        ? 'text-white hover:text-blue-300 drop-shadow-md' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button with Colored Background */}
            <div className="hidden lg:block">
              <Link 
                to="/login" 
                className="group relative inline-flex items-center px-3 py-1.5 font-medium text-xs rounded-md transition-all duration-500 hover:scale-105 transform hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="ml-1.5 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Toggle with Animation */}
            <button 
              className={`lg:hidden relative w-10 h-10 flex flex-col justify-center items-center space-y-1.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-180' : ''
              }`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Glass Effect */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-slate-900/95 backdrop-blur-2xl border-t border-blue-400/30 shadow-2xl">
            <ul className="px-4 py-6 space-y-4">
              {[
                { id: 'home', label: 'Home' },
                { id: 'problem', label: 'Problem' },
                { id: 'solution', label: 'Solution' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'why-cargotrace', label: 'Why CargoTrace' }
              ].map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className="block px-4 py-3 text-slate-200 font-medium rounded-lg transition-all duration-300 hover:bg-blue-500/10 hover:text-blue-300 hover:translate-x-2"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animation: isMobileMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <Link 
                  to="/login" 
                  className="block w-full text-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-xs rounded-md transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:scale-105"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content jump */}
      <div className="h-20"></div>
    </>
  );
};

export default NewNavbar;
