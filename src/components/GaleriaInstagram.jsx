import './GaleriaInstagram.css';
import '../styles/scrollAnimations.css';
import { Instagram } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

// Importar las imágenes de Instagram
import instagram1 from '../assets/instagram1.jpg';
import instagram2 from '../assets/instagram2.jpg';
import instagram3 from '../assets/instagram3.jpg';
import instagram4 from '../assets/instagram4.jpg';

const instagramImages = [
  {
    id: 1,
    image: instagram1,
    link: 'https://instagram.com/p/example1',
    alt: 'Post de Instagram 1'
  },
  {
    id: 2,
    image: instagram2,
    link: 'https://instagram.com/p/example2',
    alt: 'Post de Instagram 2'
  },
  {
    id: 3,
    image: instagram3,
    link: 'https://instagram.com/p/example3',
    alt: 'Post de Instagram 3'
  },
  {
    id: 4,
    image: instagram4,
    link: 'https://instagram.com/p/example4',
    alt: 'Post de Instagram 4'
  }
];

function GaleriaInstagram() {
  const [titleRef, titleClasses] = useScrollAnimation({ 
    animationType: 'titleSlide', 
    delay: 100 
  });

  const [galleryRef, galleryClasses] = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 200 
  });

  const [handleRef, handleClasses] = useScrollAnimation({ 
    animationType: 'zoomIn', 
    delay: 400 
  });

  return (
    <section className="instagram-section">
      <div className="instagram-content">
        <h2 ref={titleRef} className={`instagram-title ${titleClasses}`}>¡Seguinos en Instagram!</h2>
        
        <div ref={galleryRef} className={`instagram-gallery ${galleryClasses}`}>
          {instagramImages.map((item) => (
            <div className="instagram-image-card" key={item.id}>
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
          ))}
        </div>
        
        <div ref={handleRef} className={`instagram-handle ${handleClasses}`}>
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
