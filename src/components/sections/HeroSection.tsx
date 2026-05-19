import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/data/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-mundo-dark pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(23,107,236,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex self-start items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium text-white/80 uppercase tracking-widest">
            Automatización con IA
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            {site.tagline}
          </h1>

          <p className="text-lg text-white/70 leading-relaxed max-w-lg">
            {site.descripcion}
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-mundo-blue text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              Agendar diagnóstico gratis
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Ver soluciones
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-4 pt-6 border-t border-white/15">
            {site.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-3xl font-black text-white">{stat.valor}</span>
                <span className="text-sm text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: team photo */}
        <div className="relative hidden md:block">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-mundo-blue/30 to-mundo-teal/20 blur-2xl" aria-hidden />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/hero-team.jpeg"
              alt="Equipo Mundo Lógico"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
