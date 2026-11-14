/**
 * Tarjetas de contacto digitales (/contacto/[slug]). Fuente única de verdad:
 * de aquí salen las páginas, los enlaces tel:, mailto: y wa.me, los .vcf y
 * las redirecciones de next.config.ts.
 *
 * Para agregar a alguien: sumar un objeto a `personas`.
 * Cuando alguien se va: quitarlo de `personas` y poner su slug en
 * `slugsRetirados`. Su tag NFC seguirá funcionando y abrirá la tarjeta general.
 */

type Comunes = {
  /** Parte de la URL: /contacto/<slug>. Minúsculas, números y guiones. */
  slug: string;
  empresa: string;
  /** Formato E.164 sin espacios, por ejemplo +573128315581. */
  celular: string;
  email: string;
  url: string;
  /** false agrega noindex: el celular no queda en buscadores. */
  indexable: boolean;
};

export type TarjetaPersona = Comunes & {
  tipo: "persona";
  nombre: string;
  apellidos: string;
  cargo?: string;
};

export type TarjetaEmpresa = Comunes & { tipo: "empresa" };

export type Tarjeta = TarjetaPersona | TarjetaEmpresa;

const EMPRESA = "Mundo Lógico SAS";
/** NOTE de todos los .vcf. Genérica: no depende del idioma ni del query string. */
export const NOTA_VCF = "Mundo Lógico: automatización e IA para empresas";
const URL_SITIO = "https://mundologico.com";

/** Tarjeta general. Destino de los slugs retirados. */
const general: TarjetaEmpresa = {
  tipo: "empresa",
  slug: "mundo-logico",
  empresa: EMPRESA,
  celular: "+573128315581",
  email: "hola@mundologico.com",
  url: URL_SITIO,
  indexable: true,
};

const personas: TarjetaPersona[] = [
  {
    tipo: "persona",
    slug: "federico-orozco",
    nombre: "Federico",
    apellidos: "Orozco Galeano",
    cargo: "CEO",
    empresa: EMPRESA,
    celular: "+573128315581",
    email: "lforozco@mundologico.com",
    url: URL_SITIO,
    // Su celular es personal: no debe aparecer en buscadores.
    indexable: false,
  },
  {
    tipo: "persona",
    slug: "angela-arias",
    nombre: "Angela Maria",
    apellidos: "Arias Montoya",
    cargo: "Líder Administrativa",
    empresa: EMPRESA,
    celular: "+573127860531",
    email: "amarias@mundologico.com",
    url: URL_SITIO,
    indexable: false,
  },
];

/** Slugs de personas que ya no están. Redirigen a la tarjeta general. */
const slugsRetirados: string[] = [];

/** Tarjeta que abre /contacto (el primer tag NFC grabado apunta ahí). */
const SLUG_PRINCIPAL = "federico-orozco";

// Validación: corre al cargar el módulo, así que un dato malo rompe el build.

const E164 = /^\+[1-9]\d{7,14}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function erroresDe(t: Tarjeta): string[] {
  const e: string[] = [];
  if (!SLUG.test(t.slug)) e.push(`slug "${t.slug}" no es válido`);
  if (!t.empresa.trim()) e.push("empresa vacía");
  if (t.tipo === "persona") {
    if (!t.nombre.trim()) e.push("nombre vacío");
    if (!t.apellidos.trim()) e.push("apellidos vacíos");
    if (t.cargo !== undefined && !t.cargo.trim()) e.push("cargo vacío (quitarlo si no aplica)");
  }
  if (!E164.test(t.celular)) e.push(`celular "${t.celular}" no es E.164`);
  if (!EMAIL.test(t.email)) e.push(`email "${t.email}" no es válido`);
  try {
    if (new URL(t.url).protocol !== "https:") e.push("url debe ser https");
  } catch {
    e.push(`url "${t.url}" no es válida`);
  }
  return e.map((m) => `[${t.slug}] ${m}`);
}

function validar(): readonly Tarjeta[] {
  const todas: Tarjeta[] = [general, ...personas];
  const errores = todas.flatMap(erroresDe);
  const vistos = new Set<string>();
  for (const s of [...todas.map((t) => t.slug), ...slugsRetirados]) {
    if (vistos.has(s)) errores.push(`slug "${s}" repetido (activo o retirado)`);
    vistos.add(s);
  }
  for (const s of slugsRetirados) if (!SLUG.test(s)) errores.push(`slug retirado "${s}" no es válido`);
  if (!personas.some((p) => p.slug === SLUG_PRINCIPAL)) errores.push(`SLUG_PRINCIPAL "${SLUG_PRINCIPAL}" no existe`);
  if (errores.length) throw new Error(`Tarjetas inválidas:\n- ${errores.join("\n- ")}`);
  return todas;
}

export const tarjetas = validar();
export const tarjetaGeneral = general;
export const slugPrincipal = SLUG_PRINCIPAL;
export const tarjetasRetiradas: readonly string[] = slugsRetirados;

export function getTarjeta(slug: string): Tarjeta | undefined {
  return tarjetas.find((t) => t.slug === slug);
}

/** Valores calculados. No escribirlos a mano en ningún otro lado. */
export function derivados(t: Tarjeta) {
  const nombreVisible = t.tipo === "persona" ? `${t.nombre} ${t.apellidos}` : t.empresa;
  return {
    nombreVisible,
    ruta: `/contacto/${t.slug}`,
    telHref: `tel:${t.celular}`,
    emailHref: `mailto:${t.email}`,
    whatsappHref: `https://wa.me/${t.celular.slice(1)}`,
    vcfHref: `/contacto/${t.slug}/contacto.vcf`,
    archivoVcf: `${t.slug}.vcf`,
  } as const;
}
