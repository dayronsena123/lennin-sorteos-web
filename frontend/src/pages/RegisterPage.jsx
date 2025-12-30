import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Gift } from 'lucide-react';

function RegisterPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="bg-primary-800 p-12 rounded-3xl shadow-2xl border border-primary-600">
                <div className="inline-block p-4 bg-red-900/50 rounded-full mb-6">
                    <AlertCircle size={48} className="text-red-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Sorteo Finalizado</h2>
                <p className="text-xl text-primary-200 mb-8">
                    El periodo de registro de tickets ha concluido. <br />
                    ¡Gracias a todos por participar!
                </p>
                <Link to="/ganadores" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary-500 text-primary-900 rounded-xl font-bold hover:bg-secondary-400 transition">
                    <Gift size={24} /> VER GANADORES
                </Link>
            </div>
        </div>
    );
}

export default RegisterPage;
