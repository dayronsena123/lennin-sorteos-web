import React from 'react';

function FloatingWhatsApp() {
    return (
        <a
            href="https://wa.me/51942987989"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full shadow-2xl hover:bg-green-600 transition transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center overflow-hidden"
            title="Contáctanos por WhatsApp"
        >
            <img src="/Logowhatsaap.png" alt="WhatsApp" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"; }} />
        </a>
    );
}

export default FloatingWhatsApp;
