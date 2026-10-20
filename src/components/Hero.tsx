import config from "../config";
import Destello from "./brand/Destello";
import { useReveal } from "../hooks/useReveal";

export default function Hero() {
  const { hero, marca, sobreMi, media } = config;

  const destello = useReveal<HTMLDivElement>();
  const titulo = useReveal<HTMLHeadingElement>({ delayMs: 70 });
  const bajada = useReveal<HTMLParagraphElement>({ delayMs: 140 });
  const credencial = useReveal<HTMLParagraphElement>({ delayMs: 195 });
  const ctaBar = useReveal<HTMLDivElement>({ delayMs: 250 });

  const scrollToReserva = () => {
    document.getElementById("reserva")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      {/* Fallback visible si el video placeholder no carga */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-lc-violeta via-lc-rosa to-lc-naranja flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="text-white/70 text-xs uppercase tracking-[0.2em] font-medium">
          Video placeholder
        </span>
      </div>
      {/* Video de fondo — placeholder, reemplazar en Fase 2/3 con el archivo real */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={media.fotoHero}
      >
        <source src={media.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-lc-carbon/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-28 md:pb-32">
        <div ref={destello.ref} style={destello.style} className={destello.className}>
          <Destello className="w-6 h-6 text-lc-violeta mb-3" />
        </div>
        {/* Titular principal: tagline del manual, en Cormorant Garamond (el h1 ya toma
            font-serif desde index.css). */}
        <h1
          ref={titulo.ref}
          style={titulo.style}
          className={`${titulo.className} text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] max-w-[18ch] mb-5`}
        >
          {marca.taglinePrincipal}
        </h1>

        {/* Bajada de apertura: texto explicativo, en DM Sans (fuente del body) y con una
            medida de línea cómoda (~60ch). */}
        <p
          ref={bajada.ref}
          style={bajada.style}
          className={`${bajada.className} text-white/85 text-base md:text-lg leading-relaxed max-w-[60ch] mb-6`}
        >
          {marca.bajadaApertura}
        </p>

        {/* Credencial (objetivo del manual: matrícula visible). Va sobre una píldora clara
            porque el hero está sobre el video oscurecido y el carbón/azul del manual no
            tendrían contraste suficiente en blanco sobre oscuro. */}
        <p
          ref={credencial.ref}
          style={credencial.style}
          className={`${credencial.className} self-start inline-flex flex-wrap items-center gap-x-2 gap-y-1 bg-lc-blanco/95 rounded-full px-4 py-2 text-xs sm:text-sm text-lc-carbon mb-8`}
        >
          <span className="font-medium">{marca.nombreReal}</span>
          <span aria-hidden="true" className="text-lc-carbon/40">·</span>
          <span className="text-lc-azul font-semibold">{sobreMi.rol}</span>
          <span aria-hidden="true" className="text-lc-carbon/40">·</span>
          <span className="text-lc-carbon/70">{marca.matricula}</span>
        </p>

        <div
          ref={ctaBar.ref}
          style={ctaBar.style}
          className={`${ctaBar.className} bg-black/25 backdrop-blur-md rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
        >
          <p className="text-white font-medium">
            <span className="hidden md:inline">{hero.ctaBarTextoDesktop}</span>
            <span className="md:hidden">{hero.ctaBarTextoMobile}</span>
          </p>
          <button
            onClick={scrollToReserva}
            className="hover-lift focus-ring bg-lc-naranja text-lc-carbon font-semibold px-6 py-3 rounded-full hover:brightness-95 whitespace-nowrap"
          >
            {hero.ctaBoton}
          </button>
        </div>
      </div>
    </section>
  );
}
