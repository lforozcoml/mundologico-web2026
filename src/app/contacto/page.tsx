import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Globe, MessageCircle, Phone, UserPlus } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { tarjetaContacto, tarjetaDerivados } from "@/content/data/tarjeta";
import { TarjetaTracker, type TarjetaAccion } from "@/components/ui/TarjetaTracker";

export const metadata: Metadata = pageMetadata({
  title: tarjetaDerivados.nombreCompleto,
  description: `Guarda el contacto de ${tarjetaDerivados.nombreCompleto} de ${tarjetaContacto.empresa}: automatización e IA para empresas.`,
  path: "/contacto",
});

type Boton = {
  accion: Exclude<TarjetaAccion, "guardar" | "correo">;
  label: string;
  href: string;
  icon: typeof Phone;
  externo: boolean;
};

const secundarios: Boton[] = [
  { accion: "llamar", label: "Llamar", href: tarjetaDerivados.telHref, icon: Phone, externo: false },
  { accion: "whatsapp", label: "WhatsApp", href: tarjetaDerivados.whatsappHref, icon: MessageCircle, externo: true },
  { accion: "web", label: "Visitar sitio web", href: tarjetaContacto.url, icon: Globe, externo: true },
];

export default function ContactoPage() {
  return (
    <main className="flex-1 bg-mundo-dark text-white flex items-start justify-center px-4 pt-8 pb-28 sm:items-center">
      <TarjetaTracker />
      <div className="w-full max-w-sm">
        <Link href="/" className="inline-flex min-h-11 items-center mb-6" aria-label="Ir a mundologico.com">
          <Image src="/logo-mundologico-blanco.png" alt="Mundo Lógico" width={160} height={36} className="h-8 w-auto" priority />
        </Link>

        <h1 className="text-4xl font-black leading-tight">{tarjetaDerivados.nombreCompleto}</h1>
        <p className="mt-2 text-lg text-white/80">{tarjetaContacto.empresa}</p>
        <p className="mt-1 text-base text-mundo-teal font-medium">Automatización e IA para empresas</p>

        <a
          href={tarjetaDerivados.vcfHref}
          download={tarjetaContacto.archivoVcf}
          data-tarjeta-accion="guardar"
          className="mt-8 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-lg font-bold text-mundo-dark hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-teal"
        >
          <UserPlus aria-hidden className="size-5" />
          Guardar contacto
        </a>

        <ul className="mt-4 grid gap-3">
          {secundarios.map(({ accion, label, href, icon: Icon, externo }) => (
            <li key={accion}>
              <a
                href={href}
                data-tarjeta-accion={accion}
                {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-base font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mundo-teal"
              >
                <Icon aria-hidden className="size-5" />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center">
          <a
            href={tarjetaDerivados.emailHref}
            data-tarjeta-accion="correo"
            className="inline-flex min-h-11 items-center text-base text-white/80 underline-offset-4 hover:underline"
          >
            {tarjetaContacto.email}
          </a>
        </p>
      </div>
    </main>
  );
}
