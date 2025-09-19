import React, { useEffect, useRef, useState } from 'react';
import { 
  AlertTriangle, 
  Eye, 
  DollarSign, 
  Clock,
  TrendingDown,
  Shield,
  Zap
} from 'lucide-react';

const problems = [
  {
    icon: Eye,
    title: 'Lack of Transparency',
    description: 'Traditional supply chains operate in silos, making it impossible to track cargo movement and verify authenticity in real-time.',
    impact: '40% of shipments',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    icon: DollarSign,
    title: 'High Financial Risk',
    description: 'Without proper tracking and verification, businesses face significant financial losses from fraud, theft, and delayed shipments.',
    impact: '$52B annually',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    icon: Clock,
    title: 'Inefficient Processes',
    description: 'Manual paperwork and disconnected systems create delays, errors, and increased operational costs across the supply chain.',
    impact: '30% time waste',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  }
];

const Problem = () => {
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
    <section id="problem" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-red-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '0s' }}
        ></div>
        <div 
          className="absolute top-40 right-32 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-40 left-1/3 w-28 h-28 bg-purple-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '4s' }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-20 h-20 bg-red-400/8 rounded-full blur-xl animate-float"
          style={{ animationDelay: '6s' }}
        ></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-orange-500/10"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(239, 68, 68, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }}
        ></div>
      </div>

      <div className="container-custom px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            The Problem
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Supply Chain Finance is <span className="text-red-500">Broken</span>
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Traditional cargo tracking and supply chain finance systems are plagued with inefficiencies, 
            lack of transparency, and security vulnerabilities that cost businesses billions annually.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            
            return (
              <div 
                key={index}
                className={`group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-xl ${problem.bgColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden`}>
                      <Icon className={`w-6 h-6 ${problem.color} relative z-10`} />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-mono text-slate-300 group-hover:bg-red-500/20 group-hover:text-red-300 transition-all duration-300">
                      {problem.impact}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    {problem.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {problem.description}
                  </p>
                  
                  {/* Animated Underline */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why It Matters */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-3xl font-bold text-white mb-12 relative">
            Why This Matters
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 group relative">
              <div className="relative">
                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                  <TrendingDown className="w-8 h-8 text-red-500 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="absolute -inset-2 bg-red-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h4 className="font-bold text-white text-lg group-hover:text-red-400 transition-colors duration-300">Lost Revenue</h4>
              <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">Businesses lose millions due to supply chain inefficiencies</p>
            </div>
            <div className="space-y-4 group relative">
              <div className="relative">
                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                  <Shield className="w-8 h-8 text-red-500 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="absolute -inset-2 bg-red-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h4 className="font-bold text-white text-lg group-hover:text-red-400 transition-colors duration-300">Security Risks</h4>
              <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">Vulnerable systems expose cargo to theft and fraud</p>
            </div>
            <div className="space-y-4 group relative">
              <div className="relative">
                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                  <Zap className="w-8 h-8 text-red-500 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="absolute -inset-2 bg-red-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h4 className="font-bold text-white text-lg group-hover:text-red-400 transition-colors duration-300">Slow Processes</h4>
              <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">Manual systems create delays and operational bottlenecks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
