import React from 'react';
import { Gift } from 'lucide-react';

function WinnersPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 text-center">
            <div className="bg-primary-800 p-6 md:p-12 rounded-3xl shadow-2xl border border-primary-600">
                <div className="inline-block p-4 bg-primary-700 rounded-full mb-6">
                    <Gift size={48} className="text-secondary-400" />
                </div>

                <h2 className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-secondary-400 to-yellow-300 mb-8 animate-pulse leading-tight">
                    GANADORES DEL SORTEO NAVIDEÑO
                </h2>

                {/* Contenedor de video optimizado para vertical/móvil */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-full max-w-sm md:max-w-md aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary-500/50">
                        <video
                            controls
                            className="w-full h-full object-contain"
                            poster="/lenninsorteoslogo.jpg"
                        >
                            <source src="/video-ganadores.mp4" type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>
                    </div>
                </div>

                <p className="text-lg md:text-xl text-primary-200 mb-8">
                    ¡Muchas felicidades a todos los ganadores! <br />
                    <span className="text-green-400 font-bold text-xl md:text-2xl mt-2 block">¡Premios Entregados con Éxito!</span>
                </p>

                <div className="p-4 md:p-6 bg-primary-900/50 rounded-xl border border-primary-700 max-w-md mx-auto">
                    <p className="text-primary-400 font-medium text-sm md:text-base">Gracias por confiar en <span className="text-secondary-400 font-bold">Lennin Sorteos</span>.</p>
                </div>
            </div>
        </div>
    );
}

export default WinnersPage;
