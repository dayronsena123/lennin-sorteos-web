/**
 * Script para verificar la generación de tickets aleatorios
 * Prueba generar 20 tickets y muestra los resultados
 */

import { generateTicketID } from '../utils/ticketGenerator.js';

async function testTicketGeneration() {
    console.log('🎫 Probando generación de tickets aleatorios...\n');

    const tickets = [];
    const duplicates = new Set();

    for (let i = 0; i < 20; i++) {
        try {
            const ticketId = await generateTicketID();

            // Verificar si es duplicado
            if (tickets.includes(ticketId)) {
                duplicates.add(ticketId);
                console.log(`⚠️  Duplicado detectado: ${ticketId}`);
            }

            tickets.push(ticketId);
            console.log(`✅ Ticket ${i + 1}: ${ticketId}`);
        } catch (error) {
            console.error(`❌ Error generando ticket ${i + 1}:`, error.message);
        }
    }

    console.log('\n📊 Resultados:');
    console.log(`   Total generados: ${tickets.length}`);
    console.log(`   Únicos: ${new Set(tickets).size}`);
    console.log(`   Duplicados: ${duplicates.size}`);

    console.log('\n🔍 Verificando formato:');
    const formatCorrect = tickets.every(t => /^TK-\d{6}$/.test(t));
    console.log(`   Formato correcto (TK-XXXXXX): ${formatCorrect ? '✅' : '❌'}`);

    console.log('\n🔢 Verificando rango (1-800):');
    const numbers = tickets.map(t => parseInt(t.replace('TK-', '')));
    const inRange = numbers.every(n => n >= 1 && n <= 800);
    console.log(`   Todos en rango 1-800: ${inRange ? '✅' : '❌'}`);
    console.log(`   Mínimo: ${Math.min(...numbers)}`);
    console.log(`   Máximo: ${Math.max(...numbers)}`);

    console.log('\n✨ Prueba completada!\n');
    process.exit(0);
}

testTicketGeneration();
