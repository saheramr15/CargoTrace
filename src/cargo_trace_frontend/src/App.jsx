import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomToggle from './components/layout/BottomToggle';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import DocumentVerification from './pages/DocumentVerification';
import Login from './pages/Login';

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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="app">
      {shouldShowLayout && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/verification" element={<DocumentVerification />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
      {shouldShowLayout && <Footer />}
      
      {/* Bottom Toggle Buttons - Always visible except on login/home */}
      <BottomToggle />
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