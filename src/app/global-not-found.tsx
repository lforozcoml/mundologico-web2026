import type { Metadata } from "next";
import NotFound from "next/dist/client/components/builtin/not-found";
import { DocumentoRaiz, metadataRaiz } from "@/components/layout/DocumentoRaiz";

/**
 * 404 de todo el sitio. Con el layout raíz dentro de app/[lang], notFound() no alcanza a
 * renderizar el layout, así que Next pide este archivo (experimental.globalNotFound en
 * next.config.ts). Muestra el mismo 404 por defecto de Next que antes del i18n, con el
 * documento completo del sitio. Va en español: es el idioma por defecto y /en no está publicado.
 * Las páginas con slug usan dynamicParams = false para que un slug desconocido llegue aquí.
 */
// Igual que antes: la metadata del layout; el título del 404 lo pone el componente de Next.
export const metadata: Metadata = metadataRaiz;

export default function GlobalNotFound() {
  return (
    <DocumentoRaiz idioma="es">
      <NotFound />
    </DocumentoRaiz>
  );
}
