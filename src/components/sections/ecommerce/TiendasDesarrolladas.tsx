import Image from "next/image";
import { capturaDe, cifraVisible, tiendasSeccion, type Tienda } from "@/content/data/ecommerce-shopify";
import { BrowserFrame, PhoneFrame } from "@/components/ui/BrowserFrame";

function TarjetaTienda({ tienda }: { tienda: Tienda }) {
  const captura = capturaDe(tienda);
  const cifra = cifraVisible(tienda);
  return (
    <li className="grid items-center gap-10 rounded-3xl border border-gray-200 bg-white p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
      <div className="relative pb-10 pr-10 md:pb-12 md:pr-16">
        <BrowserFrame dominio={tienda.dominios[0]}>
          {captura ? (
            <Image
              src={captura.desktop.src}
              width={captura.desktop.width}
              height={captura.desktop.height}
              alt={`${captura.alt}, en escritorio`}
              sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 85vw"
              className="h-auto w-full"
            />
          ) : (
            <div
              className="flex aspect-[16/10] w-full items-center justify-center text-2xl font-black text-white"
              style={{ background: "linear-gradient(135deg,#23274C 0%,#176BEC 100%)" }}
            >
              {tienda.nombre}
            </div>
          )}
        </BrowserFrame>
        {captura && (
          <PhoneFrame className="absolute bottom-0 right-0 w-[30%] max-w-[150px]">
            <Image
              src={captura.mobile.src}
              width={captura.mobile.width}
              height={captura.mobile.height}
              alt={`${captura.alt}, en celular`}
              sizes="150px"
              className="h-auto w-full"
            />
          </PhoneFrame>
        )}
      </div>
      <div>
        <h3 className="mb-2 text-2xl font-black text-mundo-dark">{tienda.nombre}</h3>
        <p className="mb-4 text-[15px] font-semibold text-mundo-blue">{tienda.desde}</p>
        <p className="mb-4 text-[16px] leading-relaxed text-gray-600">{tienda.descripcion}</p>
        {cifra && <p className="mb-4 text-[16px] font-bold text-mundo-dark">{cifra}</p>}
        <ul className="flex flex-wrap gap-2">
          {tienda.dominios.map((d) => (
            <li key={d}>
              {tienda.url ? (
                <a
                  href={`https://${d}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-gray-200 px-4 text-[14px] font-semibold text-mundo-dark hover:border-mundo-dark"
                >
                  {d}
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center rounded-full bg-gray-100 px-4 text-[14px] text-gray-600">{d}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/** Solo recibe tiendas autorizadas (lo filtra la página). */
export function TiendasDesarrolladas({ tiendas }: { tiendas: readonly Tienda[] }) {
  return (
    <section id={tiendasSeccion.id} className="scroll-mt-20 bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl font-black leading-tight text-mundo-dark md:text-4xl">{tiendasSeccion.titulo}</h2>
        <ul className="grid gap-8">
          {tiendas.map((t) => (
            <TarjetaTienda key={t.id} tienda={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}
