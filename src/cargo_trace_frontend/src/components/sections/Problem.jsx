import React, { useEffect, useRef, useState } from 'react';
import { 
  Shield, 
  Award, 
  CheckCircle, 
  Building2,
  Users,
  Star,
  FileText,
  Lock
} from 'lucide-react';

const certifications = [
  {
    name: 'ISO 27001',
    description: 'Information Security Management',
    issuer: 'International Organization for Standardization',
    year: '2024',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    icon: Shield
  },
  {
    name: 'SOC 2 Type II',
    description: 'Security, Availability & Confidentiality',
    issuer: 'American Institute of CPAs',
    year: '2024',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    icon: Lock
  },
  {
    name: 'GDPR Compliant',
    description: 'Data Protection Regulation',
    issuer: 'European Union',
    year: '2024',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    icon: FileText
  }
];

const partnerships = [
  {
    name: 'IBM Blockchain',
    category: 'Technology Partner',
    description: 'Enterprise blockchain infrastructure',
    logo: 'IBM'
  },
  {
    name: 'Microsoft Azure',
    category: 'Cloud Partner',
    description: 'Secure cloud computing platform',
    logo: 'MS'
  },
  {
    name: 'Oracle',
    category: 'Database Partner',
    description: 'Enterprise database solutions',
    logo: 'OR'
  },
  {
    name: 'Deloitte',
    category: 'Advisory Partner',
    description: 'Professional services & consulting',
    logo: 'DT'
  }
];

const PartnershipRecognition = () => {
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
    <section id="partnership-recognition" ref={sectionRef} className="py-24 relative overflow-hidden">
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
            <Award className="w-4 h-4" />
            Trust & Recognition
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Trusted</span> by Industry Leaders
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            CargoTrace is built on enterprise-grade security and trusted by leading technology partners. 
            Our certifications and partnerships ensure the highest standards of reliability and compliance.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
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
                    <div className={`p-4 rounded-xl ${cert.bgColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <Icon className={`w-6 h-6 ${cert.color}`} />
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${cert.color}`}>{cert.year}</div>
                      <div className="text-xs text-slate-400">Certified</div>
                    </div>
                  </div>

                  {/* Certification Name */}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {cert.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {cert.description}
                  </p>

                  {/* Issuer */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      Issued by: <span className="font-medium text-white">{cert.issuer}</span>
                    </p>
                  </div>

                  {/* Animated Underline */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnerships Section */}
        <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-3xl font-bold text-white mb-12 relative">
            Strategic Partnerships
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerships.map((partner, index) => (
              <div 
                key={index}
                className="group relative bg-slate-800/20 backdrop-blur-xl border border-slate-700/20 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105"
              >
                <div className="text-center space-y-4">
                  {/* Partner Logo Placeholder */}
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{partner.logo}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-blue-400 font-medium">
                      {partner.category}
                    </p>
                    <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Enterprise-Grade Security & Compliance
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <h4 className="font-bold text-white text-lg">Bank-Grade Security</h4>
                <p className="text-slate-300 text-sm">Military-grade encryption and multi-layer security protocols</p>
              </div>
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-cyan-500" />
                </div>
                <h4 className="font-bold text-white text-lg">Audited & Verified</h4>
                <p className="text-slate-300 text-sm">Regular third-party security audits and compliance reviews</p>
              </div>
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-indigo-500" />
                </div>
                <h4 className="font-bold text-white text-lg">Enterprise Ready</h4>
                <p className="text-slate-300 text-sm">Built for large-scale enterprise deployments and integrations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipRecognition;
