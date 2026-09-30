import Image from "next/image";
import Link from "next/link";
import { site, CALENDARIO_URL } from "@/content/data/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28" style={{ background: "#23274C" }}>
      {/* Blob top-right */}
      <div
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          top: "-120px",
          right: "-80px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(23,107,236,.30) 0%, rgba(4,188,166,.12) 60%, transparent 100%)",
        }}
      />
      {/* Blob bottom-left */}
      <div
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          bottom: "-80px",
          left: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(81,62,245,.25) 0%, transparent 70%)",
        }}
      />
      {/* Brand shape — píldora del isotipo rotada */}
      <svg
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          top: "-60px",
          right: "-140px",
          width: "680px",
          height: "340px",
          transform: "rotate(-18deg)",
          overflow: "visible",
        }}
        viewBox="0 0 680 340"
      >
        <rect
          x="4" y="4" width="672" height="332"
          rx="166" ry="166"
          fill="#176BEC"
          opacity="0.22"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-mundo-teal shrink-0" />
            <span className="text-sm font-semibold text-white/65">
              Automatización e IA para empresas en Colombia
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-white leading-[1.08] tracking-tight mb-6">
            Automatizamos lo que{" "}
            <span className="text-mundo-blue">frena tu negocio.</span>{" "}
            Construimos lo que{" "}
            <span className="text-mundo-teal">lo escala.</span>
          </h1>

          <p className="text-lg text-white/65 leading-relaxed max-w-[480px] mb-9">
            {site.descripcion}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            {/* TODO: Cal.com */}
            <Link
              href={CALENDARIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-mundo-blue text-white font-semibold text-base px-7 py-3.5 rounded-full hover:bg-blue-700 transition-colors"
            >
              Agenda una llamada de 20 minutos →
            </Link>
            <Link
              href="/casos"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold text-base px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              Ver casos de éxito
            </Link>
          </div>

          <p className="text-sm text-white/50 leading-relaxed max-w-[440px] mb-10">
            Sin costo. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo.
          </p>

          {/* Partner badges */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-white/45 font-medium">Partners oficiales:</span>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { src: "/make-silver-sales.avif", alt: "Make Silver Partner Sales", w: 246, h: 246 },
                { src: "/make-silver-service.avif", alt: "Make Silver Partner Service", w: 239, h: 239 },
                { src: "/google-workspace-select-partner-sin-borde.png", alt: "Google Workspace Select Partner", w: 917, h: 621 },
              ].map(({ src, alt, w, h }) => (
                <div
                  key={alt}
                  className="flex items-center px-4 py-2.5 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                >
                  <Image src={src} alt={alt} width={w} height={h} className="h-14 w-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: foto + tarjeta de sectores */}
        <div className="relative hidden md:block" style={{ padding: "24px 24px 40px 0" }}>
          {/* Foto */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(23,39,76,0.2)]">
            <Image
              src="/hero-team.jpeg"
              alt="Equipo de trabajo revisando un proceso automatizado"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Gradiente inferior sobre la foto */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: "140px",
                background: "linear-gradient(to top, rgba(23,39,76,.55), transparent)",
              }}
            />
          </div>

          {/* Tarjeta de sectores — inferior izquierda */}
          <div
            className="absolute bottom-4 -left-4 bg-white rounded-[18px] shadow-[0_12px_40px_rgba(23,39,76,0.14)] border border-gray-100"
            style={{ padding: "18px 22px", maxWidth: "290px" }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-mundo-teal" />
              <span className="text-[11px] font-bold text-mundo-teal uppercase tracking-wide">Casos reales</span>
            </div>
            <p className="text-[14px] text-mundo-dark font-semibold leading-snug">
              Sector público, distribución industrial y servicios financieros
            </p>
            <Link
              href="/casos"
              className="inline-flex items-center gap-1 text-[13px] font-bold text-mundo-blue mt-2.5 hover:underline"
            >
              Ver casos →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
