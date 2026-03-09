import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

function HomePage() {
    return (
        <div className="min-h-[80vh] flex flex-col">
            {/* Hero Section with Video Banner */}
            <div className="relative w-full bg-primary-900">
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
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-primary-900/70 to-transparent"></div>
                </div>
            </div>

            {/* ===== 2° GRAN SORTEO (FINALIZADO) ===== */}
            <div className="py-16 bg-primary-900">
                <div className="max-w-5xl mx-auto px-4">

                    {/* Badge Sorteo 2 */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-block px-6 py-2 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 font-bold tracking-wider text-sm md:text-base">
                            2° GRAN SORTEO (FINALIZADO)
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-3">
                        Premios <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-yellow-200">Entregados</span>
                    </h2>
                    <p className="text-center text-primary-300 mb-12 text-lg">
                        Cumplimos con nuestros ganadores. Estos fueron los premios del 2° sorteo.
                    </p>

                    {/* Premios Sorteo 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">

                        {/* Premio Mototaxi */}
                        <div className="bg-primary-800 rounded-3xl p-8 border border-primary-600 hover:border-secondary-500 transition group text-center">
                            <div className="w-full h-64 bg-primary-900/50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-secondary-500/5 group-hover:bg-secondary-500/10 transition z-10"></div>
                                {/* Badge ENTREGADO */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <span className="bg-green-500 text-white font-black text-lg px-6 py-2 rounded-full shadow-lg shadow-green-500/40 animate-pulse whitespace-nowrap">
                                        ¡ENTREGADO!
                                    </span>
                                </div>
                                <img
                                    src="/Mototaxi.jpg"
                                    alt="Mototaxi"
                                    className="w-full h-full object-cover drop-shadow-2xl group-hover:scale-110 transition duration-500 opacity-80"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=Mototaxi"; }}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Mototaxi</h3>
                            <p className="text-primary-300">Gran premio del 2° Sorteo Lennin.</p>
                        </div>

                        {/* Premio Dinero en Efectivo */}
                        <div className="bg-primary-800 rounded-3xl p-8 border border-primary-600 hover:border-secondary-500 transition group text-center">
                            <div className="w-full h-64 bg-primary-900/50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-secondary-500/5 group-hover:bg-secondary-500/10 transition z-10"></div>
                                {/* Badge ENTREGADO */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <span className="bg-green-500 text-white font-black text-lg px-6 py-2 rounded-full shadow-lg shadow-green-500/40 animate-pulse whitespace-nowrap">
                                        ¡ENTREGADO!
                                    </span>
                                </div>
                                <img
                                    src="/Dinero.jpg"
                                    alt="Dinero en Efectivo"
                                    className="w-full h-full object-cover drop-shadow-2xl group-hover:scale-110 transition duration-500 opacity-80"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=Dinero+Efectivo"; }}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Dinero en Efectivo</h3>
                            <p className="text-primary-300">Premio en efectivo del 2° Sorteo Lennin.</p>
                        </div>
                    </div>

                    {/* Botón GANADORES */}
                    <div className="flex justify-center">
                        <Link
                            to="/ganadores"
                            className="px-12 py-5 bg-secondary-500 text-primary-900 rounded-full font-black text-xl shadow-xl shadow-secondary-500/30 hover:scale-105 hover:bg-secondary-400 transition duration-300 flex items-center gap-3"
                        >
                            <Trophy size={26} />
                            🏆 VER GANADORES
                        </Link>
                    </div>
                </div>
            </div>

            {/* Divisor */}
            <div className="bg-secondary-500 py-3 overflow-hidden">
                <div
                    className="flex gap-12 text-primary-900 font-black text-base uppercase tracking-widest whitespace-nowrap"
                    style={{ animation: 'marquee 20s linear infinite' }}
                >
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

            {/* ===== 1° SORTEO (FINALIZADO) ===== */}
            <div className="py-16 bg-primary-800">
                <div className="max-w-5xl mx-auto px-4">

                    {/* Badge Sorteo 1 */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-block px-6 py-2 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 font-bold tracking-wider text-sm md:text-base">
                            1° SORTEO (FINALIZADO)
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-3">
                        Premios <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-yellow-200">Entregados</span>
                    </h2>
                    <p className="text-center text-primary-300 mb-12 text-lg">
                        Cumplimos con nuestros ganadores. Estos fueron los premios del sorteo anterior.
                    </p>

                    {/* Premios Sorteo 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                        {/* Laptop Card */}
                        <div className="bg-primary-700 rounded-3xl p-8 border border-primary-600 hover:border-secondary-500 transition group text-center">
                            <div className="w-full h-64 bg-primary-900/50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-secondary-500/5 group-hover:bg-secondary-500/10 transition z-10"></div>
                                {/* Badge ENTREGADO */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <span className="bg-green-500 text-white font-black text-lg px-6 py-2 rounded-full shadow-lg shadow-green-500/40 animate-pulse whitespace-nowrap">
                                        ¡ENTREGADO!
                                    </span>
                                </div>
                                <img
                                    src="/Laptop.jpg"
                                    alt="Laptop"
                                    className="w-full h-full object-cover drop-shadow-2xl group-hover:scale-110 transition duration-500 opacity-80"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=Laptop+Image"; }}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">3 Laptops Modernas</h3>
                            <p className="text-primary-300">Sorteadas el 24 de Diciembre.</p>
                        </div>

                        {/* Phone Card */}
                        <div className="bg-primary-700 rounded-3xl p-8 border border-primary-600 hover:border-secondary-500 transition group text-center">
                            <div className="w-full h-64 bg-primary-900/50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-secondary-500/5 group-hover:bg-secondary-500/10 transition z-10"></div>
                                {/* Badge ENTREGADO */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <span className="bg-green-500 text-white font-black text-lg px-6 py-2 rounded-full shadow-lg shadow-green-500/40 animate-pulse whitespace-nowrap">
                                        ¡ENTREGADO!
                                    </span>
                                </div>
                                <img
                                    src="/Celular.jpg"
                                    alt="Celular"
                                    className="w-full h-full object-cover drop-shadow-2xl group-hover:scale-110 transition duration-500 opacity-80"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=Celular+Image"; }}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Infinix G30 Pro</h3>
                            <p className="text-primary-300">Sorteado el 24 de Diciembre.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
