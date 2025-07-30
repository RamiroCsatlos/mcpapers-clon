import './App.css'
import Header from './components/Header';
import AnimatedWaveBanner from './components/AnimatedWaveBanner';
import LazySection from './components/LazySection';
import LoadingSpinner from './components/LoadingSpinner';
import { Suspense, lazy } from 'react';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

// Lazy load de los componentes principales
import About from './components/About';
const GreenerPack = lazy(() => import('./components/GreenerPack'));
const ProductsSection = lazy(() => import('./components/ProductsSection'));
const Equipamiento = lazy(() => import('./components/Equipamiento'));
const Slider = lazy(() => import('./components/Slider'));
const GaleriaInstagram = lazy(() => import('./components/GaleriaInstagram'));
const ResponsabilidadSocial = lazy(() => import('./components/ResponsabilidadSocial'));
import Contact from './components/Contact';
import CV from './components/CV';
import BolsasFlat from './pages/BolsasFlat';
import BolsasCuadrado from './pages/BolsasCuadrado';
import Laminas from './pages/Laminas';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/bolsas-flat" element={<BolsasFlat />} />
        <Route path="/bolsas-cuadrado" element={<BolsasCuadrado />} />
        <Route path="/laminas" element={<Laminas />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
