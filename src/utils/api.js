// src/utils/api.js
// Servicios para interactuar con el backend de contacto, CV y cotización
// Usa fetch y variables de entorno para la URL base

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function sendContact(data) {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error enviando contacto');
  return res.json();
}

export async function sendCV(data) {
  const res = await fetch(`${API_BASE_URL}/api/cv`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
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
