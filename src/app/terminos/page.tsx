import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Términos y condiciones — Mundo Lógico",
  description: "Condiciones de uso de los servicios de Mundo Lógico S.A.S.",
};

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">

        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-6">
            <Image src="/isotipo-separador.svg" alt="" width={26} height={26} className="mb-3" />
            <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-black text-mundo-dark leading-tight mb-4">
              Términos y condiciones
            </h1>
            <p className="text-[15px] text-gray-500">
              Vigentes desde el 1 de octubre de 2023 · Última actualización: mayo de 2026
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 flex flex-col gap-12">

            {/* Sección 1 */}
            <div>
              <h2 className="text-[22px] font-extrabold text-mundo-dark mb-4 pb-3 border-b-2 border-gray-100">
                1. Propiedad intelectual
              </h2>
              <div className="flex flex-col gap-4 text-[15px] text-gray-600 leading-relaxed">
                <p>
                  Los textos, eslóganes, imágenes, logotipos, diseños, código fuente, metodologías y demás contenidos integrados en el sitio son propiedad de <strong className="text-mundo-dark">Mundo Lógico S.A.S.</strong> o de terceros que han autorizado su uso. Queda autorizada la reproducción en soporte papel o digital del contenido del sitio, siempre y cuando sea estrictamente para uso personal y excluya fines publicitarios o comerciales.
                </p>
                <p>
                  Cualquier reproducción, representación, utilización o modificación —total o parcial— del sitio o de sus contenidos, sin autorización previa y escrita de <strong className="text-mundo-dark">Mundo Lógico S.A.S.</strong>, queda terminantemente prohibida y se someterá a las sanciones establecidas por la ley.
                </p>
                <p>
                  Las marcas de terceros mencionadas en el sitio (Make.com, Monday.com, Google Workspace, entre otras) son propiedad de sus respectivos titulares. Su aparición en el sitio responde únicamente a la identificación de los productos y servicios con los que <strong className="text-mundo-dark">Mundo Lógico S.A.S.</strong> trabaja como partner certificado.
                </p>
              </div>
            </div>

            {/* Sección 2 */}
            <div>
              <h2 className="text-[22px] font-extrabold text-mundo-dark mb-4 pb-3 border-b-2 border-gray-100">
                2. Limitación de responsabilidad
              </h2>
              <div className="flex flex-col gap-4 text-[15px] text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-mundo-dark">Mundo Lógico S.A.S.</strong> no puede considerarse responsable por el contenido de sitios externos enlazados desde www.mundologico.com. El usuario utiliza el sitio bajo su propia responsabilidad.
                </p>
                <p>
                  <strong className="text-mundo-dark">Mundo Lógico S.A.S.</strong>, sus colaboradores y aliados no serán responsables por daños directos o indirectos —incluyendo pérdida de datos, perjuicio financiero o interrupciones del servicio— que resulten del acceso o uso del sitio o de sitios vinculados a él.
                </p>
                <p>
                  Las descripciones de servicios, metodologías y resultados publicados en el sitio son de carácter informativo y no constituyen una oferta contractual. <strong className="text-mundo-dark">Mundo Lógico S.A.S.</strong> se reserva el derecho de modificar en cualquier momento el contenido, los precios y el acceso al sitio.
                </p>
              </div>
            </div>

            {/* Sección 3 */}
            <div>
              <h2 className="text-[22px] font-extrabold text-mundo-dark mb-4 pb-3 border-b-2 border-gray-100">
                3. Ley aplicable y jurisdicción
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                Los presentes términos y condiciones se rigen por las leyes de la República de Colombia. Cualquier controversia derivada de su interpretación o aplicación se someterá a la jurisdicción de los jueces y tribunales competentes de la ciudad de Medellín, Antioquia.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-7 border border-gray-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="text-[15px] font-bold text-mundo-dark mb-1">¿Tienes preguntas sobre estos términos?</p>
                <p className="text-[14px] text-gray-500">Escríbenos a hola@mundologico.com</p>
              </div>
              <Link
                href="/privacidad"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-mundo-blue text-white font-semibold text-[14px] px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
              >
                Ver política de privacidad →
              </Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
