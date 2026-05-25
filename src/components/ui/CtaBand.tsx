import Link from "next/link";
import { CALENDARIO_URL } from "@/content/data/site";

type Props = {
  titulo?: string;
  descripcion?: string;
  ctaPrimario?: { label: string; href: string };
  ctaSecundario?: { label: string; href: string };
};

export function CtaBand({
  titulo = "¿Tu negocio tiene procesos que se pueden automatizar?",
  descripcion = "La primera sesión de diagnóstico es gratis. En 45 minutos identificamos qué automatizar y cuánto te ahorra.",
  ctaPrimario = { label: "Agendar diagnóstico gratuito →", href: CALENDARIO_URL },
  ctaSecundario = { label: "Ver más casos", href: "/casos" },
}: Props) {
  return (
    <div className="bg-mundo-dark py-20 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          {titulo}
        </h2>
        <p className="text-lg text-white/65 mb-9">{descripcion}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={ctaPrimario.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-mundo-dark font-semibold text-base px-7 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            {ctaPrimario.label}
          </Link>
          <Link
            href={ctaSecundario.href}
            className="inline-flex items-center border border-white/25 text-white/70 font-semibold text-base px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
          >
            {ctaSecundario.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
