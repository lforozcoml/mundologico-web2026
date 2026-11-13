import { CALENDARIO_URL } from "@/content/data/site";
import { header } from "@/content/data/i18n/navegacion";
import { PUBLICADO_EN, type Idioma } from "@/lib/i18n/config";
import { enlace, tieneIdioma, type ParamsRuta, type RutaId } from "@/lib/i18n/rutas";
import { HeaderCliente } from "@/components/layout/HeaderCliente";

type Props = {
  idioma: Idioma;
  /** Página actual en el mapa de rutas, para el selector de idioma. */
  ruta: RutaId;
  params?: ParamsRuta;
};

/** Header en el servidor: arma enlaces y textos del idioma y se los pasa al menú de cliente. */
export function Header({ idioma, ruta, params }: Props) {
  const tx = header[idioma];
  // Solo enlaces con página en este idioma (en inglés, Nosotros espera su traducción).
  const links = tx.links
    .filter((l) => tieneIdioma(l.ruta, idioma))
    .map((l) => ({ label: l.label, href: `${enlace(l.ruta, idioma, {})}${l.ancla ?? ""}` }));

  // Selector: la misma página en el otro idioma. Oculto hasta publicar el inglés.
  const destino: Idioma = idioma === "es" ? "en" : "es";
  const hrefOtro = PUBLICADO_EN ? enlace(ruta, destino, params) : null;

  return (
    <HeaderCliente
      inicio={enlace("inicio", idioma) ?? "/"}
      logoAlt={tx.logoAlt}
      botonMenu={tx.botonMenu}
      links={links}
      cta={{ label: tx.cta, href: CALENDARIO_URL }}
      otroIdioma={hrefOtro ? { idioma: destino, label: tx.cambiarIdioma, href: hrefOtro } : null}
    />
  );
}
