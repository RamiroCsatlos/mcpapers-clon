import './Header.css';
import { useState } from 'react';
import logoHeader from '../assets/logoHeader.png';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIdiomaOpen, setIsIdiomaOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleIdioma = () => setIsIdiomaOpen(!isIdiomaOpen);

  return (
    <header className="header">
      <div className="header-inner">
        <img src={logoHeader} alt="Logo MC Papers" className="logo-header" />

        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Equipamiento</a></li>
            <li><a href="#">Novedades</a></li>
            <li><a href="#">Responsabilidad Social</a></li>

            {/* Dropdown con toggle */}
            <li className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={toggleIdioma}
                aria-expanded={isIdiomaOpen}
                aria-controls="submenu-idioma"
              >
                Idioma ▾
              </button>
              <ul
                id="submenu-idioma"
                className={`dropdown-menu ${isIdiomaOpen ? 'open' : ''}`}
              >
                <li><a href="#">Español</a></li>
                <li><a href="#">Inglés</a></li>
                <li><a href="#">Portugués</a></li>
              </ul>
            </li>

            <li><a href="#">Contacto</a></li>
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
