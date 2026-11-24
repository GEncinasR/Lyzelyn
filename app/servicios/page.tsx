import type { Metadata } from "next";
import PageText from "../components/PageText";
import Placeholder from "../components/Placeholder";

export const metadata: Metadata = {
  title: "Servicios",
};

export default function ServiciosPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <PageText title="¿Qué ofrecemos?">
          <p>
            En Lizelyn Beauty encontrarás una amplia gama de tratamientos de
            belleza y cuidado de la piel, pensados para realzar tu belleza
            natural y hacerte sentir increíble.
          </p>
          <p>
            Ofrecemos servicios de cosmetología, cuidado facial y corporal,
            maquillaje y más, siempre con atención personalizada y productos de
            calidad.
          </p>
          <p>
            Si estás interesado en alguno de nuestros servicios, no dudes en
            contactarnos para conocer disponibilidad y detalles.
          </p>
        </PageText>

        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <Placeholder
            label="Foto de Lizelyn Beauty"
            className="absolute inset-0"
          />
        </div>
      </div>

      <div className="flex flex-col gap-12 py-8">
        <div className="max-w-3xl text-left">
          <h2 className="font-display text-3xl leading-tight font-bold text-pink sm:text-5xl">
            Dermaplaning
          </h2>
          <p className="mt-4 text-lg leading-relaxed font-normal text-neutral-800 sm:text-3xl">
            Es un método de exfoliación física que utiliza una cuchilla quirúrgica para eliminar las células muertas y el vello facial fino
          </p>
        </div>

        <div className="ml-auto max-w-3xl text-left sm:text-right divide-y divide-neutral-800">
          <h2 className="font-display text-3xl leading-tight font-bold text-pink sm:text-5xl">
            Laminado de Cejas
          </h2>
          <p className="mt-4 text-lg leading-relaxed font-normal text-neutral-800 sm:text-3xl">
            Se aplica un tratamiento químico que alisa y moldea el vello hacia arriba, fijándolo en una posición específica.
          </p>
        </div>

        <div className="max-w-3xl text-left">
          <h2 className="font-display text-3xl leading-tight font-bold text-pink sm:text-5xl">
            Yoga Facial
          </h2>
          <p className="mt-4 text-lg leading-relaxed font-normal text-neutral-800 sm:text-3xl">
            Consiste en una serie de ejercicios y estiramientos musculares para el rostro.
          </p>
        </div>

        <div className="ml-auto max-w-3xl text-left sm:text-right">
          <h2 className="font-display text-3xl leading-tight font-bold text-pink sm:text-5xl">
            Piel Sensible
          </h2>
          <p className="mt-4 text-lg leading-relaxed font-normal text-neutral-800 sm:text-3xl">
            Un tratamiento suave y calmante, diseñado especialmente para pieles delicadas, reactivas o con tendencia a enrojecerse. 
          </p>
        </div>

        <div className="max-w-3xl text-left">
          <h2 className="font-display text-3xl leading-tight font-bold text-pink sm:text-5xl">
            Nutrición
          </h2>
          <p className="mt-4 text-lg leading-relaxed font-normal text-neutral-800 sm:text-3xl">
            Tratamiento con mascarillas para restaurar la luminosidad.
          </p>
        </div>

        <div className="ml-auto max-w-3xl text-left sm:text-right">
          <h2 className="font-display text-3xl leading-tight font-bold text-pink sm:text-5xl">
            Piel Madura
          </h2>
          <p className="mt-4 text-lg leading-relaxed font-normal text-neutral-800 sm:text-3xl">
            Tratamiento especializado para revitalizar, reafirmar y nutrir la piel con signos de envejecimiento.
          </p>
        </div>
      </div>
    </main>
  );
}
