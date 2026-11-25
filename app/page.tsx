import Image from "next/image";
import PageText from "./components/PageText";
import ImageCarousel from "./components/ImageCarousel";
import { highlightImages } from "@/lib/gallery";
import { MEDIA_BASE_URL } from "@/lib/media";

export default function Home() {
  const [firstHighlight, secondHighlight, thirdHighlight] = highlightImages;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
      <PageText title="lizelyn Beauty Salon">
        <p>
          Somos un espacio dedicado al cuidado, la belleza y el bienestar personal.
          <br />
          Nos especializamos en brindar servicios que realzan la belleza de cada persona, ofreciendo atención personalizada, calidad y un ambiente agradable donde nuestros clientes puedan sentirse cómodos, seguros y especiales.
          <br />
          Nuestro objetivo es ayudar a cada persona a resaltar su belleza y fortalecer su confianza.
        </p>
      </PageText>

      <ImageCarousel />

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col justify-center gap-4 sm:gap-6">
          <a
            href={`${MEDIA_BASE_URL}/${firstHighlight.src}`}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-square overflow-hidden rounded-2xl"
          >
            <Image
              src={`${MEDIA_BASE_URL}/${firstHighlight.src}`}
              alt={firstHighlight.alt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 40vw, 45vw"
              className="object-cover"
            />
          </a>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:gap-6">
          <a
            href={`${MEDIA_BASE_URL}/${secondHighlight.src}`}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src={`${MEDIA_BASE_URL}/${secondHighlight.src}`}
              alt={secondHighlight.alt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 40vw, 45vw"
              className="object-cover"
            />
          </a>
          <a
            href={`${MEDIA_BASE_URL}/${thirdHighlight.src}`}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src={`${MEDIA_BASE_URL}/${thirdHighlight.src}`}
              alt={thirdHighlight.alt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 40vw, 45vw"
              className="object-cover"
            />
          </a>
        </div>
      </div>
    </main>
  );
}
