import { ExternalLink, MessageCircle } from "lucide-react";
import { enlaceDemo, esRutaLocal, type Demo } from "@/content/data/demos";
import { hrefConIdioma } from "@/lib/enlaces";
import { textosDemos } from "@/content/data/demos-textos";
import type { Idioma } from "@/lib/contact";
import { VideoDemo } from "@/components/demos/VideoDemo";

const BOTON =
  "flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-mundo-blue px-6 text-base font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue";

/** Tarjeta de un demo visible (activo y con url). */
export function TarjetaDemo({ demo, idioma, src }: { demo: Demo; idioma: Idioma; src?: string | null }) {
  const t = demo.textos[idioma];
  const Icono = demo.tipo === "whatsapp" ? MessageCircle : ExternalLink;
  const idTitulo = `demo-${demo.id}`;
  const local = demo.tipo === "web" && esRutaLocal(demo.url);
  // En rutas locales se conservan src e idioma (sin ?lang= es español).
  const href = local ? hrefConIdioma(demo.url, src, idioma) : enlaceDemo(demo, idioma);

  return (
    <article
      aria-labelledby={idTitulo}
      className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-mundo-blue">{t.etiqueta}</p>
      <h3 id={idTitulo} className="mt-2 text-xl font-black leading-snug text-mundo-dark">
        {t.titulo}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-gray-700">{t.descripcion}</p>
      <p className="mt-4 rounded-xl bg-mundo-teal/10 px-4 py-3 text-sm leading-relaxed text-mundo-dark">
        <strong className="block font-bold">{textosDemos[idioma].paraTuEmpresa}</strong>
        {t.paraTuEmpresa}
      </p>
      <div className="mt-auto pt-5">
        {demo.tipo === "video" ? (
          <VideoDemo demo={demo} idioma={idioma} />
        ) : (
          <a
            href={href}
            {...(local ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            data-demo-id={demo.id}
            data-demo-tipo={demo.tipo}
            data-cta={`demo-${demo.id}`}
            className={BOTON}
          >
            <Icono aria-hidden className="size-5" />
            {t.boton}
          </a>
        )}
        {t.nota && <p className="mt-3 text-center text-sm text-gray-600">{t.nota}</p>}
      </div>
    </article>
  );
}
