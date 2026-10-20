type Props = { className?: string; gradientId?: string };

// Ícono de marca: símbolo © — derechos de autor (BRAND_legallycool.md, sección 4).
// gradientId opcional: referencia a un <linearGradient> ya presente en el DOM (para el
// tratamiento neón del carrusel de Áreas); sin él, se comporta como siempre (currentColor).
export default function IconoCopyright({ className, gradientId }: Props) {
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
        d="M14.5 9.8a3 3 0 1 0 0 4.4"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
