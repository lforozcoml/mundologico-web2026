"use client";

import { useState } from "react";
import { site } from "@/content/data/site";

const servicios = [
  "Knowledge Engine",
  "Support Engine",
  "IA Lab",
  "Signal Engine",
  "Diagnóstico gratuito",
  "Otro",
];

export function ContactoSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Integración con Resend va aquí — por ahora simula éxito
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
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
              Agendamos un diagnóstico gratuito de 30 minutos. Sin compromiso. Al final sabes exactamente qué se puede automatizar en tu operación y cuánto te costaría.
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
                <p className="text-gray-600">Te contactamos en menos de 24 horas para agendar el diagnóstico.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-mundo-dark">Nombre</label>
                    <input required type="text" placeholder="Tu nombre"
                      className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-mundo-dark outline-none focus:border-mundo-blue focus:bg-white transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-mundo-dark">Empresa</label>
                    <input type="text" placeholder="Nombre de tu empresa"
                      className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-mundo-dark outline-none focus:border-mundo-blue focus:bg-white transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-mundo-dark">Email</label>
                  <input required type="email" placeholder="tu@empresa.com"
                    className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-mundo-dark outline-none focus:border-mundo-blue focus:bg-white transition-colors" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-mundo-dark">¿Qué te interesa?</label>
                  <select className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-mundo-dark outline-none focus:border-mundo-blue focus:bg-white transition-colors">
                    <option value="">Selecciona una opción</option>
                    {servicios.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-mundo-dark">Cuéntanos tu proceso o problema</label>
                  <textarea required rows={4} placeholder="¿Qué proceso quieres automatizar? ¿Qué problema tienes hoy?"
                    className="px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-mundo-dark outline-none focus:border-mundo-blue focus:bg-white transition-colors resize-y min-h-[120px]" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-mundo-blue text-white font-semibold text-[15px] py-3.5 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60">
                  {loading ? "Enviando..." : "Agendar diagnóstico gratuito →"}
                </button>

                <p className="text-[12px] text-gray-400 text-center">
                  Sin compromiso. Respuesta en menos de 24 horas.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
