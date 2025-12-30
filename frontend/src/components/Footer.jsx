import React from 'react';

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

                    {/* Copyright */}
                    <p className="text-primary-400 text-xs md:text-sm">© 2025 <span className="text-white font-bold">Lennin Sorteos</span>. Todos los derechos reservados.</p>
                    <p className="text-primary-500 text-xs">
                        Desarrollado por <span className="text-secondary-400 font-bold">Dayron</span> |
                        <a href="https://www.lenninsorteos.com" className="text-secondary-400 hover:text-secondary-300 ml-1 font-bold hover:underline transition">lenninsorteos.com</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
