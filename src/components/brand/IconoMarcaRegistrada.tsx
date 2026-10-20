type Props = { className?: string; gradientId?: string };

// Ícono de marca: símbolo ® — marca registrada (BRAND_legallycool.md, sección 4).
// gradientId opcional: referencia a un <linearGradient> ya presente en el DOM (para el
// tratamiento neón del carrusel de Áreas); sin él, se comporta como siempre (currentColor).
export default function IconoMarcaRegistrada({ className, gradientId }: Props) {
  const stroke = gradientId ? `url(#${gradientId})` : "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.8" />
      <path
        d="M9.8 16V8h2.7a2.2 2.2 0 0 1 0 4.4h-1M12.5 12.4 14.4 16"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
