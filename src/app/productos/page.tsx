import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { CALENDARIO_URL } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Productos — Mundo Lógico",
  description: "Soluciones de automatización con IA para tu empresa. Knowledge Engine, Support Engine, IA Lab y Signal Engine.",
};

const colorToken = {
  blue:     { accent: "#176BEC", bg: "rgba(23,107,236,.08)",  border: "rgba(23,107,236,.2)",  tag: "text-mundo-blue",   grad: "linear-gradient(135deg,#23274C 0%,#176BEC 100%)" },
  teal:     { accent: "#04BCA6", bg: "rgba(4,188,166,.08)",   border: "rgba(4,188,166,.2)",   tag: "text-mundo-teal",   grad: "linear-gradient(135deg,#23274C 0%,#04BCA6 100%)" },
  purple:   { accent: "#513EF5", bg: "rgba(81,62,245,.08)",   border: "rgba(81,62,245,.2)",   tag: "text-mundo-purple", grad: "linear-gradient(135deg,#23274C 0%,#513EF5 100%)" },
  lavender: { accent: "#6F6DFB", bg: "rgba(111,109,251,.08)", border: "rgba(111,109,251,.2)", tag: "text-[#6F6DFB]",    grad: "linear-gradient(135deg,#23274C 0%,#6F6DFB 100%)" },
};

type ColorKey = keyof typeof colorToken;

const productos: {
  id: string;
  numero: string;
  nombre: string;
  tagline: string;
  color: ColorKey;
  problema: string;
  descripcion: string;
  pasos: { titulo: string; desc: string }[];
  features: string[];
  addons: { label: string; items: string[] };
  para_quien: string[];
  no_es_para: string[];
  stack: string[];
}[] = [
  {
    id: "ia-lab",
    numero: "01",
    nombre: "IA Lab",
    tagline: "En 90 días sabes si tu hipótesis de IA funciona — con datos reales y el sistema ya construido.",
    color: "purple",
    problema: "Las empresas saben que deben incorporar IA pero no saben por dónde empezar sin arriesgar sus sistemas o presupuestos. Los proyectos de exploración genéricos son costosos, demoran meses y terminan en informes sin nada implementado. El resultado: inversión sin retorno medible y resistencia interna que bloquea la adopción real.",
    descripcion: "Tomamos un caso de uso de negocio concreto, construimos un experimento con arquitectura real, lo medimos con métricas definidas desde el inicio, y lo iteramos mínimo dos veces — todo en un ambiente sandbox, sin tocar los sistemas productivos. En 90 días tienes una decisión basada en datos: escalar o no. Y si escala, el sistema ya está construido.",
    pasos: [
      { titulo: "Definición", desc: "Caso de uso, hipótesis, métricas de éxito técnicas y de negocio. Sin KPI definido, el experimento no arranca." },
      { titulo: "Construcción", desc: "Arquitectura funcional completa en sandbox — datos, flujos, inteligencia. Nunca en producción." },
      { titulo: "Iteración", desc: "Mínimo dos ciclos de ajuste y medición con datos reales del cliente." },
      { titulo: "Decisión", desc: "¿Cumple la métrica? ¿El impacto es medible? ¿El costo proyectado es viable? Si sí — ya está listo para producción." },
    ],
    features: [
      "De la hipótesis a un MVP validado en 90 días",
      "Sandbox seguro — sin tocar sistemas productivos",
      "Métricas técnicas y de negocio definidas antes de arrancar",
      "Mínimo 2 ciclos de iteración por caso de uso",
    ],
    addons: {
      label: "Casos de uso frecuentes",
      items: ["Procesamiento de documentos", "Atención al cliente", "Reportes automáticos", "Onboarding automatizado"],
    },
    para_quien: [
      "Empresas medianas o grandes que quieren validar IA antes de comprometer presupuesto",
      "Organizaciones con procesos repetitivos donde sospechan que la IA puede ayudar pero no tienen certeza",
      "Equipos de innovación que necesitan evidencia para venderle la idea internamente",
    ],
    no_es_para: [
      "Empresas que ya saben exactamente qué construir y tienen presupuesto aprobado",
      "Proyectos donde no hay acceso a datos reales del proceso",
    ],
    stack: ["Make.com", "OpenAI / Claude / Gemini", "Airtable", "Monday.com", "Google Docs"],
  },
  {
    id: "knowledge-engine",
    numero: "02",
    nombre: "Knowledge Engine",
    tagline: "Tu base de conocimiento siempre actualizada, sin depender de que alguien encuentre el tiempo de escribir.",
    color: "blue",
    problema: "Tu equipo de soporte pierde horas respondiendo siempre las mismas preguntas. La base de conocimiento existe pero está desactualizada, incompleta o mal estructurada. Cuando los procesos cambian, nadie actualiza la documentación. El resultado: los agentes improvisan, los clientes no encuentran respuestas, y los tickets siguen creciendo.",
    descripcion: "Construimos y mantenemos la base de conocimiento de tu mesa de ayuda con agentes de IA. Tu equipo da las instrucciones, los agentes generan el contenido, tú lo validas, y el sistema publica y actualiza automáticamente en la plataforma que ya usas.",
    pasos: [
      { titulo: "Ingesta", desc: "El cliente entrega lo que tiene — PDFs, tickets resueltos, manuales. Los agentes estructuran la base." },
      { titulo: "Generación", desc: "El equipo indica qué artículo necesita. El agente genera el borrador usando solo información validada." },
      { titulo: "Validación", desc: "El validador aprueba o rechaza con comentarios. Si rechaza, el agente corrige sin reescribir desde cero." },
      { titulo: "Publicación", desc: "El sistema publica automáticamente. Cuando algo cambia, detecta los artículos afectados y los marca para actualizar." },
    ],
    features: [
      "Genera artículos desde instrucciones en lenguaje natural",
      "Flujo editorial con aprobación, rechazo y fecha programada",
      "Publica automáticamente en Zendesk, WordPress, Confluence y más",
      "Detecta contenido desactualizado y lo marca para revisión",
    ],
    addons: {
      label: "Add-ons disponibles",
      items: ["Múltiples idiomas", "Actualizaciones automáticas", "Imágenes con IA"],
    },
    para_quien: [
      "Empresas con equipos de soporte que atienden volumen alto de consultas repetitivas",
      "Organizaciones con documentación dispersa que nadie mantiene actualizada",
      "Empresas que ya tienen Zendesk, Freshdesk o similar pero lo usan por debajo de su potencial",
    ],
    no_es_para: [
      "Empresas sin ningún proceso documentado",
      "Equipos sin un responsable de validar el contenido generado",
    ],
    stack: ["Claude (Anthropic)", "Make.com", "Airtable", "Monday.com", "Zendesk / Freshdesk / Confluence"],
  },
  {
    id: "support-engine",
    numero: "03",
    nombre: "Support Engine",
    tagline: "Tu equipo humano solo atiende los casos que realmente necesitan juicio humano.",
    color: "teal",
    problema: "Los equipos de soporte responden las mismas preguntas todos los días. El volumen crece, contratar más agentes es caro, y los bots genéricos no conocen tu negocio — terminan frustrando al cliente sin resolver nada. Los agentes humanos se desgastan atendiendo casos que no requieren juicio humano, y los tiempos de respuesta siguen siendo altos.",
    descripcion: "Desplegamos un agente de IA entrenado con el conocimiento real de tu empresa. Atiende a tus clientes por los canales que ya usan — WhatsApp, voz o web — resuelve lo que puede resolver, escala lo que no puede con el contexto completo, y se conecta a tus sistemas para consultar y registrar información en tiempo real.",
    pasos: [
      { titulo: "Base de conocimiento", desc: "Lo que el agente sabe. Sin esto el agente no puede responder bien. Se construye en el setup." },
      { titulo: "Agente conversacional", desc: "Modelo de lenguaje con contexto del cliente, tono definido y límites claros. No improvisa fuera de la base." },
      { titulo: "Resolución o escalamiento", desc: "Resuelve lo que puede en tiempo real. Lo que no puede resolverlo, lo escala con el historial completo." },
      { titulo: "Orquestación", desc: "Make.com conecta el agente con el canal, gestiona el flujo y registra cada interacción." },
    ],
    features: [
      "Activo 24/7 en WhatsApp con base de conocimiento propia",
      "Consulta tus sistemas en tiempo real para responder con datos reales",
      "Escala con historial completo — el cliente no repite nada",
      "Responde solo con información validada — sin alucinaciones",
    ],
    addons: {
      label: "Add-ons disponibles",
      items: ["Agente de voz (VAPI)", "Autenticación de usuarios", "Conexión a APIs", "Procesamiento de pagos"],
    },
    para_quien: [
      "Empresas con alto volumen de consultas repetitivas por WhatsApp u otros canales",
      "Call centers que quieren extender horario o reducir carga operativa",
      "Empresas que ya tienen base de conocimiento pero no la tienen activada en atención",
    ],
    no_es_para: [
      "Empresas sin procesos de atención definidos",
      "Casos donde casi toda la atención requiere criterio humano complejo",
    ],
    stack: ["WhatsApp Business API (Meta)", "OpenAI / Claude", "Make.com", "Airtable", "Monday.com"],
  },
  {
    id: "signal-engine",
    numero: "04",
    nombre: "Signal Engine",
    tagline: "Tu negocio detecta oportunidades en sus propios datos y actúa solo — sin que nadie tenga que estar mirando reportes.",
    color: "lavender",
    problema: "Tu empresa acumula datos todos los días — en el CRM, en el sistema de facturación, en la app de loyalty. Pero esos datos están dormidos. Nadie los mira en tiempo real, y cuando alguien los analiza ya es tarde para actuar. Las campañas se lanzan para todos igual, las oportunidades se pierden porque nadie las detectó a tiempo.",
    descripcion: "Conectamos tus fuentes de datos, las analizamos con IA de forma continua, y cuando detecta una señal relevante — actúa solo. Tu negocio aprende de su propio comportamiento y responde en tiempo real bajo reglas explícitas que tú defines.",
    pasos: [
      { titulo: "Integración de fuentes", desc: "Conectamos tu CRM, loyalty, facturación y otras plataformas con API disponible." },
      { titulo: "Análisis continuo con IA", desc: "El sistema analiza patrones de comportamiento, métricas clave y anomalías de forma continua." },
      { titulo: "Reglas de negocio", desc: "Definen contigo qué señales importan y qué acción dispara cada una. Nada autónomo sin reglas explícitas." },
      { titulo: "Acción automatizada", desc: "WhatsApp, email, registro en CRM o activación de beneficio — cuando las condiciones se cumplen." },
    ],
    features: [
      "Integra CRM, loyalty, facturación y otras fuentes en un solo flujo",
      "Detecta patrones de comportamiento en tiempo real",
      "Dispara acciones automáticas por WhatsApp o email según reglas definidas",
      "Todo bajo reglas explícitas — sin acciones autónomas sin control",
    ],
    addons: {
      label: "Sectores frecuentes",
      items: ["Retail y centros comerciales", "Telecomunicaciones", "Salud", "Finanzas"],
    },
    para_quien: [
      "Empresas con datos de clientes dispersos en varios sistemas que hoy no se cruzan",
      "Equipos de marketing que lanzan campañas manuales y genéricas por falta de automatización",
      "Organizaciones con CRM activo pero que no lo usan para disparar acciones en tiempo real",
    ],
    no_es_para: [
      "Empresas sin datos estructurados o plataformas sin API disponible",
      "Organizaciones que no tienen claridad sobre qué comportamiento quieren detectar",
    ],
    stack: ["Make.com", "OpenAI / Google Gemini", "CRM del cliente", "WhatsApp Business API", "Monday.com"],
  },
];

function DecoShapes({ id }: { id: string }) {
  if (id === "knowledge-engine") return (
    <>
      <div className="absolute pointer-events-none rounded-full" style={{ width:180,height:180,background:"rgba(255,255,255,.09)",top:-60,right:-40 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:90,height:90,background:"rgba(255,255,255,.07)",top:60,right:120 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:120,height:44,borderRadius:99,background:"rgba(255,255,255,.05)",bottom:30,right:60 }} />
    </>
  );
  if (id === "support-engine") return (
    <>
      <div className="absolute pointer-events-none rounded-full" style={{ width:200,height:200,background:"rgba(255,255,255,.08)",top:"50%",right:-80,transform:"translateY(-50%)" }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:100,height:100,background:"rgba(255,255,255,.06)",bottom:-40,right:100 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:22,height:22,background:"rgba(255,255,255,.18)",top:30,right:200 }} />
    </>
  );
  if (id === "ia-lab") return (
    <>
      <div className="absolute pointer-events-none" style={{ width:240,height:80,borderRadius:99,background:"rgba(255,255,255,.08)",bottom:20,right:-30,transform:"rotate(-7deg)" }} />
      <div className="absolute pointer-events-none" style={{ width:140,height:50,borderRadius:99,background:"rgba(255,255,255,.06)",bottom:40,right:60,transform:"rotate(-7deg)" }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:24,height:32,background:"rgba(255,255,255,.18)",top:20,right:180 }} />
    </>
  );
  if (id === "signal-engine") return (
    <>
      <div className="absolute pointer-events-none" style={{ width:260,height:80,borderRadius:99,background:"rgba(255,255,255,.09)",top:10,right:-50,transform:"rotate(11deg)" }} />
      <div className="absolute pointer-events-none" style={{ width:160,height:50,borderRadius:99,background:"rgba(255,255,255,.06)",bottom:20,right:80,transform:"rotate(-5deg)" }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:18,height:18,background:"rgba(255,255,255,.20)",top:40,right:220 }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width:10,height:10,background:"rgba(255,255,255,.14)",bottom:40,right:160 }} />
    </>
  );
  return null;
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function ProductosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">

        {/* Page header */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <Image src="/isotipo-separador.svg" alt="" width={28} height={28} className="mb-4" />
            <p className="text-[13px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">Nuestros productos</p>
            <h1 className="text-5xl md:text-6xl font-black text-mundo-dark leading-tight mb-6">
              Automatización con IA,<br />
              <span className="text-mundo-blue">lista para tu operación</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Cada producto resuelve un problema concreto. No son demos ni conceptos — son sistemas funcionando con arquitectura real, métricas verificables y soporte continuo.
            </p>
          </div>
        </section>

        {/* Products */}
        {productos.map((p, idx) => {
          const ct = colorToken[p.color];
          const isEven = idx % 2 === 0;
          return (
            <section
              key={p.id}
              id={p.id}
              className={`py-24 ${isEven ? "bg-white" : "bg-gray-50"}`}
            >
              <div className="max-w-7xl mx-auto px-6">

                {/* Product header — card style */}
                <div
                  className="relative overflow-hidden rounded-3xl px-12 pt-12 pb-11 mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
                  style={{ background: ct.grad }}
                >
                  <DecoShapes id={p.id} />
                  <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest text-white" style={{ background: "rgba(255,255,255,.18)" }}>
                        Producto {p.numero}
                      </div>
                      {p.id === "ia-lab" && (
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold tracking-wide text-white/90" style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)" }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                          Engagement de 90 días
                        </div>
                      )}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">{p.nombre}</h2>
                    <p className="text-xl text-white/90 leading-snug font-medium mb-5">{p.tagline}</p>
                    <p className="text-[16px] text-white/70 leading-relaxed max-w-xl">{p.descripcion}</p>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <Link
                      href={CALENDARIO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-mundo-dark font-bold text-[15px] px-7 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      Agendar diagnóstico →
                    </Link>
                  </div>
                </div>

                {/* Main content grid */}
                <div className="grid md:grid-cols-3 gap-10">

                  {/* Left col: problema + pasos */}
                  <div className="md:col-span-2 flex flex-col gap-10">

                    {/* Problema */}
                    <div className="rounded-2xl p-8 border border-gray-200 bg-white">
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">El problema</p>
                      <p className="text-[17px] text-gray-800 leading-relaxed font-medium">{p.problema}</p>
                    </div>

                    {/* Pasos */}
                    <div>
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-6">Cómo funciona</p>
                      <div className="grid sm:grid-cols-2 gap-5">
                        {p.pasos.map((paso, i) => (
                          <div
                            key={paso.titulo}
                            className="rounded-2xl p-7 border"
                            style={{ background: ct.bg, borderColor: ct.border }}
                          >
                            <div
                              className="text-[12px] font-black uppercase tracking-widest mb-3"
                              style={{ color: ct.accent }}
                            >
                              {String(i + 1).padStart(2, "0")} · {paso.titulo}
                            </div>
                            <p className="text-[15px] text-gray-800 leading-relaxed font-medium">{paso.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="rounded-2xl p-8 border border-gray-200 bg-white">
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-6">Qué incluye</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {p.features.map((f) => (
                          <div key={f} className="flex gap-3 text-[15px] text-gray-800 leading-snug font-medium">
                            <CheckIcon color={ct.accent} />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right col: para quién + addons + stack */}
                  <div className="flex flex-col gap-6">

                    {/* Para quién */}
                    <div className="rounded-2xl p-7 border border-gray-200 bg-white">
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-5">Para quién es</p>
                      <div className="flex flex-col gap-3.5">
                        {p.para_quien.map((item) => (
                          <div key={item} className="flex gap-2.5 text-[14px] text-gray-800 leading-snug font-medium">
                            <CheckIcon color={ct.accent} />
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="h-px bg-gray-100 my-5" />
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">No es para</p>
                      <div className="flex flex-col gap-3.5">
                        {p.no_es_para.map((item) => (
                          <div key={item} className="flex gap-2.5 text-[14px] text-gray-500 leading-snug">
                            <XIcon />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add-ons */}
                    <div
                      className="rounded-2xl p-7 border"
                      style={{ background: ct.bg, borderColor: ct.border }}
                    >
                      <p className="text-[12px] font-extrabold uppercase tracking-widest mb-5" style={{ color: ct.accent }}>
                        {p.addons.label}
                      </p>
                      <div className="flex flex-col gap-3">
                        {p.addons.items.map((item) => (
                          <div key={item} className="flex gap-2.5 text-[15px] text-gray-800 leading-snug font-medium">
                            <span style={{ color: ct.accent }} className="flex-shrink-0 font-bold">→</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stack */}
                    <div className="rounded-2xl p-7 border border-gray-200 bg-white">
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-5">Stack tecnológico</p>
                      <div className="flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span key={s} className="text-[13px] font-bold text-gray-700 bg-gray-100 rounded-lg px-3 py-1.5">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <CtaBand
          titulo="¿Cuál de estos productos es para tu empresa?"
          descripcion="La primera sesión de diagnóstico es gratis. En 45 minutos identificamos qué automatizar y qué producto encaja mejor con tu operación."
          ctaSecundario={{ label: "Ver casos de éxito", href: "/casos" }}
        />
      </main>
      <Footer />
    </>
  );
}
