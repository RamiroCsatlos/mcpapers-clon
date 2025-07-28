import { useInView } from 'react-intersection-observer';

export const useContactAnimations = () => {
  // Título
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2, triggerOnce: true });
  // Imagen
  const { ref: imgRef, inView: imgInView } = useInView({ threshold: 0.2, triggerOnce: true });
  // Formulario
  const { ref: formRef, inView: formInView } = useInView({ threshold: 0.2, triggerOnce: true });
  // Info
  const { ref: infoRef, inView: infoInView } = useInView({ threshold: 0.2, triggerOnce: true });
  // Mapa
  const { ref: mapRef, inView: mapInView } = useInView({ threshold: 0.2, triggerOnce: true });

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
