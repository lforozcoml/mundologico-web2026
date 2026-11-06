import type { ReactNode } from "react";

type Props = {
  /** Dominio que se ve en la barra de direcciones. */
  dominio: string;
  children: ReactNode;
  className?: string;
};

/** Marco de navegador decorativo para mostrar capturas de tiendas. */
export function BrowserFrame({ dominio, children, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/15 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.35)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-100 px-3 py-2" aria-hidden>
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-[12px] text-gray-600">
          {dominio}
        </div>
      </div>
      {children}
    </div>
  );
}

/** Marco de celular decorativo. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.6rem] border-[6px] border-mundo-dark bg-mundo-dark shadow-[0_18px_40px_rgba(15,23,42,0.35)] ${className}`}
    >
      <div className="overflow-hidden rounded-[1.1rem] bg-white">{children}</div>
    </div>
  );
}
