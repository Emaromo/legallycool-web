/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Registradas como familias reales (no valores arbitrarios font-[...]) para
        // evitar la ambigüedad de Tailwind entre font-family y font-weight en
        // arbitrary values, que rompía "Cormorant_Garamond"/"DM_Sans" silenciosamente.
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        // Paleta oficial — ver BRAND_legallycool.md (sección 2 y 5)
        "lc-blanco": "#F5EFE6", // fondo principal (feed, web, tarjetas)
        "lc-violeta": "#C4A9DA", // color pilar: fondos, titulares, portadas, destacados
        "lc-azul": "#2F4EAB", // institucional/legal: servicios, PI, contratos, botones web
        "lc-rosa": "#EC8295", // cercanía: casos, entrevistas, historias, moda, campañas
        "lc-verde": "#A7B89A", // equilibrio: educación, FAQ, consejos, artículos
        "lc-naranja": "#F2805A", // acento / CTA: botones principales, fechas, palabras clave, íconos
        "lc-gris": "#E9E5DF", // neutro técnico: formularios, tablas, fondos secundarios
        "lc-carbon": "#333333", // texto — nunca negro puro
        // Variante cálida de lc-carbon, solo para textos sobre el degradé rosa→naranja de
        // Áreas: el carbón neutro se ve frío sobre ese fondo. Mismo rol, mismo contraste.
        "lc-carbon-calido": "#33232B",
        // Fuera de la paleta oficial a propósito: color puntual de un solo efecto
        // (partículas de clic en toda la landing), no un color de marca — ver
        // src/utils/particles.ts y BRAND_legallycool.md.
        "neon-fucsia": "#FF2E9A",
        // Colores oficiales de cada red. No son colores de LegallyCool: existen solo para
        // que el logo de Instagram y el de WhatsApp se reconozcan dentro de su círculo en
        // los botones de contacto de "Sobre mí".
        "social-instagram": "#E1306C",
        "social-whatsapp": "#25D366",
      },
      keyframes: {
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-in-down": "fade-in-down 0.2s ease-out" },
      backgroundImage: {
        // Fondo de la sección Áreas: rosa → naranja (los dos colores del logo), en diagonal.
        // Versión suavizada: arranca en un rosa menos saturado, mantiene lc-rosa (#EC8295) y
        // deja lc-naranja (#F2805A) recién para el final, así el fondo no compite con las
        // piezas gráficas de las tarjetas. #E8A5B8 y #E9896F son pasos de transición fuera
        // de la paleta del manual: existen solo para que el degradé no corte de golpe.
        "areas-calido":
          "linear-gradient(160deg, #E8A5B8 0%, #EC8295 35%, #E9896F 70%, #F2805A 100%)",
        // Vidrio de las tarjetas del carrusel de Áreas: carbón cálido (lc-carbon-calido) que
        // se abre hacia un velo de lc-rosa. Deliberadamente MUY transparente, para que se lea
        // como vidrio y se vea el degradé de la sección por detrás (decisión de diseño).
        // NOTA DE CONTRASTE: con estos valores el texto claro no llega al 4.5:1 de WCAG AA
        // sobre la mitad inferior de la tarjeta — se compensa con la sombra de texto
        // .texto-sobre-vidrio (src/index.css), que ayuda a la lectura pero no al ratio.
        // Si en algún momento se prioriza el contraste, la versión que sí cumplía era
        // rgba(51,35,43,.80) 0% → rgba(120,48,66,.80) 100%.
        "vidrio-areas":
          "linear-gradient(160deg, rgba(51, 35, 43, 0.32) 0%, rgba(236, 130, 149, 0.16) 100%)",
      },
      boxShadow: {
        // Glow sutil para CTAs — tono naranja, apenas perceptible (estética editorial, no "tech")
        "glow-naranja": "0 10px 28px -10px rgba(242, 128, 90, 0.5)",
        "glow-naranja-sm": "0 4px 14px -6px rgba(242, 128, 90, 0.4)",
        // Azul institucional (sección Reserva): hover de los chips y sombra de la tarjeta
        // "Cómo funciona". Mismo tono que lc-azul (#2F4EAB), como acento — no como fondo dominante.
        "glow-azul-sm": "0 4px 14px -6px rgba(47, 78, 171, 0.45)",
        // Tarjeta del carrusel de Áreas: sombra leve y pareja en todo el contorno (apenas
        // 8px de desplazamiento contra 32px de difuminado), solo para dar profundidad sin
        // que se lea como sombra. Sigue el border-radius de la tarjeta, como toda box-shadow.
        "card-areas": "0 8px 32px rgba(0, 0, 0, 0.14)",
        // CTA "Reservar" de Áreas: reemplaza al panel carbón que antes lo enmarcaba. Sobre
        // el degradé cálido, el naranja se apoyaba en el fondo sin despegarse; esta sombra
        // (tinte carbón cálido, nunca negro puro) le da el volumen sin recuadro. La variante
        // -hover es la misma, apenas más marcada — ver Areas.tsx.
        "cta-areas": "0 10px 24px rgba(51, 35, 43, 0.28)",
        "cta-areas-hover": "0 14px 30px rgba(51, 35, 43, 0.34)",
        "card-azul": "0 18px 42px -18px rgba(47, 78, 171, 0.55)",
        // Contorno negro fino + sombra ajustada (no difusa) de la tarjeta activa del
        // carrusel de Áreas — es la única que lleva sombra (decisión de diseño puntual,
        // negro real a propósito, no el tinte violeta que usan card-soft en Reserva) —
        // ver Areas.tsx.
        "card-active": "0 0 0 1.5px rgba(0, 0, 0, 0.22), 0 12px 28px rgba(0, 0, 0, 0.30)",
        // Profundidad suave para el calendario y la tarjeta de pago de Reserva.
        "card-soft": "0 26px 55px rgba(59, 29, 94, 0.20), 0 8px 18px rgba(59, 29, 94, 0.12)",
        // Glow fuerte de las partículas de clic (toda la landing) — ver src/utils/particles.ts.
        "glow-fucsia": "0 0 16px rgba(255, 46, 154, 0.95), 0 0 6px rgba(255, 255, 255, 0.9)",
        // Recuadro de media de las tarjetas de Áreas: un halo fucsia suave (queda el efecto
        // neón, pero ya no compite con las piezas gráficas) + profundidad en carbón cálido,
        // como el resto de las sombras de la sección. Reemplaza al viejo "media-neon", que
        // era el doble de fuerte y con negro puro — ver Areas.tsx.
        "media-suave": "0 0 10px rgba(255, 46, 154, 0.35), 0 14px 30px rgba(51, 35, 43, 0.28)",
      },
      dropShadow: {
        // Glow "neón" para los íconos del carrusel de Áreas (decisión de diseño puntual,
        // se aparta del manual pastel/sobrio — ver nota en Areas.tsx).
        "neon-naranja": "0 0 6px rgba(242, 128, 90, 0.6)",
      },
    },
  },
  plugins: [],
};
