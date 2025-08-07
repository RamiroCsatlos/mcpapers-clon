import './Header.css';
import { useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import { useImagePreloader } from './ImagePreloader';
import logoHeader from '../assets/logoHeader.png';
import flagAR from '../assets/ar.svg';
import flagUS from '../assets/us.svg';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  // Precargar assets críticos del header
  useImagePreloader([logoHeader, flagAR, flagUS], 'high');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'productos', 'equipamiento', 'idioma', o null
  const isMobile = useIsMobile(900);

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
        <a href="/mcpapers-clon/">
          <img src={logoHeader} alt="Logo MC Papers" className="logo-header" />
        </a>

        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/nosotros" className="navbar-link">Nosotros</Link>
            </li>
            <li className="dropdown">
              <div
                className="dropdown-toggle-wrapper"
                onMouseEnter={() => handleMouseEnter('productos')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/productos" className="dropdown-text navbar-link">Productos</Link>
                <button
                  className={`dropdown-toggle ${openDropdown === 'productos' ? 'open' : ''}`}
                  onClick={() => handleDropdown('productos')}
                  aria-label="Abrir menú de productos"
                />
              </div>
              {openDropdown === 'productos' && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => handleMouseEnter('productos')}
                  onMouseLeave={handleMouseLeave}
                >
                  <li>
                    <Link to="/bolsas-flat" className="dropdown-item">
                      Bolsas Flat
                    </Link>
                  </li>
                  <li>
                    <Link to="/bolsas-cuadrado" className="dropdown-item">
                      Bolsas Fondo Cuadrado
                    </Link>
                  </li>
                  <li>
                    <Link to="/laminas" className="dropdown-item">
                      Laminas
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="dropdown">
              <div
                className="dropdown-toggle-wrapper"
                onMouseEnter={() => handleMouseEnter('equipamiento')}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/equipamiento" className="dropdown-text navbar-link">Equipamiento</Link>
                <button
                  className={`dropdown-toggle ${openDropdown === 'equipamiento' ? 'open' : ''}`}
                  onClick={() => handleDropdown('equipamiento')}
                  aria-label="Abrir menú de equipamiento"
                />
              </div>
              {openDropdown === 'equipamiento' && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => handleMouseEnter('equipamiento')}
                  onMouseLeave={handleMouseLeave}
                >
                  <li>
                    <Link to="/tecnologia" className="dropdown-item">
                      Tecnología
                    </Link>
                  </li>
                  <li>
                    <Link to="/tecnica" className="dropdown-item">
                      Técnica
                    </Link>
                  </li>
                  <li>
                    <Link to="/control-calidad" className="dropdown-item">
                      Control de Calidad
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/novedades" className="navbar-link">Novedades</Link>
            </li>
            <li>
              <Link to="/responsabilidad-social" className="navbar-link">Responsabilidad Social</Link>
            </li>
            <li className="dropdown">
              <div
                className="dropdown-toggle-wrapper"
                onMouseEnter={() => handleMouseEnter('contacto')}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#contacto" className="dropdown-text navbar-link">Contacto</a>
                <button
                  className={`dropdown-toggle ${openDropdown === 'contacto' ? 'open' : ''}`}
                  onClick={() => handleDropdown('contacto')}
                  aria-label="Abrir menú de contacto"
                />
              </div>
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
              <div
                className="dropdown-toggle-wrapper"
                onMouseEnter={() => handleMouseEnter('idioma')}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#idioma" className="dropdown-text navbar-link">Idioma</a>
                <button
                  className={`dropdown-toggle ${openDropdown === 'idioma' ? 'open' : ''}`}
                  onClick={() => handleDropdown('idioma')}
                  aria-label="Abrir menú de idioma"
                />
              </div>
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
