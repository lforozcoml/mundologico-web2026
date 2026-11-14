import Link from "next/link";
import { IDIOMAS, type Idioma } from "@/lib/contact";
import { hrefConIdioma } from "@/lib/enlaces";

type Props = {
  idioma: Idioma;
  /**
   * Páginas con ?lang= (demos y tarjeta): la ruta y el ?src= crudo, que se conserva solo
   * si es corto y seguro. Páginas con /en (Header): la URL de cada idioma, ya resuelta
   * con el mapa de rutas; un idioma sin URL no se muestra.
   */
  destino: { ruta: string; src: string | null | undefined } | { hrefs: Partial<Record<Idioma, string>> };
  /** aria-label del nav, en el idioma actual. */
  etiqueta: string;
  nombreIdioma: Record<Idioma, string>;
  /** "oscuro" para fondos mundo-dark. */
  tema?: "oscuro" | "claro";
  /** Al elegir un idioma (por ejemplo, cerrar el menú móvil). */
  onElegir?: () => void;
};

/**
 * Selector ES/EN en píldora. Lo usan las páginas con ?lang= (conserva src; sin lang es
 * español) y el Header (lleva a la misma página bajo /en o sin prefijo).
 */
export function SelectorIdioma({ idioma, destino, etiqueta, nombreIdioma, tema = "oscuro", onElegir }: Props) {
  const oscuro = tema === "oscuro";
  const conQuery = "ruta" in destino;
  const hrefDe = (opcion: Idioma): string | undefined =>
    conQuery ? hrefConIdioma(destino.ruta, destino.src, opcion) : opcion === idioma ? undefined : destino.hrefs[opcion];
  const opciones = IDIOMAS.filter((opcion) => opcion === idioma || hrefDe(opcion));
  return (
    <nav aria-label={etiqueta}>
      <ul className={`flex gap-1 rounded-full border p-1 ${oscuro ? "border-white/25" : "border-gray-300"}`}>
        {opciones.map((opcion) => (
          <li key={opcion}>
            {opcion === idioma && !conQuery ? (
              // Página actual en las rutas con /en: no enlaza a sí misma.
              <span
                lang={opcion}
                aria-current="true"
                className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-bold uppercase ${
                  oscuro ? "bg-white text-mundo-dark" : "bg-mundo-dark text-white"
                }`}
              >
                {opcion}
              </span>
            ) : (
            <Link
              href={hrefDe(opcion) ?? ""}
              onClick={onElegir}
              lang={opcion}
              hrefLang={opcion}
              aria-label={nombreIdioma[opcion]}
              aria-current={opcion === idioma ? "true" : undefined}
              // En ?lang= se cambia en el lugar; en /en es otra página.
              replace={conQuery}
              scroll={conQuery ? false : undefined}
              className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-bold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-teal ${
                opcion === idioma
                  ? oscuro ? "bg-white text-mundo-dark" : "bg-mundo-dark text-white"
                  : oscuro ? "text-white/80 hover:bg-white/10" : "text-mundo-dark hover:bg-gray-100"
              }`}
            >
              {opcion}
            </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
