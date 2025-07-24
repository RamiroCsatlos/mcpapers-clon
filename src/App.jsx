import './App.css'
import Header from './components/Header'
import { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer'
import AnimatedWaveBanner from './components/AnimatedWaveBanner';
import Slider from './components/Slider';

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
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Predict the future</h1>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 400, margin: 0 }}>
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
      </Suspense>
    </>
  )
}

export default App
