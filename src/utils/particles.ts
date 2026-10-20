// Estallido de partículas rosa neón — efecto decorativo puntual (fuera de la paleta
// oficial, ver el color `neon-fucsia` en tailwind.config.js), usado en toda la landing:
// listener global de clic (App.tsx) y auto-avance del carrusel de Áreas (Areas.tsx).
// Vanilla, sin librerías: nodos `fixed`, animados por rAF, removidos solos al terminar.

const COUNT = 30; // ~28–32
const MIN_SIZE_PX = 6;
const MAX_SIZE_PX = 16;
const MIN_DIST_PX = 45;
const MAX_DIST_PX = 150;
const LIFETIME_MS = 750;

let liveNodes: HTMLDivElement[] = [];
let liveTimeouts: number[] = [];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Dispara un estallido de partículas centrado en (x, y), en coordenadas de viewport
 *  (las mismas que clientX/clientY o getBoundingClientRect). No hace nada si el usuario
 *  prefiere menos movimiento. */
export function burstParticles(x: number, y: number) {
  if (typeof document === "undefined" || prefersReducedMotion()) return;

  for (let i = 0; i < COUNT; i++) {
    const size = MIN_SIZE_PX + Math.random() * (MAX_SIZE_PX - MIN_SIZE_PX);
    const el = document.createElement("div");
    el.className = "fixed pointer-events-none rounded-full bg-neon-fucsia shadow-glow-fucsia";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.zIndex = "99999";
    el.style.opacity = "1";
    el.style.transform = "translate(-50%, -50%) scale(1)";
    el.style.transition = `transform ${LIFETIME_MS}ms ease-out, opacity ${LIFETIME_MS}ms ease-out`;
    document.body.appendChild(el);
    liveNodes.push(el);

    const angle = Math.random() * Math.PI * 2;
    const dist = MIN_DIST_PX + Math.random() * (MAX_DIST_PX - MIN_DIST_PX);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
      el.style.opacity = "0";
    });

    const t = window.setTimeout(() => {
      el.remove();
      liveNodes = liveNodes.filter((node) => node !== el);
    }, LIFETIME_MS);
    liveTimeouts.push(t);
  }
}

/** Limpieza defensiva: saca del DOM cualquier partícula viva y cancela sus timeouts.
 *  Se llama desde el unmount de App para garantizar que nunca queden nodos sueltos. */
export function clearAllParticles() {
  liveTimeouts.forEach((t) => window.clearTimeout(t));
  liveTimeouts = [];
  liveNodes.forEach((el) => el.remove());
  liveNodes = [];
}
