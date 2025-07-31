import React, { Suspense, lazy } from 'react';
import LazySection from '../components/LazySection';
import LoadingSpinner from '../components/LoadingSpinner';

const Trayectoria = lazy(() => import('../components/nosotros/Trayectoria'));
// const Filosofia = lazy(() => import('../components/nosotros/Filosofia'));
// const Innovacion = lazy(() => import('../components/nosotros/Innovacion'));
// const Certificaciones = lazy(() => import('../components/nosotros/Certificaciones'));
// const Marcas = lazy(() => import('../components/nosotros/Marcas'));

function Nosotros() {
  return (
    <>
      <LazySection rootMargin="200px">
        <Suspense fallback={<LoadingSpinner />}>
          <Trayectoria />
        </Suspense>
      </LazySection>
      {/* <LazySection rootMargin="200px">
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
      </LazySection> */}
    </>
  );
}

export default Nosotros;