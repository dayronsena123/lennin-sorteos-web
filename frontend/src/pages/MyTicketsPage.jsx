import React, { useState } from 'react';
import axios from 'axios';
import { Search, Ticket, X } from 'lucide-react';
import API_URL, { BASE_URL } from '../config';

function MyTicketsPage() {
    const [userSearchDNI, setUserSearchDNI] = useState('');
    const [userTickets, setUserTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const searchUserTickets = async () => {
        if (!/^[0-9]{8}$/.test(userSearchDNI)) return alert('DNI inválido');
        try {
            const res = await axios.get(`${API_URL}/tickets/search/${userSearchDNI}`);
            setUserTickets(res.data);
        } catch (e) { setUserTickets([]); }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                {/* Search Section */}
                <div className="lg:col-span-2 bg-primary-700 p-8 rounded-3xl shadow-2xl border border-primary-600">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary-600 rounded-xl text-white">
                            <Search size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Mis Tickets</h2>
                    </div>

                    <div className="bg-primary-800 p-6 rounded-2xl mb-6 border border-primary-600">
                        <p className="text-primary-300 mb-4">Ingresa tu DNI para ver el estado de tus tickets.</p>
                        <div className="flex gap-2">
                            <input value={userSearchDNI} onChange={e => setUserSearchDNI(e.target.value)} placeholder="DNI" maxLength={8} className="flex-1 px-4 py-3 rounded-xl bg-primary-900 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none" />
                            <button onClick={searchUserTickets} className="px-6 py-3 bg-secondary-500 text-primary-900 rounded-xl font-bold hover:bg-secondary-400 transition">BUSCAR</button>
                        </div>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {userTickets.length === 0 ? (
                            <div className="text-center text-primary-500 py-8">
                                <Ticket size={48} className="mx-auto mb-2 opacity-20" />
                                <p>No hay tickets para mostrar</p>
                            </div>
                        ) : userTickets.map(t => (
                            <div key={t.ticket_id} className="bg-primary-800 border border-primary-600 p-4 rounded-xl flex justify-between items-center group hover:border-secondary-500/50 transition">
                                <div>
                                    <p className="font-bold text-white group-hover:text-secondary-400 transition">{t.ticket_id}</p>
                                    <p className="text-sm text-primary-400">{t.nombre}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-1
                    ${t.estado === 'aprobado' ? 'bg-green-900 text-green-400' :
                                            t.estado === 'rechazado' ? 'bg-red-900 text-red-400' :
                                                'bg-yellow-900 text-yellow-400'}`}>
                                        {t.estado.toUpperCase()}
                                    </span>
                                    <button onClick={() => setSelectedTicket(t)} className="block text-xs text-primary-300 hover:text-white underline">Ver detalle</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ticket Man Image - Right Side */}
                <div className="hidden lg:flex justify-center items-center transform scale-x-[-1]">
                    <img src="/ticket-man.png" alt="Buscar" className="w-full max-w-xs object-contain animate-pulse drop-shadow-2xl transform scale-125 hover:scale-110 transition duration-500" onError={(e) => { e.target.onerror = null; }} />
                </div>

            </div>

            {selectedTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedTicket(null)}>
                    <div className="bg-primary-800 p-6 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-primary-600" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Detalle del Ticket</h3>
                            <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-primary-700 rounded-full transition text-primary-400"><X size={24} /></button>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6 text-sm">
                                <div><p className="text-primary-400 mb-1">Participante</p><p className="font-medium text-white text-lg">{selectedTicket.nombre} {selectedTicket.apellidos}</p></div>
                                <div><p className="text-primary-400 mb-1">DNI</p><p className="font-medium text-white text-lg">{selectedTicket.dni}</p></div>
                                <div><p className="text-primary-400 mb-1">Estado</p><p className="font-medium text-white text-lg">{selectedTicket.estado}</p></div>
                                <div><p className="text-primary-400 mb-1">Fecha</p><p className="font-medium text-white text-lg">{new Date(selectedTicket.fecha_registro).toLocaleString()}</p></div>
                            </div>
                            <div className="border-2 border-primary-600 rounded-2xl overflow-hidden bg-black/50">
                                <img src={`${BASE_URL}${selectedTicket.comprobante_url}`} alt="comprobante" className="w-full object-contain max-h-[500px]" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyTicketsPage;
