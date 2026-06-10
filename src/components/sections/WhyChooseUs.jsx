import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { anantaFlow, traditionalFlow } from '@/data/process';
import { ANIMATION } from '@/constants/theme';
import { SECTION_IDS } from '@/constants/theme';
import { cn } from '@/lib/utils';

function ProcessFlow({ title, steps, variant }) {
  const isAnanta = variant === 'ananta';

  return (
    <div
      className={cn(
        'rounded-2xl border p-6 lg:p-8',
        isAnanta
          ? 'border-accent-blue/20 bg-accent-blue/5'
          : 'border-light-border bg-white shadow-sm',
      )}
    >
      <h3
        className={cn(
          'font-heading text-lg font-semibold',
          isAnanta ? 'text-accent-blue' : 'text-light-muted',
        )}
      >
        {title}
      </h3>

      <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2 sm:gap-3">
            <motion.span
              {...ANIMATION.fadeIn}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'rounded-lg px-3 py-2 text-xs font-medium sm:text-sm',
                isAnanta
                  ? 'border border-accent-blue/30 bg-accent-blue/10 text-light-heading'
                  : 'border border-light-border bg-light text-light-muted',
              )}
            >
              {step.label}
            </motion.span>
            {index < steps.length - 1 && (
              <ArrowRight
                className={cn(
                  'h-4 w-4 shrink-0',
                  isAnanta ? 'text-accent-blue/60' : 'text-light-muted/40',
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section id={SECTION_IDS.whyUs} className="section-padding section-light">
      <Container>
        <SectionHeading
          label="Why Us"
          title="Why Choose Ananta One"
          subtitle="We don't just build and walk away. We partner with you for long-term growth."
          variant="light"
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <ProcessFlow
            title="Traditional Agencies"
            steps={traditionalFlow}
            variant="traditional"
          />
          <ProcessFlow
            title="Ananta One"
            steps={anantaFlow}
            variant="ananta"
          />
        </div>
      </Container>
    </section>
  );
}
