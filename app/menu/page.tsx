import type { Metadata } from "next";
import PageText from "../components/PageText";
import Placeholder from "../components/Placeholder";

export const metadata: Metadata = {
  title: "Menú",
};

const menuItems = [
  "Servicio 1",
  "Servicio 2",
  "Servicio 3",
  "Servicio 4",
  "Servicio 5",
  "Servicio 6",
];

const galleryItems = [
  "Foto 1",
  "Foto 2",
  "Foto 3",
  "Foto 4",
  "Foto 5",
  "Foto 6",
  "Foto 7",
  "Foto 8",
];

export default function MenuPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
      <PageText title="Menú de Servicios">
        <p>
          Contamos con una amplia variedad de servicios de belleza y cuidado
          personal que te van a encantar.
          <br />
          Ofrecemos tratamientos faciales, corporales, maquillaje y más, siempre
          con atención personalizada y productos de calidad.
          <br />
          Consulta nuestros servicios y descubre todo lo que Lizelyn Beauty
          tiene para ti.
        </p>
      </PageText>

      <div className="grid grid-cols-2 items-center gap-5 sm:grid-cols-3 sm:gap-[30px] xl:grid-cols-6">
        {menuItems.map((label) => (
          <div
            key={label}
            className="h-full rounded-xl bg-white p-[0.4rem] shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="relative h-[260px] w-full overflow-hidden rounded-lg sm:h-[300px]">
              <Placeholder label={label} className="absolute inset-0" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 p-2 sm:grid-cols-4 sm:p-4">
        {galleryItems.map((label) => (
          <div
            key={label}
            className="relative aspect-square overflow-hidden rounded-xl shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-105"
          >
            <Placeholder label={label} className="absolute inset-0" />
          </div>
        ))}
      </div>
    </main>
  );
}
