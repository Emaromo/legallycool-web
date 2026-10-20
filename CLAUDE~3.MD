# Landing LegallyCool — Spec completo para Claude Code (template Drift adaptado)

> **Qué es esto:** documento único, por fases y con código, para pegar en Claude Code.
> Toma la **estructura de la plantilla "Drift"** (React + Vite + TypeScript + Tailwind +
> lucide-react) y la adapta a la marca **LegallyCool**: se cambian **colores y
> contenido**, y se **agregan** las dos piezas que el template no traía y que la
> clienta pidió: **reserva (tipo de consulta + modalidad + pago)** y **chatbot**.

---

# PARTE 0 — Contexto y decisiones

**Clienta:** Ariana Isaguirre — marca **LegallyCool** (`@legallycool_`). Abogada
independiente, enfocada en **registro de marcas y propiedad intelectual**; también
**derecho mercantil, contratos y sociedades**.

**Identidad visual (leída de su Instagram):** estética pop / editorial tipo collage,
titulares en mayúscula bold y "recortes de revista", referencias de moda y cultura
pop (Barbie, Chanel). Paleta dominante **lavanda/violeta** con **amarillo pastel,
celeste, rosa fucsia y rojo**. Tono cercano y empoderador (voseo argentino):
"Te merecés ser la dueña de tu marca".

**Decisiones tomadas:**
- **Plantilla base:** estructura y animaciones de Drift (hero con video de fondo,
  navbar flotante tipo píldora, sección "about", sección de features con scroll).
- **Estilo:** híbrido — se conserva la estructura/animaciones de Drift y se reemplaza
  la paleta y el contenido por los de LegallyCool, con acentos pop de su marca.
- **Media:** los videos/imágenes de Drift se reemplazan por **placeholders** marcados
  para que ella cargue los suyos (reels, foto profesional).
- **Reserva + pago:** **Cal.com** (gratuito, permite varios tipos de evento y
  ubicación presencial/virtual) + **link de pago de Mercado Pago** en 2 pasos.
  Cuentas a nombre de la abogada.
- **Chatbot:** modelo tipo Soultech (burbuja + ventana + carrusel) con **10 preguntas
  piloto** placeholder para revisar con la clienta.
- **Stack:** React + Vite + **TypeScript** + Tailwind + lucide-react. Sin otras libs de UI.

---

# PARTE 1 — Sistema de marca (colores y fuentes)

Todo el color vive en Tailwind (tokens `lc-*`) y las fuentes en `index.css`. Cambiar
la marca = tocar solo estos dos lugares + `config.ts`.

## Paleta (reemplaza la de Drift)

| Rol en el template Drift | Drift (original) | LegallyCool (nuevo) | Token |
|---|---|---|---|
| Texto/íconos oscuros | `#321C04` | `#3B1D5E` violeta oscuro | `lc-ink` |
| Fondo sección About | `#F6E4CF` | `#EADCF7` lavanda pastel | `lc-lavender-soft` |
| Cream botones | `#FFF9F2` | `#FBF7EC` crema | `lc-cream` |
| Acento apagado (divisor) | `#D9C4AA` | `#C9B3E8` lavanda | `lc-lavender` |
| Hover botón secundario | `#CEBA9E` | `#B79BDD` | `lc-lavender-2` |
| Hover botón oscuro | `#1F1003` | `#2A1145` | `lc-ink-2` |
| Fondo sección Features | imagen fija | `#3B1D5E` violeta + acentos | `lc-ink` |
| Acentos pop (stickers/CTA) | — | rosa `#EE5FA0`, amarillo `#F3ECA6`, celeste `#A7C1EC`, rojo `#E63329`, violeta `#5B2A86` | `lc-pink`, `lc-yellow`, `lc-blue`, `lc-red`, `lc-violet` |

## Fuentes (Google Fonts en `index.css`)
- **Inter** (400, 500, 600) — cuerpo (igual que Drift).
- **Anton** — titulares grandes con impacto pop (reemplaza el rol del display de Drift).
- **Instrument Serif** (italic) — se mantiene el recurso del template: una palabra en
  serif itálica dentro del título del hero.

---

# PARTE 2 — Estructura de secciones (mapa Drift → LegallyCool)

| # | Sección Drift | En LegallyCool | Cambia |
|---|---|---|---|
| Nav | Navbar píldora "Drift." | Navbar píldora "LegallyCool." | texto, colores, links |
| 1 | Hero (video de fondo) | Hero (video/reel placeholder) | copy, colores, CTA → Reservar |
| 2 | About | **Sobre mí** | copy, colores, botones (Escribime / Seguime) |
| 3 | Features (3 cards) | **Áreas / Servicios** (4 cards) | 4 áreas legales, copy, media placeholder |
| **NUEVO** | — | **Reserva** (tipo + modalidad + Cal.com + MP) | sección nueva |
| **NUEVO** | — | **Chatbot** flotante (10 preguntas piloto) | componente nuevo |
| Footer | — | Footer con matrícula | nuevo simple |

---

# PARTE 3 — Plan por fases

### Fase 0 — Setup
- [ ] Vite + React + TS + Tailwind + lucide-react. `npm install`. `npm run dev`.

### Fase 1 — Estructura + marca (esta etapa)
- [ ] `tailwind.config.js` con tokens `lc-*` y keyframe `fade-in-down`.
- [ ] `index.css` con fuentes (Inter, Anton, Instrument Serif) + body.
- [ ] `config.ts` con contenido, 4 tipos de consulta, modalidades y 10 preguntas piloto.
- [ ] Navbar, Hero, SobreMi (About), Áreas (Features) adaptados con copy/colores.
- [ ] **Reserva** (tipo → modalidad → Cal.com → pago MP) — código en PARTE 5.
- [ ] **Chatbot** flotante con 10 preguntas piloto — código en PARTE 5.
- [ ] `npm run build` sin errores.

### Fase 2 — Media real
- [ ] Reemplazar videos/imágenes placeholder por sus reels y foto profesional.

### Fase 3 — Servicios (con la clienta)
- [ ] Cuenta de Cal.com; 4 eventos (uno por área) con ubicación presencial + video.
- [ ] Conectar su Google Calendar.
- [ ] Links de pago de Mercado Pago (por tipo/modalidad). Configurar cuotas si ofrece
      "3 cuotas sin interés" (revisar costo de financiación en MP).
- [ ] Pegar slugs de Cal.com y links de MP en `config.ts`.

### Fase 4 — Revisión del bot
- [ ] Mostrarle las 10 preguntas piloto y corregir textos/criterio legal juntos.

### Fase 5 — Deploy
- [ ] `npm run build` + deploy (EasyPanel u hosting estático).
- [ ] Prueba de punta a punta: elegir área+modalidad → reservar → pagar.

---

# PARTE 4 — Especificación visual por sección (adaptada de Drift)

> Mantené las medidas, animaciones e interacciones del spec original de Drift.
> Acá solo se indican los **cambios de color y contenido**.

## Navbar (píldora flotante centrada)
- Igual estructura que Drift (pill blanca, `absolute top-6 left-1/2 -translate-x-1/2 z-50`,
  hamburguesa animada a X).
- Marca: **"LegallyCool."** (`text-lc-ink`).
- Links del dropdown: **"Servicios", "Áreas", "Preguntas", "Reservar"**.

## Sección 1 — HERO (full viewport)
- Igual estructura: `h-screen`, video de fondo (autoPlay/muted/loop/playsInline,
  object-cover), overlay `bg-black/20`, contenido alineado abajo.
- **Video de fondo:** placeholder → `PLACEHOLDER_VIDEO_HERO` (reemplazar por un reel de ella).
- **Título** (centrado, `font-[Anton] uppercase text-white`):
  - Línea 1: **"Dueña de tu marca"**
  - Línea 2: **"sin *complicarte*"** — "complicarte" en Instrument Serif itálica
    (mismo recurso `<em className="not-italic" style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic'}}>`).
- **Subtítulo** (`text-white/80`, max-w-[420px]): "Asesoría legal en marcas y propiedad
  intelectual para creadoras, marcas y negocios."
- **CTA bar** (`bg-black/25 backdrop-blur-md rounded-xl`):
  - Texto desktop: "Protegé lo que construís. Registrá tu marca."
  - Texto mobile: "Protegé tu marca."
  - Botón: **"Reservar consulta"** (`bg-white text-lc-ink`), hace scroll a `#reserva`.

## Sección 2 — SOBRE MÍ (ex About)
- Igual estructura, `rounded-t-[25px] relative z-10`, fondo **`bg-lc-lavender-soft`**.
- Párrafo top (`text-lc-ink`, centrado): "Hago que el derecho de marcas se entienda.
  Te acompaño a proteger tu nombre, tu contenido y tu negocio, con criterio y sin vueltas."
- Dos botones (pill):
  1. **"Escribime"** — oscuro (`bg-lc-ink text-lc-cream`), círculo blanco con ícono
     **Mail** (lucide), texto uppercase tracking-wide. Acción: `mailto`.
  2. **"Seguime"** — apagado (`bg-lc-lavender text-lc-ink`), círculo blanco con ícono
     **Plus**. Acción: abre su Instagram.
- Divisor decorativo igual (circulito + línea + circulito) en `bg-lc-lavender`.
- Bloque bottom: logo SVG (fill `#3B1D5E`) + label "Legally / Cool" + párrafo grande
  (`text-lc-ink`): "Trabajo con marcas, propiedad intelectual, contratos y sociedades.
  Te ayudo a que lo que creás sea tuyo, esté protegido y ordenado para crecer."

## Sección 3 — ÁREAS / SERVICIOS (ex Features)
- Igual estructura: grid con **columna izquierda sticky** + **cards a la derecha** con
  IntersectionObserver (active threshold 0.6, reveal 0.15 slide-in desde la derecha).
- Fondo: **`bg-lc-ink`** (violeta oscuro) en vez de la imagen fija (o dejar
  `PLACEHOLDER_IMG_FEATURES` si quiere una imagen de marca).
- Heading izquierdo (`text-white font-[Anton]`): "Derecho claro que se mueve con tu
  negocio, no encima de él."
- Botones de navegación = las **4 áreas** (activo `bg-black/20 text-white`, inactivo
  `text-white/40`).
- CTA inferior: "Reservá tu consulta." + botón "Reservar" → scroll `#reserva`.
- **4 cards** (una por área), cada una: logo SVG (fill `rgba(255,255,255,.8)`), título,
  media placeholder (`aspect-video`, `PLACEHOLDER_VIDEO_AREA_x`), descripción.
  Los textos salen de `config.consultas` (ver PARTE 5).

## SVG logo (About + cards) — igual que Drift
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256" fill="none">
  <path d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z" fill="currentColor" />
</svg>
```
> Nota: cambié el `fill` a `currentColor` para poder recolorearlo por CSS (violeta en
> About, blanco translúcido en las cards).

---

# PARTE 5 — Código (config, tema y componentes nuevos)

Estructura:
```
src/
  main.tsx
  index.css                 ← fuentes + Tailwind + body
  App.tsx                   ← Hero + Navbar + SobreMi + Areas + Reserva + Footer + Chatbot
  config.ts                 ← TODO el contenido editable
  components/
    Navbar.tsx  Hero.tsx  SobreMi.tsx  Areas.tsx
    Reserva.tsx             ← (nuevo) tipo + modalidad + Cal.com + pago MP
    Footer.tsx
  chat/
    chatFlow.ts             ← (nuevo) flujo + 10 preguntas piloto
    Chatbot.tsx             ← (nuevo) burbuja + ventana + carrusel
tailwind.config.js
```

## `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lc-cream": "#FBF7EC",
        "lc-ink": "#3B1D5E",
        "lc-ink-2": "#2A1145",
        "lc-violet": "#5B2A86",
        "lc-lavender": "#C9B3E8",
        "lc-lavender-2": "#B79BDD",
        "lc-lavender-soft": "#EADCF7",
        "lc-yellow": "#F3ECA6",
        "lc-blue": "#A7C1EC",
        "lc-pink": "#EE5FA0",
        "lc-red": "#E63329",
      },
      keyframes: {
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-in-down": "fade-in-down 0.2s ease-out" },
    },
  },
  plugins: [],
};
```

## `src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@1&family=Inter:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}
```

## `src/config.ts`
```ts
export type Modalidad = "presencial" | "virtual";

export interface Consulta {
  id: string;
  titulo: string;
  resumen: string;
  precio: string;
  calcomEvent: string;
  mediaPlaceholder: string; // reemplazar por video/imagen real
  mp: Record<Modalidad, string>;
}

export interface Faq {
  id: string;
  pregunta: string;
  respuesta: string;
}

export const config = {
  marca: {
    nombre: "LegallyCool",
    nombreReal: "Ariana Isaguirre",
    matricula: "Matrícula [Colegio] Tº XX Fº XX",
    instagram: "https://www.instagram.com/legallycool_/",
  },
  contacto: {
    email: "hola@legallycool.com",
    whatsapp: "5491100000000", // internacional sin +
  },
  calcom: { usuario: "legallycool" },

  // Media placeholder (reemplazar en Fase 2)
  media: {
    heroVideo: "PLACEHOLDER_VIDEO_HERO",
    featuresBg: "PLACEHOLDER_IMG_FEATURES",
  },

  modalidades: [
    { id: "presencial" as Modalidad, label: "Presencial" },
    { id: "virtual" as Modalidad, label: "Virtual (videollamada)" },
  ],

  consultas: <Consulta[]>[
    {
      id: "pi",
      titulo: "Propiedad Intelectual",
      resumen: "Registro de marcas, derechos de autor y protección de tu contenido.",
      precio: "$[monto]",
      calcomEvent: "propiedad-intelectual",
      mediaPlaceholder: "PLACEHOLDER_VIDEO_AREA_PI",
      mp: { presencial: "https://mpago.la/PI-PRES", virtual: "https://mpago.la/PI-VIRT" },
    },
    {
      id: "mercantil",
      titulo: "Derecho Mercantil",
      resumen: "Asesoría comercial y cumplimiento para tu negocio.",
      precio: "$[monto]",
      calcomEvent: "derecho-mercantil",
      mediaPlaceholder: "PLACEHOLDER_VIDEO_AREA_MERC",
      mp: { presencial: "https://mpago.la/MERC-PRES", virtual: "https://mpago.la/MERC-VIRT" },
    },
    {
      id: "contratos",
      titulo: "Contratos",
      resumen: "Redacción y revisión de contratos a medida de tu actividad.",
      precio: "$[monto]",
      calcomEvent: "contratos",
      mediaPlaceholder: "PLACEHOLDER_VIDEO_AREA_CONTR",
      mp: { presencial: "https://mpago.la/CONTR-PRES", virtual: "https://mpago.la/CONTR-VIRT" },
    },
    {
      id: "sociedades",
      titulo: "Sociedades",
      resumen: "Constitución de sociedades (SAS y otras), socios y estatutos.",
      precio: "$[monto]",
      calcomEvent: "sociedades",
      mediaPlaceholder: "PLACEHOLDER_VIDEO_AREA_SOC",
      mp: { presencial: "https://mpago.la/SOC-PRES", virtual: "https://mpago.la/SOC-VIRT" },
    },
  ],

  // 10 PREGUNTAS PILOTO (placeholder, revisar con la clienta). Basadas en su contenido de IG.
  faqPiloto: <Faq[]>[
    { id: "q1", pregunta: "¿Cómo registro mi marca?", respuesta: "[PILOTO] Se hace un estudio de antecedentes y después la solicitud de registro. En la consulta lo vemos según tu caso." },
    { id: "q2", pregunta: "¿Puedo registrar mi marca yo sola o necesito abogada?", respuesta: "[PILOTO] Podés iniciarlo sola, pero un error en la clase o el estudio previo puede costarte la marca. Por eso conviene hacerlo asesorada." },
    { id: "q3", pregunta: "¿Qué pasa si alguien ya usa un nombre parecido al mío?", respuesta: "[PILOTO] Hay que analizar si hay riesgo de confusión. Lo revisamos con un estudio de antecedentes antes de presentar." },
    { id: "q4", pregunta: "¿Registrar la marca sale caro? ¿Hay cuotas?", respuesta: "[PILOTO] Se puede abonar en cuotas. En la consulta te paso el detalle de costos y opciones de pago." },
    { id: "q5", pregunta: "¿Una imagen o logo vale más que el nombre? ¿Qué conviene registrar?", respuesta: "[PILOTO] Depende de tu marca: a veces conviene el nombre, a veces el logo, a veces ambos. Lo definimos juntas." },
    { id: "q6", pregunta: "¿Puede desaparecer mi marca si no la registro?", respuesta: "[PILOTO] Sin registro, otro podría registrarla y usarla. Registrarla es la forma de que sea realmente tuya." },
    { id: "q7", pregunta: "¿Qué diferencia hay entre marca, patente y derecho de autor?", respuesta: "[PILOTO] La marca protege tu nombre/logo, la patente una invención y el derecho de autor tus obras. Te digo cuál te sirve." },
    { id: "q8", pregunta: "¿Qué contratos necesito para mi emprendimiento?", respuesta: "[PILOTO] Depende de tu actividad: con clientes, socios o proveedores. Armamos los que te protegen de verdad." },
    { id: "q9", pregunta: "¿Qué tipo de sociedad me conviene (SAS, etc.)?", respuesta: "[PILOTO] Según socios, responsabilidad y objetivo. La SAS suele ser ágil para emprender. Lo vemos en la consulta." },
    { id: "q10", pregunta: "¿Cómo es y cuánto sale una consulta?", respuesta: "[PILOTO] Elegís el área y la modalidad (presencial o virtual), reservás y abonás para confirmar el turno." },
  ],
};

export default config;
```

## `src/components/Reserva.tsx` (NUEVO — funcionalidad principal)
```tsx
import { useState } from "react";
import config, { Modalidad } from "../config";

// Reserva en 3 pasos: 1) área  2) modalidad  3) agendar (Cal.com) + pagar (MP).
export default function Reserva() {
  const { consultas, modalidades, calcom } = config;
  const [tipoId, setTipoId] = useState<string | null>(null);
  const [modalidad, setModalidad] = useState<Modalidad | null>(null);

  const tipo = consultas.find((c) => c.id === tipoId);
  const linkPago = tipo && modalidad ? tipo.mp[modalidad] : null;
  const calcomUrl = tipo ? `https://cal.com/${calcom.usuario}/${tipo.calcomEvent}` : null;

  const chip = (activo: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition ${
      activo ? "bg-lc-violet text-white" : "bg-lc-lavender-soft text-lc-ink hover:bg-lc-lavender"
    }`;

  return (
    <section id="reserva" className="bg-lc-cream px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-[Anton] uppercase text-lc-ink text-4xl md:text-6xl mb-8">
          Reservá tu consulta
        </h2>

        {/* Paso 1: área */}
        <h3 className="text-lc-ink font-semibold mb-3">1. ¿Qué necesitás?</h3>
        <div className="flex flex-wrap gap-2 mb-8">
          {consultas.map((c) => (
            <button key={c.id} className={chip(c.id === tipoId)} onClick={() => setTipoId(c.id)}>
              {c.titulo}
            </button>
          ))}
        </div>

        {/* Paso 2: modalidad */}
        {tipo && (
          <>
            <h3 className="text-lc-ink font-semibold mb-3">2. ¿Cómo querés atenderte?</h3>
            <div className="flex gap-2 mb-8">
              {modalidades.map((m) => (
                <button key={m.id} className={chip(m.id === modalidad)} onClick={() => setModalidad(m.id)}>
                  {m.label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Paso 3: agendar + pagar */}
        {tipo && modalidad && (
          <>
            <h3 className="text-lc-ink font-semibold mb-3">3. Elegí día y horario</h3>
            <p className="text-lc-ink/70 mb-4">
              {tipo.titulo} — {modalidades.find((m) => m.id === modalidad)!.label} — {tipo.precio}
            </p>
            <iframe
              title={`Reservar ${tipo.titulo}`}
              src={calcomUrl!}
              className="w-full h-[700px] rounded-2xl border-0 mb-6"
            />
            <div className="bg-lc-lavender-soft rounded-2xl p-6">
              <h4 className="text-lc-ink font-semibold mb-3">Pagá la reserva para confirmar el turno</h4>
              <a
                href={linkPago!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-lc-pink text-white font-medium px-6 py-3 rounded-full hover:opacity-90"
              >
                Pagar con Mercado Pago
              </a>
              <p className="text-lc-ink/60 text-sm mt-3">
                El cobro va directo a la cuenta de la abogada. También recibís el link por mail.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
```

## `src/chat/chatFlow.ts` (NUEVO)
```ts
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
      carousel: faqPiloto.map((f) => ({ id: f.id, titulo: f.pregunta, resumen: "Ver respuesta", next: `faq_${f.id}` })),
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
```

## `src/chat/Chatbot.tsx` (NUEVO — modelo Soultech, con Tailwind)
```tsx
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
  const openChat = () => { setOpen(true); if (messages.length === 0) goTo(START_NODE); };
  const runAction = (a?: string) => {
    if (a === "scrollReserva") document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" });
    if (a === "whatsapp") window.open(`https://wa.me/${config.contacto.whatsapp}`, "_blank");
  };

  if (!open) {
    return (
      <button
        onClick={openChat}
        aria-label="Abrir chat"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-lc-violet text-white px-5 py-3 rounded-full shadow-lg hover:opacity-90"
      >
        <MessageCircle size={18} /> Chatear
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Asistente de LegallyCool"
      className="fixed bottom-5 right-5 z-50 w-80 max-h-[70vh] overflow-auto bg-white rounded-2xl shadow-xl p-4"
    >
      <div className="flex justify-between items-center mb-2">
        <strong className="text-lc-ink">Asistente</strong>
        <button onClick={() => setOpen(false)} aria-label="Cerrar"><X size={18} /></button>
      </div>

      <div className="space-y-2 mb-3">
        {messages.map((m, i) => (
          <p key={i} className={`text-sm ${m.from === "bot" ? "text-lc-ink" : "text-lc-violet"}`}>
            <strong>{m.from === "bot" ? "Asistente" : "Vos"}:</strong> {m.text}
          </p>
        ))}
      </div>

      {node?.carousel && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {node.carousel.map((c) => (
            <button
              key={c.id}
              onClick={() => { setMessages((p) => [...p, { from: "user", text: c.titulo }]); goTo(c.next); }}
              className="min-w-[180px] text-left bg-lc-lavender-soft rounded-xl p-3 hover:bg-lc-lavender"
            >
              <strong className="block text-sm text-lc-ink">{c.titulo}</strong>
              <span className="text-xs text-lc-ink/60">{c.resumen}</span>
            </button>
          ))}
        </div>
      )}

      {node?.options && (
        <div className="flex flex-wrap gap-2">
          {node.options.map((o, i) => (
            <button
              key={i}
              onClick={() => { setMessages((p) => [...p, { from: "user", text: o.label }]); runAction(o.action); if (o.next) goTo(o.next); }}
              className="bg-lc-lavender text-lc-ink text-sm px-3 py-1.5 rounded-full hover:bg-lc-lavender-2"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

## `src/App.tsx` (orden de secciones)
```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SobreMi from "./components/SobreMi";
import Areas from "./components/Areas";
import Reserva from "./components/Reserva";
import Footer from "./components/Footer";
import Chatbot from "./chat/Chatbot";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SobreMi />
      <Areas />
      <Reserva />
      <Footer />
      <Chatbot />
    </>
  );
}
```

> **Navbar.tsx, Hero.tsx, SobreMi.tsx, Areas.tsx:** construilos siguiendo el spec de la
> PARTE 4 (misma estructura/animaciones que el template Drift) con los colores `lc-*` y
> el contenido de `config.ts`. `Footer.tsx` es simple: nombre, `config.marca.matricula`
> y © año.

---

# PARTE 6 — Las 10 preguntas piloto (para revisar con la clienta)

Están en `config.faqPiloto`, todas marcadas `[PILOTO]`:

1. ¿Cómo registro mi marca?
2. ¿Puedo registrar mi marca yo sola o necesito abogada?
3. ¿Qué pasa si alguien ya usa un nombre parecido al mío?
4. ¿Registrar la marca sale caro? ¿Hay cuotas?
5. ¿Una imagen o logo vale más que el nombre? ¿Qué conviene registrar?
6. ¿Puede desaparecer mi marca si no la registro?
7. ¿Qué diferencia hay entre marca, patente y derecho de autor?
8. ¿Qué contratos necesito para mi emprendimiento?
9. ¿Qué tipo de sociedad me conviene (SAS, etc.)?
10. ¿Cómo es y cuánto sale una consulta?

> ⚠️ Respuestas borrador para prueba piloto. **No son asesoramiento legal**: validar
> con la abogada antes de publicar.

---

# PARTE 7 — Instrucciones para Claude Code

1. Iniciá Vite + React + **TypeScript** + Tailwind + lucide-react. Sin otras libs de UI.
2. Creá `tailwind.config.js`, `index.css`, `config.ts` y los componentes de la PARTE 5
   tal cual. Construí Navbar/Hero/SobreMi/Areas con el spec de la PARTE 4.
3. `npm run build` debe compilar sin errores de tipos.
4. **Colores solo por tokens `lc-*`; contenido solo desde `config.ts`.** Nada hardcodeado.
5. Media = placeholders (`PLACEHOLDER_*`): no uses los videos de Drift; dejá los huecos
   marcados para reemplazar en Fase 2.
6. Reserva: orden área → modalidad → Cal.com (iframe) → pago MP. No integres pago nativo
   de Cal.com (Stripe).
7. El bot es guiado, sin IA. Mantené la marca `[PILOTO]` en las respuestas hasta que la
   clienta las corrija.
8. Respetá las animaciones del template Drift (fade-in-down, hamburguesa→X, reveal de
   cards con IntersectionObserver, columna izquierda sticky).
