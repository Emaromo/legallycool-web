type Props = { className?: string; gradientId?: string };

// Ícono de marca: documento/hoja — derecho de forma moderna (BRAND_legallycool.md, sección 4).
// gradientId opcional: ver IconoMarcaRegistrada.tsx.
export default function IconoDocumento({ className, gradientId }: Props) {
  const stroke = gradientId ? `url(#${gradientId})` : "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V4a.5.5 0 0 1 .5-.5Z"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M14 3.5V7.5H18" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12h6M9 15.5h6M9 8.5h2" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
