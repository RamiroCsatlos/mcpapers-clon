import SectionTitle from "./common/SectionTitle/SectionTitle.jsx";
import CVForm from "./common/CVForm/CVForm.jsx";
import "./Contact.css";
import contactoCV from "../assets/contactoCV.avif";

const CV = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <SectionTitle>Trabajá con nosotros</SectionTitle>
        <div className="contact-row" style={{ flexDirection: "row-reverse" }}>
          <div className="contact-img">
            <img src={contactoCV} alt="CV" style={{ width: "100%", borderRadius: "12px" }} />
          </div>
          <div className="contact-form-container">
            <CVForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
