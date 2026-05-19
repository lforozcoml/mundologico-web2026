import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
    </>
  );
}
