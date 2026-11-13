import { NextResponse, type NextRequest } from "next/server";
import { pathInterno, resolverRuta } from "@/lib/i18n/rutas";

/**
 * Rutas por idioma sobre app/[lang]:
 * - Sin prefijo (español): se reescribe por dentro a /es/... La URL pública no cambia.
 * - /en/...: se traduce con el mapa de rutas a la carpeta en español (/en/products → /en/productos).
 *   Lo que no está en el mapa (páginas solo en español, demos, tarjeta, paths en español) da 404.
 * - /demos-ml y /contacto no pasan por aquí (ver matcher): viven en app/(sin-prefijo).
 * - /es/... escrito a mano: 308 a la URL sin prefijo, para no duplicar contenido.
 * No hay redirección por Accept-Language.
 *
 * Los redirects y headers de next.config.ts corren antes que esto.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const ruta = resolverRuta(pathname);
    // Sin par en inglés: un path que no existe dentro de [lang], así responde el 404 del sitio.
    url.pathname = ruta ? pathInterno(ruta) : "/en/_sin-traduccion";
    return NextResponse.rewrite(url);
  }

  url.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Fuera: API, internos de Next y Vercel, la imagen social y todo lo que tenga extensión
  // (archivos de public/, icon.png, robots.txt, sitemap.xml y el .vcf de la tarjeta).
  // También fuera: /demos-ml y /contacto, que viven en app/(sin-prefijo) y usan ?lang=.
  matcher: ["/((?!api/|api$|_next/|_vercel/|opengraph-image|demos-ml(?:/|$)|contacto(?:/|$)|.*\\.[^/]+$).*)"],
};
