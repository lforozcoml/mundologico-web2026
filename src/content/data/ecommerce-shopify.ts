/**
 * Contenido de /productos/ecommerce-shopify.
 * Única fuente: docs/reescritura-contenido/04-ecommerce-shopify.md. No agregar
 * copy, precios, cifras ni capacidades que no estén ahí. Lo marcado [A DEFINIR]
 * en el documento no se incluye.
 */

// ── Banderas ────────────────────────────────────────────────────────────────

/** false: noindex, nofollow, fuera del sitemap y sin enlace desde /productos. */
export const PUBLICADO = false;

/** Cada módulo de operación conectada se muestra solo si está funcionando en un cliente. */
export const MODULO_PEDIDOS = false;
export const MODULO_CONCILIACION = false;
export const MODULO_AGENTE = false;

/** La cifra de pedidos de Parchita se muestra solo cuando el cliente la confirme. */
export const mostrarCifraParchita = false;

/** Fecha de la última revisión del contenido. Se usa como lastModified del sitemap. */
export const ULTIMA_ACTUALIZACION = "2026-11-06";

export const RUTA = "/productos/ecommerce-shopify";

// ── Tipos ───────────────────────────────────────────────────────────────────

export type IconoForma = "store" | "gauge" | "lifebuoy";
export type IconoFrente = "funnel" | "smartphone" | "search" | "puzzle" | "workflow" | "chart";

export type Forma = { titulo: string; descripcion: string; icono: IconoForma };
export type Frente = { titulo: string; descripcion: string; icono: IconoFrente };

export type ModuloOperacion = {
  id: "pedidos" | "conciliacion" | "agente";
  texto: string;
  activo: boolean;
};

export type Imagen = { src: string; width: number; height: number };

export type Tienda = {
  id: string;
  nombre: string;
  /** Dominios tal como aparecen en el documento. */
  dominios: readonly string[];
  /** Enlace público. Sin url, la tarjeta no enlaza. */
  url?: string;
  desde: string;
  descripcion: string;
  /** false: la tarjeta no se renderiza. */
  autorizado: boolean;
  captura?: {
    desktop: Imagen;
    mobile: Imagen;
    /** Texto alternativo base; se le agrega "en escritorio" o "en celular". */
    alt: string;
  };
  cifra?: { texto: string; mostrar: boolean };
};

export type Pregunta = { pregunta: string; respuesta: string };

// ── Contenido ───────────────────────────────────────────────────────────────

export const meta = {
  title: "Desarrollo de e-commerce en Shopify",
  // El documento tiene 156 caracteres con el punto final; sin él cabe en 155.
  description:
    "Tiendas Shopify bien construidas y conectadas a tu operación: pedidos, pagos y atención. Desarrollo a la medida, optimización y soporte mensual en Colombia",
} as const;

export const hero = {
  h1: "Tu tienda en Shopify, bien construida y conectada a tu operación",
  subtitulo:
    "Desarrollamos tiendas en Shopify con buenas prácticas y las conectamos con lo que pasa después de la compra: pedidos, medios de pago y atención al cliente.",
  ctaPrincipal: "Agenda una llamada de 20 minutos →",
  ctaSecundario: { label: "Ver tiendas que hemos desarrollado", href: "#tiendas" },
  apoyo: "Sin costo. Revisamos tu caso y te decimos si podemos ayudarte.",
  /** Etiquetas de las tarjetitas flotantes (palabras del subtítulo, no estados). */
  etiquetas: ["Pedidos", "Medios de pago", "Atención al cliente"],
} as const;

export const formas = {
  titulo: "Tres formas de trabajar contigo",
  items: [
    { titulo: "Tu tienda desde cero", descripcion: "Diseño, desarrollo y lanzamiento de una tienda nueva en Shopify.", icono: "store" },
    {
      titulo: "Optimizamos la tienda que ya tienes",
      descripcion:
        "Sea nuestra o de otro equipo, empezamos con una revisión y te entregamos un plan a 30, 60 y 90 días. Después mejoramos lo que más impacto tiene.",
      icono: "gauge",
    },
    { titulo: "Soporte mensual", descripcion: "Mantenemos y hacemos evolucionar tu tienda por horas de trabajo.", icono: "lifebuoy" },
  ] satisfies Forma[],
  cierre: "Después de cualquiera de las tres, podemos conectar la operación de tu tienda.",
  /** Peldaños de la escalera visual (definidos en el brief de la página). */
  peldanos: ["Revisión", "Proyecto", "Soporte", "Operación"],
} as const;

export const revision = {
  titulo: "Revisión de tienda: seis frentes",
  frentes: [
    { titulo: "Conversión", descripcion: "Dónde se cae el embudo de sesiones, carrito, pago y compra.", icono: "funnel" },
    { titulo: "Velocidad y celular", descripcion: "Qué tan rápido carga y qué la frena.", icono: "smartphone" },
    { titulo: "SEO técnico", descripcion: "Títulos, colecciones, datos estructurados e indexación.", icono: "search" },
    { titulo: "Apps y costos", descripcion: "Qué apps sobran, se solapan o frenan la tienda.", icono: "puzzle" },
    { titulo: "Operación detrás de la tienda", descripcion: "Pedidos manuales, pagos, atención e inventario.", icono: "workflow" },
    { titulo: "Analítica y cumplimiento", descripcion: "Medición bien configurada, consentimiento y políticas.", icono: "chart" },
  ] satisfies Frente[],
  entregable:
    "Informe en lenguaje de negocio, hallazgos priorizados por impacto y esfuerzo, plan a 30, 60 y 90 días.",
} as const;

export const embudo = {
  etapas: ["Sesiones", "Carrito", "Pago", "Compra"],
  leyenda: "Ilustración, no son datos reales",
} as const;

export const incluye = {
  titulo: "Tienda desde cero: qué incluye",
  items: [
    "Arquitectura del catálogo (colecciones, filtros, atributos).",
    "Diseño y desarrollo de la tienda sobre Shopify.",
    "Medios de pago y envíos de tu mercado, en una o varias monedas.",
    "SEO de base, analítica y consentimiento de cookies.",
    "Capacitación para tu equipo y documentación.",
    "Lanzamiento con pruebas y lista de verificación.",
  ],
} as const;

const modulos: ModuloOperacion[] = [
  { id: "pedidos", texto: "Pedidos: del pago a bodega y seguimiento, sin copiar datos a mano.", activo: MODULO_PEDIDOS },
  {
    id: "conciliacion",
    texto: "Conciliación de medios de pago: cuadrar cada pasarela con lo que recibió el negocio.",
    activo: MODULO_CONCILIACION,
  },
  { id: "agente", texto: "Atención con agentes de IA, con paso a una persona cuando hace falta.", activo: MODULO_AGENTE },
];

export const operacion = {
  titulo: "Operación conectada",
  flujo: ["Tienda", "Pedido", "Pago", "Bodega", "Factura", "Cliente"],
  intro: "Según el caso conectamos:",
  nota: "Cada módulo se muestra solo si lo tenemos funcionando en un cliente.",
} as const;

export const comoTrabajamos = {
  titulo: "Cómo trabajamos",
  pasos: ["Descubrimiento y alcance", "Diseño", "Desarrollo", "Pruebas", "Lanzamiento", "Soporte"],
  nota: "Tus cuentas, tu dominio y tus pasarelas siempre quedan a nombre de tu empresa.",
} as const;

export const soporte = {
  titulo: "Soporte mensual",
  texto:
    "Tu tienda sigue evolucionando después de lanzar. Soporte por horas de trabajo para correcciones, mejoras y campañas, con primera respuesta en horario hábil.",
} as const;

const tiendas: Tienda[] = [
  {
    id: "parchita",
    nombre: "Parchita",
    dominios: ["parchita.com.co", "parchita.co"],
    url: "https://parchita.com.co",
    desde: "Desde abril de 2022",
    descripcion: "Tienda completa en Colombia (pesos) y EE.UU. (dólares), con soporte mensual.",
    autorizado: true,
    captura: {
      desktop: { src: "/tiendas/parchita-desktop.webp", width: 1440, height: 900 },
      mobile: { src: "/tiendas/parchita-mobile.webp", width: 780, height: 1688 },
      alt: "Página de inicio de la tienda Parchita en parchita.com.co",
    },
    cifra: {
      texto: "Más de 20.000 pedidos en los últimos 12 meses (corte 5 de noviembre de 2026).",
      mostrar: mostrarCifraParchita,
    },
  },
  {
    id: "autollantas",
    nombre: "Autollantas",
    dominios: ["autollantas.com.co"],
    url: "https://autollantas.com.co",
    desde: "Desde 2023",
    descripcion: "Tienda de llantas con búsqueda por vehículo y por medida.",
    autorizado: false,
  },
  {
    id: "formex",
    nombre: "Formex",
    dominios: ["formex.com.co"],
    desde: "Desde 2022",
    descripcion: "Tienda de insumos de refrigeración y aire acondicionado.",
    autorizado: false,
  },
];

export const tiendasSeccion = {
  id: "tiendas",
  titulo: "Tiendas que hemos desarrollado",
} as const;

export const faq = {
  titulo: "Preguntas frecuentes",
  items: [
    { pregunta: "¿La tienda queda a mi nombre?", respuesta: "Sí. Tu tienda, tu dominio y tus pasarelas son de tu empresa." },
    { pregunta: "¿Dan soporte después de lanzar?", respuesta: "Sí, mensual y por horas." },
    {
      pregunta: "¿Trabajan con tiendas que ya existen?",
      respuesta: "Sí. Optimizamos tiendas hechas por nosotros o por otros equipos.",
    },
    {
      pregunta: "¿Se conecta con mi sistema de facturación o ERP?",
      respuesta: "Depende de que tu sistema tenga API. Lo revisamos en la llamada.",
    },
  ] satisfies Pregunta[],
} as const;

// ── Selectores: lo que se renderiza sale de aquí ────────────────────────────

export function visibleModulos(lista: readonly ModuloOperacion[] = modulos): ModuloOperacion[] {
  return lista.filter((m) => m.activo);
}

export function visibleTiendas(lista: readonly Tienda[] = tiendas): Tienda[] {
  return lista.filter((t) => t.autorizado);
}

/** La captura solo se usa en tiendas autorizadas que la tengan. */
export function capturaDe(t: Tienda) {
  return t.autorizado ? t.captura : undefined;
}

export function cifraVisible(t: Tienda): string | undefined {
  return t.cifra?.mostrar ? t.cifra.texto : undefined;
}

/** Robots según la bandera. Función pura para poder probar los dos estados. */
export function robotsPara(publicado: boolean) {
  return publicado ? { index: true, follow: true } : { index: false, follow: false };
}

/** Entrada del sitemap o null si la página no está publicada. */
export function sitemapEntrada(publicado: boolean, base: string) {
  if (!publicado) return null;
  return {
    url: `${base}${RUTA}`,
    lastModified: new Date(`${ULTIMA_ACTUALIZACION}T00:00:00-05:00`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  };
}

/** Listas completas, solo para pruebas de las funciones de visibilidad. */
export const _todosLosModulos: readonly ModuloOperacion[] = modulos;
export const _todasLasTiendas: readonly Tienda[] = tiendas;
