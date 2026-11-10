"use client";

import { useState } from "react";
import Link from "next/link";
import { Turnstile } from "@/components/ui/Turnstile";
import { textosTarjeta } from "@/content/data/tarjeta-textos";
import { pushDataLayer } from "@/lib/analytics";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  MENSAJE_TARJETA_MAX,
  NOMBRE_COMPLETO_MAX,
  camposDesdeTarjeta,
  normalizarFuente,
  type Idioma,
  type Interes,
} from "@/lib/contact";
import { useEnvioContacto } from "@/lib/useEnvioContacto";
import { RUTA_DEMOS, hrefConIdioma } from "@/lib/enlaces";

const INPUT =
  "min-h-12 w-full rounded-xl border border-white/20 bg-white px-4 text-base text-mundo-dark placeholder:text-gray-500 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-teal";
const LABEL = "text-sm font-semibold text-white";
const ENLACE = "font-semibold text-mundo-teal underline underline-offset-2";

type Props = {
  /** Slug de la tarjeta o de la página (PAGINAS_CAPTURA). Se suma a la fuente en /api/contact. */
  slug: string;
  idioma: Idioma;
  /** Alternativas que se ofrecen si el envío falla. */
  whatsappHref: string;
  email: string;
  /** Dónde está el bloque: va en generate_lead. Por defecto "tarjeta". */
  ubicacion?: "tarjeta" | "demos";
  /** Reemplaza el título por defecto ("Déjanos tus datos"). */
  titulo?: string;
  /** Reemplaza el mensaje de éxito por defecto (el de la tarjeta). */
  exito?: string;
  /** Línea bajo el título, por ejemplo el interés preseleccionado. */
  nota?: string;
  /** Plegado: el título abre y cierra el formulario. El formulario (y Turnstile) se monta al abrir. */
  plegado?: boolean;
  /** Solo con `plegado`: empieza abierto. */
  abiertoInicial?: boolean;
  /** Por defecto "Otro" (ver camposDesdeTarjeta). */
  interes?: Interes;
  /** Por defecto MENSAJE_TARJETA. */
  mensajeBase?: string;
  /** Muestra "Mira los demos" tras un envío exitoso. Por defecto true. */
  enlaceDemos?: boolean;
};

const ID_TITULO = "captura-titulo";

/**
 * Bloque "Déjanos tus datos" de la tarjeta digital y de /demos-ml. Envía a /api/contact
 * con la misma validación, Turnstile, honeypot y tiempo mínimo que el formulario de la
 * home (useEnvioContacto). Los campos que el bloque no pide salen de camposDesdeTarjeta.
 */
export function TarjetaCaptura({ plegado = false, abiertoInicial = false, titulo, nota, ...props }: Props) {
  const [abierto, setAbierto] = useState(abiertoInicial);
  const textoTitulo = titulo ?? textosTarjeta[props.idioma].captura.titulo;
  const notaVisible = nota ? <p className="mt-2 text-sm text-white/80">{nota}</p> : null;

  return (
    <section
      id="captura"
      aria-labelledby={ID_TITULO}
      className="mt-8 scroll-mt-6 rounded-2xl border border-white/15 bg-white/5 p-5 text-white"
    >
      {plegado ? (
        <details open={abiertoInicial} onToggle={(e) => setAbierto(e.currentTarget.open)}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
            <h2 id={ID_TITULO} className="text-xl font-bold">
              {textoTitulo}
            </h2>
            <span aria-hidden className="text-2xl leading-none text-mundo-teal">
              {abierto ? "−" : "+"}
            </span>
          </summary>
          {notaVisible}
          {abierto && <CuerpoCaptura {...props} />}
        </details>
      ) : (
        <>
          <h2 id={ID_TITULO} className="text-xl font-bold">
            {textoTitulo}
          </h2>
          {notaVisible}
          <CuerpoCaptura {...props} />
        </>
      )}
    </section>
  );
}

type PropsCuerpo = Omit<Props, "plegado" | "abiertoInicial" | "titulo" | "nota">;

function CuerpoCaptura({
  slug,
  idioma,
  whatsappHref,
  email,
  ubicacion = "tarjeta",
  interes,
  mensajeBase,
  enlaceDemos = true,
  exito: textoExito,
}: PropsCuerpo) {
  const t = textosTarjeta[idioma].captura;
  const [hrefDemos, setHrefDemos] = useState<string | null>(null);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentimiento, setConsentimiento] = useState(false);
  const [consentimientoTocado, setConsentimientoTocado] = useState(false);
  const consentimientoError = consentimientoTocado && !consentimiento;
  const { token, enviando, verifyFailed, enviar, reiniciarVerificacion, turnstile } = useEnvioContacto();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consentimiento) {
      setConsentimientoTocado(true);
      return;
    }
    setError(null);
    const form = e.currentTarget;
    const valor = (nombre: string) => (form.elements.namedItem(nombre) as HTMLInputElement | HTMLTextAreaElement).value;
    const origen = new URLSearchParams(window.location.search).get("src") ?? "";

    const resultado = await enviar(
      {
        ...camposDesdeTarjeta({
          nombreCompleto: valor("nombreCompleto"),
          email: valor("email"),
          telefono: valor("telefono"),
          mensaje: valor("mensaje"),
          interes,
          mensajeBase,
        }),
        origen,
        consentimiento,
        idioma,
        pagina: slug,
      },
      valor(HONEYPOT_FIELD),
    );

    if (resultado.ok) {
      setExito(true);
      if (enlaceDemos) setHrefDemos(hrefConIdioma(RUTA_DEMOS, origen, idioma));
      // Sin datos personales: solo dónde, de qué fuente y en qué idioma.
      pushDataLayer({
        event: "generate_lead",
        ubicacion,
        ...(ubicacion === "tarjeta" ? { tarjeta_slug: slug } : {}),
        fuente: normalizarFuente(origen),
        idioma,
      });
      return;
    }
    if (resultado.status === 422) setError(t.errorDatos);
    else if (resultado.status === 429) setError(t.errorLimite);
    else if (resultado.status === 0) setError(t.errorConexion);
    else setError(t.errorGeneral);
  }

  const alternativas = (
    <>
      {" "}
      {t.alternativaAntes}{" "}
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={ENLACE}>
        {textosTarjeta[idioma].whatsapp}
      </a>{" "}
      {t.alternativaO}{" "}
      <a href={`mailto:${email}`} className={ENLACE}>
        {email}
      </a>
      .
    </>
  );

  return (
    <>
      {exito ? (
        <div role="status" className="mt-3 text-base text-white">
          <p>✅ {textoExito ?? t.exito}</p>
          {hrefDemos && (
            <Link
              href={hrefDemos}
              data-cta="ver-demos"
              className="mt-3 inline-flex min-h-11 items-center font-semibold text-mundo-teal underline underline-offset-4"
            >
              {t.verDemos}
            </Link>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="relative mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="tarjeta-nombre" className={LABEL}>{t.nombre}</label>
            <input id="tarjeta-nombre" name="nombreCompleto" required type="text" autoComplete="name"
              maxLength={NOMBRE_COMPLETO_MAX} placeholder={t.nombrePlaceholder} className={INPUT} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="tarjeta-email" className={LABEL}>{t.email}</label>
            <input id="tarjeta-email" name="email" required type="email" autoComplete="email" inputMode="email"
              maxLength={CONTACT_LIMITS.email} placeholder={t.emailPlaceholder} className={INPUT} />
          </div>

          <details className="group">
            <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-white/85 underline underline-offset-4">
              {t.opcionales}
            </summary>
            <div className="mt-2 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="tarjeta-telefono" className={LABEL}>{t.telefono}</label>
                <input id="tarjeta-telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel"
                  maxLength={CONTACT_LIMITS.telefono} pattern="[0-9 +\-()]{7,30}" title={t.telefonoAyuda} className={INPUT} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="tarjeta-mensaje" className={LABEL}>{t.mensaje}</label>
                <textarea id="tarjeta-mensaje" name="mensaje" rows={3} maxLength={MENSAJE_TARJETA_MAX}
                  placeholder={t.mensajePlaceholder} className={`${INPUT} py-3`} />
              </div>
            </div>
          </details>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-3">
              <input
                id="tarjeta-consentimiento"
                name="consentimiento"
                type="checkbox"
                required
                checked={consentimiento}
                onChange={(e) => {
                  setConsentimiento(e.target.checked);
                  if (!e.target.checked) setConsentimientoTocado(true);
                }}
                onBlur={() => setConsentimientoTocado(true)}
                aria-invalid={consentimientoError}
                aria-describedby={consentimientoError ? "tarjeta-consentimiento-error" : undefined}
                className="mt-0.5 size-6 shrink-0 accent-mundo-teal"
              />
              <label htmlFor="tarjeta-consentimiento" className="text-sm leading-relaxed text-white/85">
                {t.consentimientoAntes}
                <Link href="/privacidad" target="_blank" className={ENLACE}>
                  {t.consentimientoEnlace}
                </Link>
                {t.consentimientoDespues}
              </label>
            </div>
            {consentimientoError && (
              <p id="tarjeta-consentimiento-error" role="alert" className="text-sm font-semibold text-amber-300">
                {t.consentimientoError}
              </p>
            )}
          </div>

          {/* Campo trampa: oculto para personas y lectores de pantalla; los bots lo llenan. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>

          <Turnstile {...turnstile} idioma={idioma} tema="dark" />

          {verifyFailed && (
            <p className="rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm text-white">
              ⚠️ {t.errorVerificacion}{" "}
              <button type="button" onClick={reiniciarVerificacion} className={ENLACE}>
                {t.reintentar}
              </button>
              {alternativas}
            </p>
          )}

          {error && (
            <p role="alert" className="rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm text-white">
              ⚠️ {error}
              {alternativas}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando || !token || !consentimiento}
            aria-describedby={consentimiento ? undefined : consentimientoError ? "tarjeta-consentimiento-error" : "tarjeta-envio-ayuda"}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-mundo-blue px-6 text-base font-bold text-white transition-colors hover:bg-blue-600 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-teal"
          >
            {enviando ? t.enviando : token ? t.enviar : t.verificando}
          </button>
          {!consentimiento && !consentimientoError && (
            <p id="tarjeta-envio-ayuda" className="text-center text-sm text-white/70">
              {t.consentimientoAyuda}
            </p>
          )}
        </form>
      )}
    </>
  );
}
