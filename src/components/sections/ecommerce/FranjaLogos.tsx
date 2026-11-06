import Image from "next/image";
import { tiendasSeccion, visibleTiendas, type Imagen, type Tienda } from "@/content/data/ecommerce-shopify";

type ConLogo = Tienda & { logo: Imagen };

/**
 * Franja estática de logos bajo el hero. Sin enlaces ni animación.
 * Contraste medido sobre bg-gray-50 en gris con opacidad 0.7: el más claro
 * (Parchita) queda en 7:1, por encima del mínimo de 3:1.
 */
export function FranjaLogos() {
  const conLogo = visibleTiendas().filter((t): t is ConLogo => Boolean(t.logo));
  if (conLogo.length < 2) return null;

  return (
    <section aria-label={tiendasSeccion.titulo} className="border-y border-gray-200 bg-gray-50 py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-[14px] font-semibold text-gray-600">{tiendasSeccion.titulo}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {conLogo.map((t) => (
            <li key={t.id}>
              <Image
                src={t.logo.src}
                width={t.logo.width}
                height={t.logo.height}
                alt={`Logo de ${t.nombre}`}
                loading="lazy"
                className="h-7 w-auto opacity-70 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0 md:h-9"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
