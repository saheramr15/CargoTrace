import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NewNavbar from './components/layout/NewNavbar';
import NewFooter from './components/layout/NewFooter';
import NewLanding from './pages/NewLanding';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';
import backendService from './services/backendService';
// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  
  // Pages that should NOT show navbar and footer
  const excludedPages = ['/dashboard', '/admin', '/login'];
  const shouldShowLayout = !excludedPages.includes(location.pathname);

  // Force cache refresh on component mount
  useEffect(() => {
    // Clear any cached data
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    setIsVisible(true);
  }, []);
useEffect(() => {
  backendService.tryRestore(); // 🔄 restore after refresh
}, []);
  // Debug logging
  useEffect(() => {
    console.log('Current pathname:', location.pathname);
    console.log('Should show layout:', shouldShowLayout);
    console.log('Excluded pages:', excludedPages);
  }, [location.pathname, shouldShowLayout]);

  return (
    <div className="app">
      {shouldShowLayout && <NewNavbar />}
      
      <Routes>
        <Route path="/" element={<NewLanding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
      {shouldShowLayout && <NewFooter />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;