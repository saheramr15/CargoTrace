import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, checkAuth, getPrincipal } from '../auth';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [principal, setPrincipal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const authenticated = await checkAuth();
      setLoggedIn(authenticated);
      if (authenticated) {
        const userPrincipal = await getPrincipal();
        setPrincipal(userPrincipal);
      }
    };
    init();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    await login(async () => {
      const authenticated = await checkAuth();
      if (authenticated) {
        navigate('/dashboard');
      }
      setIsLoading(false);
    });
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setLoggedIn(false);
    setPrincipal('');
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
