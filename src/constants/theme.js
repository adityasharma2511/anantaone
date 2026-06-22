export const BRAND = {
  name: 'Ananta One',
  tagline: 'One Problem. Infinite Solutions.',
  email: 'experts@anantaone.in',
   phone: '+91 1234567890',
   location: 'Worldwide Support',
};

export const SECTION_IDS = {
  home: 'home',
  stats: 'stats',
  services: 'services',
  products: 'products',
  process: 'process',
  whyUs: 'why-us',
  about: 'about',
  contact: 'contact',
};

export const ANIMATION = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  },
};
