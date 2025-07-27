/**
 * Utilidades para formateo de datos
 */

/**
 * Formatea números con separadores de miles
 * @param {number} number - Número a formatear
 * @param {string} locale - Locale para el formateo (default: 'es-AR')
 * @returns {string} - Número formateado
 */
export const formatNumber = (number, locale = 'es-AR') => {
  return new Intl.NumberFormat(locale).format(number);
};

/**
 * Formatea texto para URLs (slug)
 * @param {string} text - Texto a formatear
 * @returns {string} - Texto formateado para URL
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales
    .replace(/[\s_-]+/g, '-') // Reemplaza espacios y guiones con un solo guión
    .replace(/^-+|-+$/g, ''); // Elimina guiones al inicio y final
};

/**
 * Trunca texto con elipsis
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @param {string} ellipsis - Caracteres de elipsis (default: '...')
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength, ellipsis = '...') => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
};

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} text - Texto a capitalizar
 * @returns {string} - Texto capitalizado
 */
export const capitalizeWords = (text) => {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Extrae initiales de un nombre
 * @param {string} name - Nombre completo
 * @param {number} maxInitials - Máximo de iniciales (default: 2)
 * @returns {string} - Iniciales
 */
export const getInitials = (name, maxInitials = 2) => {
  return name
    .split(' ')
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};
