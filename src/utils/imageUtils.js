/**
 * Utilidades para manejo de imágenes
 */

/**
 * Genera una URL optimizada para imágenes
 * @param {string} src - Ruta de la imagen
 * @param {Object} options - Opciones de optimización
 * @returns {string} - URL optimizada
 */
export const getOptimizedImageUrl = (src, options = {}) => {
  const { width, height, quality = 80, format = 'webp' } = options;
  
  // Aquí podrías integrar con servicios como Cloudinary, ImageKit, etc.
  // Por ahora devolvemos la URL original
  return src;
};

/**
 * Precarga una imagen
 * @param {string} src - URL de la imagen
 * @returns {Promise} - Promise que se resuelve cuando la imagen carga
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Precarga múltiples imágenes
 * @param {Array} sources - Array de URLs de imágenes
 * @returns {Promise} - Promise que se resuelve cuando todas las imágenes cargan
 */
export const preloadImages = (sources) => {
  return Promise.all(sources.map(preloadImage));
};

/**
 * Obtiene las dimensiones de una imagen
 * @param {string} src - URL de la imagen
 * @returns {Promise<Object>} - Promise con { width, height }
 */
export const getImageDimensions = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
};
