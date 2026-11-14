"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { SelectorIdioma } from "@/components/ui/SelectorIdioma";
import type { Idioma } from "@/lib/i18n/config";

export type PropsHeader = {
  /** URL del inicio en el idioma de la página. */
  inicio: string;
  logoAlt: string;
  botonMenu: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
  /** Enlace a la misma página en el otro idioma, o null si la página no tiene par. */
  otroIdioma: { idioma: Idioma; actual: Idioma; aria: string; href: string } | null;
  /** PUBLICADO_EN. En false, el selector solo aparece en Previews y en local. */
  selectorPublicado: boolean;
};

/**
 * Previews de Vercel (*.vercel.app) y desarrollo local. Se decide en el navegador por el
 * dominio, así no depende de cómo se construya el deployment al promoverlo: en
 * mundologico.com nunca da true.
 */
/** Cada idioma con su propio nombre, como en el selector de demos y tarjeta. */
const NOMBRE_IDIOMA: Record<Idioma, string> = { es: "Español", en: "English" };

/** El dominio no cambia durante la visita: no hay nada a qué suscribirse. */
const sinSuscripcion = () => () => {};

function esEntornoDeRevision(hostname: string): boolean {
  return hostname.endsWith(".vercel.app") || hostname === "localhost" || hostname === "127.0.0.1";
}

/**
 * Parte de cliente del Header (menú móvil). Recibe textos y URLs ya resueltos desde
 * Header.tsx para no cargar el mapa de rutas ni los diccionarios en el navegador.
 */
export function HeaderCliente({ inicio, logoAlt, botonMenu, links, cta, otroIdioma, selectorPublicado }: PropsHeader) {
  const [open, setOpen] = useState(false);
  // Sin publicar, el HTML del servidor no trae el selector (snapshot del servidor: false);
  // en el navegador aparece si el dominio es un Preview o local.
  const enRevision = useSyncExternalStore(
    sinSuscripcion,
    () => esEntornoDeRevision(window.location.hostname),
    () => false,
  );
  const nav = { links, cta };
  const hrefOtroIdioma = otroIdioma && (selectorPublicado || enRevision) ? otroIdioma.href : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={inicio} className="flex items-center gap-2">
          <Image
            src="/logo-mundologico.png"
            alt={logoAlt}
            width={160}
            height={36}
            priority
            className="h-8 w-auto max-[359px]:h-7"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-mundo-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={hrefOtroIdioma ? "hidden md:flex items-center gap-6" : "hidden md:block"}>
          {hrefOtroIdioma && otroIdioma && (
            <SelectorIdioma
              idioma={otroIdioma.actual}
              destino={{ hrefs: { [otroIdioma.idioma]: hrefOtroIdioma } }}
              etiqueta={otroIdioma.aria}
              nombreIdioma={NOMBRE_IDIOMA}
              tema="claro"
            />
          )}
          <Link
            href={nav.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-mundo-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
          >
            {nav.cta.label}
          </Link>
        </div>

        {/* Móvil: selector de idioma compacto y hamburguesa, siempre visibles en la barra */}
        <div className="md:hidden flex items-center gap-2">
        {hrefOtroIdioma && otroIdioma && (
          <SelectorIdioma
            idioma={otroIdioma.actual}
            destino={{ hrefs: { [otroIdioma.idioma]: hrefOtroIdioma } }}
            etiqueta={otroIdioma.aria}
            nombreIdioma={NOMBRE_IDIOMA}
            tema="claro"
            tamano="compacto"
          />
        )}
        <button
          className="p-2 text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label={botonMenu}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 flex flex-col gap-4">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-mundo-dark"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-mundo-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            onClick={() => setOpen(false)}
          >
            {nav.cta.label}
          </Link>
        </div>
      )}
    </header>
  );
}
