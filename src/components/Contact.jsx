import React from "react";
import contactoTrabajando from "../assets/contactoTrabajando.avif";
import "./Contact.css";
import "../styles/forms.css";

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
            <label className="form-label">
              Nombre
              <input className="form-input" type="text" name="nombre" required />
            </label>
            <label className="form-label">
              Email
              <input className="form-input" type="email" name="email" required />
            </label>
            <label className="form-label">
              Celular
              <input className="form-input" type="tel" name="celular" />
            </label>
            <label className="form-label">
              Empresa
              <input className="form-input" type="text" name="empresa" />
            </label>
            <label className="form-label">
              Mensaje
              <textarea className="form-textarea" name="mensaje" required />
            </label>
            <button className="form-button" type="submit">Enviar</button>
          </form>
        </div>
        <div className="contact-info-map-row">
          <div className="contact-info-col">
            <div>
              <h3>Dirección</h3>
              <p>Mozart 36, B1619 Garin, <br/>Provincia de Buenos Aires</p>
            </div>
            <div>
              <h3>Horarios de atención</h3>
              <p>Lunes a Viernes de 8:30hs a 18:00hs</p>
            </div>
          </div>
          <div className="contact-map-col">
            <div className="contact-map-container">
              <iframe
                title="Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.964964479839!2d-58.73628268476944!3d-34.42696498049709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9f2e2e2e2e2e%3A0x2e2e2e2e2e2e2e2e!2sMozart%2036%2C%20B1619%20Garin%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sar!4v1690000000000!5m2!1ses-419!2sar"
                className="contact-map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
