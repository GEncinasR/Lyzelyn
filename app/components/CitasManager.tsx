"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CalendarPlus,
  Search,
  Pencil,
  Trash2,
  X,
  Phone,
  Clock,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useCitasStore, type Cita } from "@/lib/citasStore";

const formularioInicial: Omit<Cita, "id"> = {
  nombre: "",
  edad: "",
  telefono: "",
  fecha: "",
  hora: "",
  condiciones: "",
  cirugiaEstetica: "No",
  detalleCirugia: "",
  trabaja: "No",
  estatura: "",
  peso: "",
};

function obtenerFechaActual() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

function formatearEstatura(valor: string, borrando: boolean) {
  const numeros = valor.replace(/\D/g, "").slice(0, 3);

  if (numeros.length === 0) return "";
  if (numeros.length === 1) return borrando ? numeros : numeros + ".";
  return numeros[0] + "." + numeros.slice(1);
}

export default function CitasManager() {
  const citas = useCitasStore((estado) => estado.citas);
  const hidratado = useCitasStore((estado) => estado.hidratado);
  const agregarCita = useCitasStore((estado) => estado.agregarCita);
  const actualizarCita = useCitasStore((estado) => estado.actualizarCita);
  const eliminarCita = useCitasStore((estado) => estado.eliminarCita);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [citaActual, setCitaActual] = useState<string | null>(null);
  const [fechaOriginal, setFechaOriginal] = useState("");

  const [formulario, setFormulario] = useState(formularioInicial);
  const [error, setError] = useState<string | null>(null);

  const [busqueda, setBusqueda] = useState("");

  const [alertaEliminar, setAlertaEliminar] = useState<{ id: string; nombre: string } | null>(null);

  useEffect(() => {
    useCitasStore.persist.rehydrate();
  }, []);

  function actualizarCampo(
    campo: keyof typeof formulario,
    valor: string
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  function abrirFormulario() {
    setFormulario(formularioInicial);
    setModoEdicion(false);
    setCitaActual(null);
    setFechaOriginal("");
    setError(null);
    setModalAbierto(true);
  }

  function editarCita(cita: Cita) {
    const { id, ...datos } = cita;

    setFormulario({ ...datos, hora: datos.hora ?? "" });
    setCitaActual(id);
    setFechaOriginal(cita.fecha);
    setModoEdicion(true);
    setError(null);
    setModalAbierto(true);
  }

  function cerrarFormulario() {
    setModalAbierto(false);
    setFormulario(formularioInicial);
    setCitaActual(null);
    setFechaOriginal("");
    setError(null);
  }


  function guardarCita(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      formulario.cirugiaEstetica === "Sí" &&
      !formulario.detalleCirugia.trim()
    ) {
      setError("Describe qué cirugía estética te has realizado.");
      return;
    }

    if (formulario.fecha < obtenerFechaActual() && formulario.fecha !== fechaOriginal) {
      setError("No puedes seleccionar una fecha anterior a hoy.");
      return;
    }

    if (Number(formulario.edad) < 12 || Number(formulario.edad) > 90) {
      setError("Ingresa una edad válida (entre 12 y 90 años).");
      return;
    }

    if (!/^\d\.\d{1,2}$/.test(formulario.estatura) || Number(formulario.estatura) < 1.4 || Number(formulario.estatura) > 2.4) {
      setError("Ingresa una estatura válida (entre 1.40 y 2.40 metros).");
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(formulario.peso) || Number(formulario.peso) < 40 || Number(formulario.peso) > 320) {
      setError("Ingresa un peso válido (entre 40 y 320 kg).");
      return;
    }

    const horarioOcupado = citas.some(
      (cita) =>
        cita.id !== citaActual &&
        cita.fecha === formulario.fecha &&
        cita.hora === formulario.hora
    );

    if (horarioOcupado) {
      setError("Ya hay una cita registrada ese día a esa hora.");
      return;
    }

    if (modoEdicion && citaActual) {
      actualizarCita({ ...formulario, id: citaActual });

      toast.success("Cita actualizada.");
    } else {
      const nuevaCita: Cita = {
        ...formulario,
        id: crypto.randomUUID(),
      };

      agregarCita(nuevaCita);

      toast.success("Tu cita se ha agendado correctamente. ¡Te esperamos!");
    }

    cerrarFormulario();
  }

    function confirmarEliminar() {
    if (!alertaEliminar) return;
    
    eliminarCita(alertaEliminar.id);
    toast.success(`Se eliminó la cita de ${alertaEliminar.nombre}.`);
    setAlertaEliminar(null);
  }

  const citasOrdenadas = [...citas].sort((a, b) =>
    a.fecha.localeCompare(b.fecha) || (a.hora ?? "").localeCompare(b.hora ?? "")
  );

    const citasFiltradas = citasOrdenadas.filter((cita) =>
    cita.telefono.includes(busqueda)
  );

  const proximasCitas = citasFiltradas.filter(
    (cita) => cita.fecha >= obtenerFechaActual()
  );

  if (!hidratado) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-16">
        <p className="text-center text-neutral-500">
          Cargando tus citas...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-8 sm:py-14">


      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold text-pink sm:text-5xl">
          Mis citas
        </h1>

        <p className="mt-3 text-neutral-600">
          Administra tus citas y reserva.
        </p>
      </div>


      <section className="mb-12 grid gap-5 sm:grid-cols-2">

        <button
          type="button"
          onClick={abrirFormulario}
          className="flex items-center gap-4 rounded-2xl bg-pink p-6 text-left text-white shadow-md transition hover:brightness-95"
        >
          <CalendarPlus size={38} />

          <div>
            <h2 className="text-xl font-bold">
              Agendar cita
            </h2>

            <p className="mt-1 text-sm text-white/90">
              Registra una nueva cita.
            </p>
          </div>
        </button>

        <div className="flex items-center gap-4 rounded-2xl border border-pink/30 bg-white p-6 shadow-sm">
          <Search size={38} className="text-pink" />

          <div className="flex-1">
            <h2 className="text-xl font-bold text-neutral-800">
              Consultar citas
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Busca tus reservaciones.
            </p>

            <div className="mt-3 flex gap-2">
              <input
                type="tel"
                placeholder="Número telefónico"
                aria-label="Buscar por número telefónico"
                maxLength={10}
                inputMode="numeric"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value.replace(/\D/g, ""))}
                className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-pink"
              />

              <button
                type="button"
                onClick={() => setBusqueda("")}
                disabled={!busqueda}
                aria-label="Limpiar búsqueda"
                title="Limpiar búsqueda"
                className="rounded-lg bg-pink px-4 text-white transition hover:brightness-95 disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

      </section>

      <section className="mb-14">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-neutral-800">
            Proximas citas
          </h2>

          <span className="rounded-full bg-pink/10 px-4 py-1 text-sm font-semibold text-pink">
            {proximasCitas.length} citas
          </span>
        </div>

        {proximasCitas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-pink/40 bg-pink/5 px-6 py-12 text-center">
            <CalendarDays
              size={42}
              className="mx-auto mb-4 text-pink"
            />

            <h3 className="text-lg font-semibold text-neutral-800">
              {busqueda
                ? "No hay próximas citas con ese número"
                : "Aún no tienes citas registradas"}
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              {busqueda
                ? "Revisa el número o limpia la búsqueda."
                : "Agenda tu primera cita y aparecerá aquí."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proximasCitas.map((cita) => (
              <div
                key={cita.id}
                className="rounded-2xl border border-pink/20 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <CalendarDays className="text-pink" />

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Próxima
                  </span>
                </div>

                <h3 className="font-bold text-neutral-800">
                  {cita.nombre}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                  <CalendarDays size={16} />
                  {cita.fecha}
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                  <Clock size={16} />
                  {cita.hora || "Sin hora"}
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                  <Phone size={16} />
                  {cita.telefono}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>


      <section>
        <h2 className="mb-5 font-display text-2xl font-bold text-neutral-800">
          Todas las citas
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-pink/10 text-neutral-800">
              <tr>
                <th className="p-4">Nombre</th>
                <th className="p-4">Edad</th>
                <th className="p-4">Teléfono</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Hora</th>
                <th className="p-4">Condiciones médicas</th>
                <th className="p-4">Cirugía estética</th>
                <th className="p-4">¿Trabaja?</th>
                <th className="p-4">Estatura</th>
                <th className="p-4">Peso</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {citasFiltradas.map((cita) => (
                <tr
                  key={cita.id}
                  className="transition hover:bg-pink/5"
                >
                  <td className="p-4 font-medium">
                    {cita.nombre}
                  </td>

                  <td className="p-4">{cita.edad}</td>
                  <td className="p-4">{cita.telefono}</td>
                  <td className="p-4">{cita.fecha}</td>
                  <td className="p-4">{cita.hora || "—"}</td>

                  <td className="max-w-48 truncate p-4" title={cita.condiciones}>
                    {cita.condiciones || "Ninguna"}
                  </td>

                  <td className="p-4">
                    {cita.cirugiaEstetica}
                  </td>

                  <td className="p-4">{cita.trabaja}</td>
                  <td className="p-4">{cita.estatura}</td>
                  <td className="p-4">{cita.peso}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={() => editarCita(cita)}
                        aria-label={`Editar cita de ${cita.nombre}`}
                        title="Editar cita"
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setAlertaEliminar({ id: cita.id, nombre: cita.nombre })}
                        aria-label={`Eliminar cita de ${cita.nombre}`}
                        title="Eliminar cita"
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {citasFiltradas.length === 0 && (
                <tr>
                  <td
                    colSpan={11}
                    className="p-10 text-center text-neutral-500"
                  >
                    {busqueda
                      ? "No se encontraron citas con ese número."
                      : "No hay citas registradas todavía."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>


      {modalAbierto && (
        <dialog
          ref={(dialogo) => {
            if (dialogo && !dialogo.open) dialogo.showModal();
          }}
          aria-labelledby="titulo-formulario"
          onClose={cerrarFormulario}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cerrarFormulario();
          }}
          className="m-auto w-[calc(100%-2rem)] max-w-2xl bg-transparent p-0 backdrop:bg-black/50"
        >
          <div className="max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">

            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 id="titulo-formulario" className="font-display text-2xl font-bold text-pink">
                  {modoEdicion ? "Editar cita" : "Agendar cita"}
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  {modoEdicion
                    ? "Modifica los datos de tu reservación."
                    : "Completa tus datos para registrar tu cita."}
                </p>
              </div>

              <button
                type="button"
                onClick={cerrarFormulario}
                className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100"
                aria-label="Cerrar formulario"
              >
                <X size={22} />
              </button>
            </div>


            <form onSubmit={guardarCita} className="space-y-5">

              <div>
                <label htmlFor="cita-nombre" className="mb-2 block text-sm font-semibold text-neutral-700">
                  Nombre completo *
                </label>

                <input
                  id="cita-nombre"
                  type="text"
                  required
                  maxLength={100}
                  value={formulario.nombre}
                  onChange={(e) =>
                    actualizarCampo("nombre", e.target.value)
                  }
                  placeholder="Ingresa tu nombre completo"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink focus:ring-2 focus:ring-pink/20"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="cita-edad" className="mb-2 block text-sm font-semibold text-neutral-700">
                    Edad *
                  </label>

                  <input
                    id="cita-edad"
                    type="text"
                    inputMode="numeric"
                    required
                    maxLength={3}
                    value={formulario.edad}
                    onChange={(e) =>
                      actualizarCampo(
                        "edad",
                        e.target.value.replace(/\D/g, "").slice(0, 3)
                      )
                    }
                    placeholder="Ej. 22"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink"
                  />
                </div>

                <div>
                  <label htmlFor="cita-telefono" className="mb-2 block text-sm font-semibold text-neutral-700">
                    Número telefónico *
                  </label>

                  <input
                    id="cita-telefono"
                    type="tel"
                    inputMode="numeric"
                    required
                    maxLength={10}
                    minLength={10}
                    value={formulario.telefono}
                    onChange={(e) =>
                      actualizarCampo(
                        "telefono",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="10 digitos"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink"
                  />
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="cita-fecha" className="mb-2 block text-sm font-semibold text-neutral-700">
                    Fecha de la cita *
                  </label>

                  <input
                    id="cita-fecha"
                    type="date"
                    required
                    min={modoEdicion && fechaOriginal && fechaOriginal < obtenerFechaActual() ? fechaOriginal : obtenerFechaActual()}
                    value={formulario.fecha}
                    onChange={(e) =>
                      actualizarCampo("fecha", e.target.value)
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink"
                  />
                </div>

                <div>
                  <label htmlFor="cita-hora" className="mb-2 block text-sm font-semibold text-neutral-700">
                    Hora de la cita *
                  </label>

                  <input
                    id="cita-hora"
                    type="time"
                    required
                    value={formulario.hora}
                    onChange={(e) =>
                      actualizarCampo("hora", e.target.value)
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cita-condiciones" className="mb-2 block text-sm font-semibold text-neutral-700">
                  ¿Presentas alguna condición médica?
                </label>

                <textarea
                  id="cita-condiciones"
                  rows={3}
                  maxLength={500}
                  value={formulario.condiciones}
                  onChange={(e) =>
                    actualizarCampo("condiciones", e.target.value)
                  }
                  placeholder="Describe tus condiciones médicas o escribe Ninguna."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink"
                />
              </div>

        

              <fieldset className="rounded-xl bg-pink/5 p-4">
                <legend className="float-left mb-3 w-full text-sm font-semibold text-neutral-700">
                  ¿Te has realizado alguna cirugía estética?
                </legend>

                <div className="clear-left flex gap-6">

                  {["Sí", "No"].map((opcion) => (
                    <label
                      key={opcion}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name="cirugia"
                        value={opcion}
                        checked={formulario.cirugiaEstetica === opcion}
                        onChange={() => {
                          actualizarCampo("cirugiaEstetica", opcion);

                          if (opcion === "No") {
                            actualizarCampo("detalleCirugia", "");
                          }
                        }}
                        className="accent-pink"
                      />

                      {opcion}
                    </label>
                  ))}

                </div>

                {formulario.cirugiaEstetica === "Sí" && (
                  <div className="mt-4">
                    <label htmlFor="cita-detalle-cirugia" className="mb-2 block text-sm font-semibold text-neutral-700">
                      ¿Cuáles cirugías te has realizado? *
                    </label>

                    <textarea
                      id="cita-detalle-cirugia"
                      required
                      rows={2}
                      maxLength={500}
                      value={formulario.detalleCirugia}
                      onChange={(e) =>
                        actualizarCampo("detalleCirugia", e.target.value)
                      }
                      placeholder="Describe las cirugías realizadas."
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink"
                    />
                  </div>
                )}
              </fieldset>

     

              <fieldset>
                <legend className="float-left mb-3 w-full text-sm font-semibold text-neutral-700">
                  ¿Actualmente trabajas?
                </legend>

                <div className="clear-left flex gap-6">

                  {["Sí", "No"].map((opcion) => (
                    <label
                      key={opcion}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name="trabaja"
                        value={opcion}
                        checked={formulario.trabaja === opcion}
                        onChange={() =>
                          actualizarCampo("trabaja", opcion)
                        }
                        className="accent-pink"
                      />

                      {opcion}
                    </label>
                  ))}

                </div>
              </fieldset>



              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="cita-estatura" className="mb-2 block text-sm font-semibold text-neutral-700">
                    Estatura (metros) *
                  </label>

                  <input
                    id="cita-estatura"
                    type="text"
                    inputMode="decimal"
                    required
                    maxLength={4}
                    value={formulario.estatura}
                    onChange={(e) =>
                      actualizarCampo(
                        "estatura",
                        formatearEstatura(e.target.value, e.target.value.length < formulario.estatura.length)
                      )
                    }
                    placeholder="Ej. 1.70"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink"
                  />

                  <p className="mt-1 text-xs text-neutral-400">
                    Ejemplo: 1.70 metros
                  </p>
                </div>

                <div>
                  <label htmlFor="cita-peso" className="mb-2 block text-sm font-semibold text-neutral-700">
                    Peso (kg) *
                  </label>

                  <input
                    id="cita-peso"
                    type="text"
                    inputMode="decimal"
                    required
                    maxLength={6}
                    value={formulario.peso}
                    onChange={(e) => {
                      let valor = e.target.value.replace(/[^\d.]/g, "");
                      const partes = valor.split(".");
                      if (partes.length > 2) {
                        valor = partes[0] + "." + partes.slice(1).join("");
                      }
                      const [entero, decimal] = valor.split(".");
                      valor = decimal !== undefined
                        ? entero + "." + decimal.slice(0, 2)
                        : entero;

                      actualizarCampo("peso", valor);
                    }}
                    placeholder="Ej. 65.5"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink"
                  />
                </div>

              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={cerrarFormulario}
                  className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold text-neutral-600 transition hover:bg-neutral-100"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-pink px-7 py-3 font-semibold text-white transition hover:brightness-95"
                >
                  {modoEdicion ? "Guardar cambios" : "Agendar cita"}
                </button>

              </div>

            </form>
          </div>
        </dialog>
      )}

       {alertaEliminar && (
        <dialog
          ref={(dialogo) => {
            if (dialogo && !dialogo.open) dialogo.showModal();
          }}
          aria-labelledby="titulo-eliminar"
          aria-describedby="texto-eliminar"
          onClose={() => setAlertaEliminar(null)}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setAlertaEliminar(null);
          }}
          className="m-auto w-[calc(100%-2rem)] max-w-md bg-transparent p-0 backdrop:bg-black/50"
        >
          <div className="w-full rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Trash2 size={32} className="text-red-600" />
            </div>
            
            <h3 id="titulo-eliminar" className="mb-2 text-xl font-bold text-neutral-800">
              ¿Eliminar cita?
            </h3>
            
            <p id="texto-eliminar" className="mb-6 text-neutral-600">
              ¿Estás seguro de que deseas eliminar la cita de <strong>{alertaEliminar.nombre}</strong>? Esta acción no se puede deshacer.
            </p>
            
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setAlertaEliminar(null)}
                className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold text-neutral-600 transition hover:bg-neutral-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarEliminar}
                className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </dialog>
      )}

      <ToastContainer position="top-right" theme="light" />
    </main>
  );
}
