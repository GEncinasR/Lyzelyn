import type { Metadata } from "next";
import Image from "next/image";
import PageText from "../components/PageText";
import { mediaUrl } from "@/lib/media";

export const metadata: Metadata = {
  title: "Nosotros",
};

export default function NosotrosPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="relative aspect-[1010/1350] overflow-hidden rounded-2xl">
          <Image
            src={mediaUrl("jocelyn.jpg")}
            alt="Jocelyn, cosmetóloga de Lizelyn Beauty"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <PageText title="Lizelyn Beauty Salon">
            <p>
              Somos un espacio dedicado al cuidado, la belleza y el bienestar
              personal.
              <br />
              Nos especializamos en brindar servicios que realzan la belleza de
              cada persona, ofreciendo atención personalizada, calidad y un
              ambiente agradable donde nuestros clientes puedan sentirse
              cómodos, seguros y especiales.
              <br />
              Nuestro objetivo es ayudar a cada persona a resaltar su belleza y
              fortalecer su confianza.
            </p>
           
          </PageText>
        </div>
      </div>
    </main>
  );
}
