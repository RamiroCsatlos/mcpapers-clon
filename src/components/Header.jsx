import './Header.css';
import { useState, useEffect } from 'react';
import logoHeader from '../assets/logoHeader.png';
import flagAR from '../assets/ar.svg';
import flagUS from '../assets/us.svg';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'productos', 'equipamiento', 'idioma', o null
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleMouseEnter = (dropdown) => {
    if (!isMobile) {
      setOpenDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setOpenDropdown(null);
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <a href="/">
          <img src={logoHeader} alt="Logo MC Papers" className="logo-header" />
        </a>

        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#">Nosotros</a></li>
            <li className="dropdown">
              <button
                className={`dropdown-toggle ${openDropdown === 'productos' ? 'open' : ''}`}
                onClick={() => handleDropdown('productos')}
                onMouseEnter={() => handleMouseEnter('productos')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="dropdown-text">Productos</span>
              </button>
              {openDropdown === 'productos' && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => handleMouseEnter('productos')}
                  onMouseLeave={handleMouseLeave}
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      Bolsas Flat
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Bolsas Fondo Cuadrado
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Laminas
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="dropdown">
              <button
                className={`dropdown-toggle ${openDropdown === 'equipamiento' ? 'open' : ''}`}
                onClick={() => handleDropdown('equipamiento')}
                onMouseEnter={() => handleMouseEnter('equipamiento')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="dropdown-text">Equipamiento</span>
              </button>
              {openDropdown === 'equipamiento' && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => handleMouseEnter('equipamiento')}
                  onMouseLeave={handleMouseLeave}
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      Tecnología
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Técnica
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Control de Calidad
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li><a href="#">Novedades</a></li>
            <li><a href="#">Responsabilidad Social</a></li>
            <li className="dropdown">
              <button
                className={`dropdown-toggle ${openDropdown === 'contacto' ? 'open' : ''}`}
                onClick={() => handleDropdown('contacto')}
                onMouseEnter={() => handleMouseEnter('contacto')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="dropdown-text">Contacto</span>
              </button>
              {openDropdown === 'contacto' && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => handleMouseEnter('contacto')}
                  onMouseLeave={handleMouseLeave}
                >
                  <li>
                    <Link to="/contacto" className="dropdown-item">Comunicate con nosotros</Link>
                  </li>
                  <li>
                    <Link to="/cv" className="dropdown-item">Trabajá con nosotros</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="dropdown">
              <button
                className={`dropdown-toggle ${openDropdown === 'idioma' ? 'open' : ''}`}
                onClick={() => handleDropdown('idioma')}
                onMouseEnter={() => handleMouseEnter('idioma')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="dropdown-text">Idioma</span>
              </button>
              {openDropdown === 'idioma' && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => handleMouseEnter('idioma')}
                  onMouseLeave={handleMouseLeave}
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      <img
                        src={flagAR}
                        alt="Bandera de Argentina"
                        className="flag-icon"
                      />
                      Español
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      <img
                        src={flagUS}
                        alt="Bandera de Estados Unidos"
                        className="flag-icon"
                      />
                      Inglés
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
