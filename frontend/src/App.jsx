import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Upload, Check, X, Search, Download, Eye, LogOut, Home, Users, Ticket, AlertCircle, CheckCircle, Clock, Facebook, Instagram, Menu, Phone, Gift, Star, FileText, Laptop, Smartphone, MessageCircle } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Configuration for Deployment
let API_URL = import.meta.env.VITE_API_URL;

// Fallback inteligente: Si no hay variable de entorno
if (!API_URL) {
  // Si estamos en localhost, usar servidor local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_URL = 'http://localhost:5000/api';
  } else {
    // Para CUALQUIER otro dominio (vercel.app, lenninsorteos.com, etc.), usar producción
    API_URL = 'https://lennin-backend.onrender.com/api';
  }
} else {
  // Asegurar que termine en /api si el usuario olvidó ponerlo
  if (!API_URL.endsWith('/api')) {
    API_URL += '/api';
  }
}

const BASE_URL = API_URL.replace('/api', '');

// ... (rest of imports and components)

// Inside AdminPage component:

const exportPDF = () => {
  try {
    const doc = new jsPDF();
    doc.text("Reporte de Sorteo - Lennin Sorteos", 14, 16);
    autoTable(doc, {
      head: [['Ticket', 'Nombre', 'DNI', 'Monto', 'Estado']],
      body: tickets.map(t => [t.ticket_id, t.nombre, t.dni, t.monto_detectado || '-', t.estado]),
      startY: 20,
    });
    doc.save(`reporte_sorteo_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error("PDF Export Error:", error);
    alert("Error al generar PDF. Asegúrate de que los datos estén cargados.");
  }
};

// --- Icons ---

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.394 6.394 0 0 0-5.394 9.365 6.394 6.394 0 0 0 10.964-2.413v-8.25a8.32 8.32 0 0 0 3.663 1.41V6.686z" />
  </svg>
);

// --- Components ---

function SnowEffect() {
  // Generate snowflakes
  const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.5 + 0.3,
    size: Math.random() * 10 + 5 + 'px'
  }));

  return (
    <div className="snow-container">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            opacity: flake.opacity,
            fontSize: flake.size
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}

function Header({ isAdmin, setIsAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminToken');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path ? "text-secondary-400 border-b-2 border-secondary-400" : "text-primary-200 hover:text-secondary-400";

  return (
    <header className="bg-primary-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/lenninsorteoslogo.jpg" alt="Logo" className="h-12 w-12 rounded-full object-cover shadow-lg border-2 border-secondary-500" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white leading-none tracking-wide">LENNIN <span className="text-secondary-400">SORTEOS</span></h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-bold transition uppercase tracking-wider py-1 ${isActive('/')}`}>Inicio</Link>
            <Link to="/reglas" className={`text-sm font-bold transition uppercase tracking-wider py-1 ${isActive('/reglas')}`}>Reglas</Link>
            <Link to="/participar" className={`text-sm font-bold transition uppercase tracking-wider py-1 ${isActive('/participar')}`}>Participar</Link>
            <Link to="/mis-tickets" className={`text-sm font-bold transition uppercase tracking-wider py-1 ${isActive('/mis-tickets')}`}>Mis Tickets</Link>
            <Link to="/ganadores" className={`text-sm font-bold transition uppercase tracking-wider py-1 ${isActive('/ganadores')}`}>Ganadores</Link>
            <Link to="/contacto" className={`text-sm font-bold transition uppercase tracking-wider py-1 ${isActive('/contacto')}`}>Contacto</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-2">
              <a href="https://www.facebook.com/share/1Ca6WoigVf/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition shadow-lg shadow-blue-600/20"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/lenninbenito?igsh=ZjYxMTY5aXg5Znhw" target="_blank" rel="noopener noreferrer" className="p-2 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 rounded-full text-white hover:opacity-90 transition shadow-lg"><Instagram size={18} /></a>
              <a href="https://www.tiktok.com/@lenninbeno?_r=1&_t=ZS-91XnYAseb2N" target="_blank" rel="noopener noreferrer" className="p-2 bg-black rounded-full text-white hover:opacity-80 transition shadow-lg border border-gray-800"><TikTokIcon size={18} /></a>
            </div>
            {isAdmin ? (
              <button onClick={handleLogout} className="px-5 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-500 transition shadow-lg">SALIR</button>
            ) : (
              <Link to="/admin" className="px-5 py-2 rounded-full bg-secondary-500 text-primary-900 font-bold hover:bg-secondary-400 transition shadow-lg shadow-secondary-500/20">ADMIN</Link>
            )}
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-900 border-t border-primary-700 p-4 space-y-4">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-bold py-2 ${location.pathname === '/' ? 'text-secondary-400' : 'text-white'}`}>INICIO</Link>
          <Link to="/reglas" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-bold py-2 ${location.pathname === '/reglas' ? 'text-secondary-400' : 'text-primary-200'}`}>REGLAS</Link>
          <Link to="/participar" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-bold py-2 ${location.pathname === '/participar' ? 'text-secondary-400' : 'text-primary-200'}`}>PARTICIPAR</Link>
          <Link to="/mis-tickets" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-bold py-2 ${location.pathname === '/mis-tickets' ? 'text-secondary-400' : 'text-primary-200'}`}>MIS TICKETS</Link>
          <Link to="/ganadores" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-bold py-2 ${location.pathname === '/ganadores' ? 'text-secondary-400' : 'text-primary-200'}`}>GANADORES</Link>
          <Link to="/contacto" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left font-bold py-2 ${location.pathname === '/contacto' ? 'text-secondary-400' : 'text-primary-200'}`}>CONTACTO</Link>
          {isAdmin ? (
            <button onClick={handleLogout} className="w-full py-3 rounded-lg bg-red-600 text-white font-bold">CERRAR SESIÓN</button>
          ) : (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full block text-center py-3 rounded-lg bg-secondary-500 text-primary-900 font-bold">ACCESO ADMIN</Link>
          )}
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-primary-900 border-t border-primary-800 py-12 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <img src="/lenninsorteoslogo.jpg" alt="Logo" className="h-16 w-16 rounded-full mx-auto mb-6 border-2 border-secondary-500 opacity-80 grayscale hover:grayscale-0 transition duration-500" />
        <h2 className="text-2xl font-bold text-white mb-8 tracking-widest">LENNIN SORTEOS</h2>
        <div className="flex justify-center gap-8 mb-8">
          <a href="https://www.facebook.com/share/1Ca6WoigVf/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-secondary-400 transition transform hover:scale-110"><Facebook size={28} /></a>
          <a href="https://www.instagram.com/lenninbenito?igsh=ZjYxMTY5aXg5Znhw" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-secondary-400 transition transform hover:scale-110"><Instagram size={28} /></a>
          <a href="https://www.tiktok.com/@lenninbeno?_r=1&_t=ZS-91XnYAseb2N" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-secondary-400 transition transform hover:scale-110"><TikTokIcon size={28} /></a>
        </div>
        <p className="text-primary-500 text-sm mb-2">© 2025 Lennin Sorteos. Todos los derechos reservados.</p>
        <p className="text-primary-600 text-xs font-medium">Created by Dayron</p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/51942987989"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full shadow-2xl hover:bg-green-600 transition transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center overflow-hidden"
      title="Contáctanos por WhatsApp"
    >
      <img src="/Logowhatsaap.png" alt="WhatsApp" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"; }} />
    </a>
  );
}

function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const sorteoDate = new Date('2025-12-24T00:00:00-05:00'); // 24 de diciembre 12:00 AM Perú (Nochebuena)
      const now = new Date();
      const difference = sorteoDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Hero Section with Video Banner */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-primary-900 py-20 min-h-[600px]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/banner.mp4" type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/50 to-primary-900"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-accent-600/20 border border-accent-500/50 text-accent-400 font-bold tracking-wider text-sm animate-pulse">
            ¡GRAN SORTEO 2025!
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl">
            GANA <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-yellow-200">3 LAPTOPS</span>,<br />
            1 CELULAR <span className="text-secondary-400">INFINIX G30 PRO</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-200 mb-4 max-w-2xl mx-auto">
            Fecha del Sorteo: <span className="text-white font-bold">24 de Diciembre</span>
          </p>
          <p className="text-lg text-primary-300 mb-10">
            Transmisión en vivo vía Facebook
          </p>

          {/* CONTADOR REGRESIVO */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-gradient-to-br from-primary-700/80 to-primary-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-secondary-500/30 shadow-2xl shadow-secondary-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-400 via-yellow-400 to-secondary-400 animate-pulse"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-wide relative z-10">
                ⏰ TIEMPO RESTANTE PARA EL SORTEO
              </h3>

              <div className="grid grid-cols-4 gap-3 md:gap-6 relative z-10">
                {[
                  { label: 'DÍAS', value: timeLeft.days },
                  { label: 'HORAS', value: timeLeft.hours },
                  { label: 'MINUTOS', value: timeLeft.minutes },
                  { label: 'SEGUNDOS', value: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="bg-primary-900/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 w-full border border-primary-600 shadow-lg hover:border-secondary-500/50 transition group">
                      <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-secondary-400 to-yellow-300 group-hover:scale-110 transition duration-300">
                        {String(item.value).padStart(2, '0')}
                      </div>
                    </div>
                    <p className="text-xs md:text-sm font-bold text-primary-300 mt-2 uppercase tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/participar" className="px-10 py-4 bg-secondary-500 text-primary-900 rounded-full font-black text-xl shadow-xl shadow-secondary-500/30 hover:scale-105 hover:bg-secondary-400 transition duration-300 flex items-center justify-center gap-2">
              <Ticket size={24} /> COMPRAR TICKET (S/ 10)
            </Link>
            <Link to="/reglas" className="px-10 py-4 bg-primary-700/50 backdrop-blur-sm text-white border border-primary-500 rounded-full font-bold text-xl hover:bg-primary-700 transition duration-300">
              VER REGLAS
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-secondary-500 py-4 overflow-hidden">
        <div className="flex gap-12 text-primary-900 font-black text-lg uppercase tracking-widest whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          <span>★ 3 Laptops</span>
          <span>★ 1 Infinix G30 Pro</span>
          <span>★ Sorteo 24 Dic</span>
          <span>★ En Vivo Facebook</span>
          <span>★ 3 Laptops</span>
          <span>★ 1 Infinix G30 Pro</span>
          <span>★ Sorteo 24 Dic</span>
          <span>★ En Vivo Facebook</span>
          <span>★ 3 Laptops</span>
          <span>★ 1 Infinix G30 Pro</span>
          <span>★ Sorteo 24 Dic</span>
          <span>★ En Vivo Facebook</span>
        </div>
      </div>

      {/* Prizes Section */}
      <div className="py-20 bg-primary-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Nuestros Premios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Laptop Card */}
            <div className="bg-primary-700 rounded-3xl p-8 border border-primary-600 hover:border-secondary-500 transition group text-center">
              <div className="w-full h-64 bg-primary-900/50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary-500/5 group-hover:bg-secondary-500/10 transition z-10"></div>
                <img src="/Laptop.jpg" alt="Laptop" className="w-full h-full object-cover drop-shadow-2xl group-hover:scale-110 transition duration-500" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=Laptop+Image"; }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">3 Laptops Modernas</h3>
              <p className="text-primary-300">Potencia y rendimiento para tus estudios o trabajo.</p>
            </div>

            {/* Phone Card */}
            <div className="bg-primary-700 rounded-3xl p-8 border border-primary-600 hover:border-secondary-500 transition group text-center">
              <div className="w-full h-64 bg-primary-900/50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary-500/5 group-hover:bg-secondary-500/10 transition z-10"></div>
                <img src="/Celular.jpg" alt="Celular" className="w-full h-full object-cover drop-shadow-2xl group-hover:scale-110 transition duration-500" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=Celular+Image"; }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Infinix G30 Pro</h3>
              <p className="text-primary-300">Tecnología de punta, cámara increíble y diseño elegante.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Reglas del Sorteo</h2>
      <div className="bg-primary-800 p-8 rounded-3xl shadow-xl border border-primary-600 space-y-6 text-primary-200">
        <p>1. El costo del ticket es de <strong>S/ 10.00</strong>.</p>
        <p>2. El sorteo se realizará el día <strong>24 de Diciembre</strong> en transmisión en vivo.</p>
        <p>3. Los premios son: 3 Laptops y 1 Celular Infinix G30 Pro.</p>
        <p>4. Para participar debes registrar tu ticket con tus datos correctos.</p>
        <p>5. Conserva tu comprobante físico o digital para reclamar el premio.</p>
      </div>
    </div>
  );
}

function WinnersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="bg-primary-800 p-12 rounded-3xl shadow-2xl border border-primary-600">
        <div className="inline-block p-4 bg-primary-700 rounded-full mb-6">
          <Gift size={48} className="text-secondary-400" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Ganadores del Sorteo</h2>
        <p className="text-xl text-primary-200 mb-8">
          El sorteo se realizará el <span className="text-secondary-400 font-bold">24 de Diciembre de 2025</span>.
        </p>
        <div className="p-6 bg-primary-900/50 rounded-xl border border-primary-700 max-w-md mx-auto">
          <p className="text-primary-400 font-medium">Lista de ganadores pendiente...</p>
        </div>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [formData, setFormData] = useState({ nombre: '', apellidos: '', dni: '', whatsapp: '', region: '', aceptaTerminos: false });
  const [comprobante, setComprobante] = useState(null);
  const [comprobantePreview, setComprobantePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);

  const regiones = ['Amazonas', 'Ancash', 'Apurimac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huanuco', 'Ica', 'Junin', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martin', 'Tacna', 'Tumbes', 'Ucayali'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return alert('Solo JPG/PNG/WEBP');
    if (file.size > 5 * 1024 * 1024) return alert('Max 5MB');
    setComprobante(file);
    const reader = new FileReader();
    reader.onloadend = () => setComprobantePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.apellidos || !formData.dni || !formData.whatsapp || !formData.region || !comprobante || !formData.aceptaTerminos) return alert('Completa todos los campos');
    if (!/^[0-9]{8}$/.test(formData.dni)) return alert('DNI inválido');
    if (!/^[0-9]{9}$/.test(formData.whatsapp)) return alert('WhatsApp inválido');

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('nombre', formData.nombre);
      fd.append('apellidos', formData.apellidos);
      fd.append('dni', formData.dni);
      fd.append('whatsapp', formData.whatsapp);
      fd.append('region', formData.region);
      fd.append('comprobante', comprobante);
      const res = await axios.post(`${API_URL}/tickets`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setShowModal(res.data);
      setFormData({ nombre: '', apellidos: '', dni: '', whatsapp: '', region: '', aceptaTerminos: false });
      setComprobante(null); setComprobantePreview(null);
    } catch (err) {
      alert('Error al enviar: ' + (err.response?.data?.error || err.message));
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-[95%] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Columna Izquierda: Cómo Participar */}
        <div className="hidden lg:block sticky top-24">
          <div className="bg-primary-800 p-4 rounded-3xl border border-primary-600 shadow-xl transform hover:scale-105 transition duration-500">
            <img src="/como-participar.png" alt="Cómo participar" className="w-full rounded-2xl shadow-lg" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x600?text=Instrucciones"; }} />
          </div>
        </div>

        {/* Columna Central: Formulario */}
        <div className="bg-primary-700 p-8 rounded-3xl shadow-2xl border border-primary-600 relative z-10">
          <div className="absolute -top-6 -right-6 bg-accent-500 text-white w-20 h-20 rounded-full flex items-center justify-center font-black text-xl shadow-lg transform rotate-12 z-20">
            S/ 10
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Registra tu Ticket</h2>
          <p className="text-primary-300 mb-8 text-center">Completa tus datos para participar</p>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-primary-300 mb-2 uppercase tracking-wide">Nombres</label>
                <input name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-primary-800 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none transition placeholder-primary-500" placeholder="Ej. Juan" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-300 mb-2 uppercase tracking-wide">Apellidos</label>
                <input name="apellidos" value={formData.apellidos} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-primary-800 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none transition placeholder-primary-500" placeholder="Ej. Pérez" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-primary-300 mb-2 uppercase tracking-wide">DNI</label>
                <input name="dni" maxLength={8} value={formData.dni} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-primary-800 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none transition placeholder-primary-500" placeholder="8 dígitos" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary-300 mb-2 uppercase tracking-wide">WhatsApp</label>
                <input name="whatsapp" maxLength={9} value={formData.whatsapp} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-primary-800 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none transition placeholder-primary-500" placeholder="9 dígitos" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-primary-300 mb-2 uppercase tracking-wide">Región</label>
              <select name="region" value={formData.region} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-primary-800 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none transition">
                <option value="" className="bg-primary-800">Selecciona tu región</option>
                {regiones.map(r => <option key={r} value={r} className="bg-primary-800">{r}</option>)}
              </select>
            </div>

            <div className="border-2 border-dashed border-primary-500 rounded-2xl p-8 text-center hover:border-secondary-500 hover:bg-primary-600/50 transition cursor-pointer group" onClick={() => document.getElementById('file').click()}>
              <input id="file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              {comprobantePreview ? (
                <img src={comprobantePreview} alt="preview" className="max-h-48 mx-auto rounded-lg shadow-lg" />
              ) : (
                <div className="text-primary-400 group-hover:text-secondary-400 transition">
                  <Upload className="mx-auto mb-3" size={40} />
                  <p className="font-medium">Clic para subir foto del comprobante</p>
                  <p className="text-xs mt-2 opacity-70">JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary-800/50 rounded-xl">
              <input type="checkbox" id="terms" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={handleInputChange} className="w-5 h-5 text-secondary-500 rounded focus:ring-secondary-500 bg-primary-700 border-primary-500" />
              <label htmlFor="terms" className="text-sm text-primary-200">Acepto los términos y condiciones del sorteo</label>
            </div>

            <button onClick={handleSubmit} disabled={loading} className="w-full py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-primary-900 rounded-xl font-black text-lg shadow-lg hover:shadow-xl hover:opacity-90 transition disabled:opacity-50 transform hover:-translate-y-1">
              {loading ? 'ENVIANDO...' : 'ENVIAR REGISTRO'}
            </button>
          </div>
        </div>

        {/* Columna Derecha: QR Yape */}
        <div className="hidden lg:flex flex-col items-center sticky top-24 gap-4">
          <div className="bg-white p-4 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500 relative">
            <img src="/qr-yape.png" alt="QR Yape" className="w-full max-w-xs rounded-xl" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x400?text=QR+Yape"; }} />
          </div>
          {/* Hombre señalando */}
          <div className="relative w-full max-w-xs h-64">
            <img src="/ticket-man.png" alt="Participa" className="absolute -top-10 -left-10 w-48 animate-bounce-slow drop-shadow-2xl" onError={(e) => { e.target.onerror = null; }} />
          </div>
        </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowModal(null)}>
          <div className="bg-primary-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-primary-600 relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">¡Registro Exitoso!</h3>
            <p className="text-primary-300 mb-8">Tu ticket ha sido registrado correctamente.</p>
            <div className="bg-primary-900 p-6 rounded-2xl mb-8 border border-primary-700">
              <p className="text-xs text-primary-400 uppercase tracking-widest mb-2">Tu código de ticket</p>
              <p className="text-3xl font-mono font-bold text-secondary-400 tracking-wider">{showModal.ticket_id}</p>
            </div>
            <button onClick={() => setShowModal(null)} className="w-full py-3 bg-white text-primary-900 rounded-xl font-bold hover:bg-gray-100 transition">ENTENDIDO</button>
          </div>
        </div>
      )}
    </div>
  );
}

function MyTicketsPage() {
  const [userSearchDNI, setUserSearchDNI] = useState('');
  const [userTickets, setUserTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const searchUserTickets = async () => {
    if (!/^[0-9]{8}$/.test(userSearchDNI)) return alert('DNI inválido');
    try {
      const res = await axios.get(`${API_URL}/tickets/search/${userSearchDNI}`);
      setUserTickets(res.data);
    } catch (e) { setUserTickets([]); }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-primary-700 p-8 rounded-3xl shadow-2xl border border-primary-600">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-600 rounded-xl text-white">
            <Search size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">Mis Tickets</h2>
        </div>

        <div className="bg-primary-800 p-6 rounded-2xl mb-6 border border-primary-600">
          <p className="text-primary-300 mb-4">Ingresa tu DNI para ver el estado de tus tickets.</p>
          <div className="flex gap-2">
            <input value={userSearchDNI} onChange={e => setUserSearchDNI(e.target.value)} placeholder="DNI" maxLength={8} className="flex-1 px-4 py-3 rounded-xl bg-primary-900 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none" />
            <button onClick={searchUserTickets} className="px-6 py-3 bg-secondary-500 text-primary-900 rounded-xl font-bold hover:bg-secondary-400 transition">BUSCAR</button>
          </div>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {userTickets.length === 0 ? (
            <div className="text-center text-primary-500 py-8">
              <Ticket size={48} className="mx-auto mb-2 opacity-20" />
              <p>No hay tickets para mostrar</p>
            </div>
          ) : userTickets.map(t => (
            <div key={t.ticket_id} className="bg-primary-800 border border-primary-600 p-4 rounded-xl flex justify-between items-center group hover:border-secondary-500/50 transition">
              <div>
                <p className="font-bold text-white group-hover:text-secondary-400 transition">{t.ticket_id}</p>
                <p className="text-sm text-primary-400">{t.nombre}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-1
                  ${t.estado === 'aprobado' ? 'bg-green-900 text-green-400' :
                    t.estado === 'rechazado' ? 'bg-red-900 text-red-400' :
                      'bg-yellow-900 text-yellow-400'}`}>
                  {t.estado.toUpperCase()}
                </span>
                <button onClick={() => setSelectedTicket(t)} className="block text-xs text-primary-300 hover:text-white underline">Ver detalle</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedTicket(null)}>
          <div className="bg-primary-800 p-6 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-primary-600" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Detalle del Ticket</h3>
              <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-primary-700 rounded-full transition text-primary-400"><X size={24} /></button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div><p className="text-primary-400 mb-1">Participante</p><p className="font-medium text-white text-lg">{selectedTicket.nombre}</p></div>
                <div><p className="text-primary-400 mb-1">DNI</p><p className="font-medium text-white text-lg">{selectedTicket.dni}</p></div>
                <div><p className="text-primary-400 mb-1">Estado</p><p className="font-medium text-white text-lg">{selectedTicket.estado}</p></div>
                <div><p className="text-primary-400 mb-1">Fecha</p><p className="font-medium text-white text-lg">{new Date(selectedTicket.fecha_registro).toLocaleString()}</p></div>
              </div>
              <div className="border-2 border-primary-600 rounded-2xl overflow-hidden bg-black/50">
                <img src={`${BASE_URL}${selectedTicket.comprobante_url}`} alt="comprobante" className="w-full object-contain max-h-[500px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 rounded-3xl shadow-2xl border border-primary-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-500/10 rounded-full blur-2xl"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary-500 rounded-2xl transform rotate-6 opacity-20"></div>
              <img
                src="/lennin.jpg"
                alt="Lennin Benito"
                className="relative rounded-2xl shadow-xl w-full object-cover aspect-square border-2 border-primary-400"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Lennin+Benito&size=500&background=0ea5e9&color=fff"; }}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <div className="inline-block px-3 py-1 bg-primary-900/50 rounded-full text-xs font-bold text-secondary-400 mb-2">ORGANIZADOR</div>
            <h2 className="text-3xl font-bold text-white">Lennin Benito Terrones</h2>
            <p className="text-primary-200 leading-relaxed">
              "Mi compromiso es la transparencia. Cada sorteo es una oportunidad para agradecer su confianza. ¡Mucha suerte a todos!"
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="flex items-center gap-2 text-white hover:text-secondary-400 transition font-medium"><Phone size={18} /> 942 987 989</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminPage({ setIsAdmin }) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [view, setView] = useState('dashboard');
  const [tickets, setTickets] = useState([]);
  const [searchDNI, setSearchDNI] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await axios.get(`${API_URL}/tickets`);
      setTickets(res.data);
    } catch (e) { console.error(e); }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/admin/login`, {
        email: loginData.email.trim(),
        password: loginData.password.trim()
      });
      if (res.data.success) {
        setIsAdmin(true);
        localStorage.setItem('adminToken', res.data.token);
      }
    } catch (e) {
      console.error(e);
      alert('Error: ' + (e.response?.data?.error || e.message));
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      if (newStatus === 'rechazado') {
        // Si se rechaza, eliminar el ticket de la base de datos
        if (confirm('¿Estás seguro de rechazar este ticket? Se eliminará permanentemente de la base de datos.')) {
          await axios.delete(`${API_URL}/tickets/${ticketId}`);
          await loadTickets();
          alert('Ticket rechazado y eliminado');
        }
      } else {
        // Si se aprueba o pone en revisión, solo actualizar el estado
        await axios.put(`${API_URL}/tickets/${ticketId}/status`, { estado: newStatus });
        await loadTickets();
        alert('Estado actualizado');
      }
    } catch (e) {
      alert('Error al actualizar: ' + (e.response?.data?.error || e.message));
    }
  };

  const exportCSV = () => {
    const headers = ['Ticket', 'Nombre', 'Apellidos', 'DNI', 'WhatsApp', 'Region', 'Monto', 'Estado', 'Fecha'];
    const rows = tickets.map(t => [
      `"${t.ticket_id}"`,
      `"${t.nombre}"`,
      `"${t.apellidos || ''}"`,
      `"${t.dni}"`,
      `"${t.whatsapp}"`,
      `"${t.region}"`,
      `"${t.monto_detectado || 'N/A'}"`,
      `"${t.estado}"`,
      `"${new Date(t.fecha_registro).toLocaleString('es-PE')}"`
    ]);
    // Use semicolon for Excel in Spanish regions
    const csvContent = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sorteo_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Reporte de Sorteo - Lennin Sorteos", 14, 16);
      autoTable(doc, {
        head: [['Ticket', 'Nombre', 'Apellidos', 'DNI', 'Monto', 'Estado']],
        body: tickets.map(t => [t.ticket_id, t.nombre, t.apellidos || '', t.dni, t.monto_detectado || '-', t.estado]),
        startY: 20,
      });
      doc.save(`reporte_sorteo_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Error al generar PDF. Asegúrate de que los datos estén cargados.");
    }
  };

  const filteredTickets = searchDNI ? tickets.filter(t => t.dni.includes(searchDNI)) : tickets;
  const stats = { total: tickets.length, aprobados: tickets.filter(t => t.estado === 'aprobado').length, rechazados: tickets.filter(t => t.estado === 'rechazado').length, revision: tickets.filter(t => t.estado === 'revision').length };

  // If not authenticated, show login
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-primary-900">
        <div className="bg-primary-700 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-primary-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-secondary-500"></div>
          <h2 className="text-2xl font-bold text-center text-white mb-6">Acceso Administrativo</h2>
          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-lg bg-primary-800 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
              placeholder="Correo electrónico"
              value={loginData.email}
              onChange={e => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              className="w-full px-4 py-3 rounded-lg bg-primary-800 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none transition"
              placeholder="Contraseña"
              type="password"
              value={loginData.password}
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button onClick={handleLogin} className="w-full py-3 bg-secondary-500 text-primary-900 rounded-lg font-bold hover:bg-secondary-400 transition shadow-lg shadow-secondary-500/20">
              INGRESAR
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Panel Administrativo</h2>
          <p className="text-primary-200">Gestiona los participantes y sorteos</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setView('dashboard')} className={`px-4 py-2 rounded-lg font-medium transition ${view === 'dashboard' ? 'bg-secondary-500 text-primary-900' : 'bg-primary-700 text-white hover:bg-primary-600'}`}>Dashboard</button>
          <button onClick={() => setView('participants')} className={`px-4 py-2 rounded-lg font-medium transition ${view === 'participants' ? 'bg-secondary-500 text-primary-900' : 'bg-primary-700 text-white hover:bg-primary-600'}`}>Participantes</button>
        </div>
      </div>

      {view === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-primary-700 p-6 rounded-xl shadow-lg border border-primary-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary-200 font-medium">Total Tickets</h3>
                <Ticket className="text-secondary-400" size={24} />
              </div>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="bg-primary-700 p-6 rounded-xl shadow-lg border border-primary-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary-200 font-medium">Aprobados</h3>
                <CheckCircle className="text-green-400" size={24} />
              </div>
              <p className="text-3xl font-bold text-white">{stats.aprobados}</p>
            </div>
            <div className="bg-primary-700 p-6 rounded-xl shadow-lg border border-primary-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary-200 font-medium">Rechazados</h3>
                <X className="text-red-400" size={24} />
              </div>
              <p className="text-3xl font-bold text-white">{stats.rechazados}</p>
            </div>
            <div className="bg-primary-700 p-6 rounded-xl shadow-lg border border-primary-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary-200 font-medium">En Revisión</h3>
                <Clock className="text-yellow-400" size={24} />
              </div>
              <p className="text-3xl font-bold text-white">{stats.revision}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={exportCSV} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg shadow-green-900/50 font-bold">
              <Download size={20} /> Descargar Excel/CSV
            </button>
            <button onClick={exportPDF} className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-900/50 font-bold">
              <FileText size={20} /> Descargar PDF
            </button>
          </div>
        </div>
      )}

      {view === 'participants' && (
        <div className="bg-primary-700 rounded-xl shadow-lg border border-primary-600 overflow-hidden">
          <div className="p-4 border-b border-primary-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" size={20} />
              <input
                className="w-full pl-10 pr-4 py-2 bg-primary-800 border border-primary-600 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none transition text-white placeholder-primary-400"
                placeholder="Buscar por DNI..."
                value={searchDNI}
                onChange={e => setSearchDNI(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-primary-100">
              <thead className="bg-primary-800 text-primary-300 font-medium uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Ticket</th>
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3">Apellidos</th>
                  <th className="px-6 py-3">DNI</th>
                  <th className="px-6 py-3">Región</th>
                  <th className="px-6 py-3">Monto</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-600">
                {filteredTickets.map(t => (
                  <tr key={t.ticket_id} className="hover:bg-primary-600/50 transition">
                    <td className="px-6 py-4 font-medium text-white">{t.ticket_id}</td>
                    <td className="px-6 py-4">{t.nombre}</td>
                    <td className="px-6 py-4">{t.apellidos || '-'}</td>
                    <td className="px-6 py-4">{t.dni}</td>
                    <td className="px-6 py-4">{t.region}</td>
                    <td className="px-6 py-4 font-mono">{t.monto_detectado || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                              ${t.estado === 'aprobado' ? 'bg-green-900/50 text-green-400 border border-green-800' :
                          t.estado === 'rechazado' ? 'bg-red-900/50 text-red-400 border border-red-800' :
                            'bg-yellow-900/50 text-yellow-400 border border-yellow-800'}`}>
                        {t.estado.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => setSelectedTicket(t)} className="text-primary-400 hover:text-secondary-400"><Eye size={18} /></button>
                      <button onClick={() => updateTicketStatus(t.ticket_id, 'aprobado')} className="text-primary-400 hover:text-green-400"><Check size={18} /></button>
                      <button onClick={() => updateTicketStatus(t.ticket_id, 'rechazado')} className="text-primary-400 hover:text-red-400"><X size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedTicket(null)}>
          <div className="bg-primary-800 p-6 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-primary-600" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Detalle del Ticket</h3>
              <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-primary-700 rounded-full transition text-primary-400"><X size={24} /></button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div><p className="text-primary-400 mb-1">Participante</p><p className="font-medium text-white text-lg">{selectedTicket.nombre} {selectedTicket.apellidos}</p></div>
                <div><p className="text-primary-400 mb-1">DNI</p><p className="font-medium text-white text-lg">{selectedTicket.dni}</p></div>
                <div><p className="text-primary-400 mb-1">Estado</p><p className="font-medium text-white text-lg">{selectedTicket.estado}</p></div>
                <div><p className="text-primary-400 mb-1">Fecha</p><p className="font-medium text-white text-lg">{new Date(selectedTicket.fecha_registro).toLocaleString()}</p></div>
              </div>
              <div className="border-2 border-primary-600 rounded-2xl overflow-hidden bg-black/50">
                <img src={`${BASE_URL}${selectedTicket.comprobante_url}`} alt="comprobante" className="w-full object-contain max-h-[500px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));

  return (
    <Router>
      <div className="min-h-screen bg-primary-800 text-white font-sans selection:bg-secondary-500 selection:text-primary-900 flex flex-col relative">
        <SnowEffect />
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <main className="flex-1 relative z-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reglas" element={<RulesPage />} />
            <Route path="/participar" element={<RegisterPage />} />
            <Route path="/mis-tickets" element={<MyTicketsPage />} />
            <Route path="/ganadores" element={<WinnersPage />} />
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
