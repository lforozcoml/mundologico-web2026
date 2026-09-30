/**
 * Una cifra de empresa. El campo `valor` es la única fuente de verdad del
 * número: no reescribirlo en los componentes.
 */
export type Cifra = {
  /** Cifra tal cual se muestra en grande. */
  valor: string;
  /** Sustantivo que acompaña a la cifra en la franja de confianza del home. */
  unidad: string;
  /** Etiqueta del bloque de cifras de Nosotros. */
  label: string;
  /** Resto de la frase en la franja de confianza del home. */
  complemento: string;
};

export type Cifras = {
  /** Fecha de corte de los datos. Revisar cada trimestre y actualizar. */
  fechaCorte: string;
  items: readonly Cifra[];
};

/**
 * Cifras de empresa. Se leen desde NosotrosSection.tsx y LogosStrip.tsx para
 * que las dos páginas nunca se contradigan.
 */
const cifras: Cifras = {
  fechaCorte: "septiembre de 2026",
  items: [
    {
      valor: "21 años",
      unidad: "",
      label: "construyendo tecnología para empresas",
      complemento: "construyendo tecnología",
    },
    {
      valor: "+70",
      unidad: "empresas",
      label: "empresas con procesos automatizados",
      complemento: "en Colombia y EE.UU.",
    },
    {
      valor: "+300",
      unidad: "automatizaciones",
      label: "automatizaciones en funcionamiento",
      complemento: "en funcionamiento",
    },
  ],
};

export const site = {
  nombre: "Mundo Lógico",
  tagline: "Automatizamos lo que frena tu negocio. Construimos lo que lo escala.",
  descripcion:
    "Conectamos tus herramientas, tus datos y agentes de IA en un solo sistema que hace el trabajo repetitivo por tu equipo. Procesos completos, no automatizaciones sueltas ni chatbots aislados.",
  contacto: {
    email: "hola@mundologico.com",
    telefono: "+57 312 8315581",
    ciudad: "Medellín, Colombia",
  },
  redes: {
    linkedin: "https://www.linkedin.com/company/mundologico",
  },
  partners: ["Make.com", "Google Workspace"],
  cifras,
};

export const CALENDARIO_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2McfMCNpByJV-5t2BNp4Dbetqm_DA3BGSiEitNWiplFuMauPHKMIZFBvA1aB7zPdBDIyomUesw";

export const nav = {
  links: [
    { label: "Productos", href: "/productos" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Casos de éxito", href: "/casos" },
    { label: "Contacto", href: "/#contacto" },
  ],
  // TODO: Cal.com
  cta: { label: "Agendar llamada", href: CALENDARIO_URL },
};
