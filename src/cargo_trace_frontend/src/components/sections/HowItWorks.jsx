import React, { useEffect, useRef, useState } from 'react';
import { 
  Shield, 
  Zap, 
  Globe, 
  TrendingUp, 
  Lock, 
  Layers,
  ArrowUpRight,
  CheckCircle,
  Truck,
  DollarSign,
  FileText,
  Brain,
  Building2
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Blockchain Security',
    description: 'Immutable ledger technology ensures cargo data integrity and prevents tampering or fraud.',
    badge: 'Secure',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Truck,
    title: 'Real-Time Tracking',
    description: 'IoT sensors and GPS provide live location updates and environmental monitoring.',
    badge: 'Live Data',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10'
  },
  {
    icon: DollarSign,
    title: 'Smart Financing',
    description: 'Automated financing based on verified cargo data and smart contract execution.',
    badge: 'Automated',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10'
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'AI-powered insights optimize routes, predict delays, and reduce operational costs.',
    badge: 'AI-Powered',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Connect with partners worldwide through our decentralized supply chain network.',
    badge: 'Worldwide',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10'
  },
  {
    icon: Layers,
    title: 'Modular Platform',
    description: 'Flexible architecture adapts to your specific cargo tracking and financing needs.',
    badge: 'Scalable',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10'
  }
];

const HowItWorks = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, cardIndex]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '0s' }}
        ></div>
        <div 
          className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-40 left-1/3 w-28 h-28 bg-indigo-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '4s' }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-20 h-20 bg-blue-400/8 rounded-full blur-xl animate-float"
          style={{ animationDelay: '6s' }}
        ></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }}
        ></div>
      </div>

      <div className="container-custom px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Core Features
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Built for <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Modern Supply Chains</span>
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Experience cutting-edge technology designed to revolutionize cargo tracking and supply chain finance. 
            Every feature is crafted for security, transparency, and operational efficiency.
          </p>
        </div>

        {/* Feature Icons Set */}
        <div className="mb-16 text-center">
          <div className="w-full max-w-4xl mx-auto h-64 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl shadow-2xl flex items-center justify-center border border-blue-400/20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Feature Icons Set</h3>
              <p className="text-slate-300">Interactive visualization coming soon</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);
            
            return (
              <div 
                key={index}
                data-index={index}
                className={`group bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer hover:scale-105 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-xl ${feature.bgColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div className="px-3 py-1 bg-slate-700/50 border border-blue-400/30 rounded-full text-xs font-medium text-blue-300">
                      {feature.badge}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-blue-400 group-hover:text-cyan-400 transition-colors duration-300">
                    Learn more
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-300 mb-6 text-lg">
            Ready to revolutionize your supply chain operations?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="px-8 py-4 border border-slate-700/50 hover:bg-slate-800/50 hover:border-blue-400/50 transition-all duration-300 rounded-xl font-medium text-slate-300 hover:text-white">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
