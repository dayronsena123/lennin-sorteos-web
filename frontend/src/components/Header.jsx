import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Eye, Facebook, Instagram } from 'lucide-react';

const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.394 6.394 0 0 0-5.394 9.365 6.394 6.394 0 0 0 10.964-2.413v-8.25a8.32 8.32 0 0 0 3.663 1.41V6.686z" />
    </svg>
);

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
        { name: 'Inicio', path: '/' },
        { name: 'Participar', path: '/participar' },
        { name: 'Mis Tickets', path: '/mis-tickets' },
        { name: 'Ganadores', path: '/ganadores' },
        { name: 'Reglas', path: '/reglas' },
        { name: 'Contacto', path: '/contacto' },
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
                                {link.name}
                            </Link>
                        ))}

                        {/* Social Icons */}
                        <div className="flex items-center gap-2 ml-2 border-l border-primary-700 pl-4">
                            <a href="https://www.facebook.com/share/1Ca6WoigVf/" target="_blank" rel="noopener noreferrer" className="p-2 text-primary-300 hover:text-white hover:bg-[#1877F2] rounded-full transition"><Facebook size={18} /></a>
                            <a href="https://www.instagram.com/lenninbenito?igsh=ZjYxMTY5aXg5Znhw" target="_blank" rel="noopener noreferrer" className="p-2 text-primary-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] rounded-full transition"><Instagram size={18} /></a>
                            <a href="https://www.tiktok.com/@lenninbeno?_r=1&_t=ZS-91XnYAseb2N" target="_blank" rel="noopener noreferrer" className="p-2 text-primary-300 hover:text-white hover:bg-black rounded-full transition"><TikTokIcon size={18} /></a>
                        </div>

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
