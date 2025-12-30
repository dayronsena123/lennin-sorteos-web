import React from 'react';
import { Phone } from 'lucide-react';

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

export default ContactPage;
