import Image from "next/image";
import Link from "next/link";
import logo from "@/public/fotos/lizelin/logo.jpg";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-pink/60 bg-white text-black shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={logo}
            alt="Lizelin"
            priority
            sizes="(min-width: 640px) 8rem, 6rem"
            className="h-16 w-auto object-contain sm:h-20"
          />
        </Link>

        <ul className="flex items-center gap-4 overflow-x-auto text-base sm:gap-8 sm:text-xl lg:text-2xl">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-display whitespace-nowrap transition-colors hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
