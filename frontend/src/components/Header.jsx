import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, Ticket, Gift, FileText, Phone, LogOut, Eye } from 'lucide-react';

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

    const navLinks = [
        { name: 'Inicio', path: '/', icon: <Home size={18} /> },
        { name: 'Participar', path: '/participar', icon: <Ticket size={18} /> },
        { name: 'Mis Tickets', path: '/mis-tickets', icon: <Ticket size={18} /> },
        { name: 'Ganadores', path: '/ganadores', icon: <Gift size={18} /> },
        { name: 'Reglas', path: '/reglas', icon: <FileText size={18} /> },
        { name: 'Contacto', path: '/contacto', icon: <Phone size={18} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-primary-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-primary-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 bg-secondary-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <img src="/lenninsorteoslogo.jpg" alt="Logo" className="relative w-full h-full object-cover rounded-full border-2 border-secondary-500 shadow-lg group-hover:scale-105 transition duration-300" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white tracking-tight leading-none group-hover:text-secondary-400 transition">LENNIN</span>
                            <span className="text-sm font-bold text-secondary-500 tracking-widest leading-none">SORTEOS</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2
                  ${isActive(link.path)
                                        ? 'bg-secondary-500 text-primary-900 shadow-lg shadow-secondary-500/20 scale-105'
                                        : 'text-primary-200 hover:text-white hover:bg-primary-800'
                                    }`}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                        {isAdmin ? (
                            <button onClick={handleLogout} className="ml-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition shadow-lg flex items-center gap-2">
                                <LogOut size={18} /> Salir
                            </button>
                        ) : (
                            <Link to="/admin" className="ml-4 px-5 py-2 bg-primary-800 hover:bg-primary-700 text-white border border-primary-600 rounded-full font-bold transition shadow-lg flex items-center gap-2">
                                <Eye size={18} /> Admin
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white hover:text-secondary-400 transition"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-primary-900/95 backdrop-blur-xl border-b border-primary-700 shadow-2xl animate-fade-in-down">
                    <div className="px-4 py-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-4 py-3 rounded-xl text-base font-bold transition flex items-center gap-3
                  ${isActive(link.path)
                                        ? 'bg-secondary-500 text-primary-900'
                                        : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-primary-800 mt-4">
                            {isAdmin ? (
                                <button onClick={handleLogout} className="w-full px-4 py-3 bg-red-600/90 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                                    <LogOut size={20} /> Cerrar Sesión
                                </button>
                            ) : (
                                <Link to="/admin" className="block w-full px-4 py-3 bg-primary-800 text-white text-center rounded-xl font-bold border border-primary-700 flex items-center justify-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                                    <Eye size={20} /> Acceso Admin
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
