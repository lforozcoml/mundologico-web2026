import Image from "next/image";
import { site } from "@/content/data/site";

const pillares = [
  { color: "bg-mundo-blue", text: "No somos una agencia. Somos ingenieros que se involucran en el problema desde adentro." },
  { color: "bg-mundo-teal", text: "Los mismos que diagnostican son los que construyen y entregan." },
  { color: "bg-mundo-purple", text: "Elegimos la herramienta y la IA según el problema." },
];

const badges = [
  { src: "/make-silver-sales.avif", alt: "Make Silver Partner Sales", w: 246, h: 246 },
  { src: "/make-silver-service.avif", alt: "Make Silver Partner Service", w: 239, h: 239 },
  { src: "/google-workspace-select-partner-sin-borde.png", alt: "Google Workspace Select Partner", w: 917, h: 621 },
];

type Fundador = {
  nombre: string;
  rol: string;
  linea: string;
  linkedin: string;
};

const fundadores: Fundador[] = [
  {
    nombre: "Juan Guillermo Gartner",
    rol: "CEO y co-fundador",
    linea: "Estrategia y clientes en Estados Unidos.",
    linkedin: "https://www.linkedin.com/in/jggartner/",
  },
  {
    nombre: "Federico Orozco",
    rol: "Co-fundador",
    linea: "Automatización e IA. Google Cloud Digital Leader.",
    linkedin: "https://www.linkedin.com/in/lforozco/",
  },
];

export function NosotrosSection() {
  return (
    <section className="py-24 overflow-hidden" id="nosotros">
      <div className="max-w-7xl mx-auto px-6">

        {/* Encabezado */}
        <div className="max-w-3xl mb-16">
          <Image src="/isotipo-separador.svg" alt="" width={26} height={26} className="mb-2.5" />
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-3">Quiénes somos</p>
          <h2 className="text-4xl md:text-5xl font-black text-mundo-dark leading-tight mb-5">
            21 años conectando{" "}
            <span className="text-mundo-blue">tecnología y negocio</span>
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
            Desde 2005 construimos tecnología para empresas en Colombia y Estados Unidos, y hace más de 8 años nos especializamos en automatizar procesos. Hoy nos enfocamos en automatización e IA: que tu equipo deje las tareas manuales, cometa menos errores de digitación y tenga mejor información para decidir.
          </p>
          <p className="text-[16px] text-gray-600 leading-relaxed">
            No vendemos chatbots sueltos. Trabajamos con <strong className="font-bold text-mundo-dark">IA embebida</strong>: la IA va dentro de tus automatizaciones, en el paso del proceso donde aporta, ya sea para leer un documento, clasificar una solicitud o redactar una respuesta. Usamos Claude o ChatGPT según lo que pida cada proceso.
          </p>
        </div>

        {/* Cifras */}
        <div className="mb-16">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl">
            {site.cifras.items.map(({ valor, label }) => (
              <div key={label} className="bg-gray-50 rounded-2xl border border-gray-200 px-7 py-6">
                <div className="text-[34px] font-black text-mundo-dark leading-none mb-2">{valor}</div>
                <div className="text-[14px] text-gray-600 leading-snug">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-gray-400 mt-4">
            Datos internos de Mundo Lógico a {site.cifras.fechaCorte}.
          </p>
        </div>

        {/* Cómo trabajamos */}
        <div className="max-w-3xl mb-16">
          <div className="flex flex-col gap-3">
            {pillares.map(({ color, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className={`w-1 h-9 rounded-full flex-shrink-0 ${color}`} />
                <p className="text-[15px] text-mundo-dark font-semibold">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners y certificaciones */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 p-12 mb-14">
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-5">Partners y certificaciones</p>
          <div className="flex items-center gap-4 flex-wrap mb-6">
            {badges.map(({ src, alt, w, h }) => (
              <Image key={alt} src={src} alt={alt} width={w} height={h} className="h-[76px] w-auto" />
            ))}
          </div>
          <p className="text-[15px] text-gray-600 leading-relaxed max-w-2xl">
            Todo nuestro equipo está certificado en Make, hasta nivel Advanced. También tenemos certificaciones en Monday.com y Google Cloud Digital Leader.
          </p>
        </div>

        {/* Fundadores */}
        <div className="max-w-3xl">
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-5">Fundadores</p>
          <div className="flex flex-col gap-4">
            {fundadores.map(({ nombre, rol, linea, linkedin }) => (
              <div key={nombre} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[16px] font-extrabold text-mundo-dark">{nombre}</span>
                <span className="text-[15px] text-gray-500">· {rol}. {linea}</span>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold text-mundo-blue hover:underline"
                >
                  LinkedIn →
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
