import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { Products } from '@/components/sections/Products';
import { Process } from '@/components/sections/Process';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { About } from '@/components/sections/About';
import { CTA } from '@/components/sections/CTA';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Products />
        <Process />
        <WhyChooseUs />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
