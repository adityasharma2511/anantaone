import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/data/process';
import { SECTION_IDS } from '@/constants/theme';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

export function Process() {
  const isMobile = useIsMobile();

  return (
    <section id={SECTION_IDS.process} className="section-padding section-light overflow-hidden">
      <Container>
        <SectionHeading
          label="Our Process"
          title="Simple, Transparent & Effective Process"
          subtitle="A proven methodology that delivers results — from discovery to ongoing support."
          variant="light"
        />

        <div className="relative">
          {!isMobile && (
            <div className="absolute left-[7%] right-[7%] top-10 hidden h-px border-t border-dashed border-light-border lg:block" />
          )}

          <div
            className={cn(
              'relative',
              isMobile ? 'flex flex-col gap-8' : 'grid grid-cols-7 gap-3',
            )}
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={cn(
                    'flex flex-col items-center text-center',
                    isMobile && 'flex-row gap-4 text-left',
                  )}
                >
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-light-border bg-white shadow-sm">
                    <Icon className="h-6 w-6 text-accent-blue" strokeWidth={1.75} />
                  </div>
                  <div className={cn(isMobile ? 'pt-1' : 'mt-4')}>
                    <span className="text-xs font-semibold text-accent-blue">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1 font-heading text-sm font-semibold text-light-heading lg:text-base">
                      {step.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
