import Link from "next/link";
import Image from "next/image";
import { site, partnerBadges } from "@/content/data/site";
import { PartnerBadge } from "@/components/ui/PartnerBadge";
import { CookieSettingsButton } from "@/components/layout/CookieBanner";
import { PUBLICADO as ECOMMERCE_PUBLICADO } from "@/content/data/ecommerce-shopify";
import { footer } from "@/content/data/i18n/navegacion";
import type { Idioma } from "@/lib/i18n/config";
import { enlace, enlaceOEspanol, tieneIdioma } from "@/lib/i18n/rutas";

type EnlacePie = { label: string; href: string; cta?: string };
type Columna = { id: "productos" | "empresa" | "legal"; titulo: string; links: EnlacePie[] };

/** Columnas del pie. Las URLs salen del mapa de rutas; los textos, del diccionario. */
function columnasPie(idioma: Idioma): Columna[] {
  const tx = footer[idioma];
  const productos = enlace("productos", idioma) ?? "/productos";
  const nota = tx.notaSoloEspanol ? ` ${tx.notaSoloEspanol}` : "";
  return [
    {
      id: "productos",
      titulo: tx.columnas.productos,
      links: [
        // Solo con la página de e-commerce publicada.
        ...(ECOMMERCE_PUBLICADO
          ? [{ label: tx.productos.ecommerce, href: enlaceOEspanol("ecommerceShopify", idioma), cta: "footer-ecommerce" }]
          : []),
        { label: tx.productos.iaLab,     href: `${productos}#ia-lab` },
        { label: tx.productos.knowledge, href: `${productos}#knowledge-engine` },
        { label: tx.productos.support,   href: `${productos}#support-engine` },
        { label: tx.productos.signal,    href: `${productos}#signal-engine` },
      ],
    },
    {
      id: "empresa",
      titulo: tx.columnas.empresa,
      links: [
        // Nosotros solo donde tiene página (en inglés está pendiente).
        ...(tieneIdioma("nosotros", idioma) ? [{ label: tx.empresa.nosotros, href: enlaceOEspanol("nosotros", idioma) }] : []),
        { label: tx.empresa.casos,    href: enlaceOEspanol("casos", idioma) },
        { label: tx.empresa.contacto, href: `${enlaceOEspanol("inicio", idioma)}#contacto` },
      ],
    },
    {
      id: "legal",
      titulo: tx.columnas.legal,
      // Legales solo en español: en inglés enlazan a la versión en español con la nota.
      links: [
        { label: `${tx.legal.terminos}${tieneIdioma("terminos", idioma) ? "" : nota}`,     href: enlaceOEspanol("terminos", idioma) },
        { label: `${tx.legal.privacidad}${tieneIdioma("privacidad", idioma) ? "" : nota}`, href: enlaceOEspanol("privacidad", idioma) },
      ],
    },
  ];
}

export function Footer({ idioma }: { idioma: Idioma }) {
  const tx = footer[idioma];
  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image src="/logo-mundologico-blanco.png" alt={tx.logoAlt} width={160} height={36} className="h-8 w-auto mb-4" />
            <p className="text-[14px] text-white/70 leading-relaxed max-w-[260px]">
              {tx.descripcion}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
              {site.redes.linkedin && (
                <a href={site.redes.linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
              )}
              {site.redes.facebook && (
                <a href={site.redes.facebook} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  Facebook
                </a>
              )}
            </div>
          </div>

          {/* Link columns */}
          {columnasPie(idioma).map(({ id, titulo, links }) => (
            <div key={id}>
              <h4 className="text-[13px] font-bold uppercase tracking-widest text-white/55 mb-4">{titulo}</h4>
              {links.map(({ label, href, cta }) => (
                <Link key={label} href={href} data-cta={cta}
                  className="block text-[14px] text-white/80 hover:text-white transition-colors mb-2.5">
                  {label}
                </Link>
              ))}
              {id === "legal" && (
                <CookieSettingsButton className="block text-left text-[14px] text-white/80 hover:text-white transition-colors mb-2.5" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-[13px] text-white/55">
              © {new Date().getFullYear()} Mundo Lógico S.A.S. {tx.derechos}
            </p>
            <p className="text-[13px] text-white/55">
              {tx.ciudad} · {site.contacto.email}
            </p>
          </div>

          {/* Insignias de certificación */}
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end">
            {partnerBadges.map((badge) => (
              <PartnerBadge
                key={badge.alt}
                badge={badge}
                className="bg-white rounded-xl px-4 py-2.5 flex items-center"
                imgClassName="h-14 w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
