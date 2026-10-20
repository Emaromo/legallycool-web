type Props = { className?: string; gradientId?: string };

// Ícono de marca: calendario — usado en el placeholder de "calendario en configuración"
// de la sección Reserva (BRAND_legallycool.md, sección 4: íconos con moderación).
// gradientId opcional: ver IconoMarcaRegistrada.tsx.
export default function IconoCalendario({ className, gradientId }: Props) {
  const color = gradientId ? `url(#${gradientId})` : "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" stroke={color} strokeWidth="1.8" />
      <path d="M4 10h16" stroke={color} strokeWidth="1.8" />
      <path d="M8 3.5v3.5M16 3.5v3.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8.5" cy="14" r="1.1" fill={color} />
      <circle cx="12" cy="14" r="1.1" fill={color} />
      <circle cx="8.5" cy="17.2" r="1.1" fill={color} />
    </svg>
  );
}
