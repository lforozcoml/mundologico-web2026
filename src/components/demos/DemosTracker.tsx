"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/analytics";
import { srcSeguro } from "@/lib/enlaces";
import type { Idioma } from "@/lib/contact";

/** Valores del atributo data-demo-cta. */
export type DemoCta = "agendar" | "diagnostico";
const CTAS: readonly DemoCta[] = ["agendar", "diagnostico"];

/**
 * Eventos de /demos-ml, sin datos personales:
 * - demos_vista al cargar (idioma, src).
 * - demo_click en elementos con data-demo-id y data-demo-tipo.
 * - demo_cta_click en elementos con data-demo-cta; el de agendar dispara además
 *   cta_agenda_click con ubicacion "demos".
 * El play de un mp4 lo empuja VideoDemo. Llegan a GA4 solo si GTM tiene trigger y etiqueta.
 */
export function DemosTracker({ idioma }: { idioma: Idioma }) {
  useEffect(() => {
    const src = srcSeguro(new URLSearchParams(window.location.search).get("src")) ?? "directo";
    pushDataLayer({ event: "demos_vista", idioma, src });

    const onClick = (e: MouseEvent) => {
      const objetivo = e.target as Element | null;
      const demo = objetivo?.closest<HTMLElement>("[data-demo-id]");
      if (demo?.dataset.demoId && demo.dataset.demoTipo) {
        pushDataLayer({ event: "demo_click", demo_id: demo.dataset.demoId, tipo: demo.dataset.demoTipo, idioma });
        return;
      }
      const cta = objetivo?.closest<HTMLElement>("[data-demo-cta]")?.dataset.demoCta as DemoCta | undefined;
      if (!cta || !CTAS.includes(cta)) return;
      pushDataLayer({ event: "demo_cta_click", cta, idioma });
      if (cta === "agendar") pushDataLayer({ event: "cta_agenda_click", ubicacion: "demos", idioma, src });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [idioma]);

  return null;
}
