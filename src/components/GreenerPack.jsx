import './GreenerPack.css';
import greenerImg from '../assets/greenerpackLogoColor.png';

const GreenerPack = () => (
  <section className="greenerpack-section">
    <div className="greenerpack-bg" />
    <div className="greenerpack-content">
      <div className="greenerpack-img-container">
        <a href="/">
            <img src={greenerImg} alt="GreenerPack" className="greenerpack-img" />
        </a>
      </div>
      <div className="greenerpack-text">
        <p>
            Un coating interno para los wraps y flat bags que se realiza con   ceras vegetales biodegradables 100% 
        </p>
      </div>
    </div>
  </section>
);

export default GreenerPack;