import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Cita {
  id: string;
  nombre: string;
  edad: string;
  telefono: string;
  fecha: string;
  hora: string;
  condiciones: string;
  cirugiaEstetica: string;
  detalleCirugia: string;
  trabaja: string;
  estatura: string;
  peso: string;
}

interface CitasState {
  citas: Cita[];
  hidratado: boolean;
  agregarCita: (cita: Cita) => void;
  actualizarCita: (cita: Cita) => void;
  eliminarCita: (id: string) => void;
}

export const useCitasStore = create<CitasState>()(
  persist(
    (set) => ({
      citas: [],
      hidratado: false,
      agregarCita: (cita) =>
        set((estado) => ({ citas: [...estado.citas, cita] })),
      actualizarCita: (cita) =>
        set((estado) => ({
          citas: estado.citas.map((anterior) =>
            anterior.id === cita.id ? cita : anterior
          ),
        })),
      eliminarCita: (id) =>
        set((estado) => ({
          citas: estado.citas.filter((cita) => cita.id !== id),
        })),
    }),
    {
      name: "lizelyn-citas",
      skipHydration: true,
      partialize: (estado) => ({ citas: estado.citas }),
      onRehydrateStorage: () => () => {
        useCitasStore.setState({ hidratado: true });
      },
    }
  )
);
