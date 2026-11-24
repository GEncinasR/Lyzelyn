export type BeforeAfterPair = {
  id: string;
  title: string;
  before: string;
  after: string;
};

export type HighlightImage = {
  src: string;
  alt: string;
};

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "h1",
    title: "Paciente H1",
    before: "pacienteH1Aantes.jpg",
    after: "pacienteH1BDespues.jpg",
  },
  {
    id: "h2",
    title: "Paciente H2",
    before: "pacienteH2Aantes.png",
    after: "DespuesPaciente.png",
  },
  {
    id: "m1",
    title: "Paciente M1",
    before: "pacienteM1Antes.jpg",
    after: "pacienteM1Despues.jpg",
  },
  {
    id: "m3",
    title: "Paciente M3",
    before: "pacienteM3Antes.jpg",
    after: "pacienteM3Despues.jpg",
  },
  {
    id: "m10",
    title: "Paciente M10",
    before: "pacienteM10Antes.png",
    after: "pacienteM10CDespues.png",
  },
  {
    id: "m12",
    title: "Paciente M12",
    before: "PacienteM12Antes.png",
    after: "PacienteM12Despues.png",
  },
  {
    id: "m13",
    title: "Paciente M13",
    before: "pacienteM13Cejas.png",
    after: "pacienteM13Despues.png",
  },
];

export const highlightImages: HighlightImage[] = [
  {
    src: "DrPenYPaciente.png",
    alt: "Tratamiento con Dr. Pen en Lizelyn Beauty",
  },
  {
    src: "DrPenShowcase.png",
    alt: "Equipo Dr. Pen utilizado en Lizelyn Beauty",
  },
  {
    src: "estanteMateriales2.png",
    alt: "Materiales y productos de Lizelyn Beauty",
  },
];
