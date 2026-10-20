import type { config as Config } from "../config";

type Node = {
  bot: string[];
  carousel?: { id: string; titulo: string; resumen: string; next: string }[];
  options?: { label: string; next?: string; action?: "scrollReserva" | "whatsapp" }[];
};

export function buildFlow(cfg: typeof Config) {
  const { faqPiloto, contacto } = cfg;
  const flow: Record<string, Node> = {
    inicio: {
      bot: ["¡Hola! 👋 Soy el asistente de LegallyCool.", "¿Con qué te ayudo?"],
      options: [
        { label: "Preguntas frecuentes", next: "faq" },
        { label: "Reservar una consulta", next: "reservar" },
        { label: "Hablar con una persona", next: "humano" },
      ],
    },
    faq: {
      bot: ["Dudas frecuentes (versión piloto). Tocá una:"],
      carousel: faqPiloto.map((f) => ({
        id: f.id,
        titulo: f.pregunta,
        resumen: "Ver respuesta",
        next: `faq_${f.id}`,
      })),
      options: [{ label: "Volver al inicio", next: "inicio" }],
    },
    reservar: {
      bot: ["¡Genial! Te llevo a elegir área, modalidad y horario. 📅"],
      options: [
        { label: "Ir a reservar", action: "scrollReserva", next: "inicio" },
        { label: "Volver al inicio", next: "inicio" },
      ],
    },
    humano: {
      bot: ["Con gusto. Escribime:", `📧 ${contacto.email}`, "También por WhatsApp."],
      options: [
        { label: "Abrir WhatsApp", action: "whatsapp", next: "inicio" },
        { label: "Volver al inicio", next: "inicio" },
      ],
    },
  };
  faqPiloto.forEach((f) => {
    flow[`faq_${f.id}`] = {
      bot: [f.respuesta],
      options: [
        { label: "Reservar consulta", action: "scrollReserva", next: "inicio" },
        { label: "Otra pregunta", next: "faq" },
        { label: "Volver al inicio", next: "inicio" },
      ],
    };
  });
  return flow;
}

export const START_NODE = "inicio";
