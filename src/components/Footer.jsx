import './Footer.css';
import logoHeader from '../assets/logoHeader.png';
import { Instagram, Linkedin, X } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="/mcpapers-clon/">
          <img src={logoHeader} alt="Logo MC Papers" className="logo-footer" />
        </a>

        <div className="social-links">
          <a 
            href="https://www.instagram.com/mcpapersargentina/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link instagram"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/company/mc-paper-s-argentina-s-a" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link linkedin"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="https://x.com/Mcpapersar72677" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link twitter"
            aria-label="X (Twitter)"
          >
            <X size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
