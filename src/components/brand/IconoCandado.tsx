type Props = { className?: string; gradientId?: string };

// Ícono de marca: candado — protección (BRAND_legallycool.md, sección 4).
// gradientId opcional: ver IconoMarcaRegistrada.tsx.
export default function IconoCandado({ className, gradientId }: Props) {
  const color = gradientId ? `url(#${gradientId})` : "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" stroke={color} strokeWidth="1.8" />
      <path
        d="M7.5 11V7.5a4.5 4.5 0 0 1 9 0V11"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1.5" fill={color} />
    </svg>
  );
}
