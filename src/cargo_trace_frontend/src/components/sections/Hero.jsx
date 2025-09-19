import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-dark-900 overflow-hidden">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 via-transparent to-primary-800/30"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating Premium Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary-600/20 to-primary-800/20 rounded-full blur-xl animate-bounce-gentle"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-primary-500/30 to-primary-700/30 rounded-lg blur-lg animate-bounce-gentle" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-primary-400/25 to-primary-600/25 rounded-full blur-md animate-bounce-gentle" style={{animationDelay: '4s'}}></div>
      
      {/* Main Content Container */}
      <div className="container-custom relative z-10 min-h-screen flex items-center">
        <div className="w-full">
          
          {/* Hero Content Grid */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-dark-800/50 backdrop-blur-sm border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium animate-fade-in">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span>Live on Internet Computer</span>
                <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
              </div>

              {/* Main Title */}
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
                  <span className="block text-white mb-2">
                    Decentralized
                  </span>
                  <span className="block bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                    Trade Finance
                  </span>
                  <span className="block text-gray-300 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-4">
                    for Global Commerce
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="max-w-2xl animate-fade-in">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Transform your customs documents into tradeable NFTs on the blockchain. 
                  Unlock instant DeFi loans and streamline international trade finance with 
                  verified, immutable cargo documentation.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Empowering importers across Egypt and the MENA region with cutting-edge 
                  blockchain technology and seamless CargoX/ACI integration.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:from-primary-500 hover:to-primary-600 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25">
                  <span className="mr-3">Start Trading</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-dark-800/50 backdrop-blur-sm border border-gray-600 text-gray-300 font-semibold text-lg rounded-xl transition-all duration-300 hover:bg-dark-700/50 hover:text-white hover:border-primary-500/50">
                  <span className="mr-3">View Demo</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 animate-fade-in">
                <div className="text-center group">
                  <div className="text-4xl font-black text-primary-400 mb-2 group-hover:scale-110 transition-transform duration-300">$50M+</div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">Trade Volume</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-primary-300 mb-2 group-hover:scale-110 transition-transform duration-300">1,200+</div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">Documents</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">Traders</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black text-primary-500 mb-2 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Content - 5 columns */}
            <div className="lg:col-span-5 relative animate-slide-up">
              
              {/* Main Premium Card */}
              <div className="relative">
                {/* Card Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/50 to-primary-400/50 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                
                {/* Card Content */}
                <div className="relative bg-dark-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Document Verified</h3>
                        <p className="text-sm text-gray-400">Blockchain Confirmed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-primary-400 font-medium">LIVE</span>
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center py-4 border-b border-gray-700/50">
                      <span className="text-sm text-gray-400 font-medium">Document ID</span>
                      <span className="text-sm font-mono text-white bg-dark-700/50 px-3 py-1 rounded-lg">CTX-2024-001</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-700/50">
                      <span className="text-sm text-gray-400 font-medium">Cargo Type</span>
                      <span className="text-sm text-white font-semibold">Electronics</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-700/50">
                      <span className="text-sm text-gray-400 font-medium">Origin</span>
                      <span className="text-sm text-white">Shanghai, China</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-700/50">
                      <span className="text-sm text-gray-400 font-medium">Destination</span>
                      <span className="text-sm text-white">Alexandria, Egypt</span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <span className="text-sm text-gray-400 font-medium">Loan Value</span>
                      <span className="text-2xl font-black text-primary-400">$25,000</span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-8 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-900/50 to-primary-800/50 border border-primary-500/30 rounded-xl">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-primary-300">Live on Blockchain</span>
                    <div className="w-1 h-1 bg-primary-400 rounded-full"></div>
                  </div>
                </div>

                {/* Floating Premium Elements */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-primary-500/30 to-primary-700/30 rounded-full blur-lg animate-bounce-gentle"></div>
                <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-primary-400/25 to-primary-600/25 rounded-lg blur-md animate-bounce-gentle" style={{animationDelay: '3s'}}></div>
                <div className="absolute top-1/2 -left-12 w-8 h-8 bg-gray-500/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 text-gray-500 animate-bounce">
        <div className="text-sm font-medium uppercase tracking-wider">Explore Platform</div>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
