import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { idiomaDePagina } from "@/lib/i18n/servidor";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { CALENDARIO_URL } from "@/content/data/site";
import { StackPill } from "@/components/ui/StackPill";
import { PUBLICADO as ECOMMERCE_PUBLICADO, entradaPorIdioma } from "@/content/data/ecommerce-shopify";
import { productosDetalle, productosPagina, type ColorProducto } from "@/content/data/i18n/productos-pagina";
import { inicio } from "@/content/data/i18n/inicio";
import type { Idioma } from "@/lib/i18n/config";
import { enlaceOEspanol } from "@/lib/i18n/rutas";

export async function generateMetadata({ params }: PageProps<"/[lang]/productos">): Promise<Metadata> {
  const idioma = await idiomaDePagina(params, "productos");
  const tx = productosPagina[idioma];
  return pageMetadata({
    title: tx.meta.title,
    description: ECOMMERCE_PUBLICADO ? entradaPorIdioma[idioma].hub.description : tx.meta.descriptionSinEcommerce,
    idioma,
    ruta: "productos",
  });
}

const colorToken: Record<ColorProducto, { accent: string; bg: string; border: string; tag: string; grad: string }> = {
  blue:     { accent: "#176BEC", bg: "rgba(23,107,236,.08)",  border: "rgba(23,107,236,.2)",  tag: "text-mundo-blue",   grad: "linear-gradient(135deg,#23274C 0%,#176BEC 100%)" },
  teal:     { accent: "#04BCA6", bg: "rgba(4,188,166,.08)",   border: "rgba(4,188,166,.2)",   tag: "text-mundo-teal",   grad: "linear-gradient(135deg,#23274C 0%,#04BCA6 100%)" },
  purple:   { accent: "#513EF5", bg: "rgba(81,62,245,.08)",   border: "rgba(81,62,245,.2)",   tag: "text-mundo-purple", grad: "linear-gradient(135deg,#23274C 0%,#513EF5 100%)" },
  lavender: { accent: "#6F6DFB", bg: "rgba(111,109,251,.08)", border: "rgba(111,109,251,.2)", tag: "text-[#6F6DFB]",    grad: "linear-gradient(135deg,#23274C 0%,#6F6DFB 100%)" },
};


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

const FOCO = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue";

/** Dos puertas: e-commerce y automatización. Solo con la página de e-commerce publicada. */
function PuertasHub({ idioma }: { idioma: Idioma }) {
  const entrada = entradaPorIdioma[idioma];
  const tx = productosPagina[idioma];
  return (
    <section aria-label={tx.puertasAria} className="bg-white pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <article id="ecommerce" className="scroll-mt-24 flex flex-col rounded-3xl bg-mundo-dark p-8 text-white md:p-10">
            <p className="mb-3 text-[13px] font-extrabold uppercase tracking-widest text-mundo-teal">{entrada.shopify.eyebrow}</p>
            <h2 className="mb-3 text-3xl font-black leading-tight">{entrada.shopify.titulo}</h2>
            <p className="mb-6 text-[17px] leading-relaxed text-white/80">{entrada.shopify.texto}</p>
            <ul className="mb-8 flex flex-wrap gap-2" aria-label={tx.serviciosAria}>
              {entrada.shopify.servicios.map((s) => (
                <li key={s} className="rounded-full bg-white/10 px-4 py-1.5 text-[14px] font-semibold text-white">
                  {s}
                </li>
              ))}
            </ul>
            <Link
              href={enlaceOEspanol("ecommerceShopify", idioma)}
              data-cta="hub-puerta-ecommerce"
              className="mt-auto inline-flex min-h-12 w-fit items-center rounded-full bg-white px-7 py-3 text-base font-semibold text-mundo-dark transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {entrada.anclaje}
            </Link>
          </article>
          <article className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 md:p-10">
            <p className="mb-3 text-[13px] font-extrabold uppercase tracking-widest text-mundo-blue">{entrada.automatizacion.eyebrow}</p>
            <h2 className="mb-3 text-3xl font-black leading-tight text-mundo-dark">{entrada.automatizacion.titulo}</h2>
            <p className="mb-8 text-[17px] leading-relaxed text-gray-600">{entrada.automatizacion.texto}</p>
            <a
              href={entrada.automatizacion.href}
              data-cta="hub-puerta-automatizacion"
              className={`mt-auto inline-flex min-h-12 w-fit items-center rounded-full bg-mundo-dark px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-mundo-blue ${FOCO}`}
            >
              {entrada.automatizacion.cta}
            </a>
          </article>
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-gray-600">
          {entrada.puente.texto}{" "}
          <Link
            href={entrada.puente.href}
            className={`inline-flex min-h-11 items-center rounded font-semibold text-mundo-blue underline underline-offset-4 hover:text-mundo-dark ${FOCO}`}
          >
            {entrada.puente.enlace}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default async function ProductosPage({ params }: PageProps<"/[lang]/productos">) {
  const idioma = await idiomaDePagina(params, "productos");
  const tx = productosPagina[idioma];
  const entrada = entradaPorIdioma[idioma];
  const productos = productosDetalle[idioma];
  return (
    <>
      <Header idioma={idioma} ruta="productos" />
      <main className="flex-1 pt-16">

        {/* Page header */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <Image src="/isotipo-separador.svg" alt="" width={28} height={28} className="mb-4" />
            <p className="text-[13px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">{tx.eyebrow}</p>
            {ECOMMERCE_PUBLICADO ? (
              <>
                <h1 className="text-5xl md:text-6xl font-black text-mundo-dark leading-tight mb-6">
                  {entrada.hub.h1a}<br />
                  <span className="text-mundo-blue">{entrada.hub.h1b}</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">{entrada.hub.texto}</p>
              </>
            ) : (
              <>
                <h1 className="text-5xl md:text-6xl font-black text-mundo-dark leading-tight mb-6">
                  {tx.sinEcommerce.h1a}<br />
                  <span className="text-mundo-blue">{tx.sinEcommerce.h1b}</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  {tx.sinEcommerce.texto}
                </p>
              </>
            )}
          </div>
        </section>

        {ECOMMERCE_PUBLICADO && (
          <>
            <PuertasHub idioma={idioma} />
            <section id="automatizacion" className="scroll-mt-24 bg-white pt-20">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-black text-mundo-dark leading-tight mb-5">
                  {entrada.seccionAutomatizacion.titulo}
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">{entrada.seccionAutomatizacion.texto}</p>
              </div>
            </section>
          </>
        )}

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
                        {tx.producto} {p.numero}
                      </div>
                      {p.id === "ia-lab" && (
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold tracking-wide text-white/90" style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)" }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                          {tx.engagement}
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
                      {tx.cta}
                    </Link>
                  </div>
                </div>

                {/* Main content grid */}
                <div className="grid md:grid-cols-3 gap-10">

                  {/* Left col: problema + pasos */}
                  <div className="md:col-span-2 flex flex-col gap-10">

                    {/* Problema */}
                    <div className="rounded-2xl p-8 border border-gray-200 bg-white">
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">{tx.problema}</p>
                      <p className="text-[17px] text-gray-800 leading-relaxed font-medium">{p.problema}</p>
                    </div>

                    {/* Pasos */}
                    <div>
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-6">{tx.comoFunciona}</p>
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
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-6">{tx.queIncluye}</p>
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
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-5">{tx.paraQuien}</p>
                      <div className="flex flex-col gap-3.5">
                        {p.para_quien.map((item) => (
                          <div key={item} className="flex gap-2.5 text-[14px] text-gray-800 leading-snug font-medium">
                            <CheckIcon color={ct.accent} />
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="h-px bg-gray-100 my-5" />
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">{tx.noEsPara}</p>
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
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-5">{tx.stack}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <StackPill key={s} name={s} size="md" />
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
          titulo={tx.bandaFinal.titulo}
          descripcion={tx.bandaFinal.descripcion}
          // En español se deja el CTA principal por defecto de CtaBand, como antes.
          {...(idioma === "es" ? {} : { ctaPrimario: { label: inicio[idioma].bandaFinal.ctaPrimario, href: CALENDARIO_URL } })}
          ctaSecundario={{ label: tx.bandaFinal.ctaSecundario, href: enlaceOEspanol("casos", idioma) }}
        />
      </main>
      <Footer idioma={idioma} />
    </>
  );
}
