/**
 * Contenido de /productos/ecommerce-shopify.
 * Única fuente: docs/reescritura-contenido/04-ecommerce-shopify.md. No agregar
 * copy, precios, cifras ni capacidades que no estén ahí. Lo marcado [A DEFINIR]
 * en el documento no se incluye.
 */

// ── Banderas ────────────────────────────────────────────────────────────────

/** false: noindex, nofollow, fuera del sitemap y sin enlace desde /productos. */
export const PUBLICADO = true;

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

export type Forma = {
  /** Texto pequeño sobre el título. */
  eyebrow: string;
  titulo: string;
  paraQuien: string;
  descripcion: string;
  recibes: readonly string[];
  icono: IconoForma;
  /** Enlace al final de la tarjeta, hacia la sección que lo amplía. */
  enlace: { texto: string; href: string };
};
/**
 * Un frente de la Revisión de tienda. "etapa": paso del recorrido del cliente;
 * "capa": atraviesa toda la tienda. El orden del array define el número (1 a 6).
 */
export type Frente = {
  titulo: string;
  tipo: "etapa" | "capa";
  etapa: string;
  pregunta: string;
  revisamos: readonly string[];
  resultado: string;
  icono: IconoFrente;
};
export type PasoPlan = { titulo: string; texto: string };

/** Paso de una ruta de trabajo: qué hacemos y qué recibes al terminarlo. */
export type Paso = { titulo: string; texto: string; recibes: string };
export type Ruta = { id: "nueva" | "existente"; etiqueta: string; pasos: readonly Paso[] };

export type ModuloOperacion = {
  id: "pedidos" | "conciliacion" | "agente";
  texto: string;
  activo: boolean;
};

export type Imagen = { src: string; width: number; height: number };

export type ServicioTienda = "Desarrollo" | "Soporte mensual";

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
  /** Logo con fondo transparente, medidas reales del archivo. */
  logo?: Imagen;
  servicios: readonly ServicioTienda[];
  /** true: la tarjeta muestra "Ver tienda" (si además hay url). */
  mostrarEnlace: boolean;
  captura?: {
    desktop: Imagen;
    mobile: Imagen;
    /** Texto alternativo base; se le agrega "en escritorio" o "en celular". */
    alt: string;
  };
  cifra?: { texto: string; mostrar: boolean };
};

/** Cada elemento de respuesta es un párrafo. */
export type Pregunta = { pregunta: string; respuesta: readonly string[] };

// ── Contenido ───────────────────────────────────────────────────────────────

export const meta = {
  title: "Desarrollo de e-commerce en Shopify",
  // El documento tiene 156 caracteres con el punto final; sin él cabe en 155.
  description:
    "Tiendas Shopify bien construidas y conectadas a tu operación: pedidos, pagos y atención. Desarrollo a la medida, optimización y soporte mensual en Colombia",
} as const;

export const hero = {
  /** Texto pequeño sobre el H1. No es un encabezado. */
  eyebrow: "Desarrollo de e-commerce en Shopify",
  h1: "Una tienda en Shopify que vende bien y no complica tu operación",
  subtitulo:
    "Cuando una tienda crece, aparecen los pedidos copiados a mano, los pagos que no cuadran y la atención que no da abasto. Construimos y optimizamos tiendas en Shopify pensando en lo que pasa después de la compra.",
  ctaPrincipal: "Agenda una llamada de 20 minutos →",
  ctaSecundario: { label: "Ver cómo revisamos una tienda", href: "#revision" },
  apoyo: "Sin costo. Revisamos tu caso y te decimos si podemos ayudarte.",
  lineaApoyo: "Desarrollamos tiendas en Shopify desde 2022, con operación en pesos y en dólares.",
  /**
   * Parte fija de la leyenda de la captura. Se compone con los datos de la
   * tienda: "<nombre>: tienda desarrollada por Mundo Lógico. <desde>."
   */
  leyenda: "tienda desarrollada por Mundo Lógico",
  /** Etiquetas de las tarjetitas flotantes: lo que pasa después de la compra, no estados. */
  etiquetas: ["Pedidos", "Medios de pago", "Atención al cliente"],
} as const;

/** Leyenda bajo la captura del hero. */
export function leyendaCaptura(t: Pick<Tienda, "nombre" | "desde">): string {
  return `${t.nombre}: ${hero.leyenda}. ${t.desde}.`;
}

export const formas = {
  titulo: "Tres formas de trabajar contigo",
  intro:
    "Cada negocio llega en un punto distinto. Puedes empezar una tienda nueva, mejorar la que ya vende o dejar su mantenimiento en manos de un equipo que conoce tu operación.",
  items: [
    {
      eyebrow: "Tienda desde cero",
      titulo: "Construimos tu tienda",
      paraQuien:
        "Para negocios que van a vender en línea por primera vez o que quieren rehacer su tienda sobre bases sólidas.",
      descripcion:
        "Diseñamos y desarrollamos tu tienda en Shopify pensando, desde el inicio, en el catálogo, los pagos, los envíos y la forma en que se conectará con tu operación.",
      recibes: [
        "Arquitectura del catálogo: colecciones, filtros y atributos.",
        "Diseño y desarrollo sobre Shopify, pensado para celular y escritorio.",
        "Medios de pago y envíos de tu mercado, en una o varias monedas.",
        "Lanzamiento con la cuenta, el dominio y los datos a nombre de tu empresa.",
      ],
      icono: "store",
      enlace: { texto: "Ver cómo lo hacemos", href: "#como-trabajamos" },
    },
    {
      eyebrow: "Tienda existente",
      titulo: "Optimizamos tu tienda",
      paraQuien:
        "Para tiendas que ya venden, hechas por nosotros o por otro equipo, y que rinden menos de lo que podrían.",
      descripcion:
        "Empezamos con una Revisión de tienda en seis frentes, sin tocar nada sin tu aprobación. Con los hallazgos priorizamos y mejoramos primero lo que más impacto tiene.",
      recibes: [
        "Informe en lenguaje de negocio, no solo técnico.",
        "Hallazgos priorizados por impacto y esfuerzo.",
        "Plan a 30, 60 y 90 días.",
        "Ejecución de las mejoras que decidas, con alcance acordado por escrito.",
      ],
      icono: "gauge",
      enlace: { texto: "Ver los seis frentes", href: "#revision" },
    },
    {
      eyebrow: "Soporte mensual",
      titulo: "Cuidamos tu tienda",
      paraQuien:
        "Para tiendas en operación que necesitan un equipo de confianza para corregir, ajustar y evolucionar.",
      descripcion: "Un paquete mensual de horas de trabajo para mantener la tienda sana y mejorarla de forma continua.",
      recibes: [
        "Correcciones y ajustes dentro del paquete de horas.",
        "Seguimiento de la tienda.",
        "Primera respuesta en horario hábil.",
        "Funcionalidades nuevas cotizadas aparte, con alcance acordado por escrito.",
      ],
      icono: "lifebuoy",
      enlace: { texto: "Ver cómo funciona", href: "#soporte" },
    },
  ] satisfies Forma[],
  cierre: "Después de cualquiera de las tres, podemos conectar la operación de tu tienda.",
  /** Peldaños de la escalera visual (definidos en el brief de la página). */
  peldanos: ["Revisión", "Proyecto", "Soporte", "Operación"],
} as const;

export const revision = {
  titulo: "Revisión de tienda: dónde se te escapan ventas, y qué corregir primero",
  intro:
    "Una tienda puede recibir visitas y aun así vender menos de lo esperado. A veces el problema está en el pago, a veces en la velocidad, en apps que se estorban o en procesos manuales detrás de la tienda. Revisamos seis frentes y te decimos cuál pesa más.",
  recorridoTitulo: "El recorrido de tu cliente, y dónde mira cada frente",
  recorridoNota: "Los números del esquema corresponden a las tarjetas.",
  revisamosEtiqueta: "Qué revisamos",
  resultadoEtiqueta: "Qué te dejamos claro",
  frentes: [
    {
      titulo: "SEO técnico",
      tipo: "etapa",
      etapa: "Te encuentran",
      pregunta: "¿Google entiende tu tienda y la muestra a quien busca lo que vendes?",
      revisamos: [
        "Títulos y descripciones de productos y colecciones.",
        "Estructura de colecciones y enlaces internos.",
        "Datos estructurados e indexación.",
      ],
      resultado: "Qué te impide aparecer en las búsquedas y qué corregir primero.",
      icono: "search",
    },
    {
      titulo: "Velocidad y celular",
      tipo: "etapa",
      etapa: "Navegan",
      pregunta: "¿Tu tienda carga rápido y se compra fácil desde el celular?",
      revisamos: [
        "Tiempos de carga en celular.",
        "Imágenes, apps y código que la frenan.",
        "Uso del menú, los filtros y las fichas de producto.",
      ],
      resultado: "Qué hace lenta o incómoda la tienda y qué arreglar primero.",
      icono: "smartphone",
    },
    {
      titulo: "Conversión",
      tipo: "etapa",
      etapa: "Compran",
      pregunta: "¿Dónde se cae la compra?",
      revisamos: [
        "El recorrido de sesión, carrito, pago y compra, paso a paso.",
        "Fricciones en el pago y en los medios de pago.",
        "Páginas de producto y carrito.",
      ],
      resultado: "En qué paso pierdes más clientes y qué cambios probar.",
      icono: "funnel",
    },
    {
      titulo: "Operación detrás de la tienda",
      tipo: "etapa",
      etapa: "Después de comprar",
      pregunta: "¿Cuánto trabajo manual genera cada pedido?",
      revisamos: [
        "Cómo pasa un pedido del pago a la bodega.",
        "Conciliación de pagos y facturación.",
        "Atención al cliente e inventario.",
      ],
      resultado: "Qué tareas repites a mano y cuáles se pueden automatizar.",
      icono: "workflow",
    },
    {
      titulo: "Apps y costos",
      tipo: "capa",
      etapa: "En toda la tienda",
      pregunta: "¿Pagas por apps que no necesitas?",
      revisamos: [
        "Qué apps tienes instaladas y qué hace cada una.",
        "Cuáles se solapan o duplican funciones.",
        "Cuáles frenan la tienda.",
      ],
      resultado: "Qué dejar, qué cambiar y qué quitar.",
      icono: "puzzle",
    },
    {
      titulo: "Analítica y cumplimiento",
      tipo: "capa",
      etapa: "En todo el recorrido",
      pregunta: "¿Puedes confiar en tus números?",
      revisamos: [
        "Que la medición esté bien configurada.",
        "El consentimiento de cookies.",
        "Las políticas de la tienda.",
      ],
      resultado:
        "Si tus números son confiables y si el consentimiento y las políticas están bien implementados.",
      icono: "chart",
    },
  ] satisfies Frente[],
  recibesTitulo: "Qué recibes al final",
  recibesTexto:
    "Un informe en lenguaje de negocio, con hallazgos priorizados por impacto y esfuerzo, y un plan a 30, 60 y 90 días.",
  plan: [
    {
      titulo: "Primeros 30 días",
      texto: "Lo que más impacto tiene con menos esfuerzo: correcciones que se notan pronto.",
    },
    { titulo: "Días 31 a 60", texto: "Mejoras que requieren más trabajo de desarrollo o de configuración." },
    {
      titulo: "Días 61 a 90",
      texto: "Cambios de fondo y, si aplica, conectar la operación detrás de la tienda.",
    },
  ] satisfies PasoPlan[],
  nota: "Trabajamos con acceso de colaborador y permisos mínimos. No cambiamos nada sin tu aprobación.",
  cta: "Agenda una llamada de 20 minutos →",
  apoyo: "La llamada no tiene costo. Ahí definimos si la revisión es lo que tu tienda necesita.",
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
  titulo: "Operación conectada: que vender no genere trabajo manual",
  flujo: ["Tienda", "Pedido", "Pago", "Bodega", "Factura", "Cliente"],
  intro: "Según el caso, conectamos tu tienda con lo que pasa después de la compra:",
  nota: "Cada módulo se muestra solo si lo tenemos funcionando en un cliente.",
} as const;

export const comoTrabajamos = {
  id: "como-trabajamos",
  titulo: "Cómo trabajamos: sabes qué sigue en cada paso",
  intro: "Cada paso tiene un resultado claro. El camino cambia si tu tienda es nueva o ya existe.",
  rutas: [
    {
      id: "nueva",
      etiqueta: "Tienda nueva",
      pasos: [
        {
          titulo: "Alcance",
          texto: "Entendemos tu negocio y definimos qué debe lograr la tienda.",
          recibes: "Propuesta escrita con alcance y cronograma",
        },
        {
          titulo: "Diseño",
          texto: "Definimos catálogo, navegación y diseño de la tienda.",
          recibes: "Diseño para tu aprobación",
        },
        {
          titulo: "Desarrollo",
          texto: "Construimos en Shopify: pagos, envíos, monedas, SEO de base y analítica.",
          recibes: "Avances que puedes revisar",
        },
        {
          titulo: "Pruebas",
          texto: "Probamos compra, pagos, envíos, medición y cookies, en celular y escritorio.",
          recibes: "Lista de verificación",
        },
        {
          titulo: "Lanzamiento",
          texto: "Publicamos con tu dominio y tus cuentas, y capacitamos a tu equipo.",
          recibes: "Capacitación y documentación",
        },
        {
          titulo: "Soporte (opcional)",
          texto: "Seguimos con un paquete mensual de horas.",
          recibes: "Primera respuesta en horario hábil",
        },
      ],
    },
    {
      id: "existente",
      etiqueta: "Tienda que ya tienes",
      pasos: [
        {
          titulo: "Acceso",
          texto: "Definimos qué se revisa y entramos como colaborador con permisos mínimos.",
          recibes: "Alcance por escrito",
        },
        {
          titulo: "Revisión",
          texto: "Analizamos los seis frentes de tu tienda.",
          recibes: "Hallazgos priorizados",
        },
        {
          titulo: "Plan",
          texto: "Te explicamos los hallazgos en lenguaje de negocio.",
          recibes: "Informe y plan a 30, 60 y 90 días",
        },
        {
          titulo: "Mejoras",
          texto: "Ejecutamos lo que decidas, empezando por lo de más impacto.",
          recibes: "Cambios con alcance por escrito",
        },
        {
          titulo: "Soporte (opcional)",
          texto: "Seguimos con un paquete mensual de horas.",
          recibes: "Primera respuesta en horario hábil",
        },
      ],
    },
  ] satisfies Ruta[],
  confianza: "Tus cuentas, tu dominio y tus pasarelas siempre quedan a nombre de tu empresa.",
} as const;

export const soporte = {
  id: "soporte",
  titulo: "Soporte mensual: tu tienda sigue cuidada después del lanzamiento",
  intro: "Un paquete mensual de horas con un equipo que ya conoce tu tienda.",
  dentroTitulo: "Dentro del paquete de horas",
  dentro: ["Correcciones", "Ajustes", "Seguimiento de la tienda"],
  aparteTitulo: "Se cotiza aparte",
  aparteTexto: "Funcionalidades nuevas, con alcance acordado por escrito.",
  respuestaTitulo: "Cómo respondemos",
  respuestaTexto: "Primera respuesta en horario hábil, de lunes a viernes, hora de Colombia.",
  /** Ilustración decorativa de la bolsa de horas. Sin números. */
  ilustracion: {
    paquete: "Tu paquete mensual de horas",
    segmentos: ["Correcciones", "Ajustes", "Seguimiento"],
    aparte: "Funcionalidades nuevas: se cotizan aparte",
  },
  cta: "Hablemos del soporte de tu tienda →",
  apoyo: "La llamada de 20 minutos no tiene costo.",
} as const;

const tiendas: Tienda[] = [
  {
    id: "parchita",
    nombre: "Parchita",
    dominios: ["parchita.com.co", "parchita.co"],
    url: "https://parchita.com.co",
    desde: "Desde 2022",
    descripcion: "Tienda completa en Colombia (pesos) y EE.UU. (dólares), con soporte mensual.",
    // Consentimiento confirmado por Federico, 2026-11-06
    autorizado: true,
    logo: { src: "/tiendas/logos/parchita.png", width: 164, height: 40 },
    servicios: ["Desarrollo", "Soporte mensual"],
    mostrarEnlace: true,
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
    // Consentimiento confirmado por Federico, 2026-11-06
    autorizado: true,
    logo: { src: "/tiendas/logos/autollantas.png", width: 377, height: 57 },
    servicios: ["Desarrollo"],
    mostrarEnlace: true,
  },
  {
    id: "formex",
    nombre: "Formex",
    dominios: ["formex.com.co"],
    url: "https://formex.com.co",
    desde: "Desde 2022",
    descripcion: "Tienda de insumos de refrigeración y aire acondicionado.",
    // Consentimiento confirmado por Federico, 2026-11-06
    autorizado: true,
    logo: { src: "/tiendas/logos/formex.png", width: 195, height: 36 },
    servicios: ["Desarrollo"],
    mostrarEnlace: true,
  },
];

export const tiendasSeccion = {
  id: "tiendas",
  titulo: "Tiendas que hemos desarrollado",
  intro: "Negocios que nos confiaron el desarrollo de su tienda en Shopify.",
} as const;

/** Banda final de la página (props de CtaBand; el CTA principal usa su valor por defecto). */
export const bandaFinal = {
  titulo: "¿Tienes una tienda en Shopify o vas a abrir una?",
  descripcion:
    "Agenda una llamada de 20 minutos. Revisamos tu caso y te decimos qué conviene hacer primero y si podemos ayudarte.",
  ctaSecundario: { label: "Ver preguntas frecuentes", href: "#preguntas" },
} as const;

export const faq = {
  id: "preguntas",
  titulo: "Preguntas frecuentes",
  items: [
    {
      pregunta: "¿La tienda, el dominio y los datos quedan a mi nombre?",
      respuesta: [
        "Sí. La cuenta de Shopify, el dominio, las pasarelas de pago y la información de tus clientes y pedidos pertenecen a tu empresa. Configuramos todo bajo tus cuentas y trabajamos con acceso de colaborador.",
        "Si en algún momento decides continuar con otro equipo, basta con retirar nuestro acceso. La tienda no depende de nosotros para operar.",
      ],
    },
    {
      pregunta: "¿Qué pasa después del lanzamiento? ¿Dan soporte?",
      respuesta: [
        "Sí. El soporte mensual funciona por paquetes de horas de trabajo y cubre correcciones, ajustes y seguimiento de la tienda. Atendemos en horario hábil, de lunes a viernes, hora de Colombia, y la primera respuesta se da dentro de ese horario.",
        "Las funcionalidades nuevas o los desarrollos de mayor alcance no consumen el paquete de horas: se definen y se cotizan aparte, con un alcance acordado por escrito.",
      ],
    },
    {
      pregunta: "¿Trabajan con tiendas que ya existen?",
      respuesta: [
        "Sí. Muchas tiendas llegan a nosotros ya construidas, por nuestro equipo o por otros. Para esos casos hacemos una Revisión de tienda en seis frentes y entregamos un plan priorizado a 30, 60 y 90 días, con lo que conviene corregir primero y por qué.",
        "Para revisarla solo necesitamos acceso de colaborador con los permisos mínimos necesarios. No tocamos nada sin tu aprobación.",
      ],
    },
    {
      pregunta: "¿Se conecta con mi sistema de facturación o ERP?",
      respuesta: [
        "Depende de tu sistema. Si tiene API o un conector disponible, normalmente es posible. En el diagnóstico definimos qué información debe viajar entre la tienda y tu sistema (pedidos, inventario, clientes, facturas), en qué dirección y con qué frecuencia.",
        "Para la facturación electrónica ante la DIAN, conectamos la tienda con el proveedor tecnológico autorizado que ya uses o el que elijas.",
        "Si tu sistema no permite integración, te lo decimos desde el inicio y proponemos una alternativa realista en lugar de prometer algo que no se puede sostener.",
      ],
    },
    {
      pregunta: "¿Cuánto cuesta y cuánto tarda?",
      respuesta: [
        "Depende del alcance: tamaño del catálogo, integraciones, mercados y monedas, contenido que ya tengas y nivel de personalización. Por eso no publicamos un precio único.",
        "Después de una conversación inicial te entregamos una propuesta escrita con alcance, entregables, supuestos, exclusiones, cronograma y criterios de aceptación. Así sabes qué recibes y cuándo antes de comprometerte.",
      ],
    },
    {
      pregunta: "¿Qué necesito tener listo para empezar?",
      respuesta: [
        "Lo básico es tu marca (logo y colores), tu catálogo (productos, precios y fotos), la documentación legal de tu empresa para activar las pasarelas de pago, tus definiciones de envío y una persona con capacidad de decisión que sea nuestro punto de contacto.",
        "Si algo de esto aún no está definido, lo trabajamos contigo al inicio del proyecto.",
      ],
    },
    {
      pregunta: "¿En qué se diferencian de una agencia que solo diseña la tienda?",
      respuesta: [
        "Una tienda que se ve bien es el punto de partida. Nosotros además diseñamos cómo se conecta con tu operación: pedidos, pagos, inventario y atención al cliente.",
        "También definimos desde el inicio qué indicadores necesitas para tomar decisiones con tus propios datos. El objetivo es que la tienda no solo venda, sino que te permita leer el negocio.",
      ],
    },
    {
      pregunta: "¿Qué medios de pago y envíos se pueden configurar?",
      respuesta: [
        "Configuramos las pasarelas de pago y las opciones de envío disponibles en Shopify para tu país, según lo que elijas para tu negocio.",
        "Si manejas varios medios de pago, evaluamos contigo cómo automatizar la conciliación para que cuadrar ventas y recaudos deje de ser un proceso manual.",
      ],
    },
    {
      pregunta: "¿Se puede vender en varios países o en varias monedas?",
      respuesta: [
        "Sí. Shopify permite operar en múltiples mercados y monedas. Lo que define el alcance real es la combinación de pasarelas de pago, impuestos y envíos de cada mercado, y eso lo revisamos en el diagnóstico.",
        "Hemos operado tiendas en más de un mercado y moneda.",
      ],
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

/** Enlace "Ver tienda": solo con mostrarEnlace y url. */
export function enlaceTienda(t: Tienda): string | undefined {
  return t.mostrarEnlace ? t.url : undefined;
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
