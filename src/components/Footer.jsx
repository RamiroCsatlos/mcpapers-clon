import './Footer.css';
import '../styles/scrollAnimations.css';
import logoHeader from '../assets/logoHeader.png';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

function Footer() {
  const [footerRef, footerClasses] = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 100 
  });

  return (
    <footer ref={footerRef} className={`footer ${footerClasses}`}>
      <div className="footer-inner">
        <a href="/">
          <img src={logoHeader} alt="Logo MC Papers" className="logo-footer" />
        </a>

        <div className="social-links">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link instagram"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link linkedin"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="https://x.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link twitter"
            aria-label="X (Twitter)"
          >
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
