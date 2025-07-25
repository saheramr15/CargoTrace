import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
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
  const excludedPages = ['/dashboard', '/login'];
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
        <Route path="/verification" element={<DocumentVerification />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
      
      {shouldShowLayout && <Footer />}
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