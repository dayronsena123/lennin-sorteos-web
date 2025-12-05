import Tesseract from 'tesseract.js';

export const processImageOCR = async (imagePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'spa', { logger: m => { } });
    const normalized = text.replace(/\s+/g, ' ').replace(/,/g, '.');

    // Buscar números (precios)
    const numbers = normalized.match(/(\d+(?:\.\d{1,2})?)/g);

    let monto = null;
    let estado = 'revision'; // TODOS los tickets van a revisión para aprobación manual del admin

    if (numbers) {
      const values = numbers.map(n => parseFloat(n));

      // Encontrar el monto más probable (el más cercano a 10)
      const sortedByProximityTo10 = values.sort((a, b) => Math.abs(a - 10) - Math.abs(b - 10));
      const probableMonto = sortedByProximityTo10[0];

      // Guardar el monto detectado, pero SIEMPRE en estado 'revision'
      // El admin decidirá manualmente si aprobar o rechazar
      monto = probableMonto;
      estado = 'revision';
    }

    return { monto, estado, confianza: 'media' };
  } catch (err) {
    console.error('OCR error', err);
    return { monto: null, estado: 'revision', confianza: 'error' };
  }
};
