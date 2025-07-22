import './Header.css';
import { useState } from 'react';
import logoHeader from '../assets/logoHeader.png';
import { Menu } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="header">
      <div className="header-inner">
        <img src={logoHeader} alt="Logo MC Papers" className="logo-header" />

        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Productos</a></li>
            <li className="dropdown">
              <button
                className={`dropdown-toggle ${isDropdownOpen ? 'open' : ''}`}
                onClick={toggleDropdown}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                Productos
              </button>
              {isDropdownOpen && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
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
                className={`dropdown-toggle ${isDropdownOpen ? 'open' : ''}`}
                onClick={toggleDropdown}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                Equipamiento
              </button>
              {isDropdownOpen && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      Tecnología
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Tecnica
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
                className={`dropdown-toggle ${isDropdownOpen ? 'open' : ''}`}
                onClick={toggleDropdown}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                Idioma
              </button>
              {isDropdownOpen && (
                <ul
                  className="dropdown-menu"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
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
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}

export default Header;
