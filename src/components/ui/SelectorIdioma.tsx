import Link from "next/link";
import { IDIOMAS, type Idioma } from "@/lib/contact";
import { hrefConIdioma } from "@/lib/enlaces";

type Props = {
  ruta: string;
  idioma: Idioma;
  /** Valor crudo de ?src=. Se conserva solo si es corto y seguro. */
  src: string | null | undefined;
  /** aria-label del nav, en el idioma actual. */
  etiqueta: string;
  nombreIdioma: Record<Idioma, string>;
  /** "oscuro" para fondos mundo-dark. */
  tema?: "oscuro" | "claro";
};

/** Selector ES/EN de las páginas con ?lang=. Conserva src; sin lang es español. */
export function SelectorIdioma({ ruta, idioma, src, etiqueta, nombreIdioma, tema = "oscuro" }: Props) {
  const oscuro = tema === "oscuro";
  return (
    <nav aria-label={etiqueta}>
      <ul className={`flex gap-1 rounded-full border p-1 ${oscuro ? "border-white/25" : "border-gray-300"}`}>
        {IDIOMAS.map((opcion) => (
          <li key={opcion}>
            <Link
              href={hrefConIdioma(ruta, src, opcion)}
              lang={opcion}
              hrefLang={opcion}
              aria-label={nombreIdioma[opcion]}
              aria-current={opcion === idioma ? "true" : undefined}
              replace
              scroll={false}
              className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-bold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-teal ${
                opcion === idioma
                  ? oscuro ? "bg-white text-mundo-dark" : "bg-mundo-dark text-white"
                  : oscuro ? "text-white/80 hover:bg-white/10" : "text-mundo-dark hover:bg-gray-100"
              }`}
            >
              {opcion}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
