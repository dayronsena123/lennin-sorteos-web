import Tesseract from 'tesseract.js';

export const processImageOCR = async (imagePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'spa', { logger: m => { } });
    const normalized = text.replace(/\s+/g, ' ').replace(/,/g, '.');

    // Buscar números (precios)
    const numbers = normalized.match(/(\d+(?:\.\d{1,2})?)/g);

    let monto = null;
    let estado = 'revision'; // Por defecto a revisión

    if (numbers) {
      const values = numbers.map(n => parseFloat(n));

      // Encontrar el monto más probable (el más cercano a 10)
      const sortedByProximityTo10 = values.sort((a, b) => Math.abs(a - 10) - Math.abs(b - 10));
      const probableMonto = sortedByProximityTo10[0];

      // VALIDACIÓN MEJORADA:
      // Si el monto está entre 9.50 y 10.50 → Válido (va a revisión manual)
      if (probableMonto >= 9.50 && probableMonto <= 10.50) {
        monto = probableMonto;
        estado = 'revision'; // Admin debe verificar que sea real
      }
      // Si el monto es MENOR a 9.50 → RECHAZADO AUTOMÁTICO
      else if (probableMonto < 9.50) {
        monto = probableMonto;
        estado = 'rechazado'; // Monto insuficiente
      }
      // Si el monto es MAYOR a 10.50 → Revisión (puede ser válido con propina)
      else if (probableMonto > 10.50) {
        monto = probableMonto;
        estado = 'revision'; // Puede ser válido (ej: 10 + propina)
      }
    }

    return { monto, estado, confianza: 'media' };
  } catch (err) {
    console.error('OCR error', err);
    return { monto: null, estado: 'revision', confianza: 'error' };
  }
};
