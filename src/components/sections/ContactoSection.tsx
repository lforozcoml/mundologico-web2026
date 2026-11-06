"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/content/data/site";
import { Turnstile } from "@/components/ui/Turnstile";
import { CONTACT_LIMITS, ETIQUETA_INTERES, HONEYPOT_FIELD, INTERESES, type ContactRequest } from "@/lib/contact";

const INPUT_CLASS =
  "px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-mundo-dark outline-none focus:border-mundo-blue focus:bg-white transition-colors aria-[invalid=true]:border-red-400";
const LABEL_CLASS = "text-[13px] font-semibold text-mundo-dark";

export function ContactoSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [consentimiento, setConsentimiento] = useState(false);
  // El error de la casilla aparece cuando la persona la desmarca o sale de ella sin marcarla.
  const [consentimientoTocado, setConsentimientoTocado] = useState(false);
  const consentimientoError = consentimientoTocado && !consentimiento;
  // Momento en que se pintó el formulario: los bots envían en milisegundos.
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consentimiento) {
      setConsentimientoTocado(true);
      return;
    }
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data: ContactRequest = {
      nombre:    (form.elements.namedItem("nombre")    as HTMLInputElement).value,
      apellidos: (form.elements.namedItem("apellidos") as HTMLInputElement).value,
      empresa:   (form.elements.namedItem("empresa")   as HTMLInputElement).value,
      email:     (form.elements.namedItem("email")     as HTMLInputElement).value,
      telefono:  (form.elements.namedItem("telefono")  as HTMLInputElement).value,
      interes:   (form.elements.namedItem("interes")   as HTMLSelectElement).value,
      mensaje:   (form.elements.namedItem("mensaje")   as HTMLTextAreaElement).value,
      // Se lee al enviar y no con useSearchParams: así el formulario sigue en el HTML estático del home.
      origen:    new URLSearchParams(window.location.search).get("src") ?? "",
      consentimiento,
      [HONEYPOT_FIELD]: (form.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement).value,
      elapsedMs: Date.now() - startedAtRef.current,
      turnstileToken: token ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({}));
        setError(msg ?? "Ocurrió un error. Intenta de nuevo o escríbenos directamente.");
        // El token de Turnstile ya se usó: hay que pedir uno nuevo.
        setResetSignal((n) => n + 1);
        return;
      }

      setSent(true);
    } catch {
      setError("No se pudo enviar el mensaje. Revisa tu conexión e intenta de nuevo.");
      setResetSignal((n) => n + 1);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-24 bg-white" id="contacto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Info left */}
          <div>
            <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-3">Contacto</p>
            <h2 className="text-3xl md:text-4xl font-black text-mundo-dark mb-5">
              Cuéntanos qué quieres automatizar
            </h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
              Agenda una llamada de 20 minutos. Sin compromiso. Revisamos un proceso concreto y te decimos si vale la pena automatizarlo.
            </p>

            {[
              { icon: "✉", label: "Email", value: site.contacto.email },
              { icon: "📱", label: "WhatsApp", value: site.contacto.telefono },
              { icon: "📍", label: "Ubicación", value: site.contacto.ciudad },
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
                <h3 className="text-xl font-bold text-mundo-dark mb-2">Mensaje recibido</h3>
                <p className="text-gray-600">Te respondemos en 24 a 48 horas para agendar la llamada.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contacto-nombre" className={LABEL_CLASS}>Nombres</label>
                    <input id="contacto-nombre" required name="nombre" maxLength={CONTACT_LIMITS.nombre} type="text" autoComplete="given-name" placeholder="Tus nombres" className={INPUT_CLASS} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contacto-apellidos" className={LABEL_CLASS}>Apellidos</label>
                    <input id="contacto-apellidos" required name="apellidos" maxLength={CONTACT_LIMITS.apellidos} type="text" autoComplete="family-name" placeholder="Tus apellidos" className={INPUT_CLASS} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-empresa" className={LABEL_CLASS}>Empresa</label>
                  <input id="contacto-empresa" name="empresa" maxLength={CONTACT_LIMITS.empresa} type="text" autoComplete="organization" placeholder="Nombre de tu empresa" className={INPUT_CLASS} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contacto-email" className={LABEL_CLASS}>Email</label>
                    <input id="contacto-email" required name="email" maxLength={CONTACT_LIMITS.email} type="email" autoComplete="email" placeholder="tu@empresa.com" className={INPUT_CLASS} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contacto-telefono" className={LABEL_CLASS}>
                      Teléfono o WhatsApp <span className="font-normal text-gray-500">(opcional)</span>
                    </label>
                    <input id="contacto-telefono" name="telefono" maxLength={CONTACT_LIMITS.telefono} type="tel" inputMode="tel" autoComplete="tel" placeholder="+57 300 000 0000"
                      pattern="[0-9 +\-()]{7,30}" title="Al menos 7 dígitos. Solo números, espacios, +, - o paréntesis." className={INPUT_CLASS} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-interes" className={LABEL_CLASS}>¿Qué te interesa?</label>
                  <select id="contacto-interes" required name="interes" defaultValue="" className={INPUT_CLASS}>
                    <option value="" disabled>Selecciona una opción</option>
                    {INTERESES.map((valor) => <option key={valor} value={valor}>{ETIQUETA_INTERES[valor]}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contacto-mensaje" className={LABEL_CLASS}>Cuéntanos tu proceso o problema</label>
                  <textarea id="contacto-mensaje" required name="mensaje" minLength={CONTACT_LIMITS.mensajeMin} maxLength={CONTACT_LIMITS.mensaje} rows={4} placeholder="¿Qué proceso quieres automatizar? ¿Qué problema tienes hoy?"
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
                      Autorizo a Mundo Lógico a tratar mis datos para responder a esta solicitud, según la{" "}
                      <Link href="/privacidad" target="_blank" className="font-semibold text-mundo-blue underline">
                        política de privacidad
                      </Link>
                      .
                    </label>
                  </div>
                  {consentimientoError && (
                    <p id="contacto-consentimiento-error" role="alert" className="text-[13px] text-red-600">
                      Marca la autorización para poder enviar tu mensaje.
                    </p>
                  )}
                </div>

                {/* Campo trampa: oculto para personas y lectores de pantalla; los bots lo llenan. */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label>
                    Sitio web
                    <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
                  </label>
                </div>

                <Turnstile
                  onToken={(t) => {
                    setToken(t);
                    if (t) setVerifyFailed(false);
                  }}
                  onError={() => setVerifyFailed(true)}
                  resetSignal={resetSignal}
                />

                {verifyFailed && (
                  <p className="text-[13px] text-mundo-dark bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 leading-relaxed">
                    ⚠️ No pudimos verificar tu navegador.{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setVerifyFailed(false);
                        setResetSignal((n) => n + 1);
                      }}
                      className="font-semibold text-mundo-blue hover:underline"
                    >
                      Intentar de nuevo
                    </button>{" "}
                    o escríbenos a{" "}
                    <a href={`mailto:${site.contacto.email}`} className="font-semibold text-mundo-blue hover:underline">
                      {site.contacto.email}
                    </a>{" "}
                    o por{" "}
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
                  {loading ? "Enviando..." : token ? "Enviar mensaje →" : verifyFailed ? "Verificación pendiente" : "Verificando..."}
                </button>

                {!consentimiento && !consentimientoError && (
                  <p id="contacto-envio-ayuda" className="text-[12px] text-gray-500 text-center">
                    Para enviar, marca la autorización de tratamiento de datos.
                  </p>
                )}

                <p className="text-[12px] text-gray-400 text-center">
                  Sin compromiso. Te respondemos en 24 a 48 horas.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
