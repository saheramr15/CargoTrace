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

        {/* Solution Flow Diagram */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative max-w-4xl mx-auto">
            <div className="w-full h-64 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl shadow-2xl flex items-center justify-center border border-blue-400/20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto">
                  <Scan className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Solution Flow Diagram</h3>
                <p className="text-slate-300">Interactive visualization coming soon</p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
          </div>
        </div>

        {/* 3-Step Process */}
        <div className="space-y-12">
          {solutionSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div key={index} className="relative">
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Content */}
                  <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}
                       style={{ animationDelay: `${(index + 1) * 200}ms` }}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-2xl ${step.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <div className="px-3 py-1 bg-slate-700/50 border border-blue-400/30 rounded-full text-sm font-mono text-blue-300">
                        Step {step.step}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                      <p className="text-lg text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">Key Features:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className={`w-5 h-5 ${step.color}`} />
                            <span className="text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={`${isEven ? 'lg:col-start-1' : ''} transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}
                       style={{ animationDelay: `${(index + 1) * 300}ms` }}>
                    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group">
                      <div className="text-center space-y-6">
                        <div className={`w-24 h-24 mx-auto rounded-full ${step.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-12 h-12 ${step.color}`} />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-white">{step.title}</h4>
                          <p className="text-slate-300">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow between steps */}
                {index < solutionSteps.length - 1 && (
                  <div className="flex justify-center my-8">
                    <ArrowDown className="w-8 h-8 text-blue-500 animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          <p className="text-slate-300 mb-6 text-lg">
            Ready to transform your supply chain with CargoTrace?
          </p>
          <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
            <span className="relative z-10">Start Your Journey</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solution;
