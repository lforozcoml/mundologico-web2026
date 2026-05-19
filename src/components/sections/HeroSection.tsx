import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/data/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-28">
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
            "radial-gradient(circle, rgba(23,107,236,.08) 0%, rgba(4,188,166,.04) 60%, transparent 100%)",
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
            "radial-gradient(circle, rgba(81,62,245,.06) 0%, transparent 70%)",
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
          opacity="0.18"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-mundo-teal shrink-0" />
            <span className="text-sm font-semibold text-gray-600">
              Automatización · IA · Empresas que quieren crecer
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-mundo-dark leading-[1.08] tracking-tight mb-6">
            Automatizamos lo que{" "}
            <span className="text-mundo-blue">frena tu negocio.</span>{" "}
            Construimos lo que{" "}
            <span className="text-mundo-teal">lo escala.</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-[480px] mb-9">
            {site.descripcion}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-mundo-blue text-white font-semibold text-base px-7 py-3.5 rounded-full hover:bg-blue-700 transition-colors"
            >
              Agendar diagnóstico gratis →
            </Link>
            <Link
              href="/casos"
              className="inline-flex items-center gap-2 border border-gray-200 text-mundo-dark font-semibold text-base px-7 py-3.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              Ver casos de éxito
            </Link>
          </div>

          {/* Partner badges */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-gray-400 font-medium">Partners oficiales:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { src: "/make-logo.svg", alt: "Make.com" },
                { src: "/monday-logo.svg", alt: "Monday.com" },
                { src: "/google-partner-logo.png", alt: "Google Partner" },
              ].map(({ src, alt }) => (
                <div
                  key={alt}
                  className="flex items-center px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg"
                >
                  <Image src={src} alt={alt} width={80} height={26} className="h-6 w-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: foto + stat cards flotantes */}
        <div className="relative hidden md:block" style={{ padding: "24px 24px 40px 0" }}>
          {/* Foto */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(23,39,76,0.2)]">
            <Image
              src="/hero-team.jpeg"
              alt="Equipo Mundo Lógico"
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

          {/* Stat flotante — inferior izquierda */}
          <div
            className="absolute bottom-4 -left-4 bg-white rounded-[18px] shadow-[0_12px_40px_rgba(23,39,76,0.14)] border border-gray-100"
            style={{ padding: "18px 22px", minWidth: "190px" }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-mundo-teal" />
              <span className="text-[11px] font-bold text-mundo-teal uppercase tracking-wide">En vivo</span>
            </div>
            <div className="text-[30px] font-black text-mundo-dark leading-none">+10K</div>
            <div className="text-[13px] text-gray-500 mt-1">operaciones automatizadas</div>
            <div className="text-[11px] font-bold text-mundo-teal mt-1.5">99.99% tasa de éxito</div>
          </div>

          {/* Stat flotante — superior derecha */}
          <div
            className="absolute top-0 -right-2 bg-mundo-dark rounded-2xl shadow-[0_12px_32px_rgba(23,39,76,0.25)]"
            style={{ padding: "16px 20px" }}
          >
            <div className="text-[26px] font-black text-white leading-none">73h</div>
            <div className="text-[12px] text-white/55 mt-1">ahorro mensual<br />por cliente</div>
          </div>
        </div>
      </div>
    </section>
  );
}
