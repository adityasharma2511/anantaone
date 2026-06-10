import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SECTION_IDS } from '@/constants/theme';
import { stats } from '@/data/services';

export function Stats() {
  return (
    <section id={SECTION_IDS.stats} className="relative border-y border-white/5 bg-[#0d1025]">
      <Container className="py-4 lg:py-5">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`flex items-center gap-3 ${
                  index === stats.length - 1 ? 'col-span-2 justify-center sm:col-span-1' : ''
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-purple/15">
                  <Icon className="h-5 w-5 text-accent-purple" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-white sm:text-xl">
                    <AnimatedCounter
                      countTo={stat.countTo}
                      suffix={stat.suffix}
                      duration={1.6 + index * 0.1}
                    />
                  </p>
                  <p className="text-xs text-muted sm:text-sm">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
