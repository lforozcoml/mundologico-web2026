import { Check, LifeBuoy, ShieldCheck } from "lucide-react";
import { comoTrabajamos, incluye, soporte } from "@/content/data/ecommerce-shopify";

export function Incluye() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 max-w-2xl text-3xl font-black leading-tight text-mundo-dark md:text-4xl">{incluye.titulo}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {incluye.items.map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-5">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-mundo-teal/15 text-[#037F70]">
                <Check aria-hidden className="size-4" />
              </span>
              <span className="text-[16px] leading-relaxed text-mundo-dark">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ComoTrabajamos() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl font-black leading-tight text-mundo-dark md:text-4xl">{comoTrabajamos.titulo}</h2>
        <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {comoTrabajamos.pasos.map((paso, i) => (
            <li key={paso} className="relative rounded-2xl bg-white p-5 shadow-sm">
              <span className="mb-3 flex size-9 items-center justify-center rounded-full bg-mundo-blue text-[15px] font-black text-white">
                {i + 1}
              </span>
              <span className="text-[16px] font-bold leading-snug text-mundo-dark">{paso}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 flex items-start gap-3 text-[16px] font-semibold text-mundo-dark">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-mundo-blue" />
          {comoTrabajamos.nota}
        </p>
      </div>
    </section>
  );
}

export function SoporteMensual() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="flex flex-col gap-6 rounded-3xl p-8 text-white md:flex-row md:items-center md:p-12"
          style={{ background: "linear-gradient(135deg,#23274C 0%,#513EF5 100%)" }}
        >
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <LifeBuoy aria-hidden className="size-8" />
          </span>
          <div>
            <h2 className="mb-3 text-3xl font-black leading-tight">{soporte.titulo}</h2>
            <p className="text-lg leading-relaxed text-white/85">{soporte.texto}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
