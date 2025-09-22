import React, { useEffect, useRef, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Target,
  BarChart3,
  Globe,
  Zap,
  Building2,
  Star,
  CheckCircle,
  ArrowUpRight,
  Trophy,
  DollarSign,
  Clock
} from 'lucide-react';

const achievements = [
  {
    title: 'Document Tokenization',
    description: 'Convert verified customs documents like ACID/NAFEZA filings into on-chain collateral as NFTs',
    metric: 'Minutes vs Weeks',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    icon: Zap
  },
  {
    title: 'CargoX Integration',
    description: 'Node.js Ethereum watcher monitors CargoX ERC-721 document transfers seamlessly',
    metric: 'No Partnerships Required',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    icon: Globe
  },
  {
    title: 'ICRC Stable Tokens',
    description: 'Secure instant loans disbursed in ICRC-compliant stable tokens for immediate liquidity',
    metric: 'Instant Access',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    icon: DollarSign
  }
];

const milestones = [
  {
    title: 'Egypt Pilot Launch',
    description: 'Starting with Egypt pilots to solve the $15-20B annual finance gap in the region',
    benefit: 'Phase 1',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    icon: Target
  },
  {
    title: 'MENA Expansion',
    description: 'Expanding across the wider MENA region to serve more SMEs',
    benefit: 'Phase 2',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    icon: Globe
  },
  {
    title: 'Global Protocol',
    description: 'Evolving into a global protocol to solve the $1.7T trade finance shortfall',
    benefit: 'Phase 3',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    icon: Building2
  }
];

const marketingStats = [
  {
    value: '$15-20B',
    label: 'Egypt Finance Gap',
    description: 'Annual shortfall we\'re addressing',
    icon: DollarSign
  },
  {
    value: '$1.7T',
    label: 'Global Shortfall',
    description: 'Worldwide trade finance gap',
    icon: BarChart3
  },
  {
    value: '2-6 weeks',
    label: 'Current Delays',
    description: 'Manual verification time',
    icon: Clock
  },
  {
    value: 'Minutes',
    label: 'Our Solution',
    description: 'Time to liquidity with CargoTrace',
    icon: Zap
  }
];

const Technology = () => {
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
    <section id="technology" ref={sectionRef} className="py-24 relative overflow-hidden">
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
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Our Technology
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Advanced</span> Technology
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            CargoTrace Finance is a decentralized trade finance platform built on Internet Computer (ICP) 
            that solves liquidity bottlenecks for SMEs in Egypt and MENA. Our blockchain solution converts 
            verified customs documents into on-chain collateral for instant loans.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index}
                className={`group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-xl ${achievement.bgColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <Icon className={`w-6 h-6 ${achievement.color}`} />
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${achievement.color}`}>{achievement.metric}</div>
                      <div className="text-xs text-slate-400">Achievement</div>
                    </div>
                  </div>

                  {/* Achievement Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {achievement.description}
                  </p>

                  {/* Metric */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      Metric: <span className="font-medium text-white">{achievement.metric}</span>
                    </p>
                  </div>

                  {/* Animated Underline */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestones Section */}
        <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-3xl font-bold text-white mb-12 relative">
            Key Milestones
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-slate-800/20 backdrop-blur-xl border border-slate-700/20 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105"
                >
                  <div className="text-center space-y-4">
                    {/* Milestone Icon */}
                    <div className={`w-16 h-16 ${milestone.bgColor} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${milestone.color}`} />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                        {milestone.description}
                      </p>
                      <p className="text-xs text-blue-400 font-medium">
                        {milestone.benefit}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Marketing Statistics */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              By the Numbers
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {marketingStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="space-y-4 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-2xl group-hover:text-blue-400 transition-colors duration-300">
                        {stat.value}
                      </h4>
                      <p className="text-slate-300 text-sm font-medium">{stat.label}</p>
                      <p className="text-slate-400 text-xs">{stat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
