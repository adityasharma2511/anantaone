import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ANIMATION, BRAND, SECTION_IDS } from '@/constants/theme';

export function About() {
  return (
    <section id={SECTION_IDS.about} className="section-padding section-light">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            label="About"
            title="About Ananta One"
            variant="light"
            className="mb-8"
          />

          <motion.div {...ANIMATION.fadeUp} className="space-y-5 text-light-muted">
            <p className="text-base leading-relaxed sm:text-lg">
              <span className="font-medium text-light-heading">Ananta</span> — a
              Sanskrit word meaning &ldquo;infinite&rdquo; — reflects our belief
              that every business challenge has limitless solutions waiting to be
              discovered.
            </p>
            <p className="text-base leading-relaxed sm:text-lg">
              {BRAND.name} is a specialized agency focused on Shopify development,
              custom software, and AI automation. We partner with ecommerce
              businesses worldwide to build stores that convert, apps that solve
              real problems, and automations that scale operations.
            </p>
            <p className="text-base leading-relaxed sm:text-lg">
              Our approach goes beyond project delivery. We invest in long-term
              partnerships — continuously optimizing, automating, and scaling your
              business as it grows.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
