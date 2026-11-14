"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/content/data/site";
import { Turnstile } from "@/components/ui/Turnstile";
import { CONTACT_LIMITS, ETIQUETA_INTERES, HONEYPOT_FIELD, INTERESES, interesDesdeParam } from "@/lib/contact";
import { RUTA_DEMOS, hrefConIdioma } from "@/lib/enlaces";
import { useEnvioContacto } from "@/lib/useEnvioContacto";
import { ETIQUETA_INTERES_EN, inicio } from "@/content/data/i18n/inicio";
import type { Idioma } from "@/lib/i18n/config";

const INPUT_CLASS =
  "px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-mundo-dark outline-none focus:border-mundo-blue focus:bg-white transition-colors aria-[invalid=true]:border-red-400";
const LABEL_CLASS = "text-[13px] font-semibold text-mundo-dark";

export function ContactoSection({ idioma }: { idioma: Idioma }) {
  const tx = inicio[idioma].contacto;
  const etiquetas = idioma === "es" ? ETIQUETA_INTERES : ETIQUETA_INTERES_EN;
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentimiento, setConsentimiento] = useState(false);
  // El error de la casilla aparece cuando la persona la desmarca o sale de ella sin marcarla.
  const [consentimientoTocado, setConsentimientoTocado] = useState(false);
  const consentimientoError = consentimientoTocado && !consentimiento;
  const { token, enviando: loading, verifyFailed, enviar, reiniciarVerificacion, turnstile } = useEnvioContacto();
  const [hrefDemos, setHrefDemos] = useState("");
  const interesRef = useRef<HTMLSelectElement>(null);

  // ?interes=diagnostico (desde /demos-ml) deja la opción elegida. Se lee en el navegador
  // y no con useSearchParams para que el formulario siga en el HTML estático del home.
  useEffect(() => {
    const interes = interesDesdeParam(new URLSearchParams(window.location.search).get("interes"));
    if (interes && interesRef.current) interesRef.current.value = interes;
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consentimiento) {
      setConsentimientoTocado(true);
      return;
    }
    setError(null);

    const form = e.currentTarget;
    const valor = (nombre: string) =>
      (form.elements.namedItem(nombre) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
    const resultado = await enviar(
      {
        nombre: valor("nombre"),
        apellidos: valor("apellidos"),
        empresa: valor("empresa"),
        email: valor("email"),
        telefono: valor("telefono"),
        interes: valor("interes"),
        mensaje: valor("mensaje"),
        // Se lee al enviar y no con useSearchParams: así el formulario sigue en el HTML estático del home.
        origen: new URLSearchParams(window.location.search).get("src") ?? "",
        consentimiento,
        idioma,
      },
      valor(HONEYPOT_FIELD),
    );

    if (resultado.ok) {
      setHrefDemos(hrefConIdioma(RUTA_DEMOS, new URLSearchParams(window.location.search).get("src"), idioma));
      setSent(true);
    }
    else if (resultado.status === 0) setError(tx.errorConexion);
    // En inglés no se muestra el texto en español de /api/contact.
    else if (resultado.status === 429 && tx.errorLimite) setError(tx.errorLimite);
    else if (resultado.status === 400 && tx.errorDatos) setError(tx.errorDatos);
    else setError((idioma === "es" ? resultado.mensajeServidor : null) ?? tx.errorGeneral);
  }

  return (
    <section className="py-24 bg-white" id="contacto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Info left */}
          <div>
            <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-3">{tx.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-black text-mundo-dark mb-5">
              {tx.titulo}
            </h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
              {tx.intro}
            </p>

            {[
              { icon: "✉", label: tx.email, value: site.contacto.email },
              { icon: "📱", label: tx.whatsapp, value: site.contacto.telefono },
              { icon: "📍", label: tx.ubicacion, value: tx.ciudad },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 mb-5">
                <div className="w-[42px] h-[42px] rounded-xl bg-blue-50 flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
                <div>
                  <div className="text-[12px] text-gray-400 font-medium">{label}</div>
                  <div className="text-[15px] text-mundo-dark font-semibold">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form right */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-mundo-dark mb-2">{tx.exitoTitulo}</h3>
                <p className="text-gray-600">{tx.exitoTexto}</p>
                {hrefDemos && (
                  <Link
                    href={hrefDemos}
                    data-cta="ver-demos"
                    className="mt-4 inline-flex min-h-11 items-center font-semibold text-mundo-blue underline underline-offset-4"
                  >
                    {tx.verDemos}
                  </Link>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contacto-nombre" className={LABEL_CLASS}>{tx.nombres}</label>
                    <input id="contacto-nombre" required name="nombre" maxLength={CONTACT_LIMITS.nombre} type="text" autoComplete="given-name" placeholder={tx.nombresPh} className={INPUT_CLASS} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contacto-apellidos" className={LABEL_CLASS}>{tx.apellidos}</label>
                    <input id="contacto-apellidos" required name="apellidos" maxLength={CONTACT_LIMITS.apellidos} type="text" autoComplete="family-name" placeholder={tx.apellidosPh} className={INPUT_CLASS} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-empresa" className={LABEL_CLASS}>{tx.empresa}</label>
                  <input id="contacto-empresa" name="empresa" maxLength={CONTACT_LIMITS.empresa} type="text" autoComplete="organization" placeholder={tx.empresaPh} className={INPUT_CLASS} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contacto-email" className={LABEL_CLASS}>{tx.emailLabel}</label>
                    <input id="contacto-email" required name="email" maxLength={CONTACT_LIMITS.email} type="email" autoComplete="email" placeholder={tx.emailPh} className={INPUT_CLASS} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contacto-telefono" className={LABEL_CLASS}>
                      {tx.telefono} <span className="font-normal text-gray-500">{tx.opcional}</span>
                    </label>
                    <input id="contacto-telefono" name="telefono" maxLength={CONTACT_LIMITS.telefono} type="tel" inputMode="tel" autoComplete="tel" placeholder="+57 300 000 0000"
                      pattern="[0-9 +\-()]{7,30}" title={tx.telefonoAyuda} className={INPUT_CLASS} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-interes" className={LABEL_CLASS}>{tx.interes}</label>
                  <select ref={interesRef} id="contacto-interes" required name="interes" defaultValue="" className={INPUT_CLASS}>
                    <option value="" disabled>{tx.interesPh}</option>
                    {INTERESES.map((valor) => <option key={valor} value={valor}>{etiquetas[valor]}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-mensaje" className={LABEL_CLASS}>{tx.mensaje}</label>
                  <textarea id="contacto-mensaje" required name="mensaje" minLength={CONTACT_LIMITS.mensajeMin} maxLength={CONTACT_LIMITS.mensaje} rows={4} placeholder={tx.mensajePh}
                    className={`${INPUT_CLASS} resize-y min-h-[120px]`} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-start gap-3">
                    <input
                      id="contacto-consentimiento"
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
                      aria-describedby={consentimientoError ? "contacto-consentimiento-error" : undefined}
                      className="mt-0.5 size-5 shrink-0 accent-mundo-blue"
                    />
                    <label htmlFor="contacto-consentimiento" className="text-[13px] leading-relaxed text-gray-600">
                      {tx.consentimientoAntes}{" "}
                      <Link href="/privacidad" target="_blank" className="font-semibold text-mundo-blue underline">
                        {tx.consentimientoEnlace}
                      </Link>
                      {tx.consentimientoDespues}
                    </label>
                  </div>
                  {consentimientoError && (
                    <p id="contacto-consentimiento-error" role="alert" className="text-[13px] text-red-600">
                      {tx.consentimientoError}
                    </p>
                  )}
                </div>

                {/* Campo trampa: oculto para personas y lectores de pantalla; los bots lo llenan. */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label>
                    {tx.honeypot}
                    <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
                  </label>
                </div>

                <Turnstile {...turnstile} idioma={idioma} />

                {verifyFailed && (
                  <p className="text-[13px] text-mundo-dark bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 leading-relaxed">
                    ⚠️ {tx.verificacionFallo}{" "}
                    <button
                      type="button"
                      onClick={reiniciarVerificacion}
                      className="font-semibold text-mundo-blue hover:underline"
                    >
                      {tx.reintentar}
                    </button>{" "}
                    {tx.escribenos}{" "}
                    <a href={`mailto:${site.contacto.email}`} className="font-semibold text-mundo-blue hover:underline">
                      {site.contacto.email}
                    </a>{" "}
                    {tx.oPor}{" "}
                    <a
                      href={`https://wa.me/${site.contacto.telefono.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-mundo-blue hover:underline"
                    >
                      WhatsApp
                    </a>
                    .
                  </p>
                )}

                {error && (
                  <p className="text-[13px] text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    ⚠️ {error}
                  </p>
                )}

                <button type="submit" disabled={loading || !token || !consentimiento}
                  aria-describedby={
                    consentimiento ? undefined : consentimientoError ? "contacto-consentimiento-error" : "contacto-envio-ayuda"
                  }
                  className="w-full bg-mundo-blue text-white font-semibold text-[15px] py-3.5 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60">
                  {loading ? tx.enviando : token ? tx.enviar : verifyFailed ? tx.verificacionPendiente : tx.verificando}
                </button>

                {!consentimiento && !consentimientoError && (
                  <p id="contacto-envio-ayuda" className="text-[12px] text-gray-500 text-center">
                    {tx.ayudaEnvio}
                  </p>
                )}

                <p className="text-[12px] text-gray-400 text-center">
                  {tx.pie}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
