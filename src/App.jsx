import './App.css'
import Header from './components/Header'
import AnimatedWaveBanner from './components/AnimatedWaveBanner';
import About from './components/About';
import GreenerPack from './components/GreenerPack';
import ProductsSection from './components/ProductsSection';
import Equipamiento from './components/Equipamiento';
import Slider from './components/Slider';
import Footer from './components/Footer';
import GaleriaInstagram from './components/GaleriaInstagram';
import ResponsabilidadSocial from './components/ResponsabilidadSocial';

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
      <GreenerPack />
      <ProductsSection />
      <Slider />
      <Equipamiento />
      <GaleriaInstagram />
      <ResponsabilidadSocial />
      <Footer />
    </>
  )
}

export default App
