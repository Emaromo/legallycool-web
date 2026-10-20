import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import config from "../config";
// Íconos de marca (SVG). Cada área usa uno distinto.
import IconoMarcaRegistrada from "./brand/IconoMarcaRegistrada";
import IconoDocumento from "./brand/IconoDocumento";
import IconoCandado from "./brand/IconoCandado";
import IconoCopyright from "./brand/IconoCopyright";
// Hook propio para animar la aparición (fade + subida) de la columna izquierda al hacer scroll.
import { useReveal } from "../hooks/useReveal";
// Función que dispara el estallido de partículas rosas.
import { burstParticles } from "../utils/particles";

// ============================================================================
// MAPA DE ÍCONOS: a cada área (por su id) le corresponde un ícono de marca.
// Si un id no está acá, más abajo se usa IconoDocumento como respaldo.
// ============================================================================
const iconoPorArea: Record<string, ComponentType<{ className?: string; gradientId?: string }>> = {
  marcas: IconoMarcaRegistrada, // ® — marcas, diseños y dominios
  autor: IconoCopyright, // © — derecho de autor y creaciones
  contratos: IconoDocumento, // contratos y estructura empresarial
  laboral: IconoCandado, // derecho laboral (prevención)
};

// Id del degradé "neón" (naranja→rosa) que comparten todos los íconos. Se define una sola
// vez como <linearGradient> y cada ícono lo referencia con url(#...).
const NEON_GRADIENT_ID = "areas-icono-neon";

// Reconoce si `media` es una ruta a un archivo de imagen (en vez de un texto PLACEHOLDER_*).
const IMAGEN_RE = /\.(svg|png|jpe?g|webp)$/i;

// ============================================================================
// AJUSTES DEL CARRUSEL (tocá estos números para cambiar el ritmo/estética)
// ============================================================================
const AUTO_ADVANCE_MS = 4000;               // cada cuánto avanza solo (ms)
const TRANSITION_MS = 800;                  // cuánto dura el deslizamiento (ms)
const TRANSITION_EASE = "cubic-bezier(0.5, 0, 0.2, 1)"; // curva del deslizamiento
const FALLBACK_CARD_H = 360;                // alto estimado antes de medir la tarjeta real
// Aire dentro de la ventana (que tiene overflow-hidden) para que la sombra de la tarjeta se
// vea entera en lugar de cortarse contra el recorte. El horizontal se compensa con un margen
// negativo del mismo valor, así la tarjeta conserva su ancho.
const SHADOW_PAD_Y = 26;
const SHADOW_PAD_X = 18;
// Separación entre tarjetas del track. Tiene que ser mayor que SHADOW_PAD_Y + el alcance de
// la sombra (~24px), si no la sombra de la tarjeta vecina se asoma por el aire de la ventana.
const GAP_PX = 60;

// ============================================================================
// HOOK: detecta si el usuario pidió "menos movimiento" en su sistema
// (accesibilidad). Si es así, apagamos animaciones.
// ============================================================================
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// ============================================================================
// COMPONENTE PRINCIPAL: la sección "Áreas"
// ============================================================================
export default function Areas() {
  const { consultas, areas } = config;            // consultas = las 4 áreas de práctica; areas = textos (heading, CTA)
  const prefersReducedMotion = usePrefersReducedMotion();
  const n = consultas.length;                     // cantidad de áreas (4)

  // --- Estado del carrusel ---
  // index va de 0 a n. El valor n corresponde al CLON de la primera tarjeta (para que el
  // loop no "rebote" hacia atrás, ver más abajo).
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false); // true = mover sin animación (el salto del loop)
  const [tabHidden, setTabHidden] = useState(false); // true = la pestaña está en segundo plano
  const [hovered, setHovered] = useState(false);     // true = mouse/foco sobre el carrusel (para poder leer)
  const paused = tabHidden || hovered;                // auto-avance pausado si pasa cualquiera de las dos
  const [alturas, setAlturas] = useState<number[]>([]); // alto real de cada tarjeta del track

  // --- Referencias a elementos del DOM ---
  const intervalRef = useRef<number | null>(null);       // el temporizador del auto-avance
  const resetTimeoutRef = useRef<number | null>(null);   // timeout del reset del loop
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]); // cada slot del track (para medirlos)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});     // cada tarjeta (reduced-motion)
  const navItemRefs = useRef<Record<string, HTMLButtonElement | null>>({}); // cada ítem de la lista izquierda
  // Marca si el próximo cambio de index vino del auto-avance. Solo en ese caso Áreas
  // dispara sus propias partículas (los clics ya los cubre el listener global de App.tsx).
  const isAutoRef = useRef(false);

  // --- Aparición (reveal) de la columna izquierda al entrar en pantalla ---
  const heading = useReveal<HTMLHeadingElement>();
  const navBlock = useReveal<HTMLElement>({ delayMs: 70 });
  const ctaBlock = useReveal<HTMLDivElement>({ delayMs: 140 });

  // --- Medir el alto de CADA tarjeta ---
  // Las tarjetas NO miden todas lo mismo (los textos tienen distinto largo). Medir solo la
  // primera y usar ese alto como paso fijo desalineaba el track: la diferencia se acumulaba
  // paso a paso y terminaba asomando la vecina arriba o abajo. Ahora se miden todas y el
  // track se posiciona con el offset real de cada una, así el encuadre siempre es exacto.
  useEffect(() => {
    const els = slideRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (!els.length) return;
    const medir = () => {
      const nuevas = els.map((el) => el.getBoundingClientRect().height);
      setAlturas((prev) =>
        prev.length === nuevas.length && prev.every((h, i) => Math.abs(h - nuevas[i]) < 0.5)
          ? prev
          : nuevas
      );
    };
    medir();
    const ro = new ResizeObserver(medir);
    els.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [n]);

  // Offset (en px) del inicio de cada tarjeta dentro del track: la suma de las anteriores
  // más un GAP_PX por cada una.
  const offsets = useMemo(() => {
    let acc = 0;
    return alturas.map((h) => {
      const inicio = acc;
      acc += h + GAP_PX;
      return inicio;
    });
  }, [alturas]);

  // Ventana = alto EXACTO de la tarjeta activa (por eso ninguna vecina puede asomar), y el
  // track se corre justo hasta el inicio de esa tarjeta.
  const winH = alturas[index] ?? FALLBACK_CARD_H;
  const translateY = -(offsets[index] ?? index * (FALLBACK_CARD_H + GAP_PX));

  // --- Arrancar / reiniciar el temporizador del auto-avance ---
  const startTimer = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (prefersReducedMotion || paused) return; // no avanzar si hay reduced-motion o está pausado
    intervalRef.current = window.setInterval(() => {
      isAutoRef.current = true;   // este avance es automático
      setInstant(false);          // con animación
      setIndex((i) => i + 1);     // pasar a la siguiente
    }, AUTO_ADVANCE_MS);
  }, [prefersReducedMotion, paused]);

  // Iniciar el temporizador al montar y limpiarlo al desmontar.
  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  // --- Pausa cuando la pestaña pasa a segundo plano ---
  // (así no se acumulan varios pasos cuando volvés a mirarla).
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // --- Loop sin salto ---
  // El track tiene un CLON de la primera tarjeta al final. Cuando el avance llega a ese
  // clon (index === n), dejamos terminar la animación normal y recién ahí saltamos a index 0
  // SIN animación (instant), para que el giro se vea continuo en vez de volver hacia atrás.
  useEffect(() => {
    if (index !== n) return;
    resetTimeoutRef.current = window.setTimeout(() => {
      isAutoRef.current = false; // el reset no cuenta como "selección" (no dispara partículas)
      setInstant(true);          // mover sin animación
      setIndex(0);
      // Dos frames para asegurar que el salto ya se pintó antes de volver a animar.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setInstant(false));
      });
    }, TRANSITION_MS + 20);
    return () => {
      if (resetTimeoutRef.current) window.clearTimeout(resetTimeoutRef.current);
    };
  }, [index, n]);

  // --- Partículas del auto-avance ---
  // Cuando el cambio fue automático, dispara el estallido centrado en el ítem de la lista
  // que quedó activo. (Los clics los cubre el listener global de App.tsx.)
  useEffect(() => {
    const wasAuto = isAutoRef.current;
    isAutoRef.current = false;
    if (!wasAuto) return;
    const activeId = consultas[index % n]?.id;
    const el = activeId ? navItemRefs.current[activeId] : null;
    if (el) {
      const rect = el.getBoundingClientRect();
      burstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  }, [index, n, consultas]);

  // --- Clic en un ítem de la lista ---
  // Salta a esa área y reinicia el temporizador. Con reduced-motion, además hace scroll
  // suave a la tarjeta (sin mover el scroll de toda la página).
  const goTo = (i: number) => {
    isAutoRef.current = false;
    setInstant(false);
    setIndex(i);
    startTimer();
    if (prefersReducedMotion) {
      cardRefs.current[consultas[i].id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // Baja a la sección de reserva.
  const scrollToReserva = () => {
    document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" });
  };

  const activeArea = index % n; // qué área está activa (0..n-1), teniendo en cuenta el clon

  return (
    // Sección con fondo degradé rosa → naranja, los colores del logo (token bg-areas-calido).
    <section id="areas" className="relative bg-areas-calido px-6 py-20 md:py-28">
      {/* Textura muy sutil (puntitos) sobre el degradé, para que no se vea "bandeado". */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgb(189, 186, 182) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
        aria-hidden="true"
      />

      {/* Degradé compartido para el relleno "neón" de los íconos (un solo <def>). */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id={NEON_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" className="text-lc-naranja" />
            <stop offset="100%" stopColor="currentColor" className="text-lc-rosa" />
          </linearGradient>
        </defs>
      </svg>

      {/* Grilla: columna izquierda (texto) + columna derecha (carrusel). */}
      <div className="relative max-w-[1180px] mx-auto grid md:grid-cols-[minmax(0,320px)_1fr] gap-12 md:items-center">

        {/* ===================== COLUMNA IZQUIERDA (fija) ===================== */}
        <div className="flex flex-col gap-8">
          {/* Título de la sección */}
          <h2
            ref={heading.ref}
            style={heading.style}
            className={`${heading.className} text-lc-carbon-calido text-3xl md:text-4xl leading-tight`}
          >
            {areas.heading}
          </h2>

          {/* Lista de áreas: al clickear salta a esa tarjeta. El activo se marca en naranja. */}
          <nav
            ref={navBlock.ref}
            style={navBlock.style}
            className={`${navBlock.className} flex flex-col gap-1`}
          >
            {consultas.map((c, i) => {
              const isActive = i === activeArea;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    navItemRefs.current[c.id] = el;
                  }}
                  onClick={() => goTo(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-left pl-4 pr-4 py-3 focus-ring rounded-lg border-l-2 transition-colors duration-200 ease-out ${
                    isActive
                      ? // Sobre el degradé cálido el texto en naranja desaparecería (el fondo ES
                        // naranja), así que el activo se marca con carbón en negrita + borde naranja.
                        "border-lc-naranja font-semibold text-lc-carbon-calido"
                      : "text-lc-carbon-calido/85 border-transparent hover:text-lc-carbon-calido hover:border-lc-carbon-calido/30"
                  }`}
                >
                  {c.titulo}
                </button>
              );
            })}
          </nav>

          {/* CTA para reservar */}
          <div ref={ctaBlock.ref} style={ctaBlock.style} className={ctaBlock.className}>
            <p className="text-lc-carbon-calido mb-3">{areas.ctaTexto}</p>
            <button
              onClick={scrollToReserva}
              // Píldora naranja con texto carbón en negrita (DM Sans, la tipografía de los
              // CTA según el manual). Va directo sobre el degradé cálido: lo que lo despega
              // del fondo es shadow-cta-areas (ver tailwind.config.js), no el panel oscuro
              // que lo enmarcaba antes. El lift de 2px y el retorno en :active los da
              // .hover-lift, que ya respeta prefers-reduced-motion; el foco de teclado,
              // .focus-ring — ambas del sistema, en src/index.css. El hover:shadow-* pisa a
              // la sombra propia de .hover-lift (las utilidades van después en el CSS).
              className="hover-lift focus-ring font-sans font-bold bg-lc-naranja text-lc-carbon px-8 py-4 rounded-full shadow-cta-areas hover:shadow-cta-areas-hover"
            >
              {areas.ctaBoton}
            </button>
          </div>
        </div>

        {/* ===================== COLUMNA DERECHA (carrusel) ===================== */}
        {prefersReducedMotion ? (
          // Con reduced-motion: las 4 tarjetas apiladas y quietas (sin animación).
          <div className="flex flex-col gap-0">
            {consultas.map((c) => (
              <div
                key={c.id}
                ref={(el) => {
                  cardRefs.current[c.id] = el;
                }}
              >
                <AreaCard consulta={c} Icono={iconoPorArea[c.id] ?? IconoDocumento} />
              </div>
            ))}
          </div>
        ) : (
          // Ventana con overflow-hidden: el área útil es el alto EXACTO de la tarjeta activa,
          // más el aire de SHADOW_PAD_* para que su sombra no se corte. Ese aire es menor que
          // GAP_PX, así que la tarjeta vecina (y su sombra) siguen del otro lado del recorte.
          // El margen negativo horizontal compensa el padding: la tarjeta no pierde ancho.
          <div
            className="relative overflow-hidden"
            style={{
              height: winH + SHADOW_PAD_Y * 2,
              paddingTop: SHADOW_PAD_Y,
              paddingBottom: SHADOW_PAD_Y,
              paddingLeft: SHADOW_PAD_X,
              paddingRight: SHADOW_PAD_X,
              marginLeft: -SHADOW_PAD_X,
              marginRight: -SHADOW_PAD_X,
              // La ventana acompaña el alto de la tarjeta que entra, con la misma duración
              // que el deslizamiento, así el cambio de alto no se percibe como un salto.
              transition: instant ? "none" : `height ${TRANSITION_MS}ms ${TRANSITION_EASE}`,
            }}
            role="region"
            aria-label={areas.heading}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >
            <div
              className="flex flex-col"
              style={{
                gap: GAP_PX,
                transform: `translateY(${translateY}px)`,
                transition: instant ? "none" : `transform ${TRANSITION_MS}ms ${TRANSITION_EASE}`,
              }}
            >
              {/* [...consultas, consultas[0]] = las 4 tarjetas + el clon de la primera (loop). */}
              {[...consultas, consultas[0]].map((c, i) => {
                const isActive = i === index;
                return (
                  // Cada slot conserva su alto natural; el efecto de medición lo lee de acá.
                  <div
                    key={`${c.id}-${i}`}
                    ref={(el) => {
                      slideRefs.current[i] = el;
                    }}
                    aria-hidden={!isActive}
                  >
                    <AreaCard consulta={c} Icono={iconoPorArea[c.id] ?? IconoDocumento} active={isActive} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// TARJETA DE ÁREA (cada una: ícono + título + resumen + media + descripción)
// ⬇ ACÁ SE SACÓ EL ZOOM: ya no hay hover-scale en la tarjeta, el ícono ni la media.
// ============================================================================
function AreaCard({
  consulta,
  Icono,
  active: _active = true,
}: {
  consulta: (typeof config)["consultas"][number];
  Icono: ComponentType<{ className?: string; gradientId?: string }>;
  active?: boolean;
}) {
  return (
    // Contenedor de la tarjeta: vidrio oscuro con TINTE CÁLIDO (bg-vidrio-areas: carbón
    // arriba, un velo de lc-rosa abajo), para que no se lea como un bloque negro plano
    // apoyado sobre el degradé de la sección. Se quitó "card-hover" (era el que hacía el
    // zoom al pasar el mouse y provocaba que las esquinas se recortaran contra la ventana).
    // shadow-card-areas: sombra leve y pareja para dar profundidad. Para que se vea entera
    // (y no cortada de golpe contra el recorte del carrusel, que era lo que antes dejaba una
    // línea oscura pegada al canto), la ventana lleva el aire de SHADOW_PAD_* y las tarjetas
    // están separadas por un GAP_PX mayor que ese aire — ver más arriba.
    <div className="rounded-[22px] bg-vidrio-areas border border-white/[0.14] shadow-card-areas backdrop-blur-[14px] backdrop-saturate-[1.3] p-7">
      {/* Ícono del área, en el degradé neón naranja→rosa: sobre el vidrio oscuro destaca más
          que antes. Se quitó "transition-transform ... group-hover:scale-110" (zoom). */}
      <Icono gradientId={NEON_GRADIENT_ID} className="w-8 h-8 mb-6 drop-shadow-neon-naranja" />

      {/* Bloque de media: la pieza (vertical, formato Instagram) y el texto largo en fila.
          En desktop el bloque tiene alto fijo (3/2 del ancho de la tarjeta, ≈ lo que antes
          ocupaban recuadro + descripción juntos) y la imagen lo llena a lo alto: su ancho
          sale solo de su proporción real, así no recorta de más ni deja bandas — por eso ya
          no hace falta el relleno borroso que había detrás. En mobile no hay lugar para dos
          columnas, así que se apila: imagen arriba, texto abajo. */}
      <div className="flex flex-col md:flex-row md:aspect-[3/2] gap-5 md:gap-7">
        {/* Se quitó el "group-hover:scale-[1.03]" (zoom de la media). */}
        {IMAGEN_RE.test(consulta.media) ? (
          <img
            src={consulta.media}
            alt={consulta.titulo}
            // width/height = tamaño real del .webp, para que el navegador reserve el espacio.
            // El CSS manda igual (aspect-[4/5] + object-cover), esto es solo anti-salto.
            width={consulta.mediaAncho}
            height={consulta.mediaAlto}
            // La sección está bien abajo de la primera pantalla: la imagen se baja al llegar.
            loading="lazy"
            decoding="async"
            // aspect-[4/5]: la proporción real de las tres piezas (≈0,80). El borde fucsia
            // ahora es de la imagen, no de todo el bloque.
            className={`block w-full md:w-auto md:h-full aspect-[4/5] shrink-0 object-cover rounded-2xl border-[1.5px] border-neon-fucsia/55 shadow-media-suave ${consulta.mediaPos ?? ""}`}
          />
        ) : (
          <div className="texto-sobre-vidrio w-full md:w-auto md:h-full aspect-[4/5] shrink-0 flex items-center justify-center px-4 rounded-2xl border-[1.5px] border-neon-fucsia/55 shadow-media-suave bg-lc-blanco/10 text-lc-blanco/60 text-sm text-center">
            <span>{consulta.media}</span>
          </div>
        )}

        {/* Columna de texto, al costado de la imagen: título, bajada y los servicios del área.
            El título encabeza esta columna (antes iba arriba de todo, cruzando también sobre
            la imagen). Los textos claros llevan .texto-sobre-vidrio (sombra mínima, ver
            index.css): con el vidrio así de transparente se apoyan sobre zonas de distinto
            brillo del degradé de la sección. En los ítems, el nombre (lo que iba antes de los
            dos puntos) va en blanco pleno y el detalle en el blanco al 78% del texto
            secundario: es el recurso de jerarquía que ya tenía la sección. */}
        <div className="flex-1 min-w-0">
          <h3 className="texto-sobre-vidrio text-lc-blanco text-2xl mb-1">{consulta.titulo}</h3>
          <p className="texto-sobre-vidrio text-lc-blanco/[0.78] text-sm mb-4">
            {consulta.resumen}
          </p>

          <ul className="flex flex-col gap-2.5">
            {consulta.items.map((item) => (
              <li
                key={item.nombre}
                className="texto-sobre-vidrio text-lc-blanco/[0.78] text-[13px] md:text-sm leading-relaxed"
              >
                <span className="text-lc-blanco font-medium">{item.nombre}:</span> {item.detalle}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
