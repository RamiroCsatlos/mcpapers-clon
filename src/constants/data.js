// Configuración de productos
export const PRODUCTS_DATA = [
  {
    id: 'bolsas-flat',
    title: 'Bolsas Flat',
    description: 'Bolsas de alta calidad para múltiples usos industriales',
    images: [
      {
        id: 'flat-bobinas',
        src: '/assets/bolsasFondoFlatBobinas.avif',
        alt: 'Bolsas Flat en Bobinas',
        type: 'bobinas'
      },
      {
        id: 'flat-armadas',
        src: '/assets/bolsasFondoFlatArmadas.avif',
        alt: 'Bolsas Flat Armadas',
        type: 'armadas'
      }
    ],
    category: 'bolsas',
    featured: true
  },
  {
    id: 'bolsas-fondo-cuadrado',
    title: 'Bolsas Fondo\nCuadrado',
    description: 'Bolsas con fondo cuadrado para mayor estabilidad',
    images: [
      {
        id: 'cuadrado-bobinas',
        src: '/assets/bolsasFondoCuadradoBobinas.avif',
        alt: 'Bolsas Fondo Cuadrado en Bobinas',
        type: 'bobinas'
      },
      {
        id: 'cuadrado-armadas',
        src: '/assets/bolsasFondoCuadradoArmadas.avif',
        alt: 'Bolsas Fondo Cuadrado Armadas',
        type: 'armadas'
      }
    ],
    category: 'bolsas',
    featured: true
  },
  {
    id: 'laminas',
    title: 'Láminas',
    description: 'Láminas especializadas para protección industrial',
    images: [
      {
        id: 'laminas-bobinas',
        src: '/assets/laminasBobinas.png',
        alt: 'Láminas en Bobinas',
        type: 'bobinas'
      },
      {
        id: 'laminas-armadas',
        src: '/assets/laminasArmadas.avif',
        alt: 'Láminas Armadas',
        type: 'armadas'
      }
    ],
    category: 'laminas',
    featured: true
  }
];

// Configuración de equipamiento
export const EQUIPMENT_DATA = [
  {
    id: 'control-calidad',
    title: 'Control de Calidad',
    image: '/assets/controlDeCalidad.avif',
    badge: 'Control de Calidad',
    link: '/equipamiento/control-calidad',
    description: 'Sistemas avanzados de control de calidad para garantizar estándares superiores'
  },
  {
    id: 'tecnica',
    title: 'Técnica',
    image: '/assets/técnica.avif',
    badge: 'Técnica',
    link: '/equipamiento/tecnica',
    description: 'Tecnología técnica especializada para procesos industriales'
  },
  {
    id: 'tecnologia',
    title: 'Tecnología',
    image: '/assets/tecnología.avif',
    badge: 'Tecnología',
    link: '/equipamiento/tecnologia',
    description: 'Última tecnología en maquinaria y procesos de producción'
  }
];

// Configuración de responsabilidad social
export const SOCIAL_RESPONSIBILITY_DATA = [
  {
    id: 'social-1',
    src: '/assets/responsabilidadSocial1.avif',
    alt: 'Responsabilidad Social 1',
    link: '#responsabilidad-1',
    title: 'Compromiso Ambiental'
  },
  {
    id: 'social-2',
    src: '/assets/responsabilidadSocial2.avif',
    alt: 'Responsabilidad Social 2',
    link: '#responsabilidad-2',
    title: 'Desarrollo Comunitario'
  },
  {
    id: 'social-3',
    src: '/assets/responsabilidadSocial3.avif',
    alt: 'Responsabilidad Social 3',
    link: '#responsabilidad-3',
    title: 'Sostenibilidad'
  },
  {
    id: 'social-4',
    src: '/assets/responsabilidadSocial4.avif',
    alt: 'Responsabilidad Social 4',
    link: '#responsabilidad-4',
    title: 'Innovación Verde'
  }
];

// Configuración de navegación
export const NAVIGATION_CONFIG = {
  menuItems: [
    { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
    {
      id: 'productos',
      label: 'Productos',
      type: 'dropdown',
      items: [
        { id: 'bolsas-flat', label: 'Bolsas Flat', href: '#productos/bolsas-flat' },
        { id: 'bolsas-cuadrado', label: 'Bolsas Fondo Cuadrado', href: '#productos/bolsas-cuadrado' },
        { id: 'laminas', label: 'Láminas', href: '#productos/laminas' }
      ]
    },
    {
      id: 'equipamiento',
      label: 'Equipamiento',
      type: 'dropdown',
      items: [
        { id: 'tecnologia', label: 'Tecnología', href: '#equipamiento/tecnologia' },
        { id: 'tecnica', label: 'Técnica', href: '#equipamiento/tecnica' },
        { id: 'control-calidad', label: 'Control de Calidad', href: '#equipamiento/control' }
      ]
    },
    { id: 'novedades', label: 'Novedades', href: '#novedades' },
    { id: 'responsabilidad', label: 'Responsabilidad Social', href: '#responsabilidad' },
    { id: 'contacto', label: 'Contacto', href: '#contacto' }
  ],
  languages: [
    { id: 'es', label: 'Español', flag: '/assets/ar.svg', alt: 'Bandera de Argentina' },
    { id: 'en', label: 'Inglés', flag: '/assets/us.svg', alt: 'Bandera de Estados Unidos' }
  ]
};
