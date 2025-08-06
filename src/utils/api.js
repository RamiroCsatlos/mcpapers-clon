// src/utils/api.js
// Servicios para interactuar con el backend de contacto, CV y cotización
// Usa fetch y variables de entorno para la URL base

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function sendContact(data) {
  try {
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('Enviando a:', `${API_BASE_URL}/api/contact`);
    console.log('Datos a enviar:', data);
    
    // Intentar el backend real
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });
    
    console.log('Response status:', res.status);
    console.log('Response ok:', res.ok);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error del servidor:', errorText);
      throw new Error(`Error ${res.status}: ${errorText}`);
    }
    
    const result = await res.json();
    console.log('Respuesta exitosa del backend real:', result);
    return result;
  } catch (error) {
    console.error('Error en sendContact:', error);
    console.error('Error tipo:', error.name);
    console.error('Error mensaje:', error.message);
    
    // Fallback para GitHub Pages cuando el backend no esté disponible
    if (window.location.hostname === 'ramirocsatlos.github.io' && error.message.includes('fetch')) {
      console.log('FALLBACK: Backend no accesible desde GitHub Pages, usando simulación');
      
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
