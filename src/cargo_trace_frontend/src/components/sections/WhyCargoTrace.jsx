import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star, Zap, Shield, Globe } from 'lucide-react';

const WhyCargoTrace = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-cargotrace" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"></div>
      
      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '0s' }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500/3 rounded-full blur-2xl animate-float"
          style={{ animationDelay: '3s' }}
        ></div>
      </div>

      <div className="container-custom px-4 relative z-10">
        {/* Minimal Header */}
        <div className={`text-center max-w-3xl mx-auto mb-24 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm font-medium mb-8">
            <Star className="w-4 h-4" />
            Why CargoTrace
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Simple.
            </span>
            <br />
            <span className="text-white">Secure.</span>
            <br />
            <span className="text-slate-300">Smart.</span>
          </h2>
        </div>

        {/* Creative 3-Column Layout */}
        <div className={`grid md:grid-cols-3 gap-12 mb-24 transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          {/* Column 1 - Security */}
          <div className="group text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Shield className="w-10 h-10 text-blue-400" />
              </div>
              <div className="absolute -inset-2 bg-blue-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
              Bank-Grade Security
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Military-grade encryption and blockchain technology ensure your cargo data is always secure.
            </p>
          </div>

          {/* Column 2 - Speed */}
          <div className="group text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-400/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Zap className="w-10 h-10 text-cyan-400" />
              </div>
              <div className="absolute -inset-2 bg-cyan-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
              Lightning Fast
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Process cargo tracking and financing in minutes, not days. Get instant approvals and real-time updates.
            </p>
          </div>

          {/* Column 3 - Global */}
          <div className="group text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500/20 to-blue-400/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Globe className="w-10 h-10 text-indigo-400" />
              </div>
              <div className="absolute -inset-2 bg-indigo-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">
              Global Network
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Connect with traders, financiers, and logistics partners worldwide through our secure platform.
            </p>
          </div>
        </div>

        {/* Minimal Stats */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">
                5 Min
              </div>
              <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                Processing Time
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">
                60%
              </div>
              <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                Cost Reduction
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">
                99.9%
              </div>
              <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                Uptime
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">
                24/7
              </div>
              <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                Support
              </div>
            </div>
          </div>
        </div>

        {/* Minimal CTA */}
        <div className={`text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to get started?
            </h3>
            <p className="text-lg text-slate-400 mb-12 leading-relaxed">
              Join thousands of businesses transforming their supply chain finance.
            </p>
            
            <button className="group relative inline-flex items-center justify-center px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCargoTrace;
