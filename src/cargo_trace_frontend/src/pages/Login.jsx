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
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1A1442 0%, #2A1B5A 50%, #1A1442 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background:
          'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),' +
          'radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),' +
          'radial-gradient(circle at 40% 40%, rgba(240, 147, 251, 0.1) 0%, transparent 50%)',
        animation: 'float 20s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      
      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '4px',
        height: '4px',
        background: 'rgba(167, 139, 250, 0.6)',
        borderRadius: '50%',
        animation: 'particle1 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '6px',
        height: '6px',
        background: 'rgba(118, 75, 162, 0.6)',
        borderRadius: '50%',
        animation: 'particle2 12s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '20%',
        width: '3px',
        height: '3px',
        background: 'rgba(240, 147, 251, 0.6)',
        borderRadius: '50%',
        animation: 'particle3 10s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Main Login Container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        minWidth: '380px',
        maxWidth: '450px',
        textAlign: 'center',
        color: '#fff',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        animation: 'slideUp 0.8s ease-out'
      }}>
        {/* Logo/Brand */}
        <div style={{
          marginBottom: '2rem',
          animation: 'fadeIn 1s ease-out 0.2s both'
        }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #A78BFA 0%, #D8B4FE 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '0.5rem'
          }}>
            CargoTrace
          </div>
          <div style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: '400'
          }}>
            Secure Cargo Management Platform
          </div>
        </div>

        {/* Status Section */}
        {loggedIn ? (
          <div style={{
            animation: 'fadeIn 0.8s ease-out 0.4s both'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" stroke="white"/>
                </svg>
              </div>
            </div>
            
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Welcome Back! 🎉
            </h2>
            
            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              You're successfully logged in with Internet Identity
            </p>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Your Principal ID:
              </div>
              <code style={{
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: '0.8rem',
                color: '#A78BFA',
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                display: 'block',
                wordBreak: 'break-all',
                border: '1px solid rgba(167, 139, 250, 0.3)'
              }}>
                {principal}
              </code>
            </div>
            
            <button
              onClick={handleLogout}
              disabled={isLoading}
              style={{
                width: '100%',
                borderRadius: '12px',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                color: '#fff',
                fontWeight: '600',
                fontSize: '1rem',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
                opacity: isLoading ? 0.7 : 1,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={e => !isLoading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={e => !isLoading && (e.target.style.transform = 'translateY(0)')}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Logging out...
                </div>
              ) : (
                'Logout'
              )}
            </button>
          </div>
        ) : (
          <div style={{
            animation: 'fadeIn 0.8s ease-out 0.4s both'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 10px 25px rgba(167, 139, 250, 0.3)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </div>
            </div>
            
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Welcome to CargoTrace
            </h2>
            
            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Sign in securely with Internet Identity to access your cargo management dashboard
            </p>
            
            <button
              onClick={handleLogin}
              disabled={isLoading}
              style={{
                width: '100%',
                borderRadius: '12px',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
                color: '#fff',
                fontWeight: '600',
                fontSize: '1rem',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(167, 139, 250, 0.3)',
                opacity: isLoading ? 0.7 : 1,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={e => !isLoading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={e => !isLoading && (e.target.style.transform = 'translateY(0)')}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Connecting...
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                  </svg>
                  Login with Internet Identity
                </div>
              )}
            </button>
            
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.5'
              }}>
                🔒 Secure authentication powered by Internet Computer
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-20px) rotate(1deg) scale(1.02); }
          50% { transform: translateY(10px) rotate(-1deg) scale(0.98); }
          75% { transform: translateY(-5px) rotate(0.5deg) scale(1.01); }
        }
        
        @keyframes particle1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(30px, -30px) scale(1.2); opacity: 1; }
        }
        
        @keyframes particle2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(-40px, 20px) scale(1.3); opacity: 1; }
        }
        
        @keyframes particle3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(20px, -20px) scale(1.1); opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Responsive Design */
        @media (max-width: 480px) {
          div[style*="min-width: 380px"] {
            min-width: 320px !important;
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
