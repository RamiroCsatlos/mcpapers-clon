import { useState } from "react";
import "../../../styles/forms.css";
import { sendCV } from '../../../utils/api';

const CVForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
    archivo: null,
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "nombre":
        return value ? "" : "El nombre es requerido";
      case "email":
        return /.+@.+\..+/.test(value) ? "" : "Email inválido";
      case "telefono":
        return value.length > 6 ? "" : "Teléfono inválido";
      case "mensaje":
        return value.length >= 10 ? "" : "El mensaje debe tener al menos 10 caracteres";
      case "archivo":
        return value ? "" : "Adjunta tu CV";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "archivo" ? files[0] : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, name === "archivo" ? files[0] : value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setSubmitStatus(null);
      try {
        // Crear FormData para enviar archivo
        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('email', formData.email);
        data.append('celular', formData.telefono);
        data.append('mensaje', formData.mensaje);
        data.append('archivo', formData.archivo);
        // Enviar al backend
        await sendCV(data);
        setSubmitStatus('success');
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '', archivo: null });
      } catch (err) {
        setSubmitStatus('error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label htmlFor="nombre" className="form-label">Nombre *</label>
        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className={`form-input ${errors.nombre ? "form-input--error" : ""}`} placeholder="Tu nombre completo" disabled={isLoading} />
        {errors.nombre && <span className="form-error">{errors.nombre}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email *</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`form-input ${errors.email ? "form-input--error" : ""}`} placeholder="tu@email.com" disabled={isLoading} />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="telefono" className="form-label">Teléfono *</label>
        <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className={`form-input ${errors.telefono ? "form-input--error" : ""}`} placeholder="+54 11 1234-5678" disabled={isLoading} />
        {errors.telefono && <span className="form-error">{errors.telefono}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="mensaje" className="form-label">Mensaje *</label>
        <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} className={`form-textarea ${errors.mensaje ? "form-input--error" : ""}`} placeholder="Contanos sobre tu experiencia..." rows={5} disabled={isLoading} />
        {errors.mensaje && <span className="form-error">{errors.mensaje}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="archivo" className="form-label">Adjuntar CV *</label>
        <input type="file" id="archivo" name="archivo" accept=".pdf,.doc,.docx" onChange={handleChange} className={`form-input ${errors.archivo ? "form-input--error" : ""}`} disabled={isLoading} />
        {errors.archivo && <span className="form-error">{errors.archivo}</span>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar CV"}
      </button>
      {submitStatus === "success" && <div className="form-success">¡CV enviado correctamente!</div>}
      {submitStatus === "error" && <div className="form-error">Ocurrió un error al enviar el CV.</div>}
    </form>
  );
};

export default CVForm;
