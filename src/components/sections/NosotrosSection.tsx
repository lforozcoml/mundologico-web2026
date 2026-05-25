import Image from "next/image";

const pillares = [
  { color: "bg-mundo-blue", text: "No somos una agencia. Somos ingenieros que se involucran en el problema desde adentro." },
  { color: "bg-mundo-teal", text: "Los mismos que diagnostican son los que construyen y entregan." },
  { color: "bg-mundo-purple", text: "Trabajamos con las mejores herramientas y la IA que mejor resuelve cada caso." },
];

const fundadores = [
  {
    initials: "JG",
    nombre: "Juan Guillermo Gartner",
    rol: "CEO & Co-fundador",
    bio: "Más de 20 años liderando proyectos de tecnología empresarial. Lidera la estrategia de la compañía y los proyectos con clientes en Estados Unidos. Especialista en diseñar arquitecturas de IA que resuelven problemas de negocio reales.",
    gradient: "linear-gradient(135deg, #23274C 0%, #6F6DFB 100%)",
    tags: [
      { label: "IA aplicada", color: "bg-purple-50 text-mundo-purple border border-purple-200" },
      { label: "Arquitectura", color: "bg-purple-50 text-mundo-purple border border-purple-200" },
      { label: "Clientes USA", color: "bg-blue-50 text-mundo-blue border border-blue-200" },
    ],
  },
  {
    initials: "FO",
    nombre: "Federico Orozco",
    rol: "Co-fundador · Automatización & IA",
    bio: "Especialista en automatización con Make.com, integración de sistemas y transformación digital. Trabaja directamente con cada cliente desde el diagnóstico hasta la entrega.",
    gradient: "linear-gradient(135deg, #176BEC 0%, #04BCA6 100%)",
    tags: [
      { label: "Automatización", color: "bg-teal-50 text-mundo-teal border border-teal-200" },
      { label: "Automatización & IA", color: "bg-blue-50 text-mundo-blue border border-blue-200" },
    ],
  },
];

export function NosotrosSection() {
  return (
    <section className="py-24 overflow-hidden" id="nosotros">
      <div className="max-w-7xl mx-auto px-6">

        {/* Historia */}
        <div className="max-w-3xl mb-24">
          <Image src="/isotipo-separador.svg" alt="" width={26} height={26} className="mb-2.5" />
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-3">Quiénes somos</p>
          <h2 className="text-4xl md:text-5xl font-black text-mundo-dark leading-tight mb-5">
            Conectamos{" "}
            <span className="text-mundo-blue">tecnología y negocio</span>
          </h2>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
            Mundo Lógico nació de la convicción de que la tecnología debe simplificar el trabajo, no complicarlo. Ayudamos a empresas alrededor del mundo a operar mejor, tomar mejores decisiones y crecer con menos fricción.
          </p>
          <p className="text-[16px] text-gray-600 leading-relaxed mb-7">
            Con IA, Make.com y las herramientas que dominamos como partners oficiales, cualquier empresa puede operar con la inteligencia de una multinacional.
          </p>
          <div className="flex flex-col gap-3">
            {pillares.map(({ color, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className={`w-1 h-9 rounded-full flex-shrink-0 ${color}`} />
                <p className="text-[15px] text-mundo-dark font-semibold">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fundadores */}
        <div className="mb-14">
          <div className="text-center mb-10">
            <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-2">Fundadores</p>
            <h3 className="text-3xl font-black text-mundo-dark">Las personas detrás<br />de cada proyecto</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {fundadores.map((f) => (
              <div key={f.nombre} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <div className="flex items-center gap-5 px-8 py-7" style={{ background: f.gradient }}>
                  <div className="w-[72px] h-[72px] rounded-full flex-shrink-0 flex items-center justify-center text-[22px] font-black text-white" style={{ background: "rgba(255,255,255,.15)", border: "2px solid rgba(255,255,255,.25)" }}>
                    {f.initials}
                  </div>
                  <div>
                    <div className="text-[18px] font-extrabold text-white">{f.nombre}</div>
                    <div className="text-[13px] text-white/70 mt-0.5">{f.rol}</div>
                  </div>
                </div>
                <div className="px-7 py-6">
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-5">{f.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {f.tags.map((t) => (
                      <span key={t.label} className={`text-[12px] font-semibold px-3 py-1 rounded-full ${t.color}`}>{t.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipo técnico */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 p-12">
          <p className="text-[13px] font-bold uppercase tracking-widest text-gray-400 mb-3">Equipo de ingeniería</p>
          <h3 className="text-[26px] font-extrabold text-mundo-dark mb-4">Especialistas en IA y automatización</h3>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-6 max-w-2xl">
            Nuestro equipo técnico trabaja con Make.com, Monday.com, Airtable y los principales modelos de IA del mercado. No subcontratamos lo que no sabemos hacer: cada herramienta que ofrecemos es una que ya hemos implementado en proyectos reales.
          </p>
          <div className="flex items-center gap-4 flex-wrap mb-5">
            {["/make-logo.svg", "/monday-logo.svg", "/google-partner-logo.png"].map((src) => (
              <div key={src} className="bg-gray-100 border border-gray-200 rounded-xl px-5 py-2.5">
                <Image src={src} alt="" width={80} height={36} className="h-9 w-auto" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Image src="/make-silver-sales.avif" alt="Make Silver Partner Sales" width={76} height={76} className="h-[76px] w-auto" />
            <Image src="/make-silver-service.avif" alt="Make Silver Partner Service" width={76} height={76} className="h-[76px] w-auto" />
          </div>
        </div>

      </div>
    </section>
  );
}
