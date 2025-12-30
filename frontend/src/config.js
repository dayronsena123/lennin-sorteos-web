// Configuration for Deployment
let API_URL = import.meta.env.VITE_API_URL;

// Fallback inteligente: Si no hay variable de entorno
if (!API_URL) {
    // Si estamos en localhost, usar servidor local
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        API_URL = 'http://localhost:5000/api';
    } else {
        // Para CUALQUIER otro dominio (vercel.app, lenninsorteos.com, etc.), usar producción
        API_URL = 'https://lennin-backend.onrender.com/api';
    }
} else {
    // Asegurar que termine en /api si el usuario olvidó ponerlo
    if (!API_URL.endsWith('/api')) {
        API_URL += '/api';
    }
}

export const BASE_URL = API_URL.replace('/api', '');
export default API_URL;
