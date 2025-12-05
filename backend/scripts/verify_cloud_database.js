/**
 * Script para verificar conexión a base de datos en la nube
 * Y confirmar que los tickets estén en el formato correcto
 */

import pool from '../config/database.js';

async function verifyCloudDatabase() {
    try {
        console.log('🌐 VERIFICANDO BASE DE DATOS EN LA NUBE...\n');
        console.log('='.repeat(60));

        // 1. Test de conexión
        console.log('\n📡 1. Probando conexión...');
        const [connection] = await pool.execute('SELECT 1 as test');
        console.log('   ✅ Conexión exitosa a la base de datos');

        // 2. Verificar información de la BD
        console.log('\n📊 2. Información de la base de datos:');
        const [dbInfo] = await pool.execute('SELECT DATABASE() as db_name');
        console.log(`   Base de datos: ${dbInfo[0].db_name}`);

        // 3. Total de tickets
        const [totalCount] = await pool.execute('SELECT COUNT(*) as total FROM tickets');
        console.log(`\n📋 3. Total de tickets: ${totalCount[0].total}`);

        // 4. Verificar formato de tickets
        const [formatCheck] = await pool.execute(`
      SELECT 
        CASE 
          WHEN ticket_id REGEXP '^TK-[0-9]{6}$' THEN 'Formato Nuevo (TK-000XXX)'
          ELSE 'Formato Antiguo'
        END as formato,
        COUNT(*) as cantidad,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM tickets), 2) as porcentaje
      FROM tickets
      GROUP BY formato
    `);

        console.log('\n🎫 4. Formato de tickets:');
        console.table(formatCheck);

        // 5. Distribución por estado
        const [stateDistribution] = await pool.execute(`
      SELECT estado, COUNT(*) as cantidad
      FROM tickets
      GROUP BY estado
      ORDER BY cantidad DESC
    `);

        console.log('\n📈 5. Distribución por estado:');
        console.table(stateDistribution);

        // 6. Últimos 5 tickets creados
        const [recentTickets] = await pool.execute(`
      SELECT ticket_id, nombre, estado, DATE_FORMAT(fecha_registro, '%Y-%m-%d %H:%i') as fecha
      FROM tickets
      ORDER BY fecha_registro DESC
      LIMIT 5
    `);

        console.log('\n🆕 6. Últimos 5 tickets registrados:');
        console.table(recentTickets);

        // 7. Verificar duplicados
        const [duplicates] = await pool.execute(`
      SELECT ticket_id, COUNT(*) as count
      FROM tickets
      GROUP BY ticket_id
      HAVING count > 1
    `);

        console.log('\n🔍 7. Verificación de duplicados:');
        if (duplicates.length === 0) {
            console.log('   ✅ No hay tickets duplicados');
        } else {
            console.log(`   ❌ ADVERTENCIA: ${duplicates.length} IDs duplicados`);
            console.table(duplicates);
        }

        // Resumen final
        console.log('\n' + '='.repeat(60));
        console.log('\n✅ RESUMEN:');

        const allNewFormat = formatCheck.every(f => f.formato.includes('Nuevo'));
        const noDuplicates = duplicates.length === 0;

        if (allNewFormat && noDuplicates) {
            console.log('   ✅ Base de datos en la nube 100% correcta');
            console.log('   ✅ Todos los tickets en formato TK-000XXX');
            console.log('   ✅ Sin duplicados');
            console.log('\n🚀 LISTA PARA PRODUCCIÓN\n');
            process.exit(0);
        } else {
            console.log('   ⚠️  Se encontraron algunos problemas (ver arriba)\n');
            process.exit(1);
        }

    } catch (error) {
        console.error('\n❌ Error conectando a la base de datos:', error.message);
        console.error('\n💡 Verifica que:');
        console.error('   - Las credenciales en .env sean correctas');
        console.error('   - Railway esté activo');
        console.error('   - Tengas conexión a internet\n');
        process.exit(1);
    }
}

verifyCloudDatabase();
