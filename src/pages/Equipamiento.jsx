import React, { Suspense, lazy } from 'react';
import Equipamiento from '../components/Equipamiento';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EquipamientoPage = () => {
  console.log('Renderizando Equipamiento.jsx');
  return (
    <main>
      <Suspense fallback={<LoadingSpinner />}>
        <Equipamiento />
      </Suspense>
    </main>
  );
};

export default EquipamientoPage;
