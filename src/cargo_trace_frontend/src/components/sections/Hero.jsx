import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/95"></div>
        
        {/* Parallax layer 1 */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-500/8 via-transparent to-cyan-400/8"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        
        {/* Parallax layer 2 */}
        <div 
          className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-600/4 to-transparent"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        
        {/* Additional moving background elements */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/3 to-transparent"
          style={{ transform: `translateY(${scrollY * 0.7}px) translateX(${scrollY * 0.2}px)` }}
        ></div>
        
        {/* Floating particles */}
        <div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-ping"
          style={{ transform: `translateY(${scrollY * 0.1}px) translateX(${scrollY * 0.05}px)` }}
        ></div>
        <div 
          className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400/30 rounded-full animate-ping"
          style={{ transform: `translateY(${scrollY * 0.15}px) translateX(${scrollY * 0.1}px)`, animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300/25 rounded-full animate-ping"
          style={{ transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.08}px)`, animationDelay: '4s' }}
        ></div>
      </div>

      {/* Premium 3D Objects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Cargo Containers */}
        <div 
          className="absolute top-20 left-20 w-20 h-16 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-lg transform rotate-12 animate-float shadow-2xl border border-blue-400/20"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.1}px) rotate(12deg)`,
            animationDelay: '0s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
            <div className="w-8 h-6 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-sm">
              <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-blue-200"></div>
              <div className="absolute top-2 left-0.5 right-0.5 h-0.5 bg-blue-200"></div>
              <div className="absolute top-3 left-0.5 right-0.5 h-0.5 bg-blue-200"></div>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-2xl animate-float shadow-2xl border border-cyan-400/20"
          style={{ 
            transform: `translateY(${scrollY * 0.15}px) translateX(${scrollY * -0.05}px)`,
            animationDelay: '2s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-400/20 rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyan-300 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-40 left-40 w-24 h-20 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-xl transform -rotate-6 animate-float shadow-2xl border border-indigo-400/20"
          style={{ 
            transform: `translateY(${scrollY * 0.25}px) translateX(${scrollY * 0.08}px) rotate(-6deg)`,
            animationDelay: '4s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-blue-400/20 rounded-xl flex items-center justify-center">
            <div className="w-10 h-8 bg-gradient-to-b from-indigo-400 to-blue-300 rounded-sm">
              <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-indigo-200"></div>
              <div className="absolute top-2 left-0.5 right-0.5 h-0.5 bg-indigo-200"></div>
              <div className="absolute top-3 left-0.5 right-0.5 h-0.5 bg-indigo-200"></div>
              <div className="absolute top-4 left-0.5 right-0.5 h-0.5 bg-indigo-200"></div>
            </div>
          </div>
        </div>
        
        {/* Floating Blockchain Nodes */}
        <div 
          className="absolute top-1/3 left-1/2 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full animate-float shadow-xl border-2 border-blue-400/30"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.1}px)`,
            animationDelay: '1s'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-400/20 rounded-lg transform rotate-45 animate-float shadow-xl border-2 border-cyan-400/30"
          style={{ 
            transform: `translateY(${scrollY * 0.18}px) translateX(${scrollY * 0.12}px) rotate(45deg)`,
            animationDelay: '3s'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-sm animate-pulse"></div>
          </div>
        </div>
        
        {/* Floating Data Packets */}
        <div 
          className="absolute top-1/4 right-1/4 w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-lg animate-float shadow-lg border border-green-400/30"
          style={{ 
            transform: `translateY(${scrollY * 0.12}px) translateX(${scrollY * -0.08}px)`,
            animationDelay: '5s'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-300 rounded-sm animate-ping"></div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-gradient-to-br from-purple-500/20 to-pink-400/20 rounded-full animate-float shadow-lg border border-purple-400/30"
          style={{ 
            transform: `translateY(${scrollY * 0.22}px) translateX(${scrollY * 0.15}px)`,
            animationDelay: '6s'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Animated Connection Lines */}
        <div 
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div 
          className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        ></div>
        <div 
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        ></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-green-400/40 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-purple-400/50 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content */}
      <div className="container-custom px-4 sm:px-6 lg:px-8 pt-2 pb-4 relative z-10">
        <div className="flex flex-col items-center justify-center h-screen text-center max-w-5xl mx-auto">
          
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm animate-fade-in mb-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Next-Gen Web3 Finance</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Main Title with Enhanced Typography */}
          <div className="space-y-3 mb-5">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.15] tracking-tight">
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl" style={{textShadow: '0 0 30px rgba(59, 130, 246, 0.3)', lineHeight: '1.15', paddingBottom: '0.1em'}}>
                CargoTrace
              </span>
              <span className="block text-white mt-0.5 transform hover:scale-105 transition-transform duration-500 drop-shadow-lg">
                Finance
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed max-w-4xl mx-auto px-4">
              Revolutionary blockchain technology meets innovative supply chain finance. 
              Experience the future of decentralized cargo tracking with unparalleled security and transparency.
            </p>
          </div>

          {/* Animated Feature Icons */}
          <div className="flex flex-wrap justify-center gap-6 mb-5">
            <div className="flex items-center gap-3 text-slate-200 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-medium text-sm sm:text-base">Secure & Audited</span>
            </div>
            
            <div className="flex items-center gap-3 text-slate-200 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="font-medium text-sm sm:text-base">High Performance</span>
            </div>
            
            <div className="flex items-center gap-3 text-slate-200 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-medium text-sm sm:text-base">Lightning Fast</span>
            </div>
          </div>

          {/* CTA Buttons with Enhanced Design */}
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
              <span className="relative z-10">Get Started</span>
              <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-blue-400/30 text-slate-200 font-semibold text-lg rounded-xl transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-300/50 hover:scale-105 transform hover:-translate-y-1">
              <svg className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
              </svg>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Animated Stats with Enhanced Design */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-3 border-t border-blue-400/20 w-full max-w-3xl">
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">$50M+</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1">Cargo Tracked</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1">Active Shipments</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">99.9%</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

