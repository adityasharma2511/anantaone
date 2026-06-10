import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';

export function AnimatedCounter({ countTo, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? countTo : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(countTo);
      return undefined;
    }

    if (!isInView) return undefined;

    const controls = animate(0, countTo, {
      duration,
      ease: 'easeOut',
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [countTo, duration, isInView, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
