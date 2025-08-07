// src/utils/api.js
// Servicios para interactuar con el backend de contacto, CV y cotización
// Usa fetch y variables de entorno para la URL base

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function sendContact(data) {
  try {
    // Intentar el backend real
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }
    
    const result = await res.json();
    return result;
  } catch (error) {
    // Fallback para GitHub Pages cuando el backend no esté disponible
    if (window.location.hostname === 'ramirocsatlos.github.io' && error.message.includes('fetch')) {
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        message: 'Mensaje enviado correctamente (simulado - backend no accesible)',
        id: Date.now()
      };
    }
    
    throw error;
  }
}

export async function sendCV(data) {
  const res = await fetch(`${API_BASE_URL}/api/cv`, {
    method: 'POST',
    body: data, // FormData
  });
  if (!res.ok) throw new Error('Error enviando CV');
  return res.json();
}

export async function sendQuote(data) {
  const res = await fetch(`${API_BASE_URL}/api/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error enviando cotización');
  return res.json();
}
