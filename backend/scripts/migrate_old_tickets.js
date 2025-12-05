/**
 * Script para migrar tickets antiguos al nuevo formato
 * Cambia TK-ABC123XYZ → TK-000XXX (formato numérico aleatorio)
 */

import pool from '../config/database.js';

async function migrateOldTickets() {
    try {
        console.log('🔄 Iniciando migración de tickets...\n');

        // 1. Obtener todos los tickets con formato antiguo (contienen letras)
        const [oldTickets] = await pool.execute(`
      SELECT ticket_id, id, nombre, apellidos 
      FROM tickets 
      WHERE ticket_id REGEXP '[A-Z]'
      ORDER BY id ASC
    `);

        if (oldTickets.length === 0) {
            console.log('✅ No hay tickets antiguos para migrar. Todos ya están en el nuevo formato.\n');
            process.exit(0);
        }

        console.log(`📊 Encontrados ${oldTickets.length} tickets con formato antiguo:\n`);
        oldTickets.slice(0, 5).forEach(t => {
            console.log(`   ${t.ticket_id} → ${t.nombre} ${t.apellidos || ''}`);
        });
        if (oldTickets.length > 5) {
            console.log(`   ... y ${oldTickets.length - 5} más\n`);
        }

        // 2. Obtener todos los IDs numéricos ya usados
        const [existingNumeric] = await pool.execute(`
      SELECT ticket_id 
      FROM tickets 
      WHERE ticket_id REGEXP '^TK-[0-9]{6}$'
    `);

        const usedNumbers = new Set(
            existingNumeric.map(t => parseInt(t.ticket_id.replace('TK-', '')))
        );

        console.log(`🔢 Números ya usados en el nuevo formato: ${usedNumbers.size}\n`);

        // 3. Generar nuevos IDs únicos para cada ticket antiguo
        const migrations = [];
        for (const ticket of oldTickets) {
            let newNumber;
            let attempts = 0;

            // Buscar un número disponible
            do {
                newNumber = Math.floor(Math.random() * 800) + 1;
                attempts++;
                if (attempts > 1000) {
                    throw new Error('No se encontró un número disponible después de 1000 intentos');
                }
            } while (usedNumbers.has(newNumber));

            usedNumbers.add(newNumber); // Marcar como usado
            const newTicketId = `TK-${newNumber.toString().padStart(6, '0')}`;

            migrations.push({
                oldId: ticket.ticket_id,
                newId: newTicketId,
                dbId: ticket.id
            });
        }

        console.log('🔄 Migraciones preparadas:');
        console.table(migrations.slice(0, 10));
        if (migrations.length > 10) {
            console.log(`   ... y ${migrations.length - 10} más\n`);
        }

        // 4. Confirmar antes de proceder
        console.log('\n⚠️  ¿Proceder con la migración?');
        console.log('   Esta acción actualizará los IDs en la base de datos.\n');

        // Ejecutar migraciones
        let successful = 0;
        let failed = 0;

        for (const migration of migrations) {
            try {
                await pool.execute(
                    'UPDATE tickets SET ticket_id = ? WHERE id = ?',
                    [migration.newId, migration.dbId]
                );
                successful++;
                console.log(`✅ ${migration.oldId} → ${migration.newId}`);
            } catch (error) {
                failed++;
                console.error(`❌ Error migrando ${migration.oldId}:`, error.message);
            }
        }

        console.log('\n📊 Resumen de migración:');
        console.log(`   ✅ Exitosos: ${successful}`);
        console.log(`   ❌ Fallidos: ${failed}`);
        console.log(`   📋 Total: ${migrations.length}\n`);

        // 5. Verificar resultado final
        const [finalStats] = await pool.execute(`
      SELECT 
        CASE 
          WHEN ticket_id REGEXP '^TK-[0-9]{6}$' THEN 'Nuevo formato'
          ELSE 'Formato antiguo'
        END as formato,
        COUNT(*) as cantidad
      FROM tickets
      GROUP BY formato
    `);

        console.log('📊 Estado final de la base de datos:');
        console.table(finalStats);

        console.log('\n✨ ¡Migración completada!\n');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error durante la migración:', error);
        process.exit(1);
    }
}

// Ejecutar
migrateOldTickets();
