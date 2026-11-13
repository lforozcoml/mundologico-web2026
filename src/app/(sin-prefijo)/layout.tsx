import type { Metadata } from "next";
import { DocumentoRaiz, metadataRaiz } from "@/components/layout/DocumentoRaiz";

export const metadata: Metadata = metadataRaiz;

/**
 * Layout raíz de las páginas que no tienen versión por prefijo: demos (/demos-ml) y
 * tarjeta digital (/contacto/[slug]). Usan ?lang= e IdiomaDocumento, tienen URLs impresas
 * en tarjetas NFC y el proxy no las toca. Quedan fuera de app/[lang] porque en Vercel
 * el rewrite del proxy hacia [lang] llega sin el query string y ?lang= se perdía.
 */
export default function LayoutSinPrefijo({ children }: { children: React.ReactNode }) {
  return <DocumentoRaiz idioma="es">{children}</DocumentoRaiz>;
}
