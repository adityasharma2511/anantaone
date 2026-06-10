import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { useEnquiryModal } from '@/hooks/useEnquiryModal';

export function CTA() {
  const { openModal } = useEnquiryModal();

  return (
    <section className="section-padding bg-dark">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a1f4e] via-[#2d1b69] to-[#1a3a5c] px-6 py-12 sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent-blue/20 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent-purple/20 blur-[80px]" />

          <div className="relative max-w-xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Scale Your Business?
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Let&apos;s build, automate and grow your ecommerce business together.
            </p>
          </div>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Button variant="gradient" size="lg" onClick={openModal}>
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={openModal}>
              Talk to Expert
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
