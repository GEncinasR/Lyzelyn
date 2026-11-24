import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lizelyn Beauty",
    template: "%s | Lizelyn Beauty",
  },
  description: "Lizelyn Beauty: cuidado, belleza y bienestar personal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-white">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
