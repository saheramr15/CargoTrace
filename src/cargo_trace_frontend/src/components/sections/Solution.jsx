import React, { useEffect, useRef, useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Scan,
  Shield,
  TrendingUp,
  Lightbulb,
  ArrowDown,
  Zap,
  DollarSign,
  Link as LinkIcon,
  FileText,
  Building2,
  Globe,
  Lock,
  BarChart3,
  Rocket
} from 'lucide-react';

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

  const solutions = [
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Our blockchain-powered system processes trade finance applications in minutes, not weeks. Automated document verification eliminates manual delays.",
      benefits: [
        "Minutes instead of weeks",
        "24/7 automated processing",
        "Real-time status updates"
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "Access to DeFi lending protocols provides significantly lower interest rates compared to traditional banking, making capital more affordable for SMEs.",
      benefits: [
        "3-5% interest rates",
        "No hidden fees",
        "Transparent pricing"
      ],
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      gradient: "from-cyan-500 to-blue-400"
    },
    {
      icon: LinkIcon,
      title: "Seamless Integration",
      description: "Direct integration with CargoX and ACI/NAFEZA systems ensures automatic document verification and instant loan disbursement upon customs clearance.",
      benefits: [
        "One-click application",
        "Automatic verification",
        "Instant disbursement"
      ],
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  const features = [
    {
      icon: FileText,
      title: "Document Tokenization",
      description: "Convert customs documents into verifiable NFTs on Internet Computer blockchain",
      color: "text-blue-400"
    },
    {
      icon: Building2,
      title: "DeFi Lending",
      description: "Access instant loans through automated smart contracts and lending protocols",
      color: "text-cyan-400"
    },
    {
      icon: Globe,
      title: "MENA Focus",
      description: "Specialized for Egyptian customs and broader MENA region compliance",
      color: "text-indigo-400"
    },
    {
      icon: Lock,
      title: "Secure & Transparent",
      description: "Blockchain ensures immutable records and transparent transaction history",
      color: "text-blue-300"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track your trade finance applications and loan status in real-time",
      color: "text-cyan-300"
    },
    {
      icon: Rocket,
      title: "Scalable Platform",
      description: "Built on Internet Computer for unlimited scalability and low costs",
      color: "text-indigo-300"
    }
  ];

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
            </span> Unlocks Instant Funding
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            Our blockchain-powered platform transforms trade finance by providing instant, 
            affordable, and accessible funding solutions for MENA region traders.
          </p>
          
          {/* Header Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3 text-slate-200 group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <span className="font-medium">Instant Processing</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="font-medium">Lower Costs</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="font-medium">Secure & Transparent</span>
            </div>
          </div>
        </div>

        {/* Main Solution Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            
            return (
              <div 
                key={index}
                className={`group relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${solution.gradient}/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-xl ${solution.bgColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden`}>
                      <Icon className={`w-6 h-6 ${solution.color} relative z-10`} />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-mono text-slate-300 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                      Step {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {solution.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-3 text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                        <CheckCircle className={`w-5 h-5 ${solution.color} group-hover:scale-110 transition-transform duration-300`} />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Animated Underline */}
                  <div className={`w-0 h-0.5 bg-gradient-to-r ${solution.gradient} group-hover:w-full transition-all duration-500`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-3xl font-bold text-white mb-12 relative">
            Platform Features
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <div 
                  key={index}
                  className="group bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className={`w-6 h-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-slate-300 text-sm group-hover:text-slate-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Value Proposition */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 delay-800 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-3xl font-bold text-white mb-6">Transform Your Trade Finance</h3>
          <p className="text-xl text-slate-300 leading-relaxed mb-12">
            Join the future of decentralized trade finance. CargoTrace Finance provides 
            instant access to working capital through our blockchain-powered document 
            verification system, designed specifically for the MENA region.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">95%</div>
              <div className="text-sm text-slate-300 font-medium">Faster Processing</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">60%</div>
              <div className="text-sm text-slate-300 font-medium">Lower Costs</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">24/7</div>
              <div className="text-sm text-slate-300 font-medium">Availability</div>
            </div>
          </div>
          
          <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
            <span className="relative z-10">Start Your Journey</span>
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solution;
