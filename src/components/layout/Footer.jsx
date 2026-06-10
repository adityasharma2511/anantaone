import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { contactDetails, socialLinks } from '@/data/footer';
import { BRAND } from '@/constants/theme';
import { cn } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-white/5 bg-[#07091a]">
      <Container className="section-padding !pb-4 !pt-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Logo variant="default" size="md" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              {BRAND.name} is a specialized agency focused on Shopify development,
              custom software, and AI automation — helping ecommerce businesses
              build, automate, and scale worldwide.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map(({ id, label, href, icon: Icon }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-muted transition-all duration-200',
                    'hover:border-accent-blue/40 hover:text-white',
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-white">
              Contact Us
            </h4>
            <ul className="mt-5 space-y-4">
              {contactDetails.map(({ id, label, href, icon: Icon }) => (
                <li key={id}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-white"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-accent-blue" />
                      {label}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-sm text-muted">
                      <Icon className="h-4 w-4 shrink-0 text-accent-blue" />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-4 text-center">
          <p className="text-sm text-muted">
            &copy; {currentYear} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
