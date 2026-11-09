"use client";

import { useState, type DetailedHTMLProps, type HTMLAttributes } from "react";
import Link from "next/link";
import Script from "next/script";
import { Mic } from "lucide-react";
import { WIDGET_SCRIPT_URL, type TextosSofia } from "@/content/data/demo-sofia";
import type { VariablesSofia } from "@/lib/demo-sofia";

type PropsConvai = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  "agent-id": string;
  /** JSON con las variables dinámicas del agente. */
  "dynamic-variables"?: string;
};

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": PropsConvai;
    }
  }
}

type Props = {
  agentId: string;
  variables: VariablesSofia;
  textos: Pick<TextosSofia, "aviso" | "hablar" | "listo">;
  botonClase: string;
};

/**
 * Aviso de IA y grabación, y el widget de ElevenLabs. Solo se monta cuando la bandera
 * está prendida. El widget y su script se cargan después de que la persona acepta el
 * aviso: así lo lee antes de cualquier llamada y la página no baja el script si no
 * lo va a usar. El widget flota en una esquina (no se puede incrustar en línea).
 */
export function WidgetSofia({ agentId, variables, textos, botonClase }: Props) {
  const [aceptado, setAceptado] = useState(false);

  return (
    <div>
      <div id="aviso-sofia" className="rounded-xl border border-mundo-blue/30 bg-mundo-blue/5 px-4 py-3 text-base leading-relaxed text-mundo-dark">
        <p className="font-bold">{textos.aviso.titulo}</p>
        <p className="mt-1">
          {textos.aviso.antesDelEnlace}
          <Link href="/privacidad" className="font-semibold text-mundo-blue underline underline-offset-4">
            {textos.aviso.enlace}
          </Link>
          {textos.aviso.despuesDelEnlace}
        </p>
      </div>

      {aceptado ? (
        <>
          <p role="status" className="mt-5 text-base font-semibold text-mundo-dark">
            {textos.listo}
          </p>
          <elevenlabs-convai agent-id={agentId} dynamic-variables={JSON.stringify(variables)} />
          <Script src={WIDGET_SCRIPT_URL} strategy="afterInteractive" />
        </>
      ) : (
        <button
          type="button"
          onClick={() => setAceptado(true)}
          aria-describedby="aviso-sofia"
          data-cta="demo-sofia-hablar"
          className={`mt-5 ${botonClase}`}
        >
          <Mic aria-hidden className="size-5" />
          {textos.hablar}
        </button>
      )}
    </div>
  );
}
