import React, { Suspense, lazy } from 'react';
import ProductsSection from '../components/ProductsSection';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Productos = () => {
  console.log('Renderizando Productos.jsx');
  return (
    <main>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductsSection />
      </Suspense>
    </main>
  );
};

export default Productos;
