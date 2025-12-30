import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Search, Download, Check, X, Users, Ticket, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import API_URL, { BASE_URL } from '../config';

function AdminPage({ setIsAdmin }) {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [view, setView] = useState('dashboard');
    const [tickets, setTickets] = useState([]);
    const [searchDNI, setSearchDNI] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const res = await axios.get(`${API_URL}/tickets`);
            setTickets(res.data);
        } catch (e) { console.error(e); }
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API_URL}/admin/login`, {
                email: loginData.email.trim(),
                password: loginData.password.trim()
            });
            if (res.data.success) {
                setIsAdmin(true);
                localStorage.setItem('adminToken', res.data.token);
            }
        } catch (e) {
            console.error(e);
            alert('Error: ' + (e.response?.data?.error || e.message));
        }
    };

    const updateTicketStatus = async (ticketId, newStatus) => {
        try {
            if (newStatus === 'rechazado') {
                // Si se rechaza, eliminar el ticket de la base de datos
                if (confirm('¿Estás seguro de rechazar este ticket? Se eliminará permanentemente de la base de datos.')) {
                    await axios.delete(`${API_URL}/tickets/${ticketId}`);
                    await loadTickets();
                    alert('Ticket rechazado y eliminado');
                }
            } else {
                // Si se aprueba o pone en revisión, solo actualizar el estado
                await axios.put(`${API_URL}/tickets/${ticketId}/status`, { estado: newStatus });
                await loadTickets();
                alert('Estado actualizado');
            }
        } catch (e) {
            alert('Error al actualizar: ' + (e.response?.data?.error || e.message));
        }
    };

    const exportPDF = () => {
        try {
            const doc = new jsPDF();
            doc.text("Reporte de Sorteo - Lennin Sorteos", 14, 16);
            autoTable(doc, {
                head: [['Ticket', 'Nombre', 'DNI', 'Monto', 'Estado']],
                body: tickets.map(t => [t.ticket_id, t.nombre, t.dni, t.monto_detectado || '-', t.estado]),
                startY: 20,
            });
            doc.save(`reporte_sorteo_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("PDF Export Error:", error);
            alert("Error al generar PDF. Asegúrate de que los datos estén cargados.");
        }
    };

    if (!localStorage.getItem('adminToken')) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary-900 px-4">
                <div className="bg-primary-800 p-8 rounded-3xl shadow-2xl border border-primary-600 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Admin Access</h2>
                    <div className="space-y-4">
                        <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-primary-900 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
                        <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-primary-900 border border-primary-600 text-white focus:ring-2 focus:ring-secondary-500 outline-none" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
                        <button onClick={handleLogin} className="w-full py-3 bg-secondary-500 text-primary-900 rounded-xl font-bold hover:bg-secondary-400 transition shadow-lg shadow-secondary-500/20">INGRESAR</button>
                    </div>
                </div>
            </div>
        );
    }

    const filteredTickets = tickets.filter(t => t.dni.includes(searchDNI) || t.nombre.toLowerCase().includes(searchDNI.toLowerCase()) || t.ticket_id.includes(searchDNI));
    const stats = {
        total: tickets.length,
        approved: tickets.filter(t => t.estado === 'aprobado').length,
        pending: tickets.filter(t => t.estado === 'revision').length,
        rejected: tickets.filter(t => t.estado === 'rechazado').length
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold text-white">Panel de Administración</h2>
                <div className="flex gap-4">
                    <button onClick={exportPDF} className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition flex items-center gap-2 shadow-lg">
                        <Download size={20} /> Exportar PDF
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-primary-800 p-6 rounded-2xl border border-primary-600 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary-700 rounded-xl"><Users size={24} className="text-blue-400" /></div>
                        <span className="text-xs font-bold text-primary-400 bg-primary-900 px-2 py-1 rounded">TOTAL</span>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.total}</p>
                    <p className="text-primary-400 text-sm mt-1">Tickets registrados</p>
                </div>
                <div className="bg-primary-800 p-6 rounded-2xl border border-primary-600 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-900/30 rounded-xl"><CheckCircle size={24} className="text-green-400" /></div>
                        <span className="text-xs font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded">APROBADOS</span>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.approved}</p>
                    <p className="text-primary-400 text-sm mt-1">Tickets verificados</p>
                </div>
                <div className="bg-primary-800 p-6 rounded-2xl border border-primary-600 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-yellow-900/30 rounded-xl"><Clock size={24} className="text-yellow-400" /></div>
                        <span className="text-xs font-bold text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded">PENDIENTES</span>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.pending}</p>
                    <p className="text-primary-400 text-sm mt-1">Por revisar</p>
                </div>
                <div className="bg-primary-800 p-6 rounded-2xl border border-primary-600 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-900/30 rounded-xl"><AlertCircle size={24} className="text-red-400" /></div>
                        <span className="text-xs font-bold text-red-400 bg-red-900/20 px-2 py-1 rounded">RECHAZADOS</span>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.rejected}</p>
                    <p className="text-primary-400 text-sm mt-1">Tickets inválidos</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-primary-800 p-6 rounded-2xl border border-primary-600 mb-6 shadow-lg">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por DNI, Nombre o Ticket ID..."
                        className="w-full pl-12 pr-4 py-3 bg-primary-900 border border-primary-600 rounded-xl text-white focus:ring-2 focus:ring-secondary-500 outline-none"
                        value={searchDNI}
                        onChange={e => setSearchDNI(e.target.value)}
                    />
                </div>
            </div>

            {/* Tickets Table */}
            <div className="bg-primary-800 rounded-2xl border border-primary-600 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-primary-900 text-primary-300 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Ticket ID</th>
                                <th className="px-6 py-4">Participante</th>
                                <th className="px-6 py-4">Contacto</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary-700">
                            {filteredTickets.map(ticket => (
                                <tr key={ticket.id} className="hover:bg-primary-700/50 transition">
                                    <td className="px-6 py-4 font-mono text-secondary-400 font-bold">{ticket.ticket_id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white">{ticket.nombre} {ticket.apellidos}</div>
                                        <div className="text-xs text-primary-400">DNI: {ticket.dni}</div>
                                    </td>
                                    <td className="px-6 py-4 text-primary-300">
                                        <div className="flex items-center gap-1"><Phone size={14} /> {ticket.whatsapp}</div>
                                        <div className="text-xs text-primary-500">{ticket.region}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                      ${ticket.estado === 'aprobado' ? 'bg-green-900/50 text-green-400 border border-green-500/30' :
                                                ticket.estado === 'rechazado' ? 'bg-red-900/50 text-red-400 border border-red-500/30' :
                                                    'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30'}`}>
                                            {ticket.estado.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => setSelectedTicket(ticket)} className="p-2 bg-primary-700 hover:bg-primary-600 rounded-lg text-white transition" title="Ver Comprobante">
                                                <Ticket size={18} />
                                            </button>
                                            <button onClick={() => updateTicketStatus(ticket.id, 'aprobado')} className="p-2 bg-green-600 hover:bg-green-500 rounded-lg text-white transition" title="Aprobar">
                                                <Check size={18} />
                                            </button>
                                            <button onClick={() => updateTicketStatus(ticket.id, 'rechazado')} className="p-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition" title="Rechazar">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Ticket Detail Modal */}
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
                                <div><p className="text-primary-400 mb-1">Monto Detectado</p><p className="font-medium text-white text-lg">S/ {selectedTicket.monto_detectado || '-'}</p></div>
                                <div><p className="text-primary-400 mb-1">Fecha</p><p className="font-medium text-white text-lg">{new Date(selectedTicket.fecha_registro).toLocaleString()}</p></div>
                            </div>
                            <div className="border-2 border-primary-600 rounded-2xl overflow-hidden bg-black/50">
                                <img src={`${BASE_URL}${selectedTicket.comprobante_url}`} alt="comprobante" className="w-full object-contain max-h-[500px]" />
                            </div>
                            <div className="flex gap-4 pt-4 border-t border-primary-700">
                                <button onClick={() => { updateTicketStatus(selectedTicket.id, 'aprobado'); setSelectedTicket(null); }} className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition">APROBAR</button>
                                <button onClick={() => { updateTicketStatus(selectedTicket.id, 'rechazado'); setSelectedTicket(null); }} className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition">RECHAZAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
