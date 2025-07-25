import './GreenerPack.css';
import '../styles/scrollAnimations.css';
import greenerImg from '../assets/greenerpackLogoColor.png';
import useScrollAnimation from '../hooks/useScrollAnimation';

const GreenerPack = () => {
  const [imageRef, imageClasses] = useScrollAnimation({ 
    animationType: 'scaleIn', 
    delay: 100 
  });
  const [textRef, textClasses] = useScrollAnimation({ 
    animationType: 'fadeInRight', 
    delay: 300 
  });

  return (
    <section className="greenerpack-section">
      <div className="greenerpack-bg" />
      <div className="greenerpack-content">
        <div ref={imageRef} className={`greenerpack-img-container ${imageClasses}`}>
          <a href="/">
              <img src={greenerImg} alt="GreenerPack" className="greenerpack-img" />
          </a>
        </div>
        <div ref={textRef} className={`greenerpack-text ${textClasses}`}>
          <p>
              Un coating interno para los wraps y flat bags que se realiza con ceras vegetales biodegradables 100% 
          </p>
        </div>
      </div>
    </section>
  );
};

export default GreenerPack;