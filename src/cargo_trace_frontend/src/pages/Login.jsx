import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, checkAuth, getPrincipal } from '../auth';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [principal, setPrincipal] = useState('');
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
    await login(async () => {
      // After login, check if authenticated and navigate to dashboard
      const authenticated = await checkAuth();
      if (authenticated) {
        navigate('/dashboard');
      }
    });
  };

  const handleLogout = async () => {
    await logout();
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
    }}>
      {/* Animated radial overlays like .hero::before */}
      <div style={{
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background:
          'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),' +
          'radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.3) 0%, transparent 50%),' +
          'radial-gradient(circle at 40% 40%, rgba(240, 147, 251, 0.2) 0%, transparent 50%)',
        animation: 'float 20s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '18px',
        padding: '2.5rem 2rem',
        minWidth: '340px',
        maxWidth: '400px',
        textAlign: 'center',
        color: '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}>
        <h1 style={{ marginBottom: '1.5rem', color: '#fff' }}>🔐 Internet Identity Login</h1>
        {loggedIn ? (
          <>
            <p style={{ marginBottom: '1.5rem', color: '#fff' }}>✅ Logged in as: <code style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{principal}</code></p>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                borderRadius: '8px',
                marginTop: '1rem',
                padding: '0.75rem 2rem',
                background: '#f44336',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '1.5rem', color: '#fff' }}>❌ Not logged in</p>
            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                borderRadius: '8px',
                marginTop: '1rem',
                padding: '0.75rem 2rem',
                background: '#1976d2',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Login with Internet Identity
            </button>
          </>
        )}
      </div>
      {/* Keyframes for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-30px) rotate(1deg) scale(1.05); }
          50% { transform: translateY(15px) rotate(-1deg) scale(0.95); }
          75% { transform: translateY(-10px) rotate(0.5deg) scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default Login;
