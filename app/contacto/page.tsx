import type { Metadata } from "next";
import { Instagram, MessageCircle } from "lucide-react";
import PageText from "../components/PageText";
import Placeholder from "../components/Placeholder";

export const metadata: Metadata = {
  title: "Contacto",
};

const socialLinks = [
  {
    href: "https://www.instagram.com/lizelyn_beauty_09/",
    label: "@lizelyn_beauty_09",
    Icon: Instagram,
    accent: "border-l-[#E1306C]",
  },
  {
    href: "https://wa.me/",
    label: "686 6767 1234",
    Icon: MessageCircle,
    accent: "border-l-[#25D366]",
  },
];

export default function ContactoPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Placeholder
            label="Foto de Lizelyn Beauty"
            className="absolute inset-0"
          />
        </div>

        <div className="flex flex-col gap-4">
          <PageText title="Contáctanos">
            <p>
              ¡Síguenos en nuestras redes sociales y mantente al día con
              nuestras novedades!
              <br />
              Contáctanos en WhatsApp para reservar tu cita o para cualquier otra
              consulta.
            </p>
          </PageText>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-4 rounded-lg border-l-4 bg-white/10 p-4 transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 ${social.accent}`}
              >
                <social.Icon
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-10 w-10 shrink-0"
                />
                <span className="text-lg font-semibold sm:text-xl">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
