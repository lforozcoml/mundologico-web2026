import { LifeBuoy } from "lucide-react";
import { soporte } from "@/content/data/ecommerce-shopify";

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
