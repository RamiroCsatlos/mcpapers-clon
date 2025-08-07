import './App.css'
import './styles/LazyLoading.css'
import Header from './components/Header';
import AnimatedWaveBanner from './components/AnimatedWaveBanner';
import LazySection from './components/LazySection';
import LoadingSpinner from './components/LoadingSpinner';
import ImagePreloader from './components/ImagePreloader';
import { Suspense, lazy, useEffect } from 'react';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

// 🎯 FASE 3.2.2 - Bundle Optimization & Code Splitting
import { createOptimizedLazy } from './utils/chunkAnalyzer';
import useChunkPreloader from './hooks/useChunkPreloader';

// Precargar recursos críticos para la página principal
const criticalImages = [
  '/src/assets/logoHeader.png',
  '/src/assets/foto-empresa.jpg',
  '/src/assets/logo.png'
];

// Core components (ya incluidos en core-components chunk)
import About from './components/About';

// Lazy load optimizado con métricas - Home components (alta prioridad)
const GreenerPack = lazy(createOptimizedLazy(
  () => import('./components/GreenerPack'), 'greener-pack'
));

const ProductsSection = lazy(createOptimizedLazy(
  () => import('./components/ProductsSection'), 'products-section'
));

// Media components (prioridad normal)
const Slider = lazy(createOptimizedLazy(
  () => import('./components/Slider'), 'slider'
));

const Equipamiento = lazy(createOptimizedLazy(
  () => import('./components/Equipamiento'), 'equipamiento'
));

const GaleriaInstagram = lazy(createOptimizedLazy(
  () => import('./components/GaleriaInstagram'), 'galeria-instagram'
));

const ResponsabilidadSocial = lazy(createOptimizedLazy(
  () => import('./components/ResponsabilidadSocial'), 'responsabilidad-social'
));

// Page components (bajo demanda con chunks optimizados)
const Contact = lazy(createOptimizedLazy(
  () => import('./components/Contact'), 'contact-page'
));

const CV = lazy(createOptimizedLazy(
  () => import('./components/CV'), 'cv-page'
));

// Product pages chunk
const BolsasFlat = lazy(createOptimizedLazy(
  () => import('./pages/BolsasFlat'), 'bolsas-flat'
));

const BolsasCuadrado = lazy(createOptimizedLazy(
  () => import('./pages/BolsasCuadrado'), 'bolsas-cuadrado'
));

const Laminas = lazy(createOptimizedLazy(
  () => import('./pages/Laminas'), 'laminas'
));

const Productos = lazy(createOptimizedLazy(
  () => import('./pages/Productos'), 'productos'
));

// Info pages chunk
const Nosotros = lazy(createOptimizedLazy(
  () => import('./pages/Nosotros'), 'nosotros'
));

const EquipamientoPage = lazy(createOptimizedLazy(
  () => import('./pages/Equipamiento'), 'equipamiento-page'
));

const Tecnologia = lazy(createOptimizedLazy(
  () => import('./pages/Tecnologia'), 'tecnologia'
));

const Tecnica = lazy(createOptimizedLazy(
  () => import('./pages/Tecnica'), 'tecnica'
));

const ControlDeCalidad = lazy(createOptimizedLazy(
  () => import('./pages/ControlDeCalidad'), 'control-calidad'
));

// Additional pages
const Novedades = lazy(createOptimizedLazy(
  () => import('./pages/Novedades'), 'novedades'
));

const Novedad1 = lazy(createOptimizedLazy(
  () => import('./pages/Novedad1'), 'novedad1'
));

const Novedad2 = lazy(createOptimizedLazy(
  () => import('./pages/Novedad2'), 'novedad2'
));

const RSocial = lazy(createOptimizedLazy(
  () => import('./pages/ResponsabilidadSocial'), 'rsocial'
));

const GreenerPackPage = lazy(createOptimizedLazy(
  () => import('./pages/GreenerPack'), 'greenerpack-page'
));

function App() {
  // 🎯 Hook para precarga inteligente de chunks
  const { preload } = useChunkPreloader();
  
  // Log de inicio en desarrollo
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('🚀 FASE 3.2.2 - Bundle Optimization Active');
      console.log('📊 Chunk preloading and analytics enabled');
    }
  }, []);

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
        
        {/* Pages con lazy loading optimizado y chunks específicos */}
        <Route path="/contacto" element={
          <Suspense fallback={<LoadingSpinner text="Cargando formulario de contacto..." />}>
            <Contact />
          </Suspense>
        } />
        
        <Route path="/cv" element={
          <Suspense fallback={<LoadingSpinner text="Cargando formulario de CV..." />}>
            <CV />
          </Suspense>
        } />
        
        {/* Product pages chunk */}
        <Route path="/bolsas-flat" element={
          <Suspense fallback={<LoadingSpinner text="Cargando bolsas flat..." />}>
            <BolsasFlat />
          </Suspense>
        } />
        
        <Route path="/bolsas-cuadrado" element={
          <Suspense fallback={<LoadingSpinner text="Cargando bolsas cuadrado..." />}>
            <BolsasCuadrado />
          </Suspense>
        } />
        
        <Route path="/laminas" element={
          <Suspense fallback={<LoadingSpinner text="Cargando láminas..." />}>
            <Laminas />
          </Suspense>
        } />
        
        <Route path="/productos" element={
          <Suspense fallback={<LoadingSpinner text="Cargando productos..." />}>
            <Productos />
          </Suspense>
        } />
        
        {/* Info pages chunk */}
        <Route path="/nosotros" element={
          <Suspense fallback={<LoadingSpinner text="Cargando información..." />}>
            <Nosotros />
          </Suspense>
        } />
        
        <Route path="/equipamiento" element={
          <Suspense fallback={<LoadingSpinner text="Cargando equipamiento..." />}>
            <EquipamientoPage />
          </Suspense>
        } />
        
        <Route path="/tecnologia" element={
          <Suspense fallback={<LoadingSpinner text="Cargando tecnología..." />}>
            <Tecnologia />
          </Suspense>
        } />
        
        <Route path="/tecnica" element={
          <Suspense fallback={<LoadingSpinner text="Cargando información técnica..." />}>
            <Tecnica />
          </Suspense>
        } />
        
        <Route path="/control-calidad" element={
          <Suspense fallback={<LoadingSpinner text="Cargando control de calidad..." />}>
            <ControlDeCalidad />
          </Suspense>
        } />
        
        {/* Additional pages */}
        <Route path="/novedades" element={
          <Suspense fallback={<LoadingSpinner text="Cargando novedades..." />}>
            <Novedades />
          </Suspense>
        } />
        
        <Route path="/novedad1" element={
          <Suspense fallback={<LoadingSpinner text="Cargando novedad..." />}>
            <Novedad1 />
          </Suspense>
        } />
        
        <Route path="/novedad2" element={
          <Suspense fallback={<LoadingSpinner text="Cargando novedad..." />}>
            <Novedad2 />
          </Suspense>
        } />
        
        <Route path="/greenerpack" element={
          <Suspense fallback={<LoadingSpinner text="Cargando GreenerPack..." />}>
            <GreenerPackPage />
          </Suspense>
        } />
        
        <Route path="/responsabilidad-social" element={
          <Suspense fallback={<LoadingSpinner text="Cargando responsabilidad social..." />}>
            <RSocial />
          </Suspense>
        } />
      </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App
