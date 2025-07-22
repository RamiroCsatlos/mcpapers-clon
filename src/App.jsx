import './App.css'
import Header from './components/Header'
import { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer'

const About = lazy(() => import('./components/About'));
const HeroSlider = lazy(() => import('./components/HeroSlider'));
const Products = lazy(() => import('./components/Products'));

function App() {
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [sliderRef, sliderInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [productsRef, productsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Header />
      <Suspense fallback={<div>Cargando...</div>}>
        <div ref={aboutRef}>
          {aboutInView && <About />}
        </div>
        <div ref={sliderRef}>
          {sliderInView && <HeroSlider />}
        </div>
        <div ref={productsRef}>
          {productsInView && <Products />}
        </div>
      </Suspense>
    </>
  )
}

export default App
