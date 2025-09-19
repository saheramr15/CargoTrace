import React from 'react';
import { 
  Mail, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Github,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Lock
} from 'lucide-react';

const NewFooter = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5"></div>
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '0s' }}
        ></div>
        <div 
          className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-20 left-1/3 w-28 h-28 bg-indigo-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '4s' }}
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
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="group flex items-center space-x-4">
                <div className="relative">
                  {/* Main Logo Container */}
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300 border border-blue-400/20 group-hover:border-blue-400/40">
                    {/* Cargo Container Icon */}
                    <div className="relative">
                      {/* Container Base */}
                      <div className="w-8 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-sm shadow-lg">
                        {/* Container Lines */}
                        <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-blue-300"></div>
                        <div className="absolute top-2 left-0.5 right-0.5 h-0.5 bg-blue-300"></div>
                        <div className="absolute top-3 left-0.5 right-0.5 h-0.5 bg-blue-300"></div>
                        <div className="absolute top-4 left-0.5 right-0.5 h-0.5 bg-blue-300"></div>
                      </div>
                      {/* Blockchain Chain Links */}
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      {/* Tracking Signal */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-cyan-400/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-1 -right-1 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '1s'}}></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    CargoTrace
                  </span>
                  <span className="text-sm font-medium text-blue-200">
                    Finance
                  </span>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed text-sm">
                Revolutionizing trade finance through blockchain innovation. 
                Connecting traditional commerce with cutting-edge DeFi solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Mail, href: "#", label: "Email", color: "hover:text-blue-400" },
                  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-cyan-400" },
                  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-indigo-400" },
                  { icon: MessageCircle, href: "#", label: "Telegram", color: "hover:text-blue-300" }
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid md:grid-cols-3 grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg relative">
                  Product
                  <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                </h4>
                <ul className="space-y-3">
                  {['Features', 'How It Works', 'Technology', 'API Documentation', 'Integration Guide'].map((link, index) => (
                    <li key={index}>
                      <a 
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm group flex items-center"
                      >
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg relative">
                  Company
                  <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"></div>
                </h4>
                <ul className="space-y-3">
                  {['About Us', 'Partners', 'Careers', 'Press Kit', 'Contact'].map((link, index) => (
                    <li key={index}>
                      <a 
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-sm group flex items-center"
                      >
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg relative">
                  Support
                  <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full"></div>
                </h4>
                <ul className="space-y-3">
                  {['Help Center', 'Documentation', 'Community', 'Status Page', 'Security'].map((link, index) => (
                    <li key={index}>
                      <a 
                        href="#"
                        className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 text-sm group flex items-center"
                      >
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2024 CargoTrace Finance. All rights reserved.
            </div>
            
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'ICP', icon: Globe, color: 'from-blue-500 to-cyan-400' },
                { name: 'Ethereum', icon: Shield, color: 'from-indigo-500 to-blue-400' },
                { name: 'CargoX', icon: Zap, color: 'from-cyan-500 to-blue-500' },
                { name: 'NAFEZA', icon: Lock, color: 'from-blue-400 to-indigo-400' }
              ].map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={index}
                    className={`group flex items-center space-x-2 px-3 py-2 bg-gradient-to-r ${tech.color} rounded-lg text-white text-xs font-medium hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
