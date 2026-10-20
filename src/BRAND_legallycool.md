BRAND.md — Sistema de marca oficial Legally Cool

Fuente: manual de marca "Legally Cool — Agosto 2026" (rebranding por Milagros Carrizo). Este archivo es la fuente de verdad de la identidad visual y reemplaza cualquier hipótesis de marca anterior (nada de Anton / estilo pop / paleta lavanda-amarillo). Regla del proyecto: colores solo por tokens, contenido en config.ts, estructura y funcionalidad no se tocan (ver prompt al final).

1. Concepto

Legally Cool es una marca jurídica para quienes crean: DERECHO × CREATIVIDAD × MARKETING × CULTURA. Habla de marcas, derechos de autor, diseño, moda, contratos, creatividad y emprendimientos, sin parecer un estudio jurídico tradicional. Estética editorial, pastel y sofisticada; tono cercano en "Plain Language" (claro y directo). Tagline (modificable por campaña): "Mi creatividad merece protección".

2. Paleta cromática (hex oficiales)
Color	Hex	Rol principal
Blanco Roto	
#F5EFE6	Fondo principal (feed, web, tarjetas)
Violeta Pastel	
#C4A9DA	Color pilar: fondos, titulares, portadas, destacados
Azul Real Eléctrico	
#2F4EAB	Institucional/legal: servicios, PI, contratos, botones web, títulos legales
Rosa Suave Cálido	
#EC8295	Cercanía: casos, entrevistas, historias, moda, campañas
Verde Salvia	
#A7B89A	Equilibrio: educación, FAQ, consejos, artículos
Naranja Rojizo Pastel	
#F2805A	Acento / CTA: botones principales, fechas, palabras clave, íconos
Gris Cálido	
#E9E5DF	Neutro técnico: formularios, tablas, fondos secundarios
Carbón	
#333333	Texto (cuerpo, títulos pequeños). Nunca negro puro #000000

Reglas de uso críticas del manual:

El naranja rojizo es el acento y va en los CTA (reservar, pagar). Es el color de acción.
El azul no debe ocupar >50% de una pieza (si domina, vuelve a sentirse "estudio corporativo").
El violeta funciona con aire alrededor (espacios en blanco).
Combinación modelo: Blanco Roto + Violeta Pastel + Naranja Rojizo.
Texto en Carbón, no negro puro.
3. Tipografías
Cormorant Garamond (serif editorial) → títulos, frases, conceptos, campañas, titulares.
DM Sans (sans legible) → información, fechas, servicios, textos, CTA, botones.
Ambas son gratuitas (Google Fonts), sin licencias.

Cambio respecto de la versión pop: se elimina Anton e Instrument Serif. Los títulos pasan a Cormorant Garamond (elegante, editorial), no mayúscula-bold-impacto.

4. Recursos gráficos (usar con moderación)
Círculos y arcos (círculo incompleto): protección, comunidad, procesos. Evitan rigidez.
Bloques geométricos (rectángulos, líneas, módulos): orden, estructura, lo jurídico.
Destellos / estrellas: idea creativa. Uso puntual, no excesivo.
Iconografía contemporánea: lápiz (origen creativo), candado (protección), © (derechos), ® (marca registrada), documento/hoja (derecho de forma moderna), etiquetas (clasificar), bombita (idea, con moderación).
Texturas: papel/reciclado/textil, grain/fotografía analógica (estilo kinfolk still life), pintura/pigmento. Ayudan a que los pasteles se vean profesionales y no "digitales".
Fotografía: cálida, natural, editorial; muestra el mundo de quienes Legally Cool protege.
5. Tokens para el proyecto (Tailwind)

Reemplazar el bloque colors de tailwind.config.js por estos tokens en español (coinciden con el manual):

js
colors: {
  "lc-blanco":  "#F5EFE6",
  "lc-violeta": "#C4A9DA",
  "lc-azul":    "#2F4EAB",
  "lc-rosa":    "#EC8295",
  "lc-verde":   "#A7B89A",
  "lc-naranja": "#F2805A",
  "lc-gris":    "#E9E5DF",
  "lc-carbon":  "#333333",
},
Fuentes — src/index.css
css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;700&display=swap');

body{ font-family:'DM Sans',system-ui,sans-serif; color:#333333; -webkit-font-smoothing:antialiased; }
h1,h2,h3{ font-family:'Cormorant Garamond',Georgia,serif; }
Mapeo de tokens viejos → nuevos (para find-and-replace)
Token viejo (pop)	Token nuevo (oficial)
lc-cream	lc-blanco
lc-ink (texto)	lc-carbon
lc-ink (fondo sección Áreas)	lc-azul (bloque institucional, texto blanco)
lc-violet (botón primario)	lc-naranja (CTA)
lc-lavender / lc-lavender-soft	lc-violeta
lc-pink (botón pago)	lc-naranja (es CTA)
lc-yellow	lc-verde
lc-blue	lc-azul
lc-red	lc-naranja
Guía de color por sección/rol
Fondo general: lc-blanco. Fondos alternados: lc-violeta (con aire), lc-gris (forms).
Titulares (Cormorant): lc-carbon o lc-violeta.
CTA principales (Reservar, Pagar): lc-naranja.
Botones/enlaces legales, PI, contratos: lc-azul (sin exceder ~50% de la pieza).
Sección Áreas (bloque fuerte): fondo lc-azul, texto lc-blanco.
Chatbot / FAQ / educación: acentos lc-verde.
Casos, testimonios, historias: acentos lc-rosa.
Cuerpo de texto: lc-carbon.
6. PROMPT PARA CLAUDE CODE (re-skin manteniendo estructura)

Copiá y pegá esto en Claude Code (con BRAND_legallycool.md en el repo):

Tenés en el repo BRAND_legallycool.md: es el sistema de marca oficial de Legally Cool.
Aplicá ESA identidad a la landing existente SIN cambiar la estructura, las secciones, ni
la funcionalidad. Es un re-skin de marca, no un rediseño.

NO cambies:
- El orden ni la división de secciones (Navbar, Hero, Sobre mí, Áreas, Reserva, Footer, Chatbot).
- La lógica de reserva (área → modalidad → Cal.com → Mercado Pago) ni el flujo del chatbot.
- La estructura de config.ts ni las animaciones/interacciones del template.

SÍ cambiá:
1) tailwind.config.js: reemplazá el bloque colors por los tokens de la sección 5 de
   BRAND_legallycool.md (lc-blanco, lc-violeta, lc-azul, lc-rosa, lc-verde, lc-naranja,
   lc-gris, lc-carbon).
2) src/index.css: importá Cormorant Garamond (títulos) y DM Sans (cuerpo) como en la
   sección 5; body en DM Sans y color lc-carbon; h1/h2/h3 en Cormorant Garamond.
   Eliminá Anton e Instrument Serif.
3) Reemplazá en todos los componentes los tokens viejos por los nuevos según la tabla de
   mapeo de la sección 5, y aplicá la "Guía de color por sección/rol":
   - CTA principales (Reservar, Pagar) en lc-naranja.
   - Botones/contenido legal, PI, contratos en lc-azul (sin superar ~50% de la pieza).
   - Sección Áreas como bloque lc-azul con texto lc-blanco.
   - Acentos de FAQ/chatbot en lc-verde; casos/testimonios en lc-rosa.
   - Texto en lc-carbon (nunca negro puro).
4) Titulares: pasá de mayúscula-bold-pop (Anton) a Cormorant Garamond editorial. Quitá el
   componente Sticker pop / etiquetas rotadas; si querés acentos, usá los recursos gráficos
   del manual con moderación (arcos/círculo incompleto, destellos puntuales, íconos ®/©/candado/documento).
5) Actualizá el favicon y el logo si hace falta para respetar la nueva paleta (violeta/azul/naranja).

Mantené: contenido solo desde config.ts, colores solo por tokens, PLACEHOLDER_* de datos
reales, y que npm run build compile sin errores. Al terminar, dame un resumen de los
archivos tocados.