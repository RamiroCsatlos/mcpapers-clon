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
            <li><a href="#">Equipamiento</a></li>
            <li><a href="#">Novedades</a></li>
            <li><a href="#">Responsabilidad Social</a></li>
            <li><a href="#">Contacto</a></li>
            <li className="dropdown">
              <button onClick={toggleDropdown} className="dropdown-toggle">
                Idioma
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><a href="#">Español</a></li>
                  <li><a href="#">Inglés</a></li>
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
