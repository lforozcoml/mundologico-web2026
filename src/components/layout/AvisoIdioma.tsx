"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { avisoIdioma } from "@/content/data/i18n/aviso-idioma";
import type { Idioma } from "@/lib/i18n/config";
import { guardarPreferenciaIdioma, hayPreferenciaIdioma, idiomaSugerido } from "@/lib/i18n/preferencia";

type Props = {
  /** Idioma de la página. */
  idiomaPagina: Idioma;
  /** El otro idioma y la URL de esta misma página en él. */
  destino: { idioma: Idioma; href: string };
};

const sinSuscripcion = () => () => {};

/**
 * Franja bajo el Header que sugiere la versión en el idioma del navegador. No redirige:
 * en el servidor no se pinta (Google ve la página igual) y en el navegador aparece solo si
 * el idioma principal es el otro, el visitante no eligió antes y no es un robot.
 */
export function AvisoIdioma({ idiomaPagina, destino }: Props) {
  const sugerido = useSyncExternalStore(
    sinSuscripcion,
    () =>
      idiomaSugerido({
        idiomaPagina,
        languages: navigator.languages?.length ? navigator.languages : [navigator.language],
        userAgent: navigator.userAgent,
        yaEligio: hayPreferenciaIdioma(),
      }),
    () => null,
  );
  const [cerrado, setCerrado] = useState(false);
  const visible = !cerrado && sugerido === destino.idioma;
  const ref = useRef<HTMLDivElement>(null);

  // Mientras se ve, el Header fijo es más alto: los saltos a secciones (#revision...) reservan
  // también el alto del aviso para que el título no quede tapado.
  useEffect(() => {
    const el = ref.current;
    if (!visible || !el) return;
    const raiz = document.documentElement;
    const ajustar = () => (raiz.style.scrollPaddingTop = `${el.offsetHeight}px`);
    ajustar();
    const obs = new ResizeObserver(ajustar);
    obs.observe(el);
    return () => {
      obs.disconnect();
      raiz.style.scrollPaddingTop = "";
    };
  }, [visible]);

  if (!visible || !sugerido) return null;
  const tx = avisoIdioma[sugerido];

  return (
    <div ref={ref} role="region" aria-label={tx.aria} lang={sugerido} className="border-t border-blue-100 bg-blue-50">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-2 text-[14px] text-mundo-dark">
        <p className="min-w-0 flex-1">
          {tx.texto}{" "}
          <Link
            href={destino.href}
            hrefLang={sugerido}
            data-cta="aviso-idioma-cambiar"
            onClick={() => guardarPreferenciaIdioma(sugerido)}
            className="whitespace-nowrap font-semibold text-mundo-blue underline underline-offset-4 hover:text-mundo-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue"
          >
            {tx.cambiar} →
          </Link>
        </p>
        <button
          type="button"
          aria-label={tx.cerrar}
          data-cta="aviso-idioma-cerrar"
          onClick={() => {
            guardarPreferenciaIdioma("cerrado");
            setCerrado(true);
          }}
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-blue-100 hover:text-mundo-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
