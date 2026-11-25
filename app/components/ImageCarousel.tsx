"use client";

import Image from "next/image";
import { useCallback } from "react";
import type { KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { beforeAfterPairs } from "@/lib/gallery";
import { MEDIA_BASE_URL } from "@/lib/media";
import { useEmblaControls } from "./useEmblaControls";

const slides = beforeAfterPairs.flatMap((pair) => [
  {
    id: `${pair.id}-before`,
    src: pair.before,
    alt: `Resultado de ${pair.title}`,
  },
  {
    id: `${pair.id}-after`,
    src: pair.after,
    alt: `Resultado de ${pair.title}`,
  },
]);

export default function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const { selectedIndex, scrollSnaps, scrollTo, scrollPrev, scrollNext } =
    useEmblaControls(emblaApi);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollNext, scrollPrev],
  );

  return (
    <div className="mx-auto w-full max-w-lg">
      <div
        ref={emblaRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Galería de fotos"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-pink/40 outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2"
      >
        <div className="flex touch-pan-y select-none">
          {slides.map((slide, index) => (
            <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
              <figure className="relative aspect-[4/5] w-full bg-pink/10">
                <Image
                  src={`${MEDIA_BASE_URL}/${slide.src}`}
                  alt={slide.alt}
                  fill
                  unoptimized
                  priority={index === 0}
                  sizes="(min-width: 640px) 32rem, 100vw"
                  className="object-contain"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Imagen anterior"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-black shadow-md transition-colors hover:bg-pink focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          ←
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Ir a la imagen ${index + 1}`}
              aria-current={index === selectedIndex}
              className={`h-2.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:outline-none ${
                index === selectedIndex
                  ? "w-6 bg-pink"
                  : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Imagen siguiente"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-black shadow-md transition-colors hover:bg-pink focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          →
        </button>
      </div>
    </div>
  );
}
