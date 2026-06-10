import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProductCard({
  name,
  description,
  image,
  appStoreUrl,
  index = 0,
  className,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col gap-6 rounded-2xl border border-light-border bg-light-card p-6 shadow-sm sm:flex-row sm:items-center lg:p-8',
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-center sm:w-40">
        <img
          src={image}
          alt={name}
          className="h-28 w-28 object-contain sm:h-32 sm:w-32"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-heading text-xl font-semibold text-light-heading sm:text-2xl">
          {name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-light-muted sm:text-base">
          {description}
        </p>
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-light-border bg-white px-5 text-sm font-medium text-light-heading transition-all duration-200 hover:border-accent-blue/40 hover:text-accent-blue"
        >
          View on Shopify App Store
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}
