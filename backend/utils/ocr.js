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

      // Si encuentra 10 (o cercano), es válido pero va a revisión
      if (values.some(v => Math.abs(v - 10) < 0.5)) {
        monto = 10.00;
        estado = 'revision';
      }
      // Si encuentra 5 (y no 10), rechazar automáticamente
      else if (values.some(v => Math.abs(v - 5) < 0.5)) {
        monto = 5.00;
        estado = 'rechazado';
      }
    }

    return { monto, estado, confianza: 'media' };
  } catch (err) {
    console.error('OCR error', err);
    return { monto: null, estado: 'revision', confianza: 'error' };
  }
};
