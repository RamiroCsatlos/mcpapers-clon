import { useState } from 'react';
import { validators } from "../../../utils/validators";
import { sendContact } from '../../../utils/api';
import "../../../styles/forms.css"; // Importar estilos globales

const ContactForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return validators.required(value) ? '' : 'El nombre es requerido';
      case 'email':
        if (!validators.required(value)) return 'El email es requerido';
        return validators.email(value) ? '' : 'Email inválido';
      case 'phone':
        return validators.phone(value) ? '' : 'Teléfono inválido';
      case 'message':
        return validators.minLength(10)(value) ? '' : 'El mensaje debe tener al menos 10 caracteres';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validar campo en tiempo real
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit ejecutado'); // <-- PRUEBA RAPIDA
    e.preventDefault();
    // Validar todos los campos
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'company') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    // Si no hay errores, enviar formulario
    if (Object.keys(newErrors).length === 0) {
      setSubmitStatus(null);
      // Mapear los campos al formato que espera el backend
      const backendData = {
        nombre: formData.name,
        email: formData.email,
        celular: formData.phone,
        empresa: formData.company,
        mensaje: formData.message
      };
      console.log('enviando', backendData); // <-- LOG PARA DEPURAR
      try {
        await sendContact(backendData);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } catch (err) {
        setSubmitStatus('error');
      }
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? 'form-input--error' : ''}`}
          placeholder="Tu nombre completo"
          disabled={isLoading}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
          placeholder="tu@email.com"
          disabled={isLoading}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
            placeholder="+54 11 1234-5678"
            disabled={isLoading}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="company" className="form-label">
            Empresa
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="form-input"
            placeholder="Nombre de tu empresa"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
          placeholder="Cuéntanos sobre tu proyecto..."
          rows={5}
          disabled={isLoading}
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" // Usar clase global de botón
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
      {submitStatus === 'success' && (
        <div className="form-success">¡Mensaje enviado correctamente!</div>
      )}
      {submitStatus === 'error' && (
        <div className="form-error">Ocurrió un error al enviar el mensaje.</div>
      )}
    </form>
  );
};

export default ContactForm;
