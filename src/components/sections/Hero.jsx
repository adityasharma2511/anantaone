import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { HeroServiceNodes } from '@/components/ui/HeroServiceNodes';
import { trustBadges } from '@/data/services';
import { useEnquiryModal } from '@/hooks/useEnquiryModal';
import { SECTION_IDS } from '@/constants/theme';

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 lg:bottom-6"
    >
      <Link
        to={SECTION_IDS.stats}
        spy
        smooth
        offset={-72}
        duration={600}
        aria-label="Scroll to see more"
        className="group flex flex-col items-center gap-1.5 text-muted transition-colors hover:text-white"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest opacity-70 group-hover:opacity-100">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm group-hover:border-white/30 group-hover:bg-white/10"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Hero() {
  const { openModal } = useEnquiryModal();

  return (
    <section
      id={SECTION_IDS.home}
      className="relative flex min-h-[calc(100dvh-3rem)] flex-col overflow-x-hidden bg-dark pt-[72px] sm:min-h-[calc(100dvh-3.5rem)] lg:min-h-[calc(100dvh-4rem)] lg:pt-20"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-accent-purple/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[380px] w-[380px] rounded-full bg-accent-blue/15 blur-[100px]" />

      <Container className="relative flex flex-1 items-center pb-14 pt-5 lg:pb-16 lg:pt-7">
        <div className="grid w-full items-center gap-5 lg:grid-cols-[3fr_2fr] lg:gap-6">
          <div className="min-w-0 lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted backdrop-blur-sm sm:px-4 sm:text-xs">
                Shopify • AI Automation • Custom Development
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
            >
              One Problem.
              <br />
              <span className="text-gradient">Infinite Solutions.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base leading-relaxed text-muted sm:text-lg"
            >
              We help ecommerce businesses build, automate, and scale through
              Shopify development, custom apps, and AI automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button variant="gradient" size="lg" onClick={openModal}>
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={openModal}
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-5 sm:gap-6"
            >
              {trustBadges.map((badge) => (
                <img
                  key={badge.id}
                  src={badge.image}
                  alt={badge.alt}
                  className={`w-auto object-contain ${badge.className}`}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex w-full min-w-0 items-center justify-center lg:min-h-[420px] xl:min-h-[480px]"
          >
            <HeroServiceNodes />
          </motion.div>
        </div>
      </Container>

      <ScrollIndicator />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}

