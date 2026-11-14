"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/analytics";

/** Valores permitidos en el atributo data-tarjeta-accion de los botones. */
export type TarjetaAccion = "guardar" | "llamar" | "whatsapp" | "web" | "correo" | "agendar";

const ACCIONES: readonly TarjetaAccion[] = ["guardar", "llamar", "whatsapp", "web", "correo", "agendar"];

/** Lee ?src= y lo limita a un valor corto y seguro para analítica. */
function leerSrc(): string | null {
  const src = new URLSearchParams(window.location.search).get("src");
  return src && /^[a-z0-9_-]{1,32}$/i.test(src) ? src.toLowerCase() : null;
}

/**
 * Envía a GTM la visita (tarjeta_contacto_vista) y los clics
 * (tarjeta_contacto_click) de la tarjeta. El clic en agendar dispara además
 * cta_agenda_click con ubicacion "tarjeta". Los eventos solo llegan a GA4 si en
 * GTM hay un trigger y una etiqueta configurados para ellos.
 */
export function TarjetaTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const src = leerSrc() ?? "directo";
    pushDataLayer({ event: "tarjeta_contacto_vista", tarjeta_slug: slug, tarjeta_src: src });

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tarjeta-accion]");
      const accion = el?.dataset.tarjetaAccion as TarjetaAccion | undefined;
      if (!accion || !ACCIONES.includes(accion)) return;
      pushDataLayer({ event: "tarjeta_contacto_click", tarjeta_slug: slug, tarjeta_accion: accion, tarjeta_src: src });
      if (accion === "agendar") {
        pushDataLayer({ event: "cta_agenda_click", ubicacion: "tarjeta", tarjeta_slug: slug, tarjeta_src: src });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [slug]);

  return null;
}
