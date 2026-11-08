"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { pushDataLayer } from "@/lib/analytics";
import { fuenteVideo, urlEmbed, type DemoVideo } from "@/content/data/demos";
import { textosDemos } from "@/content/data/demos-textos";
import type { Idioma } from "@/lib/contact";

const BOTON =
  "flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-mundo-blue px-6 text-base font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue";

/**
 * Video de un demo, con carga diferida y sin autoplay ni sonido automático.
 * - mp4 local: <video preload="none"> con poster, controles y subtítulos ES/EN.
 * - YouTube o Vimeo: el iframe se carga solo cuando la persona toca el botón.
 */
export function VideoDemo({ demo, idioma }: { demo: DemoVideo; idioma: Idioma }) {
  const t = demo.textos[idioma];
  const fuente = fuenteVideo(demo.url);
  const [cargado, setCargado] = useState(false);
  const reportado = useRef(false);

  if (!fuente) return null;

  if (fuente.tipo === "archivo") {
    return (
      <video
        controls
        preload="none"
        playsInline
        poster={demo.poster}
        className="aspect-video w-full rounded-xl bg-black"
        aria-label={textosDemos[idioma].video.titulo(t.titulo)}
        onPlay={() => {
          if (reportado.current) return;
          reportado.current = true;
          pushDataLayer({ event: "demo_click", demo_id: demo.id, tipo: demo.tipo, idioma });
        }}
      >
        <source src={fuente.src} type="video/mp4" />
        {demo.subtitulos && (
          <>
            <track kind="subtitles" srcLang="es" label="Español" src={demo.subtitulos.es} default={idioma === "es"} />
            <track kind="subtitles" srcLang="en" label="English" src={demo.subtitulos.en} default={idioma === "en"} />
          </>
        )}
      </video>
    );
  }

  if (!cargado) {
    return (
      <button
        type="button"
        onClick={() => setCargado(true)}
        data-demo-id={demo.id}
        data-demo-tipo={demo.tipo}
        data-cta={`demo-${demo.id}`}
        className={BOTON}
      >
        <Play aria-hidden className="size-5" />
        {t.boton}
      </button>
    );
  }

  return (
    <iframe
      src={urlEmbed(fuente)}
      title={textosDemos[idioma].video.titulo(t.titulo)}
      loading="lazy"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      className="aspect-video w-full rounded-xl bg-black"
    />
  );
}
