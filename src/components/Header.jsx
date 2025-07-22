import './Header.css';
import { useState } from 'react';
import logoHeader from '../assets/logoHeader.png';
import { Menu, X } from 'lucide-react'; // Agrega X a la importación

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'productos', 'equipamiento', 'idioma', o null

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
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
                onMouseEnter={() => setOpenDropdown('productos')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className="dropdown-text">Productos</span>
              </button>
              {openDropdown === 'productos' && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => setOpenDropdown('productos')}
                  onMouseLeave={() => setOpenDropdown(null)}
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
                onMouseEnter={() => setOpenDropdown('equipamiento')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className="dropdown-text">Equipamiento</span>
              </button>
              {openDropdown === 'equipamiento' && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => setOpenDropdown('equipamiento')}
                  onMouseLeave={() => setOpenDropdown(null)}
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
            <li><a href="#">Contacto</a></li>
            <li className="dropdown">
              <button
                className={`dropdown-toggle ${openDropdown === 'idioma' ? 'open' : ''}`}
                onClick={() => handleDropdown('idioma')}
                onMouseEnter={() => setOpenDropdown('idioma')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className="dropdown-text">Idioma</span>
              </button>
              {openDropdown === 'idioma' && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => setOpenDropdown('idioma')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      <img
                        src="/flags/ar.svg"
                        alt="Bandera de Argentina"
                        className="flag-icon"
                      />
                      Español
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      <img
                        src="/flags/us.svg"
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
