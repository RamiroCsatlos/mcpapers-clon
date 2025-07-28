import './App.css'
import Header from './components/Header'
import AnimatedWaveBanner from './components/AnimatedWaveBanner';
import LazySection from './components/LazySection';
import LoadingSpinner from './components/LoadingSpinner';
import { Suspense, lazy } from 'react';
import Footer from './components/Footer';

// Lazy load de los componentes principales
import About from './components/About';
const GreenerPack = lazy(() => import('./components/GreenerPack'));
const ProductsSection = lazy(() => import('./components/ProductsSection'));
const Equipamiento = lazy(() => import('./components/Equipamiento'));
const Slider = lazy(() => import('./components/Slider'));
const GaleriaInstagram = lazy(() => import('./components/GaleriaInstagram'));
const ResponsabilidadSocial = lazy(() => import('./components/ResponsabilidadSocial'));

function App() {
  return (
    <>
      <Header />
      <AnimatedWaveBanner>
        <h1>Predict the future</h1>
        <h2>
          Conectamos tus ideas con la mejor tecnología
        </h2>
      </AnimatedWaveBanner>
      
      <About />

      <LazySection rootMargin="200px">
        <Suspense fallback={<LoadingSpinner />}>
          <GreenerPack />
        </Suspense>
      </LazySection>

      <LazySection rootMargin="200px">
        <Suspense fallback={<LoadingSpinner />}>
          <ProductsSection />
        </Suspense>
      </LazySection>

      <LazySection rootMargin="200px">
        <Suspense fallback={<LoadingSpinner />}>
          <Slider />
        </Suspense>
      </LazySection>

      <LazySection rootMargin="200px">
        <Suspense fallback={<LoadingSpinner />}>
          <Equipamiento />
        </Suspense>
      </LazySection>

      <LazySection rootMargin="200px">
        <Suspense fallback={<LoadingSpinner />}>
          <GaleriaInstagram />
        </Suspense>
      </LazySection>

      <LazySection rootMargin="200px">
        <Suspense fallback={<LoadingSpinner />}>
          <ResponsabilidadSocial />
        </Suspense>
      </LazySection>

      <Footer />
    </>
  )
}

export default App
