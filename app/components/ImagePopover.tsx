import Image from "next/image";
import type { ReactNode } from "react";

type ImagePopoverProps = {
  id: string;
  src: string;
  alt: string;
  children: ReactNode;
};

export default function ImagePopover({
  id,
  src,
  alt,
  children,
}: ImagePopoverProps) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        aria-label={`Ampliar ${alt}`}
        className="block h-full w-full cursor-pointer"
      >
        {children}
      </button>

      <div
        id={id}
        popover="auto"
        className="fixed inset-0 m-auto h-fit w-[min(92vw,1200px)] overflow-hidden rounded-2xl border-0 bg-transparent p-0 [&::backdrop]:bg-black/85"
      >
        <div className="relative h-[80vh] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="92vw"
            className="object-contain"
          />
        </div>
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          aria-label="Cerrar imagen"
          className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-black shadow-lg transition-colors hover:bg-white"
        >
          ×
        </button>
      </div>
    </>
  );
}
