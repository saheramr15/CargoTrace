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
    <section id="problem" ref={sectionRef} className="py-24 relative bg-slate-900/20">
      <div className="container-custom px-4">
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
                className={`group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-xl ${problem.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${problem.color}`} />
                    </div>
                    <div className="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-mono text-slate-300">
                      {problem.impact}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why It Matters */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-3xl font-bold text-white mb-12">Why This Matters</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <TrendingDown className="w-8 h-8 text-red-500" />
              </div>
              <h4 className="font-bold text-white text-lg">Lost Revenue</h4>
              <p className="text-slate-300">Businesses lose millions due to supply chain inefficiencies</p>
            </div>
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h4 className="font-bold text-white text-lg">Security Risks</h4>
              <p className="text-slate-300">Vulnerable systems expose cargo to theft and fraud</p>
            </div>
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-red-500" />
              </div>
              <h4 className="font-bold text-white text-lg">Slow Processes</h4>
              <p className="text-slate-300">Manual systems create delays and operational bottlenecks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
