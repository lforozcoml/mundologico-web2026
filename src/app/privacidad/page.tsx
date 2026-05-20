import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de privacidad — Mundo Lógico",
  description: "Política de privacidad y tratamiento de datos personales de Mundo Lógico S.A.S. Ley 1581 de 2012.",
};

const finalidades = [
  "Responder solicitudes de contacto y agendar diagnósticos",
  "Prestar y mejorar los servicios contratados",
  "Enviar información comercial relevante sobre servicios de Mundo Lógico S.A.S. (con consentimiento previo)",
  "Cumplir obligaciones legales, contables y fiscales",
  "Realizar análisis estadísticos internos y mejoras en el sitio",
  "Prevenir fraudes y actividades ilícitas",
];

const datosGrid = [
  "Nombre y apellidos",
  "Correo electrónico",
  "Teléfono de contacto",
  "Nombre y sector de la empresa",
  "Descripción del proceso o necesidad",
  "Dirección IP y datos de navegación (cookies)",
];

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">

        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-6">
            <Image src="/isotipo-separador.svg" alt="" width={26} height={26} className="mb-3" />
            <p className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400 mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-black text-mundo-dark leading-tight mb-4">
              Política de privacidad y<br />tratamiento de datos
            </h1>
            <p className="text-[15px] text-gray-500">
              Ley 1581 de 2012 · Decreto 1377 de 2013 · Vigente desde el 1 de octubre de 2023
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 flex flex-col gap-12">

            {/* Responsable */}
            <div className="rounded-2xl p-7 border border-gray-200 bg-white">
              <p className="text-[12px] font-extrabold uppercase tracking-widest text-mundo-blue mb-3">Responsable del tratamiento</p>
              <p className="text-[15px] font-bold text-mundo-dark mb-1">MUNDO LÓGICO S.A.S.</p>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Consultora de IA y automatización empresarial<br />
                Correo: hola@mundologico.com · Web: www.mundologico.com
              </p>
            </div>

            {/* Sección 1 */}
            <div>
              <h2 className="text-[22px] font-extrabold text-mundo-dark mb-4 pb-3 border-b-2 border-gray-200">
                1. Datos que recolectamos
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-5">
                Al usar el sitio web, diligenciar el formulario de contacto o contratar los servicios de <strong className="text-mundo-dark">Mundo Lógico S.A.S.</strong> podemos recolectar:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {datosGrid.map((dato) => (
                  <div key={dato} className="rounded-xl px-5 py-4 bg-white border border-gray-200 text-[14px] text-gray-600">
                    {dato}
                  </div>
                ))}
              </div>
            </div>

            {/* Sección 2 */}
            <div>
              <h2 className="text-[22px] font-extrabold text-mundo-dark mb-4 pb-3 border-b-2 border-gray-200">
                2. Para qué usamos tus datos
              </h2>
              <div className="flex flex-col gap-3">
                {finalidades.map((f) => (
                  <div key={f} className="flex gap-4 items-start">
                    <span className="text-mundo-blue font-bold text-lg flex-shrink-0 mt-0.5">→</span>
                    <span className="text-[15px] text-gray-600 leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sección 3 */}
            <div>
              <h2 className="text-[22px] font-extrabold text-mundo-dark mb-4 pb-3 border-b-2 border-gray-200">
                3. Cookies
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
                <strong className="text-mundo-dark">Mundo Lógico S.A.S.</strong> puede utilizar cookies y tecnologías similares para analizar el comportamiento de navegación, mejorar la experiencia de usuario y medir el rendimiento del sitio. La información obtenida puede incluir tipo de navegador, idioma del dispositivo, páginas visitadas, dirección IP y duración de la sesión.
              </p>
              <div className="rounded-xl px-6 py-4 bg-white border border-gray-200 text-[14px] text-gray-600 leading-relaxed">
                El usuario puede deshabilitar las cookies desde la configuración de su navegador en cualquier momento.
              </div>
            </div>

            {/* Sección 4 */}
            <div>
              <h2 className="text-[22px] font-extrabold text-mundo-dark mb-4 pb-3 border-b-2 border-gray-200">
                4. Almacenamiento y vigencia
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                La información permanecerá almacenada hasta por <strong className="text-mundo-dark">diez (10) años</strong> contados desde la fecha del último tratamiento, o hasta que el titular solicite su eliminación, salvo obligación legal en contrario. Los datos pueden ser procesados en servidores propios o de terceros proveedores de nube, en distintos países, lo cual el usuario acepta al usar el sitio.
              </p>
            </div>

            {/* Sección 5 */}
            <div>
              <h2 className="text-[22px] font-extrabold text-mundo-dark mb-4 pb-3 border-b-2 border-gray-200">
                5. Tus derechos como titular
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-5">
                Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos personales, y a revocar la autorización otorgada en cualquier momento. Para ejercerlos, envía una solicitud a:
              </p>
              <div className="rounded-2xl p-7 bg-white border border-gray-200">
                <p className="text-[15px] font-bold text-mundo-dark mb-3">hola@mundologico.com</p>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  Tu solicitud debe incluir: nombre completo, tipo y número de documento, teléfono, correo electrónico y descripción del derecho que deseas ejercer. Respondemos en los términos establecidos por la Ley 1581 de 2012.
                </p>
              </div>
            </div>

            {/* Sección 6 */}
            <div>
              <h2 className="text-[22px] font-extrabold text-mundo-dark mb-4 pb-3 border-b-2 border-gray-200">
                6. Modificaciones a esta política
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                <strong className="text-mundo-dark">Mundo Lógico S.A.S.</strong> se reserva el derecho de modificar esta política en cualquier momento. Los cambios serán publicados en el sitio web y notificados al último correo electrónico registrado cuando aplique.
              </p>
            </div>

            {/* Aceptación */}
            <div className="rounded-2xl p-8" style={{ background: "#23274C" }}>
              <p className="text-[12px] font-extrabold uppercase tracking-widest text-mundo-teal mb-3">Aceptación</p>
              <p className="text-[15px] text-white/75 leading-relaxed mb-6">
                El uso del sitio web, el diligenciamiento del formulario de contacto o la contratación de servicios implica la aceptación de los términos de esta política.
              </p>
              <Link href="/terminos" className="text-[14px] font-bold text-mundo-teal hover:underline">
                ← Ver términos y condiciones
              </Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
