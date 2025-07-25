import './App.css'
import Header from './components/Header'
import { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer'
import AnimatedWaveBanner from './components/AnimatedWaveBanner';
import Slider from './components/Slider';
import Footer from './components/Footer';
import GaleriaInstagram from './components/GaleriaInstagram';
import ResponsabilidadSocial from './components/ResponsabilidadSocial';

const About = lazy(() => import('./components/About'));
import GreenerPack from './components/GreenerPack';
import ProductsSection from './components/ProductsSection';
import Equipamiento from './components/Equipamiento';

function App() {
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
        <GreenerPack />
        <ProductsSection />
        <Slider />
        <Equipamiento />
        <GaleriaInstagram />
        <ResponsabilidadSocial />
      </Suspense>
      <Footer />
    </>
  )
}

export default App
