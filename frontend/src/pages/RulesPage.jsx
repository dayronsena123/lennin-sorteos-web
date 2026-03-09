import React from 'react';

function RulesPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Reglas del Sorteo</h2>
            <div className="bg-primary-800 p-8 rounded-3xl shadow-xl border border-primary-600 space-y-6 text-primary-200">
                <p>1. El costo del ticket es de <strong>S/ 10.00</strong>.</p>
                <p>2. El sorteo se realizará el día <strong>01 de Marzo</strong> en transmisión en vivo desde la <strong>Plaza de Armas de Bagua Capital</strong>.</p>
                <p>3. Los premios son: <strong>1 Mototaxi Honda Nuevecita</strong> y <strong>25 Premios en Efectivo</strong>.</p>
                <p>4. Para participar debes registrar tu ticket con tus datos correctos.</p>
                <p>5. Conserva tu comprobante físico o digital para reclamar el premio.</p>
            </div>
        </div>
    );
}

export default RulesPage;
