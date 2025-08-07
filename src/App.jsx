import './App.css'
import './styles/LazyLoading.css'
import Header from './components/Header';
import AnimatedWaveBanner from './components/AnimatedWaveBanner';
import LazySection from './components/LazySection';
import LoadingSpinner from './components/LoadingSpinner';
import ImagePreloader from './components/ImagePreloader';
import { Suspense, lazy } from 'react';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

// Precargar recursos críticos para la página principal
const criticalImages = [
  '/src/assets/logoHeader.png',
  '/src/assets/foto-empresa.jpg',
  '/src/assets/logo.png'
];

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
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import EquipamientoPage from './pages/Equipamiento';
import Tecnologia from './pages/Tecnologia';
import Tecnica from './pages/Tecnica';  
import ControlDeCalidad from './pages/ControlDeCalidad';
import Novedades from './pages/Novedades';
import Novedad1 from './pages/Novedad1';
import Novedad2 from './pages/Novedad2';
import RSocial from './pages/ResponsabilidadSocial';
import GreenerPackPage from './pages/GreenerPack';

function App() {
  return (
    <>
      {/* Precargar recursos críticos */}
      <ImagePreloader 
        images={criticalImages} 
        priority="high"
        onComplete={() => console.log('✅ Critical resources preloaded')}
        onError={(error) => console.warn('⚠️ Critical resource preload failed:', error)}
      />
      
      <Header />
      <div className="main-content">
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
              <LazySection 
                priority="high" 
                rootMargin="300px"
                preload={true}
                threshold={0.1}
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <GreenerPack />
                </Suspense>
              </LazySection>
              <LazySection 
                priority="high" 
                rootMargin="250px"
                preload={true}
                threshold={0.15}
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductsSection />
                </Suspense>
              </LazySection>
              <LazySection 
                priority="normal" 
                rootMargin="200px"
                threshold={0.2}
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <Slider />
                </Suspense>
              </LazySection>
              <LazySection 
                priority="normal" 
                rootMargin="150px"
                threshold={0.25}
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <Equipamiento />
                </Suspense>
              </LazySection>
              <LazySection 
                priority="low" 
                rootMargin="100px"
                threshold={0.3}
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <GaleriaInstagram />
                </Suspense>
              </LazySection>
              <LazySection 
                priority="low" 
                rootMargin="50px"
                threshold={0.3}
              >
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
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/productos" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Productos />
          </Suspense>
        
        } />
        <Route path="/equipamiento" element={
          <Suspense fallback={<LoadingSpinner />}>
            <EquipamientoPage />
          </Suspense>
        
        } />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/tecnica" element={<Tecnica />} />
        <Route path="/control-calidad" element={<ControlDeCalidad />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/novedad1" element={<Novedad1 />} />
        <Route path="/novedad2" element={<Novedad2 />} />
        <Route path="/greenerpack" element={<GreenerPackPage />} />
        <Route path="/responsabilidad-social" element={<RSocial />} />
      </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App
