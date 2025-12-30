import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.394 6.394 0 0 0-5.394 9.365 6.394 6.394 0 0 0 10.964-2.413v-8.25a8.32 8.32 0 0 0 3.663 1.41V6.686z" />
    </svg>
);

function Footer() {
    return (
        <footer className="bg-gradient-to-b from-primary-900 via-primary-950 to-black border-t-2 border-secondary-500/30 py-12 md:py-16 relative z-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-secondary-500/50 blur-[100px]"></div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center text-center">
                    {/* Logo & Brand */}
                    <div className="mb-8 transform hover:scale-105 transition duration-300">
                        <div className="w-20 h-20 bg-primary-800 rounded-full flex items-center justify-center border-2 border-secondary-500 shadow-[0_0_30px_rgba(234,179,8,0.3)] mb-4 mx-auto">
                            <img src="/lenninsorteoslogo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tight">
                            LENNIN <span className="text-secondary-400">SORTEOS</span>
                        </h3>
                        <p className="text-primary-400 text-sm mt-2 max-w-md mx-auto">
                            Transparencia, confianza y grandes premios. Tu oportunidad de ganar está aquí.
                        </p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex gap-6 mb-8">
                        <a href="https://www.facebook.com/share/1Ca6WoigVf/" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary-800 rounded-full text-white hover:bg-[#1877F2] hover:scale-110 transition duration-300 shadow-lg group">
                            <Facebook size={24} />
                        </a>
                        <a href="https://www.instagram.com/lenninbenito?igsh=ZjYxMTY5aXg5Znhw" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary-800 rounded-full text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:scale-110 transition duration-300 shadow-lg group">
                            <Instagram size={24} />
                        </a>
                        <a href="https://www.tiktok.com/@lenninbeno?_r=1&_t=ZS-91XnYAseb2N" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary-800 rounded-full text-white hover:bg-black hover:border hover:border-white/20 hover:scale-110 transition duration-300 shadow-lg group">
                            <TikTokIcon size={24} />
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 mb-10 text-primary-300 font-medium text-sm">
                        <Link to="/" className="hover:text-secondary-400 transition">INICIO</Link>
                        <Link to="/reglas" className="hover:text-secondary-400 transition">REGLAS</Link>
                        <Link to="/participar" className="hover:text-secondary-400 transition">PARTICIPAR</Link>
                        <Link to="/ganadores" className="hover:text-secondary-400 transition">GANADORES</Link>
                        <Link to="/contacto" className="hover:text-secondary-400 transition">CONTACTO</Link>
                    </div>

                    {/* Copyright */}
                    <p className="text-primary-400 text-xs md:text-sm">© 2025 <span className="text-white font-bold">Lennin Sorteos</span>. Todos los derechos reservados.</p>
                    <p className="text-primary-500 text-xs mt-2">
                        Desarrollado por <span className="text-secondary-400 font-bold">Dayron</span> |
                        <a href="https://www.lenninsorteos.com" className="text-secondary-400 hover:text-secondary-300 ml-1 font-bold hover:underline transition">lenninsorteos.com</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
