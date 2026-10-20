import { Mail } from "lucide-react";
// Logos reales de cada red (los mismos que usa el footer). El correo sí se queda con el
// sobre de lucide: no es una red y no tiene logo propio.
import LogoInstagram from "./brand/LogoInstagram";
import LogoWhatsapp from "./brand/LogoWhatsapp";
import config from "../config";
import Destello from "./brand/Destello";
import { useReveal } from "../hooks/useReveal";

export default function SobreMi() {
  const { sobreMi, marca, contacto, media } = config;

  const fotoBlock = useReveal<HTMLDivElement>();
  const textBlock = useReveal<HTMLDivElement>({ delayMs: 90 });

  const tieneFotoReal = Boolean(media.fotoSobreMi) && !media.fotoSobreMi.startsWith("PLACEHOLDER");

  return (
    <section
      id="sobre-mi"
      className="relative z-10 rounded-t-[25px] bg-lc-blanco px-6 py-20 md:py-28 -mt-6"
    >
      <div className="max-w-[1180px] mx-auto">
        <span className="block text-lc-naranja uppercase text-sm tracking-[0.2em] font-semibold mb-8">
          {sobreMi.kicker}
        </span>

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 md:items-center">
          {/* Foto + bloque geométrico de marca (solo en desktop, para no ensuciar en mobile) */}
          <div
            ref={fotoBlock.ref}
            style={fotoBlock.style}
            className={`${fotoBlock.className} relative`}
          >
            <div
              className="hidden md:block absolute -bottom-6 -right-6 w-36 h-36 bg-lc-verde/40 rounded-md z-0"
              aria-hidden="true"
            />

            <div className="media-zoom relative z-10 aspect-[4/5] rounded-md overflow-hidden">
              {tieneFotoReal ? (
                <img
                  src={media.fotoSobreMi}
                  alt={`${marca.nombreReal}, ${sobreMi.rol}`}
                  width={media.fotoSobreMiAncho}
                  height={media.fotoSobreMiAlto}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-lc-violeta via-lc-rosa to-lc-naranja flex items-center justify-center">
                  <span className="text-white/70 text-xs uppercase tracking-[0.2em] font-medium">
                    Foto de Ariana
                  </span>
                </div>
              )}
              <Destello className="absolute top-3 right-3 w-7 h-7 text-lc-naranja" />
            </div>
          </div>

          {/* Texto */}
          <div ref={textBlock.ref} style={textBlock.style} className={textBlock.className}>
            <p className="text-lc-carbon italic text-2xl md:text-4xl leading-snug font-serif mb-6">
              {sobreMi.parrafoTop}
            </p>
            {/* Antes acá iba un segundo párrafo suelto (sobreMi.parrafoBottom). Mismo lugar
                del layout, mismo cuerpo de texto: ahora es el subtítulo + las tres líneas de
                acompañamiento (sobreMi.comoTitulo / comoLista). */}
            <h3 className="text-lc-carbon text-2xl mb-3">{sobreMi.comoTitulo}</h3>
            <ul className="flex flex-col gap-2 max-w-[46ch] mb-8">
              {sobreMi.comoLista.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-lc-naranja"
                    aria-hidden="true"
                  />
                  <span className="text-lc-carbon/80 text-base md:text-[17px] leading-[1.7]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-lc-carbon font-serif text-2xl mb-1">
              {marca.nombreReal}
            </p>
            <p className="text-lc-carbon/70 text-sm mb-8">
              <span className="text-lc-azul font-semibold">{sobreMi.rol}</span> · {marca.matricula}{" "}
              · {sobreMi.especialidad}
            </p>

            {/* Los tres contactos vigentes (correo, Instagram, WhatsApp) comparten exactamente
                la misma píldora: fondo lc-carbon, texto claro y un círculo blanco del mismo
                tamaño. Lo único que cambia es el logo de adentro, cada uno en su color: antes
                cada botón tenía un fondo distinto (carbón, rosa, verde) y la fila se veía
                desprolija. La clase se arma una sola vez para que no puedan desalinearse. */}
            <div className="flex flex-wrap items-center gap-4">
              {[
                {
                  label: sobreMi.botonEscribime,
                  href: `mailto:${contacto.email}`,
                  externo: false,
                  // El correo no es una red y no tiene logo ni color propios: va el sobre en
                  // lc-naranja, el color de acción de la marca.
                  Icono: () => <Mail size={16} className="text-lc-naranja" />,
                },
                {
                  label: sobreMi.botonSeguime,
                  href: marca.instagram,
                  externo: true,
                  Icono: () => <LogoInstagram className="w-4 h-4 text-social-instagram" />,
                },
                {
                  label: sobreMi.botonWhatsapp,
                  href: `https://wa.me/${contacto.whatsapp}`,
                  externo: true,
                  Icono: () => <LogoWhatsapp className="w-4 h-4 text-social-whatsapp" />,
                },
              ].map(({ label, href, externo, Icono }) => (
                <a
                  key={label}
                  href={href}
                  {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group hover-lift focus-ring flex items-center gap-3 bg-lc-carbon text-lc-blanco pl-2 pr-5 py-2 rounded-full uppercase text-sm tracking-wide font-medium hover:brightness-110"
                >
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100">
                    <Icono />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Acá iba el recuadro punteado con el borrador de bio (sobreMi.bioPlaceholder). Se
            quitó: el nombre y la matrícula ya están arriba, junto a los botones. */}
      </div>
    </section>
  );
}
