import { useEffect, useRef } from 'react';

const AnimatedSection = ({ children, animationClass = 'fade-in', threshold = 0.1 }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
          }
        });
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [animationClass, threshold]);

  return (
    <div ref={sectionRef} className="animated-section">
      {children}
    </div>
  );
};

export default AnimatedSection;
