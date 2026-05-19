import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogosStrip } from "@/components/sections/LogosStrip";
import { ProductosSection } from "@/components/sections/ProductosSection";
import { NosotrosSection } from "@/components/sections/NosotrosSection";
import { CasosSection } from "@/components/sections/CasosSection";
import { ContactoSection } from "@/components/sections/ContactoSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <LogosStrip />
        <ProductosSection />
        <NosotrosSection />
        <CasosSection />
        <ContactoSection />
      </main>
      <Footer />
    </>
  );
}
