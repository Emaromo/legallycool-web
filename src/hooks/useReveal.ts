import { useEffect, useRef, useState, type CSSProperties } from "react";

type Options = {
  threshold?: number; // 0–1, qué tan visible tiene que estar para disparar
  delayMs?: number; // stagger opcional entre elementos hermanos
};

// Reveal al hacer scroll — mismo patrón de IntersectionObserver que ya usaban las
// cards de Áreas, generalizado como hook reutilizable. Agrega la clase .is-visible
// (definida en index.css) una sola vez, la primera vez que el elemento entra al
// viewport; después se desconecta (no se revierte al salir de pantalla).
//
// Uso: const title = useReveal<HTMLHeadingElement>();
//      <h2 ref={title.ref} style={title.style} className={`${title.className} ...`}>
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  delayMs = 0,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si el navegador no soporta IntersectionObserver, mostramos el contenido
    // directamente en vez de dejarlo invisible para siempre (degradación elegante).
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style: CSSProperties | undefined = delayMs ? { transitionDelay: `${delayMs}ms` } : undefined;

  return { ref, className: `reveal${visible ? " is-visible" : ""}`, style };
}

export default useReveal;
