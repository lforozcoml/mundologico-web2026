import type { MetadataRoute } from "next";
import { casos } from "@/content/data/casos";
import { SITE_URL } from "@/lib/metadata";
import { IDIOMAS, PUBLICADO_EN, idiomaPublicado } from "@/lib/i18n/config";
import { IDS_RUTAS, RUTAS, alternatesDe, enlace, type ParamsRuta, type RutaId, type RutaSitio } from "@/lib/i18n/rutas";

/**
 * Sale del mapa de rutas. Una entrada por URL publicada; las de /en solo con
 * PUBLICADO_EN en true. alternates.languages solo cuando la página tiene par publicado.
 * Exportada aparte para probarla con la bandera en true.
 */
export function entradasSitemap(publicadoEn: boolean = PUBLICADO_EN): MetadataRoute.Sitemap {
  const paramsDe = (id: RutaId): ParamsRuta[] => (id === "caso" ? casos.map((c) => ({ slug: c.slug })) : [{}]);
  const entradas: MetadataRoute.Sitemap = [];
  for (const id of IDS_RUTAS) {
    const ruta: RutaSitio = RUTAS[id];
    if (!ruta.publicada) continue;
    for (const params of paramsDe(id)) {
      const languages = alternatesDe(id, params, publicadoEn);
      const absolutos = Object.fromEntries(Object.entries(languages).map(([k, v]) => [k, `${SITE_URL}${v === "/" ? "" : v}`]));
      for (const idioma of IDIOMAS) {
        if (!idiomaPublicado(idioma, publicadoEn)) continue;
        const path = enlace(id, idioma, params);
        if (path === null) continue;
        entradas.push({
          url: `${SITE_URL}${path === "/" ? "" : path}`,
          lastModified: new Date(`${ruta.actualizado}T00:00:00-05:00`),
          changeFrequency: ruta.changeFrequency,
          priority: ruta.priority,
          ...(Object.keys(languages).length ? { alternates: { languages: absolutos } } : {}),
        });
      }
    }
  }
  return entradas;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return entradasSitemap();
}
