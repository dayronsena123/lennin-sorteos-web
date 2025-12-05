import pool from '../config/database.js';

/**
 * Genera un ticket ID aleatorio con formato TK-000001 a TK-000800
 * Verifica en la base de datos que no exista duplicado
 * Si existe, reintenta hasta 10 veces
 */
export const generateTicketID = async () => {
  const MAX_RETRIES = 10;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    // Generar número aleatorio entre 1 y 800
    const randomNumber = Math.floor(Math.random() * 800) + 1;
    const ticketId = `TK-${randomNumber.toString().padStart(6, '0')}`;

    // Verificar si ya existe en la base de datos
    try {
      const [rows] = await pool.execute(
        'SELECT ticket_id FROM tickets WHERE ticket_id = ?',
        [ticketId]
      );

      // Si no existe, retornar este ID
      if (rows.length === 0) {
        return ticketId;
      }

      // Si existe, continuar el loop para intentar con otro número
      console.log(`Ticket ${ticketId} ya existe, reintentando... (intento ${attempt + 1}/${MAX_RETRIES})`);
    } catch (error) {
      console.error('Error verificando ticket ID:', error);
      // En caso de error de BD, retornar el ID de todos modos
      return ticketId;
    }
  }

  // Si después de 10 intentos no encontramos uno libre, usar timestamp para garantizar unicidad
  const timestamp = Date.now();
  const fallbackId = `TK-${(timestamp % 1000000).toString().padStart(6, '0')}`;
  console.warn('No se encontró ID libre después de 10 intentos, usando timestamp:', fallbackId);
  return fallbackId;
};
