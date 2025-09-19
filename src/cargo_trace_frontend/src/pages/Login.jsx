import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, checkAuth, getPrincipal } from '../auth';
import { backendService } from '../services/backendService';
import { Principal } from "@dfinity/principal";
import { cargo_trace_backend as backend } from '../../../declarations/cargo_trace_backend';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, LogOut, Shield, Zap, Globe, Lock } from 'lucide-react';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [principal, setPrincipal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('');
  const navigate = useNavigate();
    const { globalPrincipal, setGlobalPrincipal } = useAuth(); // use global context


  useEffect(() => {
    const init = async () => {
      const authenticated = await checkAuth();
      setLoggedIn(authenticated);
      if (authenticated) {
      const userPrincipalStr = await getPrincipal(); // string
      setPrincipal(userPrincipalStr);
        
        // Initialize backend service
        try {
          setBackendStatus('Initializing backend...');
          const authClient = await import('@dfinity/auth-client').then(m => m.AuthClient.create());
          const identity = authClient.getIdentity();
          await backendService.initialize(identity);
          console.log(identity );
           const userPrincipal = Principal.fromText(userPrincipalStr); // ✅ convert
          setGlobalPrincipal(userPrincipalStr); // set in global context
           await backend.save_principal(userPrincipal);

          setBackendStatus('Backend connected successfully');
        } catch (error) {
          console.error('Failed to initialize backend:', error);
          setBackendStatus('Backend connection failed');
        }
      }
    };
    init();
  }, []);

const handleLogin = async () => {
  setIsLoading(true);
  setBackendStatus('');

  await login(async () => {
    const authenticated = await checkAuth();
    if (authenticated) {
      try {
        setBackendStatus('Initializing backend...');
        const authClient = await import('@dfinity/auth-client').then(m => m.AuthClient.create());
        const identity = authClient.getIdentity();
        await backendService.initialize(identity);
        setBackendStatus('Backend connected successfully');

        
        const userPrincipalStr = await getPrincipal();
        setPrincipal(userPrincipalStr);


        setGlobalPrincipal(userPrincipalStr);

        
        const userPrincipal = Principal.fromText(userPrincipalStr);
        await backend.save_principal(userPrincipal);

    
        setLoggedIn(true);

         
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);

      } catch (error) {
        console.error('Failed to initialize backend:', error);
        setBackendStatus('Backend connection failed - please try again');
      }
    }
    setIsLoading(false);
  });
};

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setGlobalPrincipal(null);
    setLoggedIn(false);
    setPrincipal('');
    setBackendStatus('');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/95"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-blue-400/8 rounded-full blur-xl animate-float" style={{animationDelay: '6s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300/25 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 shadow-2xl shadow-blue-500/10">
          
          {/* Premium Logo */}
          <div className="text-center mb-8">
            <div className="group flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                {/* Premium Logo Container */}
                <div className="w-16 h-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 border border-slate-700/50 group-hover:border-blue-400/60 relative overflow-hidden">
                  {/* Premium Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-indigo-600/10 rounded-2xl"></div>
                  
                  {/* Main Logo Design - Letter C */}
                  <div className="relative z-10">
                    {/* Letter C with Premium Styling */}
                    <div className="relative">
                      {/* Main C Shape */}
                      <div className="w-10 h-10 relative">
                        {/* Outer C Ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-slate-900"></div>
                        </div>
                        
                        {/* Inner C Cutout */}
                        <div className="absolute top-1 left-1 w-6 h-8 bg-slate-900 rounded-l-full"></div>
                        
                        {/* Premium Accent Lines */}
                        <div className="absolute top-2 left-2 w-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                        
                        {/* Center Dot */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Blockchain Connection Lines */}
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg animate-pulse border border-white/20"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full shadow-lg animate-pulse border border-white/20" style={{animationDelay: '0.5s'}}></div>
                      
                      {/* Connection Lines */}
                      <div className="absolute -top-0.5 right-1 w-0.5 h-2 bg-gradient-to-b from-cyan-400 to-transparent"></div>
                      <div className="absolute -bottom-0.5 left-1 w-0.5 h-2 bg-gradient-to-t from-blue-400 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Premium Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-cyan-400/15 to-indigo-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Premium Elements */}
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1 -left-1 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '2s'}}></div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  CargoTrace
                </span>
                <span className="text-sm font-semibold tracking-wide text-blue-200">
                  Finance
                </span>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm">
              Secure Cargo Management Platform
            </p>
          </div>

          {/* Status Section */}
          {loggedIn ? (
            <div className="space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Welcome Back! 🎉
                </h2>
                
                <p className="text-slate-300">
                  You're successfully logged in with Internet Identity
                </p>
              </div>
              
              {/* Principal ID Display */}
              <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-4">
                <div className="text-xs text-slate-400 mb-2 font-medium">
                  Your Principal ID:
                </div>
                <code className="text-xs text-blue-300 bg-slate-900/50 px-3 py-2 rounded-lg block break-all font-mono border border-blue-500/20">
                  {principal}
                </code>
              </div>

              {/* Backend Status */}
              {backendStatus && (
                <div className={`p-4 rounded-xl border ${
                  backendStatus.includes('successfully') 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : backendStatus.includes('failed') 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : 'bg-blue-500/10 border-blue-500/30'
                }`}>
                  <div className={`text-sm font-medium ${
                    backendStatus.includes('successfully') 
                      ? 'text-green-400' 
                      : backendStatus.includes('failed') 
                      ? 'text-red-400' 
                      : 'text-blue-400'
                  }`}>
                    {backendStatus}
                  </div>
                </div>
              )}
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full group relative inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:from-red-500 hover:to-red-400 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Logging out...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </div>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Login Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Welcome to CargoTrace
                </h2>
                
                <p className="text-slate-300">
                  Sign in securely with Internet Identity to access your cargo management dashboard
                </p>
              </div>
              
              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full group relative inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5" />
                    <span>Login with Internet Identity</span>
                  </div>
                )}
              </button>
              
              {/* Security Info */}
              <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Lock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">
                    Secure authentication powered by Internet Computer
                  </span>
                </div>
              </div>
              
              {/* Tech Stack */}
              <div className="grid grid-cols-2 gap-3">
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
                      className={`group flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r ${tech.color} rounded-lg text-white text-xs font-medium hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
