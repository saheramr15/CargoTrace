import React, { useEffect, useRef, useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Scan,
  Shield,
  TrendingUp,
  Lightbulb,
  ArrowDown
} from 'lucide-react';

const solutionSteps = [
  {
    step: '01',
    icon: Scan,
    title: 'Track & Verify',
    description: 'Real-time cargo tracking with blockchain-verified authenticity and location data.',
    features: ['IoT Sensors', 'GPS Tracking', 'Smart Contracts'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    step: '02',
    icon: Shield,
    title: 'Secure & Finance',
    description: 'Automated financing and insurance based on verified cargo data and smart contracts.',
    features: ['Auto Financing', 'Risk Assessment', 'Insurance Claims'],
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10'
  },
  {
    step: '03',
    icon: TrendingUp,
    title: 'Optimize & Scale',
    description: 'AI-powered analytics optimize routes, reduce costs, and improve supply chain efficiency.',
    features: ['Route Optimization', 'Predictive Analytics', 'Cost Reduction'],
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10'
  }
];

const Solution = () => {
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
    <section id="solution" ref={sectionRef} className="py-24 relative overflow-hidden">
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
            <Lightbulb className="w-4 h-4" />
            Our Solution
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              CargoTrace
            </span> Revolutionizes Supply Chain Finance
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Our blockchain-powered platform provides end-to-end cargo tracking, automated financing, 
            and intelligent optimization to transform how supply chains operate.
          </p>
        </div>

        {/* Simple Process Overview */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/25">
              <Scan className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Streamlined Process</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Our three-step process transforms traditional trade finance into a seamless, 
              blockchain-powered experience that delivers results in minutes, not weeks.
            </p>
          </div>
        </div>

        {/* 3-Step Process - Simplified */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {solutionSteps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div key={index} className="text-center group">
                  {/* Step Number */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-10 h-10 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Key Features - Simplified */}
                    <div className="pt-4 space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-center space-x-2">
                          <CheckCircle className={`w-4 h-4 ${step.color}`} />
                          <span className="text-sm text-slate-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default Solution;
