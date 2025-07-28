import React from "react";
import contactoTrabajando from "../assets/contactoTrabajando.avif";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Contacto</h2>
        <div className="contact-row">
          <img
            src={contactoTrabajando}
            alt="Contacto trabajando"
            className="contact-img"
          />
          <form className="contact-form">
            <label>
              Nombre
              <input type="text" name="nombre" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Celular
              <input type="tel" name="celular" />
            </label>
            <label>
              Empresa
              <input type="text" name="empresa" />
            </label>
            <label>
              Mensaje
              <textarea name="mensaje" required />
            </label>
            <button type="submit">Enviar</button>
          </form>
        </div>
        <div className="contact-info-row">
          <div>
            <h3>Dirección</h3>
            <p>Av. Ejemplo 1234, Buenos Aires, Argentina</p>
          </div>
          <div>
            <h3>Horarios de atención</h3>
            <p>Lunes a Viernes: 9:00 a 18:00</p>
          </div>
        </div>
        <div className="contact-map-container">
          <iframe
            title="Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.726234567890!2d-58.456789012345!3d-34.567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM0JzA0LjQiUyA1OMKwMjcnMTYuNSJX!5e0!3m2!1ses-419!2sar!4v1690000000000!5m2!1ses-419!2sar"
            width="100%"
            height="220"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
