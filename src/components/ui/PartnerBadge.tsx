import Image from "next/image";
import type { PartnerBadge as Badge } from "@/content/data/site";

type Props = {
  badge: Badge;
  /** Clases del contenedor (fondo, borde, padding). */
  className?: string;
  imgClassName?: string;
};

/** Insignia de partner. Si tiene href, todo el contenedor enlaza al perfil en una pestaña nueva. */
export function PartnerBadge({ badge, className, imgClassName }: Props) {
  const img = <Image src={badge.src} alt={badge.alt} width={badge.w} height={badge.h} className={imgClassName} />;

  if (!badge.href) return <div className={className}>{img}</div>;

  return (
    <a
      href={badge.href}
      target="_blank"
      rel="noopener noreferrer"
      title="Ver perfil de Mundo Lógico en el directorio de partners"
      className={`${className ?? ""} transition-opacity hover:opacity-85`}
    >
      {img}
    </a>
  );
}
