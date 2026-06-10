import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEnquiryModal } from '@/hooks/useEnquiryModal';

export function ServiceCard({
  title,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  index = 0,
  className,
}) {
  const { openModal } = useEnquiryModal();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        'group rounded-2xl border border-light-border bg-light-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md lg:p-8',
        className,
      )}
    >
      <div
        className={cn(
          'mb-5 inline-flex rounded-xl p-3',
          iconBg || 'bg-accent-blue/10',
        )}
      >
        <Icon className={cn('h-6 w-6', iconColor || 'text-accent-blue')} strokeWidth={1.75} />
      </div>

      <h3 className="font-heading text-lg font-semibold text-light-heading sm:text-xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-light-muted sm:text-base">
        {description}
      </p>

      <button
        type="button"
        onClick={openModal}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue transition-colors hover:text-accent-purple"
      >
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.article>
  );
}
