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
        <div className="py-12">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-4">
              <div className="group flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-xl">🚢</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/50 to-cyan-400/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    CargoTrace
                  </span>
                  <span className="text-xs font-medium text-blue-200">
                    Finance
                  </span>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed text-sm">
                Revolutionizing trade finance through blockchain innovation.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-3">
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
                      className={`w-8 h-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-2 grid md:grid-cols-3 grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm relative">
                  Product
                  <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                </h4>
                <ul className="space-y-2">
                  {['Features', 'How It Works', 'Technology', 'API Docs'].map((link, index) => (
                    <li key={index}>
                      <a 
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-xs group flex items-center"
                      >
                        <ArrowRight className="w-2 h-2 mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm relative">
                  Company
                  <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"></div>
                </h4>
                <ul className="space-y-2">
                  {['About Us', 'Partners', 'Careers', 'Contact'].map((link, index) => (
                    <li key={index}>
                      <a 
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-xs group flex items-center"
                      >
                        <ArrowRight className="w-2 h-2 mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm relative">
                  Support
                  <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full"></div>
                </h4>
                <ul className="space-y-2">
                  {['Help Center', 'Documentation', 'Community', 'Security'].map((link, index) => (
                    <li key={index}>
                      <a 
                        href="#"
                        className="text-slate-300 hover:text-indigo-400 transition-colors duration-300 text-xs group flex items-center"
                      >
                        <ArrowRight className="w-2 h-2 mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
        <div className="py-6 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-slate-400 text-xs">
              © 2024 CargoTrace Finance. All rights reserved.
            </div>
            
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2">
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
                    className={`group flex items-center space-x-1.5 px-2 py-1 bg-gradient-to-r ${tech.color} rounded-md text-white text-xs font-medium hover:scale-105 transition-transform duration-300`}
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
