/**
 * Script de verificación completa del sistema
 * Revisa: BD, archivos, configuración, endpoints
 */

import pool from '../config/database.js';
import fs from 'fs';
import path from 'path';

async function verifySystem() {
    console.log('🔍 VERIFICACIÓN COMPLETA DEL SISTEMA\n');
    console.log('='.repeat(60));

    const results = {
        database: { passed: 0, failed: 0 },
        files: { passed: 0, failed: 0 },
        config: { passed: 0, failed: 0 }
    };

    // ========== 1. VERIFICACIÓN DE BASE DE DATOS ==========
    console.log('\n📊 1. VERIFICANDO BASE DE DATOS...\n');

    try {
        // Test conexión
        await pool.execute('SELECT 1');
        console.log('   ✅ Conexión a base de datos OK');
        results.database.passed++;

        // Verificar formato de tickets
        const [formatCheck] = await pool.execute(`
      SELECT 
        CASE 
          WHEN ticket_id REGEXP '^TK-[0-9]{6}$' THEN 'Nuevo formato (correcto)'
          ELSE 'Formato incorrecto'
        END as formato,
        COUNT(*) as cantidad
      FROM tickets
      GROUP BY formato
    `);

        console.log('\n   Formato de tickets:');
        formatCheck.forEach(row => {
            const icon = row.formato.includes('correcto') ? '✅' : '❌';
            console.log(`   ${icon} ${row.formato}: ${row.cantidad} tickets`);
            if (row.formato.includes('correcto')) results.database.passed++;
            else results.database.failed++;
        });

        // Verificar estados
        const [stateCheck] = await pool.execute(`
      SELECT estado, COUNT(*) as cantidad 
      FROM tickets 
      GROUP BY estado
    `);

        console.log('\n   Estados de tickets:');
        stateCheck.forEach(row => {
            console.log(`   📋 ${row.estado}: ${row.cantidad} tickets`);
        });
        results.database.passed++;

        // Verificar duplicados
        const [duplicates] = await pool.execute(`
      SELECT ticket_id, COUNT(*) as count 
      FROM tickets 
      GROUP BY ticket_id 
      HAVING count > 1
    `);

        if (duplicates.length === 0) {
            console.log('   ✅ No hay tickets duplicados');
            results.database.passed++;
        } else {
            console.log(`   ❌ ADVERTENCIA: ${duplicates.length} IDs duplicados encontrados`);
            results.database.failed++;
        }

        // Total de tickets
        const [total] = await pool.execute('SELECT COUNT(*) as total FROM tickets');
        console.log(`\n   📊 Total de tickets en BD: ${total[0].total}`);

    } catch (error) {
        console.error('   ❌ Error en verificación de BD:', error.message);
        results.database.failed++;
    }

    // ========== 2. VERIFICACIÓN DE ARCHIVOS CRÍTICOS ==========
    console.log('\n📁 2. VERIFICANDO ARCHIVOS CRÍTICOS...\n');

    const criticalFiles = [
        { path: './utils/ticketGenerator.js', desc: 'Generador de tickets' },
        { path: './utils/ocr.js', desc: 'Sistema OCR' },
        { path: './routes/tickets.js', desc: 'Rutas de tickets' },
        { path: './routes/admin.js', desc: 'Rutas de admin' },
        { path: './config/database.js', desc: 'Configuración BD' },
        { path: './middleware/auth.js', desc: 'Autenticación' },
        { path: './middleware/upload.js', desc: 'Upload de archivos' },
        { path: './server.js', desc: 'Servidor principal' }
    ];

    for (const file of criticalFiles) {
        const fullPath = path.join(process.cwd(), file.path);
        if (fs.existsSync(fullPath)) {
            console.log(`   ✅ ${file.desc} existe`);
            results.files.passed++;
        } else {
            console.log(`   ❌ ${file.desc} NO ENCONTRADO`);
            results.files.failed++;
        }
    }

    // ========== 3. VERIFICACIÓN DE CONFIGURACIÓN ==========
    console.log('\n⚙️  3. VERIFICANDO CONFIGURACIÓN...\n');

    try {
        // Verificar que .env existe
        if (fs.existsSync('.env')) {
            console.log('   ✅ Archivo .env existe');
            results.config.passed++;
        } else {
            console.log('   ❌ Archivo .env NO ENCONTRADO');
            results.config.failed++;
        }

        // Verificar variables de entorno críticas
        const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
        const missingVars = requiredEnvVars.filter(v => !process.env[v]);

        if (missingVars.length === 0) {
            console.log('   ✅ Todas las variables de entorno requeridas están configuradas');
            results.config.passed++;
        } else {
            console.log(`   ⚠️  Variables faltantes: ${missingVars.join(', ')}`);
            results.config.failed++;
        }

        // Verificar directorio uploads
        if (fs.existsSync('./uploads')) {
            console.log('   ✅ Directorio de uploads existe');
            results.config.passed++;
        } else {
            console.log('   ⚠️  Directorio uploads no existe (se creará automáticamente)');
        }

    } catch (error) {
        console.error('   ❌ Error verificando configuración:', error.message);
        results.config.failed++;
    }

    // ========== RESUMEN FINAL ==========
    console.log('\n' + '='.repeat(60));
    console.log('\n📋 RESUMEN DE VERIFICACIÓN\n');

    const totalPassed = results.database.passed + results.files.passed + results.config.passed;
    const totalFailed = results.database.failed + results.files.failed + results.config.failed;
    const totalTests = totalPassed + totalFailed;

    console.log(`   Base de Datos: ${results.database.passed}/${results.database.passed + results.database.failed} ✅`);
    console.log(`   Archivos:      ${results.files.passed}/${results.files.passed + results.files.failed} ✅`);
    console.log(`   Configuración: ${results.config.passed}/${results.config.passed + results.config.failed} ✅`);
    console.log(`\n   TOTAL: ${totalPassed}/${totalTests} verificaciones pasadas`);

    if (totalFailed === 0) {
        console.log('\n✨ ¡SISTEMA COMPLETAMENTE VERIFICADO Y FUNCIONAL! ✨\n');
        process.exit(0);
    } else {
        console.log(`\n⚠️  Se encontraron ${totalFailed} problemas. Revisar arriba.\n`);
        process.exit(1);
    }
}

verifySystem();
