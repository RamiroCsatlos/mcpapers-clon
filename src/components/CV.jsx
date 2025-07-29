import SectionTitle from "./common/SectionTitle/SectionTitle.jsx";
import CVForm from "./common/CVForm/CVForm.jsx";
import { useRef, useEffect, useState } from "react";
import "./Contact.css";
import contactoCV from "../assets/contactoCV.avif";

const CV = () => {
  const formRef = useRef(null);
  const [imgHeight, setImgHeight] = useState('auto');

  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current) {
        setImgHeight(formRef.current.offsetHeight + 'px');
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <section className="contact-section">
      <div className="contact-container">
        <SectionTitle>Trabajá con nosotros</SectionTitle>
        <div className="contact-row" style={{ flexDirection: "row-reverse" }}>
          <div className="contact-img">
            <img src={contactoCV} alt="CV" style={{ width: "100%", height: imgHeight, objectFit: "cover", borderRadius: "12px" }} />
          </div>
          <div className="contact-form-container" ref={formRef}>
            <CVForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
