import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, checkAuth, getPrincipal } from '../auth';
import { backendService } from '../services/backendService';
import { Principal } from "@dfinity/principal";
import { cargo_trace_backend as backend } from '../../../declarations/cargo_trace_backend';
import { useAuth } from '../context/AuthContext';

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
    <div className="login-container">
      {/* Animated Background Elements */}
      <div className="login-animated-bg" />
      
      {/* Floating Particles */}
      <div className="login-particle login-particle-1" />
      <div className="login-particle login-particle-2" />
      <div className="login-particle login-particle-3" />

      {/* Main Login Container */}
      <div className="login-main-container">
        {/* Logo/Brand */}
        <div className="login-brand">
          <div className="login-brand-title">
            CargoTrace
          </div>
          <div className="login-brand-subtitle">
            Secure Cargo Management Platform
          </div>
        </div>

        {/* Status Section */}
        {loggedIn ? (
          <div className="login-status-section">
            <div className="login-status-icon-container">
              <div className="login-status-icon success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" stroke="white"/>
                </svg>
              </div>
            </div>
            
            <h2 className="login-title">
              Welcome Back! 🎉
            </h2>
            
            <p className="login-description">
              You're successfully logged in with Internet Identity
            </p>
            
            <div className="login-principal-container">
              <div className="login-principal-label">
                Your Principal ID:
              </div>
              <code className="login-principal-code">
                {principal}
              </code>
            </div>

            {backendStatus && (
              <div className="login-backend-status">
                <div className={`login-backend-status-text ${backendStatus.includes('successfully') ? 'success' : backendStatus.includes('failed') ? 'error' : 'info'}`}>
                  {backendStatus}
                </div>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="login-button danger"
            >
              {isLoading ? (
                <div className="login-button-content">
                  <div className="login-spinner" />
                  Logging out...
                </div>
              ) : (
                'Logout'
              )}
            </button>
          </div>
        ) : (
          <div className="login-status-section">
            <div className="login-status-icon-container">
              <div className="login-status-icon default">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </div>
            </div>
            
            <h2 className="login-title">
              Welcome to CargoTrace
            </h2>
            
            <p className="login-description">
              Sign in securely with Internet Identity to access your cargo management dashboard
            </p>
            
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="login-button primary"
            >
              {isLoading ? (
                <div className="login-button-content">
                  <div className="login-spinner" />
                  Connecting...
                </div>
              ) : (
                <div className="login-button-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                  </svg>
                  Login with Internet Identity
                </div>
              )}
            </button>
            
            <div className="login-info-box">
              <div className="login-info-text">
                🔒 Secure authentication powered by Internet Computer
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
