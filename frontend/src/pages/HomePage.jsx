import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

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
            {/* Hero Section with Video Banner - Full Width, Correct Aspect Ratio */}
            <div className="relative w-full bg-primary-900">
                {/* Aspect Ratio 1920/640 is exactly 3:1 */}
                <div className="relative w-full aspect-[3/1] overflow-hidden shadow-2xl">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/banner.mp4" type="video/mp4" />
                        Tu navegador no soporta videos.
                    </video>
                    {/* Sutil degradado en el fondo del video */}
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-primary-900/70 to-transparent"></div>
                </div>

                {/* Content Section - Below Video */}
                <div className="bg-primary-900 pt-8 pb-12 px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">

                        {/* Restored Text Content */}
                        <div className="mb-10 animate-fade-in-up">
                            <div className="inline-block mb-4 px-6 py-2 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 font-bold tracking-wider text-sm md:text-base">
                                ¡SORTEO FINALIZADO!
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-xl">
                                GRACIAS POR <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-yellow-200">PARTICIPAR</span>
                            </h1>
                            <p className="text-xl md:text-3xl text-primary-200 mb-4 max-w-3xl mx-auto font-medium">
                                El sorteo se realizó el <span className="text-white font-bold">24 de Diciembre</span>
                            </p>
                            <p className="text-lg md:text-xl text-primary-300">
                                ¡Ya tenemos a los ganadores!
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link to="/ganadores" className="px-12 py-5 bg-secondary-500 text-primary-900 rounded-full font-black text-2xl shadow-xl shadow-secondary-500/30 hover:scale-105 hover:bg-secondary-400 transition duration-300 flex items-center justify-center gap-3 animate-bounce-subtle">
                                <Ticket size={28} /> VER GANADORES
                            </Link>
                            <Link to="/mis-tickets" className="px-10 py-4 bg-primary-800 text-white border border-primary-500 rounded-full font-bold text-xl hover:bg-primary-700 transition duration-300">
                                MIS TICKETS
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/* Countdown Section */}
            <div className="bg-primary-800 py-12 border-b border-primary-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="bg-gradient-to-br from-primary-700/80 to-primary-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-secondary-500/30 shadow-2xl shadow-secondary-500/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-400 via-yellow-400 to-secondary-400 animate-pulse"></div>

                        <h3 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-wide text-center">
                            ⏰ TIEMPO RESTANTE PARA EL SORTEO
                        </h3>

                        <div className="grid grid-cols-4 gap-3 md:gap-6">
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

export default HomePage;
