/**
 * Tarjeta de contacto digital (/contacto). Fuente única de verdad: de aquí
 * salen la página, los enlaces tel:, mailto: y wa.me, y el archivo .vcf.
 */
export type TarjetaContacto = {
  nombre: string;
  apellidos: string;
  empresa: string;
  /** Formato E.164 sin espacios, por ejemplo +573128315581. */
  celular: string;
  email: string;
  url: string;
  /** Nombre del archivo .vcf que descarga el celular. */
  archivoVcf: string;
};

const E164 = /^\+[1-9]\d{7,14}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const ARCHIVO_VCF = /^[a-z0-9-]+\.vcf$/;

/** Valida los datos una sola vez. Si algo está mal, el build falla. */
function validarTarjeta(t: TarjetaContacto): TarjetaContacto {
  const errores: string[] = [];
  for (const campo of ["nombre", "apellidos", "empresa"] as const) {
    if (!t[campo].trim()) errores.push(`${campo} vacío`);
  }
  if (!E164.test(t.celular)) errores.push(`celular "${t.celular}" no es E.164`);
  if (!EMAIL.test(t.email)) errores.push(`email "${t.email}" no es válido`);
  try {
    if (new URL(t.url).protocol !== "https:") errores.push("url debe ser https");
  } catch {
    errores.push(`url "${t.url}" no es válida`);
  }
  if (!ARCHIVO_VCF.test(t.archivoVcf)) errores.push(`archivoVcf "${t.archivoVcf}" no es válido`);
  if (errores.length) throw new Error(`tarjetaContacto inválida: ${errores.join(", ")}`);
  return t;
}

export const tarjetaContacto = validarTarjeta({
  nombre: "Federico",
  apellidos: "Orozco Galeano",
  empresa: "Mundo Lógico SAS",
  celular: "+573128315581",
  email: "lforozco@mundologico.com",
  url: "https://mundologico.com",
  archivoVcf: "federico-orozco.vcf",
});

/** Derivados. No escribir estos valores a mano en ningún otro lado. */
export const tarjetaDerivados = {
  nombreCompleto: `${tarjetaContacto.nombre} ${tarjetaContacto.apellidos}`,
  telHref: `tel:${tarjetaContacto.celular}`,
  emailHref: `mailto:${tarjetaContacto.email}`,
  whatsappHref: `https://wa.me/${tarjetaContacto.celular.slice(1)}`,
  vcfHref: `/contacto/${tarjetaContacto.archivoVcf}`,
} as const;
