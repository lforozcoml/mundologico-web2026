import type { Idioma } from "@/lib/contact";

/**
 * Demos de /demos-ml. Fuente única de verdad: de aquí salen las tarjetas, los
 * enlaces y los eventos. Solo se muestran los que tengan `activo: true` y `url`.
 * Se valida al cargar el módulo: un dato malo rompe el build.
 *
 * Este archivo solo importa tipos para que los tests unitarios lo carguen con Node.
 * La ruta es no listada, no privada: no poner aquí nada secreto.
 */

export type TipoDemo = "whatsapp" | "web" | "video";

export type TextosDemo = {
  /** Etiqueta de tipo, por ejemplo "Demo en vivo · WhatsApp". */
  etiqueta: string;
  titulo: string;
  /** Qué vas a ver. */
  descripcion: string;
  /** Línea "Qué puede hacer por tu empresa". */
  paraTuEmpresa: string;
  boton: string;
  nota?: string;
  /** Solo WhatsApp: mensaje que llega escrito al abrir el chat. */
  mensaje?: string;
};

type Base = {
  /** Va en el evento demo_click. Minúsculas, números y guiones. */
  id: string;
  activo: boolean;
  /**
   * WhatsApp: https://wa.me/<número E.164 sin +>.
   * Web: URL https absoluta o ruta local (/...).
   * Video: mp4 local en /demos/... o enlace de YouTube o Vimeo (no listado).
   */
  url: string;
  textos: Record<Idioma, TextosDemo>;
};

export type DemoWhatsapp = Base & { tipo: "whatsapp" };
export type DemoWeb = Base & { tipo: "web" };
export type DemoVideo = Base & {
  tipo: "video";
  /** Solo mp4 local: imagen que se ve antes de reproducir. */
  poster?: string;
  /** Solo mp4 local: subtítulos .vtt en /public/demos/. */
  subtitulos?: Record<Idioma, string>;
};
export type Demo = DemoWhatsapp | DemoWeb | DemoVideo;

const DEMOS: Demo[] = [
  {
    id: "whatsapp-medellin",
    tipo: "whatsapp",
    activo: true,
    url: "https://wa.me/573332845521",
    textos: {
      es: {
        etiqueta: "Demo en vivo · WhatsApp",
        titulo: "Agente de WhatsApp que guía a turistas por Medellín",
        descripcion:
          "Escríbele en el idioma que prefieras y pídele planes culturales para hoy. Responde al instante, a cualquier hora.",
        paraTuEmpresa: "Así atiende a tus clientes un agente de IA: por WhatsApp, a cualquier hora y en varios idiomas.",
        boton: "Probar en WhatsApp",
        nota: "Es un proyecto abierto al público: puedes escribirle ahora mismo.",
        mensaje: "Hola, ¿qué planes culturales hay hoy en Medellín?",
      },
      en: {
        etiqueta: "Live demo · WhatsApp",
        titulo: "WhatsApp agent that guides tourists around Medellín",
        descripcion:
          "Message it in the language you prefer and ask for cultural plans for today. It replies instantly, at any hour.",
        paraTuEmpresa: "This is how an AI agent serves your customers: on WhatsApp, at any hour and in several languages.",
        boton: "Try it on WhatsApp",
        nota: "It's a public project: you can message it right now.",
        mensaje: "Hi! What cultural events are happening in Medellín today?",
      },
    },
  },
  {
    id: "agente-conversacional",
    tipo: "web",
    // Página propia con el widget de voz de ElevenLabs. Además de este flag, la página
    // solo carga el widget si la bandera de Make (MAKE_DEMO_ESTADO_URL) está prendida.
    // Textos en borrador: revisarlos antes de activar.
    activo: false,
    url: "/demos-ml/agente-voz",
    textos: {
      es: {
        etiqueta: "Demo en vivo · Voz",
        titulo: "Federico en versión IA: un agente de voz",
        descripcion:
          "Habla desde tu navegador con un agente de IA que usa la voz clonada de Federico Orozco, fundador de Mundo Lógico. No es él en persona.",
        paraTuEmpresa: "Así puede atender un agente de voz las llamadas de tus clientes, con respuestas claras y en su idioma.",
        boton: "Hablar con Federico",
        nota: "Es una IA, no una persona. Necesitas micrófono. La conversación se graba y se transcribe.",
      },
      en: {
        etiqueta: "Live demo · Voice",
        titulo: "Federico's AI version: a voice agent",
        descripcion:
          "Talk from your browser to an AI agent that uses the cloned voice of Federico Orozco, founder of Mundo Lógico. It isn't the real Federico.",
        paraTuEmpresa: "This is how a voice agent can handle your customers' calls, with clear answers in their language.",
        boton: "Talk to Federico",
        nota: "It's an AI, not a person. You'll need a microphone. The conversation is recorded and transcribed.",
      },
    },
  },
  {
    id: "video-cotizaciones",
    tipo: "video",
    // TODO: activar cuando esté el mp4 (con poster y .vtt) o la URL de YouTube/Vimeo.
    activo: false,
    url: "",
    textos: {
      es: {
        etiqueta: "Video · 90 segundos",
        titulo: "Cotizaciones gestionadas en un solo sistema",
        descripcion:
          "Así funciona el sistema de gestión de cotizaciones que usa el equipo de ventas de un distribuidor de equipos de impresión digital.",
        paraTuEmpresa: "Que tu equipo comercial cotice más rápido y con la misma información.",
        boton: "Ver video",
      },
      en: {
        etiqueta: "Video · 90 seconds",
        titulo: "Quotes managed in a single system",
        descripcion:
          "See how the quote management system used by the sales team of a digital printing equipment distributor works.",
        paraTuEmpresa: "Help your sales team quote faster, working from the same information.",
        boton: "Watch the video",
      },
    },
  },
];

// Validación

const E164 = /^\+[1-9]\d{7,14}$/;
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WA_ME = /^https:\/\/wa\.me\/(\d+)$/;
const RUTA_LOCAL = /^\/(?!\/)[^\s?#]*$/;
const RAYA_LARGA = String.fromCharCode(0x2014);

export type FuenteVideo =
  | { tipo: "archivo"; src: string }
  | { tipo: "youtube"; id: string }
  | { tipo: "vimeo"; id: string; hash: string | null };

function esHttps(url: string): boolean {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

/** Interpreta la url de un demo de video. null si no es mp4 local, YouTube ni Vimeo. */
export function fuenteVideo(url: string): FuenteVideo | null {
  if (/^\/demos\/[\w.-]+\.mp4$/.test(url)) return { tipo: "archivo", src: url };
  if (!esHttps(url)) return null;
  const u = new URL(url);
  const host = u.hostname.replace(/^www\./, "");
  if (host === "youtu.be") {
    const id = u.pathname.slice(1);
    return /^[\w-]{11}$/.test(id) ? { tipo: "youtube", id } : null;
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    const id = u.searchParams.get("v") ?? u.pathname.match(/^\/(?:embed|shorts)\/([\w-]{11})$/)?.[1] ?? "";
    return /^[\w-]{11}$/.test(id) ? { tipo: "youtube", id } : null;
  }
  if (host === "vimeo.com") {
    // Los no listados traen un hash: vimeo.com/<id>/<hash>.
    const m = u.pathname.match(/^\/(\d+)(?:\/([\da-f]+))?\/?$/);
    return m ? { tipo: "vimeo", id: m[1], hash: m[2] ?? u.searchParams.get("h") } : null;
  }
  return null;
}

/** URL del iframe de YouTube o Vimeo. Sin autoplay: la persona da play. */
export function urlEmbed(f: Extract<FuenteVideo, { tipo: "youtube" | "vimeo" }>): string {
  if (f.tipo === "youtube") return `https://www.youtube-nocookie.com/embed/${f.id}?rel=0`;
  return `https://player.vimeo.com/video/${f.id}${f.hash ? `?h=${f.hash}` : ""}`;
}

function textosDe(t: TextosDemo): string[] {
  return [t.etiqueta, t.titulo, t.descripcion, t.paraTuEmpresa, t.boton, t.nota ?? "", t.mensaje ?? ""];
}

/** Errores de la configuración. Vacío si todo está bien. Se exporta para los tests. */
export function erroresDemos(lista: readonly Demo[]): string[] {
  const errores: string[] = [];
  const vistos = new Set<string>();
  for (const d of lista) {
    const e = (m: string) => errores.push(`[${d.id}] ${m}`);
    if (!ID.test(d.id)) e("id no es válido");
    if (vistos.has(d.id)) e("id repetido");
    vistos.add(d.id);

    for (const idioma of ["es", "en"] as const) {
      const t = d.textos[idioma];
      for (const campo of ["etiqueta", "titulo", "descripcion", "paraTuEmpresa", "boton"] as const) {
        if (!t[campo].trim()) e(`${campo} vacío en ${idioma}`);
      }
      if (textosDe(t).some((x) => x.includes(RAYA_LARGA))) e(`texto con raya larga en ${idioma}`);
      if (d.tipo === "whatsapp" && !t.mensaje?.trim()) e(`falta el mensaje de WhatsApp en ${idioma}`);
    }

    if (d.activo && !d.url) e("activo sin url");
    if (!d.url) continue;

    if (d.tipo === "whatsapp") {
      const numero = d.url.match(WA_ME)?.[1];
      if (!numero || !E164.test(`+${numero}`)) e(`url "${d.url}" no es https://wa.me/<número E.164>`);
    } else if (d.tipo === "web") {
      if (!esHttps(d.url) && !RUTA_LOCAL.test(d.url)) e(`url "${d.url}" no es https ni ruta local`);
    } else {
      const f = fuenteVideo(d.url);
      if (!f) e(`url "${d.url}" no es un mp4 en /demos/ ni un enlace de YouTube o Vimeo`);
      if (f?.tipo === "archivo") {
        if (!d.poster || !RUTA_LOCAL.test(d.poster)) e("el mp4 necesita poster en ruta local");
        for (const idioma of ["es", "en"] as const) {
          if (!d.subtitulos?.[idioma]?.endsWith(".vtt") || !RUTA_LOCAL.test(d.subtitulos[idioma])) {
            e(`el mp4 necesita subtítulos .vtt en ${idioma}`);
          }
        }
      }
    }
  }
  return errores;
}

function validar(lista: Demo[]): readonly Demo[] {
  const errores = erroresDemos(lista);
  if (errores.length) throw new Error(`Demos inválidos:\n- ${errores.join("\n- ")}`);
  return lista;
}

export const demos = validar(DEMOS);

/** Los que se muestran: activos y con url. */
export function demosVisibles(lista: readonly Demo[] = demos): Demo[] {
  return lista.filter((d) => d.activo && d.url !== "");
}

/** Ruta local del sitio: se abre en la misma pestaña. Las externas, en una nueva. */
export function esRutaLocal(url: string): boolean {
  return RUTA_LOCAL.test(url);
}

/** Enlace del botón. En WhatsApp lleva el mensaje del idioma, codificado. */
export function enlaceDemo(d: Demo, idioma: Idioma): string {
  if (d.tipo !== "whatsapp") return d.url;
  const mensaje = d.textos[idioma].mensaje ?? "";
  return `${d.url}?text=${encodeURIComponent(mensaje)}`;
}
