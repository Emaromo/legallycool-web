import { useState } from "react";
import { X } from "lucide-react";
import config from "../config";
import Logo from "./brand/Logo";
// Logos reales de cada red (los mismos que usa "Sobre mí"), en vez de los glifos genéricos
// de lucide: así los íconos coinciden en las dos secciones.
import LogoInstagram from "./brand/LogoInstagram";
import LogoFacebook from "./brand/LogoFacebook";
import LogoWhatsapp from "./brand/LogoWhatsapp";
import { useReveal } from "../hooks/useReveal";

// Links de las columnas "Explorar" y "Contacto": el subrayado de .link-underline crece de
// izquierda a derecha y el texto pasa a naranja. Sin translateX: el subrayado ya da el
// feedback y dos señales a la vez ensucian.
const linkClass =
  "link-underline focus-ring inline-block text-lc-carbon/85 text-[15px] rounded-sm";

// Título de columna: etiqueta, no link — mayúsculas chicas, tracking amplio, en naranja.
// El salto de tamaño y peso contra los links (15px normales) es lo que arma la jerarquía.
const columnaTitulo =
  "uppercase text-[11px] tracking-[0.22em] text-lc-naranja font-semibold mb-6";

// Links de la barra inferior (sobre lc-carbon): subrayado claro, hover a blanco.
const linkBarra =
  "link-underline link-underline-claro focus-ring text-white/70 rounded-sm";

export default function Footer() {
  const { marca, footer, legal, contacto } = config;
  const [privacidadAbierta, setPrivacidadAbierta] = useState(false);
  const year = new Date().getFullYear();
  const topBlock = useReveal<HTMLDivElement>();

  const handleAnclaClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Redes: la URL sale de config.contacto; el ícono lo pone el componente (los SVG no pueden
  // vivir en config.ts, que es solo datos).
  const redes = [
    { label: footer.linkInstagram, href: contacto.instagram, Icono: LogoInstagram },
    { label: footer.linkFacebook, href: contacto.facebook, Icono: LogoFacebook },
    { label: footer.linkWhatsapp, href: `https://wa.me/${contacto.whatsapp}`, Icono: LogoWhatsapp },
  ];

  return (
    // Fondo lc-gris (neutro) + borde violeta arriba: el footer tiene lenguaje visual propio
    // y se distingue del lc-blanco de la sección Reserva. Sin paneles de color adentro —
    // el único bloque azul de la zona es la tarjeta "Cómo funciona" de Reserva.
    <footer className="relative overflow-hidden border-t border-lc-violeta/40 bg-lc-gris">
      {/* Capa decorativa (resplandores + sello), detrás del contenido */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-lc-violeta/20 blur-[70px]" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-lc-azul/10 blur-[70px]" />
        {/* Sello circular como marca de agua: textura, no elemento (oculto en mobile) */}
        <img
          src={marca.sello}
          alt=""
          width={marca.selloAncho}
          height={marca.selloAlto}
          loading="lazy"
          decoding="async"
          className="hidden md:block absolute right-6 lg:right-16 top-24 w-40 lg:w-48 opacity-[0.06] select-none"
        />
      </div>

      {/* ==================== CUERPO: 4 COLUMNAS ==================== */}
      <div
        ref={topBlock.ref}
        style={topBlock.style}
        className={`${topBlock.className} relative z-10 w-full max-w-[1140px] mx-auto px-6 pt-20 md:pt-24 pb-16`}
      >
        {/* La columna de marca lleva más aire respecto de las de links (1.4fr + gap grande) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-10 gap-y-12 lg:gap-x-16">
          {/* Col 1 — Marca */}
          <div>
            {/* Feedback leve del logo: solo opacidad, sin escalar */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label={marca.wordmark}
              className="focus-ring inline-block transition-opacity duration-200 ease-out hover:opacity-85 rounded-sm"
            >
              <Logo className="h-16 w-auto mb-6" />
            </a>
            {/* Voz de marca: es la línea con más peso del bloque, por eso sube a 2xl */}
            <p className="font-serif italic text-lc-azul text-2xl leading-snug mb-4">
              {marca.taglineCierre}
            </p>
            {/* Descripción: deliberadamente más chica y apagada, para que no compita */}
            <p className="text-lc-carbon/55 text-sm leading-relaxed max-w-[34ch]">
              {footer.descripcion}
            </p>
          </div>

          {/* Col 2 — Explorar */}
          <div>
            <h3 className={columnaTitulo}>{footer.columnaExplorarTitulo}</h3>
            <ul className="flex flex-col gap-[18px]">
              {footer.explorar.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleAnclaClick(e, link.href)} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contacto */}
          <div>
            <h3 className={columnaTitulo}>{footer.columnaContactoTitulo}</h3>
            <ul className="flex flex-col gap-[18px]">
              <li>
                <a href={`mailto:${contacto.email}`} className={linkClass}>
                  {footer.linkEscribime}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contacto.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {footer.linkWhatsapp}
                </a>
              </li>
              <li>
                <a href={contacto.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {marca.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — Seguime (botones circulares) */}
          <div>
            <h3 className={columnaTitulo}>{footer.columnaSeguimeTitulo}</h3>
            <div className="flex flex-wrap gap-3">
              {redes.map(({ label, href, Icono }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="icon-btn focus-ring"
                >
                  <Icono className="w-[17px] h-[17px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Separador fino entre el cuerpo y la barra inferior. Va a ancho completo (no
          embutido en el contenedor) y al 70%: lc-violeta al 40% sobre lc-gris son dos
          tonos casi idénticos y la línea directamente no se veía. */}
      <div className="relative z-10 h-px w-full bg-lc-violeta/70" aria-hidden="true" />

      {/* ==================== BARRA INFERIOR ==================== */}
      {/* En lc-carbon (no azul): el cierre de página es neutro y no compite con el azul
          institucional de la tarjeta de Reserva. */}
      <div className="relative z-10 bg-lc-carbon">
        <div className="max-w-[1140px] mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Texto legal: chico pero legible sobre el fondo oscuro (leading holgado) */}
          <p className="text-[11px] leading-relaxed text-white/65">
            {marca.nombre} — {marca.nombreReal} · {marca.matricula} · {legal.footerNota}
          </p>
          <div className="flex items-center gap-3 uppercase tracking-wide shrink-0 text-[11px] text-white/65">
            <span>© {year}</span>
            <span aria-hidden="true">·</span>
            {/* Solo © y Privacidad: el link de texto a Instagram se quitó (ya está el ícono
                en la columna "Seguime", arriba). */}
            <button onClick={() => setPrivacidadAbierta(true)} className={linkBarra}>
              {legal.privacidadTitulo}
            </button>
          </div>
        </div>
      </div>

      {privacidadAbierta && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={legal.privacidadTitulo}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          onClick={() => setPrivacidadAbierta(false)}
        >
          <div
            className="bg-lc-blanco rounded-2xl max-w-lg w-full max-h-[80vh] overflow-auto p-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lc-carbon text-2xl">{legal.privacidadTitulo}</h3>
              <button
                onClick={() => setPrivacidadAbierta(false)}
                aria-label="Cerrar"
                className="focus-ring text-lc-carbon hover:text-lc-naranja transition-colors duration-200 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {legal.privacidad.map((parrafo, i) => (
                <p key={i} className="text-lc-carbon/80 text-sm leading-relaxed">
                  {parrafo}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
