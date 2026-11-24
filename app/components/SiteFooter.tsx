import Image from "next/image";
import logo from "@/public/fotos/lizelin/logo.jpg";

export default function SiteFooter() {
  return (
    <footer className="mt-auto flex justify-center border-t border-pink/60 bg-white py-8 shadow-[0_-1px_3px_0_rgba(0,0,0,0.1),0_-1px_2px_-1px_rgba(0,0,0,0.1)] sm:py-12">
      <Image
        src={logo}
        alt="Lizelin"
        priority
        sizes="(min-width: 1024px) 36rem, (min-width: 640px) 24rem, 80vw"
        className="h-24 w-auto max-w-full object-contain sm:h-32 lg:h-40"
      />
    </footer>
  );
}
