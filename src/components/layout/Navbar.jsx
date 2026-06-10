import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { navItems } from '@/data/navigation';
import { SECTION_IDS } from '@/constants/theme';
import { useEnquiryModal } from '@/hooks/useEnquiryModal';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';

const sectionIds = Object.values(SECTION_IDS);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(sectionIds);
  const { openModal } = useEnquiryModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollProps = {
    spy: true,
    smooth: true,
    offset: -80,
    duration: 500,
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300',
        scrolled
          ? 'border-white/10 bg-[#07091a] shadow-lg shadow-black/40'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container>
        <nav className="flex h-[72px] items-center justify-between lg:h-20">
          <Link
            to={SECTION_IDS.home}
            {...scrollProps}
            className="cursor-pointer"
            aria-label="Go to home"
          >
            <Logo variant="header" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  {...scrollProps}
                  className={cn(
                    'relative cursor-pointer px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-white',
                    activeSection === item.to && 'text-white',
                  )}
                >
                  {item.label}
                  {activeSection === item.to && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button variant="gradient" size="sm" onClick={openModal}>
              Book Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-dark/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="py-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      {...scrollProps}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'block cursor-pointer rounded-lg px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-white',
                        activeSection === item.to && 'text-white',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button
                variant="gradient"
                size="md"
                className="mt-4 w-full"
                onClick={() => {
                  setIsOpen(false);
                  openModal();
                }}
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
