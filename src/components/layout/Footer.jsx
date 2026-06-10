import { Mail } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { BRAND } from '@/constants/theme';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-white/5 bg-[#07091a]">
      <Container className="section-padding !pb-4 !pt-10">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <Logo variant="default" size="md" />
          <p className="mt-5 text-sm leading-relaxed text-muted">
            {BRAND.name} — Shopify development, custom apps, and AI automation
            for ecommerce businesses worldwide.
          </p>
          <a
            href={`mailto:${BRAND.email}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-accent-blue"
          >
            <Mail className="h-4 w-4 shrink-0 text-accent-blue" />
            {BRAND.email}
          </a>
          <p className="mt-3 font-tagline text-xs text-white/50">{BRAND.tagline}</p>
        </div>

        <div className="mt-8 border-t border-white/5 pt-4 text-center">
          <p className="text-sm text-muted">
            &copy; {currentYear} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
