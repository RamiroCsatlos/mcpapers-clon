
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
        <LazySection rootMargin="200px">
          <Suspense fallback={<LoadingSpinner />}>
            <Trayectoria />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="200px">
          <Suspense fallback={<LoadingSpinner />}>
            <Filosofia />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="200px">
          <Suspense fallback={<LoadingSpinner />}>
            <Innovacion />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="200px">
          <Suspense fallback={<LoadingSpinner />}>
            <Certificaciones />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="200px">
          <Suspense fallback={<LoadingSpinner />}>
            <Marcas />
          </Suspense>
        </LazySection>
      </div>
    </main>
  );
}

export default Nosotros;