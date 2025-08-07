// Migrado a usar useAnimations.js para mayor consistencia
import { useInView } from 'react-intersection-observer';
import { ANIMATION_PRESETS } from './useAnimations';

export const useContactAnimations = () => {
  const options = ANIMATION_PRESETS.DEFAULT;
  
  // Hooks optimizados con configuración centralizada
  const { ref: titleRef, inView: titleInView } = useInView(options);
  const { ref: imgRef, inView: imgInView } = useInView(options);
  const { ref: formRef, inView: formInView } = useInView(options);
  const { ref: infoRef, inView: infoInView } = useInView(options);
  const { ref: mapRef, inView: mapInView } = useInView(options);

  return {
    titleRef,
    titleInView,
    imgRef,
    imgInView,
    formRef,
    formInView,
    infoRef,
    infoInView,
    mapRef,
    mapInView
  };
};

export default useContactAnimations;
