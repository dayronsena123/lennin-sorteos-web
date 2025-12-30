import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SnowEffect from './components/SnowEffect';

// Pages
import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import WinnersPage from './pages/WinnersPage';
import RegisterPage from './pages/RegisterPage';
import MyTicketsPage from './pages/MyTicketsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setIsAdmin(true);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-primary-900 text-white font-sans selection:bg-secondary-500 selection:text-primary-900 flex flex-col relative">
        <SnowEffect />
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

        <main className="flex-1 relative z-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reglas" element={<RulesPage />} />
            <Route path="/ganadores" element={<WinnersPage />} />
            <Route path="/participar" element={<RegisterPage />} />
            <Route path="/mis-tickets" element={<MyTicketsPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage setIsAdmin={setIsAdmin} />} />
          </Routes>
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
