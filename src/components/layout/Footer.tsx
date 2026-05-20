import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/data/site";

const footerLinks = {
  Productos: [
    { label: "Knowledge Engine", href: "/productos#knowledge-engine" },
    { label: "Support Engine",   href: "/productos#support-engine" },
    { label: "IA Lab",           href: "/productos#ia-lab" },
    { label: "Signal Engine",    href: "/productos#signal-engine" },
  ],
  Empresa: [
    { label: "Nosotros",         href: "/nosotros" },
    { label: "Casos de éxito",   href: "/casos" },
    { label: "Contacto",         href: "/#contacto" },
  ],
  Legal: [
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Política de privacidad", href: "/privacidad" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image src="/logo-mundologico-blanco.png" alt="Mundo Lógico" width={160} height={36} className="h-8 w-auto mb-4" />
            <p className="text-[14px] text-white/70 leading-relaxed max-w-[260px]">
              {site.descripcion}
            </p>
            {site.redes.linkedin && (
              <a href={site.redes.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 text-[13px] text-white/70 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            )}
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[13px] font-bold uppercase tracking-widest text-white/55 mb-4">{title}</h4>
              {links.map(({ label, href }) => (
                <Link key={label} href={href}
                  className="block text-[14px] text-white/80 hover:text-white transition-colors mb-2.5">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[13px] text-white/55">
            © {new Date().getFullYear()} Mundo Lógico. Todos los derechos reservados.
          </p>
          <p className="text-[13px] text-white/55">
            {site.contacto.ciudad} · {site.contacto.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
