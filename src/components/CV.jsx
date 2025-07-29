import SectionTitle from "./common/SectionTitle/SectionTitle.jsx";
import CVForm from "./common/CVForm/CVForm.jsx";
import useContactAnimations from "../hooks/useContactAnimations";
import { useEffect, useState } from "react";
import "./Contact.css";
import contactoCV from "../assets/contactoCV.avif";

const CV = () => {
  const {
    titleRef, titleInView,
    imgRef, imgInView,
    formRef, formInView
  } = useContactAnimations();
  const [imgHeight, setImgHeight] = useState('auto');

  // Sincronizar altura de imagen con el formulario
  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current) {
        setImgHeight(formRef.current.offsetHeight + 'px');
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [formRef]);

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 ref={titleRef} className={`contact-title fade-in-up${titleInView ? ' fade-in-visible' : ''}`}>Trabajá con nosotros</h2>
        <div className="contact-row" style={{ flexDirection: "row-reverse" }}>
          <img
            ref={imgRef}
            src={contactoCV}
            alt="CV"
            className={`contact-img scale-in${imgInView ? ' fade-in-visible' : ''}`}
            style={{ width: "100%", height: imgHeight, objectFit: "cover", borderRadius: "12px" }}
          />
          <div ref={formRef} className={`contact-form-container scale-in${formInView ? ' fade-in-visible' : ''}`}>
            <CVForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
