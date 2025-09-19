import React, { useEffect, useRef, useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Star,
  Shield,
  Zap,
  Globe,
  Users,
  TrendingUp
} from 'lucide-react';

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

  const benefits = [
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Military-grade encryption and blockchain technology ensure your cargo data is always secure.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process cargo tracking and financing in minutes, not days. Get instant approvals and real-time updates.',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with traders, financiers, and logistics partners worldwide through our secure platform.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    },
    {
      icon: Users,
      title: 'Trusted by Thousands',
      description: 'Join over 10,000+ businesses who trust CargoTrace for their supply chain finance needs.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  const stats = [
    { number: '5 Min', label: 'Average Processing Time' },
    { number: '60%', label: 'Cost Reduction' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Global Support' }
  ];

  return (
    <section id="why-cargotrace" ref={sectionRef} className="py-24 relative overflow-hidden">
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
      </div>

      <div className="container-custom px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Why Choose CargoTrace
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            The <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Future</span> of Supply Chain Finance
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Experience the power of blockchain technology combined with innovative financing solutions 
            designed specifically for modern supply chains.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
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
                  <div className={`p-4 rounded-xl ${benefit.bgColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden`}>
                    <Icon className={`w-6 h-6 ${benefit.color} relative z-10`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Animated Underline */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className={`mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Our Impact in Numbers</h3>
              <p className="text-slate-300">Real results from real businesses using CargoTrace</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Supply Chain?
            </h3>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Join thousands of businesses who have already revolutionized their supply chain finance 
              with CargoTrace. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
                <span className="relative z-10">Get Started Now</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-blue-400/30 text-slate-200 font-semibold text-lg rounded-xl transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-300/50 hover:scale-105 transform hover:-translate-y-1">
                <TrendingUp className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>View Success Stories</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCargoTrace;
