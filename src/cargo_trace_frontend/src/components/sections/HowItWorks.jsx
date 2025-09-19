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

        {/* Global Trade Network Visualization */}
        <div className="mb-16">
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Main Visualization Container */}
            <div className="relative h-96 bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-3xl shadow-2xl border border-blue-400/20 overflow-hidden">
              
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5"></div>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              {/* Header Section */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-300 font-medium">Live Network</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-cyan-300 font-medium">Real-time Tracking</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">Global Trade Network</div>
                  <div className="text-sm text-slate-300">Powered by CargoTrace</div>
                </div>
              </div>

              {/* Trading Hubs Section */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Dubai Hub - Central */}
                <div className="relative z-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">DXB</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-sm text-blue-300 font-bold">Dubai Hub</div>
                    <div className="text-xs text-slate-400">Central Gateway</div>
                  </div>
                </div>

                {/* Singapore Hub - Top Right */}
                <div className="absolute top-16 right-20 z-20">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/50 animate-pulse" style={{animationDelay: '1s'}}>
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                      <span className="text-cyan-600 font-bold text-sm">SIN</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs text-cyan-300 font-bold">Singapore</div>
                    <div className="text-xs text-slate-400">Asia Pacific</div>
                  </div>
                </div>

                {/* Rotterdam Hub - Top Left */}
                <div className="absolute top-16 left-20 z-20">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/50 animate-pulse" style={{animationDelay: '2s'}}>
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-sm">RTM</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs text-indigo-300 font-bold">Rotterdam</div>
                    <div className="text-xs text-slate-400">Europe Gateway</div>
                  </div>
                </div>

                {/* Los Angeles Hub - Bottom Left */}
                <div className="absolute bottom-16 left-24 z-20">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse" style={{animationDelay: '3s'}}>
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-xs">LAX</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs text-purple-300 font-bold">Los Angeles</div>
                    <div className="text-xs text-slate-400">Americas</div>
                  </div>
                </div>

                {/* Mumbai Hub - Bottom Right */}
                <div className="absolute bottom-16 right-24 z-20">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50 animate-pulse" style={{animationDelay: '4s'}}>
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-xs">BOM</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs text-orange-300 font-bold">Mumbai</div>
                    <div className="text-xs text-slate-400">South Asia</div>
                  </div>
                </div>
              </div>

              {/* Trade Routes */}
              <div className="absolute inset-0 z-10">
                {/* Route 1: Dubai to Singapore */}
                <div className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-400/70 via-cyan-400/50 to-transparent transform rotate-45 origin-left animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                
                {/* Route 2: Dubai to Rotterdam */}
                <div className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-400/70 via-indigo-400/50 to-transparent transform -rotate-45 origin-left animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                
                {/* Route 3: Dubai to Los Angeles */}
                <div className="absolute top-1/2 left-1/2 w-40 h-0.5 bg-gradient-to-r from-blue-400/70 via-purple-400/50 to-transparent transform rotate-12 origin-left animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                
                {/* Route 4: Dubai to Mumbai */}
                <div className="absolute top-1/2 left-1/2 w-36 h-0.5 bg-gradient-to-r from-blue-400/70 via-orange-400/50 to-transparent transform -rotate-12 origin-left animate-pulse" style={{animationDelay: '3s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
              </div>

              {/* Floating Cargo Ships */}
              <div className="absolute inset-0 z-15">
                <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg transform rotate-12 animate-float shadow-lg">
                  <div className="w-full h-full flex items-center justify-center text-white text-sm">🚢</div>
                </div>
                <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-lg transform -rotate-12 animate-float shadow-lg" style={{animationDelay: '2s'}}>
                  <div className="w-full h-full flex items-center justify-center text-white text-sm">🚢</div>
                </div>
                <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-lg transform rotate-45 animate-float shadow-lg" style={{animationDelay: '4s'}}>
                  <div className="w-full h-full flex items-center justify-center text-white text-sm">🚢</div>
                </div>
                <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg transform -rotate-45 animate-float shadow-lg" style={{animationDelay: '6s'}}>
                  <div className="w-full h-full flex items-center justify-center text-white text-sm">🚢</div>
                </div>
              </div>

              {/* Data Flow Particles */}
              <div className="absolute inset-0 z-5">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                    style={{
                      top: `${20 + (i * 10)}%`,
                      left: `${15 + (i * 12)}%`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>

              {/* Statistics Panel */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$2.4B</div>
                    <div className="text-xs text-slate-300">Cargo Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">15K+</div>
                    <div className="text-xs text-slate-300">Active Ships</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">99.8%</div>
                    <div className="text-xs text-slate-300">Accuracy</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-300">Live Transactions</div>
                  <div className="text-lg font-bold text-green-400">1,247</div>
                </div>
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/40 pointer-events-none z-5"></div>
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
      
      </div>
    </section>
  );
};

export default HowItWorks;
