import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ANIMATION } from '@/constants/theme';

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  variant = 'dark',
  className,
}) {
  const isLight = variant === 'light';

  return (
    <motion.div
      {...ANIMATION.fadeUp}
      className={cn(
        'mb-6 max-w-3xl lg:mb-7',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {label && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent-blue">
          {label}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight',
          isLight ? 'text-light-heading' : 'text-white',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:text-lg',
            isLight ? 'text-light-muted' : 'text-muted',
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
