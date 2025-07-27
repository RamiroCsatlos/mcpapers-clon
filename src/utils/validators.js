/**
 * Utilidades para validaciones
 */

/**
 * Valida una dirección de email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida un número de teléfono argentino
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - True si es válido
 */
export const isValidArgentinePhone = (phone) => {
  // Formato: +54 9 11 1234-5678 o variaciones
  const phoneRegex = /^(\+54\s?)?(\d{2,4}\s?)?\d{4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valida que un string no esté vacío
 * @param {string} value - Valor a validar
 * @param {number} minLength - Longitud mínima (default: 1)
 * @returns {boolean} - True si es válido
 */
export const isValidString = (value, minLength = 1) => {
  return typeof value === 'string' && value.trim().length >= minLength;
};

/**
 * Valida un rango numérico
 * @param {number} value - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} - True si está en el rango
 */
export const isInRange = (value, min, max) => {
  return typeof value === 'number' && value >= min && value <= max;
};

/**
 * Valida una URL
 * @param {string} url - URL a validar
 * @returns {boolean} - True si es válida
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Conjunto de validaciones para formularios
 */
export const validators = {
  required: (value) => isValidString(value),
  email: (value) => isValidEmail(value),
  phone: (value) => isValidArgentinePhone(value),
  minLength: (minLength) => (value) => isValidString(value, minLength),
  maxLength: (maxLength) => (value) => typeof value === 'string' && value.length <= maxLength,
  url: (value) => isValidUrl(value)
};
