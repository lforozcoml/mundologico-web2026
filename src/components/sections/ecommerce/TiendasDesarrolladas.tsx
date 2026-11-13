import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { cifraVisible, enlaceTienda, type Tienda } from "@/content/data/ecommerce-shopify";
import { ecommerce, type UiEcommerce } from "@/content/data/i18n/ecommerce-contenido";
import type { Idioma } from "@/lib/i18n/config";

function TarjetaTienda({ tienda, ui }: { tienda: Tienda; ui: UiEcommerce }) {
  const cifra = cifraVisible(tienda);
  const enlace = enlaceTienda(tienda);
  return (
    <li className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-5 flex h-8 items-center">
        {tienda.logo ? (
          <Image
            src={tienda.logo.src}
            width={tienda.logo.width}
            height={tienda.logo.height}
            alt={`${ui.logoDe} ${tienda.nombre}`}
            loading="lazy"
            className="h-8 w-auto"
          />
        ) : (
          <span aria-hidden className="text-xl font-black text-mundo-dark">
            {tienda.nombre}
          </span>
        )}
      </div>
      <h3 className="text-xl font-black text-mundo-dark">{tienda.nombre}</h3>
      <p className="mb-3 text-[15px] font-semibold text-mundo-blue">{tienda.desde}</p>
      <ul aria-label={ui.serviciosAria} className="mb-4 flex flex-wrap gap-2">
        {tienda.servicios.map((s) => (
          <li key={s} className="rounded-full bg-gray-100 px-3 py-1 text-[13px] font-semibold text-gray-700">
            {ui.servicios[s]}
          </li>
        ))}
      </ul>
      <p className="text-[16px] leading-relaxed text-gray-600">{tienda.descripcion}</p>
      {cifra && <p className="mt-4 text-[16px] font-bold text-mundo-dark">{cifra}</p>}
      {enlace && (
        <a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 font-bold text-mundo-blue underline underline-offset-4 hover:text-mundo-dark focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-blue"
        >
          {ui.verTienda}
          <ExternalLink aria-hidden className="size-4" />
          <span className="sr-only">{`${tienda.nombre} (${ui.abrePestana})`}</span>
        </a>
      )}
    </li>
  );
}

/** Solo recibe tiendas autorizadas (lo filtra la página). */
export function TiendasDesarrolladas({ tiendas, idioma }: { tiendas: readonly Tienda[]; idioma: Idioma }) {
  const { tiendasSeccion, ui } = ecommerce[idioma];
  return (
    <section id={tiendasSeccion.id} className="scroll-mt-20 bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-3 text-3xl font-black leading-tight text-mundo-dark md:text-4xl">{tiendasSeccion.titulo}</h2>
        <p className="mb-10 max-w-2xl text-[17px] leading-relaxed text-gray-600">{tiendasSeccion.intro}</p>
        <ul className="grid gap-5 md:grid-cols-3">
          {tiendas.map((t) => (
            <TarjetaTienda key={t.id} tienda={t} ui={ui} />
          ))}
        </ul>
      </div>
    </section>
  );
}
