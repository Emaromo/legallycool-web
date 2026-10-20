CLAUDE.md — Contexto del proyecto (LegallyCool landing)

Archivo guía para Claude Code. Consultalo ante cualquier duda: define qué es el proyecto, cómo está armado y qué reglas seguir. La especificación detallada y todo el código de referencia están en CLAUDE_CODE_landing_legallycool_v2.md.

1. Qué es

Landing page de LegallyCool (Ariana Isaguirre), abogada independiente enfocada en registro de marcas y propiedad intelectual (también mercantil, contratos y sociedades). Objetivo: que un visitante conozca sus servicios, reserve una consulta eligiendo tipo y modalidad, la pague y pueda resolver dudas con un chatbot.

Single page. Sin base de datos ni backend propio: la reserva la maneja Cal.com y el cobro Mercado Pago (ambos embebidos/linkeados).

2. Stack (no cambiar sin pedir)

React + Vite + TypeScript + Tailwind CSS + lucide-react para íconos. Ninguna otra librería de UI.

3. Estructura de archivos
src/
  main.tsx
  index.css                 fuentes (Cormorant Garamond, DM Sans) + Tailwind + body
  App.tsx                   Navbar > Hero > SobreMi > Areas > Reserva > Footer > Chatbot
  config.ts                 ÚNICA fuente de contenido editable
  BRAND_legallycool.md      sistema de marca oficial — fuente de verdad del punto 5
  components/  Navbar.tsx  Hero.tsx  SobreMi.tsx  Areas.tsx  Reserva.tsx  Footer.tsx
  components/brand/  Logo.tsx  Arco.tsx  Destello.tsx  BloqueGeometrico.tsx
                      IconoCandado.tsx  IconoDocumento.tsx  IconoEtiqueta.tsx
                      IconoMarcaRegistrada.tsx  IconoCopyright.tsx
  chat/        chatFlow.ts  Chatbot.tsx
public/brand/                logo/ iconos/ formas/ texturas/ fotos/ — destino de los
                              assets reales de la diseñadora (ver README ahí dentro)
tailwind.config.js          tokens lc-* + keyframe fade-in-down
4. Base de diseño

Estructura heredada de la plantilla "Drift" (hero con video de fondo, navbar flotante
tipo píldora con hamburguesa→X, sección "about", sección de features con scroll +
IntersectionObserver + columna izquierda sticky). Esa estructura y esas animaciones NO
se tocan; lo que cambió es el sistema visual (colores, tipografía, iconografía), ahora
regido por la identidad oficial de marca.

5. Marca
Nombre: Legally Cool · Persona: Ariana Isaguirre (confirmar). Concepto: DERECHO ×
CREATIVIDAD × MARKETING × CULTURA — marca jurídica para quienes crean, sin parecer un
estudio jurídico tradicional.
Estilo (vigente — manual oficial "Legally Cool, Agosto 2026", ver
src/BRAND_legallycool.md, fuente de verdad): editorial, pastel, sofisticado, tono
cercano en "Plain Language". Reemplaza cualquier hipótesis de marca anterior (nada de
Anton / estilo pop / paleta lavanda-amarillo-violeta vieja).
Fuentes: Cormorant Garamond (serif editorial — títulos, h1/h2/h3) · DM Sans (cuerpo,
botones, CTA, información).
Paleta → tokens Tailwind (usar SIEMPRE los tokens, nunca hex sueltos)
Token	Hex	Uso
lc-blanco	
#F5EFE6	fondo principal (feed, web, tarjetas)
lc-violeta	
#C4A9DA	color pilar: fondos, titulares, portadas, destacados (funciona con aire alrededor)
lc-azul	
#2F4EAB	institucional/legal: sección Áreas (fondo, texto blanco), PI, contratos — no debe superar ~50% de una pieza
lc-rosa	
#EC8295	cercanía: casos, historias, redes/Instagram, campañas
lc-verde	
#A7B89A	equilibrio: chatbot, FAQ, educación
lc-naranja	
#F2805A	acento / CTA: botones de acción (Reservar, Pagar), palabras clave, íconos
lc-gris	
#E9E5DF	neutro técnico: formularios (sección Reserva), tablas, fondos secundarios
lc-carbon	
#333333	texto — nunca negro puro
Reglas de uso críticas: naranja = color de acción (va en los CTA reservar/pagar); azul
nunca >50% de una pieza; violeta funciona mejor como fondo o en textos grandes sobre
fondos oscuros (como texto sobre lc-blanco tiene contraste insuficiente — ver nota de
accesibilidad más abajo); texto siempre en carbón, nunca negro puro.
Nota de accesibilidad (decisión de implementación, no en el manual original): lc-violeta
como texto sobre lc-blanco no llega a 3:1 de contraste. Se usa como texto solo sobre
fondos oscuros (ej. la palabra de acento del Hero, sobre el video) o como fondo (con
texto carbón encima); para titulares sobre fondo claro se usa lc-carbon.
Recursos gráficos (con moderación): formas (Arco.tsx, Destello.tsx,
BloqueGeometrico.tsx) e íconos (IconoCandado, IconoDocumento, IconoEtiqueta,
IconoMarcaRegistrada, IconoCopyright) en src/components/brand/. Logo tipográfico
temporal en Logo.tsx — lee config.marca.logo; en cuanto ese campo deje de ser
PLACEHOLDER_LOGO_SVG, se reemplaza solo por el archivo real sin tocar Navbar/Footer.
6. Reserva + pago (flujo clave)

Orden fijo en la sección #reserva: 1) elegir área → 2) elegir modalidad (presencial/virtual) → 3) agendar en Cal.com (iframe) → 4) pagar con link de Mercado Pago. Cada área es un evento de Cal.com y tiene dos links de MP (presencial/virtual). Todo eso vive en config.ts (consultas).

Las 4 áreas: Propiedad Intelectual, Derecho Mercantil, Contratos, Sociedades.

No integrar el pago nativo de Cal.com (Stripe): en Argentina se cobra con Mercado Pago en 2 pasos. Cuentas de Cal.com y MP a nombre de la abogada.

7. Chatbot

Widget flotante (burbuja + ventana + carrusel), modelo tipo Soultech. Flujo guiado por opciones/botones, sin IA generativa. Incluye 10 preguntas piloto (config.faqPiloto), todas marcadas [PILOTO]: son borrador para revisar con la clienta. No son asesoramiento legal; no quitar la marca [PILOTO] hasta que ella las valide.

8. Reglas (leer antes de editar)
Contenido solo en config.ts. Ningún componente lleva textos, URLs, montos ni datos hardcodeados.
Colores solo con tokens lc-*. Nada de hex sueltos en los componentes.
Media = placeholders. Usar los PLACEHOLDER_* de config.ts; no usar los videos/imágenes de Drift. Se reemplazan con material real en Fase 2.
Respetar las animaciones del template (fade-in-down, hamburguesa→X, reveal de cards con IntersectionObserver, columna izquierda sticky).
TypeScript estricto: npm run build debe compilar sin errores de tipos.
No agregar dependencias de UI ni de estado. Solo React + Tailwind + lucide-react.
Ante datos que faltan (nombre real, matrícula, montos, slugs de Cal.com, links de MP): dejar el placeholder existente y no inventar valores reales.
9. Estado / pendientes
Fase actual: re-skin de marca oficial aplicado (estructura y funcionalidad sin cambios).
Placeholders a completar cuando lleguen los assets/datos reales: PLACEHOLDER_* de
media (heroVideo, fotoHero, fotoSobreMi, textura, mediaPlaceholder por área), marca.logo
(SVG real, ver public/brand/logo/), nombreReal, matricula, precio de cada consulta,
calcomEvent (slugs) y links de mp.
10. Verificación antes de dar por hecho un cambio
npm run build sin errores.
No quedaron hex sueltos ni textos hardcodeados fuera de config.ts.
El flujo de reserva mantiene el orden área → modalidad → agendar → pagar.
El bot conserva las 10 preguntas con [PILOTO].
