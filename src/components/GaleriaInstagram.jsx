import './GaleriaInstagram.css';
import './ScrollAnimations.css';
import { Instagram } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Importar las imágenes de Instagram
import instagram1 from '../assets/instagram1.jpg';
import instagram2 from '../assets/instagram2.jpg';
import instagram3 from '../assets/instagram3.jpg';
import instagram4 from '../assets/instagram4.jpg';

const instagramImages = [
  {
    id: 1,
    image: instagram1,
    link: 'https://www.instagram.com/mcpapersargentina/p/DLVeerDP7rr/',
    alt: 'Post de Instagram 1'
  },
  {
    id: 2,
    image: instagram2,
    link: 'https://www.instagram.com/mcpapersargentina/p/DCXMF8yvErH/',
    alt: 'Post de Instagram 2'
  },
  {
    id: 3,
    image: instagram3,
    link: 'https://www.instagram.com/mcpapersargentina/p/C_TiD8CSugd/',
    alt: 'Post de Instagram 3'
  },
  {
    id: 4,
    image: instagram4,
    link: 'https://www.instagram.com/mcpapersargentina/p/C_OMTSfOfcS/',
    alt: 'Post de Instagram 4'
  }
];

function GaleriaInstagram() {
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const { ref: handleRef, inView: handleInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section className="instagram-section">
      <div className="instagram-content">
        <h2 
          ref={titleRef}
          className={`instagram-title fade-in-up ${titleInView ? 'fade-in-visible' : ''}`}
        >
          ¡Seguinos en Instagram!
        </h2>
        
        <div className="instagram-gallery">
          {instagramImages.map((item, idx) => {
            // Hook individual para cada imagen de Instagram
            const { ref: imageRef, inView: imageInView } = useInView({
              threshold: 0.2,
              triggerOnce: true
            });

            return (
              <div 
                ref={imageRef}
                className={`instagram-image-card scale-in animation-delay-${(idx + 1) * 200} ${imageInView ? 'fade-in-visible' : ''}`} 
                key={item.id}
              >
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="instagram-image-link"
                >
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    className="instagram-image" 
                  />
                  <div className="instagram-overlay">
                    <div className="instagram-icon">📷</div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
        
        <div 
          ref={handleRef}
          className={`instagram-handle fade-in-up animation-delay-800 ${handleInView ? 'fade-in-visible' : ''}`}
        >
          <a 
            href="https://instagram.com/mcpapersargentina" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-handle-link"
          >
            <Instagram size={48} className="instagram-handle-icon" />
            @MCPAPERSARGENTINA
          </a>
        </div>
      </div>
    </section>
  );
}

export default GaleriaInstagram;
