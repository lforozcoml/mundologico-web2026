import Image from "next/image";

const LOGOS: Record<string, { src: string; label: string }> = {
  "Make.com":      { src: "/make-isotipo.svg",    label: "Make.com" },
  "Monday.com":    { src: "/monday-isotipo.svg",  label: "Monday.com" },
  "Airtable":      { src: "/airtable-isotipo.svg",label: "Airtable" },
  "OpenAI":        { src: "/openai.svg",           label: "OpenAI" },
  "Claude":        { src: "/claude.svg",           label: "Claude" },
  "Gemini":        { src: "/gemini.svg",           label: "Gemini" },
};

type Props = {
  name: string;
  size?: "sm" | "md";
};

export function StackPill({ name, size = "sm" }: Props) {
  const logo = LOGOS[name];
  const iconSize = size === "md" ? 20 : 16;
  const containerSize = size === "md" ? "w-6 h-6" : "w-5 h-5";

  if (logo) {
    return (
      <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2.5 py-1 shadow-sm">
        <div className={`${containerSize} flex items-center justify-center flex-shrink-0`}>
          <Image src={logo.src} alt={logo.label} width={iconSize} height={iconSize} className="w-full h-full object-contain" />
        </div>
        <span className={`font-semibold text-mundo-dark ${size === "md" ? "text-[13px]" : "text-[12px]"}`}>{name}</span>
      </div>
    );
  }

  return (
    <span className={`inline-block bg-gray-100 text-gray-600 rounded-lg px-2.5 py-1 font-semibold ${size === "md" ? "text-[13px]" : "text-[12px]"}`}>
      {name}
    </span>
  );
}
