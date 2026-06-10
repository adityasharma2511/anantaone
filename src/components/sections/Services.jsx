import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { featuredServices } from '@/data/services';
import { SECTION_IDS } from '@/constants/theme';

export function Services() {
  return (
    <section id={SECTION_IDS.services} className="section-padding section-light">
      <Container>
        <SectionHeading
          label="What We Do"
          title="End-to-End Solutions for Your Ecommerce Growth"
          subtitle="From store builds to AI-powered automation — we deliver comprehensive solutions that drive measurable results."
          variant="light"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              iconBg={service.iconBg}
              iconColor={service.iconColor}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
