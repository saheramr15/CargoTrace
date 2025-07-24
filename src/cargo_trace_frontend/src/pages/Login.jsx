import { useEffect, useState } from 'react';
import { login, logout, checkAuth, getPrincipal } from '../auth';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [principal, setPrincipal] = useState('');

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
    await login();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      background: '#f5f6fa',
      width: '100%',
    }}>
      <div className="card" style={{
        minWidth: '340px',
        textAlign: 'center',
        maxWidth: '400px',
      }}>
        <h1 style={{ marginBottom: '1.5rem' }}>🔐 Internet Identity Login</h1>
        {loggedIn ? (
          <>
            <p style={{ marginBottom: '1.5rem' }}>✅ Logged in as: <code style={{ fontFamily: 'monospace', fontSize: '1rem' }}>{principal}</code></p>
            <button
              onClick={handleLogout}
              className="btn-primary"
              style={{
                width: '100%',
                borderRadius: '8px',
                marginTop: '1rem',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '1.5rem' }}>❌ Not logged in</p>
            <button
              onClick={handleLogin}
              className="btn-primary"
              style={{
                width: '100%',
                borderRadius: '8px',
                marginTop: '1rem',
              }}
            >
              Login with Internet Identity
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
