import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import anantaLogo from '@/assets/logos/ananta-one.png';
import { heroNodes } from '@/data/services';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

const ORBIT_DURATION = 52;

function useSquareSize() {
  const ref = useRef(null);
  const [size, setSize] = useState(360);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const { width, height } = element.getBoundingClientRect();
      const next = Math.floor(Math.min(width, height));
      if (next > 0) setSize(next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

function getPoint(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function ServicePill({ node, large }) {
  const Icon = node.icon;

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-full border border-white/10',
        'bg-[#12162b]/90 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md',
        'transition-shadow duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(109,40,255,0.25)]',
        large ? 'px-5 py-3' : 'px-3.5 py-2 sm:px-4 sm:py-2.5',
      )}
    >
      <Icon
        className={cn(
          'shrink-0',
          large ? 'h-5 w-5' : 'h-3.5 w-3.5 sm:h-4 sm:w-4',
          node.iconColor,
        )}
        strokeWidth={1.75}
      />
      <span
        className={cn(
          'whitespace-nowrap font-medium text-white/95',
          large ? 'text-sm' : 'text-[10px] sm:text-xs',
        )}
      >
        {node.label}
      </span>
    </div>
  );
}

function OrbitLine({ node, radius, center, orbitProgress, animated }) {
  const x2 = useTransform(orbitProgress, (progress) => {
    const angle = node.angle + progress * 360;
    return center + getPoint(angle, radius).x;
  });
  const y2 = useTransform(orbitProgress, (progress) => {
    const angle = node.angle + progress * 360;
    return center + getPoint(angle, radius).y;
  });

  if (!animated) {
    const pos = getPoint(node.angle, radius);
    return (
      <line
        x1={center}
        y1={center}
        x2={center + pos.x}
        y2={center + pos.y}
        stroke="url(#orbitLineGrad)"
        strokeWidth="1.5"
        opacity="0.4"
      />
    );
  }

  return (
    <motion.line
      x1={center}
      y1={center}
      x2={x2}
      y2={y2}
      stroke="url(#orbitLineGrad)"
      strokeWidth="1.5"
      opacity="0.45"
    />
  );
}

function OrbitLines({ radius, center, orbitProgress, animated }) {
  const viewSize = center * 2;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="orbitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {[0.45, 0.62, 0.8, 0.95].map((scale, i) => (
        <circle
          key={scale}
          cx={center}
          cy={center}
          r={radius * scale}
          stroke="#8B5CF6"
          strokeOpacity={0.07 + i * 0.035}
          strokeWidth="1"
          fill="none"
        />
      ))}

      {heroNodes.map((node) => (
        <OrbitLine
          key={node.id}
          node={node}
          radius={radius}
          center={center}
          orbitProgress={orbitProgress}
          animated={animated}
        />
      ))}
    </svg>
  );
}

function CenterLogo({ size }) {
  const cardW = Math.round(size * 0.34);
  const cardH = Math.round(size * 0.42);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30"
    >
      <div
        className="absolute rounded-[1.25rem] bg-accent-purple/30 blur-3xl"
        style={{ inset: -size * 0.06 }}
      />
      <div
        className="relative flex items-center justify-center rounded-[1.25rem] border border-accent-purple/35 bg-gradient-to-b from-[#141832]/95 to-[#0a0d1f]/95 shadow-[0_0_72px_rgba(109,40,255,0.28)] backdrop-blur-sm"
        style={{ width: cardW, height: cardH, padding: size * 0.04 }}
      >
        <img
          src={anantaLogo}
          alt="Ananta One"
          className="h-full w-full object-contain drop-shadow-[0_0_18px_rgba(6,214,246,0.25)]"
        />
      </div>
    </motion.div>
  );
}

function OrbitPill({ node, radius, orbitProgress, large, index, animated }) {
  const x = useTransform(orbitProgress, (progress) => {
    const angle = node.angle + progress * 360;
    return getPoint(angle, radius).x;
  });
  const y = useTransform(orbitProgress, (progress) => {
    const angle = node.angle + progress * 360;
    return getPoint(angle, radius).y;
  });

  if (!animated) {
    const pos = getPoint(node.angle, radius);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.35 + index * 0.07 }}
        className="absolute left-1/2 top-1/2 z-20"
        style={{
          x: pos.x,
          y: pos.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <ServicePill node={node} large={large} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-20"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <ServicePill node={node} large={large} />
    </motion.div>
  );
}

export function HeroServiceNodes() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { ref, size } = useSquareSize();
  const orbitProgress = useMotionValue(0);
  const animated = !isMobile && !prefersReducedMotion;

  const center = size / 2;
  const radius = size * 0.36;
  const largePills = size >= 400;

  useEffect(() => {
    if (!animated) {
      orbitProgress.set(0);
      return undefined;
    }

    const controls = animate(orbitProgress, 1, {
      duration: ORBIT_DURATION,
      repeat: Infinity,
      ease: 'linear',
    });

    return () => controls.stop();
  }, [animated, orbitProgress]);

  return (
    <div ref={ref} className="aspect-square w-full max-w-full">
      <div
        className="relative mx-auto"
        style={{ width: size, height: size }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/12 blur-3xl"
          style={{ width: size * 0.92, height: size * 0.92 }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/8 blur-[100px]"
          style={{ width: size * 0.55, height: size * 0.55 }}
        />

        <OrbitLines
          radius={radius}
          center={center}
          orbitProgress={orbitProgress}
          animated={animated}
        />

        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <CenterLogo size={size} />
        </div>

        {heroNodes.map((node, index) => (
          <OrbitPill
            key={node.id}
            node={node}
            radius={radius}
            orbitProgress={orbitProgress}
            large={largePills}
            index={index}
            animated={animated}
          />
        ))}
      </div>
    </div>
  );
}
