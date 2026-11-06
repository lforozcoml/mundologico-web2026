import { MetadataRoute } from "next";
import { casos } from "@/content/data/casos";
import { PUBLICADO as ECOMMERCE_PUBLICADO, sitemapEntrada as ecommerceEntrada } from "@/content/data/ecommerce-shopify";

const BASE = "https://mundologico.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                 changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/productos`,  changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/casos`,      changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/nosotros`,   changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/terminos`,   changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/privacidad`, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const casoRoutes: MetadataRoute.Sitemap = casos.map((caso) => ({
    url: `${BASE}/casos/${caso.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // Solo entra cuando la bandera PUBLICADO está en true.
  const ecommerce = ecommerceEntrada(ECOMMERCE_PUBLICADO, BASE);

  return [...staticRoutes, ...(ecommerce ? [ecommerce] : []), ...casoRoutes];
}
