import React, { useState } from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';
import Lightbox from '../components/common/Lightbox';
import '../styles/main.css';
import '../styles/ScrollAnimations.css';
import '../styles/reponsabilidadSocial.css';

import rSocial0 from '../assets/responsabilidadSocial1.avif';
import rSocialBanner from '../assets/rSocialBanner.avif';
import rSocial1a from '../assets/rSocial1a';
import rSocial1b from '../assets/rSocial1b.avif';
import rSocial1c from '../assets/rSocial1c.avif';
import rSocial2a from '../assets/rSocial2a.avif';
import rSocial2b from '../assets/rSocial2b.avif';
import rSocial2c from '../assets/rSocial2c.avif';
import rSocial2d from '../assets/rSocial2d.avif';
import rSocial2e from '../assets/rSocial2e.avif';
import rSocial2f from '../assets/rSocial2f.avif';
import rSocial2g from '../assets/rSocial2g.avif';
import rSocial2h from '../assets/rSocial2h.avif';
import rSocial3 from '../assets/rSocial3.avif';


// Gallery images for responsabilidadSocial
const rSocialImages = [
  { src: rSocial0, alt: 'La casa de Ronald McDonald' },
  { src: rSocial1a, alt: 'Banner' },
  { src: rSocial1b, alt: 'Imagen 1B' },
  { src: rSocial1c, alt: 'Imagen 1C' },
  { src: rSocial2a, alt: 'Imagen 2A' },
  { src: rSocial2b, alt: 'Imagen 2B' },
  { src: rSocial2c, alt: 'Imagen 2C' },
  { src: rSocial2d, alt: 'Imagen 2D' },
  { src: rSocial2e, alt: 'Imagen 2E' },
  { src: rSocial2f, alt: 'Imagen 2F' },
  { src: rSocial2g, alt: 'Imagen 2G' },
  { src: rSocial2h, alt: 'Imagen 2H' },
  { src: rSocial3, alt: 'Imagen 3' }
];

export default function rSocial() {
  const { ref: h2Ref, inView: h2InView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: contentRef, inView: contentInView } = useInViewAnimation({ threshold: 0.2, triggerOnce: true });
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const handleImageClick = (idx) => {
    setCurrentImg(idx);
    setLightboxOpen(true);
  };

  return (
    <main className="rSocial-main">

      {lightboxOpen && (
        <Lightbox
          images={rSocialImages}
          open={lightboxOpen}
          current={currentImg}
          setOpen={setLightboxOpen}
          setCurrent={setCurrentImg}
        />
      )}
    </main>
  );
}
