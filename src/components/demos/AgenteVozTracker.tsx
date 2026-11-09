"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/analytics";
import { srcSeguro } from "@/lib/enlaces";
import type { Idioma } from "@/lib/contact";

/**
 * demo_voz_vista al cargar /demos-ml/agente-voz, con idioma y src. Sin datos personales:
 * ?u= y ?c= nunca van a la analítica. Llega a GA4 solo si GTM tiene trigger y etiqueta.
 */
export function AgenteVozTracker({ idioma }: { idioma: Idioma }) {
  useEffect(() => {
    const src = srcSeguro(new URLSearchParams(window.location.search).get("src")) ?? "directo";
    pushDataLayer({ event: "demo_voz_vista", idioma, src });
  }, [idioma]);
  return null;
}
