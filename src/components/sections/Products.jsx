import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import { products } from '@/data/products';
import { SECTION_IDS } from '@/constants/theme';

export function Products() {
  return (
    <section id={SECTION_IDS.products} className="section-padding section-light">
      <Container>
        <SectionHeading
          label="Our Products"
          title="Powerful Apps for Shopify Merchants"
          subtitle="Shopify apps crafted from real merchant pain points — built to solve problems and scale with your business."
          variant="light"
        />

        <div className="grid gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              appStoreUrl={product.appStoreUrl}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
