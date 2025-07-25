import './App.css'
import './styles/scrollAnimations.css'
import Header from './components/Header'
import { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer'
import AnimatedWaveBanner from './components/AnimatedWaveBanner';
import Slider from './components/Slider';
import Footer from './components/Footer';
import GaleriaInstagram from './components/GaleriaInstagram';
import useScrollAnimation from './hooks/useScrollAnimation';

const About = lazy(() => import('./components/About'));
import GreenerPack from './components/GreenerPack';
import ProductsSection from './components/ProductsSection';
import Equipamiento from './components/Equipamiento';

function App() {
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Hooks para animaciones de scroll
  const [greenerRef, greenerClasses] = useScrollAnimation({ 
    animationType: 'fadeInLeft', 
    delay: 200 
  });
  const [productsRef, productsClasses] = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 300 
  });
  const [sliderRef, sliderClasses] = useScrollAnimation({ 
    animationType: 'scaleIn', 
    delay: 100 
  });
  const [equipamientoRef, equipamientoClasses] = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 200 
  });
  const [galeriaRef, galeriaClasses] = useScrollAnimation({ 
    animationType: 'fadeInRight', 
    delay: 250 
  });

  return (
    <>
      <Header />
      <AnimatedWaveBanner>
        <h1>Predict the future</h1>
        <h2>
          Conectamos tus ideas con la mejor tecnología
        </h2>
      </AnimatedWaveBanner>
      <Suspense fallback={<div>Cargando...</div>}>
        <div ref={aboutRef}>
          {aboutInView && <About />}
        </div>
        <div ref={greenerRef} className={greenerClasses}>
          <GreenerPack />
        </div>
        <div ref={productsRef} className={productsClasses}>
          <ProductsSection />
        </div>
        <div ref={sliderRef} className={sliderClasses}>
          <Slider />
        </div>
        <div ref={equipamientoRef} className={equipamientoClasses}>
          <Equipamiento />
        </div>
        <div ref={galeriaRef} className={galeriaClasses}>
          <GaleriaInstagram />
        </div>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
