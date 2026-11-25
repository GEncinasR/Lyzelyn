import type { Metadata } from "next";
import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import PageText from "../components/PageText";
import { MEDIA_BASE_URL } from "@/lib/media";

export const metadata: Metadata = {
  title: "Contacto",
};

const socialLinks = [
  {
    href: "https://www.instagram.com/lizelyn_beauty_09/",
    label: "@lizelyn_beauty_09",
    Icon: Instagram,
    accent: "border-l-[#E1306C]",
    iconColor: "text-[#E1306C]",
  },
  {
    href: "https://wa.me/",
    label: "686 676 0123",
    Icon: MessageCircle,
    accent: "border-l-[#25D366]",
    iconColor: "text-[#25D366]",
  },
];

export default function ContactoPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <a
          href={`${MEDIA_BASE_URL}/jocelyn.jpg`}
          target="_blank"
          rel="noreferrer"
          className="relative aspect-[1010/1350] overflow-hidden rounded-2xl"
        >
          <Image
            src={`${MEDIA_BASE_URL}/jocelyn.jpg`}
            alt="Jocelyn, cosmetóloga de Lizelyn Beauty"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </a>

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
                className={`flex items-center gap-4 rounded-2xl border-l-4 bg-white p-4 shadow-md ring-1 ring-pink/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:outline-none ${social.accent}`}
              >
                <social.Icon
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={`h-10 w-10 shrink-0 ${social.iconColor}`}
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
