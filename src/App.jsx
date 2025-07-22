import './App.css'
import Header from './components/Header'
import { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer'
import AnimatedWaveBanner from './components/AnimatedWaveBanner';

const About = lazy(() => import('./components/About'));
const HeroSlider = lazy(() => import('./components/HeroSlider'));
const Products = lazy(() => import('./components/Products'));
import GreenerPack from './components/GreenerPack';

function App() {
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [sliderRef, sliderInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [productsRef, productsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
        {/* <div ref={sliderRef}>
          {sliderInView && <HeroSlider />}
        </div>
        <div ref={productsRef}>
          {productsInView && <Products />}
        </div> */}
        <GreenerPack />
      </Suspense>
    </>
  )
}

export default App
