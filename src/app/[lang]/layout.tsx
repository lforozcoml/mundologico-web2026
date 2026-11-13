import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/config";
import { paramsIdiomas } from "@/lib/i18n/servidor";
import { DocumentoRaiz, metadataRaiz } from "@/components/layout/DocumentoRaiz";

export const metadata: Metadata = metadataRaiz;

// Sin dynamicParams = false aquí: se heredaría a todas las páginas hijas. Al layout
// solo llegan "es" o "en" porque el proxy reescribe todo con uno de los dos.
export function generateStaticParams() {
  return paramsIdiomas();
}

/** Layout raíz. El lang del <html> sale del servidor según la ruta (/en/... o sin prefijo). */
export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <DocumentoRaiz idioma={lang}>{children}</DocumentoRaiz>;
}
