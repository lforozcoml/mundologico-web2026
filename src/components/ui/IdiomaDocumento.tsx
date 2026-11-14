"use client";

import { useEffect } from "react";
import type { Idioma } from "@/lib/contact";

/**
 * El <html lang> sale del layout raíz, que no ve el query string. En páginas con
 * ?lang= esto lo ajusta en el navegador y lo devuelve al salir. El contenido además
 * lleva su propio atributo lang desde el servidor.
 */
export function IdiomaDocumento({ idioma }: { idioma: Idioma }) {
  useEffect(() => {
    const anterior = document.documentElement.lang;
    document.documentElement.lang = idioma;
    return () => {
      document.documentElement.lang = anterior;
    };
  }, [idioma]);
  return null;
}
