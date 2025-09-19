import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-white dark:bg-dark-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-800 dark:to-dark-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-50/30 to-transparent dark:via-primary-900/20"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full animate-bounce-gentle opacity-60"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-primary-300 dark:bg-primary-700 rounded-lg animate-bounce-gentle opacity-40" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary-400 dark:bg-primary-600 rounded-full animate-bounce-gentle opacity-50" style={{animationDelay: '2s'}}></div>
      
      {/* Hero Content */}
      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              Live on Internet Computer
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block text-gray-900 dark:text-white">
                Decentralized
              </span>
              <span className="block text-gradient">
                Trade Finance
              </span>
              <span className="block text-gray-700 dark:text-gray-300 text-2xl md:text-3xl lg:text-4xl">
                for the MENA Region
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              Tokenize verified customs documents as NFTs on Internet Computer and unlock instant DeFi loans. 
              Helping importers in Egypt and the region access funding through CargoX and ACI/NAFEZA integration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary group">
                <span className="mr-2">Explore Demo</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button className="btn-secondary">
                View Documentation
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center group">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1 group-hover:scale-110 transition-transform duration-300">$50M+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Trade Volume</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-primary-500 dark:text-primary-300 mb-1 group-hover:scale-110 transition-transform duration-300">1,000+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Documents</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Traders</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Demo Card */}
          <div className="relative animate-slide-up">
            {/* Main Card */}
            <div className="card p-8 max-w-md mx-auto lg:mx-0 group hover:scale-105 transition-all duration-500">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Document Verified</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Blockchain Confirmed</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
              </div>

              {/* Document Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Document ID:</span>
                  <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">CTX-2024-001</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Cargo Type:</span>
                  <span className="text-sm text-gray-900 dark:text-white">Electronics</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Origin:</span>
                  <span className="text-sm text-gray-900 dark:text-white">Shanghai, China</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Destination:</span>
                  <span className="text-sm text-gray-900 dark:text-white">Alexandria, Egypt</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Loan Value:</span>
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">$25,000</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 rounded-lg">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Live on Blockchain</span>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary-200 dark:bg-primary-800 rounded-full animate-bounce-gentle opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-primary-300 dark:bg-primary-700 rounded-lg animate-bounce-gentle opacity-40" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-1/2 -left-8 w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 animate-bounce">
        <div className="text-sm">Scroll to explore</div>
        <div className="text-xl">↓</div>
      </div>
    </section>
  );
};

export default Hero;
