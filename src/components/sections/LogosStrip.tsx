import Image from "next/image";

const aiLogos = [
  { src: "/claude.svg", alt: "Claude" },
  { src: "/gemini.svg", alt: "Gemini" },
  { src: "/openai.svg", alt: "OpenAI" },
];

const autoLogos = [
  { src: "/make-logo.svg", alt: "Make.com" },
  { src: "/monday-logo.svg", alt: "Monday.com" },
  { src: "/airtable-logo.svg", alt: "Airtable" },
];

export function LogosStrip() {
  return (
    <div className="border-t border-b border-gray-200 bg-gray-50 py-7">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 flex-wrap justify-center">
        <span className="text-[13px] text-gray-400 font-medium whitespace-nowrap">IA agnósticos:</span>
        {aiLogos.map(({ src, alt }) => (
          <div
            key={alt}
            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg"
          >
            <Image src={src} alt={alt} width={80} height={24} className="h-6 w-auto" />
          </div>
        ))}
        <div className="w-px h-5 bg-gray-200 hidden md:block" />
        <span className="text-[13px] text-gray-400 font-medium whitespace-nowrap">Automatización:</span>
        {autoLogos.map(({ src, alt }) => (
          <div
            key={alt}
            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg"
          >
            <Image src={src} alt={alt} width={80} height={24} className="h-6 w-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
