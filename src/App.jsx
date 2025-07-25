import './App.css'
import './styles/scrollAnimations.css'
import './styles/loadingOptimizations.css'
import Header from './components/Header'
import { Suspense, lazy } from 'react';
import AnimatedWaveBanner from './components/AnimatedWaveBanner';
import Footer from './components/Footer';
import useScrollAnimation from './hooks/useScrollAnimation';

// About también será normal, sin lazy loading
import About from './components/About';
import GreenerPack from './components/GreenerPack';
import ProductsSection from './components/ProductsSection';
import Slider from './components/Slider';
import Equipamiento from './components/Equipamiento';
import GaleriaInstagram from './components/GaleriaInstagram';

function App() {
  // Los hooks de animación ahora se pasarán a los componentes internos
  // Los contenedores principales (con fondos) no tendrán animaciones
  
  return (
    <>
      <Header />
      <AnimatedWaveBanner>
        <h1>Predict the future</h1>
        <h2>
          Conectamos tus ideas con la mejor tecnología
        </h2>
      </AnimatedWaveBanner>
      {/* About - sin animación en el contenedor */}
      <About />
      {/* GreenerPack - sin animación en el contenedor, ya tiene animaciones internas */}
      <GreenerPack />
      {/* ProductsSection - sin animación en el contenedor, ya tiene animaciones internas */}
      <ProductsSection />
      {/* Slider - agregar animación interna */}
      <Slider />
      {/* Equipamiento - agregar animación interna */}
      <Equipamiento />
      {/* GaleriaInstagram - agregar animación interna */}
      <GaleriaInstagram />
      <Footer />
    </>
  )
}

export default App
