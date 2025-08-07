
import React, { Suspense, lazy } from 'react';
import LazySection from '../components/LazySection';
import LoadingSpinner from '../components/LoadingSpinner';
import logoImage from '../assets/logoHeader.avif';

const Trayectoria = lazy(() => import('../components/nosotros/Trayectoria'));
const Filosofia = lazy(() => import('../components/nosotros/Filosofia'));
const Innovacion = lazy(() => import('../components/nosotros/Innovacion'));
const Certificaciones = lazy(() => import('../components/nosotros/Certificaciones'));
const Marcas = lazy(() => import('../components/nosotros/Marcas'));

function Nosotros() {
  return (
    <main className="nosotros-page single-column-responsive" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className="nosotros-logo-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', width: '100%'}}>
        <img src={logoImage} alt="Logo" style={{maxWidth: '40vw', width: '100%', height: 'auto', margin: '0 auto'}} />
      </div>
      <div style={{width: '100%'}}>
        <LazySection 
          priority="high" 
          rootMargin="300px"
          preload={true}
          threshold={0.1}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Trayectoria />
          </Suspense>
        </LazySection>
        <LazySection 
          priority="high" 
          rootMargin="250px"
          preload={true}
          threshold={0.15}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Filosofia />
          </Suspense>
        </LazySection>
        <LazySection 
          priority="normal" 
          rootMargin="200px"
          threshold={0.2}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Innovacion />
          </Suspense>
        </LazySection>
        <LazySection 
          priority="normal" 
          rootMargin="150px"
          threshold={0.25}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Certificaciones />
          </Suspense>
        </LazySection>
        <LazySection 
          priority="low" 
          rootMargin="100px"
          threshold={0.3}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Marcas />
          </Suspense>
        </LazySection>
      </div>
    </main>
  );
}

export default Nosotros;