import { useInView } from 'react-intersection-observer';
import { useMemo } from 'react';

/**
 * Configuraciones preestablecidas para animaciones comunes
 */
export const ANIMATION_PRESETS = {
  // Configuración más común: fade-in con trigger único
  DEFAULT: {
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: '50px'
  },
  // Para elementos que necesitan re-aparecer
  REPEATABLE: {
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: '50px'
  },
  // Para elementos que necesitan mayor visibilidad antes de animar
  STRICT: {
    threshold: 0.5,
    triggerOnce: true,
    rootMargin: '0px'
  },
  // Para elementos que deben aparecer rápido
  EAGER: {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px'
  }
};

/**
 * Hook optimizado para animaciones con intersection observer
 * @param {string|Object} preset - Preset name o configuración custom
 * @returns {Object} - Ref, estado inView y className automática
 */
export const useInViewAnimation = (preset = 'DEFAULT') => {
  const options = useMemo(() => {
    if (typeof preset === 'string') {
      return ANIMATION_PRESETS[preset] || ANIMATION_PRESETS.DEFAULT;
    }
    return { ...ANIMATION_PRESETS.DEFAULT, ...preset };
  }, [preset]);

  const { ref, inView } = useInView(options);

  return {
    ref,
    inView,
    className: inView ? 'fade-in-visible' : '',
    // Helper para clases condicionales
    getClassName: (baseClass = '') => 
      `${baseClass} fade-in-up${inView ? ' fade-in-visible' : ''}`.trim()
  };
};

/**
 * Hook especializado para secciones comunes (título + imagen + texto + lista)
 * Usa hooks individuales para evitar problemas con rules-of-hooks
 * @param {string|Object} preset - Preset o configuración
 * @returns {Object} - Refs e inView states preconfigurados
 */
export const useCommonSectionAnimations = (preset = 'DEFAULT') => {
  const options = useMemo(() => {
    if (typeof preset === 'string') {
      return ANIMATION_PRESETS[preset] || ANIMATION_PRESETS.DEFAULT;
    }
    return { ...ANIMATION_PRESETS.DEFAULT, ...preset };
  }, [preset]);

  const { ref: h2Ref, inView: h2InView } = useInView(options);
  const { ref: img1Ref, inView: img1InView } = useInView(options);
  const { ref: textRef, inView: textInView } = useInView(options);
  const { ref: img2Ref, inView: img2InView } = useInView(options);
  const { ref: mobileImagesRef, inView: mobileImagesInView } = useInView(options);
  const { ref: listRef, inView: listInView } = useInView(options);

  return {
    h2Ref, h2InView,
    img1Ref, img1InView,
    textRef, textInView,
    img2Ref, img2InView,
    mobileImagesRef, mobileImagesInView,
    listRef, listInView
  };
};

/**
 * Hook especializado para secciones de información (título + imagen + items)
 * @param {string|Object} preset - Preset o configuración
 * @returns {Object} - Refs e inView states preconfigurados
 */
export const useInfoSectionAnimations = (preset = 'DEFAULT') => {
  const options = useMemo(() => {
    if (typeof preset === 'string') {
      return ANIMATION_PRESETS[preset] || ANIMATION_PRESETS.DEFAULT;
    }
    return { ...ANIMATION_PRESETS.DEFAULT, ...preset };
  }, [preset]);

  const { ref: h2Ref, inView: h2InView } = useInView(options);
  const { ref: imgRef, inView: imgInView } = useInView(options);
  const { ref: h3Ref, inView: h3InView } = useInView(options);
  const { ref: h4Ref, inView: h4InView } = useInView(options);
  const { ref: pRef, inView: pInView } = useInView(options);

  return {
    h2Ref, h2InView,
    imgRef, imgInView,
    h3Ref, h3InView,
    h4Ref, h4InView,
    pRef, pInView
  };
};

export default useInViewAnimation;
