import { useMemo, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import config from "../config";
import { buildFlow, START_NODE } from "./chatFlow";

type Msg = { from: "bot" | "user"; text: string };

export default function Chatbot() {
  const flow = useMemo(() => buildFlow(config), []);
  const [open, setOpen] = useState(false);
  const [nodeId, setNodeId] = useState(START_NODE);
  const [messages, setMessages] = useState<Msg[]>([]);
  const node = flow[nodeId];

  const goTo = (id: string) => {
    const t = flow[id];
    if (!t) return;
    setNodeId(id);
    setMessages((p) => [...p, ...t.bot.map((text) => ({ from: "bot" as const, text }))]);
  };
  const openChat = () => {
    setOpen(true);
    if (messages.length === 0) goTo(START_NODE);
  };
  const runAction = (a?: string) => {
    if (a === "scrollReserva") document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" });
    if (a === "whatsapp") window.open(`https://wa.me/${config.contacto.whatsapp}`, "_blank");
  };

  if (!open) {
    return (
      <button
        onClick={openChat}
        aria-label="Abrir chat"
        className="hover-lift focus-ring fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-lc-verde text-lc-carbon px-5 py-3 rounded-full shadow-lg hover:brightness-95"
      >
        <MessageCircle size={18} /> Chatear
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Asistente de LegallyCool"
      className="fixed bottom-5 right-5 z-50 w-[92vw] max-w-sm max-h-[70vh] overflow-auto bg-white rounded-2xl shadow-xl border-t-4 border-lc-verde p-4 animate-fade-in-down"
    >
      <div className="flex justify-between items-center mb-2">
        <strong className="text-lc-carbon">Asistente</strong>
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar"
          className="focus-ring text-lc-carbon hover:text-lc-verde transition-colors duration-200 rounded-sm"
        >
          <X size={18} />
        </button>
      </div>

      <p className="text-lc-carbon/50 text-xs italic mb-3 border-b border-lc-gris pb-3">
        {config.legal.disclaimerBot}
      </p>

      <div className="space-y-2 mb-3">
        {messages.map((m, i) => (
          <p
            key={i}
            className={`text-sm ${m.from === "bot" ? "text-lc-carbon" : "text-lc-carbon/70"}`}
          >
            <strong>{m.from === "bot" ? "Asistente" : "Vos"}:</strong> {m.text}
          </p>
        ))}
      </div>

      {node?.carousel && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {node.carousel.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setMessages((p) => [...p, { from: "user", text: c.titulo }]);
                goTo(c.next);
              }}
              className="chip-lift focus-ring min-w-[180px] text-left bg-lc-gris rounded-xl p-3 hover:bg-lc-verde/25"
            >
              <strong className="block text-sm text-lc-carbon">{c.titulo}</strong>
              <span className="text-xs text-lc-carbon/60">{c.resumen}</span>
            </button>
          ))}
        </div>
      )}

      {node?.options && (
        <div className="flex flex-wrap gap-2">
          {node.options.map((o, i) => (
            <button
              key={i}
              onClick={() => {
                setMessages((p) => [...p, { from: "user", text: o.label }]);
                runAction(o.action);
                if (o.next) goTo(o.next);
              }}
              className="chip-lift focus-ring bg-lc-gris text-lc-carbon text-sm px-3 py-1.5 rounded-full hover:bg-lc-verde/25"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
