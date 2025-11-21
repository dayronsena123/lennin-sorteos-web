import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import ticketRoutes from './routes/tickets.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
  origin: ['https://lennin-sorteos-web.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auto-init DB
import pool from './config/database.js';
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ticket_id VARCHAR(20) UNIQUE NOT NULL,
        nombre VARCHAR(200) NOT NULL,
        dni VARCHAR(8) NOT NULL,
        whatsapp VARCHAR(9) NOT NULL,
        region VARCHAR(100) NOT NULL,
        comprobante_url TEXT NOT NULL,
        monto_detectado DECIMAL(10,2) DEFAULT NULL,
        estado ENUM('aprobado','rechazado','revision') DEFAULT 'revision',
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_dni (dni),
        INDEX idx_ticket_id (ticket_id),
        INDEX idx_estado (estado),
        INDEX idx_fecha (fecha_registro)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('Database initialized (tickets table checked)');
  } catch (err) {
    console.error('Error initializing DB:', err);
  }
};
initDB();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Servir comprobantes
app.use('/uploads', express.static(uploadsDir));

// Rutas
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
