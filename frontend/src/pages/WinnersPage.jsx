import React, { useState } from 'react';
import { Gift, X } from 'lucide-react';
import ConfettiEffect from '../components/ConfettiEffect';

// Fotos del 2° Sorteo
const fotosSorteo2 = [
    {
        src: '/ganadores-sorteo2/ganador_de_l_mototaxi.jfif',
        alt: 'Ganador de la Mototaxi',
        label: 'Ganador Mototaxi'
    },
    {
        src: '/ganadores-sorteo2/ganadores_de_500soles_400soles_300soles_200soles_100soles.jfif',
        alt: 'Ganadores de efectivo',
        label: 'Ganadores Efectivo'
    },
    {
        src: '/ganadores-sorteo2/foto_evidencia.jfif',
        alt: 'Foto evidencia entrega',
        label: 'Evidencia de Entrega'
    },
    {
        src: '/ganadores-sorteo2/foto_evidencia (2).jfif',
        alt: 'Foto evidencia entrega 2',
        label: 'Evidencia de Entrega'
    },
    {
        src: '/ganadores-sorteo2/20_ganadores_de_50soles.jfif',
        alt: 'Ganadores de 50 soles',
        label: '20 Ganadores S/50'
    },
    {
        src: '/ganadores-sorteo2/20_ganadores_de_50soles (2).jfif',
        alt: 'Ganadores de 50 soles 2',
        label: '20 Ganadores S/50'
    },
];

function WinnersPage() {
    const [modalImg, setModalImg] = useState(null);

    return (
        <div className="min-h-screen bg-primary-900">
            <ConfettiEffect />

            {/* ===== 2° GRAN SORTEO - GANADORES ===== */}
            <div className="max-w-5xl mx-auto px-4 py-12">

                {/* Header Sorteo 2 */}
                <div className="text-center mb-10">
                    <div className="inline-block px-6 py-2 rounded-full bg-secondary-500/20 border border-secondary-400/50 text-secondary-300 font-bold tracking-wider text-sm mb-4">
                        2° GRAN SORTEO
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-secondary-400 to-yellow-300 mb-4 leading-tight">
                        GANADORES DEL 2° SORTEO
                    </h2>
                    <p className="text-primary-300 text-lg">
                        ¡Felicitaciones a todos los ganadores! Los premios fueron entregados con éxito.
                    </p>
                </div>

                {/* Collage de 6 fotos - grid masonry style */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
                    {fotosSorteo2.map((foto, idx) => (
                        <div
                            key={idx}
                            className="relative group cursor-pointer rounded-2xl overflow-hidden border-2 border-primary-700 hover:border-secondary-400 transition duration-300 shadow-lg hover:shadow-secondary-500/20 hover:shadow-xl"
                            onClick={() => setModalImg(foto)}
                        >
                            <div className="aspect-square bg-primary-800">
                                <img
                                    src={foto.src}
                                    alt={foto.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400x400?text=Foto+Ganador';
                                    }}
                                />
                            </div>
                            {/* Overlay con label */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-3">
                                <span className="text-white font-bold text-xs md:text-sm text-center w-full leading-tight">
                                    {foto.label}
                                </span>
                            </div>
                            {/* Icono zoom */}
                            <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mensaje entrega */}
                <div className="text-center">
                    <span className="inline-block px-6 py-3 bg-green-500/20 border border-green-400/50 text-green-300 font-bold rounded-full text-base">
                        Todos los premios del 2° Sorteo han sido entregados
                    </span>
                </div>
            </div>

            {/* Divisor */}
            <div className="border-t border-primary-700 mx-4 md:mx-auto max-w-5xl my-4"></div>

            {/* ===== 1° SORTEO - GANADORES ===== */}
            <div className="max-w-4xl mx-auto px-4 pb-16">

                {/* Header Sorteo 1 */}
                <div className="text-center mb-10">
                    <div className="inline-block px-6 py-2 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 font-bold tracking-wider text-sm mb-4">
                        1° SORTEO NAVIDEÑO
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-secondary-400 to-yellow-300 mb-4 leading-tight">
                        GANADORES DEL 1° SORTEO
                    </h2>
                    <p className="text-primary-300 text-lg">
                        El sorteo se realizó el <span className="text-white font-bold">24 de Diciembre</span>. ¡Felicidades a los ganadores! 🎄
                    </p>
                </div>

                <div className="bg-primary-800 p-6 md:p-10 rounded-3xl shadow-2xl border border-primary-600">

                    {/* Video ganadores sorteo 1 */}
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

                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="inline-block p-3 bg-primary-700 rounded-full">
                            <Gift size={36} className="text-secondary-400" />
                        </div>
                    </div>

                    <p className="text-lg md:text-xl text-primary-200 text-center mb-6">
                        ¡Muchas felicidades a todos los ganadores! <br />
                        <span className="text-green-400 font-bold text-xl md:text-2xl mt-2 block">¡Premios Entregados con Éxito!</span>
                    </p>

                    <div className="p-4 md:p-6 bg-primary-900/50 rounded-xl border border-primary-700 max-w-md mx-auto text-center">
                        <p className="text-primary-400 font-medium text-sm md:text-base">
                            Gracias por confiar en <span className="text-secondary-400 font-bold">Lennin Sorteos</span>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal lightbox */}
            {modalImg && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setModalImg(null)}
                >
                    <button
                        className="absolute top-4 right-4 md:top-6 md:right-6 bg-primary-800 hover:bg-primary-700 text-white rounded-full p-2 transition z-50"
                        onClick={() => setModalImg(null)}
                    >
                        <X size={28} />
                    </button>
                    <div className="max-w-4xl w-full flex flex-col items-center justify-center mt-8 md:mt-0" onClick={e => e.stopPropagation()}>
                        <img
                            src={modalImg.src}
                            alt={modalImg.alt}
                            className="max-w-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-xl shadow-2xl border-4 border-white cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                            onClick={() => setModalImg(null)}
                        />
                        <p className="text-center text-white font-bold mt-6 text-xl md:text-2xl tracking-wide drop-shadow-md">{modalImg.label}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WinnersPage;
