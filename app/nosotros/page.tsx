import type { Metadata } from "next";
import Image from "next/image";
import PageText from "../components/PageText";
import { MEDIA_BASE_URL } from "@/lib/media";

export const metadata: Metadata = {
  title: "Nosotros",
};

const interiorImages = [
  {
    file: "lizelinInterior.jpeg",
    alt: "Interior de Lizelyn Beauty",
  },
  {
    file: "lizelinInterior2.jpeg",
    alt: "Interior de Lizelyn Beauty",
  },
];

export default function NosotrosPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
      <section className="max-w-3xl">
        <PageText title="lizelyn Beauty Salon">
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
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        {interiorImages.map((image) => {
          const src = `${MEDIA_BASE_URL}/${image.file}`;
          return (
            <a
              key={image.file}
              href={src}
              target="_blank"
              rel="noreferrer"
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={image.alt}
                fill
                unoptimized
                sizes="(min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </a>
          );
        })}
      </section>

      <hr className="border-t-4 border-dotted border-pink" />

      <section className="flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/9] lg:aspect-[21/9]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d840.2459142611011!2d-115.48659654945652!3d32.606618984757915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d77a0d7138925f%3A0x658134de8d79fbe2!2sNumancia%20220%2C%20Villa%20del%20Rey%20Tercera%20Etapa%2C%2021353%20Mexicali%2C%20B.C.!5e0!3m2!1ses!2smx!4v1795559868948!5m2!1ses!2smx"
            title="Ubicación de Lizelyn Beauty en Numancia 220, Mexicali, B.C."
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
    </main>
  );
}
