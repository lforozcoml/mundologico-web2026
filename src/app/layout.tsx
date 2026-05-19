import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mundo Lógico — Automatización e IA para empresas",
  description:
    "Diseñamos e implementamos automatizaciones con IA para que tu equipo deje de hacer trabajo repetitivo y se enfoque en lo que realmente importa.",
  openGraph: {
    title: "Mundo Lógico",
    description: "Automatización e IA para empresas que quieren crecer.",
    siteName: "Mundo Lógico",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${tajawal.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
