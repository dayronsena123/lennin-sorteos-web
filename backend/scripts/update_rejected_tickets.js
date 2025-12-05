/**
 * Script para actualizar tickets rechazados a estado 'revision'
 * Ejecutar con: node scripts/update_rejected_tickets.js
 */

import pool from '../config/database.js';

async function updateRejectedTickets() {
    try {
        console.log('🔄 Conectando a la base de datos...');

        // Primero, ver cuántos tickets hay en cada estado
        const [beforeStats] = await pool.execute(`
      SELECT estado, COUNT(*) as cantidad 
      FROM tickets 
      GROUP BY estado
    `);

        console.log('\n📊 Estado ANTES de la actualización:');
        console.table(beforeStats);

        // Actualizar tickets rechazados a revisión
        const [result] = await pool.execute(`
      UPDATE tickets 
      SET estado = 'revision' 
      WHERE estado = 'rechazado'
    `);

        console.log(`\n✅ Tickets actualizados: ${result.affectedRows}`);

        // Ver el estado después
        const [afterStats] = await pool.execute(`
      SELECT estado, COUNT(*) as cantidad 
      FROM tickets 
      GROUP BY estado
    `);

        console.log('\n📊 Estado DESPUÉS de la actualización:');
        console.table(afterStats);

        console.log('\n✨ ¡Actualización completada exitosamente!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error al actualizar tickets:', error);
        process.exit(1);
    }
}

// Ejecutar
updateRejectedTickets();
