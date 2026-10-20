import { Fragment, useState } from "react";
import config, { type Modalidad } from "../config";
import Destello from "./brand/Destello";
import IconoCalendario from "./brand/IconoCalendario";
import { useReveal } from "../hooks/useReveal";

// Alto fijo del contenedor del calendario. El placeholder y el iframe de Cal.com ocupan
// exactamente el mismo alto, así el layout no salta al elegir servicio/modalidad.
const CALENDARIO_H = 460;

// ============================================================================
// BLOQUE DE SELECCIÓN: rótulo + fila de chips. Siempre visible y compacto.
// ============================================================================
function BloqueSeleccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      {/* Rótulo de formulario: DM Sans a propósito (es "información", no titular editorial) */}
      <h3 className="not-italic font-sans text-lc-carbon text-sm font-semibold mb-3">{titulo}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// Reserva: 1) área  2) modalidad (presencial, preseleccionada)  3) día y horario en Cal.com
// 4) confirmar por WhatsApp. El sitio no cobra nada: no hay paso de pago.
export default function Reserva() {
  const { consultas, modalidades, calcom, reserva, marca, sobreMi, contacto } = config;
  const [tipoId, setTipoId] = useState<string | null>(null);
  const [modalidadElegida, setModalidadElegida] = useState<Modalidad | null>(null);
  // El iframe de Cal.com no le avisa a la página cuando alguien termina de reservar, así que
  // el paso de confirmación lo habilita la persona con el botón "Ya reservé mi turno".
  const [yaReservo, setYaReservo] = useState(false);

  // Si config.modalidades trae una sola (hoy: presencial), queda preseleccionada. El paso se
  // sigue mostrando igual, con su lugar en el stepper: es una decisión de diseño, el
  // formulario conserva sus 3 pasos aunque en este no haya nada que decidir.
  const modalidadFija = modalidades.length === 1 ? modalidades[0].id : null;
  const modalidad = modalidadFija ?? modalidadElegida;

  const destello = useReveal<HTMLDivElement>();
  const heading = useReveal<HTMLHeadingElement>({ delayMs: 70 });
  const cuerpo = useReveal<HTMLDivElement>({ delayMs: 140 });

  const tipo = consultas.find((c) => c.id === tipoId);
  const calcomUrl = tipo ? `https://cal.com/${calcom.usuario}/${tipo.calcomEvent}` : null;
  const listoParaAgendar = Boolean(tipo && modalidad);

  // Mensaje prearmado de WhatsApp. Sin día y hora (el iframe no los expone), va la versión
  // genérica; la plantilla con {fecha} queda lista para cuando se pueda leer la reserva.
  const linkWhatsapp = tipo
    ? `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(
        reserva.whatsappMensajeSinFecha.replace("{area}", tipo.titulo)
      )}`
    : null;

  // El iframe se embebe SOLO si la cuenta y el evento no son placeholder Y además los
  // eventos están dados de alta en Cal.com (calcom.eventosListos). Si falta cualquiera de
  // las tres cosas se muestra el placeholder de marca — nunca el 404 de Cal.com.
  const calcomListo =
    calcom.eventosListos &&
    !calcom.usuario.startsWith("PLACEHOLDER") &&
    tipo !== undefined &&
    !tipo.calcomEvent.startsWith("PLACEHOLDER");

  const mostrarIframe = listoParaAgendar && calcomListo;

  // Pasos del stepper: "alcanzado" se va habilitando con las elecciones del usuario.
  const pasos = [
    { label: reserva.stepperServicio, alcanzado: true },
    { label: reserva.stepperModalidad, alcanzado: Boolean(tipo) },
    { label: reserva.stepperHorario, alcanzado: listoParaAgendar },
    { label: reserva.stepperConfirmar, alcanzado: listoParaAgendar && yaReservo },
  ];

  // Chip: inactivo en blanco con borde azul translúcido; activo en naranja (color de acción).
  const chip = (activo: boolean) =>
    `chip-lift focus-ring px-4 py-2 rounded-full text-sm font-medium disabled:cursor-not-allowed ${
      activo
        ? "bg-lc-naranja text-lc-carbon shadow-glow-naranja-sm"
        : "bg-white text-lc-carbon border border-lc-azul/[0.22] hover:border-lc-azul hover:shadow-glow-azul-sm"
    }`;

  return (
    <section id="reserva" className="relative overflow-hidden bg-lc-blanco px-6 pt-20 md:pt-28 pb-28 md:pb-36">
      {/* Resplandores muy sutiles de fondo — violeta arriba-derecha, azul abajo-izquierda */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-lc-violeta/20 blur-[70px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-lc-azul/10 blur-[70px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Una sola columna centrada */}
      <div className="relative max-w-[920px] mx-auto">
        {/* Encabezado */}
        <div ref={destello.ref} style={destello.style} className={destello.className}>
          <Destello className="w-7 h-7 text-lc-naranja mb-3" />
        </div>
        <h2
          ref={heading.ref}
          style={heading.style}
          className={`${heading.className} text-lc-carbon text-4xl md:text-6xl leading-none mb-3`}
        >
          {reserva.heading} <span className="italic text-lc-naranja">{reserva.headingAcento}</span>
        </h2>
        <p className="text-lc-carbon/70 mb-10">{reserva.bajada}</p>

        <div ref={cuerpo.ref} style={cuerpo.style} className={cuerpo.className}>
          {/* ==================== STEPPER HORIZONTAL ==================== */}
          <ol className="flex items-center mb-10">
            {pasos.map((p, i) => (
              <Fragment key={p.label}>
                {i > 0 && (
                  <li
                    aria-hidden="true"
                    className={`h-px flex-1 mx-2 sm:mx-3 transition-colors ${
                      p.alcanzado ? "bg-lc-azul/55" : "bg-lc-gris"
                    }`}
                  />
                )}
                <li className="flex items-center gap-2 shrink-0">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                      p.alcanzado ? "bg-lc-azul text-white" : "bg-lc-gris text-lc-carbon/45"
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {/* En mobile solo se ven los círculos */}
                  <span
                    className={`hidden sm:inline text-sm transition-colors ${
                      p.alcanzado ? "text-lc-carbon font-medium" : "text-lc-carbon/45"
                    }`}
                  >
                    {p.label}
                  </span>
                </li>
              </Fragment>
            ))}
          </ol>

          {/* ==================== SELECCIÓN ==================== */}
          <BloqueSeleccion titulo={reserva.paso1}>
            {consultas.map((c) => (
              <button
                key={c.id}
                className={chip(c.id === tipoId)}
                onClick={() => {
                  setTipoId(c.id);
                  setModalidadElegida(null);
                  setYaReservo(false); // cambiar de área reinicia el paso de confirmación
                }}
              >
                {c.titulo}
              </button>
            ))}
          </BloqueSeleccion>

          {/* Paso de modalidad. Con una sola opción (hoy, presencial) el chip ya viene marcado
              y queda habilitado desde el principio: no hay nada que esperar para elegirlo. */}
          <BloqueSeleccion titulo={reserva.paso2}>
            {modalidades.map((m) => (
              <button
                key={m.id}
                className={chip(m.id === modalidad)}
                disabled={!modalidadFija && !tipo}
                onClick={() => setModalidadElegida(m.id)}
              >
                {m.label}
              </button>
            ))}
          </BloqueSeleccion>

          {/* ==================== CALENDARIO (alto fijo) ==================== */}
          {/* Línea de resumen: servicio · modalidad · precio */}
          {listoParaAgendar && (
            <p className="text-lc-carbon/70 text-sm mb-3">
              {tipo!.titulo} · {modalidades.find((m) => m.id === modalidad)!.label} · {tipo!.precio}
            </p>
          )}

          <div
            className="w-full overflow-hidden rounded-[20px] bg-white border border-lc-azul/10 shadow-card-soft"
            style={{ height: CALENDARIO_H }}
          >
            {mostrarIframe ? (
              <iframe
                title={`Reservar ${tipo!.titulo}`}
                src={calcomUrl!}
                className="w-full h-full border-0"
              />
            ) : (
              /* Placeholder de marca — se muestra si falta elegir, o si Cal.com todavía no
                 está configurado. Nunca se embebe un evento inexistente. */
              <div className="w-full h-full flex flex-col items-center justify-center text-center px-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lc-naranja to-lc-rosa shadow-glow-naranja flex items-center justify-center mb-5">
                  <IconoCalendario className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lc-carbon text-2xl md:text-3xl mb-2">{reserva.paso3}</h3>
                <p className="text-lc-carbon/70 text-sm max-w-sm">
                  {listoParaAgendar ? reserva.calendarioTexto : reserva.paso3Espera}
                </p>
              </div>
            )}
          </div>

          {/* Horario de atención + modalidad: línea chica y discreta bajo el calendario. */}
          <p className="text-lc-carbon/60 text-xs mt-3">{reserva.horariosAtencion}</p>

          {/* "Ya reservé mi turno": habilita el paso de confirmación. Hace falta porque el
              calendario va embebido en un <iframe> simple, que no le avisa a la página
              cuando la reserva se completa. */}
          {listoParaAgendar && !yaReservo && (
            <button
              onClick={() => setYaReservo(true)}
              className="chip-lift focus-ring mt-4 inline-block bg-white text-lc-carbon border border-lc-azul/[0.22] font-medium px-5 py-2.5 rounded-full text-sm hover:border-lc-azul hover:shadow-glow-azul-sm"
            >
              {reserva.yaReserveBoton}
            </button>
          )}

          {/* ============== CONFIRMACIÓN POR WHATSAPP (paso final) ============== */}
          {listoParaAgendar && yaReservo && (
            <div className="mt-5 bg-white border border-lc-azul/10 rounded-[20px] shadow-card-soft px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-down">
              <div>
                <h3 className="text-lc-carbon text-xl mb-1">{reserva.confirmarTitulo}</h3>
                <p className="text-lc-carbon/60 text-sm max-w-md">{reserva.confirmarNota}</p>
              </div>
              <a
                href={linkWhatsapp!}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift focus-ring shrink-0 inline-block bg-lc-naranja text-lc-carbon font-semibold px-6 py-3 rounded-full hover:brightness-95 whitespace-nowrap"
              >
                {reserva.confirmarBoton}
              </a>
            </div>
          )}

          {/* ============ "CÓMO FUNCIONA" COMO TIRA FINA ============ */}
          <div className="mt-12 pt-8 border-t border-lc-violeta/40">
            <ol className="grid sm:grid-cols-3 gap-6">
              {reserva.comoFuncionaPasos.map((paso, i) => (
                <li key={paso} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-lc-azul text-white text-xs font-bold"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-lc-carbon/75 text-sm leading-relaxed">{paso}</span>
                </li>
              ))}
            </ol>

            {/* Credencial (matrícula visible, objetivo del manual) */}
            <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-lc-carbon/60">
              <span className="text-lc-azul font-semibold">{marca.nombreReal}</span>
              <span aria-hidden="true">·</span>
              <span>{sobreMi.rol}</span>
              <span aria-hidden="true">·</span>
              <span>{marca.matricula}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
